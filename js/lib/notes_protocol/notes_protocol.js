// ============================================
// NOTES / PROTOCOL
// ============================================
function exportNotesPDF() {
  // 1. UI Feedback & Lade-Mauszeiger (PDF Generierung dauert einen Moment)
  const btn = document.querySelector('.btn-export-pdf');
  const originalText = btn.textContent;
  btn.textContent = 'Erstelle PDF...';
  document.body.style.cursor = 'wait';

  // 2. Metadaten holen
  const customer = document.getElementById('cover-customer').textContent;
  const date = document.getElementById('cover-date').textContent;

  // 3. Temporären Container erstellen und ans Ende der Seite hängen
  const pdfContainer = document.createElement('div');
  pdfContainer.style.position = 'absolute';
  pdfContainer.style.top = '0';
  pdfContainer.style.left = '0';
  pdfContainer.style.width = '1200px'; // Feste Breite für konsistentes 16:9 Rendering
  pdfContainer.style.zIndex = '-9999'; // Optisch verstecken, aber im DOM behalten!
  pdfContainer.style.background = '#ffffff';
  pdfContainer.style.padding = '40px';
  
  // 4. Deckblatt / Kopfbereich des PDFs
  pdfContainer.innerHTML = `
    <h1 style="font-family:Arial; color:#E3000F; border-bottom:2px solid #E3000F; padding-bottom:10px; margin-bottom: 20px;">Workshop Protokoll</h1>
    <p style="font-family:Arial; font-size:16px; margin-bottom: 40px;"><strong>Kunde:</strong> ${customer} &nbsp;&nbsp; <strong>Datum:</strong> ${date}</p>
  `;

  // 5. Alle Folien iterieren (Gemäß Anforderung: "Alle Seiten umfassen")
  slides.forEach((slide, i) => {
    const note = notesData[i] || ''; // Notiz laden (auch leere Notizen werden verarbeitet)

    const slideWrapper = document.createElement('div');
    // Verhindert, dass Folie und Notiz durch einen Seitenumbruch getrennt werden
    slideWrapper.style.pageBreakInside = 'avoid';
    slideWrapper.style.marginBottom = '60px';

    // Titel der Folie als Überschrift
    const slideTitle = slide.getAttribute('data-title');
    slideWrapper.innerHTML = `<h2 style="font-family:Arial; font-size:18px; color:#E3000F; margin-bottom:10px;">Folie ${i + 1}: ${slideTitle}</h2>`;

    // --- DER WICHTIGE TEIL: Folie klonen und CSS überschreiben ---
    const clone = slide.cloneNode(true);
    clone.style.position = 'relative'; // Überschreibt position: absolute
    clone.style.opacity = '1';         // Macht die Folie sichtbar
    clone.style.pointerEvents = 'none';// Keine Klick-Effekte beim Rendern
    clone.style.width = '100%';
    clone.style.height = '675px';      // Zwingt das Layout in ein exaktes 16:9 Format (1200 x 675)
    clone.style.border = '1px solid #cccccc';
    clone.style.boxShadow = 'none';
    clone.style.transform = 'none';
    clone.style.display = 'flex';
    clone.classList.add('active');

    // Überschreibe scrollbare Bereiche (verhindert abgeschnittene Inhalte auf dem Screenshot)
    const slideBody = clone.querySelector('.slide-body');
    if (slideBody) {
        slideBody.style.overflow = 'visible';
    }

    slideWrapper.appendChild(clone);

    // --- NOTIZEN DARUNTER ANHÄNGEN ---
    const noteDiv = document.createElement('div');
    noteDiv.style.background = '#f9f9f9';
    noteDiv.style.borderLeft = '4px solid #E3000F';
    noteDiv.style.padding = '15px';
    noteDiv.style.marginTop = '15px';
    noteDiv.style.fontFamily = 'Arial, sans-serif';
    noteDiv.style.fontSize = '14px';
    noteDiv.style.lineHeight = '1.6';
    
    if (note.trim() !== '') {
        noteDiv.innerHTML = `<strong>Notizen:</strong><br>${note.replace(/\n/g, '<br>')}`;
    } else {
        noteDiv.innerHTML = `<em>Keine Notizen zu dieser Folie erfasst.</em>`;
    }
    slideWrapper.appendChild(noteDiv);

    pdfContainer.appendChild(slideWrapper);
  });

  document.body.appendChild(pdfContainer);

  // 6. PDF Generierung mit html2pdf
  const opt = {
    margin:       10, // 10mm Rand auf der PDF-Seite
    filename:     `Protokoll_${customer.replace(/\s+/g, '_')}.pdf`,
    image:        { type: 'jpeg', quality: 0.98 },
    html2canvas:  { 
        scale: 1.5,        // Gute Balance aus Qualität und Dateigröße
        useCORS: true,     // ZWINGEND ERFORDERLICH für das Laden des externen GitHub-Logos
        scrollY: 0,
        windowWidth: 1200  // Zwingt den Canvas auf unsere feste Breite
    },
    jsPDF:        { unit: 'mm', format: 'a4', orientation: 'portrait' }
  };

  html2pdf().set(opt).from(pdfContainer).save().then(() => {
    // Container nach erfolgreichem Export wieder löschen
    document.body.removeChild(pdfContainer);
    btn.textContent = originalText;
    document.body.style.cursor = 'default';
  }).catch(err => {
    console.error("PDF Export Fehler: ", err);
    document.body.removeChild(pdfContainer);
    btn.textContent = originalText;
    document.body.style.cursor = 'default';
    alert('Fehler beim Erstellen des PDFs.');
  });
}