<?php
session_start();
$pdo = new PDO("mysql:host=localhost;dbname=boutique","root","");
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $nom = $_POST['nom'];
    $prix = $_POST['prix'];
    $stock = $_POST['stock'];
    $desc = $_POST['description'];

    $stmt = $pdo->prepare("INSERT INTO produits (nom, description, prix, stock) VALUES (?,?,?,?)");
    $stmt->execute([$nom, $desc, $prix, $stock]);
    header("Location: index.php");
    exit;
}
?>
<!DOCTYPE html>
<html lang="fr">
<head><meta charset="UTF-8"><title>Ajouter Produit</title></head>
<body>
<h1>Ajouter un produit</h1>
<form method="post">
  Nom: <input type="text" name="nom"><br>
  Description: <textarea name="description"></textarea><br>
  Prix: <input type="number" step="0.01" name="prix"><br>
  Stock: <input type="number" name="stock"><br>
  <button type="submit">Ajouter</button>
</form>
</body>
</html>