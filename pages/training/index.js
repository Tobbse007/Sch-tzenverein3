/**
 * Training & Preise - JavaScript Funktionalität
 * Schützenverein Tell Quierschied
 */

document.addEventListener('DOMContentLoaded', function() {
    console.log('Training & Preise Seite geladen');
    
    // Initialisierung
    initScrollAnimations();
    initPriceCardInteractions();
    initContactButtons();
    initScheduleHighlight();
    initFormHandling();
    
    // Smooth Scrolling für Anker-Links
    initSmoothScrolling();
});

/**
 * Scroll-Animationen für Elemente
 */
function initScrollAnimations() {
    // Intersection Observer für Fade-in Animationen
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-fade-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Elemente für Animation registrieren
    const animatedElements = document.querySelectorAll(
        '.training-card, .schedule-card, .price-card, .info-item, .section-header'
    );
    
    animatedElements.forEach(element => {
        observer.observe(element);
    });
}

/**
 * Interaktionen für Preiskarten
 */
function initPriceCardInteractions() {
    const priceCards = document.querySelectorAll('.price-card');
    
    priceCards.forEach(card => {
        // Hover-Effekte verstärken
        card.addEventListener('mouseenter', function() {
            // Andere Karten abdunkeln
            priceCards.forEach(otherCard => {
                if (otherCard !== card) {
                    otherCard.style.opacity = '0.7';
                }
            });
        });
        
        card.addEventListener('mouseleave', function() {
            // Alle Karten wieder normal
            priceCards.forEach(otherCard => {
                otherCard.style.opacity = '1';
            });
        });
        
        // Click-Tracking für Analytics
        const button = card.querySelector('.price-button');
        if (button) {
            button.addEventListener('click', function(e) {
                const cardTitle = card.querySelector('.price-title').textContent;
                console.log(`Preiskarte geklickt: ${cardTitle}`);
                
                // Hier könnte Google Analytics Event tracking eingefügt werden
                // gtag('event', 'click', {
                //     event_category: 'pricing',
                //     event_label: cardTitle
                // });
            });
        }
    });
}

/**
 * Kontakt-Button Funktionalität
 */
function initContactButtons() {
    // Telefon-Links formatieren
    const phoneLinks = document.querySelectorAll('a[href^="tel:"]');
    phoneLinks.forEach(link => {
        link.addEventListener('click', function() {
            console.log('Telefon-Link geklickt');
        });
    });
    
    // E-Mail-Links
    const emailLinks = document.querySelectorAll('a[href^="mailto:"]');
    emailLinks.forEach(link => {
        link.addEventListener('click', function() {
            console.log('E-Mail-Link geklickt');
        });
    });
    
    // CTA Buttons tracking
    const ctaButtons = document.querySelectorAll('.btn-white, .btn-outline-white');
    ctaButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            const buttonText = button.textContent.trim();
            console.log(`CTA Button geklickt: ${buttonText}`);
        });
    });
}

/**
 * Trainingszeiten hervorheben (aktueller Tag)
 */
function initScheduleHighlight() {
    const today = new Date();
    const currentDay = today.getDay(); // 0 = Sonntag, 1 = Montag, etc.
    
    // Mapping für deutsche Wochentage
    const dayMapping = {
        2: 'Dienstag',    // Dienstag
        4: 'Donnerstag',  // Donnerstag
        5: 'Freitag',     // Freitag
        6: 'Samstag',     // Samstag
        0: 'Sonntag'      // Sonntag
    };
    
    const todayName = dayMapping[currentDay];
    
    if (todayName) {
        // Finde den entsprechenden Schedule-Tag
        const scheduleItems = document.querySelectorAll('.schedule-item');
        scheduleItems.forEach(item => {
            const dayElement = item.querySelector('.schedule-day');
            if (dayElement && dayElement.textContent.trim() === todayName) {
                item.classList.add('schedule-today');
                item.style.background = '#f0fdf4';
                item.style.borderLeftColor = '#22c55e';
                item.style.borderLeftWidth = '6px';
                
                // Icon hinzufügen
                if (!item.querySelector('.today-icon')) {
                    const icon = document.createElement('span');
                    icon.className = 'today-icon';
                    icon.innerHTML = '📍';
                    icon.style.position = 'absolute';
                    icon.style.right = '0.5rem';
                    icon.style.top = '0.5rem';
                    item.style.position = 'relative';
                    item.appendChild(icon);
                }
            }
        });
    }
}

/**
 * Smooth Scrolling für Anker-Links
 */
function initSmoothScrolling() {
    // Alle internen Links mit Hash
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = link.getAttribute('href');
            
            // Nur bei validen Ankern
            if (href && href !== '#') {
                const target = document.querySelector(href);
                
                if (target) {
                    e.preventDefault();
                    
                    const offsetTop = target.offsetTop - 100; // Navbar Höhe berücksichtigen
                    
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
}

/**
 * Formular-Validierung (falls Kontaktformular hinzugefügt wird)
 */
function initFormValidation() {
    const forms = document.querySelectorAll('form');
    
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            const requiredFields = form.querySelectorAll('[required]');
            let isValid = true;
            
            requiredFields.forEach(field => {
                if (!field.value.trim()) {
                    isValid = false;
                    field.classList.add('error');
                    
                    // Error-Klasse nach 3 Sekunden entfernen
                    setTimeout(() => {
                        field.classList.remove('error');
                    }, 3000);
                } else {
                    field.classList.remove('error');
                }
            });
            
            if (!isValid) {
                e.preventDefault();
                console.log('Formular-Validierung fehlgeschlagen');
            }
        });
    });
}

/**
 * Lazy Loading für Bilder (falls weitere Bilder hinzugefügt werden)
 */
function initLazyLoading() {
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                        img.classList.remove('lazy');
                        imageObserver.unobserve(img);
                    }
                }
            });
        });
        
        const lazyImages = document.querySelectorAll('img[data-src]');
        lazyImages.forEach(img => imageObserver.observe(img));
    }
}

/**
 * Scroll-to-Top Button (optional)
 */
function initScrollToTop() {
    // Button erstellen
    const scrollButton = document.createElement('button');
    scrollButton.innerHTML = '↑';
    scrollButton.className = 'scroll-to-top';
    scrollButton.style.cssText = `
        position: fixed;
        bottom: 2rem;
        right: 2rem;
        width: 3rem;
        height: 3rem;
        border-radius: 50%;
        background: var(--color-primary);
        color: white;
        border: none;
        font-size: 1.5rem;
        cursor: pointer;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        z-index: 1000;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
    `;
    
    document.body.appendChild(scrollButton);
    
    // Scroll-Listener
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            scrollButton.style.opacity = '1';
            scrollButton.style.visibility = 'visible';
        } else {
            scrollButton.style.opacity = '0';
            scrollButton.style.visibility = 'hidden';
        }
    });
    
    // Click-Handler
    scrollButton.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

/**
 * CSS-Animationen programmatisch hinzufügen
 */
function addAnimationStyles() {
    const style = document.createElement('style');
    style.textContent = `
        .animate-fade-in {
            animation: fadeInUp 0.6s ease-out forwards;
        }
        
        @keyframes fadeInUp {
            from {
                opacity: 0;
                transform: translateY(30px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        .error {
            border-color: #ef4444 !important;
            box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.1) !important;
        }
        
        .scroll-to-top:hover {
            transform: translateY(-2px);
            box-shadow: 0 6px 16px rgba(0,0,0,0.2);
        }
    `;
    document.head.appendChild(style);
}

// Styles beim Laden hinzufügen
addAnimationStyles();

// Optional: Scroll-to-Top Button aktivieren
// initScrollToTop();

/**
 * Performance Monitoring
 */
function monitorPerformance() {
    // Ladezeit messen
    window.addEventListener('load', function() {
        const loadTime = performance.now();
        console.log(`Seite geladen in ${Math.round(loadTime)}ms`);
        
        // Hier könnte Performance-Tracking an Analytics gesendet werden
    });
    
    // Core Web Vitals (vereinfacht)
    if ('web-vital' in window) {
        // Hier könnten Web Vitals gemessen werden
    }
}

// Performance Monitoring starten
monitorPerformance();

/**
 * Error Handling
 */
window.addEventListener('error', function(e) {
    console.error('JavaScript Fehler:', e.error);
    // Hier könnte Error-Tracking implementiert werden
});

/**
 * Formular-Handling
 */
function initFormHandling() {
    const form = document.querySelector('#anmeldung form');
    const anliegenInputs = document.querySelectorAll('input[name="anliegen"]');
    const mitgliedFields = document.getElementById('mitglied-fields');
    const gastschuetzeFields = document.getElementById('gastschuetze-fields');
    
    // URL Parameter prüfen und entsprechende Option vorauswählen
    const urlParams = new URLSearchParams(window.location.search);
    const preselect = urlParams.get('type');
    
    if (preselect) {
        const radioToSelect = document.querySelector(`input[name="anliegen"][value="${preselect}"]`);
        if (radioToSelect) {
            radioToSelect.checked = true;
            showConditionalFields(preselect);
        }
    }
    
    // Event Listener für Anliegen-Auswahl
    anliegenInputs.forEach(input => {
        input.addEventListener('change', function() {
            const value = this.value;
            showConditionalFields(value);
        });
    });
    
    // Formular Submit Handler
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            handleFormSubmit(this);
        });
    }
}

/**
 * Zeigt/versteckt bedingte Formularfelder
 */
function showConditionalFields(type) {
    const formContent = document.getElementById('form-content');
    const mitgliedFields = document.getElementById('mitglied-fields');
    const gastschuetzeFields = document.getElementById('gastschuetze-fields');
    const geburtsdatumField = document.getElementById('geburtsdatum').closest('.mb-6');
    const nachrichtLabel = document.querySelector('label[for="nachricht"]');
    const nachrichtTextarea = document.getElementById('nachricht');
    const submitButton = document.querySelector('button[type="submit"]');
    
    // Wenn keine Option ausgewählt ist, verstecke das gesamte Formular
    if (!type) {
        formContent.style.display = 'none';
        return;
    }
    
    // Formular-Inhalt anzeigen
    formContent.style.display = 'block';
    
    // Alle bedingten Felder zurücksetzen
    mitgliedFields.style.display = 'none';
    gastschuetzeFields.style.display = 'none';
    
    // Entsprechende Felder anzeigen und anpassen
    if (type === 'mitglied') {
        mitgliedFields.style.display = 'block';
        geburtsdatumField.style.display = 'block';
        nachrichtLabel.textContent = 'Zusätzliche Informationen';
        nachrichtTextarea.placeholder = 'Haben Sie Fragen zur Mitgliedschaft oder besondere Wünsche? Teilen Sie uns diese gerne mit...';
        submitButton.innerHTML = `
            <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"></path>
            </svg>
            Mitgliedschaft beantragen
        `;
    } else if (type === 'gastschuetze') {
        gastschuetzeFields.style.display = 'block';
        geburtsdatumField.style.display = 'block';
        nachrichtLabel.textContent = 'Besondere Wünsche oder Fragen';
        nachrichtTextarea.placeholder = 'Haben Sie bereits Erfahrung im Schießsport? Besondere Wünsche für das Training? Teilen Sie uns gerne weitere Details mit...';
        submitButton.innerHTML = `
            <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3a4 4 0 118 0v4m-4 7v2m0 0v2m0-2h.01M12 21a9 9 0 01-9-9V9a1 1 0 011-1h16a1 1 0 011 1v3a9 9 0 01-9 9z"></path>
            </svg>
            Schnuppertraining buchen
        `;
    } else if (type === 'fragen') {
        geburtsdatumField.style.display = 'none';
        nachrichtLabel.textContent = 'Ihre Fragen *';
        nachrichtTextarea.placeholder = 'Welche Fragen haben Sie zum Schützenverein, zum Training oder zur Mitgliedschaft? Wir helfen gerne weiter...';
        nachrichtTextarea.required = true;
        submitButton.innerHTML = `
            <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
            Frage senden
        `;
    }
}

/**
 * Formular-Submit Handler
 */
function handleFormSubmit(form) {
    // Hier würde normalerweise die Formular-Daten verarbeitet
    // Für Demo-Zwecke zeigen wir eine Erfolgsmeldung
    
    const formData = new FormData(form);
    const anliegen = formData.get('anliegen');
    
    let message = 'Vielen Dank für Ihre Anfrage! Wir werden uns schnellstmöglich bei Ihnen melden.';
    let title = 'Anfrage erhalten!';
    
    if (anliegen === 'mitglied') {
        title = 'Mitgliedschaftsantrag erhalten!';
        message = 'Vielen Dank für Ihr Interesse an einer Mitgliedschaft im Schützenverein Tell Quierschied! Wir werden Ihren Antrag prüfen und uns schnellstmöglich bei Ihnen melden. Sie erhalten in Kürze weitere Informationen zum Beitritt und den nächsten Schritten.';
    } else if (anliegen === 'gastschuetze') {
        title = 'Schnuppertraining angefragt!';
        message = 'Vielen Dank für Ihr Interesse am Schnuppertraining! Wir werden uns zur Terminabsprache bei Ihnen melden. Freuen Sie sich auf Ihr erstes Schießerlebnis in unserem Verein!';
    } else if (anliegen === 'fragen') {
        title = 'Frage erhalten!';
        message = 'Vielen Dank für Ihre Frage! Unser Team wird sich schnellstmöglich bei Ihnen melden und Ihnen gerne weiterhelfen.';
    }
    
    // Erfolgsmeldung anzeigen
    showSuccessMessage(message, title);
    
    // Formular zurücksetzen
    form.reset();
    showConditionalFields('');
}

/**
 * Erfolgsmeldung anzeigen
 */
function showSuccessMessage(message, title = 'Erfolgreich gesendet!') {
    const existingMessage = document.querySelector('.success-message');
    if (existingMessage) {
        existingMessage.remove();
    }
    
    const messageDiv = document.createElement('div');
    messageDiv.className = 'success-message fixed top-4 right-4 bg-green-600 text-white p-4 rounded-lg shadow-lg z-50 max-w-md';
    messageDiv.innerHTML = `
        <div class="flex items-start">
            <svg class="w-6 h-6 mr-3 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
            <div>
                <h4 class="font-semibold mb-1">${title}</h4>
                <p class="text-sm">${message}</p>
            </div>
            <button onclick="this.parentElement.parentElement.remove()" class="ml-3 text-white hover:text-gray-200">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
            </button>
        </div>
    `;
    
    document.body.appendChild(messageDiv);
    
    // Nach 5 Sekunden automatisch ausblenden
    setTimeout(() => {
        if (messageDiv.parentElement) {
            messageDiv.remove();
        }
    }, 5000);
}

/**
 * Scroll zum Formular mit vorausgewählter Option
 */
function scrollToFormWithOption(type) {
    const form = document.getElementById('anmeldung');
    const radioToSelect = document.querySelector(`input[name="anliegen"][value="${type}"]`);
    
    if (radioToSelect) {
        radioToSelect.checked = true;
        showConditionalFields(type);
    }
    
    if (form) {
        form.scrollIntoView({ 
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// Globale Funktion für Button-Verlinkungen
window.scrollToFormWithOption = scrollToFormWithOption;

/**
 * Export für Module (falls verwendet)
 */
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        initScrollAnimations,
        initPriceCardInteractions,
        initContactButtons,
        initScheduleHighlight
    };
}
