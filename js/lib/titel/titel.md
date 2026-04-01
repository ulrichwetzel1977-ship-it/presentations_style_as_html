# Blueprint: Titelfolie (Component: Titel)

Dieses Modul stellt die Einstiegsseite der Präsentation dar. Es enthält eine zentrale Inhaltsbox für den Titel und Metadaten sowie ein Einstellungs-Modal, um diese Daten live zu pflegen.

## 1. Features
- **Interaktive Bearbeitung:** Über einen Einstellungs-Button können Titel, Kunde, Datum und Präsentator angepasst werden.
- **Automatischer Sync:** Änderungen am Kundennamen werden automatisch in den `branding-claim` auf allen Folien übernommen.
- **Design:** Nutzt das `slide-cover` Layout für eine prominente Darstellung.

## 2. Platzhalter (Variablen)
- `{{PRESENTATION_TITLE}}`: Der Haupttitel der Präsentation.
- `{{CUSTOMER_NAME}}`: Name des Kunden.
- `{{PRESENTATION_DATE}}`: Datum der Präsentation.
- `{{PRESENTER_NAME}}`: Name des Vortragenden.