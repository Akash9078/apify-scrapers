# Apify Actors Showcase Website - Design Specification

**Date:** March 31, 2025  
**Status:** Approved  
**Author:** Akash Kumar Naik (akash9078)

---

## Executive Summary

A modern, SEO-optimized static website showcasing 56 Apify Actors across 11 categories. Combines portfolio presentation, product directory functionality, and documentation hub in a professional corporate design.

**Live Data Source:** `actors.md` (176 lines of structured data)  
**Target Audience:** Developers, businesses, researchers seeking web scraping and automation tools  
**Primary Goal:** Drive traffic to Apify Store while establishing professional credibility

---

## 1. Architecture Overview

### 1.1 Tech Stack

| Layer | Technology | Purpose |
|-------|-----------|---------|
| **Markup** | HTML5 (semantic) | SEO-friendly structure, accessibility |
| **Styling** | CSS3 (custom properties) | Maintainable theming, modern layouts |
| **Logic** | Vanilla JavaScript (ES6+) | Interactivity without framework overhead |
| **Generation** | Static Site Generation | Prerendered HTML for SEO excellence |

### 1.2 Page Structure

```
apify-content/
├── index.html                    # Home page with all sections
├── actors/
│   ├── youtube-transcript-scraper.html
│   ├── ai-content-humanizer.html
│   └── ... (56 actor detail pages)
├── categories/
│   ├── youtube-video-tools.html
│   ├── ai-llm-tools.html
│   └── ... (11 category pages)
├── assets/
│   ├── css/
│   │   ├── main.css              # Critical styles (inline in head)
│   │   └── components.css        # Async loaded
│   ├── js/
│   │   ├── main.js               # Core functionality
│   │   └── search-filter.js      # Interactive features
│   └── images/
│       ├── hero-bg.webp
│       ├── icons/
│       └── og-images/
├── sitemap.xml
└── robots.txt
```

### 1.3 Data Pipeline

```
actors.md (source)
    ↓
Parse Markdown → JSON (build time)
    ↓
Generate HTML pages
    ↓
Optimize assets
    ↓
Deploy static site
```

---

## 2. UI/Design System

### 2.1 Color Palette

**Primary Brand Colors:**
- `--color-primary: #FF6B35` (Apify Orange - energetic, professional)
- `--color-primary-dark: #E55A2B` (Hover states)
- `--color-secondary: #1A1A2E` (Deep Navy - trust, tech authority)
- `--color-secondary-light: #2D2D44` (Card backgrounds)

**Neutral Colors:**
- `--color-bg: #FFFFFF` (Primary background)
- `--color-bg-alt: #F8F9FA` (Section alternation)
- `--color-text: #1A1A2E` (Primary text)
- `--color-text-muted: #6C757D` (Secondary text)
- `--color-border: #E9ECEF` (Subtle borders)

**Accent Colors:**
- `--color-success: #00C9A7` (Success states, stats)
- `--color-warning: #FFC107` (Warning states)
- `--color-error: #FF3366` (Error states, CTAs)
- `--color-info: #0DCAF0` (Information)

**Category Colors:**
- YouTube: `#FF0000`
- AI: `#8B5CF6`
- Maps: `#10B981`
- SEO: `#3B82F6`
- E-commerce: `#F59E0B`
- Crypto: `#F97316`
- Media: `#EC4899`
- Social: `#06B6D4`
- Dev Tools: `#6366F1`

### 2.2 Typography

**Font Families:**
- Primary: `Inter, system-ui, -apple-system, sans-serif`
- Monospace: `JetBrains Mono, Consolas, monospace` (code snippets)

**Type Scale:**

| Element | Size | Weight | Line Height | Letter Spacing |
|---------|------|--------|-------------|----------------|
| Hero | 56px | 700 | 1.1 | -0.02em |
| H1 | 40px | 700 | 1.2 | -0.01em |
| H2 | 32px | 600 | 1.3 | 0 |
| H3 | 24px | 600 | 1.4 | 0 |
| Body Large | 18px | 400 | 1.6 | 0 |
| Body | 16px | 400 | 1.6 | 0 |
| Small | 14px | 400 | 1.5 | 0 |
| Caption | 12px | 500 | 1.4 | 0.02em |

### 2.3 Spacing System

**Base Unit:** 8px

| Token | Value | Usage |
|-------|-------|-------|
| `space-1` | 4px | Tight gaps |
| `space-2` | 8px | Small margins |
| `space-3` | 16px | Component padding |
| `space-4` | 24px | Section gutters |
| `space-5` | 32px | Major sections |
| `space-6` | 48px | Section padding |
| `space-7` | 64px | Large sections |
| `space-8` | 96px | Hero spacing |

### 2.4 Component Library

#### Cards
```css
.actor-card {
  background: white;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.08);
  transition: all 0.3s ease;
  padding: 24px;
}

.actor-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 24px rgba(0,0,0,0.12);
}
```

#### Buttons
```css
.btn {
  border-radius: 32px;
  padding: 12px 24px;
  font-weight: 600;
  transition: all 0.2s ease;
}

.btn-primary {
  background: linear-gradient(135deg, #FF6B35, #E55A2B);
  color: white;
}

.btn-secondary {
  background: white;
  border: 2px solid #1A1A2E;
  color: #1A1A2E;
}
```

#### Badges
```css
.category-badge {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 14px;
  font-weight: 500;
}
```

---

## 3. SEO/AIO/GEO Strategy

### 3.1 Technical SEO

**Semantic HTML5 Structure:**
```html
<header role="banner">
  <nav role="navigation" aria-label="Main navigation">
</header>
<main role="main">
  <section aria-labelledby="section-heading">
</main>
<footer role="contentinfo">
```

**Schema.org Structured Data:**

**Organization Schema:**
```json
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Apify Actors by Akash",
  "url": "https://akash9078.github.io/apify-actors",
  "logo": "...",
  "sameAs": [
    "https://apify.com/akash9078",
    "https://github.com/akash9078"
  ]
}
```

**SoftwareApplication Schema (per actor):**
```json
{
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "YouTube Transcript Scraper",
  "applicationCategory": "DeveloperApplication",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD"
  },
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "5.0",
    "ratingCount": "275"
  }
}
```

**Meta Tags (Template):**
```html
<title>Actor Name | Apify Actors by Akash</title>
<meta name="description" content="[Actor purpose] - [Key benefit]. Part of 56+ web scraping and automation tools.">
<meta name="keywords" content="apify, actor, scraper, automation, [category keywords]">
<link rel="canonical" href="https://akash9078.github.io/apify-actors/actors/[actor-id]/">

<!-- Open Graph -->
<meta property="og:title" content="Actor Name | Apify Actors">
<meta property="og:description" content="[Actor description]">
<meta property="og:image" content="[og-image-url]">
<meta property="og:url" content="[page-url]">
<meta property="og:type" content="website">

<!-- Twitter -->
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="Actor Name | Apify Actors">
<meta name="twitter:description" content="[Actor description]">
<meta name="twitter:image" content="[og-image-url]">
```

### 3.2 AI-Readable Content (AIO)

**Content Structure:**
- Clear H1 with primary keyword
- First paragraph answers "what is this" in <100 words
- H2 sections with descriptive labels
- Lists for features and use cases
- FAQ schema for common questions
- BreadcrumbList schema for navigation

**Entity Optimization:**
- Link to authoritative sources (Apify docs, Wikipedia)
- Use structured data for entities
- Include related entities in content
- Create entity relationships (e.g., "This actor uses the YouTube Data API")

### 3.3 Generative SEO (GEO)

**Featured Snippet Optimization:**
- "What is [actor name]?" → Direct answer in first paragraph
- "How to [use case]" → Step-by-step numbered list
- "Best tool for [task]" → Comparison table
- "[Actor name] vs [alternative]" → Comparison section

**Rich Results:**
- FAQPage schema for actor pages
- BreadcrumbList for navigation
- Review/Rating schema where applicable
- SoftwareApplication schema for all actors

**Question-Based Content:**
```
- How do I scrape YouTube transcripts?
- What is the best AI content humanizer?
- How to extract Google Maps business data?
- Can I convert audio files with Apify?
- What actors are available for crypto data?
```

### 3.4 Performance Metrics

**Core Web Vitals Targets:**
- **LCP (Largest Contentful Paint):** < 2.5s
- **FID (First Input Delay):** < 100ms
- **CLS (Cumulative Layout Shift):** < 0.1
- **TTFB (Time to First Byte):** < 600ms

**Lighthouse Targets:**
- Performance: 95+
- Accessibility: 100
- Best Practices: 100
- SEO: 100

---

## 4. Interactive Features

### 4.1 Search & Filter System

**Real-time Search:**
```javascript
// Search across name, description, category
// Debounced at 300ms
// Results update instantly
// Highlight matching text
```

**Category Filters:**
- Horizontal scroll on mobile
- Checkboxes on desktop
- Instant filtering (client-side)
- Multi-select support
- Active filter pills

**Sort Options:**
- Most Popular (by user count)
- Highest Rated
- Newest First
- Name (A-Z)
- Most Runs

**UI Elements:**
```
[🔍 Search actors...          ] [Category ▼] [Sort ▼]

Active: [YouTube ✕] [AI ✕]  [Clear All]

Showing 12 of 56 actors
```

### 4.2 Actor Cards

**Card Layout:**
```
┌─────────────────────────────┐
│  📺  YouTube & Video        │  ← Category badge
│                             │
│  YouTube Transcript         │  ← Actor name (H3)
│  Scraper                    │
│                             │
│  Scrape YouTube transcripts │  ← Description
│  with 99%+ accuracy...        │
│                             │
│  ⭐ 5.0  👤 275  ▶ 652K     │  ← Stats row
│                             │
│  [View Details] [Apify →]   │  ← Actions
└─────────────────────────────┘
```

**Interactions:**
- Hover: Lift + shadow increase
- Click: Navigate to detail page
- Focus: Visible focus ring (accessibility)

### 4.3 Detail Page Modal

**Sections:**
1. Hero: Name + category + description
2. Stats: Users, rating, runs, success rate
3. Features: Bulleted list
4. Use Cases: Real-world applications
5. Quick Start: 3-step guide
6. Code Example: Sample input/output
7. Related: 3 similar actors
8. CTA: Link to Apify Store

### 4.4 Stats Dashboard

**Animated Counters:**
```javascript
// Intersection Observer triggers animation
// Duration: 2 seconds
// Easing: easeOutExpo
// Format: 652,510 → 652.5K
```

**Stats to Display:**
- Total Actors: 56
- Total Users: 1,500+
- Monthly Users: 468
- Success Rate: 98.9%
- Total Runs: 1M+
- Response Time: 6 hours

### 4.5 Navigation

**Sticky Header:**
```
[Logo]  [Categories] [Top Actors] [Stats] [About]  [GitHub] [Apify]
```

**Mobile Menu:**
- Hamburger icon
- Full-screen overlay
- Smooth animations
- Close on link click

**Smooth Scroll:**
```javascript
// CSS: scroll-behavior: smooth
// JS: offset for sticky header
// Duration: 600ms
// Easing: easeInOutCubic
```

---

## 5. Page Structure (Detailed)

### 5.1 Home Page (index.html)

**Section 1: Hero**
```
┌─────────────────────────────────────┐
│                                     │
│   Apify Actors by Akash             │
│   ─────────────────────             │
│                                     │
│   56+ web scraping & automation     │
│   tools for developers, researchers,  │
│   and businesses                    │
│                                     │
│   [Browse Actors] [View on Apify]   │
│                                     │
│   ⭐ 5.0 avg rating  👤 1,500+ users│
│                                     │
└─────────────────────────────────────┘
```

**Section 2: Categories Overview**
```
┌──────────────────────────────────────┐
│  Browse by Category                   │
│  ─────────────────                    │
│                                     │
│  [📺 YouTube] [🤖 AI] [🗺️ Maps]    │
│  [🔍 SEO] [🛒 E-commerce] ...       │
│                                     │
└──────────────────────────────────────┘
```

**Section 3: Search & Filter Bar**
```
┌──────────────────────────────────────┐
│  [🔍 Search actors by name...      ] │
│                                     │
│  Filter: [All Categories ▼] [Sort ▼]│
│                                     │
└──────────────────────────────────────┘
```

**Section 4: Actor Grid**
```
┌──────────────────────────────────────┐
│                                     │
│  ┌────┐ ┌────┐ ┌────┐ ┌────┐       │
│  │Card│ │Card│ │Card│ │Card│       │
│  └────┘ └────┘ └────┘ └────┘       │
│  ┌────┐ ┌────┐ ┌────┐ ┌────┐       │
│  │Card│ │Card│ │Card│ │Card│       │
│  └────┘ └────┘ └────┘ └────┘       │
│              ...                    │
│                                     │
│         [Load More]                 │
│                                     │
└──────────────────────────────────────┘
```

**Section 5: Stats Dashboard**
```
┌──────────────────────────────────────┐
│  Trusted by the Community            │
│  ──────────────────────              │
│                                     │
│  ┌─────┐ ┌─────┐ ┌─────┐ ┌─────┐   │
│  │  56 │ │1,500│ │ 98% │ │ 6hrs│   │
│  │Actors│ │Users│ │Success│ │Response│
│  └─────┘ └─────┘ └─────┘ └─────┘   │
│                                     │
└──────────────────────────────────────┘
```

**Section 6: Footer**
```
┌──────────────────────────────────────┐
│  [Logo]              [Categories]   │
│  Built with ❤️ by    [Top Actors]   │
│  Akash Kumar Naik    [Stats]        │
│                      [GitHub]       │
│  © 2025 · Apify      [Apify]        │
└──────────────────────────────────────┘
```

### 5.2 Actor Detail Page Template

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <title>Actor Name | Apify Actors by Akash</title>
  <!-- Meta tags, schema, critical CSS -->
</head>
<body>
  <header><!-- Navigation --></header>
  
  <main>
    <!-- Hero Section -->
    <section class="actor-hero">
      <span class="category-badge">Category</span>
      <h1>Actor Name</h1>
      <p class="description">Full description...</p>
      <div class="stats-row">
        <span>⭐ 5.0</span>
        <span>👤 275 users</span>
        <span>▶ 652K runs</span>
      </div>
    </section>
    
    <!-- Features Section -->
    <section class="features">
      <h2>Features</h2>
      <ul>
        <li>Feature 1</li>
        <li>Feature 2</li>
      </ul>
    </section>
    
    <!-- Use Cases -->
    <section class="use-cases">
      <h2>Use Cases</h2>
      <div class="use-case-grid">
        <!-- Use case cards -->
      </div>
    </section>
    
    <!-- Quick Start -->
    <section class="quick-start">
      <h2>Quick Start</h2>
      <ol>
        <li>Step 1</li>
        <li>Step 2</li>
        <li>Step 3</li>
      </ol>
    </section>
    
    <!-- CTA -->
    <section class="cta">
      <a href="apify-link" class="btn btn-primary">
        View on Apify →
      </a>
    </section>
    
    <!-- Related Actors -->
    <section class="related">
      <h2>Related Actors</h2>
      <div class="actor-grid">
        <!-- 3 related cards -->
      </div>
    </section>
  </main>
  
  <footer><!-- Footer --></footer>
</body>
</html>
```

---

## 6. Data Structure

### 6.1 Actor Schema

```typescript
interface Actor {
  id: string;                    // URL-friendly identifier
  name: string;                  // Display name
  category: string;              // Category name
  categoryId: string;            // URL-friendly category
  description: string;           // Short description (150 chars)
  fullDescription: string;       // Long description
  users: number;                 // Total users
  rating: number;                // 0-5 rating
  ratingCount: number;           // Number of ratings
  totalRuns: number;             // Total successful runs
  successRate: number;           // Percentage
  features: string[];            // Key features
  useCases: string[];          // Use case descriptions
  apifyUrl: string;            // Direct Apify link
  icon: string;                // Emoji or icon class
  color: string;               // Category color (hex)
  tags: string[];              // Search tags
  pricing: 'free' | 'paid' | 'freemium';
  lastUpdated: string;         // ISO date
}
```

### 6.2 Category Schema

```typescript
interface Category {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
  actorCount: number;
  featured: boolean;
}
```

### 6.3 Build-time Data Transformation

```javascript
// Step 1: Parse actors.md
const rawData = parseMarkdown('actors.md');

// Step 2: Transform to structured JSON
const actors = rawData.map(transformActor);
const categories = extractCategories(actors);
const stats = calculateStats(actors);

// Step 3: Generate static pages
actors.forEach(actor => generateActorPage(actor));
categories.forEach(cat => generateCategoryPage(cat));
generateHomePage({ actors, categories, stats });
generateSitemap(actors, categories);
```

---

## 7. Performance & Accessibility

### 7.1 Performance Budget

| Metric | Target | Maximum |
|--------|--------|---------|
| First Contentful Paint | < 1.0s | 1.5s |
| Largest Contentful Paint | < 1.5s | 2.5s |
| Time to Interactive | < 2.5s | 3.5s |
| Total Page Weight | < 500KB | 1MB |
| JavaScript Bundle | < 50KB | 100KB |
| CSS Bundle | < 30KB | 50KB |
| Image Optimization | WebP | - |

### 7.2 Optimization Strategies

**Critical CSS:**
- Inline above-the-fold styles in `<head>`
- Async load non-critical CSS
- Use `rel="preload"` for fonts

**JavaScript:**
- Async/defer non-critical scripts
- Use Intersection Observer for lazy loading
- Debounce search input (300ms)
- Code split by route

**Images:**
- WebP format with JPEG fallback
- Lazy loading with `loading="lazy"`
- Responsive images with `srcset`
- Placeholder blur-up technique

### 7.3 Accessibility Requirements

**WCAG 2.1 Level AA Compliance:**

1. **Color Contrast:**
   - Normal text: 4.5:1 minimum
   - Large text: 3:1 minimum
   - UI components: 3:1 minimum

2. **Keyboard Navigation:**
   - All interactive elements focusable
   - Visible focus indicators
   - Logical tab order
   - Skip links

3. **Screen Reader Support:**
   - Semantic HTML elements
   - ARIA labels where needed
   - Alt text for all images
   - Live regions for dynamic content

4. **Motion & Animation:**
   - Respect `prefers-reduced-motion`
   - No auto-playing content
   - Pause/stop controls

**Testing Checklist:**
- [ ] Keyboard-only navigation
- [ ] Screen reader testing (NVDA/VoiceOver)
- [ ] Color contrast analyzer
- [ ] Lighthouse accessibility audit
- [ ] axe DevTools scan

---

## 8. Responsive Breakpoints

### 8.1 Breakpoint Strategy

| Breakpoint | Width | Target |
|------------|-------|--------|
| Mobile | < 640px | Smartphones |
| Tablet | 640-1024px | Tablets, large phones |
| Desktop | 1024-1280px | Laptops |
| Large Desktop | > 1280px | Desktops, monitors |

### 8.2 Layout Changes

**Mobile (< 640px):**
- Single column layout
- Hamburger navigation
- Stacked cards
- Full-width buttons
- Reduced padding (16px)
- Touch-friendly targets (44px minimum)

**Tablet (640-1024px):**
- 2-column grid for cards
- Horizontal category scroll
- Side-by-side stats
- Expanded navigation

**Desktop (> 1024px):**
- 3-4 column grid
- Full navigation visible
- Hover states active
- Larger images
- Sidebar on detail pages

---

## 9. File Structure

```
apify-content/
├── docs/
│   └── superpowers/
│       └── specs/
│           └── 2025-03-31-apify-actors-showcase-design.md (this file)
├── src/
│   ├── data/
│   │   ├── actors.json           # Generated from actors.md
│   │   └── categories.json       # Extracted categories
│   ├── templates/
│   │   ├── base.html            # Base template
│   │   ├── home.html            # Home page
│   │   ├── actor-detail.html    # Actor detail page
│   │   └── category.html        # Category page
│   ├── assets/
│   │   ├── css/
│   │   │   ├── main.css         # Main styles
│   │   │   ├── components.css   # Component styles
│   │   │   └── responsive.css   # Responsive styles
│   │   ├── js/
│   │   │   ├── main.js          # Core functionality
│   │   │   ├── search.js        # Search/filter logic
│   │   │   └── animations.js    # Scroll animations
│   │   └── images/
│   │       ├── hero/
│   │       ├── icons/
│   │       └── og/
│   └── build/
│       ├── parser.js            # Parse actors.md
│       ├── generator.js         # Generate HTML
│       └── optimizer.js         # Optimize assets
├── dist/                        # Generated static site
│   ├── index.html
│   ├── actors/
│   ├── categories/
│   ├── assets/
│   ├── sitemap.xml
│   └── robots.txt
├── actors.md                    # Source data
├── package.json                 # Dependencies
└── README.md                    # Documentation
```

---

## 10. Implementation Notes

### 10.1 Build Process

1. **Parse:** Extract actor data from `actors.md`
2. **Transform:** Convert to structured JSON
3. **Generate:** Create all HTML pages
4. **Optimize:** Minify CSS/JS, optimize images
5. **Validate:** Run Lighthouse, check links
6. **Deploy:** Push to hosting

### 10.2 Dependencies

**Dev Dependencies:**
- `marked` - Markdown parser
- `fs-extra` - File system utilities
- `glob` - File pattern matching
- `sharp` - Image optimization
- `clean-css` - CSS minification
- `terser` - JS minification
- `html-minifier` - HTML minification

**Runtime (Client):**
- Vanilla JS (no frameworks)
- Intersection Observer API (native)
- Fetch API (native)

### 10.3 Browser Support

**Target Browsers:**
- Chrome/Edge: Last 2 versions
- Firefox: Last 2 versions
- Safari: Last 2 versions
- Mobile Safari: Last 2 versions
- Chrome Android: Last 2 versions

**Progressive Enhancement:**
- Core functionality works without JS
- Enhanced features load progressively
- Graceful degradation for older browsers

---

## 11. Success Metrics

### 11.1 Technical Metrics

- [ ] Lighthouse Performance: 95+
- [ ] Lighthouse Accessibility: 100
- [ ] Lighthouse SEO: 100
- [ ] Core Web Vitals: All green
- [ ] Zero console errors
- [ ] 100% valid HTML/CSS

### 11.2 User Experience Metrics

- [ ] < 2s time to interactive
- [ ] Smooth 60fps animations
- [ ] Instant search/filter
- [ ] Mobile-friendly layout
- [ ] Accessible navigation

### 11.3 SEO Metrics

- [ ] All pages indexed by Google
- [ ] Rich results appearing
- [ ] Featured snippets for target queries
- [ ] Schema validation passing
- [ ] Sitemap submitted

---

## 12. Appendix

### 12.1 Category Mapping

| Category | ID | Icon | Color |
|----------|-----|------|-------|
| YouTube & Video | youtube | 📺 | #FF0000 |
| AI & LLM Tools | ai | 🤖 | #8B5CF6 |
| Maps & Location | maps | 🗺️ | #10B981 |
| Search & SEO | seo | 🔍 | #3B82F6 |
| E-commerce | ecommerce | 🛒 | #F59E0B |
| Crypto & Finance | crypto | 💰 | #F97316 |
| Image & Media | media | 🎨 | #EC4899 |
| Social Media | social | 📱 | #06B6D4 |
| Developer Tools | devtools | 🔧 | #6366F1 |

### 12.2 Actor Data Sample

```json
{
  "id": "youtube-transcript-scraper",
  "name": "YouTube Transcript Scraper",
  "category": "YouTube & Video Tools",
  "categoryId": "youtube",
  "description": "Scrape YouTube transcripts with 99%+ accuracy",
  "users": 275,
  "rating": 5.0,
  "totalRuns": 652510,
  "apifyUrl": "https://apify.com/akash9078/youtube-transcript-extractor",
  "icon": "📺",
  "color": "#FF0000"
}
```

### 12.3 Changelog

| Date | Change | Author |
|------|--------|--------|
| 2025-03-31 | Initial design specification | Akash |

---

**END OF SPECIFICATION**

This design is approved and ready for implementation.
