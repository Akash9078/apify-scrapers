// js/main.js - Core functionality

document.addEventListener("DOMContentLoaded", () => {
  initializeApp();
});

function initializeApp() {
  initHeaderScroll();
  initMobileMenu();
  updateFooterYear();
  console.log("Web Scraper Tools website loaded");
}

function initHeaderScroll() {
  const header = document.querySelector(".site-header");
  if (!header) {
    return;
  }

  const onScroll = () => {
    header.classList.toggle("scrolled", window.scrollY > 12);
  };

  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });
}

function initMobileMenu() {
  const toggle = document.querySelector(".mobile-menu-toggle");
  const navList = document.querySelector(".nav-list");
  const nav = document.querySelector(".main-nav");

  if (!toggle || !navList || !nav) {
    return;
  }

  const closeMenu = () => {
    toggle.setAttribute("aria-expanded", "false");
    navList.classList.remove("active");
  };

  toggle.addEventListener("click", () => {
    const isExpanded = toggle.getAttribute("aria-expanded") === "true";
    toggle.setAttribute("aria-expanded", String(!isExpanded));
    navList.classList.toggle("active", !isExpanded);
  });

  navList.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", closeMenu);
  });

  document.addEventListener("click", (event) => {
    if (!nav.contains(event.target)) {
      closeMenu();
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeMenu();
    }
  });
}

function updateFooterYear() {
  const yearNodes = document.querySelectorAll("[data-current-year]");
  const updatedNodes = document.querySelectorAll("[data-last-updated]");
  const now = new Date();

  yearNodes.forEach((node) => {
    node.textContent = String(now.getFullYear());
  });

  updatedNodes.forEach((node) => {
    node.textContent = new Intl.DateTimeFormat("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric"
    }).format(now);
  });
}

function debounce(func, wait) {
  let timeoutId;

  return function debounced(...args) {
    window.clearTimeout(timeoutId);
    timeoutId = window.setTimeout(() => {
      func.apply(this, args);
    }, wait);
  };
}

function formatNumber(num) {
  return new Intl.NumberFormat("en-US", {
    notation: num >= 1000 ? "compact" : "standard",
    maximumFractionDigits: 1
  }).format(num);
}

function formatRating(rating) {
  return typeof rating === "number" ? rating.toFixed(1) : "Unrated";
}

if (typeof module !== "undefined" && module.exports) {
  module.exports = { debounce, formatNumber, formatRating };
}
