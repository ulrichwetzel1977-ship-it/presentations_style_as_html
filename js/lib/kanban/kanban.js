/**
 * MODULE: KANBAN & CARD SORTING
 * Erlaubt interaktives Aufgaben-Management mit Drag & Drop.
 */

const KanbanModule = {
    // Initialisierung der Drag-Events
    init: function() {
        console.log("Kanban-Modul initialisiert.");
        this.setupDragAndDrop();
    },

    /**
     * Erstellt eine neue Karte in einer spezifischen Spalte
     */
    addCard: function(columnId) {
        const text = prompt("Inhalt der Karte:");
        if (!text) return;

        const column = document.getElementById(columnId);
        if (!column) return;

        const cardId = 'card-' + Date.now();
        const card = this.createCardElement(text, cardId);
        column.appendChild(card);
        
        this.saveState();
    },

    /**
     * Erzeugt das HTML-Element für eine Karte
     */
    createCardElement: function(text, id) {
        const card = document.createElement('div');
        card.className = 'kanban-card glass-card';
        card.id = id;
        card.draggable = true;
        card.innerHTML = `
            <div class="card-content" contenteditable="true">${text}</div>
            <button class="card-delete" onclick="this.parentElement.remove(); KanbanModule.saveState();">✕</button>
        `;

        card.addEventListener('dragstart', (e) => {
            e.dataTransfer.setData('text/plain', card.id);
            card.classList.add('dragging');
        });

        card.addEventListener('dragend', () => {
            card.classList.remove('dragging');
            this.saveState();
        });

        return card;
    },

    /**
     * Aktiviert die Drop-Zonen für die Spalten
     */
    setupDragAndDrop: function() {
        const columns = document.querySelectorAll('.kanban-col');
        
        columns.forEach(col => {
            col.addEventListener('dragover', (e) => {
                e.preventDefault();
                col.classList.add('drag-over');
            });

            col.addEventListener('dragleave', () => {
                col.classList.remove('drag-over');
            });

            col.addEventListener('drop', (e) => {
                e.preventDefault();
                col.classList.remove('drag-over');
                const cardId = e.dataTransfer.getData('text/plain');
                const card = document.getElementById(cardId);
                if (card) {
                    col.appendChild(card);
                    this.saveState();
                }
            });
        });
    },

    /**
     * Speichert den aktuellen Zustand des Boards im globalen Session-Objekt
     */
    saveState: function() {
        const boardState = {};
        document.querySelectorAll('.kanban-col').forEach(col => {
            const cards = Array.from(col.querySelectorAll('.card-content'))
                               .map(c => c.innerText);
            boardState[col.id] = cards;
        });

        // Integration in das globale Protokoll-System
        if (window.ProtocolModule) {
            const currentIndex = ProtocolModule.getCurrentIndex();
            ProtocolModule.data.slides[currentIndex + "_kanban"] = boardState;
        }
    }
};

// Start des Moduls
document.addEventListener('DOMContentLoaded', () => KanbanModule.init());