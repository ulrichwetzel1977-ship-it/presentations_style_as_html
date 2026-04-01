# Kontext & Ziel
Ich habe eine HTML-Seite, die auf einem globalen CSS-System (`layout.css` und Theme-Dateien wie `theme-datagroup.css`) basiert. Ich möchte das interaktive "Job-Profile & Rollen"-Modul in diese Seite integrieren.

# Ressourcen
Du erhältst von mir:
1. Den Code meiner bestehenden HTML-Seite.
2. Den HTML-Code des Job-Profile-Templates (`job-profile-template.html`).
3. Den CSS-Code für die Profile (`job-profile.css`).
4. Den JS-Code für die Logik (`job-profile.js`).

# Deine Aufgabe
Bitte integriere das Modul anhand dieser strengen Vorgaben in meine HTML-Seite:

1. **HTML-Platzierung:**
   - Den Block `ROLLEN & JOB-PROFILE ANZEIGE` platzierst du in dem dafür vorgesehenen Content-Bereich (z.B. innerhalb des `slide-body` der entsprechenden Präsentations-Folie).
   - Den Block `JOB PROFILE MODAL` musst du ganz unten in der HTML-Struktur platzieren, direkt vor dem schließenden `</body>`-Tag, um Z-Index-Konflikte zu vermeiden.

2. **CSS & JS Einbindung:**
   - Binde `job-profile.css` im `<head>` ein, **strikt nach** der `layout.css` und der Theme-Datei, damit die darin verwendeten globalen Variablen (`--primary`, `--surface`, etc.) korrekt ausgelesen werden.
   - Binde `job-profile.js` am Ende des Dokuments ein.

3. **Styling & Konsistenz:**
   - Verändere keine Klassennamen im HTML.
   - Der JavaScript-Code manipuliert das DOM (erstellt Rollenkarten). Lasse die Logik für `innerHTML` innerhalb von `renderRoleCard()` unangetastet, sie wurde bereits für das Theme-System optimiert.
   - Beachte den `@media print` Block im CSS. Er ist überlebenswichtig, damit beim Klick auf "Als PDF drucken" nur das Modal auf DIN A4 gedruckt wird und nicht die restliche HTML-Seite.

Gib mir danach den fertigen HTML-Code zur Überprüfung zurück.