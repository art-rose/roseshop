cart_php = """<?php require_once DIR.'/../config.php'; require_once DIR.'/../includes/functions.php';

if(isset($_POST['set_qty'])){ cart_set((int)$_POST['id'], (int)$_POST['qty']); header('Location: cart.php'); exit; } if(isset($_GET['del'])){ cart_remove((int)$_GET['del']); header('Location: cart.php'); exit; }

list($items,$total) = cart_items(); ?>

<!DOCTYPE html><html lang="fr">
<head>
<meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
<title>Panier — <?= SITE_NAME ?></title>
<link rel="stylesheet" href="/public/assets/style.css">
</head>
<body>
<div class="header"><div class="wrap"><a class="btn" href="/public/index.php">← Continuer vos achats</a><div style="flex:1"></div><strong>Panier</strong></div></div><div class="wrap">
  <?php if(!$items): ?>
    <p>Votre panier est vide.</p>
  <?php else: ?>
    <table class="table">
      <tr><th>Produit</th><th>Prix</th><th>Qté</th><th>Sous-total</th><th></th></tr>
      <?php foreach($items as $it): ?>
      <tr>
        <td><?= htmlspecialchars($it['nom']) ?></td>
        <td><?= euro($it['prix']) ?></td>
        <td>
          <form method="post" style="display:flex;gap:6px;align-items:center">
            <input type="hidden" name="id" value="<?= $it['id'] ?>">
            <input type="number" min="0" name="qty" value="<?= (int)$it['quantite'] ?>" style="width:70px">
            <button class="btn" name="set_qty">OK</button>
          </form>
        </td>
        <td><?= euro($it['sous_total']) ?></td>
        <td><a class="btn" href="?del=<?= $it['id'] ?>">🗑</a></td>
      </tr>
      <?php endforeach; ?>
      <tr><td colspan="3" style="text-align:right"><strong>Total</strong></td><td><strong><?= euro($total) ?></strong></td><td></td></tr>
    </table>
    <div style="margin-top:12px"><a class="btn btn-primary" href="/public/checkout.php">Passer la commande</a></div>
  <?php endif; ?>
</div>
</body>
</html>
"""
open(os.path.join(base,"public","cart.php"),"w",encoding="utf-8").write(cart_php)
