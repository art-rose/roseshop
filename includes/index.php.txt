index_php = """<?php require_once DIR.'/../config.php'; require_once DIR.'/../includes/functions.php';

// Ajouter au panier if(isset($_GET['add'])){ cart_add((int)$_GET['add'], 1); header('Location: /public/index.php'); exit; }

$produits = get_products(); ?>

<!DOCTYPE html><html lang="fr">
<head>
<meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
<title><?= SITE_NAME ?></title>
<link rel="stylesheet" href="/public/assets/style.css">
</head>
<body>
<div class="header">
  <div class="wrap">
    <div class="brand"><span class="logo"></span> &nbsp; <?= SITE_NAME ?></div>
    <div class="search"><input placeholder="Rechercher… (démo)" /></div>
    <a class="btn" href="/public/cart.php">🛒 Panier (<?= isset($_SESSION['cart'])? array_sum($_SESSION['cart']) : 0 ?>)</a>
    <a class="btn" href="/admin/">Admin</a>
  </div>
</div><div class="wrap"><div class="alert">Catalogue démo • Ajoutez vos produits via la <a href="/admin/">loïute d'administration</a>.</div></div><main class="grid">
<?php foreach($produits as $p): ?>
  <article class="card">
    <div class="img">
      <?php if($p['image']): ?>
        <img src="<?= htmlspecialchars($p['image']) ?>" alt="<?= htmlspecialchars($p['nom']) ?>" style="max-width:90%;max-height:90%">
      <?php else: ?>
        <svg viewBox="0 0 320 240" width="90%"><rect width="100%" height="100%" rx="18" fill="#0a1830"/><text x="50%" y="52%" text-anchor="middle" fill="#bde0d7" font-family="system-ui" font-size="22"><?= htmlspecialchars($p['nom']) ?></text></svg>
      <?php endif; ?>
    </div>
    <div class="body">
      <h3 style="margin:0 0 6px"><?= htmlspecialchars($p['nom']) ?></h3>
      <div class="muted"><?= nl2br(htmlspecialchars($p['description'])) ?></div>
      <div class="price"><?= euro($p['prix']) ?> · <span class="badge">Stock: <?= (int)$p['stock'] ?></span></div>
      <a class="btn btn-primary" href="?add=<?= $p['id'] ?>">Ajouter au panier</a>
    </div>
  </article>
<?php endforeach; ?>
</main><footer class="footer">© <?= date('Y') ?> — Démo boutique fleurs.</footer>
</body>
</html>
"""
open(os.path.join(base,"public","index.php"),"w",encoding="utf-8").write(index_php)
