<?php
session_start();
if (!isset($_SESSION['admin'])) {
    header("Location: login.php");
    exit;
}
require_once "../config.php";

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $nom = $_POST['nom'];
    $prix = $_POST['prix'];
    $desc = $_POST['description'];

    $stmt = $conn->prepare("INSERT INTO produits (nom, description, prix) VALUES (?, ?, ?)");
    $stmt->execute([$nom, $desc, $prix]);

    header("Location: produits.php");
    exit;
}
?>
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <title>Ajouter Produit</title>
</head>
<body>
    <h2>Ajouter un produit</h2>
    <form method="POST">
        <label>Nom:</label><input type="text" name="nom" required><br>
        <label>Description:</label><textarea name="description"></textarea><br>
        <label>Prix:</label><input type="number" step="0.01" name="prix" required><br>
        <button type="submit">Ajouter</button>
    </form>
</body>
</html>