<?php
$pdo = new PDO("mysql:host=localhost;dbname=boutique","root","");
$commandes = $pdo->query("SELECT * FROM commandes ORDER BY date_commande DESC")->fetchAll(PDO::FETCH_ASSOC);
?>
<!DOCTYPE html>
<html lang="fr">
<head><meta charset="UTF-8"><title>Commandes</title></head>
<body>
<h1>Liste des commandes</h1>
<table border="1" cellpadding="5">
<tr><th>ID</th><th>Nom Client</th><th>Email</th><th>Adresse</th><th>Total</th><th>Date</th></tr>
<?php foreach ($commandes as $c): ?>
<tr>
  <td><?= $c['id'] ?></td>
  <td><?= htmlspecialchars($c['nom_client']) ?></td>
  <td><?= htmlspecialchars($c['email_client']) ?></td>
  <td><?= htmlspecialchars($c['adresse']) ?></td>
  <td><?= $c['total'] ?> €</td>
  <td><?= $c['date_commande'] ?></td>
</tr>
<?php endforeach; ?>
</table>
</body>
</html>