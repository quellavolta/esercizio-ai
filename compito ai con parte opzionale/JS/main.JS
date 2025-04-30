/**
 * File principale per la gestione degli studenti
 * Contiene funzioni per:
 * - Salvare gli studenti (localStorage o API)
 * - Mostrare gli studenti nella pagina home
 * - Gestire la registrazione di nuovi studenti
 */

// Costante per la chiave di localStorage
const STORAGE_KEY = 'registeredStudents';

// Flag per utilizzare il backend o localStorage
const USE_BACKEND = false; // Imposta a true per utilizzare il backend Python/MySQL

// URL del backend
const BACKEND_URL = 'http://localhost:5000';

// Funzione per ottenere tutti gli studenti
async function getStudents() {
    if (USE_BACKEND) {
        try {
            const response = await fetch(`${BACKEND_URL}/students`);
            if (!response.ok) {
                throw new Error('Errore durante il recupero degli studenti');
            }
            return await response.json();
        } catch (error) {
            console.error('Errore:', error);
            return [];
        }
    } else {
        // Recupera gli studenti da localStorage
        const students = localStorage.getItem(STORAGE_KEY);
        return students ? JSON.parse(students) : [];
    }
}

// Funzione per salvare un nuovo studente
async function saveStudent(student) {
    if (USE_BACKEND) {
        try {
            const response = await fetch(`${BACKEND_URL}/students`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(student)
            });
            
            if (!response.ok) {
                throw new Error('Errore durante il salvataggio dello studente');
            }
            
            return await response.json();
        } catch (error) {
            console.error('Errore:', error);
            throw error;
        }
    } else {
        // Salva lo studente in localStorage
        const students = await getStudents();
        students.push(student);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(students));
        return student;
    }
}

// Funzione per formattare la data in modo leggibile (DD/MM/YYYY)
function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('it-IT');
}

// Funzione per mostrare gli studenti nella tabella
async function displayStudents() {
    // Controlla se siamo nella pagina home
    const studentTable = document.getElementById('studentTable');
    if (!studentTable) return;
    
    const studentList = document.getElementById('studentList');
    const noStudents = document.getElementById('noStudents');
    const totalStudentsElement = document.getElementById('totalStudents');
    
    // Ottieni gli studenti
    const students = await getStudents();
    
    // Aggiorna il contatore degli studenti
    totalStudentsElement.textContent = students.length;
    
    // Mostra/nascondi messaggi in base al numero di studenti
    if (students.length === 0) {
        studentTable.classList.add('hidden');
        noStudents.classList.remove('hidden');
        return;
    } else {
        studentTable.classList.remove('hidden');
        noStudents.classList.add('hidden');
    }
    
    // Svuota la tabella prima di popolarla nuovamente
    studentList.innerHTML = '';
    
    // Popola la tabella con gli studenti
    students.forEach(student => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${student.nome}</td>
            <td>${student.cognome}</td>
            <td>${formatDate(student.dataNascita)}</td>
            <td>${student.email}</td>
            <td>${student.corso}</td>
        `;
        studentList.appendChild(row);
    });
    
    // Configura la funzione di ricerca
    setupSearch();
}

// Funzione per filtrare gli studenti nella tabella
function setupSearch() {
    const searchInput = document.getElementById('searchInput');
    if (!searchInput) return;
    
    searchInput.addEventListener('input', function() {
        const searchTerm = this.value.toLowerCase();
        const rows = document.querySelectorAll('#studentList tr');
        
        rows.forEach(row => {
            const text = row.textContent.toLowerCase();
            // Mostra/nascondi riga in base alla presenza del termine di ricerca
            row.style.display = text.includes(searchTerm) ? '' : 'none';
        });
    });
}

// Funzione per gestire l'invio del form di registrazione
async function handleRegistration(event) {
    event.preventDefault();
    
    // Validazione del form
    if (!validateForm()) {
        return;
    }
    
    // Raccolta dati dal form
    form.addEventListener("submit", function (e) {
        e.preventDefault();
      
        const nome = document.getElementById("nome").value.trim();
        const cognome = document.getElementById("cognome").value.trim();
        const dataNascita = document.getElementById("dataNascita").value;
        const email = document.getElementById("email").value.trim();
        const corso = document.getElementById("corso").value.trim();
      
        const soloLettere = /^[A-Za-zÀ-ÿ\s]+$/;
      
        // Controllo campi vuoti
        if (!nome || !cognome || !dataNascita || !email || !corso) {
          alert("Tutti i campi sono obbligatori.");
          return;
        }
      
        // Controllo nome e cognome
        if (!soloLettere.test(nome) || !soloLettere.test(cognome)) {
          alert("Il nome e il cognome possono contenere solo lettere.");
          return;
        }
      
        const studente = { nome, cognome, dataNascita, email, corso };
        const studenti = JSON.parse(localStorage.getItem("studenti")) || [];
        studenti.push(studente);
        localStorage.setItem("studenti", JSON.stringify(studenti));
      
        alert("Studente registrato con successo!");
        form.reset();
      });
    
    try {
        // Salvataggio dello studente
        await saveStudent(student);
        
        // Mostra messaggio di successo
        const messageBox = document.getElementById('messageBox');
        messageBox.innerHTML = 'Registrazione completata con successo!';
        messageBox.className = 'message success';
        
        // Reset del form
        document.getElementById('registrationForm').reset();
        
        // Nascondi il messaggio dopo alcuni secondi
        setTimeout(() => {
            messageBox.classList.add('hidden');
        }, 5000);
    } catch (error) {
        // Mostra messaggio di errore
        const messageBox = document.getElementById('messageBox');
        messageBox.innerHTML = `Errore: ${error.message}`;
        messageBox.className = 'message error';
    }
}

// Funzione di inizializzazione dell'app
function initApp() {
    // Mostra gli studenti se siamo nella pagina home
    displayStudents();
    
    // Configura il form di registrazione se siamo nella pagina registrati
    const registrationForm = document.getElementById('registrationForm');
    if (registrationForm) {
        registrationForm.addEventListener('submit', handleRegistration);
    }
}

// Inizializza l'app quando il documento è caricato
document.addEventListener('DOMContentLoaded', initApp);