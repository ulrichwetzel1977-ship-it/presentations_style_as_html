# Blueprint: Advanced FUE & TCO Analyzer UI

## 1. UI-Struktur (3-Spalten-Layout)
Erstelle einen Container `.fue-analyzer-grid` mit CSS Grid: `grid-template-columns: 1fr 1.2fr 1fr;`.

### Spalte 1: Inputs (Parameters)
- **Gruppe A (FUE):** Inputs für Advanced, Core, Self-Service, Developer.
- **Gruppe B (Kosten):** Capex (Hw-Refresh vs. Migration), Opex (Laufende Kosten On-Prem).
- **Gruppe C (Finanzen):** WACC %, Rabatt %, Vertragslaufzeit.

### Spalte 2: Visualisierung (The "Case")
- **KPI-Header:** Cards für TCO On-Premise, TCO RISE (mit %-Vorteil Badge) und ROI.
- **Chart:** Ein `<canvas id="tcoChart">` für den kumulierten Cashflow-Vergleich.
- **T-Shirt Table:** Eine kompakte Tabelle der SAP-Größen (XXS bis L), die aktive Zeile hervorheben.

### Spalte 3: Business Value (ROI Faktoren)
- Eine Liste editierbarer ROI-Treiber (Name + €-Wert/Jahr).
- Button "Nutzen-Faktor hinzufügen".
- Anzeige der Jahressumme der Mehrwerte.

## 2. Visuelles Design (Extended Class)
- Nutze die Klasse `.glass-card` für alle Sektionen.
- **Hervorhebung:** Die RISE TCO Card erhält einen blauen Rand (`border: 2px solid var(--accent)`).
- **Active Tier:** Die Zeile der T-Shirt-Größe erhält `.active-tier` (Hintergrund: `var(--accent-soft)`, Text: fett).

## 3. Integration & Abhängigkeiten
- Die KI muss Chart.js einbinden: `https://cdn.jsdelivr.net/npm/chart.js`.
- Alle Berechnungen müssen live via `FueTcoModule.calculateAll()` getriggert werden.