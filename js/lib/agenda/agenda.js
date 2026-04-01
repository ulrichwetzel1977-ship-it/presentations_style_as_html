/* ==========================================
   AGENDA LOGIK
   ========================================== */

// Initiale Agenda-Daten
let agendaData = [
  { time:'09:00 – 10:30', title:'📦 Modul 1 – Das Fundament', desc:'Einführung und Grundlagen.', isBreak:false },
  { time:'10:30 – 10:45', title:'☕ Kaffeepause', desc:'', isBreak:true },
  { time:'10:45 – 12:30', title:'🗺️ Modul 2 – Deep Dive', desc:'Vertiefung der Thematik.', isBreak:false }
];

// Rendert die Agenda auf der Präsentationsfolie
function renderAgendaSlide() {
  const list = document.getElementById('display-agenda-list');
  if (!list) return;
  list.innerHTML = '';
  
  agendaData.forEach(item => {
    if (item.isBreak) {
      list.innerHTML += `
        <li class="agenda-item agenda-break">
          <div class="agenda-time">${item.time}</div>
          <div class="agenda-content">
            <div class="agenda-title">${item.title}</div>
          </div>
        </li>`;
    } else {
      list.innerHTML += `
        <li class="agenda-item">
          <div class="agenda-time">${item.time}</div>
          <div class="agenda-content">
            <div class="agenda-title">${item.title}</div>
            <div class="agenda-desc">${item.desc}</div>
          </div>
        </li>`;
    }
  });
}

// Öffnet das Modal und baut die Eingabefelder auf
function openAgendaSettings() {
  const list = document.getElementById('settings-agenda-list');
  if (!list) return;
  list.innerHTML = '';
  
  agendaData.forEach((item, idx) => {
    list.innerHTML += `
      <div class="setting-row" id="set-ag-${idx}">
        <input type="text" class="setting-time-input" value="${item.time}" id="set-ag-time-${idx}">
        <div class="setting-inputs-col">
          <input type="text" value="${item.title.replace(/"/g,'&quot;')}" id="set-ag-title-${idx}" placeholder="Titel">
          <input type="text" value="${item.desc.replace(/"/g,'&quot;')}" id="set-ag-desc-${idx}" placeholder="Beschreibung (leer = Pause)">
        </div>
        <button class="btn-icon-del" onclick="removeAgendaRow(${idx})" title="Zeile löschen">🗑️</button>
      </div>`;
  });
  
  document.getElementById('agendaSettingsModal').classList.add('open');
}

// Fügt eine neue, leere Zeile im Modal hinzu
function addAgendaRow() {
  agendaData.push({ time:'00:00 – 00:00', title:'Neuer Punkt', desc:'', isBreak:false });
  openAgendaSettings(); // Re-render Modal
}

// Löscht eine Zeile im Modal
function removeAgendaRow(idx) {
  agendaData.splice(idx, 1);
  openAgendaSettings(); // Re-render Modal
}

// Schließt das Modal ohne zu speichern
function closeAgendaSettings() {
  const modal = document.getElementById('agendaSettingsModal');
  if (modal) modal.classList.remove('open');
}

// Speichert die Eingaben aus dem Modal in das Array und aktualisiert die Ansicht
function saveAgendaSettings() {
  let newAgenda = [];
  for (let i = 0; i < agendaData.length; i++) {
    const timeEl = document.getElementById(`set-ag-time-${i}`);
    if (!timeEl) continue;
    
    const title = document.getElementById(`set-ag-title-${i}`).value;
    const desc  = document.getElementById(`set-ag-desc-${i}`).value;
    
    newAgenda.push({ 
      time: timeEl.value, 
      title: title, 
      desc: desc, 
      isBreak: desc.trim() === '' 
    });
  }
  
  agendaData = newAgenda;
  renderAgendaSlide();
  closeAgendaSettings();
}

// Schließe Modal bei Klick auf den Hintergrund
document.addEventListener('DOMContentLoaded', () => {
  const modalOverlay = document.getElementById('agendaSettingsModal');
  if (modalOverlay) {
    modalOverlay.addEventListener('click', function(e) { 
      if (e.target === this) closeAgendaSettings(); 
    });
  }
  
  // Initiales Rendern beim Laden der Seite
  renderAgendaSlide();
});