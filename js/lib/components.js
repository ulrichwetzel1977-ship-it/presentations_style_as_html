// components.js - Interaktive Elemente

/**
 * Fügt einer Liste (z.B. Kanban Spalte) ein Element hinzu
 * @param {string} columnId - ID des HTML Containers
 */
function addTask(columnId) {
    const taskText = prompt("Aufgabe eingeben:");
    if (taskText) {
        const column = document.getElementById(columnId);
        const taskElement = document.createElement('div');
        taskElement.className = 'kanban-item glass-card'; // Nutzt Apple-Style falls aktiv
        taskElement.style.margin = "10px 0";
        taskElement.style.fontSize = "0.6em";
        taskElement.innerText = taskText;
        column.appendChild(taskElement);
    }
}

// Hier können später Chart.js oder andere Bibliotheken initialisiert werden