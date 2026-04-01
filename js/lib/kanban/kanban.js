/**
 * MODULE: STATE-DRIVEN KANBAN BOARD
 * Erlaubt das Verwalten von Buckets und Karten inkl. Farben, Editoren und Drag&Drop.
 */
const KanbanModule = {
    // Zentraler State für das Board. 
    // Struktur: { "board-1": [ { id, title, color, cards: [ {id, text, color} ] } ] }
    boards: {},
    
    // Hilfsvariablen für aktuell geöffnetes Modal
    currentBoardId: null,
    currentColId: null,
    currentCardId: null,

    init: function() {
        // Standard-State laden, falls vorhanden (z.B. aus JSON Import)
        // ansonsten leeres Board initialisieren
        console.log("KanbanModule initialisiert.");
    },

    /**
     * Rendert das gesamte Board basierend auf dem State neu
     */
    renderBoard: function(boardId) {
        const boardEl = document.getElementById(boardId);
        if (!boardEl) return;
        
        boardEl.innerHTML = '';
        const columns = this.boards[boardId] || [];

        columns.forEach(col => {
            const colEl = document.createElement('div');
            colEl.className = 'kanban-col';
            colEl.id = col.id;

            // Spalten-Header (Bucket)
            const headerEl = document.createElement('div');
            headerEl.className = 'kanban-col-header';
            headerEl.style.backgroundColor = col.color || 'var(--primary)';
            
            headerEl.innerHTML = `
                <span>${col.title}</span>
                <div class="kanban-col-header-actions">
                    <button class="kanban-icon-btn" onclick="KanbanModule.openCardModal('${boardId}', '${col.id}', null)" title="Karte hinzufügen">+</button>
                    <button class="kanban-icon-btn" onclick="KanbanModule.openBucketModal('${col.id}', '${boardId}')" title="Bucket bearbeiten">✎</button>
                </div>
            `;
            colEl.appendChild(headerEl);

            // Container für Karten
            const cardsContainer = document.createElement('div');
            cardsContainer.className = 'kanban-cards-container';
            cardsContainer.id = `cards-${col.id}`;

            // Drag & Drop Events für die Spalte
            cardsContainer.addEventListener('dragover', (e) => { e.preventDefault(); colEl.classList.add('drag-over'); });
            cardsContainer.addEventListener('dragleave', () => colEl.classList.remove('drag-over'));
            cardsContainer.addEventListener('drop', (e) => this.handleDrop(e, boardId, col.id));

            // Karten rendern
            col.cards.forEach(card => {
                const cardEl = document.createElement('div');
                cardEl.className = 'kanban-card';
                cardEl.id = card.id;
                cardEl.draggable = true;
                cardEl.style.backgroundColor = card.color || '#ffffff';
                // Leichte Borderanpassung falls Karte dunkel ist
                if(card.color && card.color !== '#ffffff') cardEl.style.borderLeftColor = card.color;
                
                cardEl.innerHTML = `
                    <div class="kanban-card-content">${card.text}</div>
                    <button class="kanban-card-edit-btn" onclick="KanbanModule.openCardModal('${boardId}', '${col.id}', '${card.id}')">✎</button>
                `;

                // Drag & Drop Events für die Karte
                cardEl.addEventListener('dragstart', (e) => this.handleDragStart(e, boardId, col.id, card.id));
                cardEl.addEventListener('dragend', () => cardEl.style.opacity = '1');

                cardsContainer.appendChild(cardEl);
            });

            colEl.appendChild(cardsContainer);
            boardEl.appendChild(colEl);
        });
    },

    // ======================================================================
    // BUCKET MODAL (SPALTEN)
    // ======================================================================
    openBucketModal: function(colId, boardId) {
        this.currentBoardId = boardId;
        this.currentColId = colId;
        
        // Initialisiere Board State falls noch nicht vorhanden
        if(!this.boards[boardId]) this.boards[boardId] = [];

        const titleEl = document.getElementById('kb-modal-title');
        const nameInput = document.getElementById('kb-bucket-name');
        const colorInput = document.getElementById('kb-bucket-color');
        const delBtn = document.getElementById('kb-btn-del-bucket');

        if (colId) {
            // Bearbeitungsmodus
            const col = this.boards[boardId].find(c => c.id === colId);
            titleEl.innerText = "Bucket bearbeiten";
            nameInput.value = col.title;
            colorInput.value = col.color || '#E3000F';
            delBtn.style.display = "block";
        } else {
            // Neuanlage
            titleEl.innerText = "Neues Bucket anlegen";
            nameInput.value = "Neue Spalte";
            colorInput.value = '#444444';
            delBtn.style.display = "none";
        }

        document.getElementById('kanbanBucketModal').classList.add('open');
    },

    saveBucket: function() {
        const name = document.getElementById('kb-bucket-name').value.trim();
        const color = document.getElementById('kb-bucket-color').value;
        if (!name) return alert("Bitte einen Namen vergeben.");

        if (this.currentColId) {
            // Update
            const col = this.boards[this.currentBoardId].find(c => c.id === this.currentColId);
            col.title = name;
            col.color = color;
        } else {
            // Neu
            const newCol = {
                id: 'col-' + Date.now(),
                title: name,
                color: color,
                cards: []
            };
            this.boards[this.currentBoardId].push(newCol);
        }

        this.closeModals();
        this.renderBoard(this.currentBoardId);
        this.saveState();
    },

    deleteCurrentBucket: function() {
        if (!confirm("Soll dieses Bucket samt aller Karten wirklich gelöscht werden?")) return;
        
        this.boards[this.currentBoardId] = this.boards[this.currentBoardId].filter(c => c.id !== this.currentColId);
        this.closeModals();
        this.renderBoard(this.currentBoardId);
        this.saveState();
    },

    // ======================================================================
    // CARD MODAL (KARTEN & LANGTEXT)
    // ======================================================================
    openCardModal: function(boardId, colId, cardId) {
        this.currentBoardId = boardId;
        this.currentColId = colId;
        this.currentCardId = cardId;

        const titleEl = document.getElementById('kc-modal-title');
        const contentEditor = document.getElementById('kc-card-content');
        const colorInput = document.getElementById('kc-card-color');
        const delBtn = document.getElementById('kc-btn-del-card');

        if (cardId) {
            // Bearbeiten
            const col = this.boards[boardId].find(c => c.id === colId);
            const card = col.cards.find(c => c.id === cardId);
            titleEl.innerText = "Karte bearbeiten";
            contentEditor.innerHTML = card.text; // Erhält Zeilenumbrüche etc.
            colorInput.value = card.color || '#ffffff';
            delBtn.style.display = "block";
        } else {
            // Neu
            titleEl.innerText = "Neue Karte anlegen";
            contentEditor.innerHTML = "";
            colorInput.value = '#ffffff';
            delBtn.style.display = "none";
        }

        document.getElementById('kanbanCardModal').classList.add('open');
        contentEditor.focus();
    },

    saveCard: function() {
        const content = document.getElementById('kc-card-content').innerHTML; // HTML für Formatierungen/Umbrüche
        const color = document.getElementById('kc-card-color').value;
        if (!content.trim()) return alert("Die Karte darf nicht leer sein.");

        const col = this.boards[this.currentBoardId].find(c => c.id === this.currentColId);

        if (this.currentCardId) {
            // Update
            const card = col.cards.find(c => c.id === this.currentCardId);
            card.text = content;
            card.color = color;
        } else {
            // Neu
            const newCard = {
                id: 'card-' + Date.now(),
                text: content,
                color: color
            };
            col.cards.push(newCard);
        }

        this.closeModals();
        this.renderBoard(this.currentBoardId);
        this.saveState();
    },

    deleteCurrentCard: function() {
        if (!confirm("Soll diese Karte wirklich gelöscht werden?")) return;

        const col = this.boards[this.currentBoardId].find(c => c.id === this.currentColId);
        col.cards = col.cards.filter(c => c.id !== this.currentCardId);
        
        this.closeModals();
        this.renderBoard(this.currentBoardId);
        this.saveState();
    },

    closeModals: function() {
        document.getElementById('kanbanBucketModal').classList.remove('open');
        document.getElementById('kanbanCardModal').classList.remove('open');
    },

    // ======================================================================
    // DRAG AND DROP
    // ======================================================================
    handleDragStart: function(e, boardId, colId, cardId) {
        e.dataTransfer.setData("text/plain", JSON.stringify({ boardId, colId, cardId }));
        e.target.style.opacity = '0.5';
    },

    handleDrop: function(e, targetBoardId, targetColId) {
        e.preventDefault();
        
        // Optisches Feedback zurücksetzen
        document.querySelectorAll('.kanban-col').forEach(c => c.classList.remove('drag-over'));

        try {
            const data = JSON.parse(e.dataTransfer.getData("text/plain"));
            const sourceCol = this.boards[data.boardId].find(c => c.id === data.colId);
            const targetCol = this.boards[targetBoardId].find(c => c.id === targetColId);

            // Karte aus alter Spalte entfernen
            const cardIndex = sourceCol.cards.findIndex(c => c.id === data.cardId);
            if (cardIndex > -1) {
                const [card] = sourceCol.cards.splice(cardIndex, 1);
                // Karte in neue Spalte einfügen
                targetCol.cards.push(card);
            }

            this.renderBoard(targetBoardId);
            this.saveState();
        } catch (err) {
            console.error("Drag & Drop Fehler", err);
        }
    },

    // ======================================================================
    // STATE PERSISTENZ
    // ======================================================================
    saveState: function() {
        // Diese Funktion wird aufgerufen, wann immer sich das Board ändert.
        // Falls du eine globale Export-Funktion nutzt (z.B. im ProtocolModule),
        // kannst du hier den Status in eine globale Variable übergeben.
        if (window.ProtocolModule) {
            window.ProtocolModule.boardStates = this.boards;
        }
    }
};

// Beispiel-Aufruf, der vom Slide-Setup aufgerufen werden kann:
/*
KanbanModule.boards['board-1'] = [
    { id: 'col-1', title: 'Offen', color: '#444444', cards: [{id: 'c1', text: 'TCO Analyse', color:'#ffffff'}] },
    { id: 'col-2', title: 'Entscheidung', color: '#008a00', cards: [] }
];
KanbanModule.renderBoard('board-1');
*/