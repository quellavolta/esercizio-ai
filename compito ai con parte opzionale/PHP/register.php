<?php
include 'db_connection.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $nome = $_POST['nome'];
    $cognome = $_POST['cognome'];
    $data_nascita = $_POST['data_nascita'];
    $email = $_POST['email'];
    $corso = $_POST['corso'];

    $sql = "INSERT INTO studenti (nome, cognome, data_nascita, email, corso) 
            VALUES (?, ?, ?, ?, ?)";

    $stmt = $pdo->prepare($sql);
    $stmt->execute([$nome, $cognome, $data_nascita, $email, $corso]);

    echo "Studente registrato con successo!";
}
?>

<form method="POST">
    <label for="nome">Nome:</label>
    <input type="text" name="nome" required><br>

    <label for="cognome">Cognome:</label>
    <input type="text" name="cognome" required><br>

    <label for="data_nascita">Data di nascita (YYYY-MM-DD):</label>
    <input type="date" name="data_nascita" required><br>

    <label for="email">Email:</label>
    <input type="email" name="email" required><br>

    <label for="corso">Corso:</label>
    <input type="text" name="corso" required><br>

    <input type="submit" value="Registra studente">
</form>