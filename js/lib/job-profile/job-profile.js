/**
 * MODULE: JOB-PROFILE (Stellenausschreibungs-Editor)
 * Übernommen aus SAP-Workshop-Vorlage.
 */
const JobModule = {
    // Feld-Mapping für den Text-Export
    fieldLabels: [
        ['jp-title','Stelle'], ['jp-dept','Abteilung'], ['jp-grade','Eingruppierung'], ['jp-holder','Inhaber'], ['jp-date','Stand'],
        ['jp-mission','Mission'], ['jp-reports','Führungskraft'], ['jp-reports-to','Unterstellte'], ['jp-deputy','Stellvertretung'],
        ['jp-tasks','Kernaufgaben'], ['jp-special','Sonderaufgaben'], ['jp-admin','Administration'],
        ['jp-budget','Finanziell'], ['jp-personal','Personell'], ['jp-auth','Sachlich'],
        ['jp-intern','Intern'], ['jp-extern','Extern'], ['jp-edu','Ausbildung'], ['jp-exp','Erfahrung'], 
        ['jp-methods','Methoden'], ['jp-skills','Skills'], ['jp-social','Soziales'],
        ['jp-kpis-q','KPIs quant.'], ['jp-kpis-ql','KPIs qual.']
    ],

    // Öffnet das Profil und befüllt alle Felder (analog zu RISE-Vorlage)
    open: function(data = {}) {
        const modal = document.getElementById('jobProfileModal');
        if (!modal) return;

        // Setze Standardwerte oder übergebene Daten
        const sv = (id, val) => { const el = document.getElementById(id); if (el) el.value = val || ''; };
        
        sv('jp-title', data.title || 'Neue Rolle');
        sv('jp-dept', data.dept || 'IT / SAP Basis & Cloud Operations');
        sv('jp-mission', data.mission || '');
        sv('jp-tasks', data.tasks || '');
        // ... (KI ergänzt hier alle weiteren Felder aus dem md-Blueprint)
        
        modal.classList.add('open');
    },

    // Generiert ein hochauflösendes HTML-Template für den PDF-Druck
    printPDF: function() {
        const title = document.getElementById('jp-title').value;
        const today = new Date().toLocaleDateString('de-DE');
        
        let html = `<html><head><title>Stellenausschreibung ${title}</title>
            <style>
                body { font-family: sans-serif; padding: 40px; color: #1d1d1f; }
                .hdr { background: linear-gradient(135deg, #0071e3, #005bb5); color: white; padding: 30px; border-radius: 12px; }
                table { width: 100%; border-collapse: collapse; margin-top: 20px; }
                th { text-align: left; background: #f5f5f7; padding: 10px; border: 1px solid #d2d2d7; width: 30%; }
                td { padding: 10px; border: 1px solid #d2d2d7; }
                h3 { color: #0071e3; border-bottom: 2px solid #e8f0fe; padding-bottom: 5px; margin-top: 25px; }
            </style></head><body><div class="hdr"><h1>${title}</h1><p>Stand: ${today}</p></div>`;

        // Baue Sektionen dynamisch aus den Textareas zusammen
        document.querySelectorAll('.job-edit-field').forEach(field => {
            const label = field.previousElementSibling?.innerText || "Details";
            html += `<h3>${label}</h3><p>${field.value.replace(/\n/g, '<br>')}</p>`;
        });

        html += `</body></html>`;
        
        const win = window.open('', '_blank');
        win.document.write(html);
        win.document.close();
        setTimeout(() => { win.print(); }, 500);
    },

    copyToClipboard: function() {
        let out = "STELLENAUSSCHREIBUNG\n" + "=".repeat(30) + "\n";
        this.fieldLabels.forEach(p => {
            const el = document.getElementById(p[0]);
            if (el) out += `${p[1]}:\n${el.value}\n\n`;
        });
        navigator.clipboard.writeText(out).then(() => alert("Text kopiert!"));
    }
};