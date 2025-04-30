/**
 * File di validazione del form di registrazione
 * Contiene tutte le funzioni per validare i campi del form
 */

// Funzione per verificare se un campo è vuoto
function isEmpty(value) {
    return value.trim() === '';
}

// Funzione per validare un indirizzo email
function isValidEmail(email) {
    // Pattern regex per validare un'email
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
}

// Funzione per verificare se una data è valida e non è nel futuro
function isValidDate(dateString) {
    // Verifica che la data sia valida
    const date = new Date(dateString);
    if (isNaN(date.getTime())) {
        return false;
    }
    
    // Verifica che la data non sia nel futuro
    const today = new Date();
    return date <= today;
}

// Funzione per verificare se lo studente ha almeno 16 anni
function isAtLeast16YearsOld(dateString) {
    const birthDate = new Date(dateString);
    const today = new Date();
    
    // Calcola l'età
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    
    // Aggiusta l'età se il compleanno non è ancora arrivato questo anno
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    
    return age >= 16;
}

// Funzione per verificare se un nome o cognome è valido (solo lettere e spazi)
function isValidName(name) {
    // Pattern regex che accetta lettere, spazi e caratteri accentati
    const namePattern = /^[A-Za-zÀ-ÿ\s'-]+$/;
    return namePattern.test(name);
}

// Funzione per validare l'intero form
function validateForm() {
    let isValid = true;
    
    // Ottenimento dei valori dal form
    const nome = document.getElementById('nome').value;
    const cognome = document.getElementById('cognome').value;
    const dataNascita = document.getElementById('dataNascita').value;
    const email = document.getElementById('email').value;
    const corso = document.getElementById('corso').value;
    
    // Reset dei messaggi di errore
    document.getElementById('nomeError').textContent = '';
    document.getElementById('cognomeError').textContent = '';
    document.getElementById('dataNascitaError').textContent = '';
    document.getElementById('emailError').textContent = '';
    document.getElementById('corsoError').textContent = '';
    
    // Validazione del nome
    if (isEmpty(nome)) {
        document.getElementById('nomeError').textContent = 'Il nome è obbligatorio';
        document.getElementById('nome').classList.add('error');
        isValid = false;
    } else if (!isValidName(nome)) {
        document.getElementById('nomeError').textContent = 'Il nome deve contenere solo lettere';
        document.getElementById('nome').classList.add('error');
        isValid = false;
    } else {
        document.getElementById('nome').classList.remove('error');
    }
    
    // Validazione del cognome
    if (isEmpty(cognome)) {
        document.getElementById('cognomeError').textContent = 'Il cognome è obbligatorio';
        document.getElementById('cognome').classList.add('error');
        isValid = false;
    } else if (!isValidName(cognome)) {
        document.getElementById('cognomeError').textContent = 'Il cognome deve contenere solo lettere';
        document.getElementById('cognome').classList.add('error');
        isValid = false;
    } else {
        document.getElementById('cognome').classList.remove('error');
    }
    
    // Validazione della data di nascita
    if (isEmpty(dataNascita)) {
        document.getElementById('dataNascitaError').textContent = 'La data di nascita è obbligatoria';
        document.getElementById('dataNascita').classList.add('error');
        isValid = false;
    } else if (!isValidDate(dataNascita)) {
        document.getElementById('dataNascitaError').textContent = 'La data di nascita non è valida o è nel futuro';
        document.getElementById('dataNascita').classList.add('error');
        isValid = false;
    } else if (!isAtLeast16YearsOld(dataNascita)) {
        document.getElementById('dataNascitaError').textContent = 'Lo studente deve avere almeno 16 anni';
        document.getElementById('dataNascita').classList.add('error');
        isValid = false;
    } else {
        document.getElementById('dataNascita').classList.remove('error');
    }
    
    // Validazione dell'email
    if (isEmpty(email)) {
        document.getElementById('emailError').textContent = 'L\'email è obbligatoria';
        document.getElementById('email').classList.add('error');
        isValid = false;
    } else if (!isValidEmail(email)) {
        document.getElementById('emailError').textContent = 'L\'email non è valida';
        document.getElementById('email').classList.add('error');
        isValid = false;
    } else {
        document.getElementById('email').classList.remove('error');
    }
    
    // Validazione del corso
    if (isEmpty(corso)) {
        document.getElementById('corsoError').textContent = 'Seleziona un corso';
        document.getElementById('corso').classList.add('error');
        isValid = false;
    } else {
        document.getElementById('corso').classList.remove('error');
    }
    
    return isValid;
}