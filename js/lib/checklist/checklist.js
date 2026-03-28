/**
 * MODULE: CHECKLIST (Interactive)
 */
const ChecklistModule = {
    toggle: function(element) {
        element.classList.toggle('checked'); // Toggle der CSS-Klasse aus Vorlage
        this.save();
    },

    save: function() {
        const states = Array.from(document.querySelectorAll('.checklist-item')).map(el => ({
            text: el.querySelector('.checklist-text')?.innerText,
            checked: el.classList.contains('checked')
        }));
        
        if (window.ProtocolModule) {
            const idx = ProtocolModule.getCurrentIndex();
            ProtocolModule.data.slides[idx + "_checklist"] = states;
        }
    }
};