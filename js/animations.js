// js/animations.js - Scroll animations and counter animations

document.addEventListener('DOMContentLoaded', () => {
  initializeAnimations();
});

function initializeAnimations() {
  // Intersection Observer for stats section
  const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounters();
        statsObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });
  
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

// Add CSS animation styles (only if not already added)
if (!document.getElementById('apify-animations-style')) {
  const animStyle = document.createElement('style');
  animStyle.id = 'apify-animations-style';
  animStyle.textContent = `
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
  document.head.appendChild(animStyle);
}

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { initializeAnimations, animateCounters };
}
