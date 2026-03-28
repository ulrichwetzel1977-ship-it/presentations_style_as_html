/**
 * REVEAL ENGINE INITIALIZER
 */
function initPresentationEngine() {
    Reveal.initialize({
        hash: true,
        controls: true,
        progress: true,
        center: false, // Wichtig für professionelles Layout oben links
        transition: 'slide', 
        keyboard: true,
        overview: true,
        pdfMaxPagesPerSheet: 1,
        
        // Vollbild mit 'f' Taste
        help: true,

        // Automatische Video-Wiedergabe
        autoPlayMedia: true,

        // Navigationseinstellungen
        navigationMode: 'linear', 
        embedded: false
    });

    // Event-Hook für dein Protokoll-System
    Reveal.on('slidechanged', event => {
        if (typeof updateProtocolUI === 'function') {
            updateProtocolUI(event.indexh);
        }
    });
}

// Start der Engine
document.addEventListener('DOMContentLoaded', initPresentationEngine);