<?php
session_start();
if (!isset($_SESSION['admin'])) {
    header("Location: login.php");
    exit;
}
require_once "../config.php";

$produits = $conn->query("SELECT * FROM produits ORDER BY created_at DESC")->fetchAll(PDO::FETCH_ASSOC);
?>
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <title>Gestion Produits</title>
</head>
<body>
    <h2>Produits</h2>
    <a href="ajouter-produit.php">+ Ajouter un produit</a>
    <table border="1" cellpadding="5">
        <tr><th>ID</th><th>Nom</th><th>Prix</th><th>Action</th></tr>
        <?php foreach($produits as $p): ?>
        <tr>
            <td><?= $p['id'] ?></td>
            <td><?= $p['nom'] ?></td>
            <td><?= $p['prix'] ?> €</td>
            <td>
                <a href="modifier-produit.php?id=<?= $p['id'] ?>">Modifier</a> | 
                <a href="supprimer-produit.php?id=<?= $p['id'] ?>" onclick="return confirm('Supprimer?')">Supprimer</a>
            </td>
        </tr>
        <?php endforeach; ?>
    </table>
</body>
</html>