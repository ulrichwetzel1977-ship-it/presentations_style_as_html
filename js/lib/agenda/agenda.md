# Blueprint: Interaktive Agenda (Component: Agenda)

Dieses Modul rendert die Agenda-Folie und stellt ein Modal zur Verfügung, um die Agenda-Punkte direkt in der HTML-Präsentation live zu bearbeiten.

## 1. Voraussetzungen
- Die CSS-Klassen für `.agenda-item` und `.modal` müssen geladen sein.
- Die Variable `agendaData` muss im globalen JavaScript-Scope definiert sein.

## 2. Platzhalter (Variablen)
- `{{SLIDE_NUM}}`: Die aktuelle Foliennummer (z.B. "2").
- `{{TAG}}`: Modul-Tag (z.B. "Überblick").
- `{{SLIDE_TITLE}}`: Titel der Folie (z.B. "Agenda des Tages").

## 3. HTML-Struktur
Das HTML besteht aus zwei Teilen:
1. Die eigentliche `.slide` (wird in `.presentation` eingefügt).
2. Das `#settingsModal` (sollte auf der obersten Ebene, außerhalb der Slides, z.B. am Ende des `<body>` eingefügt werden).