/**
 * Portfolio Animations & Interactions
 * Wilson Vasquez - 2025
 */

document.addEventListener('DOMContentLoaded', () => {
    // Initialize all animations
    initTypingEffect();
    initScrollAnimations();
    initHeaderScroll();
    initMobileNavigation();
    initSkillBars();
    initSmoothScroll();
});

/**
 * Typing Effect for Hero Name
 */
function initTypingEffect() {
    const typedElement = document.getElementById('typed-name');
    if (!typedElement) return;
    
    const text = typedElement.textContent;
    typedElement.textContent = '';
    typedElement.style.opacity = '1';
    
    let charIndex = 0;
    const typingSpeed = 100;
    
    function type() {
        if (charIndex < text.length) {
            typedElement.textContent += text.charAt(charIndex);
            charIndex++;
            setTimeout(type, typingSpeed);
        }
    }
    
    // Start typing after a short delay
    setTimeout(type, 500);
}

/**
 * Scroll-triggered Animations using Intersection Observer
 */
function initScrollAnimations() {
    const animatedElements = document.querySelectorAll('[data-animate]');
    
    if (!animatedElements.length) return;
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Optionally unobserve after animation
                // observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    animatedElements.forEach(element => {
        observer.observe(element);
    });
}

/**
 * Header Style Change on Scroll
 */
function initHeaderScroll() {
    const header = document.getElementById('header');
    if (!header) return;
    
    const scrollThreshold = 50;
    
    function handleScroll() {
        if (window.scrollY > scrollThreshold) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    }
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    // Initial check
    handleScroll();
}

/**
 * Mobile Navigation Toggle
 */
function initMobileNavigation() {
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.querySelector('.nav__menu');
    const navLinks = document.querySelectorAll('.nav__link');
    
    if (!navToggle || !navMenu) return;
    
    navToggle.addEventListener('click', () => {
        navToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
        document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
    });
    
    // Close menu when clicking a link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
        });
    });
}

/**
 * Animated Skill Bars
 */
function initSkillBars() {
    const skillBars = document.querySelectorAll('.skill__progress');
    
    if (!skillBars.length) return;
    
    const observerOptions = {
        threshold: 0.5,
        rootMargin: '0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const progress = entry.target.dataset.progress;
                entry.target.style.width = progress + '%';
                entry.target.classList.add('animated');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    skillBars.forEach(bar => {
        observer.observe(bar);
    });
}

/**
 * Smooth Scroll for Navigation Links
 */
function initSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            
            // Skip if just "#"
            if (href === '#') return;
            
            const target = document.querySelector(href);
            
            if (target) {
                e.preventDefault();
                
                const headerHeight = document.getElementById('header')?.offsetHeight || 0;
                const targetPosition = target.getBoundingClientRect().top + window.scrollY - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

/**
 * Add parallax effect to hero gradient (optional enhancement)
 */
function initParallax() {
    const heroGradient = document.querySelector('.hero__gradient');
    if (!heroGradient) return;
    
    window.addEventListener('mousemove', (e) => {
        const x = (e.clientX / window.innerWidth - 0.5) * 20;
        const y = (e.clientY / window.innerHeight - 0.5) * 20;
        
        heroGradient.style.transform = `translate(${x}px, ${y}px)`;
    }, { passive: true });
}

// Initialize parallax on load
window.addEventListener('load', initParallax);
