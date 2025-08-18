<?php
session_start();
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $nom = $_POST['nom'];
    $email = $_POST['email'];
    $adresse = $_POST['adresse'];

    // حساب المجموع
    $total = 0;
    foreach ($_SESSION['cart'] as $item) {
        $total += $item['prix'] * $item['quantite'];
    }

    // حفظ الطلب في قاعدة البيانات
    $pdo = new PDO("mysql:host=localhost;dbname=boutique","root","");
    $stmt = $pdo->prepare("INSERT INTO commandes (nom_client, email_client, adresse, total) VALUES (?,?,?,?)");
    $stmt->execute([$nom, $email, $adresse, $total]);

    // إفراغ السلة
    $_SESSION['cart'] = [];
}
?>
<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <title>Commande réussie</title>
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css">
</head>
<body class="container py-4">
<h1>Merci <?= htmlspecialchars($nom) ?> !</h1>
<p>Votre commande a été enregistrée avec succès.</p>
<a href="index.php" class="btn btn-primary">Retour à l'accueil</a>
</body>
</html>