// ===== PORTFOLIO FILTERING =====
document.addEventListener('DOMContentLoaded', function() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    
    // Filter functionality
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const filter = this.getAttribute('data-filter');
            
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Filter items
            portfolioItems.forEach(item => {
                const category = item.getAttribute('data-category');
                
                if (filter === 'all' || category === filter) {
                    item.style.display = 'block';
                    item.style.animation = 'fadeIn 0.5s ease-in-out';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });
    
    // Add fade-in animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes fadeIn {
            from {
                opacity: 0;
                transform: translateY(20px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
    `;
    document.head.appendChild(style);
});

// ===== PORTFOLIO LIGHTBOX ENHANCEMENT =====
function enhancePortfolioLightbox() {
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    
    portfolioItems.forEach(item => {
        item.addEventListener('click', function() {
            const image = this.querySelector('img');
            const title = this.querySelector('h3').textContent;
            const location = this.querySelector('.portfolio-location').textContent;
            const materials = this.querySelector('.portfolio-materials').textContent;
            const year = this.querySelector('.portfolio-year').textContent;
            
            showEnhancedLightbox(image.src, title, location, materials, year);
        });
    });
}

function showEnhancedLightbox(imageSrc, title, location, materials, year) {
    // Create lightbox overlay
    const lightbox = document.createElement('div');
    lightbox.className = 'enhanced-lightbox';
    lightbox.innerHTML = `
        <div class="lightbox-overlay"></div>
        <div class="lightbox-content">
            <button class="lightbox-close">&times;</button>
            <div class="lightbox-image-container">
                <img src="${imageSrc}" alt="${title}">
            </div>
            <div class="lightbox-info">
                <h3>${title}</h3>
                <div class="lightbox-meta">
                    <p class="lightbox-location">${location}</p>
                    <p class="lightbox-year">${year}</p>
                </div>
                <p class="lightbox-materials">${materials}</p>
                <div class="lightbox-actions">
                    <a href="booking.html" class="btn btn-primary">
                        <svg class="btn-icon" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zM7 10h5v5H7z"/>
                        </svg>
                        Start Similar Project
                    </a>
                </div>
            </div>
        </div>
    `;
    
    // Add enhanced lightbox styles
    const style = document.createElement('style');
    style.textContent = `
        .enhanced-lightbox {
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
        
        .enhanced-lightbox .lightbox-overlay {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.9);
            backdrop-filter: blur(10px);
        }
        
        .enhanced-lightbox .lightbox-content {
            position: relative;
            max-width: 90vw;
            max-height: 90vh;
            background: white;
            border-radius: 16px;
            overflow: hidden;
            box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
            display: grid;
            grid-template-columns: 1fr 1fr;
            min-height: 500px;
        }
        
        .lightbox-image-container {
            position: relative;
            overflow: hidden;
        }
        
        .enhanced-lightbox .lightbox-content img {
            width: 100%;
            height: 100%;
            object-fit: cover;
        }
        
        .enhanced-lightbox .lightbox-info {
            padding: 2rem;
            display: flex;
            flex-direction: column;
            justify-content: center;
        }
        
        .enhanced-lightbox .lightbox-info h3 {
            color: var(--onyx);
            margin-bottom: 1rem;
            font-size: 1.5rem;
        }
        
        .lightbox-meta {
            display: flex;
            gap: 1rem;
            margin-bottom: 1rem;
        }
        
        .enhanced-lightbox .lightbox-location {
            color: var(--onyx);
            opacity: 0.6;
            font-size: 0.875rem;
        }
        
        .enhanced-lightbox .lightbox-year {
            color: var(--champagne);
            font-size: 0.875rem;
            font-weight: 500;
        }
        
        .enhanced-lightbox .lightbox-materials {
            color: var(--onyx);
            font-size: 0.875rem;
            margin-bottom: 2rem;
            line-height: 1.6;
        }
        
        .lightbox-actions {
            margin-top: auto;
        }
        
        .enhanced-lightbox .lightbox-close {
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
        
        .enhanced-lightbox .lightbox-close:hover {
            background: rgba(255, 255, 255, 0.3);
        }
        
        @media (max-width: 768px) {
            .enhanced-lightbox .lightbox-content {
                grid-template-columns: 1fr;
                max-height: 80vh;
            }
            
            .lightbox-image-container {
                height: 200px;
            }
            
            .enhanced-lightbox .lightbox-info {
                padding: 1.5rem;
            }
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

// Initialize enhanced lightbox
document.addEventListener('DOMContentLoaded', enhancePortfolioLightbox);

// ===== PORTFOLIO GRID ANIMATIONS =====
function animatePortfolioGrid() {
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                entry.target.style.animationDelay = `${index * 0.1}s`;
                entry.target.style.animation = 'slideInUp 0.6s ease-out forwards';
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    portfolioItems.forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(30px)';
        observer.observe(item);
    });
    
    // Add animation styles
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideInUp {
            from {
                opacity: 0;
                transform: translateY(30px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
    `;
    document.head.appendChild(style);
}

// Initialize grid animations
document.addEventListener('DOMContentLoaded', animatePortfolioGrid);

// ===== PORTFOLIO SEARCH FUNCTIONALITY =====
function addPortfolioSearch() {
    const searchContainer = document.createElement('div');
    searchContainer.className = 'portfolio-search';
    searchContainer.innerHTML = `
        <div class="search-input-container">
            <svg class="search-icon" viewBox="0 0 24 24" fill="currentColor">
                <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
            </svg>
            <input type="text" placeholder="Search projects..." class="search-input">
        </div>
    `;
    
    // Insert search before filters
    const filters = document.querySelector('.portfolio-filters');
    if (filters) {
        filters.parentNode.insertBefore(searchContainer, filters);
    }
    
    // Add search styles
    const style = document.createElement('style');
    style.textContent = `
        .portfolio-search {
            margin-bottom: 2rem;
            text-align: center;
        }
        
        .search-input-container {
            position: relative;
            max-width: 400px;
            margin: 0 auto;
        }
        
        .search-icon {
            position: absolute;
            left: 1rem;
            top: 50%;
            transform: translateY(-50%);
            width: 20px;
            height: 20px;
            color: var(--onyx);
            opacity: 0.5;
        }
        
        .search-input {
            width: 100%;
            padding: 1rem 1rem 1rem 3rem;
            border: 2px solid rgba(0, 0, 0, 0.1);
            border-radius: 12px;
            font-size: 1rem;
            font-family: var(--font-inter);
            transition: all 0.3s ease;
            background: white;
        }
        
        .search-input:focus {
            outline: none;
            border-color: var(--champagne);
            box-shadow: 0 0 0 3px rgba(215, 201, 163, 0.1);
        }
        
        .search-input::placeholder {
            color: var(--onyx);
            opacity: 0.5;
        }
    `;
    document.head.appendChild(style);
    
    // Search functionality
    const searchInput = searchContainer.querySelector('.search-input');
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    
    searchInput.addEventListener('input', function() {
        const searchTerm = this.value.toLowerCase();
        
        portfolioItems.forEach(item => {
            const title = item.querySelector('h3').textContent.toLowerCase();
            const location = item.querySelector('.portfolio-location').textContent.toLowerCase();
            const materials = item.querySelector('.portfolio-materials').textContent.toLowerCase();
            
            if (title.includes(searchTerm) || location.includes(searchTerm) || materials.includes(searchTerm)) {
                item.style.display = 'block';
            } else {
                item.style.display = 'none';
            }
        });
    });
}

// Initialize search functionality
document.addEventListener('DOMContentLoaded', addPortfolioSearch);

// ===== PORTFOLIO STATISTICS =====
function addPortfolioStats() {
    const statsContainer = document.createElement('div');
    statsContainer.className = 'portfolio-stats';
    statsContainer.innerHTML = `
        <div class="stats-grid">
            <div class="stat-item">
                <span class="stat-number">50+</span>
                <span class="stat-label">Projects Completed</span>
            </div>
            <div class="stat-item">
                <span class="stat-number">4</span>
                <span class="stat-label">Service Categories</span>
            </div>
            <div class="stat-item">
                <span class="stat-number">5</span>
                <span class="stat-label">Cities Served</span>
            </div>
            <div class="stat-item">
                <span class="stat-number">100%</span>
                <span class="stat-label">Client Satisfaction</span>
            </div>
        </div>
    `;
    
    // Insert stats after hero section
    const heroSection = document.querySelector('.hero-section');
    if (heroSection) {
        heroSection.parentNode.insertBefore(statsContainer, heroSection.nextSibling);
    }
    
    // Add stats styles
    const style = document.createElement('style');
    style.textContent = `
        .portfolio-stats {
            background: var(--white);
            padding: 3rem 0;
            border-bottom: 1px solid rgba(0, 0, 0, 0.1);
        }
        
        .stats-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 2rem;
            max-width: var(--container-max-width);
            margin: 0 auto;
            padding: 0 1rem;
        }
        
        .stat-item {
            text-align: center;
            padding: 1.5rem;
        }
        
        .stat-number {
            display: block;
            font-family: var(--font-playfair);
            font-size: 2.5rem;
            font-weight: 700;
            color: var(--champagne);
            margin-bottom: 0.5rem;
        }
        
        .stat-label {
            font-family: var(--font-inter);
            font-size: 0.875rem;
            color: var(--onyx);
            opacity: 0.8;
            text-transform: uppercase;
            letter-spacing: 0.5px;
        }
        
        @media (max-width: 768px) {
            .stats-grid {
                grid-template-columns: repeat(2, 1fr);
            }
        }
    `;
    document.head.appendChild(style);
}

// Initialize portfolio stats
document.addEventListener('DOMContentLoaded', addPortfolioStats);
