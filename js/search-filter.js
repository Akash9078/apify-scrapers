// js/search-filter.js - Search and filter functionality

document.addEventListener('DOMContentLoaded', () => {
  initializeSearchFilter();
});

// State management
let currentFilters = {
  search: '',
  category: '',
  sort: 'popular'
};

function initializeSearchFilter() {
  const searchInput = document.getElementById('actor-search');
  const categorySelect = document.getElementById('category-filter');
  const sortSelect = document.getElementById('sort-filter');
  const clearButton = document.getElementById('clear-filters');
  
  // Populate category dropdown
  if (categorySelect) {
    categorySelect.innerHTML = `
      <option value="">All Categories</option>
      ${categories.map(cat => `
        <option value="${cat.id}">${cat.name}</option>
      `).join('')}
    `;
  }
  
  // Search input (debounced)
  if (searchInput) {
    searchInput.addEventListener('input', debounce((e) => {
      currentFilters.search = e.target.value.toLowerCase();
      applyFilters();
    }, 300));
  }
  
  // Category filter
  if (categorySelect) {
    categorySelect.addEventListener('change', (e) => {
      currentFilters.category = e.target.value;
      applyFilters();
      
      // Update category card active states
      document.querySelectorAll('.category-card').forEach(card => {
        card.classList.toggle('active', card.dataset.category === e.target.value);
      });
    });
  }
  
  // Sort filter
  if (sortSelect) {
    sortSelect.addEventListener('change', (e) => {
      currentFilters.sort = e.target.value;
      applyFilters();
    });
  }
  
  // Clear filters
  if (clearButton) {
    clearButton.addEventListener('click', () => {
      clearAllFilters();
    });
  }
  
  // Initial render
  applyFilters();
}

function applyFilters() {
  let filtered = [...actors];
  
  // Apply search filter
  if (currentFilters.search) {
    filtered = filtered.filter(actor => 
      actor.name.toLowerCase().includes(currentFilters.search) ||
      actor.description.toLowerCase().includes(currentFilters.search) ||
      actor.category.toLowerCase().includes(currentFilters.search)
    );
  }
  
  // Apply category filter
  if (currentFilters.category) {
    filtered = filtered.filter(actor => 
      actor.categoryId === currentFilters.category
    );
  }
  
  // Apply sorting
  filtered = sortActors(filtered, currentFilters.sort);
  
  // Update UI
  renderActors(filtered);
  updateResultsCount(filtered.length);
  updateActiveFilters();
  
  // Update page title if filtered by category
  updatePageTitle();
}

function sortActors(actorsToSort, sortType) {
  const sorted = [...actorsToSort];
  
  switch (sortType) {
    case 'popular':
      return sorted.sort((a, b) => b.users - a.users);
    case 'rating':
      return sorted.sort((a, b) => (b.rating || 0) - (a.rating || 0));
    case 'name':
      return sorted.sort((a, b) => a.name.localeCompare(b.name));
    case 'runs':
      return sorted.sort((a, b) => b.totalRuns - a.totalRuns);
    default:
      return sorted;
  }
}

function updateResultsCount(count) {
  const resultsCount = document.getElementById('results-count');
  if (resultsCount) {
    const total = actors.length;
    if (count === total) {
      resultsCount.innerHTML = `Showing <strong>${total}</strong> actors`;
    } else {
      resultsCount.innerHTML = `Showing <strong>${count}</strong> of ${total} actors`;
    }
  }
}

function updateActiveFilters() {
  const container = document.getElementById('active-filters');
  const pillsContainer = document.getElementById('filter-pills');
  
  if (!container || !pillsContainer) return;
  
  const pills = [];
  
  if (currentFilters.search) {
    pills.push(`
      <span class="filter-pill">
        Search: "${escapeHtml(currentFilters.search)}"
        <button onclick="clearSearch()" aria-label="Clear search">×</button>
      </span>
    `);
  }
  
  if (currentFilters.category) {
    const category = categories.find(c => c.id === currentFilters.category);
    if (category) {
      pills.push(`
        <span class="filter-pill">
          ${category.name}
          <button onclick="clearCategory()" aria-label="Clear category">×</button>
        </span>
      `);
    }
  }
  
  if (pills.length > 0) {
    pillsContainer.innerHTML = pills.join('');
    container.style.display = 'flex';
  } else {
    container.style.display = 'none';
  }
}

function updatePageTitle() {
  const pageTitle = document.getElementById('actors-title');
  const pageDescription = document.getElementById('actors-description');
  
  if (currentFilters.category && pageTitle && pageDescription) {
    const category = categories.find(c => c.id === currentFilters.category);
    if (category) {
      pageTitle.textContent = category.name;
      pageDescription.textContent = `Browse all ${category.name.toLowerCase()} actors. Find the perfect tool for your needs.`;
    }
  } else if (pageTitle && pageDescription) {
    pageTitle.textContent = 'All Actors';
    pageDescription.textContent = 'Browse all 56 web scraping and automation tools. Search, filter, and find the perfect actor for your needs.';
  }
}

// Global clear functions
window.clearSearch = function() {
  const searchInput = document.getElementById('actor-search');
  if (searchInput) {
    searchInput.value = '';
    currentFilters.search = '';
    applyFilters();
  }
};

window.clearCategory = function() {
  const categorySelect = document.getElementById('category-filter');
  if (categorySelect) {
    categorySelect.value = '';
    currentFilters.category = '';
    applyFilters();
  }
  
  document.querySelectorAll('.category-card').forEach(card => {
    card.classList.remove('active');
  });
};

// Utility function to escape HTML
function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { applyFilters, sortActors };
}
