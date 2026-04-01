// js/search-filter.js - Search, filter, and URL state

const defaultFilters = {
  search: "",
  category: "",
  sort: "popular"
};

let currentFilters = { ...defaultFilters };

document.addEventListener("DOMContentLoaded", () => {
  initializeSearchFilter();
});

function initializeSearchFilter() {
  const searchInput = document.getElementById("actor-search");
  const categorySelect = document.getElementById("category-filter");
  const sortSelect = document.getElementById("sort-filter");
  const clearButton = document.getElementById("clear-filters");

  loadFiltersFromUrl();

  if (searchInput) {
    searchInput.value = currentFilters.search;
    searchInput.addEventListener("input", debounce((event) => {
      currentFilters.search = event.target.value.trim().toLowerCase();
      applyFilters();
    }, 200));
  }

  if (categorySelect) {
    categorySelect.value = currentFilters.category;
    categorySelect.addEventListener("change", (event) => {
      currentFilters.category = event.target.value;
      applyFilters();
      syncCategoryCards();
    });
  }

  if (sortSelect) {
    sortSelect.value = currentFilters.sort;
    sortSelect.addEventListener("change", (event) => {
      currentFilters.sort = event.target.value;
      applyFilters();
    });
  }

  if (clearButton) {
    clearButton.addEventListener("click", () => {
      window.clearAllFilters();
    });
  }

  applyFilters();
  syncCategoryCards();
}

function loadFiltersFromUrl() {
  const params = new URLSearchParams(window.location.search);
  currentFilters.search = (params.get("search") || "").trim().toLowerCase();
  currentFilters.category = params.get("category") || "";
  currentFilters.sort = params.get("sort") || defaultFilters.sort;
}

function writeFiltersToUrl() {
  const params = new URLSearchParams();

  if (currentFilters.search) {
    params.set("search", currentFilters.search);
  }

  if (currentFilters.category) {
    params.set("category", currentFilters.category);
  }

  if (currentFilters.sort && currentFilters.sort !== defaultFilters.sort) {
    params.set("sort", currentFilters.sort);
  }

  const nextUrl = `${window.location.pathname}${params.toString() ? `?${params.toString()}` : ""}`;
  window.history.replaceState({}, "", nextUrl);
}

function applyFilters() {
  let filteredActors = [...actors];

  if (currentFilters.search) {
    filteredActors = filteredActors.filter((actor) => {
      const haystack = [
        actor.name,
        actor.description,
        actor.category,
        ...(actor.features || []),
        ...(actor.useCases || [])
      ].join(" ").toLowerCase();

      return haystack.includes(currentFilters.search);
    });
  }

  if (currentFilters.category) {
    filteredActors = filteredActors.filter((actor) => actor.categoryId === currentFilters.category);
  }

  filteredActors = sortActors(filteredActors, currentFilters.sort);

  renderActors(filteredActors);
  updateResultsCount(filteredActors.length);
  updateActiveFilters();
  updatePageTitle(filteredActors.length);
  updateStructuredSummary(filteredActors);
  writeFiltersToUrl();
}

function sortActors(actorsToSort, sortType) {
  const sortedActors = [...actorsToSort];

  switch (sortType) {
    case "rating":
      return sortedActors.sort((a, b) => (b.rating || 0) - (a.rating || 0));
    case "name":
      return sortedActors.sort((a, b) => a.name.localeCompare(b.name));
    case "runs":
      return sortedActors.sort((a, b) => b.totalRuns - a.totalRuns);
    case "popular":
    default:
      return sortedActors.sort((a, b) => b.users - a.users);
  }
}

function updateResultsCount(count) {
  const resultsCount = document.getElementById("results-count");
  if (!resultsCount) {
    return;
  }

  const total = actors.length;
  resultsCount.innerHTML = count === total
    ? `Showing <strong>${total}</strong> actors`
    : `Showing <strong>${count}</strong> of ${total} actors`;
}

function updateActiveFilters() {
  const container = document.getElementById("active-filters");
  const pillsContainer = document.getElementById("filter-pills");

  if (!container || !pillsContainer) {
    return;
  }

  const pills = [];

  if (currentFilters.search) {
    pills.push(`
      <span class="filter-pill">
        Search: "${escapeHtml(currentFilters.search)}"
        <button type="button" onclick="clearSearch()" aria-label="Clear search filter">x</button>
      </span>
    `);
  }

  if (currentFilters.category) {
    const category = categories.find((entry) => entry.id === currentFilters.category);
    if (category) {
      pills.push(`
        <span class="filter-pill">
          ${category.name}
          <button type="button" onclick="clearCategory()" aria-label="Clear category filter">x</button>
        </span>
      `);
    }
  }

  pillsContainer.innerHTML = pills.join("");
  container.classList.toggle("is-hidden", !pills.length);
}

function updatePageTitle(count) {
  const pageTitle = document.getElementById("actors-title");
  const pageDescription = document.getElementById("actors-description");

  if (!pageTitle || !pageDescription) {
    return;
  }

  if (currentFilters.category) {
    const category = categories.find((entry) => entry.id === currentFilters.category);
    if (!category) {
      return;
    }

    pageTitle.textContent = category.name;
    pageDescription.textContent = `Explore ${count} ${category.name.toLowerCase()} actors for production scraping, API workflows, and repeatable automation.`;
    return;
  }

  pageTitle.textContent = "All Actors";
  pageDescription.textContent = "Browse the full actor catalog, compare categories, and open the right Apify workflow for your next automation task.";
}

function updateStructuredSummary(filteredActors) {
  const summary = document.getElementById("results-summary");
  if (!summary) {
    return;
  }

  if (!filteredActors.length) {
    summary.textContent = "No actors currently match the active search and category filters.";
    return;
  }

  const names = filteredActors.slice(0, 6).map((actor) => actor.name).join(", ");
  summary.textContent = currentFilters.category || currentFilters.search
    ? `Filtered results include ${names}${filteredActors.length > 6 ? ", and more." : "."}`
    : `Popular actors include ${names}${filteredActors.length > 6 ? ", and more." : "."}`;
}

function syncCategoryCards() {
  document.querySelectorAll(".category-card").forEach((card) => {
    card.classList.toggle("active", card.dataset.category === currentFilters.category);
  });
}

window.clearSearch = function clearSearch() {
  const searchInput = document.getElementById("actor-search");
  currentFilters.search = "";
  if (searchInput) {
    searchInput.value = "";
  }
  applyFilters();
};

window.clearCategory = function clearCategory() {
  const categorySelect = document.getElementById("category-filter");
  currentFilters.category = "";
  if (categorySelect) {
    categorySelect.value = "";
  }
  syncCategoryCards();
  applyFilters();
};

function escapeHtml(text) {
  const div = document.createElement("div");
  div.textContent = text;
  return div.innerHTML;
}

if (typeof module !== "undefined" && module.exports) {
  module.exports = { applyFilters, sortActors };
}
