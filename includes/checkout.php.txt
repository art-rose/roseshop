<?php
session_start();
if (empty($_SESSION['cart'])) {
    header("Location: cart.php");
    exit;
}
?>
<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <title>Finaliser la commande</title>
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css">
</head>
<body class="container py-4">
<h1>Finaliser la commande</h1>
<form method="post" action="order_success.php">
  <div class="mb-3">
    <label class="form-label">Nom complet</label>
    <input type="text" name="nom" class="form-control" required>
  </div>
  <div class="mb-3">
    <label class="form-label">Email</label>
    <input type="email" name="email" class="form-control" required>
  </div>
  <div class="mb-3">
    <label class="form-label">Adresse</label>
    <textarea name="adresse" class="form-control" required></textarea>
  </div>
  <button type="submit" class="btn btn-primary">Confirmer</button>
</form>
</body>
</html>