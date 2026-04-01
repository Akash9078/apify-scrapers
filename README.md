# 🚀 Web Scraping Tools | Apify Actors Showcase

A modern, SEO + AIO + GEO optimized website showcasing 55+ production-ready web scraping tools and data extraction APIs. Built with HTML, CSS, and vanilla JavaScript. Optimized for traditional search (SEO), AI Overviews (AIO), and Generative Engine Optimization (GEO).

![Website](https://img.shields.io/badge/Website-Live-brightgreen)
![Actors](https://img.shields.io/badge/Actors-55+-orange)
![Users](https://img.shields.io/badge/Users-1.5K+-blue)
![SEO](https://img.shields.io/badge/SEO-AIO%20GEO-ff6b35)
![License](https://img.shields.io/badge/License-MIT-yellow)

## 🌐 Live Demo

**Website:** https://scrapers.yesintelligent.com/

**Apify Profile:** https://apify.com/akash9078

## ✨ Features

- 🎭 **56+ Apify Actors** - Complete collection of web scraping tools
- 📱 **Fully Responsive** - Works on desktop, tablet, and mobile
- 🔍 **Real-time Search** - Search actors by name or description
- 🏷️ **Category Filtering** - Browse by 9 different categories
- 📊 **Animated Stats** - Live counters showing usage statistics
- ⚡ **Fast Loading** - Optimized for Core Web Vitals
- ♿ **Accessible** - WCAG 2.1 AA compliant
- 🔒 **SEO Optimized** - Meta tags, structured data, and sitemap

## 🛠️ Tech Stack

- **HTML5** - Semantic markup
- **CSS3** - Custom properties, Grid, Flexbox
- **JavaScript (ES6+)** - Vanilla JS, no frameworks
- **No Build Tools** - Pure static website

## 📁 Project Structure

```
apify-scrapers/
├── index.html              # Homepage with hero and categories
├── actors.html             # All actors with search/filter
├── categories.html         # Browse by category
├── css/
│   ├── main.css           # Core styles and variables
│   ├── components.css     # Component-specific styles
│   └── responsive.css     # Media queries
├── js/
│   ├── data.js           # Actor data (56 actors)
│   ├── main.js           # Core functionality
│   ├── search-filter.js  # Search and filter logic
│   └── ui-components.js  # Dynamic UI generation
├── docs/                  # Design and planning docs
└── README.md             # This file
```

## 🎭 Categories

| Category | Icon | Count | Description |
|----------|------|-------|-------------|
| YouTube & Video | 📺 | 6 | Video scraping and transcript tools |
| AI & LLM Tools | 🤖 | 11 | AI-powered automation and analysis |
| Maps & Location | 🗺️ | 2 | Google Maps and location data |
| Search & SEO | 🔍 | 6 | SEO and search engine tools |
| E-commerce | 🛒 | 6 | Product and store scrapers |
| Crypto & Finance | 💰 | 5 | Financial data and crypto prices |
| Image & Media | 🎨 | 7 | Image conversion and media tools |
| Social Media | 📱 | 4 | Social platform scrapers |
| Developer Tools | 🔧 | 9 | APIs and developer utilities |

## 🚀 Getting Started

### Local Development

1. Clone the repository:
```bash
git clone https://github.com/Akash9078/apify-scrapers.git
cd apify-scrapers
```

2. Open `index.html` in your browser or use a local server:
```bash
# Using Python
python -m http.server 8000

# Using Node.js
npx serve .
```

3. Visit `http://localhost:8000`

### Deployment

This is a static website that can be deployed anywhere:

- **GitHub Pages** (currently used)
- **Netlify**
- **Vercel**
- **Cloudflare Pages**
- **Any static hosting**

## 📊 Top Actors

| Actor | Users | Runs | Category |
|-------|-------|------|----------|
| YouTube Transcript Scraper | 275 | 652K | 📺 YouTube |
| Audio Format Converter | 107 | 1.6K | 🎨 Media |
| Content Humanizer | 104 | 529 | 🤖 AI |
| Free Kimi 2.5 API | 102 | 272 | 🤖 AI |
| Face Quality Enhancer | 83 | 42.6K | 🤖 AI |

## 🔧 Built With

- **Apify Platform** - Web scraping infrastructure
- **Crawlee** - Web scraping library
- **Inter Font** - Typography
- **CSS Variables** - Dynamic theming
- **Intersection Observer** - Scroll animations

## 📝 Adding New Actors

To add a new actor, edit `js/data.js` and add a new object to the `actors` array:

```javascript
{
  id: "unique-actor-id",
  name: "Actor Name",
  category: "Category Name",
  categoryId: "category-id",
  description: "Full description",
  shortDescription: "Short description",
  users: 0,
  rating: 5.0,
  totalRuns: 0,
  apifyUrl: "https://apify.com/akash9078/actor-name",
  icon: "🎭",
  color: "#FF6B35",
  features: ["Feature 1", "Feature 2"],
  useCases: ["Use case 1", "Use case 2"]
}
```

## 🎨 Customization

### Colors

Edit CSS variables in `css/main.css`:

```css
:root {
  --color-primary: #FF6B35;
  --color-secondary: #1A1A2E;
  /* ... */
}
```

### Fonts

The website uses Inter font from Google Fonts. To change:

1. Update the Google Fonts link in `index.html`
2. Update the `--font-family` variable in CSS

## 🔍 SEO Features

- ✅ Semantic HTML5 structure
- ✅ Meta tags (title, description, keywords)
- ✅ Open Graph tags for social sharing
- ✅ Twitter Card meta tags
- ✅ Schema.org structured data
- ✅ Canonical URLs
- ✅ Sitemap.xml
- ✅ robots.txt

## 📈 Performance

- ✅ Lighthouse Score: 95+
- ✅ First Contentful Paint: < 1.5s
- ✅ Largest Contentful Paint: < 2.5s
- ✅ No JavaScript framework overhead
- ✅ Optimized CSS with variables
- ✅ Lazy loading for images
- ✅ Minified assets (production)

## ♿ Accessibility

- ✅ WCAG 2.1 AA compliant
- ✅ Semantic HTML elements
- ✅ ARIA labels for screen readers
- ✅ Keyboard navigation support
- ✅ Focus indicators
- ✅ Skip to content link
- ✅ Color contrast 4.5:1+
- ✅ Reduced motion support

## 🐛 Browser Support

- Chrome/Edge (latest 2 versions)
- Firefox (latest 2 versions)
- Safari (latest 2 versions)
- Mobile Safari (iOS 12+)
- Chrome Android (latest)

## 📄 License

MIT License - see [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Akash Kumar Naik**

- GitHub: [@Akash9078](https://github.com/Akash9078)
- Apify: [akash9078](https://apify.com/akash9078)
- Website: [Apify Actors](https://scrapers.yesintelligent.com/)

## 🙏 Acknowledgments

- [Apify](https://apify.com/) for the amazing platform
- [Crawlee](https://crawlee.dev/) for web scraping tools
- All users who have provided feedback and support

## 📊 Stats

- **Total Actors:** 56
- **Total Users:** 1,500+
- **Monthly Users:** 468
- **Success Rate:** 98.9%
- **Response Time:** 6 hours
- **Total Runs:** 1,000,000+

---

<p align="center">Built with ❤️ using pure HTML, CSS, and JavaScript</p>
