// main.js - Zupra Premium Beverage Interactive Functionality

document.addEventListener('DOMContentLoaded', function() {
    // ========== MOBILE MENU FUNCTIONALITY ==========
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mobileMenuClose = document.getElementById('mobileMenuClose');
    const mobileMenu = document.getElementById('mobileMenu');
    const overlay = document.getElementById('overlay');

    // Toggle mobile menu
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', () => {
            mobileMenu.classList.add('active');
            overlay.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    }

    // Close mobile menu
    if (mobileMenuClose) {
        mobileMenuClose.addEventListener('click', () => {
            mobileMenu.classList.remove('active');
            overlay.classList.remove('active');
            document.body.style.overflow = '';
        });
    }

    // Close menu when clicking overlay
    if (overlay) {
        overlay.addEventListener('click', () => {
            mobileMenu.classList.remove('active');
            overlay.classList.remove('active');
            document.body.style.overflow = '';
        });
    }

    // ========== SMOOTH SCROLLING ==========
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            // Skip if this is a URL hash link for the mobile menu
            if (this.getAttribute('href') === '#') return;
            
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const headerHeight = document.querySelector('.header')?.offsetHeight || 0;
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });

                // Close mobile menu if open
                if (mobileMenu && mobileMenu.classList.contains('active')) {
                    mobileMenu.classList.remove('active');
                    overlay.classList.remove('active');
                    document.body.style.overflow = '';
                }
            }
        });
    });

    // ========== SCROLL EFFECTS ==========
    // Add/remove scroll class to header
    const header = document.querySelector('.header');
    if (header) {
        let lastScroll = 0;
        
        window.addEventListener('scroll', () => {
            const currentScroll = window.pageYOffset;
            
            if (currentScroll <= 0) {
                header.classList.remove('scroll-up');
                return;
            }
            
            if (currentScroll > lastScroll && !header.classList.contains('scroll-down')) {
                header.classList.remove('scroll-up');
                header.classList.add('scroll-down');
            } else if (currentScroll < lastScroll && header.classList.contains('scroll-down')) {
                header.classList.remove('scroll-down');
                header.classList.add('scroll-up');
            }
            
            lastScroll = currentScroll;
        });
    }

    // ========== ANIMATE ON SCROLL ==========
    const animateOnScroll = () => {
        const elements = document.querySelectorAll('.animate');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.2;
            
            if (elementPosition < screenPosition) {
                element.classList.add('animated');
            }
        });
    };

    // Initialize animation on load
    window.addEventListener('load', animateOnScroll);
    // And on scroll
    window.addEventListener('scroll', animateOnScroll);

    // ========== PRODUCT HOVER EFFECTS ==========
    const products = document.querySelectorAll('.product');
    products.forEach(product => {
        product.addEventListener('mouseenter', () => {
            const img = product.querySelector('.product-image');
            if (img) {
                img.style.transform = 'translateY(-10px)';
                img.style.transition = 'transform 0.3s ease';
            }
        });
        
        product.addEventListener('mouseleave', () => {
            const img = product.querySelector('.product-image');
            if (img) {
                img.style.transform = 'translateY(0)';
            }
        });
    });

    // ========== FORM VALIDATION ==========
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const nameInput = this.querySelector('input[name="name"]');
            const emailInput = this.querySelector('input[name="email"]');
            const messageInput = this.querySelector('textarea[name="message"]');
            let isValid = true;

            // Simple validation
            if (!nameInput.value.trim()) {
                isValid = false;
                nameInput.classList.add('error');
            } else {
                nameInput.classList.remove('error');
            }

            if (!emailInput.value.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailInput.value)) {
                isValid = false;
                emailInput.classList.add('error');
            } else {
                emailInput.classList.remove('error');
            }

            if (!messageInput.value.trim()) {
                isValid = false;
                messageInput.classList.add('error');
            } else {
                messageInput.classList.remove('error');
            }

            if (isValid) {
                // Here you would typically send the form data to your server
                console.log('Form submitted:', {
                    name: nameInput.value,
                    email: emailInput.value,
                    message: messageInput.value
                });
                
                // Show success message
                const successMsg = document.createElement('div');
                successMsg.className = 'form-success';
                successMsg.textContent = 'Thank you for your message! We\'ll get back to you soon.';
                this.appendChild(successMsg);
                
                // Reset form
                this.reset();
                
                // Remove message after 5 seconds
                setTimeout(() => {
                    successMsg.remove();
                }, 5000);
            }
        });
    }
});

// ========== UTILITY FUNCTIONS ==========
function debounce(func, wait = 20, immediate = true) {
    let timeout;
    return function() {
        const context = this, args = arguments;
        const later = function() {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
}