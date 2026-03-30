/**
 * MODULE: INTERACTIVE TABLES
 * Steuert dynamische Eingabetabellen wie die Make-or-Buy Matrix.
 */
const TableModule = {
    rowCounter: 100, // Verhindert ID-Kollisionen bei neuen Zeilen

    init: function() {
        console.log("Table-Modul initialisiert.");
        
        // Event-Delegation: Wir lauschen global auf Änderungen in der Tabelle,
        // anstatt jedem Feld einzeln einen Listener zu geben.
        document.addEventListener('change', (e) => {
            // Wenn sich Skill oder Strategie ändert -> Auto-Logik ausführen
            if (e.target.classList.contains('matrix-skill') || e.target.classList.contains('matrix-strat')) {
                this.autoDecide(e.target);
                this.save();
            }
            // Wenn direkt eine Entscheidung gewählt oder Text getippt wird -> Speichern
            if (e.target.classList.contains('matrix-decision') || e.target.tagName === 'INPUT') {
                this.save();
            }
        });
    },

    /**
     * Fügt eine neue, leere Zeile am Ende der Tabelle hinzu
     */
    addRow: function(tbodyId) {
        const tbody = document.getElementById(tbodyId);
        if (!tbody) return;

        const tr = document.createElement('tr');
        tr.className = 'matrix-row';
        tr.dataset.id = this.rowCounter++;
        
        // Baut exakt das HTML auf, das von deiner layout.css formatiert wird
        tr.innerHTML = `
            <td><input type="text" placeholder="Neue Aufgabe eingeben..." class="table-input"></td>
            <td style="text-align: center;">
                <select class="matrix-skill table-select">
                    <option value="">–</option>
                    <option value="ja">✅ Ja</option>
                    <option value="nein">❌ Nein</option>
                    <option value="teilweise">⚡ Teilw.</option>
                </select>
            </td>
            <td style="text-align: center;">
                <select class="matrix-strat table-select">
                    <option value="">–</option>
                    <option value="hoch">🔴 Hoch</option>
                    <option value="mittel">🟡 Mittel</option>
                    <option value="niedrig">🟢 Niedrig</option>
                </select>
            </td>
            <td style="text-align: center;">
                <select class="matrix-decision table-select" style="font-weight: 600;">
                    <option value="">–</option>
                    <option value="make">🏠 Make</option>
                    <option value="buy">🛒 Buy</option>
                    <option value="hybrid">🔀 Hybrid</option>
                </select>
            </td>
            <td><input type="text" placeholder="Notiz..." class="table-input text-secondary"></td>
            <td style="text-align: center;">
                <button class="btn-delete-row" onclick="TableModule.deleteRow(this)" title="Zeile löschen">✕</button>
            </td>
        `;
        
        tbody.appendChild(tr);
        this.save();
    },

    /**
     * Löscht eine bestehende Zeile
     */
    deleteRow: function(button) {
        const row = button.closest('tr'); // Sucht die übergeordnete Tabellenzeile
        if (row) {
            row.remove();
            this.save();
        }
    },

    /**
     * Die Entscheidungslogik: Füllt das Feld "Entscheidung" automatisch aus
     */
    autoDecide: function(selectElement) {
        const row = selectElement.closest('tr');
        if (!row) return;

        const skill = row.querySelector('.matrix-skill').value;
        const strat = row.querySelector('.matrix-strat').value;
        const decision = row.querySelector('.matrix-decision');

        if (!skill || !strat) return;

        // Die Business-Logik (Angelehnt an dein Referenz-Dokument)
        if (skill === 'ja') decision.value = 'make';
        else if (skill === 'nein' && strat === 'niedrig') decision.value = 'buy';
        else if (skill === 'nein') decision.value = 'make'; // Aufbauen
        else if (skill === 'teilweise') decision.value = 'hybrid';
    },

    /**
     * Sammelt alle Daten und schiebt sie ins Protokoll
     */
    save: function() {
        const rows = document.querySelectorAll('.matrix-row');
        const data = Array.from(rows).map(row => {
            const inputs = row.querySelectorAll('input');
            return {
                task: inputs[0]?.value || '',
                skill: row.querySelector('.matrix-skill')?.value || '',
                strat: row.querySelector('.matrix-strat')?.value || '',
                decision: row.querySelector('.matrix-decision')?.value || '',
                note: inputs[1]?.value || ''
            };
        }).filter(item => item.task.trim() !== ''); // Leere Zeilen ignorieren

        // Ins zentrale System speichern
        if (window.ProtocolModule) {
            const idx = ProtocolModule.getCurrentIndex();
            ProtocolModule.data.slides[idx + "_matrix"] = data;
        }
    }
};

// Startet das Modul, sobald die Seite geladen ist
document.addEventListener('DOMContentLoaded', () => TableModule.init());