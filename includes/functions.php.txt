functions_php = """<?php require_once DIR.'/../config.php';

function get_products(){ return db()->query("SELECT * FROM produits ORDER BY id DESC")->fetchAll(); }

function get_product($id){ $st = db()->prepare("SELECT * FROM produits WHERE id=?"); $st->execute([$id]); return $st->fetch(); }

// Panier en session: ['id' => qté] function cart_add($id, $qty=1){ if(!isset($_SESSION['cart'])) $_SESSION['cart'] = []; if(!isset($_SESSION['cart'][$id])) $_SESSION['cart'][$id] = 0; $_SESSION['cart'][$id] += max(1, (int)$qty); }

function cart_set($id, $qty){ if(!isset($_SESSION['cart'])) $_SESSION['cart'] = []; $qty = max(0, (int)$qty); if($qty === 0){ unset($_SESSION['cart'][$id]); } else { $_SESSION['cart'][$id] = $qty; } }

function cart_remove($id){ if(isset($_SESSION['cart'][$id])) unset($_SESSION['cart'][$id]); }

function cart_items(){ $items = []; $total = 0; if(!empty($_SESSION['cart'])){ $ids = array_keys($_SESSION['cart']); $in = implode(',', array_fill(0, count($ids), '?')); $st = db()->prepare("SELECT * FROM produits WHERE id IN ($in)"); $st->execute($ids); $map = []; foreach($st->fetchAll() as $p){ $map[$p['id']] = $p; } foreach($_SESSION['cart'] as $id=>$q){ if(isset($map[$id])){ $p = $map[$id]; $sous = $p['prix'] * $q; $total += $sous; $items[] = ['id'=>$id, 'nom'=>$p['nom'], 'prix'=>$p['prix'], 'image'=>$p['image'], 'quantite'=>$q, 'sous_total'=>$sous]; } } } return [$items, $total]; } ?> """ open(os.path.join(base,"includes","functions.php"),"w",encoding="utf-8").write(functions_php)
