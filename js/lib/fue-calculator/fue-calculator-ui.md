# Blueprint: FUE-Calculator UI

## Komponenten-Vorgabe
- **KPI-Karten:** 4-spaltiges Grid (On-Prem TCO, RISE TCO, Net Value, ROI).
- **Layout:** Links Parameter-Eingabe (FUE, Preise, Capex), Mitte TCO-Chart, Rechts ROI-Faktoren-Liste.
- **Charts:** Nutze Chart.js für die kumulierten Cashflow-Linien.
- **Interaktion:** Alle Inputs triggern `FUECalculator.getComparison()` und aktualisieren die DOM-Elemente sofort.

## CSS-Vorgaben (Apple Style)
- Nutze `.glass-card` für alle Container.
- Nutze `.btn-apple` für Aktions-Buttons.
- Die Savings-Badge (Prozentuale Ersparnis) muss oben rechts auf der RISE-TCO Karte kleben.

## Daten-Mapping
- FUE-Ratios: Advanced (1:1), Core (1:5), Basic (1:30).
- WACC-Eingabe oben rechts im Header-Bereich der Folie.