// js/ui-components.js - Shared UI rendering

const categoryDescriptions = {
  youtube: "Transcript extraction, channel monitoring, playlists, and search workflows for video research teams.",
  ai: "LLM utilities, image workflows, content generation, and AI-enabled automation for builders and operators.",
  maps: "Business discovery, lead generation, and local market research powered by maps and places data.",
  seo: "SERP, news, trend, and keyword collection for SEO teams, analysts, and content strategists.",
  ecommerce: "Product, pricing, store, and supplier intelligence for marketplaces and sourcing teams.",
  crypto: "Financial datasets, coin listings, exchange feeds, and currency utilities for real-time analysis.",
  media: "PDF, image, audio, screenshot, and conversion tools for media workflows and operations.",
  social: "Trend capture, ad research, and platform monitoring across fast-moving social surfaces.",
  dev: "APIs, utilities, and data endpoints that help developers ship dashboards, agents, and products faster."
};

document.addEventListener("DOMContentLoaded", () => {
  renderCategories();
  renderActors();
  renderCategoryFilter();
});

function renderCategories() {
  const container = document.getElementById("categories-grid");
  if (!container) {
    return;
  }

  container.innerHTML = categories.map((category) => `
      <button
        class="category-card category--${category.id}"
        type="button"
        data-category="${category.id}"
        aria-label="Filter actors by ${category.name}"
      >
        <span class="category-card-icon" aria-hidden="true">${category.icon}</span>
        <span class="category-name">${category.name}</span>
        <span class="category-count">${category.count} actors</span>
        <p class="category-description">${categoryDescriptions[category.id] || "Explore curated actor workflows for this category."}</p>
      </button>
    `).join("");

  container.querySelectorAll(".category-card").forEach((card) => {
    card.addEventListener("click", () => {
      window.filterByCategory(card.dataset.category);
    });
  });
}

function renderActors(actorsToRender = actors) {
  const container = document.getElementById("actors-grid");
  if (!container) {
    return;
  }

  if (!actorsToRender.length) {
    container.innerHTML = `
      <div class="no-results">
        <p>No actors match this combination yet. Try a broader phrase or reset the filters.</p>
        <button class="btn btn-secondary" type="button" onclick="clearAllFilters()">Clear Filters</button>
      </div>
    `;
    return;
  }

  container.innerHTML = actorsToRender.map((actor) => `
    <article class="actor-card" data-actor-id="${actor.id}">
      <div class="actor-card-header">
        <span class="actor-category-badge actor-category-badge--${actor.categoryId}">
          <span aria-hidden="true">${actor.icon}</span>
          <span>${actor.category}</span>
        </span>
        <h3 class="actor-name">
          <a href="${actor.apifyUrl}" target="_blank" rel="noopener noreferrer">${actor.name}</a>
        </h3>
        <p class="actor-description">${actor.shortDescription || actor.description}</p>
      </div>
      <div class="actor-card-body">
        <div class="actor-stat-cluster">
          <div class="actor-stat">
            <span class="actor-stat-label">Users</span>
            <span class="actor-stat-value">${formatNumber(actor.users)}</span>
          </div>
          <div class="actor-stat">
            <span class="actor-stat-label">Runs</span>
            <span class="actor-stat-value">${formatNumber(actor.totalRuns)}</span>
          </div>
          <div class="actor-stat">
            <span class="actor-stat-label">Rating</span>
            <span class="actor-stat-value">${formatRating(actor.rating)}</span>
          </div>
        </div>
        ${actor.features?.length ? `
          <div class="actor-features">
            <div class="actor-features-title">Best For</div>
            <ul class="actor-features-list">
              ${actor.features.slice(0, 3).map((feature) => `
                <li class="actor-feature-tag">${feature}</li>
              `).join("")}
            </ul>
          </div>
        ` : ""}
      </div>
      <div class="actor-card-footer">
        <a href="${actor.apifyUrl}" class="btn btn-primary btn-sm" target="_blank" rel="noopener noreferrer">Open Actor</a>
      </div>
    </article>
  `).join("");

  observeCardsForAnimation();
}

function renderCategoryFilter() {
  const select = document.getElementById("category-filter");
  if (!select) {
    return;
  }

  select.innerHTML = `
    <option value="">All Categories</option>
    ${categories.map((category) => `
      <option value="${category.id}">${category.name}</option>
    `).join("")}
  `;
}

function observeCardsForAnimation() {
  const cards = document.querySelectorAll(".actor-card:not(.fade-in-visible)");
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("fade-in-visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: "80px" });

  cards.forEach((card) => {
    card.classList.add("fade-in");
    observer.observe(card);
  });
}

window.filterByCategory = function filterByCategory(categoryId) {
  const select = document.getElementById("category-filter");
  if (select) {
    select.value = categoryId;
    select.dispatchEvent(new Event("change", { bubbles: true }));
  }

  document.querySelectorAll(".category-card").forEach((card) => {
    card.classList.toggle("active", card.dataset.category === categoryId);
  });

  const actorsSection = document.getElementById("actors");
  if (actorsSection) {
    actorsSection.scrollIntoView({ behavior: "smooth", block: "start" });
  }
};

window.clearAllFilters = function clearAllFilters() {
  const searchInput = document.getElementById("actor-search");
  const categorySelect = document.getElementById("category-filter");
  const sortSelect = document.getElementById("sort-filter");

  if (searchInput) {
    searchInput.value = "";
  }

  if (categorySelect) {
    categorySelect.value = "";
  }

  if (sortSelect) {
    sortSelect.value = "popular";
  }

  document.querySelectorAll(".category-card").forEach((card) => {
    card.classList.remove("active");
  });

  if (searchInput) {
    searchInput.dispatchEvent(new Event("input", { bubbles: true }));
  } else if (categorySelect) {
    categorySelect.dispatchEvent(new Event("change", { bubbles: true }));
  }
};
