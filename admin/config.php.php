config_php = """<?php // ====== CONFIGURATION DE LA BASE DE DONNÉES ====== // Modifiez ces paramètres selon votre hébergement define('DB_HOST', 'localhost'); define('DB_NAME', 'boutique'); define('DB_USER', 'root'); define('DB_PASS', '');

// Nom du site define('SITE_NAME', 'Boutique d'Emballage de Fleurs');

// Démarrer la session (pour panier & admin) if (session_status() === PHP_SESSION_NONE) { session_start(); }

// Fonction PDO function db() { static $pdo = null; if ($pdo === null) { $pdo = new PDO('mysql:host='.DB_HOST.';dbname='.DB_NAME.';charset=utf8mb4', DB_USER, DB_PASS, [ PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION, PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC, ]); } return $pdo; }

// Helpers function euro($n){ return number_format((float)$n, 2, ',', ' ').' €'; } ?> """ open(os.path.join(base,"config.php"),"w",encoding="utf-8").write(config_php)
