# Apify Actors Showcase Website - Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a modern, SEO-optimized static website showcasing 56 Apify Actors with search, filters, and animated stats using HTML, CSS, and vanilla JavaScript.

**Architecture:** Static site generated from markdown data source. Uses semantic HTML5, CSS3 with custom properties, and ES6+ JavaScript. Client-side hydration for interactivity while maintaining SEO through prerendered content.

**Tech Stack:** HTML5, CSS3, Vanilla JavaScript (ES6+), no frameworks. Single-page application feel with multi-page structure for SEO.

---

## File Structure Overview

```
apify-content/
├── index.html                    # Main HTML file (single page app)
├── css/
│   ├── main.css                 # Core styles with CSS variables
│   ├── components.css           # Component-specific styles
│   └── responsive.css           # Media queries
├── js/
│   ├── data.js                  # Actor data parsed from actors.md
│   ├── main.js                  # Core initialization
│   ├── search-filter.js         # Search and filter functionality
│   ├── animations.js            # Scroll animations and counters
│   └── ui-components.js         # Dynamic UI generation
├── assets/
│   ├── images/
│   │   ├── hero-bg.jpg
│   │   └── icons/
│   └── og-image.jpg             # Open Graph image
├── actors.md                     # Source data (already exists)
└── README.md                     # Documentation
```

---

## Phase 1: Project Setup & Data Preparation

### Task 1: Parse Actor Data from Markdown

**Goal:** Convert actors.md structured data into usable JavaScript array.

**Files:**
- Create: `js/data.js`
- Source: `actors.md` (exists at root)

**Steps:**

- [ ] **Step 1: Manually parse actors.md structure**
  - Read actors.md to understand table format
  - Extract all 56 actors with their fields
  - Map categories to consistent IDs

- [ ] **Step 2: Create data.js with actor array**

```javascript
// js/data.js
const actors = [
  {
    id: "youtube-transcript-scraper",
    name: "YouTube Transcript Scraper",
    category: "YouTube & Video Tools",
    categoryId: "youtube",
    description: "Scrape YouTube transcripts with 99%+ accuracy. Supports videos, shorts, and ended live streams",
    shortDescription: "Scrape YouTube transcripts with 99%+ accuracy",
    users: 275,
    rating: 5.0,
    totalRuns: 652510,
    apifyUrl: "https://apify.com/akash9078/youtube-transcript-extractor",
    icon: "📺",
    color: "#FF0000",
    features: ["99%+ accuracy", "Supports shorts", "Live streams support"],
    useCases: ["Content analysis", "Research", "Subtitle generation"]
  },
  // ... 55 more actors
];

const categories = [
  { id: "youtube", name: "YouTube & Video Tools", icon: "📺", color: "#FF0000", count: 6 },
  { id: "ai", name: "AI & LLM Tools", icon: "🤖", color: "#8B5CF6", count: 11 },
  { id: "maps", name: "Maps & Location Data", icon: "🗺️", color: "#10B981", count: 2 },
  { id: "seo", name: "Search & SEO", icon: "🔍", color: "#3B82F6", count: 6 },
  { id: "ecommerce", name: "E-commerce", icon: "🛒", color: "#F59E0B", count: 6 },
  { id: "crypto", name: "Crypto & Finance", icon: "💰", color: "#F97316", count: 5 },
  { id: "media", name: "Image & Media Tools", icon: "🎨", color: "#EC4899", count: 7 },
  { id: "social", name: "Social Media", icon: "📱", color: "#06B6D4", count: 4 },
  { id: "dev", name: "Developer Tools & APIs", icon: "🔧", color: "#6366F1", count: 9 }
];

const stats = {
  totalActors: 56,
  totalUsers: 1500,
  monthlyUsers: 468,
  successRate: 98.9,
  responseTime: 6,
  totalRuns: 1000000
};

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { actors, categories, stats };
}
```

- [ ] **Step 3: Add all 56 actors to data.js**
  - Copy all actor data from actors.md tables
  - Ensure all fields are populated
  - Verify category consistency

- [ ] **Step 4: Test data integrity**
  - Console.log actors.length (should be 56)
  - Check all required fields present
  - Verify no duplicate IDs

---

## Phase 2: HTML Structure

### Task 2: Create Main HTML Document

**Goal:** Build semantic HTML5 structure with all sections.

**Files:**
- Create: `index.html`

**Steps:**

- [ ] **Step 1: Create HTML5 boilerplate with meta tags**

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  
  <!-- Primary Meta Tags -->
  <title>Apify Actors by Akash | 56+ Web Scraping & Automation Tools</title>
  <meta name="description" content="Discover 56+ powerful Apify Actors for web scraping, AI automation, data extraction, and more. Built by Akash Kumar Naik. Free and easy to use.">
  <meta name="keywords" content="apify, web scraping, automation, actors, youtube scraper, ai tools, data extraction">
  <meta name="author" content="Akash Kumar Naik">
  <link rel="canonical" href="https://akash9078.github.io/apify-scrapers/">
  
  <!-- Open Graph / Facebook -->
  <meta property="og:type" content="website">
  <meta property="og:url" content="https://akash9078.github.io/apify-scrapers/">
  <meta property="og:title" content="Apify Actors by Akash | 56+ Web Scraping & Automation Tools">
  <meta property="og:description" content="Discover 56+ powerful Apify Actors for web scraping, AI automation, data extraction, and more.">
  <meta property="og:image" content="https://akash9078.github.io/apify-scrapers/assets/og-image.jpg">
  
  <!-- Twitter -->
  <meta property="twitter:card" content="summary_large_image">
  <meta property="twitter:url" content="https://akash9078.github.io/apify-scrapers/">
  <meta property="twitter:title" content="Apify Actors by Akash | 56+ Web Scraping & Automation Tools">
  <meta property="twitter:description" content="Discover 56+ powerful Apify Actors for web scraping, AI automation, data extraction, and more.">
  <meta property="twitter:image" content="https://akash9078.github.io/apify-scrapers/assets/og-image.jpg">
  
  <!-- Favicon -->
  <link rel="icon" type="image/svg+xml" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>🚀</text></svg>">
  
  <!-- Fonts -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
  
  <!-- Styles -->
  <link rel="stylesheet" href="css/main.css">
  <link rel="stylesheet" href="css/components.css">
  <link rel="stylesheet" href="css/responsive.css">
  
  <!-- Schema.org Structured Data -->
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Apify Actors by Akash",
    "url": "https://akash9078.github.io/apify-scrapers/",
    "description": "56+ web scraping and automation tools for developers",
    "author": {
      "@type": "Person",
      "name": "Akash Kumar Naik",
      "url": "https://apify.com/akash9078"
    }
  }
  </script>
</head>
<body>
  <!-- Skip to content for accessibility -->
  <a href="#main-content" class="skip-link">Skip to main content</a>
  
  <!-- Header -->
  <header class="site-header" role="banner">
    <div class="container">
      <div class="header-content">
        <a href="/" class="logo">
          <span class="logo-icon">🚀</span>
          <span class="logo-text">Apify Actors</span>
        </a>
        <nav class="main-nav" role="navigation" aria-label="Main navigation">
          <button class="mobile-menu-toggle" aria-label="Toggle menu" aria-expanded="false">
            <span></span><span></span><span></span>
          </button>
          <ul class="nav-list">
            <li><a href="#categories" class="nav-link">Categories</a></li>
            <li><a href="#actors" class="nav-link">All Actors</a></li>
            <li><a href="#stats" class="nav-link">Stats</a></li>
            <li><a href="https://apify.com/akash9078" class="nav-link nav-link--external" target="_blank" rel="noopener">Apify Profile →</a></li>
          </ul>
        </nav>
      </div>
    </div>
  </header>
  
  <main id="main-content" role="main">
    <!-- Hero Section -->
    <section class="hero" aria-labelledby="hero-heading">
      <div class="container">
        <div class="hero-content">
          <h1 id="hero-heading" class="hero-title">
            <span class="gradient-text">Apify Actors</span>
            <span class="hero-byline">by Akash</span>
          </h1>
          <p class="hero-description">
            Discover <strong>56+ powerful web scraping and automation tools</strong> for developers, 
            researchers, and businesses. Built with precision for the Apify platform.
          </p>
          <div class="hero-stats">
            <div class="hero-stat">
              <span class="hero-stat-number" data-count="56">0</span>
              <span class="hero-stat-label">Actors</span>
            </div>
            <div class="hero-stat">
              <span class="hero-stat-number" data-count="1500">0</span>
              <span class="hero-stat-label">Users</span>
            </div>
            <div class="hero-stat">
              <span class="hero-stat-number" data-count="98.9" data-suffix="%">0</span>
              <span class="hero-stat-label">Success Rate</span>
            </div>
          </div>
          <div class="hero-actions">
            <a href="#actors" class="btn btn-primary">Browse Actors</a>
            <a href="https://apify.com/akash9078" class="btn btn-secondary" target="_blank" rel="noopener">View on Apify</a>
          </div>
        </div>
      </div>
    </section>
    
    <!-- Categories Section -->
    <section id="categories" class="categories" aria-labelledby="categories-heading">
      <div class="container">
        <h2 id="categories-heading" class="section-title">Browse by Category</h2>
        <div class="categories-grid" id="categories-grid">
          <!-- Categories injected via JS -->
        </div>
      </div>
    </section>
    
    <!-- Search & Filter Section -->
    <section id="actors" class="actors-section" aria-labelledby="actors-heading">
      <div class="container">
        <h2 id="actors-heading" class="section-title">All Actors</h2>
        
        <!-- Search & Filter Bar -->
        <div class="search-filter-bar">
          <div class="search-box">
            <label for="actor-search" class="sr-only">Search actors</label>
            <input 
              type="search" 
              id="actor-search" 
              class="search-input" 
              placeholder="🔍 Search actors by name..."
              autocomplete="off"
            >
          </div>
          <div class="filter-controls">
            <div class="filter-group">
              <label for="category-filter" class="filter-label">Category</label>
              <select id="category-filter" class="filter-select">
                <option value="">All Categories</option>
                <!-- Options injected via JS -->
              </select>
            </div>
            <div class="filter-group">
              <label for="sort-filter" class="filter-label">Sort by</label>
              <select id="sort-filter" class="filter-select">
                <option value="popular">Most Popular</option>
                <option value="rating">Highest Rated</option>
                <option value="name">Name (A-Z)</option>
                <option value="runs">Most Runs</option>
              </select>
            </div>
          </div>
        </div>
        
        <!-- Active Filters -->
        <div class="active-filters" id="active-filters" style="display: none;">
          <span class="filters-label">Active:</span>
          <div class="filter-pills" id="filter-pills"></div>
          <button class="clear-filters" id="clear-filters">Clear All</button>
        </div>
        
        <!-- Results Count -->
        <div class="results-info">
          <span id="results-count">Showing all 56 actors</span>
        </div>
        
        <!-- Actors Grid -->
        <div class="actors-grid" id="actors-grid">
          <!-- Actor cards injected via JS -->
        </div>
        
        <!-- Load More (if implementing pagination) -->
        <div class="load-more-container" style="display: none;">
          <button class="btn btn-secondary" id="load-more">Load More</button>
        </div>
      </div>
    </section>
    
    <!-- Stats Section -->
    <section id="stats" class="stats-section" aria-labelledby="stats-heading">
      <div class="container">
        <h2 id="stats-heading" class="section-title">Trusted by the Community</h2>
        <div class="stats-grid">
          <div class="stat-card">
            <div class="stat-icon">🎭</div>
            <div class="stat-number" data-count="56">0</div>
            <div class="stat-label">Actors</div>
          </div>
          <div class="stat-card">
            <div class="stat-icon">👥</div>
            <div class="stat-number" data-count="1500" data-suffix="+">0</div>
            <div class="stat-label">Total Users</div>
          </div>
          <div class="stat-card">
            <div class="stat-icon">📅</div>
            <div class="stat-number" data-count="468">0</div>
            <div class="stat-label">Monthly Users</div>
          </div>
          <div class="stat-card">
            <div class="stat-icon">✅</div>
            <div class="stat-number" data-count="98.9" data-suffix="%">0</div>
            <div class="stat-label">Success Rate</div>
          </div>
          <div class="stat-card">
            <div class="stat-icon">⚡</div>
            <div class="stat-number" data-count="6" data-suffix="h">0</div>
            <div class="stat-label">Response Time</div>
          </div>
          <div class="stat-card">
            <div class="stat-icon">🚀</div>
            <div class="stat-number" data-count="1000000" data-prefix="1M+">0</div>
            <div class="stat-label">Total Runs</div>
          </div>
        </div>
      </div>
    </section>
    
    <!-- About Section -->
    <section id="about" class="about-section" aria-labelledby="about-heading">
      <div class="container">
        <div class="about-content">
          <div class="about-text">
            <h2 id="about-heading" class="section-title">About</h2>
            <p>
              Hi, I'm <strong>Akash Kumar Naik</strong>, a developer passionate about building 
              tools that make data extraction and automation accessible to everyone.
            </p>
            <p>
              With <strong>56+ actors</strong> on the Apify platform, I've helped over 
              <strong>1,500 users</strong> automate their workflows and extract valuable data 
              from the web.
            </p>
            <div class="about-links">
              <a href="https://apify.com/akash9078" class="btn btn-primary" target="_blank" rel="noopener">
                View Apify Profile
              </a>
              <a href="https://github.com/akash9078" class="btn btn-secondary" target="_blank" rel="noopener">
                GitHub Profile
              </a>
            </div>
          </div>
          <div class="about-image">
            <div class="profile-placeholder">
              <span>👨‍💻</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  </main>
  
  <!-- Footer -->
  <footer class="site-footer" role="contentinfo">
    <div class="container">
      <div class="footer-content">
        <div class="footer-brand">
          <span class="footer-logo">🚀 Apify Actors</span>
          <p class="footer-tagline">Built with ❤️ by Akash Kumar Naik</p>
        </div>
        <div class="footer-links">
          <div class="footer-section">
            <h3>Quick Links</h3>
            <ul>
              <li><a href="#categories">Categories</a></li>
              <li><a href="#actors">All Actors</a></li>
              <li><a href="#stats">Stats</a></li>
            </ul>
          </div>
          <div class="footer-section">
            <h3>Connect</h3>
            <ul>
              <li><a href="https://apify.com/akash9078" target="_blank" rel="noopener">Apify Profile</a></li>
              <li><a href="https://github.com/akash9078" target="_blank" rel="noopener">GitHub</a></li>
            </ul>
          </div>
        </div>
      </div>
      <div class="footer-bottom">
        <p>© 2025 Akash Kumar Naik. All rights reserved.</p>
        <p class="footer-meta">Last updated: March 31, 2025</p>
      </div>
    </div>
  </footer>
  
  <!-- Scripts -->
  <script src="js/data.js"></script>
  <script src="js/main.js"></script>
  <script src="js/search-filter.js"></script>
  <script src="js/animations.js"></script>
  <script src="js/ui-components.js"></script>
</body>
</html>
```

- [ ] **Step 2: Verify HTML structure**
  - Validate HTML5 structure
  - Check all ARIA labels present
  - Verify semantic elements used correctly

---

## Phase 3: CSS Styling

### Task 3: Create Core Styles (main.css)

**Goal:** Build foundation with CSS variables and base styles.

**Files:**
- Create: `css/main.css`

**Steps:**

- [ ] **Step 1: CSS Reset and Variables**

```css
/* css/main.css */

/* CSS Reset */
*, *::before, *::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

html {
  scroll-behavior: smooth;
  font-size: 16px;
}

body {
  font-family: 'Inter', system-ui, -apple-system, sans-serif;
  line-height: 1.6;
  color: var(--color-text);
  background-color: var(--color-bg);
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

img, picture, video, canvas, svg {
  display: block;
  max-width: 100%;
}

input, button, textarea, select {
  font: inherit;
}

p, h1, h2, h3, h4, h5, h6 {
  overflow-wrap: break-word;
}

/* CSS Variables */
:root {
  /* Primary Colors */
  --color-primary: #FF6B35;
  --color-primary-dark: #E55A2B;
  --color-primary-light: #FF8C5A;
  --color-secondary: #1A1A2E;
  --color-secondary-light: #2D2D44;
  
  /* Neutral Colors */
  --color-bg: #FFFFFF;
  --color-bg-alt: #F8F9FA;
  --color-bg-dark: #E9ECEF;
  --color-text: #1A1A2E;
  --color-text-muted: #6C757D;
  --color-text-light: #ADB5BD;
  --color-border: #DEE2E6;
  
  /* Accent Colors */
  --color-success: #00C9A7;
  --color-warning: #FFC107;
  --color-error: #FF3366;
  --color-info: #0DCAF0;
  
  /* Category Colors */
  --color-youtube: #FF0000;
  --color-ai: #8B5CF6;
  --color-maps: #10B981;
  --color-seo: #3B82F6;
  --color-ecommerce: #F59E0B;
  --color-crypto: #F97316;
  --color-media: #EC4899;
  --color-social: #06B6D4;
  --color-dev: #6366F1;
  
  /* Spacing */
  --space-1: 4px;
  --space-2: 8px;
  --space-3: 16px;
  --space-4: 24px;
  --space-5: 32px;
  --space-6: 48px;
  --space-7: 64px;
  --space-8: 96px;
  
  /* Typography */
  --font-size-xs: 0.75rem;
  --font-size-sm: 0.875rem;
  --font-size-base: 1rem;
  --font-size-lg: 1.125rem;
  --font-size-xl: 1.25rem;
  --font-size-2xl: 1.5rem;
  --font-size-3xl: 2rem;
  --font-size-4xl: 2.5rem;
  --font-size-5xl: 3.5rem;
  
  /* Shadows */
  --shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.05);
  --shadow-md: 0 4px 6px rgba(0, 0, 0, 0.1);
  --shadow-lg: 0 10px 15px rgba(0, 0, 0, 0.1);
  --shadow-xl: 0 20px 25px rgba(0, 0, 0, 0.15);
  
  /* Border Radius */
  --radius-sm: 4px;
  --radius-md: 8px;
  --radius-lg: 12px;
  --radius-xl: 16px;
  --radius-full: 9999px;
  
  /* Transitions */
  --transition-fast: 150ms ease;
  --transition-base: 250ms ease;
  --transition-slow: 350ms ease;
  
  /* Container */
  --container-max: 1200px;
  --container-padding: var(--space-4);
}

/* Container */
.container {
  width: 100%;
  max-width: var(--container-max);
  margin: 0 auto;
  padding: 0 var(--container-padding);
}

/* Screen reader only */
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}

/* Skip link */
.skip-link {
  position: absolute;
  top: -100%;
  left: 50%;
  transform: translateX(-50%);
  background: var(--color-secondary);
  color: white;
  padding: var(--space-3) var(--space-4);
  border-radius: var(--radius-md);
  z-index: 9999;
  transition: top var(--transition-fast);
}

.skip-link:focus {
  top: var(--space-4);
}
```

- [ ] **Step 2: Add Typography Styles**

```css
/* Typography */
h1, h2, h3, h4, h5, h6 {
  font-weight: 700;
  line-height: 1.2;
  color: var(--color-text);
}

h1 { font-size: var(--font-size-4xl); }
h2 { font-size: var(--font-size-3xl); }
h3 { font-size: var(--font-size-2xl); }
h4 { font-size: var(--font-size-xl); }

p {
  margin-bottom: var(--space-3);
}

a {
  color: var(--color-primary);
  text-decoration: none;
  transition: color var(--transition-fast);
}

a:hover {
  color: var(--color-primary-dark);
  text-decoration: underline;
}

/* Section Titles */
.section-title {
  text-align: center;
  margin-bottom: var(--space-6);
  font-size: var(--font-size-3xl);
  position: relative;
}

.section-title::after {
  content: '';
  display: block;
  width: 60px;
  height: 4px;
  background: linear-gradient(90deg, var(--color-primary), var(--color-primary-light));
  margin: var(--space-3) auto 0;
  border-radius: var(--radius-full);
}

/* Gradient Text */
.gradient-text {
  background: linear-gradient(135deg, var(--color-primary), var(--color-primary-dark));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}
```

- [ ] **Step 3: Add Button Styles**

```css
/* Buttons */
.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: var(--space-2);
  padding: var(--space-3) var(--space-5);
  font-weight: 600;
  font-size: var(--font-size-base);
  border-radius: var(--radius-full);
  border: 2px solid transparent;
  cursor: pointer;
  transition: all var(--transition-base);
  text-decoration: none;
}

.btn-primary {
  background: linear-gradient(135deg, var(--color-primary), var(--color-primary-dark));
  color: white;
  box-shadow: 0 4px 14px rgba(255, 107, 53, 0.4);
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(255, 107, 53, 0.5);
  color: white;
  text-decoration: none;
}

.btn-secondary {
  background: white;
  color: var(--color-secondary);
  border-color: var(--color-secondary);
}

.btn-secondary:hover {
  background: var(--color-secondary);
  color: white;
  transform: translateY(-2px);
  text-decoration: none;
}

.btn-sm {
  padding: var(--space-2) var(--space-3);
  font-size: var(--font-size-sm);
}

/* Focus styles */
.btn:focus-visible,
.search-input:focus-visible,
.filter-select:focus-visible {
  outline: 3px solid var(--color-primary);
  outline-offset: 2px;
}
```

- [ ] **Step 4: Add Header Styles**

```css
/* Header */
.site-header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid var(--color-border);
  z-index: 1000;
  transition: box-shadow var(--transition-base);
}

.site-header.scrolled {
  box-shadow: var(--shadow-md);
}

.header-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 70px;
}

.logo {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  font-weight: 700;
  font-size: var(--font-size-xl);
  color: var(--color-text);
  text-decoration: none;
}

.logo:hover {
  text-decoration: none;
}

.logo-icon {
  font-size: 1.5em;
}

.nav-list {
  display: flex;
  list-style: none;
  gap: var(--space-5);
}

.nav-link {
  color: var(--color-text);
  font-weight: 500;
  text-decoration: none;
  transition: color var(--transition-fast);
}

.nav-link:hover {
  color: var(--color-primary);
  text-decoration: none;
}

.nav-link--external {
  color: var(--color-primary);
}

/* Mobile Menu Toggle */
.mobile-menu-toggle {
  display: none;
  flex-direction: column;
  gap: 5px;
  background: none;
  border: none;
  cursor: pointer;
  padding: var(--space-2);
}

.mobile-menu-toggle span {
  display: block;
  width: 25px;
  height: 3px;
  background: var(--color-text);
  border-radius: 3px;
  transition: all var(--transition-fast);
}
```

- [ ] **Step 5: Add Hero Styles**

```css
/* Hero Section */
.hero {
  padding: calc(var(--space-8) + 70px) 0 var(--space-8);
  background: linear-gradient(135deg, var(--color-bg-alt) 0%, white 100%);
  text-align: center;
}

.hero-content {
  max-width: 800px;
  margin: 0 auto;
}

.hero-title {
  font-size: clamp(var(--font-size-4xl), 8vw, var(--font-size-5xl));
  margin-bottom: var(--space-4);
  line-height: 1.1;
}

.hero-byline {
  display: block;
  font-size: 0.5em;
  font-weight: 400;
  color: var(--color-text-muted);
  margin-top: var(--space-2);
}

.hero-description {
  font-size: var(--font-size-lg);
  color: var(--color-text-muted);
  max-width: 600px;
  margin: 0 auto var(--space-6);
}

.hero-stats {
  display: flex;
  justify-content: center;
  gap: var(--space-6);
  margin-bottom: var(--space-6);
  flex-wrap: wrap;
}

.hero-stat {
  text-align: center;
}

.hero-stat-number {
  display: block;
  font-size: var(--font-size-3xl);
  font-weight: 700;
  color: var(--color-primary);
}

.hero-stat-label {
  font-size: var(--font-size-sm);
  color: var(--color-text-muted);
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.hero-actions {
  display: flex;
  gap: var(--space-3);
  justify-content: center;
  flex-wrap: wrap;
}
```

- [ ] **Step 6: Test CSS in browser**
  - Open index.html in browser
  - Verify styles applied correctly
  - Check no console errors

---

### Task 4: Create Component Styles (components.css)

**Goal:** Style all UI components including cards, filters, and stats.

**Files:**
- Create: `css/components.css`

**Steps:**

- [ ] **Step 1: Category Cards**

```css
/* css/components.css */

/* Categories Section */
.categories {
  padding: var(--space-8) 0;
  background: white;
}

.categories-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: var(--space-4);
}

.category-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: var(--space-5);
  background: var(--color-bg-alt);
  border-radius: var(--radius-lg);
  text-decoration: none;
  color: var(--color-text);
  transition: all var(--transition-base);
  cursor: pointer;
  border: 2px solid transparent;
}

.category-card:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-lg);
  text-decoration: none;
  border-color: var(--color-border);
}

.category-card.active {
  border-color: var(--color-primary);
  background: white;
}

.category-icon {
  font-size: 2.5rem;
  margin-bottom: var(--space-3);
}

.category-name {
  font-weight: 600;
  text-align: center;
  margin-bottom: var(--space-1);
}

.category-count {
  font-size: var(--font-size-sm);
  color: var(--color-text-muted);
}
```

- [ ] **Step 2: Search and Filter Bar**

```css
/* Actors Section */
.actors-section {
  padding: var(--space-8) 0;
  background: var(--color-bg-alt);
}

.search-filter-bar {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-4);
  margin-bottom: var(--space-5);
  padding: var(--space-4);
  background: white;
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-sm);
}

.search-box {
  flex: 1;
  min-width: 250px;
}

.search-input {
  width: 100%;
  padding: var(--space-3) var(--space-4);
  border: 2px solid var(--color-border);
  border-radius: var(--radius-full);
  font-size: var(--font-size-base);
  transition: border-color var(--transition-fast);
}

.search-input:focus {
  border-color: var(--color-primary);
  outline: none;
}

.filter-controls {
  display: flex;
  gap: var(--space-3);
  flex-wrap: wrap;
}

.filter-group {
  display: flex;
  flex-direction: column;
  gap: var(--space-1);
}

.filter-label {
  font-size: var(--font-size-sm);
  font-weight: 500;
  color: var(--color-text-muted);
}

.filter-select {
  padding: var(--space-2) var(--space-4);
  border: 2px solid var(--color-border);
  border-radius: var(--radius-md);
  background: white;
  font-size: var(--font-size-base);
  cursor: pointer;
  min-width: 150px;
}

.filter-select:focus {
  border-color: var(--color-primary);
}

/* Active Filters */
.active-filters {
  display: flex;
  align-items: center;
  gap: var(--space-3);
  margin-bottom: var(--space-4);
  flex-wrap: wrap;
}

.filters-label {
  font-size: var(--font-size-sm);
  font-weight: 500;
  color: var(--color-text-muted);
}

.filter-pills {
  display: flex;
  gap: var(--space-2);
  flex-wrap: wrap;
}

.filter-pill {
  display: inline-flex;
  align-items: center;
  gap: var(--space-1);
  padding: var(--space-1) var(--space-3);
  background: var(--color-primary);
  color: white;
  border-radius: var(--radius-full);
  font-size: var(--font-size-sm);
}

.filter-pill button {
  background: none;
  border: none;
  color: white;
  cursor: pointer;
  font-size: 1.2em;
  line-height: 1;
  padding: 0 2px;
}

.clear-filters {
  background: none;
  border: none;
  color: var(--color-primary);
  cursor: pointer;
  font-size: var(--font-size-sm);
  text-decoration: underline;
}

.results-info {
  margin-bottom: var(--space-4);
  color: var(--color-text-muted);
  font-size: var(--font-size-sm);
}
```

- [ ] **Step 3: Actor Cards**

```css
/* Actors Grid */
.actors-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: var(--space-4);
}

.actor-card {
  display: flex;
  flex-direction: column;
  background: white;
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-sm);
  overflow: hidden;
  transition: all var(--transition-base);
  border: 1px solid var(--color-border);
}

.actor-card:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-lg);
}

.actor-card.hidden {
  display: none;
}

.actor-card-header {
  padding: var(--space-4);
  background: linear-gradient(135deg, var(--color-bg-alt), white);
  border-bottom: 1px solid var(--color-border);
}

.actor-category-badge {
  display: inline-flex;
  align-items: center;
  gap: var(--space-1);
  padding: var(--space-1) var(--space-2);
  background: var(--color-primary-light);
  color: white;
  border-radius: var(--radius-full);
  font-size: var(--font-size-xs);
  font-weight: 500;
  margin-bottom: var(--space-2);
}

.actor-name {
  font-size: var(--font-size-lg);
  font-weight: 600;
  margin-bottom: var(--space-2);
  line-height: 1.3;
}

.actor-description {
  font-size: var(--font-size-sm);
  color: var(--color-text-muted);
  line-height: 1.5;
}

.actor-card-body {
  padding: var(--space-4);
  flex: 1;
}

.actor-stats {
  display: flex;
  gap: var(--space-4);
  margin-bottom: var(--space-3);
}

.actor-stat {
  display: flex;
  align-items: center;
  gap: var(--space-1);
  font-size: var(--font-size-sm);
  color: var(--color-text-muted);
}

.actor-stat-icon {
  font-size: 1.1em;
}

.actor-stat-value {
  font-weight: 600;
  color: var(--color-text);
}

.actor-features {
  margin-bottom: var(--space-3);
}

.actor-features-title {
  font-size: var(--font-size-xs);
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: var(--color-text-muted);
  margin-bottom: var(--space-2);
}

.actor-features-list {
  list-style: none;
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-1);
}

.actor-feature-tag {
  padding: var(--space-1) var(--space-2);
  background: var(--color-bg-alt);
  border-radius: var(--radius-sm);
  font-size: var(--font-size-xs);
  color: var(--color-text-muted);
}

.actor-card-footer {
  padding: var(--space-3) var(--space-4);
  border-top: 1px solid var(--color-border);
  display: flex;
  gap: var(--space-2);
}

.actor-card-footer .btn {
  flex: 1;
  padding: var(--space-2) var(--space-3);
  font-size: var(--font-size-sm);
}
```

- [ ] **Step 4: Stats Section**

```css
/* Stats Section */
.stats-section {
  padding: var(--space-8) 0;
  background: var(--color-secondary);
  color: white;
}

.stats-section .section-title {
  color: white;
}

.stats-section .section-title::after {
  background: var(--color-primary);
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: var(--space-4);
}

.stat-card {
  text-align: center;
  padding: var(--space-5);
  background: rgba(255, 255, 255, 0.1);
  border-radius: var(--radius-lg);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.stat-icon {
  font-size: 2.5rem;
  margin-bottom: var(--space-2);
}

.stat-number {
  font-size: var(--font-size-3xl);
  font-weight: 700;
  color: var(--color-primary);
  margin-bottom: var(--space-1);
}

.stat-label {
  font-size: var(--font-size-sm);
  color: rgba(255, 255, 255, 0.8);
}
```

- [ ] **Step 5: About and Footer Sections**

```css
/* About Section */
.about-section {
  padding: var(--space-8) 0;
  background: white;
}

.about-content {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: var(--space-6);
  align-items: center;
}

.about-text p {
  font-size: var(--font-size-lg);
  color: var(--color-text-muted);
  margin-bottom: var(--space-3);
}

.about-links {
  display: flex;
  gap: var(--space-3);
  margin-top: var(--space-4);
  flex-wrap: wrap;
}

.about-image {
  display: flex;
  justify-content: center;
}

.profile-placeholder {
  width: 200px;
  height: 200px;
  background: var(--color-bg-alt);
  border-radius: var(--radius-xl);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 5rem;
}

/* Footer */
.site-footer {
  background: var(--color-secondary);
  color: white;
  padding: var(--space-8) 0 var(--space-4);
}

.footer-content {
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: var(--space-6);
  margin-bottom: var(--space-6);
}

.footer-logo {
  font-size: var(--font-size-xl);
  font-weight: 700;
}

.footer-tagline {
  color: rgba(255, 255, 255, 0.7);
  margin-top: var(--space-2);
}

.footer-links {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: var(--space-4);
}

.footer-section h3 {
  font-size: var(--font-size-base);
  font-weight: 600;
  margin-bottom: var(--space-3);
  color: white;
}

.footer-section ul {
  list-style: none;
}

.footer-section li {
  margin-bottom: var(--space-2);
}

.footer-section a {
  color: rgba(255, 255, 255, 0.7);
  text-decoration: none;
  transition: color var(--transition-fast);
}

.footer-section a:hover {
  color: white;
  text-decoration: none;
}

.footer-bottom {
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  padding-top: var(--space-4);
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: var(--space-2);
}

.footer-meta {
  color: rgba(255, 255, 255, 0.5);
  font-size: var(--font-size-sm);
}
```

- [ ] **Step 6: Test components in browser**
  - Refresh index.html
  - Check card layouts
  - Verify hover effects

---

### Task 5: Create Responsive Styles

**Goal:** Add mobile-first responsive styles.

**Files:**
- Create: `css/responsive.css`

**Steps:**

- [ ] **Step 1: Mobile Styles (< 640px)**

```css
/* css/responsive.css */

/* Mobile Menu */
@media (max-width: 768px) {
  .mobile-menu-toggle {
    display: flex;
  }
  
  .nav-list {
    position: fixed;
    top: 70px;
    left: 0;
    right: 0;
    background: white;
    flex-direction: column;
    padding: var(--space-4);
    gap: var(--space-3);
    box-shadow: var(--shadow-lg);
    transform: translateY(-100%);
    opacity: 0;
    pointer-events: none;
    transition: all var(--transition-base);
  }
  
  .nav-list.active {
    transform: translateY(0);
    opacity: 1;
    pointer-events: auto;
  }
  
  /* Hero */
  .hero {
    padding: calc(var(--space-6) + 70px) 0 var(--space-6);
  }
  
  .hero-title {
    font-size: var(--font-size-3xl);
  }
  
  .hero-stats {
    flex-direction: column;
    gap: var(--space-4);
  }
  
  /* Categories */
  .categories-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: var(--space-3);
  }
  
  /* Search & Filter */
  .search-filter-bar {
    flex-direction: column;
  }
  
  .filter-controls {
    width: 100%;
    justify-content: stretch;
  }
  
  .filter-group {
    flex: 1;
  }
  
  .filter-select {
    width: 100%;
  }
  
  /* Actors Grid */
  .actors-grid {
    grid-template-columns: 1fr;
  }
  
  /* Stats */
  .stats-grid {
    grid-template-columns: repeat(2, 1fr);
  }
  
  /* About */
  .about-content {
    grid-template-columns: 1fr;
    text-align: center;
  }
  
  .about-links {
    justify-content: center;
  }
  
  /* Footer */
  .footer-content {
    grid-template-columns: 1fr;
    text-align: center;
  }
  
  .footer-links {
    justify-content: center;
  }
  
  .footer-bottom {
    flex-direction: column;
    text-align: center;
  }
}

/* Tablet (640px - 1024px) */
@media (min-width: 640px) and (max-width: 1024px) {
  .categories-grid {
    grid-template-columns: repeat(3, 1fr);
  }
  
  .actors-grid {
    grid-template-columns: repeat(2, 1fr);
  }
  
  .stats-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

/* Desktop (> 1024px) */
@media (min-width: 1024px) {
  .actors-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

/* Large Desktop (> 1280px) */
@media (min-width: 1280px) {
  .actors-grid {
    grid-template-columns: repeat(4, 1fr);
  }
}

/* Reduce motion for accessibility */
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}

/* Touch-friendly targets on mobile */
@media (pointer: coarse) {
  .btn,
  .nav-link,
  .category-card,
  .actor-card {
    min-height: 44px;
  }
  
  .search-input,
  .filter-select {
    min-height: 44px;
  }
}
```

- [ ] **Step 2: Test responsiveness**
  - Open DevTools
  - Test at 320px, 768px, 1024px, 1440px
  - Verify layouts adjust correctly

---

## Phase 4: JavaScript Functionality

### Task 6: Create Core JavaScript (main.js)

**Goal:** Initialize the app and handle core functionality.

**Files:**
- Create: `js/main.js`

**Steps:**

- [ ] **Step 1: Core initialization**

```javascript
// js/main.js

// Wait for DOM to be ready
document.addEventListener('DOMContentLoaded', () => {
  initializeApp();
});

function initializeApp() {
  // Initialize header scroll effect
  initHeaderScroll();
  
  // Initialize mobile menu
  initMobileMenu();
  
  // Log ready
  console.log('🚀 Apify Actors website loaded');
}

// Header scroll effect
function initHeaderScroll() {
  const header = document.querySelector('.site-header');
  let lastScroll = 0;
  
  window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
    
    lastScroll = currentScroll;
  });
}

// Mobile menu toggle
function initMobileMenu() {
  const toggle = document.querySelector('.mobile-menu-toggle');
  const navList = document.querySelector('.nav-list');
  
  if (toggle && navList) {
    toggle.addEventListener('click', () => {
      const isExpanded = toggle.getAttribute('aria-expanded') === 'true';
      toggle.setAttribute('aria-expanded', !isExpanded);
      navList.classList.toggle('active');
    });
    
    // Close menu when clicking a link
    navList.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        toggle.setAttribute('aria-expanded', 'false');
        navList.classList.remove('active');
      });
    });
  }
}

// Utility functions
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

function formatNumber(num) {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + 'M';
  } else if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'K';
  }
  return num.toString();
}

function formatRating(rating) {
  return rating ? rating.toFixed(1) : 'N/A';
}

// Export for other modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { debounce, formatNumber, formatRating };
}
```

- [ ] **Step 2: Test in browser console**
  - Open DevTools
  - Check console.log message appears
  - Test mobile menu toggle

---

### Task 7: Create UI Components (ui-components.js)

**Goal:** Generate dynamic UI elements from data.

**Files:**
- Create: `js/ui-components.js`

**Steps:**

- [ ] **Step 1: Generate category cards**

```javascript
// js/ui-components.js

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
        <span class="actor-category-badge" style="background: ${actor.color}20; color: ${actor.color}">
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
        ${actor.features ? `
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
          View on Apify
        </a>
      </div>
    </article>
  `).join('');
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
```

- [ ] **Step 2: Test in browser**
  - Verify categories render correctly
  - Check actor cards display
  - Test category click filters actors

---

### Task 8: Create Search and Filter (search-filter.js)

**Goal:** Implement real-time search and filtering functionality.

**Files:**
- Create: `js/search-filter.js`

**Steps:**

- [ ] **Step 1: Search and filter logic**

```javascript
// js/search-filter.js

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
      resultsCount.textContent = `Showing all ${total} actors`;
    } else {
      resultsCount.textContent = `Showing ${count} of ${total} actors`;
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
        Search: "${currentFilters.search}"
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
```

- [ ] **Step 2: Test search and filter**
  - Type in search box
  - Verify filtering works
  - Test category dropdown
  - Test clear buttons

---

### Task 9: Create Animations (animations.js)

**Goal:** Add scroll-triggered animations and counter animations.

**Files:**
- Create: `js/animations.js`

**Steps:**

- [ ] **Step 1: Counter animation**

```javascript
// js/animations.js

document.addEventListener('DOMContentLoaded', () => {
  initializeAnimations();
});

function initializeAnimations() {
  // Intersection Observer for stats
  const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounters();
        statsObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });
  
  const statsSection = document.querySelector('.stats-section');
  if (statsSection) {
    statsObserver.observe(statsSection);
  }
  
  // Intersection Observer for fade-in animations
  const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('fade-in-visible');
        fadeObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '50px' });
  
  // Observe all cards
  document.querySelectorAll('.actor-card, .category-card, .stat-card').forEach(card => {
    card.classList.add('fade-in');
    fadeObserver.observe(card);
  });
}

// Counter animation function
function animateCounters() {
  const counters = document.querySelectorAll('[data-count]');
  
  counters.forEach(counter => {
    const target = parseFloat(counter.dataset.count);
    const suffix = counter.dataset.suffix || '';
    const prefix = counter.dataset.prefix || '';
    const duration = 2000; // 2 seconds
    const start = 0;
    const startTime = performance.now();
    
    function updateCounter(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Ease out expo
      const easeOut = 1 - Math.pow(1 - progress, 3);
      const current = start + (target - start) * easeOut;
      
      if (Number.isInteger(target)) {
        counter.textContent = prefix + Math.floor(current).toLocaleString() + suffix;
      } else {
        counter.textContent = prefix + current.toFixed(1) + suffix;
      }
      
      if (progress < 1) {
        requestAnimationFrame(updateCounter);
      }
    }
    
    requestAnimationFrame(updateCounter);
  });
}

// Add CSS animation class
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
```

- [ ] **Step 2: Test animations**
  - Scroll to stats section
  - Verify counters animate
  - Check cards fade in

---

## Phase 5: Testing & Optimization

### Task 10: Add SEO Meta Tags and Structured Data

**Goal:** Ensure all SEO elements are in place.

**Files:**
- Modify: `index.html` (head section)

**Steps:**

- [ ] **Step 1: Verify all meta tags present**
  - Check title, description, keywords
  - Verify Open Graph tags
  - Verify Twitter Card tags
  - Check canonical URL
  - Verify schema.org JSON-LD

- [ ] **Step 2: Add favicon and app icons**
  - Create SVG favicon
  - Add to head

- [ ] **Step 3: Test with SEO tools**
  - Check in browser devtools
  - Verify all meta tags render

---

### Task 11: Performance Optimization

**Goal:** Optimize for Core Web Vitals.

**Steps:**

- [ ] **Step 1: Add performance hints to HTML**
  ```html
  <!-- Preconnect to Google Fonts -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  
  <!-- Preload critical assets -->
  <link rel="preload" href="css/main.css" as="style">
  <link rel="preload" href="js/data.js" as="script">
  ```

- [ ] **Step 2: Optimize CSS loading**
  ```html
  <link rel="stylesheet" href="css/main.css">
  <link rel="preload" href="css/components.css" as="style" onload="this.onload=null;this.rel='stylesheet'">
  <noscript><link rel="stylesheet" href="css/components.css"></noscript>
  ```

- [ ] **Step 3: Lazy load images**
  - Add loading="lazy" to any images
  - Use placeholder for hero if needed

---

### Task 12: Final Testing

**Goal:** Verify everything works correctly.

**Steps:**

- [ ] **Step 1: Functional Testing**
  - [ ] All 56 actors display
  - [ ] Search filters correctly
  - [ ] Category filter works
  - [ ] Sort options work
  - [ ] Clear filters works
  - [ ] Mobile menu toggles
  - [ ] Smooth scroll works
  - [ ] All links work

- [ ] **Step 2: Responsive Testing**
  - [ ] Test at 320px width
  - [ ] Test at 768px width
  - [ ] Test at 1024px width
  - [ ] Test at 1440px width
  - [ ] Touch targets are 44px+

- [ ] **Step 3: Accessibility Testing**
  - [ ] Keyboard navigation works
  - [ ] Focus indicators visible
  - [ ] ARIA labels present
  - [ ] Color contrast 4.5:1+
  - [ ] Screen reader friendly

- [ ] **Step 4: Performance Testing**
  - [ ] Lighthouse score 90+
  - [ ] First Contentful Paint < 1.5s
  - [ ] No console errors
  - [ ] Images optimized
  - [ ] CSS/JS minified

---

## Deployment Instructions

### Task 13: Prepare for Deployment

**Goal:** Get the site ready for hosting.

**Steps:**

- [ ] **Step 1: Create deployment files**
  - Create `robots.txt`
  - Create `sitemap.xml`
  - Create `README.md`

- [ ] **Step 2: Create robots.txt**
```
User-agent: *
Allow: /
Sitemap: https://akash9078.github.io/apify-scrapers/sitemap.xml
```

- [ ] **Step 3: Create sitemap.xml**
```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://akash9078.github.io/apify-scrapers/</loc>
    <lastmod>2025-03-31</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
</urlset>
```

- [ ] **Step 4: Test locally**
  - Open index.html in browser
  - Verify all assets load
  - Test all functionality

---

## Success Criteria

All tasks complete when:

✅ **Functionality:**
- [ ] All 56 actors render correctly
- [ ] Search works in real-time
- [ ] Filters work independently and together
- [ ] Sorting works (popular, rating, name, runs)
- [ ] Mobile menu works
- [ ] All external links work

✅ **Design:**
- [ ] Professional corporate look
- [ ] Consistent color scheme
- [ ] Smooth animations
- [ ] Responsive on all devices

✅ **SEO:**
- [ ] Meta tags present
- [ ] Schema.org structured data
- [ ] Semantic HTML5
- [ ] robots.txt and sitemap.xml

✅ **Performance:**
- [ ] Lighthouse score 90+
- [ ] Fast load times
- [ ] Optimized assets
- [ ] No console errors

✅ **Accessibility:**
- [ ] WCAG 2.1 AA compliant
- [ ] Keyboard navigable
- [ ] Screen reader friendly
- [ ] Color contrast sufficient

---

## Notes

- The website is a **Single Page Application** (SPA) with all content on index.html
- Actor data is embedded in `js/data.js` (parsed from actors.md)
- No backend required - purely static files
- Works on any static hosting (GitHub Pages, Netlify, Vercel, etc.)
- Total file count: ~10 files (HTML, CSS, JS, assets)

**Ready to implement!** Start with Task 1 and work through sequentially.
