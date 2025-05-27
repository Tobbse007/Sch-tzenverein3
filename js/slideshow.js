/**
 * Slideshow mit Fade-Effekt für Footer-Bilder
 * Wechselt automatisch durch Bilder mit sanftem Überblendeffekt
 */
document.addEventListener('DOMContentLoaded', function() {
    initFooterSlideshows();
});

/**
 * Initialisiert die Slideshow-Funktion für alle Container mit der Klasse 'slideshow-container'
 */
function initFooterSlideshows() {
    // Finde alle Slideshow-Container auf der Seite
    const slideshowContainers = document.querySelectorAll('.slideshow-container');
    
    slideshowContainers.forEach(container => {
        const images = container.querySelectorAll('.slideshow-image');
        if (images.length > 1) {
            // Starte die Slideshow nur, wenn mehr als ein Bild vorhanden ist
            startSlideshow(images);
        }
    });
}

/**
 * Startet die Bildwechsel-Animation für die übergebenen Bilder
 * @param {NodeList} images - Die Bilder der Slideshow
 */
function startSlideshow(images) {
    let currentIndex = 0;
    
    // Erste Bild sollte bereits aktiv sein (durch die HTML-Klasse 'active')
      // Wechsle regelmäßig das Bild
    setInterval(() => {
        // Entferne die 'active' Klasse vom aktuellen Bild
        images[currentIndex].classList.remove('active');
        
        // Erhöhe den Index und setze ihn zurück, wenn wir am Ende angekommen sind
        currentIndex = (currentIndex + 1) % images.length;
        
        // Füge die 'active' Klasse zum nächsten Bild hinzu
        images[currentIndex].classList.add('active');
    }, 10000); // Wechsle alle 10 Sekunden
}
