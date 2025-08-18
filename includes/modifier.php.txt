<?php
$pdo = new PDO("mysql:host=localhost;dbname=boutique","root","");
$id = $_GET['id'];
$prod = $pdo->query("SELECT * FROM produits WHERE id=$id")->fetch();

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $nom = $_POST['nom'];
    $prix = $_POST['prix'];
    $stock = $_POST['stock'];
    $desc = $_POST['description'];

    $stmt = $pdo->prepare("UPDATE produits SET nom=?, description=?, prix=?, stock=? WHERE id=?");
    $stmt->execute([$nom, $desc, $prix, $stock, $id]);
    header("Location: index.php");
    exit;
}
?>
<!DOCTYPE html>
<html lang="fr">
<head><meta charset="UTF-8"><title>Modifier Produit</title></head>
<body>
<h1>Modifier produit</h1>
<form method="post">
  Nom: <input type="text" name="nom" value="<?= $prod['nom'] ?>"><br>
  Description: <textarea name="description"><?= $prod['description'] ?></textarea><br>
  Prix: <input type="number" step="0.01" name="prix" value="<?= $prod['prix'] ?>"><br>
  Stock: <input type="number" name="stock" value="<?= $prod['stock'] ?>"><br>
  <button type="submit">Modifier</button>
</form>
</body>
</html>