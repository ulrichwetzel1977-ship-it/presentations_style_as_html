/**
 * LIBRARY MODULE: PROTOCOL & DATA PERSISTENCE
 * Verwaltet Notizen pro Folie und den JSON-Export/Import.
 */

const ProtocolModule = {
    // Zentraler Datenspeicher
    data: {
        metadata: {
            title: document.title,
            date: new Date().toLocaleString(),
            engine: "unknown"
        },
        slides: {} // Key: Slide-Index, Value: Notiz-Text
    },

    /**
     * Initialisiert das Modul und lädt ggf. vorhandene Daten aus dem LocalStorage
     */
    init: function() {
        const saved = localStorage.getItem('presentation_session');
        if (saved) {
            this.data = JSON.parse(saved);
            console.log("Protokoll: Altes Backup geladen.");
        }
        
        // Event-Listener für das automatische Speichern beim Tippen
        document.addEventListener('input', (e) => {
            if (e.target.id === 'protocolInput') {
                this.saveCurrentNote(e.target.value);
            }
        });
    },

    /**
     * Ermittelt den aktuellen Index, egal welche Engine läuft
     */
    getCurrentIndex: function() {
        if (window.Reveal && Reveal.isReady()) {
            this.data.metadata.engine = "reveal";
            return Reveal.getIndices().h;
        } else if (typeof currentSlideIndex !== 'undefined') {
            this.data.metadata.engine = "app-style";
            return currentSlideIndex;
        }
        return 0;
    },

    /**
     * Wird von den Engines aufgerufen, wenn die Folie wechselt
     */
    updateUI: function() {
        const index = this.getCurrentIndex();
        const textarea = document.getElementById('protocolInput');
        if (textarea) {
            textarea.value = this.data.slides[index] || "";
        }
    },

    /**
     * Speichert den Text für die aktuelle Folie
     */
    saveCurrentNote: function(text) {
        const index = this.getCurrentIndex();
        this.data.slides[index] = text;
        
        // Auto-Save im Browser-Cache
        localStorage.setItem('presentation_session', JSON.stringify(this.data));
    },

    /**
     * Exportiert das gesamte Protokoll als JSON-Datei
     */
    exportJSON: function() {
        this.data.metadata.date = new Date().toLocaleString();
        const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(this.data, null, 2));
        const downloadAnchor = document.createElement('a');
        downloadAnchor.setAttribute("href", dataStr);
        downloadAnchor.setAttribute("download", `protokoll_${this.data.metadata.title.replace(/\s+/g, '_')}.json`);
        document.body.appendChild(downloadAnchor);
        downloadAnchor.click();
        downloadAnchor.remove();
    },

    /**
     * Importiert Daten aus einer JSON-Datei
     */
    importJSON: function(event) {
        const file = event.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (e) => {
            try {
                this.data = JSON.parse(e.target.result);
                this.updateUI();
                alert("Protokoll erfolgreich importiert!");
            } catch (err) {
                alert("Fehler beim Lesen der JSON-Datei.");
            }
        };
        reader.readAsText(file);
    }
};

// Globaler Aufruf für die Engines
window.updateProtocolUI = (index) => ProtocolModule.updateUI();

// Initialisierung
document.addEventListener('DOMContentLoaded', () => ProtocolModule.init());