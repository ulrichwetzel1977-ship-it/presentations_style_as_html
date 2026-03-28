# Blueprint: Global Settings & Agenda Manager

Jede Präsentation muss dieses Modul für die Personalisierung enthalten.

## 1. UI-Struktur (Das Modal)
Erstelle ein Modal-Overlay (`#settingsModal`) mit folgenden Eingabefeldern:
- **Titel:** ID `set-title`
- **Kunde:** ID `set-customer`
- **Datum:** ID `set-date`
- **Agenda-Editor:** Eine Tabelle oder Liste, in der man Zeilen hinzufügen/löschen kann. Jede Zeile hat Felder für `Zeit`, `Titel` und `Beschreibung`.

## 2. Anzeige-Elemente (Platzhalter)
Verwende auf der **Titelfolie** und in der **Agenda-Folie** folgende IDs für die automatische Befüllung:
- `display-title`: Hauptüberschrift
- `display-customer`: Untertitel/Kunde
- `display-date`: Datum des Workshops
- `display-agenda-list`: Der Container (UL/DIV) für die generierte Agenda-Liste.

## 3. Design-Vorgaben (Apple Style)
- Das Modal soll wie in der Vorlage ein `backdrop-filter: blur(10px)` nutzen.
- Die Buttons im Modal nutzen die Klassen `.btn-primary` (Blau) und `.btn-secondary` (Hellgrau).
- Die Agenda-Items sollen ein sauberes Grid-Layout haben (Zeit links, Text rechts).

## 4. JSON-Handling
Stelle sicher, dass beim Klick auf "Export" die Funktion `SettingsModule.exportFullSession()` aufgerufen wird, um sowohl die Agenda-Daten als auch die Protokollnotizen in einer einzigen Datei zu sichern.