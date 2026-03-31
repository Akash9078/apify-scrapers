// js/ui-components.js - UI component generation

// Wait for DOM to be ready
document.addEventListener('DOMContentLoaded', () => {
  renderCategories();
  renderActors();
  renderCategoryFilter();
});

// Render category cards
function renderCategories() {
  const container = document.getElementById('categories-grid');
  if (!container) return;
  
  container.innerHTML = categories.map(category => `
    <div 
      class="category-card" 
      data-category="${category.id}"
      onclick="filterByCategory('${category.id}')"
      onkeypress="if(event.key === 'Enter') filterByCategory('${category.id}')"
      role="button"
      tabindex="0"
      aria-label="Filter by ${category.name}"
    >
      <span class="category-icon">${category.icon}</span>
      <span class="category-name">${category.name}</span>
      <span class="category-count">${category.count} actors</span>
    </div>
  `).join('');
}

// Render actor cards
function renderActors(actorsToRender = actors) {
  const container = document.getElementById('actors-grid');
  if (!container) return;
  
  if (actorsToRender.length === 0) {
    container.innerHTML = `
      <div class="no-results">
        <p>No actors found matching your criteria.</p>
        <button class="btn btn-secondary" onclick="clearAllFilters()">Clear Filters</button>
      </div>
    `;
    return;
  }
  
  container.innerHTML = actorsToRender.map(actor => `
    <article class="actor-card" data-actor-id="${actor.id}">
      <div class="actor-card-header">
        <span class="actor-category-badge" style="background: ${hexToRgba(actor.color, 0.15)}; color: ${actor.color}">
          <span>${actor.icon}</span>
          <span>${actor.category}</span>
        </span>
        <h3 class="actor-name">
          <a href="${actor.apifyUrl}" target="_blank" rel="noopener">${actor.name}</a>
        </h3>
        <p class="actor-description">${actor.shortDescription || actor.description}</p>
      </div>
      <div class="actor-card-body">
        <div class="actor-stats">
          ${actor.rating ? `
            <div class="actor-stat">
              <span class="actor-stat-icon">⭐</span>
              <span class="actor-stat-value">${actor.rating.toFixed(1)}</span>
            </div>
          ` : ''}
          <div class="actor-stat">
            <span class="actor-stat-icon">👤</span>
            <span class="actor-stat-value">${formatNumber(actor.users)}</span>
          </div>
          <div class="actor-stat">
            <span class="actor-stat-icon">▶</span>
            <span class="actor-stat-value">${formatNumber(actor.totalRuns)}</span>
          </div>
        </div>
        ${actor.features && actor.features.length > 0 ? `
          <div class="actor-features">
            <div class="actor-features-title">Features</div>
            <ul class="actor-features-list">
              ${actor.features.slice(0, 3).map(feature => `
                <li class="actor-feature-tag">${feature}</li>
              `).join('')}
            </ul>
          </div>
        ` : ''}
      </div>
      <div class="actor-card-footer">
        <a href="${actor.apifyUrl}" class="btn btn-primary btn-sm" target="_blank" rel="noopener">
          View on Apify →
        </a>
      </div>
    </article>
  `).join('');
  
  // Re-observe new cards for animations
  observeCardsForAnimation();
}

// Render category filter dropdown
function renderCategoryFilter() {
  const select = document.getElementById('category-filter');
  if (!select) return;
  
  select.innerHTML = `
    <option value="">All Categories</option>
    ${categories.map(cat => `
      <option value="${cat.id}">${cat.name}</option>
    `).join('')}
  `;
}

// Helper function to convert hex to rgba
function hexToRgba(hex, alpha) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

// Observe cards for animation
function observeCardsForAnimation() {
  const cards = document.querySelectorAll('.actor-card:not(.fade-in-visible)');
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('fade-in-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '50px' });
  
  cards.forEach(card => {
    card.classList.add('fade-in');
    observer.observe(card);
  });
}

// Global function for category filtering
window.filterByCategory = function(categoryId) {
  const select = document.getElementById('category-filter');
  if (select) {
    select.value = categoryId;
    select.dispatchEvent(new Event('change'));
  }
  
  // Update active state on category cards
  document.querySelectorAll('.category-card').forEach(card => {
    card.classList.toggle('active', card.dataset.category === categoryId);
  });
  
  // Scroll to actors section
  document.getElementById('actors').scrollIntoView({ behavior: 'smooth' });
};

// Global function to clear filters
window.clearAllFilters = function() {
  const searchInput = document.getElementById('actor-search');
  const categorySelect = document.getElementById('category-filter');
  
  if (searchInput) searchInput.value = '';
  if (categorySelect) categorySelect.value = '';
  
  document.querySelectorAll('.category-card').forEach(card => {
    card.classList.remove('active');
  });
  
  // Trigger filter update
  if (searchInput) searchInput.dispatchEvent(new Event('input'));
};

// Add CSS animation styles
const style = document.createElement('style');
style.textContent = `
  .fade-in {
    opacity: 0;
    transform: translateY(20px);
    transition: opacity 0.6s ease, transform 0.6s ease;
  }
  
  .fade-in-visible {
    opacity: 1;
    transform: translateY(0);
  }
`;
document.head.appendChild(style);
