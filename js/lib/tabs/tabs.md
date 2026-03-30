# Blueprint: Tabbed Slides & Badges (Component: Tabs)

Dieses Modul wird für Folien verwendet, die Inhalte (insbesondere Tabellen oder Matrizen wie RACI) in umschaltbaren Reitern (Tabs) organisieren.

## 1. Einbindung
- Das Modul wird geladen, indem `js/lib/tabs/tabs.js` in das HTML-Dokument eingebunden wird.
- Das CSS (`tabs.css`) lädt sich über das Skript automatisch selbst.

## 2. Folien-Struktur (HTML Vorgaben)
- Die Slide MUSS die Modifier-Klasse `.slide-tabs` haben.
- Der interaktive Bereich benötigt eine eindeutige ID (z.B. `<div id="my-tab-container">`).

## 3. Farben und Badges
Verwende niemals Inline-Colors (z.B. kein style="background: red"). Nutze ausschließlich die Badge-Klassen, da diese an das globale Theme-System angebunden sind.
    - <span class="badge badge-success">Standard</span> (Grünlich)
    - <span class="badge badge-warning">Optional</span> (GELBLICH)
    - <span class="badge badge-danger">Excluded</span> (Rötlich)
    - <span class="badge badge-info">Geteilt</span> (Primärfarbe des Themes, z.B. Apple-Blau oder Datagroup-Rot)

### Der Tab-Header (Reiter)
```html
<div class="tabs-header">
  <button class="tab-btn active" onclick="TabsModule.switchTab('my-tab-container', 'panel-1', this)">Tab 1</button>
  <button class="tab-btn" onclick="TabsModule.switchTab('my-tab-container', 'panel-2', this)">Tab 2</button>
</div>