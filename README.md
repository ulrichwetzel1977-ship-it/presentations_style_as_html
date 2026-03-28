# Interaktive HTML-Präsentationsumgebung

## Bedienung
- Umschalten der Themes via URL-Parameter: `?theme=apple` oder `?theme=datagroup`.
- Protokolle werden pro Folie gespeichert und können als JSON exportiert werden.

## Workflow für KI-Generierung
Wenn ich neue Folien brauche, erstelle mir bitte `<section>` Blöcke. 
Verwende für Apple-Styles die Klasse `.glass-card`.
Verwende für Datagroup-Styles die spezifische Farbpalette (Green/Blue).

# 🚀 AI-Powered Slide Engine (v2026)

Dieses Repository ist eine modulare Entwicklungsumgebung für **interaktive HTML-Präsentationen**. Es ermöglicht es, mittels KI-Prompts (über den integrierten `generator.html`) voll funktionsfähige, standalone Präsentations-Dateien zu erstellen, die entweder auf **Reveal.js** oder einem **App-Style (SPA)** basieren.

## 📂 Struktur des Repositories

Das System ist strikt modular aufgebaut, um Design, Logik und Engine zu trennen:

* **`/css`**: Enthält die visuellen Identitäten und Engine-Styles.
    * `base.css`: Globale Layout-Regeln (Header, Footer, Glass-Cards).
    * `theme-apple.css`: Design-Variablen für den schlichten Apple-Look.
    * `theme-datagroup.css`: Design-Variablen nach dem DATAGROUP SE Styleguide.
    * `engine-reveal.css` / `engine-app.css`: Spezifische Mechaniken für den Folienwechsel.
* **`/js/engines`**: Die „Motoren“ der Präsentation.
    * `reveal-init.js`: Konfiguration für klassische Reveal.js Präsentationen.
    * `app-init.js`: Custom Navigation für interaktive Workshop-Apps (SAP-Style).
* **`/js/lib`**: Die Funktions-Bibliothek. Jedes Modul ist ein eigener Ordner.
    * `folder/module.js`: Die funktionale JavaScript-Logik.
    * `folder/module.md`: Der **UI-Blueprint** (Bauanleitung für die KI).
* **`generator.html`**: Das lokale Tool zur Erstellung der Master-Prompts.

---

## 🛠 Die Engines

### 1. Reveal.js Engine
* **Einsatzzweck:** Klassische Vorträge, flüssige Übergänge, Fokus auf Content.
* **Steuerung:** Pfeiltasten, Leertaste, Vollbild ('f'), Übersicht ('esc').
* **Container:** `.reveal > .slides > section`.

### 2. App-Style Engine (SAP-Style)
* **Einsatzzweck:** Interaktive Workshops, Dashboards, Tool-Charakter.
* **Steuerung:** Custom Navigation via Opacity-Fading.
* **Container:** `.presentation > .slide`.

---

## 🧩 Modul-Bibliothek (Components)

Jedes Modul in `js/lib/` folgt dem Prinzip: **Logik + Bauanleitung**.

| Modul | Beschreibung | Key-Features |
| :--- | :--- | :--- |
| **`protocol`** | Sitzungs-Gedächtnis | Live-Notizen pro Folie, JSON Export/Import. |
| **`fue-calculator`** | SAP Sizing Tool | FUE-Mapping, TCO-Vergleich, ROI-Rechner. |
| **`kanban`** | Interaktives Board | Drag & Drop Card-Sorting, State-Persistence. |

---

## 🤖 Workflow für die KI-Generierung

Um eine neue Präsentation zu erstellen, folge diesen Schritten:

1.  Öffne die **`generator.html`** lokal im Browser.
2.  Gib die URL dieses GitHub-Repos an (muss **öffentlich** sein).
3.  Wähle Engine, Theme und die gewünschten Module aus.
4.  Beschreibe den Inhalt oder gib einen Recherche-Auftrag ein.
5.  Kopiere den generierten **Master-Prompt** in den KI-Chat.
6.  Die KI liest die `.js` und `.md` Dateien direkt via Raw-Link aus diesem Repo und generiert eine **einzelne, fertige HTML-Datei**.

---

## 🚀 Setup & Entwicklung

### Neues Modul hinzufügen
1.  Erstelle einen Ordner in `js/lib/mein-modul/`.
2.  Lege eine `mein-modul.js` (Logik) und eine `mein-modul.md` (UI-Blueprint) an.
3.  Registriere das Modul in der `generator.html`, damit es auswählbar ist.

### GitHub Pages
Aktiviere **GitHub Pages** in den Repository-Einstellungen (Branch: main / Folder: root). Dadurch können die CSS- und JS-Dateien von der KI über stabile URLs referenziert werden.

---

**Kontakt & Support:**
Dieses System wurde für die automatisierte Erstellung von High-End Business-Präsentationen entwickelt. Bei Fragen zur Architektur wende dich an deinen KI-Assistenten.