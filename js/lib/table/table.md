# AI Implementation Guide: HTML Presentation Framework

Dieser Guide definiert die Architektur und die strikten Programmierrichtlinien für das HTML-Präsentations-Framework. **Lies diese Anweisungen sorgfältig, bevor du HTML, CSS oder JavaScript für dieses Projekt generierst oder änderst.**

## 1. Core Philosophy: Trennung von Layout, Design und Logik
Das Framework basiert auf einer strikten Trennung der Zuständigkeiten:
1. **HTML:** Beinhaltet nur die Struktur und Daten-Attribute. Keine Inline-Styles (außer für dynamische Berechnungen).
2. **`layout.css`:** Definiert *ausschließlich* das strukturelle Layout (Grid, Flexbox, Abstände, Positionierung). Hier werden **keine** festen Farben, Pixel-Radien oder festen Schatten definiert. Alles greift auf CSS-Variablen (`var(--...)`) zu.
3. **`theme-*.css` (z.B. `theme-apple.css`, `theme-datagroup.css`):** Enthalten *ausschließlich* das `:root`-Element mit der Zuweisung der CSS-Variablen. Keine strukturellen CSS-Regeln!
4. **JavaScript (`*.js`):** Ist strikt modular aufgebaut (z.B. `KanbanModule`, `TableModule`). Das JS steuert Logik und speichert Daten (Data-Binding), verändert aber niemals direkt das Design. Interaktionen werden durch das Hinzufügen/Entfernen von CSS-Klassen (z.B. `.active`, `.checked`, `.dragging`) gesteuert.

---

## 2. CSS Guidelines (STRIKT!)

### Regel 1: Erstellen neuer Folien-Typen (Templates)
Wenn ein neues Folien-Layout benötigt wird (z. B. für Diagramme, Galerien oder spezielle Formulare):
* Erstelle in der `layout.css` einen neuen Namespace-Block (Modifier-Klasse), z.B. `.slide-chart`.
* Alle kindlichen Elemente müssen unter diesem Namespace gestylt werden (z.B. `.slide-chart .chart-container`).
* **Verwende IMMER die globalen CSS-Variablen für Farben und Formen:**
  * Hintergründe: `var(--bg-color)`, `var(--surface)`, `var(--primary-soft)`
  * Text: `var(--text)`, `var(--text-secondary)`, `var(--header-text)`
  * Akzente: `var(--primary)`, `var(--danger)`, `var(--warning)`, `var(--success)`
  * Ränder & Effekte: `var(--border)`, `var(--radius)`, `var(--radius-sm)`, `var(--shadow)`

### Regel 2: Neue Themes erstellen
* Ein neues Theme besteht nur aus einer Datei (z.B. `theme-neon.css`).
* Es darf nur das `:root` Element enthalten.
* Es müssen alle Standard-Variablen definiert werden (siehe bestehende Themes als Vorlage).

---

## 3. HTML Boilerplate für neue Slides

Jede neue Folie MUSS diese exakte Grundstruktur aufweisen, damit das Full-Screen-Layout und das Scrolling funktionieren:

```html
<div class="slide slide-DEINTYP" data-slide="[ID]" data-title="[TITEL]">
  
  <div class="slide-header">
    <div>
      <div class="slide-module-tag">Modul X · Thema</div>
      <div class="slide-title">Titel der Folie</div>
    </div>
    </div>
  
  <div class="slide-body">
    </div>
  
</div>