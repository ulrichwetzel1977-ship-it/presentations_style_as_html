# Kontext & Ziel
Ich habe eine bestehende HTML-Seite, die auf einem modularen CSS-System (`layout.css` für Basis-Strukturen und Theme-Dateien für das Farb-/Branding-Schema) aufbaut. Ich möchte eine editierbare "Agenda"-Funktion in diese Seite integrieren.

# Ressourcen
Du erhältst von mir:
1. Den aktuellen Code meiner HTML-Seite.
2. Den HTML-Code des Agenda-Templates (`agenda.html`).
3. Den CSS-Code für die Agenda (`agenda.css`).
4. Den JS-Code für die Agenda (`agenda.js`).

# Deine Aufgabe
Bitte integriere das Agenda-Modul in meine HTML-Seite unter Beachtung folgender strikter Vorgaben:

1. **HTML-Integration:**
   - Füge den Code aus dem Block `AGENDA ANZEIGE` genau dort in meine HTML-Seite ein, wo der Inhaltsbereich für die Agenda-Folie / den Agenda-Abschnitt vorgesehen ist.
   - Füge den Code aus dem Block `AGENDA SETTINGS MODAL` ganz unten in der HTML-Seite ein, idealerweise direkt vor dem schließenden `</body>`-Tag.

2. **CSS- & JS-Referenzierung:**
   - Binde die `agenda.css` im `<head>`-Bereich ein, **nachdem** die `layout.css` und die jeweilige `theme.css` eingebunden wurden (damit die Variablen greifen).
   - Binde die `agenda.js` am Ende des Dokuments ein, direkt vor dem `</body>`-Tag.

3. **Styling-Kompatibilität:**
   - Verändere **nichts** an den CSS-Klassen oder der HTML-Struktur des Agenda-Moduls. Das Modul ist so geschrieben, dass es sich automatisch über CSS-Variablen (wie `--primary`, `--surface-alt`, `--border`, `--text`, `--text-secondary`) an das bestehende Theme anpasst.
   - Falls in meiner HTML-Seite Buttons existieren, stelle sicher, dass der "Agenda anpassen"-Button optisch zu den von mir genutzten Buttons passt (Klasse `.btn-secondary` bleibt bestehen).

Bitte gib mir den fertigen, zusammengebauten HTML-Code zurück.