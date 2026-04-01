# Blueprint: Erweitertes Kanban Board (Component: Kanban)

Dieses Modul stellt ein hochgradig anpassbares Kanban-Board zur Verfügung. Es unterstützt das dynamische Anlegen, Bearbeiten und Löschen von Spalten (Buckets) und Karten (Tasks).

## 1. Features
- **Buckets (Spalten):** Können per Button hinzugefügt werden. Name und Kopf-Farbe sind über ein Modal anpassbar.
- **Karten (Tasks):** Werden über ein Modal gepflegt. Das Modal bietet einen Langtext-Editor (Rich-Text/Multiline) und eine Farbauswahl für den Karten-Hintergrund.
- **Drag & Drop:** Karten können frei zwischen den Buckets verschoben werden.
- **State-Management:** Das gesamte Board wird über ein JSON-Objekt gesteuert, was den Export/Import des Status extrem vereinfacht.

## 2. Platzhalter für die KI-Generierung
- `{{SLIDE_NUM}}`: Foliennummer
- `{{TAG}}`: Kategorientag (z.B. "Workshop")
- `{{SLIDE_TITLE}}`: Titel der Folie
- `{{BOARD_ID}}`: Eine eindeutige ID für das Board (z.B. `board-1`), falls mehrere Boards existieren.

## 3. HTML-Struktur
Das Modul besteht aus:
1. Der Folie (`.slide-kanban`) mit dem `.kanban-board` Container.
2. Zwei globalen Modals (`#kanbanBucketModal` und `#kanbanCardModal`), die am Ende des `<body>` oder direkt in der Präsentation platziert werden müssen.