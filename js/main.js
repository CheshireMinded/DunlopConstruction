// ===== NAVIGATION FUNCTIONALITY =====
document.addEventListener('DOMContentLoaded', function() {
    // Mobile navigation toggle
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            const isExpanded = navMenu.classList.contains('active');
            navMenu.classList.toggle('active');
            
            // Update ARIA attributes for accessibility
            navToggle.setAttribute('aria-expanded', !isExpanded);
            
            // Animate hamburger menu
            const spans = navToggle.querySelectorAll('span');
            spans.forEach((span, index) => {
                if (navMenu.classList.contains('active')) {
                    if (index === 0) span.style.transform = 'rotate(45deg) translate(5px, 5px)';
                    if (index === 1) span.style.opacity = '0';
                    if (index === 2) span.style.transform = 'rotate(-45deg) translate(7px, -6px)';
                } else {
                    span.style.transform = 'none';
                    span.style.opacity = '1';
                }
            });
        });
        
        // Close mobile menu when clicking on a link
        const navLinks = navMenu.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                navToggle.setAttribute('aria-expanded', 'false');
                const spans = navToggle.querySelectorAll('span');
                spans.forEach(span => {
                    span.style.transform = 'none';
                    span.style.opacity = '1';
                });
            });
        });
        
        // Keyboard navigation support
        navToggle.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                navToggle.click();
            }
        });
    }
    
    // Active navigation link highlighting
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPage || (currentPage === 'index.html' && href === 'index.html')) {
            link.classList.add('active');
        }
    });
    
    // Smooth scrolling for anchor links
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const offsetTop = targetElement.offsetTop - 70; // Account for fixed navbar
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
});

// ===== SCROLL ANIMATIONS =====
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements with fade-up class
document.addEventListener('DOMContentLoaded', function() {
    const fadeElements = document.querySelectorAll('.fade-up');
    fadeElements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = `opacity 0.6s ease-out ${index * 0.1}s, transform 0.6s ease-out ${index * 0.1}s`;
        observer.observe(el);
    });
});

// ===== PORTFOLIO LIGHTBOX =====
function createLightbox() {
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    
    portfolioItems.forEach(item => {
        item.addEventListener('click', function() {
            const image = this.querySelector('img');
            const title = this.querySelector('h3').textContent;
            const location = this.querySelector('.portfolio-location').textContent;
            const materials = this.querySelector('.portfolio-materials').textContent;
            
            showLightbox(image.src, title, location, materials);
        });
    });
}

function showLightbox(imageSrc, title, location, materials) {
    // Create lightbox overlay
    const lightbox = document.createElement('div');
    lightbox.className = 'lightbox';
    lightbox.innerHTML = `
        <div class="lightbox-overlay"></div>
        <div class="lightbox-content">
            <button class="lightbox-close">&times;</button>
            <img src="${imageSrc}" alt="${title}">
            <div class="lightbox-info">
                <h3>${title}</h3>
                <p class="lightbox-location">${location}</p>
                <p class="lightbox-materials">${materials}</p>
            </div>
        </div>
    `;
    
    // Add lightbox styles
    const style = document.createElement('style');
    style.textContent = `
        .lightbox {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: 10000;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 1rem;
        }
        
        .lightbox-overlay {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.9);
            backdrop-filter: blur(10px);
        }
        
        .lightbox-content {
            position: relative;
            max-width: 90vw;
            max-height: 90vh;
            background: white;
            border-radius: 16px;
            overflow: hidden;
            box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
        }
        
        .lightbox-content img {
            width: 100%;
            height: auto;
            max-height: 70vh;
            object-fit: contain;
        }
        
        .lightbox-info {
            padding: 1.5rem;
        }
        
        .lightbox-info h3 {
            color: var(--onyx);
            margin-bottom: 0.5rem;
        }
        
        .lightbox-location {
            color: var(--onyx);
            opacity: 0.6;
            font-size: 0.875rem;
            margin-bottom: 0.25rem;
        }
        
        .lightbox-materials {
            color: var(--champagne);
            font-size: 0.875rem;
            font-weight: 500;
        }
        
        .lightbox-close {
            position: absolute;
            top: 1rem;
            right: 1rem;
            width: 40px;
            height: 40px;
            background: rgba(255, 255, 255, 0.2);
            backdrop-filter: blur(10px);
            border: none;
            border-radius: 50%;
            color: white;
            font-size: 1.5rem;
            cursor: pointer;
            transition: all 0.2s ease;
            z-index: 10;
        }
        
        .lightbox-close:hover {
            background: rgba(255, 255, 255, 0.3);
        }
    `;
    
    document.head.appendChild(style);
    document.body.appendChild(lightbox);
    
    // Close lightbox functionality
    const closeBtn = lightbox.querySelector('.lightbox-close');
    const overlay = lightbox.querySelector('.lightbox-overlay');
    
    function closeLightbox() {
        lightbox.remove();
        style.remove();
    }
    
    closeBtn.addEventListener('click', closeLightbox);
    overlay.addEventListener('click', closeLightbox);
    
    // Close on escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeLightbox();
        }
    });
}

// Initialize lightbox on portfolio page
if (window.location.pathname.includes('portfolio.html') || window.location.pathname.endsWith('/')) {
    document.addEventListener('DOMContentLoaded', createLightbox);
}

// ===== FORM HANDLING =====
function handleFormSubmission(formId, successMessage) {
    const form = document.getElementById(formId);
    if (!form) return;
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(form);
        const data = Object.fromEntries(formData);
        
        // Show loading state
        const submitBtn = form.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;
        
        // Simulate form submission (replace with actual form handling)
        setTimeout(() => {
            // Show success message
            showSuccessMessage(successMessage);
            
            // Reset form
            form.reset();
            
            // Reset button
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }, 2000);
    });
}

function showSuccessMessage(message) {
    const successDiv = document.createElement('div');
    successDiv.className = 'success-message';
    successDiv.innerHTML = `
        <div class="success-content">
            <div class="success-icon">✓</div>
            <h3>Thank You!</h3>
            <p>${message}</p>
        </div>
    `;
    
    // Add success message styles
    const style = document.createElement('style');
    style.textContent = `
        .success-message {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: var(--porcelain);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 10000;
            padding: 1rem;
        }
        
        .success-content {
            background: white;
            border-radius: 16px;
            padding: 2rem;
            text-align: center;
            box-shadow: var(--shadow-heavy);
            max-width: 400px;
            width: 100%;
        }
        
        .success-icon {
            width: 64px;
            height: 64px;
            background: #10B981;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
            font-size: 2rem;
            margin: 0 auto 1rem;
        }
        
        .success-content h3 {
            color: var(--onyx);
            margin-bottom: 1rem;
        }
        
        .success-content p {
            color: var(--onyx);
            opacity: 0.8;
        }
    `;
    
    document.head.appendChild(style);
    document.body.appendChild(successDiv);
    
    // Remove success message after 5 seconds
    setTimeout(() => {
        successDiv.remove();
        style.remove();
    }, 5000);
}

// Initialize form handling
document.addEventListener('DOMContentLoaded', function() {
    // Booking form
    handleFormSubmission('booking-form', 'We\'ve received your consultation request. We\'ll contact you within 24 hours to schedule your appointment.');
    
    // Contact form
    handleFormSubmission('contact-form', 'Thank you for contacting us. We\'ll get back to you within 24 hours.');
});

// ===== SCROLL-BASED NAVIGATION EFFECTS =====
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    const scrollTop = window.pageYOffset;
    
    if (scrollTop > 100) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = 'none';
    }
});

// ===== LAZY LOADING FOR IMAGES =====
function lazyLoadImages() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// Initialize lazy loading
document.addEventListener('DOMContentLoaded', lazyLoadImages);

// ===== SMOOTH SCROLLING FOR INTERNAL LINKS =====
document.addEventListener('DOMContentLoaded', function() {
    const internalLinks = document.querySelectorAll('a[href^="#"]');
    
    internalLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const offsetTop = targetElement.offsetTop - 80;
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
});

// ===== UTILITY FUNCTIONS =====
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

// ===== PERFORMANCE OPTIMIZATIONS =====
// Debounced scroll handler
const debouncedScrollHandler = debounce(() => {
    // Any scroll-based calculations can go here
}, 16); // ~60fps

window.addEventListener('scroll', debouncedScrollHandler);

// ===== ACCESSIBILITY IMPROVEMENTS =====
document.addEventListener('DOMContentLoaded', function() {
    // Add focus indicators for keyboard navigation
    const focusableElements = document.querySelectorAll('a, button, input, textarea, select');
    
    focusableElements.forEach(element => {
        element.addEventListener('focus', function() {
            this.style.outline = '2px solid var(--champagne)';
            this.style.outlineOffset = '2px';
        });
        
        element.addEventListener('blur', function() {
            this.style.outline = 'none';
        });
    });
    
    // Add skip link for accessibility
    const skipLink = document.createElement('a');
    skipLink.href = '#main-content';
    skipLink.textContent = 'Skip to main content';
    skipLink.className = 'skip-link';
    skipLink.style.cssText = `
        position: absolute;
        top: -40px;
        left: 6px;
        background: var(--onyx);
        color: white;
        padding: 8px;
        text-decoration: none;
        border-radius: 4px;
        z-index: 10001;
        transition: top 0.3s;
    `;
    
    skipLink.addEventListener('focus', function() {
        this.style.top = '6px';
    });
    
    skipLink.addEventListener('blur', function() {
        this.style.top = '-40px';
    });
    
    document.body.insertBefore(skipLink, document.body.firstChild);
    
    // Cookie notice functionality
    const cookieNotice = document.getElementById('cookie-notice');
    const acceptCookies = document.getElementById('accept-cookies');
    const declineCookies = document.getElementById('decline-cookies');
    
    if (cookieNotice && acceptCookies && declineCookies) {
        // Check if user has already made a choice
        const cookieChoice = localStorage.getItem('cookieChoice');
        
        if (!cookieChoice) {
            // Show cookie notice after a short delay
            setTimeout(() => {
                cookieNotice.classList.add('show');
            }, 2000);
        }
        
        // Handle accept cookies
        acceptCookies.addEventListener('click', function() {
            localStorage.setItem('cookieChoice', 'accepted');
            cookieNotice.classList.remove('show');
        });
        
        // Handle decline cookies
        declineCookies.addEventListener('click', function() {
            localStorage.setItem('cookieChoice', 'declined');
            cookieNotice.classList.remove('show');
        });
    }
});

// ===== ERROR HANDLING =====
window.addEventListener('error', function(e) {
    console.error('JavaScript error:', e.error);
});

// ===== ANALYTICS READY =====
// Placeholder for analytics tracking
function trackEvent(eventName, eventData) {
    // Replace with actual analytics implementation
    console.log('Event tracked:', eventName, eventData);
}

// Track form submissions
document.addEventListener('DOMContentLoaded', function() {
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', function() {
            trackEvent('form_submit', {
                form_id: this.id,
                page: window.location.pathname
            });
        });
    });
    
    // Track button clicks
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('click', function() {
            trackEvent('button_click', {
                button_text: this.textContent.trim(),
                page: window.location.pathname
            });
        });
    });
});
