<?php
session_start();
if (!isset($_SESSION['admin'])) {
    header("Location: login.php");
    exit;
}
require_once "../config.php";

$totalProduits = $conn->query("SELECT COUNT(*) FROM produits")->fetchColumn();
$totalCommandes = $conn->query("SELECT COUNT(*) FROM commandes")->fetchColumn();
?>
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <title>Tableau de bord</title>
</head>
<body>
    <h1>Bienvenue, <?= $_SESSION['admin'] ?></h1>
    <p>Total produits: <?= $totalProduits ?></p>
    <p>Total commandes: <?= $totalCommandes ?></p>
    <nav>
        <a href="produits.php">Gérer Produits</a> | 
        <a href="commandes.php">Voir Commandes</a> | 
        <a href="logout.php">Déconnexion</a>
    </nav>
</body>
</html>