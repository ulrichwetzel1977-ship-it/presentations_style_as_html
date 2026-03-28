# Blueprint: Protocol & Memo Component

Dieses Modul stellt die Infrastruktur bereit, um während einer Präsentation pro Folie Notizen zu erfassen und diese dauerhaft zu sichern.

## 1. UI-Struktur (HTML-Anforderungen)
Die KI muss sicherstellen, dass folgende Elemente in der `index.html` oder der generierten Standalone-Datei vorhanden sind:

### A. Das Eingabefeld
- Ein Container (idealerweise fixiert oder in einer Sidebar), der ein `textarea`-Element enthält.
- **Pflicht-ID:** `protocolInput`
- **Attribute:** `placeholder="Notizen zu dieser Folie..."`

### B. Die Steuerungselemente
- Ein Button für den **Export**: Muss die Funktion `ProtocolModule.exportJSON()` aufrufen.
- Ein versteckter File-Input für den **Import**:
  - `<input type="file" id="importFile" style="display:none" onchange="ProtocolModule.importJSON(event)">`
- Ein Button für den **Import-Trigger**: Muss den Klick auf das versteckte Input-Feld auslösen.

## 2. Visuelles Design (CSS-Vorgaben)
Das Interface soll sich nahtlos in das gewählte Theme (Apple oder Datagroup) einfügen:

- **Positionierung:** Fixiert am unteren rechten Rand (`bottom: 80px; right: 20px;`).
- **Container:** Nutze die Klasse `.glass-card` (aus base.css) für den Hintergrund.
- **Textarea:** - Hintergrund: Leicht transparent oder weiß.
  - Rand: Subtile 1px Linie (`rgba(0,0,0,0.1)`).
  - Fokus: Akzentfarbe des Themes als Border-Color.
- **Buttons:** Kompakte Darstellung unterhalb der Textarea.

## 3. Funktionale Logik (Integration)
- Das Modul muss erkennen, welche Engine (Reveal.js oder App-Style) aktiv ist.
- Bei jedem Folienwechsel muss die UI automatisch aktualisiert werden, um den Text der neuen Folie anzuzeigen.
- Das Modul nutzt den `localStorage` für ein automatisches Echtzeit-Backup während der Eingabe.

## 4. Beispiel-Snippet für die KI
Wenn dieses Modul aktiviert ist, baue das Interface wie folgt ein:
```html
<aside class="protocol-area glass-card">
    <label class="input-label">Protokoll / Notizen</label>
    <textarea id="protocolInput"></textarea>