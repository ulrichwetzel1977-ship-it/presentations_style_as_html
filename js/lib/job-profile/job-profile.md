# Blueprint: Job-Profile (High-End Editor)

## 1. UI-Struktur (Modal)
- **Header:** Farbverlauf `linear-gradient(135deg, #0071e3, #005bb5)`, Titel in Weiß.
- **Body:** Nutze die Klasse `.job-pdf-view`.
- **Felder:** Nutze `.job-edit-field` (borderless Textareas), die bei Focus den Hintergrund zu `--accent-soft` wechseln.

## 2. Inhalts-Sektionen
Die KI muss folgende 8 Sektionen in Tabellenform oder als Textblöcke generieren:
1. **Stammdaten:** Titel, Abteilung, Eingruppierung, Inhaber, Stand.
2. **Mission:** Übergeordnete Zielsetzung.
3. **Reporting:** Führungskraft, Unterstellte, Stellvertretung.
4. **Aufgaben:** Kernaufgaben (70-80%), Sonderaufgaben, Admin.
5. **Befugnisse:** Finanziell, Personell, Sachlich.
6. **Schnittstellen:** Intern & Extern.
7. **Anforderungsprofil:** Ausbildung, Erfahrung, Methoden, Skills, Sozialkompetenz.
8. **KPIs:** Quantitativ & Qualitativ.

## 3. Integration
- Button "PDF drucken" -> `JobModule.printPDF()`
- Button "Text kopieren" -> `JobModule.copyToClipboard()`