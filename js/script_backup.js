// Optimiertes JavaScript für Schützenverein Tell Webseite
document.addEventListener('DOMContentLoaded', function() {
    'use strict';
    
    console.log('🚀 JavaScript loaded successfully!');
    
    // ========== Mobile Menu Handling ==========
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');

    console.log('🔍 Searching for mobile menu elements...');
    console.log('Mobile Menu Button found:', !!mobileMenuButton);
    console.log('Mobile Menu found:', !!mobileMenu);

    if (mobileMenuButton && mobileMenu) {
        console.log('✅ Both mobile menu elements found! Setting up click handler...');
        
        mobileMenuButton.addEventListener('click', function(e) {
            e.preventDefault();
            console.log('🔥 HAMBURGER MENU CLICKED!');
            
            const isOpen = mobileMenu.classList.contains('open');
            console.log('Current state:', isOpen ? 'OPEN' : 'CLOSED');
            
            if (isOpen) {
                // Menu schließen
                console.log('Closing menu...');
                mobileMenu.classList.remove('open');
                mobileMenu.classList.add('hidden');
                this.classList.remove('active');
                this.setAttribute('aria-expanded', 'false');
            } else {
                // Menu öffnen
                console.log('Opening menu...');
                mobileMenu.classList.remove('hidden');
                mobileMenu.classList.add('open');
                this.classList.add('active');
                this.setAttribute('aria-expanded', 'true');
            }
        });
        
        console.log('✅ Click handler attached successfully!');
    } else {
        console.error('❌ Mobile menu elements not found!');
        if (!mobileMenuButton) console.error('Missing: mobile-menu-button');
        if (!mobileMenu) console.error('Missing: mobile-menu');
    }

    // Mobile menu Links behandeln
    if (mobileMenu) {
        const mobileLinks = mobileMenu.querySelectorAll('a:not(.mobile-dropdown-button)');
        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.remove('open');
                setTimeout(() => {
                    mobileMenu.classList.add('hidden');
                }, 600);
                
                if (mobileMenuButton) {
                    mobileMenuButton.classList.remove('active');
                    mobileMenuButton.setAttribute('aria-expanded', 'false');
                }
                
                // Reset mobile dropdowns when mobile menu closes mit Animation
                document.querySelectorAll('.mobile-dropdown-content').forEach(content => {
                    content.classList.remove('open');
                    const dropdown = content.closest('.mobile-dropdown');
                    const button = dropdown.querySelector('.mobile-dropdown-button');
                    if (button) {
                        button.setAttribute('aria-expanded', 'false');
                    }
                });
            });
        });
    }

    // Fenster-Größenänderung behandeln
    const handleResize = () => {
        if (window.innerWidth >= 1024) {
            // Desktop-Ansicht
            if (mobileMenu) {
                if (!mobileMenu.classList.contains('hidden')) {
                    mobileMenu.classList.remove('open');
                    mobileMenu.classList.add('hidden');
                }
            }
            
            if (mobileMenuButton) {
                mobileMenuButton.classList.remove('active');
                mobileMenuButton.setAttribute('aria-expanded', 'false');
            }
        }
    };

    window.addEventListener('resize', handleResize);

    // ========== Mobile Dropdown Handling ==========
    function initMobileDropdowns() {
        console.log('Initializing mobile dropdowns...');
        
        const mobileDropdownButtons = document.querySelectorAll('.mobile-dropdown-button');
        console.log('Found mobile dropdown buttons:', mobileDropdownButtons.length);
        
        mobileDropdownButtons.forEach((button, index) => {
            button.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                
                const dropdown = this.closest('.mobile-dropdown');
                const content = dropdown.querySelector('.mobile-dropdown-content');
                
                if (!content) return;
                
                const isOpen = content.classList.contains('open');
                
                // Alle anderen Dropdowns schließen
                document.querySelectorAll('.mobile-dropdown-content').forEach(otherContent => {
                    if (otherContent !== content && otherContent.classList.contains('open')) {
                        otherContent.classList.remove('open');
                        const otherDropdown = otherContent.closest('.mobile-dropdown');
                        const otherButton = otherDropdown.querySelector('.mobile-dropdown-button');
                        if (otherButton) {
                            otherButton.setAttribute('aria-expanded', 'false');
                        }
                    }
                });
                
                // Aktuelles Dropdown togglen
                if (isOpen) {
                    content.classList.remove('open');
                    this.setAttribute('aria-expanded', 'false');
                } else {
                    content.classList.add('open');
                    this.setAttribute('aria-expanded', 'true');
                }
            });
        });
    }
    
    // Initialize dropdowns
    initMobileDropdowns();
    
    // ========== Window Resize Handler ==========
    window.addEventListener('resize', function() {
        if (window.innerWidth >= 1024) {
            if (mobileMenu && !mobileMenu.classList.contains('hidden')) {
                mobileMenu.classList.remove('open');
                mobileMenu.classList.add('hidden');
            }
            if (mobileMenuButton) {
                mobileMenuButton.classList.remove('active');
                mobileMenuButton.setAttribute('aria-expanded', 'false');
            }
        }
    });

});  // Ende von DOMContentLoaded

// ========== Desktop Dropdown Handling ==========
const navDropdowns = document.querySelectorAll('.nav-dropdown');

// Globaler Klick-Handler zum Schließen der Dropdowns
document.addEventListener('click', (e) => {
    const isDropdownClick = e.target.closest('.nav-dropdown');
    if (!isDropdownClick) {
        // Alle Dropdowns schließen
        navDropdowns.forEach(dropdown => {
            const button = dropdown.querySelector('.dropdown-button');
            if (button) {
                button.setAttribute('aria-expanded', 'false');
            }
        });
    }
});

// Close dropdowns when scrolling
let scrollTimer;
window.addEventListener('scroll', () => {
    clearTimeout(scrollTimer);
    scrollTimer = setTimeout(() => {
        navDropdowns.forEach(dropdown => {
            const button = dropdown.querySelector('.dropdown-button');
            if (button) {
                button.setAttribute('aria-expanded', 'false');
            }
        });
    }, 150); // Debounce delay
});

// Setup individual dropdowns
navDropdowns.forEach(dropdown => {
    const button = dropdown.querySelector('.dropdown-button');
    const menu = dropdown.querySelector('.dropdown-content');
    
    if (button && menu) {
        // Click handling
        button.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            
            const isExpanded = button.getAttribute('aria-expanded') === 'true';
            
            // Close all other dropdowns
            navDropdowns.forEach(otherDropdown => {
                const otherButton = otherDropdown.querySelector('.dropdown-button');
                if (otherButton && otherButton !== button) {
                    otherButton.setAttribute('aria-expanded', 'false');
                }
            });
            
            // Toggle current dropdown
            button.setAttribute('aria-expanded', isExpanded ? 'false' : 'true');
        });
        
        // Keyboard accessibility
        setupKeyboardNavigation(button, menu);
        
        // Prevent menu clicks from bubbling
        menu.addEventListener('click', (e) => {
            e.stopPropagation();
        });
    }
});

// ========== Navigation Active State ==========
function updateActiveNavItem(targetId) {
    // Clear all active states first
    document.querySelectorAll('nav a, .dropdown-button').forEach(item => {
        item.classList.remove('active');
    });
    
    // Check if we have a hash target
    if (targetId) {
        // For regular links
        document.querySelectorAll('nav a').forEach(link => {
            if (link.getAttribute('href') === '#' + targetId) {
                link.classList.add('active');
            }
        });
        
        // For dropdown items
        document.querySelectorAll('.dropdown-content a').forEach(link => {
            if (link.getAttribute('href') === '#' + targetId) {
                const parentDropdown = link.closest('.nav-dropdown');
                if (parentDropdown) {
                    const dropdownToggle = parentDropdown.querySelector('.dropdown-button');
                    if (dropdownToggle) {
                        dropdownToggle.classList.add('active');
                    }
                }
            }
        });
    } else {
        // If no targetId (homepage or initial load), activate home
        const homeLink = document.querySelector('nav a[href="#"]');
        if (homeLink) {
            homeLink.classList.add('active');
        }
    }
}

// Set initial active state based on URL hash
const initialHash = window.location.hash.substring(1) || '';
updateActiveNavItem(initialHash);

// Update active state when clicking links
document.querySelectorAll('nav a, .dropdown-content a').forEach(link => {
    link.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href && href.startsWith('#')) {
            const targetId = href.substring(1);
            updateActiveNavItem(targetId);
        }
    });
});

// Hashchange event
window.addEventListener('hashchange', function() {
    const newHash = window.location.hash.substring(1);
    updateActiveNavItem(newHash);
});

// ========== Keyboard Navigation Helpers ==========
function setupKeyboardNavigation(button, menu) {
    // Set up ARIA attributes
    button.setAttribute('aria-haspopup', 'true');
    
    // Generate unique ID for menu
    const menuId = `menu-${Math.random().toString(36).slice(2, 11)}`;
    menu.id = menuId;
    button.setAttribute('aria-controls', menuId);
    
    // Get all menu items
    const menuItems = menu.querySelectorAll('a');
    
    // Button keyboard events
    button.addEventListener('keydown', (e) => {
        switch (e.key) {
            case 'Enter':
            case ' ': // Space
                e.preventDefault();
                button.setAttribute('aria-expanded', 'true');
                if (menuItems.length > 0) {
                    menuItems[0].focus();
                }
                break;
                
            case 'ArrowDown':
                e.preventDefault();
                button.setAttribute('aria-expanded', 'true');
                if (menuItems.length > 0) {
                    menuItems[0].focus();
                }
                break;
                
            case 'Escape':
                button.setAttribute('aria-expanded', 'false');
                break;
        }
    });
    
    // Menu item keyboard navigation
    menuItems.forEach((item, index) => {
        item.addEventListener('keydown', (e) => {
            switch (e.key) {
                case 'Escape':
                    e.preventDefault();
                    button.setAttribute('aria-expanded', 'false');
                    button.focus();
                    break;
                    
                case 'ArrowDown':
                    e.preventDefault();
                    if (index < menuItems.length - 1) {
                        menuItems[index + 1].focus();
                    }
                    break;
                    
                case 'ArrowUp':
                    e.preventDefault();
                    if (index > 0) {
                        menuItems[index - 1].focus();
                    } else {
                        button.setAttribute('aria-expanded', 'false');
                        button.focus();
                    }
                    break;
                    
                case 'Tab':
                    // If it's the last item and tabbing forward, close dropdown
                    if (!e.shiftKey && index === menuItems.length - 1) {
                        setTimeout(() => {
                            button.setAttribute('aria-expanded', 'false');
                    }, 0);
                    } 
                    // If it's the first item and tabbing backward, close dropdown
                    else if (e.shiftKey && index === 0) {
                        setTimeout(() => {
                            button.setAttribute('aria-expanded', 'false');
                    }, 0);
                    }
                    break;
            }
        });
    });
}

// ========== Contact Form Validation ==========
    const initFormValidation = () => {
        const contactForm = document.getElementById('contactForm');
        
        if (contactForm) {
            // Add validation to contact form
            contactForm.addEventListener('submit', function(e) {
                e.preventDefault();
                
                let isValid = true;
                const name = this.querySelector('#name');
                const email = this.querySelector('#email');
                const message = this.querySelector('#message');
                const privacy = this.querySelector('#privacy');
                
                // Reset previous error states
                document.querySelectorAll('.error-message').forEach(el => el.classList.add('hidden'));
                
                // Name validation
                if (!name.value.trim()) {
                    document.querySelector('[for="name"]').nextElementSibling.nextElementSibling.classList.remove('hidden');
                    isValid = false;
                    name.focus();
                }
                
                // Email validation
                const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailPattern.test(email.value.trim())) {
                    document.querySelector('[for="email"]').nextElementSibling.nextElementSibling.classList.remove('hidden');
                    if (isValid) {
                        email.focus();
                        isValid = false;
                    }
                }
                
                // Message validation
                if (!message.value.trim()) {
                    document.querySelector('[for="message"]').nextElementSibling.nextElementSibling.classList.remove('hidden');
                    if (isValid) {
                        message.focus();
                        isValid = false;
                    }
                }
                
                // Privacy validation
                if (!privacy.checked) {
                    document.getElementById('privacy-error').classList.remove('hidden');
                    if (isValid) {
                        privacy.focus();
                        isValid = false;
                    }
                }
                
                // If all validations pass
                if (isValid) {
                    // Hide any previous messages
                    document.getElementById('form-success').classList.add('hidden');
                    document.getElementById('form-error').classList.add('hidden');
                    
                    // Simulate form submission (replace with actual backend submission)
                    const formData = new FormData(contactForm);
                    
                    // Show loading state
                    const submitButton = contactForm.querySelector('button[type="submit"]');
                    const originalButtonText = submitButton.innerHTML;
                    submitButton.disabled = true;
                    submitButton.innerHTML = `<span class="inline-block animate-spin mr-2">⟳</span> Wird gesendet...`;
                    
                    // Simulate API call
                    setTimeout(() => {
                        // Success
                        submitButton.disabled = false;
                        submitButton.innerHTML = originalButtonText;
                        document.getElementById('form-success').classList.remove('hidden');
                        
                        // Reset form
                        contactForm.reset();
                        
                        // Scroll success message into view
                        document.getElementById('form-success').scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                    }, 1500);
                }
            });
            
            // Input focus behavior
            const inputs = contactForm.querySelectorAll('input, textarea, select');
            inputs.forEach(input => {
                // Clear error on input
                input.addEventListener('input', function() {
                    const errorMessage = this.nextElementSibling;
                    if (errorMessage && errorMessage.classList.contains('error-message')) {
                        errorMessage.classList.add('hidden');
                    }
                    
                    // Special case for privacy checkbox
                    if (this.id === 'privacy' && this.checked) {
                        document.getElementById('privacy-error').classList.add('hidden');
                    }
                });
                
                // Add focus highlight
                input.addEventListener('focus', function() {
                    this.parentElement.classList.add('focused');
                });
                
                input.addEventListener('blur', function() {
                    this.parentElement.classList.remove('focused');
                });
            });
        }
    };
    
    // Initialize form validation
    initFormValidation();
    
    // ========== Lazy Loading Images ==========
    // Using Intersection Observer for better performance
    const lazyLoadImages = () => {
        // Check if browser supports Intersection Observer
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        const src = img.dataset.src;
                        
                        if (src) {
                            img.src = src;
                            img.addEventListener('load', () => {
                                img.classList.add('loaded');
                                // Add small delay to smooth transition
                                setTimeout(() => {
                                    const placeholder = img.nextElementSibling;
                                    if (placeholder && placeholder.classList.contains('image-placeholder')) {
                                        placeholder.style.opacity = '0';
                                    }
                                }, 100);
                            });
                            
                            // Stop observing this image
                            observer.unobserve(img);
                        }
                    }
                });
            }, {
                rootMargin: '50px', // Start loading when images come within 50px of viewport
                threshold: 0.1 // Trigger when 10% of image is visible
            });
            
            // Observe all lazy images
            document.querySelectorAll('img.lazy-image').forEach(img => {
                imageObserver.observe(img);
            });
        } else {
            // Fallback for browsers that don't support Intersection Observer
            // Simple scroll-based loading
            const lazyLoad = () => {
                const lazyImages = document.querySelectorAll('img.lazy-image:not(.loaded)');
                const scrollTop = window.pageYOffset;
                
                lazyImages.forEach(img => {
                    if (img.offsetTop < window.innerHeight + scrollTop + 300) {
                        const src = img.dataset.src;
                        if (src) {
                            img.src = src;
                            img.addEventListener('load', () => {
                                img.classList.add('loaded');
                                const placeholder = img.nextElementSibling;
                                if (placeholder && placeholder.classList.contains('image-placeholder')) {
                                    placeholder.style.opacity = '0';
                                }
                            });
                        }
                    }
                });
                
                // If all images have been loaded, stop listening
                if (lazyImages.length === 0) {
                    document.removeEventListener('scroll', lazyLoad);
                    window.removeEventListener('resize', lazyLoad);
                    window.removeEventListener('orientationchange', lazyLoad);
                }
            };
            
            document.addEventListener('scroll', lazyLoad);
            window.addEventListener('resize', lazyLoad);
            window.addEventListener('orientationchange', lazyLoad);
            
            // Initial load
            lazyLoad();
        }
    };
    
    // Initialize lazy loading
    lazyLoadImages();
    
    // ========== Image loading and optimization ==========
    // Lazy loading für alle Bilder with data-src Attribut
    const lazyImages = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.getAttribute('data-src');
                img.removeAttribute('data-src');
                observer.unobserve(img);
            }
        });
    }, {
        rootMargin: '0px 0px 200px 0px' // Lade Bilder 200px bevor sie sichtbar werden
    });
    
    lazyImages.forEach(img => {
        imageObserver.observe(img);
    });
    
    // ========== Smooth scrolling for all anchor links ==========
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            
            // Überprüfen, ob das Ziel existiert
            if (targetId !== '#' && document.querySelector(targetId)) {
                e.preventDefault();
                
                // Mobile menu schließen, wenn geöffnet
                if (mobileMenu && !mobileMenu.classList.contains('hidden')) {
                    mobileMenuButton.click();
                }
                
                // Sanft zu Ziel scrollen
                document.querySelector(targetId).scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // ========== Mobile dropdown toggles ==========
    document.querySelectorAll('.mobile-dropdown button').forEach(button => {
        button.addEventListener('click', function() {
            // Toggle ARIA attributes
            const expanded = this.getAttribute('aria-expanded') === 'true';
            this.setAttribute('aria-expanded', !expanded);
            
            // Toggle dropdown content with unified approach
            const content = this.nextElementSibling;
            if (expanded) {
                content.classList.remove('open');
                content.classList.add('hidden'); // Support for Tailwind hidden class
            } else {
                content.classList.remove('hidden'); // Remove Tailwind hidden class
                content.classList.add('open');
            }
            
            // Rotate arrow icon
            const arrow = this.querySelector('svg');
            if (arrow) {
                arrow.style.transform = expanded ? 'rotate(0deg)' : 'rotate(180deg)';
                arrow.style.transition = 'transform 0.3s ease';
            }
        });
    });
    
    // ========== Fix any image loading issues ==========
    // Force image load for critical images if they haven't loaded within 3 seconds
    setTimeout(() => {
        document.querySelectorAll('img[src*="Schützenverein"]').forEach(img => {
            if (!img.complete) {
                const currentSrc = img.src;
                img.src = '';
                img.src = currentSrc;
            }
        });
    }, 3000);
    
    // ========== Check if all newly added sections exist and are visible ==========
    const requiredSections = ['#halle', '#disziplinen', '#gewehre', '#training'];
    requiredSections.forEach(sectionId => {
        const section = document.querySelector(sectionId);
        if (!section) {
            console.warn(`Section ${sectionId} not found!`);
        }
    });
    
    // ========== Contact Form Validation ==========
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            let isValid = true;
            
            // Basic validation for required fields
            const requiredFields = contactForm.querySelectorAll('[required]');
            requiredFields.forEach(field => {
                const errorMessage = field.nextElementSibling;
                if (!field.value.trim()) {
                    field.classList.add('border-red-500');
                    if (errorMessage && errorMessage.classList.contains('error-message')) {
                        errorMessage.classList.remove('hidden');
                    }
                    isValid = false;
                } else {
                    field.classList.remove('border-red-500');
                    if (errorMessage && errorMessage.classList.contains('error-message')) {
                        errorMessage.classList.add('hidden');
                    }
                }
            });
            
            // Email validation
            const emailField = contactForm.querySelector('#email');
            if (emailField && emailField.value.trim()) {
                const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                const errorMessage = emailField.nextElementSibling;
                
                if (!emailPattern.test(emailField.value)) {
                    emailField.classList.add('border-red-500');
                    if (errorMessage && errorMessage.classList.contains('error-message')) {
                        errorMessage.classList.remove('hidden');
                    }
                    isValid = false;
                }
            }
            
            // If form is valid, show success message
            if (isValid) {
                const successMsg = document.getElementById('form-success');
                const errorMsg = document.getElementById('form-error');
                
                if (successMsg) {
                    successMsg.classList.remove('hidden');
                    // Hide success message after 5 seconds
                    setTimeout(() => {
                        successMsg.classList.add('hidden');
                    }, 5000);
                }
                
                if (errorMsg) {
                    errorMsg.classList.add('hidden');
                }
                
                // Reset form
                contactForm.reset();
            }
        });
    }
});
// We've simplified the design, so we don't need scroll animations anymore
// Initialize animations and functionality
