/**
 * MODULE: TABS (js/lib/tabs/tabs.js)
 * Steuert das Umschalten von Reitern und lädt das zugehörige CSS automatisch.
 */
const TabsModule = {
    init: function() {
        this.loadCSS();
        console.log("Tabs-Modul initialisiert.");
    },

    /**
     * Lädt die tabs.css dynamisch in den <head>, falls noch nicht vorhanden.
     */
    loadCSS: function() {
        if (!document.getElementById('css-tabs-module')) {
            const link = document.createElement('link');
            link.id = 'css-tabs-module';
            link.rel = 'stylesheet';
            // WICHTIG: Pfad anpassen, falls deine Ordnerstruktur abweicht
            link.href = 'js/lib/tabs/tabs.css'; 
            document.head.appendChild(link);
        }
    },

    /**
     * Schaltet zwischen Tabs um.
     */
    switchTab: function(containerId, panelId, btnElement) {
        const container = document.getElementById(containerId);
        if (!container) return;

        // Alle Buttons deaktivieren
        const buttons = container.querySelectorAll('.tab-btn');
        buttons.forEach(btn => btn.classList.remove('active'));

        // Alle Panels ausblenden
        const panels = container.querySelectorAll('.tab-panel');
        panels.forEach(panel => panel.classList.remove('active'));

        // Geklickten Button und Ziel-Panel aktivieren
        btnElement.classList.add('active');
        const targetPanel = container.querySelector('#' + panelId);
        if (targetPanel) {
            targetPanel.classList.add('active');
        }
    }
};

// Startet das Modul automatisch
document.addEventListener('DOMContentLoaded', () => TabsModule.init());