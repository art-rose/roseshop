auth_php = """<?php require_once DIR.'/../config.php';

function require_admin() { if (empty($_SESSION['admin'])) { header('Location: /admin/login.php'); exit; } } ?> """ open(os.path.join(base,"includes","auth.php"),"w",encoding="utf-8").write(auth_php)