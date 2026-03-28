/**
 * APP-STYLE ENGINE INITIALIZER
 * Steuert die Navigation für den interaktiven Workshop-Modus
 */

let currentSlideIndex = 0;
let allSlides = [];

function initAppEngine() {
    allSlides = document.querySelectorAll('.slide');
    
    if (allSlides.length === 0) {
        console.warn("Keine Folien mit der Klasse '.slide' gefunden.");
        return;
    }

    // Ersten Slide aktivieren
    showSlide(0);

    // Tastatur-Events
    document.addEventListener('keydown', (e) => {
        if (e.target.tagName === 'TEXTAREA' || e.target.tagName === 'INPUT') return;

        switch(e.key) {
            case 'ArrowRight':
            case ' ':
                nextSlide();
                break;
            case 'ArrowLeft':
                prevSlide();
                break;
            case 'f':
                toggleFullScreen();
                break;
        }
    });

    console.log("App-Engine initialisiert. Slides:", allSlides.length);
}

function showSlide(index) {
    // Bounds Check
    if (index < 0 || index >= allSlides.length) return;

    // Klassen wechseln
    allSlides.forEach((slide, i) => {
        slide.classList.remove('active');
        if (i === index) {
            slide.classList.add('active');
        }
    });

    currentSlideIndex = index;

    // Protokoll-UI aktualisieren (falls vorhanden)
    if (typeof updateProtocolUI === 'function') {
        updateProtocolUI(currentSlideIndex);
    }
    
    // Slide-Counter Update (falls vorhanden)
    const counter = document.getElementById('slide-counter');
    if (counter) {
        counter.innerText = `${currentSlideIndex + 1} / ${allSlides.length}`;
    }
}

function nextSlide() {
    if (currentSlideIndex < allSlides.length - 1) {
        showSlide(currentSlideIndex + 1);
    }
}

function prevSlide() {
    if (currentSlideIndex > 0) {
        showSlide(currentSlideIndex - 1);
    }
}

function toggleFullScreen() {
    if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen();
    } else if (document.exitFullscreen) {
        document.exitFullscreen();
    }
}

// Initialisierung beim Laden
document.addEventListener('DOMContentLoaded', initAppEngine);