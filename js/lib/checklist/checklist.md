# Blueprint: Interactive Checklist

## 1. Visuelles Design
- **Item:** Flex-Container mit Hover-Effekt (Hintergrundwechsel zu `--surface2`).
- **Check-Icon:** - Kreis rund (`border-radius: 50%`), 20x20px.
  - Rand: 2px solid `--border`.
  - Wenn aktiv: Background `--success` (Grün), Häkchen (✓) in Weiß.
- **Text:** - Haupttext: Fett oder Normal.
  - Subtext: Kleinere Schrift in `--text-secondary`.

## 2. HTML-Struktur
```html
<ul class="checklist">
  <li class="checklist-item" onclick="ChecklistModule.toggle(this)">
    <div class="checklist-check">✓</div>
    <div class="checklist-content">
      <div class="checklist-text">Aufgaben-Titel</div>
      <div class="checklist-subtext">Zusatz-Info</div>
    </div>
  </li>
</ul>