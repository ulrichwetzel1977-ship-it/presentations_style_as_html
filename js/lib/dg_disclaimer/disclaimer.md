# Blueprint: Legal Disclaimer (Component: Disclaimer)

Dieses Modul stellt sicher, dass jede DATAGROUP-Präsentation mit dem offiziellen rechtlichen Disclaimer endet.

## 1. Verhaltensregeln für die KI
- Diese Folie MUSS immer die **letzte Folie** in der HTML-Struktur sein.
- Die Folie nutzt die Modifier-Klasse `.slide-disclaimer`.
- Sichtbarkeit: Die Folie ist standardmäßig in der `layout.css` ausgeblendet und wird ausschließlich über das DATAGROUP-Theme aktiviert.

## 2. HTML-Struktur (Vorgabe)
```html
<div class="slide slide-disclaimer" data-slide="final" data-title="Rechtliche Hinweise">
  
  <div class="branding-logo"></div>
  <div class="branding-claim"></div>

  <div class="slide-header">
    <div>
      <div class="slide-module-tag">DATAGROUP SE</div>
      <div class="slide-title">Rechtliche Hinweise / Disclaimer</div>
    </div>
  </div>
  
  <div class="slide-body disclaimer-text">
    <p>Diese Präsentation wurde von der Firma DATAGROUP SE erstellt und ist ausschließlich als Entscheidungshilfe für den Empfänger gedacht.</p>
    
    <p>Diese Präsentation ist kein Prospekt und versteht sich in keiner Art und Weise als Angebot oder Aufforderung, Gesellschaftsanteile oder sonstige Anteile zu kaufen bzw. zu zeichnen.</p>
    
    <p>Diese Präsentation wurde nach bestem Wissen zusammengestellt, dennoch übernimmt DATAGROUP SE keinerlei Gewähr für Genauigkeit und Vollständigkeit der ausdrücklich oder implizit gemachten Angaben. Dies gilt auch für jede andere schriftliche oder mündliche Aussage, die gegenüber dem interessierten Empfänger oder dessen Beratern gemacht wurde. Jegliche Haftung ist ausdrücklich ausgeschlossen.</p>
    
    <p>Diese Präsentation beinhaltet Angaben, Schätzungen und Voraussagen in Bezug auf die erwartete zukünftige Entwicklung. Sie basieren auf verschiedenen Annahmen, die vom Management der DATAGROUP SE in Bezug auf die erwarteten Ergebnisse getroffen wurden, und können sich je nach der tatsächlichen Entwicklung als wahr oder falsch herausstellen. Für die Richtigkeit dieser Angaben wird keine Gewähr übernommen. Die in dieser Präsentation gemachten Angaben sind nur eine Auswahl und deshalb nicht vollständig. Erweiterungen, Änderungen oder Korrekturen bleiben ausdrücklich vorbehalten. Für die Richtigkeit von Kennzahlen und Schätzungen aus explizit gekennzeichneten, öffentlich zugänglichen Quellen übernimmt die DATAGROUP SE keine Gewähr.</p>
    
    <p>Diese Präsentation ist vertraulich und sie bzw. ihr Inhalt darf weder ganz noch teilweise an Dritte weitergegeben werden.</p>
    
    <p>Ohne vorherige Zustimmung der DATAGROUP SE dürfen unter keinen Umständen Mitarbeiter, Repräsentanten, Vertreter, Berater, Kunden oder Lieferanten der DATAGROUP SE kontaktiert werden.</p>
  </div>
</div>