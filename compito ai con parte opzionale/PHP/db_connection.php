<?php
$host = 'localhost';  // Il server MySQL
$db = 'studenti';     // Nome del database
$port = '3306';
$user = 'root';       // Nome utente
$pass = '';           // Password (lascia vuoto se non hai una password)
$charset = 'utf8mb4';

// Connessione al database
$dsn = "mysql:host=$host;dbname=$db;charset=$charset";
$options = [
    PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
    PDO::ATTR_EMULATE_PREPARES   => false,
];

try {
    $pdo = new PDO($dsn, $user, $pass, $options);
} catch (\PDOException $e) {
    throw new \PDOException($e->getMessage(), (int)$e->getCode());
}
?>