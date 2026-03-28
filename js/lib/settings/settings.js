/**
 * MODULE: SETTINGS & SESSION MANAGER
 * Verwaltet globale Metadaten (Kunde, Titel, Datum) und die dynamische Agenda.
 */

const SettingsModule = {
    state: {
        title: "Strategie-Workshop",
        customer: "Musterkunde SE",
        date: new Date().toLocaleDateString('de-DE'),
        agenda: [
            { time: '09:00', title: 'Begrüßung', desc: 'Intro & Ziele', isBreak: false },
            { time: '10:30', title: 'Kaffeepause', desc: '', isBreak: true }
        ]
    },

    init: function() {
        const saved = localStorage.getItem('global_session_settings');
        if (saved) {
            this.state = JSON.parse(saved);
        }
        this.applyToUI();
    },

    // Schreibt die Daten in alle HTML-Elemente mit entsprechenden IDs/Klassen
    applyToUI: function() {
        // Titel und Metadaten
        document.title = this.state.title;
        this.setInnerText('display-title', this.state.title);
        this.setInnerText('display-customer', this.state.customer);
        this.setInnerText('display-date', this.state.date);

        // Agenda-Folie aktualisieren
        this.renderAgenda();
    },

    setInnerText: function(id, value) {
        const el = document.getElementById(id);
        if (el) el.innerText = value;
    },

    renderAgenda: function() {
        const list = document.getElementById('display-agenda-list');
        if (!list) return;
        list.innerHTML = this.state.agenda.map(item => `
            <li class="agenda-item ${item.isBreak ? 'agenda-break' : ''}">
                <div class="agenda-time">${item.time}</div>
                <div class="agenda-content">
                    <div class="agenda-title">${item.title}</div>
                    ${item.desc ? `<div class="agenda-desc">${item.desc}</div>` : ''}
                </div>
            </li>
        `).join('');
    },

    // Speicher-Funktion für das Modal
    saveSettingsFromModal: function() {
        this.state.title = document.getElementById('set-title').value;
        this.state.customer = document.getElementById('set-customer').value;
        this.state.date = document.getElementById('set-date').value;
        
        // Agenda aus den dynamischen Zeilen auslesen (Logik analog zur SAP-Vorlage)
        // ... (Code zum Sammeln der Zeilen)

        localStorage.setItem('global_session_settings', JSON.stringify(this.state));
        this.applyToUI();
        this.closeModal();
    },

    /**
     * MASTER EXPORT: Kombiniert Settings + Protokoll
     */
    exportFullSession: function() {
        const fullData = {
            settings: this.state,
            protocol: window.ProtocolModule ? window.ProtocolModule.data : {}
        };
        const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(fullData, null, 2));
        const dl = document.createElement('a');
        dl.setAttribute("href", dataStr);
        dl.setAttribute("download", `Session_${this.state.customer}_${this.state.date}.json`);
        dl.click();
    }
};

document.addEventListener('DOMContentLoaded', () => SettingsModule.init());