# Blueprint: Kanban & Card-Sorting UI

## 1. UI-Struktur (HTML)
Für ein funktionsfähiges Board muss die KI ein Grid mit Spalten erstellen.

### Container-Struktur:
- **Board:** `<div class="kanban-board">` (Flexbox oder Grid)
- **Spalte:** `<div class="kanban-col" id="col-todo">`
  - Jede Spalte benötigt eine Überschrift (`h4`) und einen "Add"-Button.
  - Der Button muss `KanbanModule.addCard('col-todo')` aufrufen.

## 2. Visuelles Design (CSS)
Das Design muss dem "App-Style" aus der SAP-Vorlage folgen:

- **Board:** `display: flex; gap: 20px; align-items: flex-start;`
- **Spalten:**
  - Hintergrund: `var(--surface2)` (Hellgrau) oder transparent mit Border.
  - Border-Radius: `14px`.
  - Min-Height: `300px`.
  - Padding: `15px`.
- **Karten:**
  - Nutze die Klasse `.glass-card`.
  - Box-Shadow: Subtil, beim Dragging verstärken.
  - Schriftgröße: Etwas kleiner (`14px`) für kompakte Darstellung.
- **Interaktive Effekte:**
  - `.drag-over`: Die Spalte sollte sich leicht verfärben (z. B. `background: var(--accent-soft)`), wenn eine Karte darüber gehalten wird.

## 3. Standard-Konfiguration
Wenn nicht anders verlangt, erstelle immer 3 Spalten:
1. **Backlog** (id: `col-backlog`)
2. **In Arbeit** (id: `col-progress`)
3. **Erledigt** (id: `col-done`)

## 4. Beispiel für die KI:
```html
<div class="kanban-board">
    <div class="kanban-col" id="col-todo">
        <div class="flex justify-between">
            <h4>To Do</h4>
            <button onclick="KanbanModule.addCard('col-todo')">+</button>
        </div>
        </div>
    </div>