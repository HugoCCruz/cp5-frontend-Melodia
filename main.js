// Main JavaScript for Melodia Landing Page
document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const mobileMenuButton = document.querySelector('button[class*="md:hidden"]');
    const nav = document.querySelector('nav');
    let mobileMenu = null;

    if (mobileMenuButton) {
        mobileMenuButton.addEventListener('click', function() {
            if (!mobileMenu) {
                // Create mobile menu
                mobileMenu = document.createElement('div');
                mobileMenu.className = 'md:hidden absolute top-full left-0 right-0 bg-dark-bg/95 backdrop-blur-lg border-b border-white/10 p-4 space-y-4';
                mobileMenu.innerHTML = `
                    <a href="#home" class="block text-secondary-text hover:text-primary-text transition-colors py-2">Início</a>
                    <a href="#features" class="block text-secondary-text hover:text-primary-text transition-colors py-2">Funcionalidades</a>
                    <a href="#testimonials" class="block text-secondary-text hover:text-primary-text transition-colors py-2">Depoimentos</a>
                    <a href="#contact" class="block text-secondary-text hover:text-primary-text transition-colors py-2">Contato</a>
                `;
                nav.appendChild(mobileMenu);
            }
            
            // Toggle mobile menu visibility
            mobileMenu.style.display = mobileMenu.style.display === 'block' ? 'none' : 'block';
        });
    }

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                
                // Close mobile menu if open
                if (mobileMenu && mobileMenu.style.display === 'block') {
                    mobileMenu.style.display = 'none';
                }
            }
        });
    });

    // Form submission handling
    const contactForm = document.querySelector('form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const data = {
                nome: formData.get('nome'),
                email: formData.get('email'),
                generos: formData.get('generos'),
                newsletter: formData.get('newsletter') ? true : false
            };
            
            // Show loading state
            const submitButton = this.querySelector('button[type="submit"]');
            const originalText = submitButton.innerHTML;
            submitButton.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i>Enviando...';
            submitButton.disabled = true;
            
            // Simulate form submission
            setTimeout(() => {
                // Show success message
                showNotification('Obrigado! Você receberá novidades em breve.', 'success');
                
                // Reset form
                this.reset();
                
                // Reset button
                submitButton.innerHTML = originalText;
                submitButton.disabled = false;
                
                // Log for demo purposes
                console.log('Form data:', data);
            }, 2000);
        });
    }

    // Scroll animations
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

    // Animate elements on scroll
    document.querySelectorAll('.group, .space-y-8 > *, .space-y-6 > *').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        observer.observe(el);
    });

    // Parallax effect for hero section
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const heroSection = document.querySelector('#home');
        
        if (heroSection) {
            const rate = scrolled * -0.5;
            heroSection.style.transform = `translateY(${rate}px)`;
        }
    });

    // Add dynamic background particles
    createBackgroundParticles();

    // Add hover effects to feature cards
    addHoverEffects();

    // Initialize audio visualization (placeholder)
    initAudioVisualization();

    // Add typing animation to hero text
    addTypingAnimation();
});

// Notification system
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `fixed top-4 right-4 z-50 p-4 rounded-lg shadow-lg transform translate-x-full transition-all duration-300 ${
        type === 'success' ? 'bg-green-600' : 
        type === 'error' ? 'bg-red-600' : 
        'bg-vibrant-purple'
    } text-white`;
    
    notification.innerHTML = `
        <div class="flex items-center space-x-2">
            <i class="fas fa-${type === 'success' ? 'check' : type === 'error' ? 'times' : 'info'}-circle"></i>
            <span>${message}</span>
        </div>
    `;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Animate out and remove
    setTimeout(() => {
        notification.style.transform = 'translateX(full)';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

// Background particles effect
function createBackgroundParticles() {
    const particlesContainer = document.createElement('div');
    particlesContainer.className = 'fixed inset-0 pointer-events-none z-0';
    particlesContainer.style.overflow = 'hidden';
    
    for (let i = 0; i < 50; i++) {
        const particle = document.createElement('div');
        particle.className = 'absolute rounded-full opacity-20';
        particle.style.width = Math.random() * 4 + 1 + 'px';
        particle.style.height = particle.style.width;
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        particle.style.background = `linear-gradient(45deg, #7A00FF, #FF006E, #00FFD1)`;
        particle.style.animationDuration = (Math.random() * 3 + 2) + 's';
        particle.style.animationName = 'float';
        particle.style.animationIterationCount = 'infinite';
        particle.style.animationTimingFunction = 'ease-in-out';
        
        particlesContainer.appendChild(particle);
    }
    
    document.body.appendChild(particlesContainer);
}

// Enhanced hover effects
function addHoverEffects() {
    const cards = document.querySelectorAll('.group');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px) scale(1.02)';
            this.style.boxShadow = '0 20px 40px rgba(122, 0, 255, 0.2)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.boxShadow = 'none';
        });
    });
}

// Audio visualization placeholder
function initAudioVisualization() {
    const visualizationElements = document.querySelectorAll('[class*="waveform"]');
    
    visualizationElements.forEach(element => {
        // Add animated bars for visual effect
        for (let i = 0; i < 20; i++) {
            const bar = document.createElement('div');
            bar.className = 'absolute bg-current opacity-30';
            bar.style.width = '2px';
            bar.style.left = (i * 5) + '%';
            bar.style.bottom = '0';
            bar.style.height = Math.random() * 100 + '%';
            bar.style.animationDelay = (i * 0.1) + 's';
            bar.style.animation = 'pulse-neon 2s ease-in-out infinite';
            
            element.appendChild(bar);
        }
    });
}

// Typing animation for hero text
function addTypingAnimation() {
    const heroTitle = document.querySelector('h1');
    if (heroTitle) {
        const text = heroTitle.textContent;
        heroTitle.textContent = '';
        heroTitle.style.borderRight = '2px solid #7A00FF';
        
        let index = 0;
        const typeEffect = setInterval(() => {
            heroTitle.textContent = text.slice(0, index);
            index++;
            
            if (index > text.length) {
                clearInterval(typeEffect);
                heroTitle.style.borderRight = 'none';
            }
        }, 50);
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

function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

// Performance monitoring
console.log('🎵 Melodia Landing Page loaded successfully!');