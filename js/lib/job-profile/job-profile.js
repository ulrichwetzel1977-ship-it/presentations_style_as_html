/* ==========================================
   ROLE MANAGEMENT & JOB PROFILES (Erweitert)
   ========================================== */

let roleIdCounter = 1;
let roles = [];
let currentOpenRoleId = null;

// Initialisierung beim Laden
document.addEventListener('DOMContentLoaded', () => {
  initRoles();
  
  // Event Listener für Auto-Resize in der PDF Ansicht (wichtig für den Druck)
  document.querySelectorAll('.job-edit-field').forEach(field => {
    field.addEventListener('input', function() {
      autoResizeTextarea(this);
    });
  });
});

// Passt die Höhe von Textfeldern automatisch an (verhindert abgeschnittenen Text im PDF)
function autoResizeTextarea(el) {
  el.style.height = 'auto';
  el.style.height = (el.scrollHeight) + 'px';
}

function initRoles() {
  const grid = document.getElementById('roleGrid');
  if (!grid) return;
  
  // Wir starten mit einem leeren Array oder Standard-Werten
  roles = [];
  // Falls du Standard-Rollen direkt laden willst, kannst du sie hier pushen.
  // Wir nutzen jetzt primär die Möglichkeit, sie dynamisch hinzuzufügen.
}

// --- 1. EIGENE ROLLEN HINZUFÜGEN ---
function addRole() {
  const newRole = {
    id: roleIdCounter++,
    emoji: '👤',
    title: 'Neue Rolle', 
    subtitle: 'Kurzbeschreibung...', 
    skills: ['Beispiel-Skill 1'], // Initialer Skill
    jp: { 
      gueltig: new Date().toLocaleDateString('de-DE'),
      abteilung: 'IT / SAP',
      eingruppierung: 'Offen'
    }
  };
  roles.push(newRole);
  document.getElementById('roleGrid').appendChild(renderRoleCard(newRole));
}

function renderRoleCard(role) {
  const div = document.createElement('div');
  div.className = 'role-card';
  div.dataset.roleId = role.id;
  
  div.innerHTML = `
    <div class="role-card-header">
      <div class="role-avatar">${role.emoji}</div>
      <div style="flex:1; min-width:0;">
        <input class="role-title-edit" type="text" value="${role.title}" onblur="updateRoleField(${role.id}, 'title', this.value)" placeholder="Rollenbezeichnung">
        <input class="role-subtitle-edit" type="text" value="${role.subtitle}" onblur="updateRoleField(${role.id}, 'subtitle', this.value)" placeholder="Untertitel">
      </div>
      <button onclick="deleteRole(${role.id})" style="background:none; border:none; color:var(--text-secondary); cursor:pointer; font-size:16px;" title="Rolle löschen">✕</button>
    </div>
    <ul class="role-skills" id="skills-${role.id}"></ul>
    <div style="display:flex; gap:6px; margin-top:auto;">
      <input type="text" placeholder="Neuer Skill..." id="skill-input-${role.id}" onkeydown="if(event.key==='Enter')addSkillToRole(${role.id})" style="flex:1; border:1px solid var(--border); border-radius:var(--radius-sm); padding:6px 10px; font-family:inherit; outline:none; font-size: 13px;">
      <button class="btn-add-skill" onclick="addSkillToRole(${role.id})">+</button>
    </div>
    <button class="btn-pdf" onclick="openJobProfile(${role.id})">📄 Stellenbeschreibung (PDF)</button>
  `;

  renderSkillsList(role.id, div.querySelector(`#skills-${role.id}`));
  return div;
}

// --- 2. EIGENE SKILLS SYNCHRONISIEREN ---
function renderSkillsList(roleId, ulElement = null) {
  const role = roles.find(r => r.id === roleId);
  const ul = ulElement || document.getElementById(`skills-${roleId}`);
  if (!role || !ul) return;

  ul.innerHTML = ''; // Liste leeren
  role.skills.forEach((skill, index) => {
    const li = document.createElement('li');
    li.innerHTML = `
      <div style="display:flex; align-items:center; gap:8px; flex:1;">
        <span style="color:var(--primary); font-weight:700;">→</span>
        <input type="text" value="${skill}" onblur="editSkill(${roleId}, ${index}, this.value)" style="border:none; outline:none; background:transparent; font-family:inherit; font-size:13px; color:var(--text-secondary); flex:1;">
      </div>
      <button onclick="removeSkill(${roleId}, ${index})" style="background:none; border:none; color:var(--text-secondary); cursor:pointer; font-size: 12px;">✕</button>
    `;
    ul.appendChild(li);
  });
}

function addSkillToRole(roleId) {
  const input = document.getElementById(`skill-input-${roleId}`);
  const text = input.value.trim();
  if (!text) return;
  
  const role = roles.find(r => r.id === roleId);
  if (role) {
    role.skills.push(text);
    renderSkillsList(roleId);
  }
  input.value = '';
}

function editSkill(roleId, skillIndex, newValue) {
  const role = roles.find(r => r.id === roleId);
  if (role && newValue.trim() !== '') {
    role.skills[skillIndex] = newValue.trim();
  }
}

function removeSkill(roleId, skillIndex) {
  const role = roles.find(r => r.id === roleId);
  if (role) {
    role.skills.splice(skillIndex, 1);
    renderSkillsList(roleId);
  }
}

function updateRoleField(roleId, field, value) {
  const role = roles.find(r => r.id === roleId);
  if (role) role[field] = value;
}

function deleteRole(roleId) {
  if (!confirm('Rolle wirklich löschen?')) return;
  roles = roles.filter(r => r.id !== roleId);
  const card = document.querySelector(`.role-card[data-role-id="${roleId}"]`);
  if (card) card.remove();
}

// --- 3. MODAL & PDF GENERIERUNG ---
function openJobProfile(roleId) {
  currentOpenRoleId = roleId;
  const role = roles.find(r => r.id === roleId);
  if (!role) return;
  
  const jp = role.jp || {};
  const setVal = (id, val) => { 
    const el = document.getElementById(id); 
    if (el) { el.value = val || ''; autoResizeTextarea(el); } 
  };
  
  document.getElementById('jp-modal-title').innerText = 'Profil: ' + role.title;
  
  setVal('jp-title', role.title);
  setVal('jp-dept', jp.abteilung);
  setVal('jp-grade', jp.eingruppierung);
  setVal('jp-holder', jp.inhaber);
  setVal('jp-date', jp.gueltig);
  setVal('jp-mission', jp.mission);
  setVal('jp-reports', jp.berichtetAn);
  setVal('jp-reports-to', jp.unterstellte);
  setVal('jp-deputy', jp.stellvertretung);
  setVal('jp-tasks', jp.kernaufgaben);
  setVal('jp-special', jp.sonderaufgaben);
  setVal('jp-admin', jp.admin);
  setVal('jp-budget', jp.finanziell);
  setVal('jp-personal', jp.personell);
  setVal('jp-auth', jp.sachlich);
  setVal('jp-intern', jp.intern);
  setVal('jp-extern', jp.extern);
  setVal('jp-edu', jp.ausbildung);
  setVal('jp-exp', jp.erfahrung);
  setVal('jp-methods', jp.methoden);
  
  // Skills aus dem Array als formatierte Liste ins Textfeld übertragen
  setVal('jp-skills', role.skills.map(s => '• ' + s).join('\n'));
  
  setVal('jp-social', jp.sozial);
  setVal('jp-kpis-q', jp.kpis_q);
  setVal('jp-kpis-ql', jp.kpis_ql);

  document.getElementById('jobProfileModal').classList.add('open');
  
  // Ein kleiner Delay, um sicherzustellen, dass das Modal gerendert ist, bevor wir die Höhen endgültig berechnen
  setTimeout(() => {
    document.querySelectorAll('.job-edit-field').forEach(autoResizeTextarea);
  }, 10);
}

function closeJobProfile() {
  if(currentOpenRoleId) {
      const role = roles.find(r => r.id === currentOpenRoleId);
      if(role) {
          const getVal = (id) => document.getElementById(id).value;
          
          role.jp = {
              abteilung: getVal('jp-dept'), eingruppierung: getVal('jp-grade'), inhaber: getVal('jp-holder'),
              gueltig: getVal('jp-date'), mission: getVal('jp-mission'), berichtetAn: getVal('jp-reports'),
              unterstellte: getVal('jp-reports-to'), stellvertretung: getVal('jp-deputy'), kernaufgaben: getVal('jp-tasks'),
              sonderaufgaben: getVal('jp-special'), admin: getVal('jp-admin'), finanziell: getVal('jp-budget'),
              personell: getVal('jp-personal'), sachlich: getVal('jp-auth'), intern: getVal('jp-intern'),
              extern: getVal('jp-extern'), ausbildung: getVal('jp-edu'), erfahrung: getVal('jp-exp'),
              methoden: getVal('jp-methods'), sozial: getVal('jp-social'), kpis_q: getVal('jp-kpis-q'),
              kpis_ql: getVal('jp-kpis-ql')
          };
          
          role.title = getVal('jp-title');
          const cardTitle = document.querySelector(`.role-card[data-role-id="${currentOpenRoleId}"] .role-title-edit`);
          if(cardTitle) cardTitle.value = role.title;

          // BIDIREKTIONALER SYNC: Wenn Skills in der PDF geändert wurden, schreibe sie zurück ins Array!
          const editedSkills = getVal('jp-skills').split('\n')
              .map(s => s.replace(/^[•\-\*]\s*/, '').trim()) // Entfernt die Bullets (•, -, *)
              .filter(s => s !== ''); // Leere Zeilen ignorieren
          
          role.skills = editedSkills;
          renderSkillsList(role.id); // Kartenansicht aktualisieren
      }
  }
  
  document.getElementById('jobProfileModal').classList.remove('open');
  currentOpenRoleId = null;
}

// Schließe Modal bei Klick außerhalb
document.getElementById('jobProfileModal').addEventListener('click', function(e) { 
  if (e.target === this) closeJobProfile(); 
});

// PDF Drucken
function triggerPDFPrint() {
  // Vor dem Drucken alle Höhen noch einmal erzwingen
  document.querySelectorAll('.job-edit-field').forEach(autoResizeTextarea);
  window.print();
}