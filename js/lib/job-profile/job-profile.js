/**
 * MODULE: JOB-PROFILE (Stellenausschreibungs-Editor)
 * Angepasst an die Theme-Architektur. Nutzt CSS-Print-Queries.
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

    /**
     * Öffnet das Profil-Modal und befüllt ALLE Felder.
     */
    open: function(data = {}) {
        const modal = document.getElementById('jobProfileModal');
        if (!modal) return;

        const sv = (id, val) => { const el = document.getElementById(id); if (el) el.value = val || ''; };
        
        sv('jp-title', data.title || 'Neue Rolle');
        sv('jp-dept', data.dept || 'IT / SAP Basis & Cloud Operations');
        sv('jp-grade', data.grade || 'Entgeltband / AT');
        sv('jp-holder', data.holder || '');
        sv('jp-date', data.date || new Date().toLocaleDateString('de-DE'));
        
        sv('jp-mission', data.mission || '');
        sv('jp-reports', data.reports || 'Head of IT Operations');
        sv('jp-reports-to', data.reportsTo || 'Keine / Fachliche Führung externer Provider');
        sv('jp-deputy', data.deputy || 'Durch Rollen-Peer');
        
        sv('jp-tasks', data.tasks || '');
        sv('jp-special', data.special || 'Mitwirkung bei Cloud-Transformationen, Upgrades und Release-Zyklen.');
        sv('jp-admin', data.admin || 'Dokumentation, ITSM-Ticketpflege (z.B. SAP Cloud ALM), Reporting.');
        
        sv('jp-budget', data.budget || 'Keine eigenständige Budgetverantwortung');
        sv('jp-personal', data.personal || 'Keine disziplinarische Führung');
        sv('jp-auth', data.auth || '');
        
        sv('jp-intern', data.intern || 'Fachbereiche, SAP-Entwicklung, Security-Team, IT-Leitung.');
        sv('jp-extern', data.extern || 'SAP ECS Team, Hosting-Partner, Dienstleister.');
        
        sv('jp-edu', data.edu || 'Studium / Ausbildung in IT, mind. 3–5 Jahre SAP-Umfeld.');
        sv('jp-exp', data.exp || 'Erfahrung mit SAP Basis, Cloud-Betrieb und ITSM-Prozessen.');
        sv('jp-methods', data.methods || 'ITIL v4, SAP Cloud ALM, RACI-Modell.');
        sv('jp-skills', data.skills || '');
        sv('jp-social', data.social || 'Kommunikationsstärke, Konfliktfähigkeit, Belastbarkeit.');
        
        sv('jp-kpis-q', data.kpis_q || '');
        sv('jp-kpis-ql', data.kpis_ql || 'Kundenzufriedenheit Fachbereiche, Audit-Readiness, Prozessqualität.');
        
        modal.classList.add('open');
    },

    /**
     * Druckt das Profil als PDF.
     * Da die layout.css eine @media print Regel hat, reicht der simple Aufruf.
     */
    printPDF: function() {
        // Der Browser öffnet den Druckdialog. Die CSS-Media-Query sorgt dafür,
        // dass nur das Modal mit den Theme-Variablen gedruckt wird.
        window.print();
    },

    /**
     * Kopiert den Inhalt sauber formatiert in die Zwischenablage.
     */
    copyToClipboard: function() {
        const title = document.getElementById('jp-title')?.value || 'Neue Rolle';
        let out = `STELLENAUSSCHREIBUNG: ${title}\n`;
        out += "=".repeat(50) + "\n\n";
        
        this.fieldLabels.forEach(p => {
            const el = document.getElementById(p[0]);
            // Überspringe leere Felder für ein sauberes Clipboard-Ergebnis
            if (el && el.value.trim() !== '') {
                out += `${p[1]}:\n${el.value.trim()}\n\n`;
            }
        });
        
        navigator.clipboard.writeText(out).then(() => {
            // Wenn du das Toast-System aus der HTML nutzt, könnte man das hier einbinden:
            if (window.showToast) window.showToast("Stellenausschreibung kopiert!");
            else alert("Text kopiert!");
        });
    }
};