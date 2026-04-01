/**
 * MODULE: TITEL & SETTINGS
 * Verwaltung der Präsentationsdaten und Synchronisation der Claims.
 */
const TitelModule = {
    
    init: function() {
        // Initiale Daten aus dem HTML in die Input-Felder laden
        document.getElementById('inp-title').value = document.getElementById('cover-title').textContent;
        document.getElementById('inp-customer').value = document.getElementById('cover-customer').textContent;
        document.getElementById('inp-date').value = document.getElementById('cover-date').textContent;
        document.getElementById('inp-presenter').value = document.getElementById('cover-presenter').textContent;
        
        // Initialen Claim setzen
        this.updateGlobalClaims(document.getElementById('inp-customer').value);
    },

    openSettings: function() {
        document.getElementById('titelSettingsModal').classList.add('open');
    },

    closeSettings: function() {
        document.getElementById('titelSettingsModal').classList.remove('open');
    },

    applySettings: function() {
        const title = document.getElementById('inp-title').value;
        const customer = document.getElementById('inp-customer').value;
        const date = document.getElementById('inp-date').value;
        const presenter = document.getElementById('inp-presenter').value;

        // UI auf der Titelfolie aktualisieren
        document.getElementById('cover-title').textContent = title;
        document.getElementById('cover-customer').textContent = customer;
        document.getElementById('cover-date').textContent = date;
        document.getElementById('cover-presenter').textContent = presenter;
        
        // Browsertitel aktualisieren
        document.title = title;

        // Globalen Claim auf allen Folien synchronisieren
        this.updateGlobalClaims(customer);

        this.closeSettings();
        
        // Optional: Status für JSON-Export sichern
        if (window.exportJSON) {
            console.log("Settings angewendet.");
        }
    },

    /**
     * Aktualisiert den Claim-Text im Branding-Bereich aller Slides
     */
    updateGlobalClaims: function(customerName) {
        const claims = document.querySelectorAll('.branding-claim');
        claims.forEach(el => {
            el.innerHTML = `SAP Transformation | ${customerName}`;
        });
    }
};

// Initialisierung
document.addEventListener('DOMContentLoaded', () => TitelModule.init());