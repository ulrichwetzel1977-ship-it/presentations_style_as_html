# Blueprint: Job-Profile (Theme-basierter Editor & PDF-Export)

## 1. UI-Struktur (Modal)
- **Header:** Keine harten Farben oder Verläufe! Nutze ausschließlich die globalen Theme-Variablen (z.B. `background: var(--header-bg); color: var(--header-text);`).
- **Body:** Nutze die Klasse `.job-pdf-view`. Das Layout wird zentral in der `layout.css` gesteuert.
- **Felder:** Nutze `.job-edit-field` (borderless Textareas). Diese wechseln bei `:focus` den Hintergrund auf `var(--primary-soft)`. Die Schriftfarbe ist `var(--text)`.

## 2. Inhalts-Sektionen
Die KI muss folgende 8 Sektionen in Tabellenform (`.job-pdf-table`) oder als Textblöcke generieren:
1. **Stammdaten:** Titel, Abteilung, Eingruppierung, Inhaber, Stand.
2. **Mission:** Übergeordnete Zielsetzung.
3. **Reporting:** Führungskraft, Unterstellte, Stellvertretung.
4. **Aufgaben:** Kernaufgaben (70-80%), Sonderaufgaben, Admin.
5. **Befugnisse:** Finanziell, Personell, Sachlich.
6. **Schnittstellen:** Intern & Extern.
7. **Anforderungsprofil:** Ausbildung, Erfahrung, Methoden, Skills, Sozialkompetenz.
8. **KPIs:** Quantitativ & Qualitativ.

## 3. Integration & Print-Logik
- **Button "PDF drucken" -> `JobModule.printPDF()`**
  *Wichtig:* Das Skript generiert kein eigenes HTML/CSS mehr. Es ruft lediglich `window.print()` auf. Die Darstellung für den PDF-Export (Ausblenden der UI, Formatierung als A4-Dokument) wird ausschließlich über die `@media print` Query in der `layout.css` in Kombination mit dem aktuell geladenen Theme (Apple, Datagroup, etc.) gesteuert!
- **Button "Text kopieren" -> `JobModule.copyToClipboard()`**
  Generiert eine reine Text-Repräsentation (Plain Text) aus den Feldern.