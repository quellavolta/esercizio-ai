<?php
include 'db_connection.php';

$sql = "SELECT id, nome, cognome, corso FROM studenti";
$stmt = $pdo->query($sql);

echo "<h2>Lista studenti</h2>";

echo "<table border='1'>
        <tr>
            <th>ID</th>
            <th>Nome</th>
            <th>Cognome</th>
            <th>Corso</th>
        </tr>";

while ($row = $stmt->fetch()) {
    echo "<tr>
            <td>{$row['id']}</td>
            <td>{$row['nome']}</td>
            <td>{$row['cognome']}</td>
            <td>{$row['corso']}</td>
          </tr>";
}

echo "</table>";
?>