<?php
session_start();
require_once 'database.php';

$db = Database::getInstance();
$error = '';

if (isset($_SESSION['user_id'])) {
    header('Location: index.php');
    exit();
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $usernameOrEmail = trim($_POST['username'] ?? '');
    $password = $_POST['password'] ?? '';
    
    $user = $db->findUserByUsernameOrEmail($usernameOrEmail);
    
    if ($user) {
        if (!$db->canUserAccess($user['id'])) {
            $error = "Access denied by administrator";
        } elseif (password_verify($password, $user['password'])) {
            $_SESSION['user_id'] = $user['id'];
            $_SESSION['username'] = $user['username'];
            $_SESSION['email'] = $user['email'];
            $_SESSION['is_admin'] = $user['is_admin'] ?? false;
            
            $db->updateUser($user['id'], [
                'last_login' => date('Y-m-d H:i:s'),
                'login_count' => ($user['login_count'] ?? 0) + 1
            ]);
            $db->updateLastActivity($user['id']);
            
            $homePage = $user['home_page'] ?? 'index.php';
            header('Location: ' . $homePage);
            exit();
        } else {
            $error = "Invalid credentials!";
        }
    } else {
        $error = "Invalid credentials. Please <a href='signup.php'>create an account</a>.";
    }
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Login - AWMKKJ Document Viewer</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="css/style.css">
</head>
<body class="auth-body">
    <div class="auth-container">
        <div class="auth-header">
            <h1><i class="fas fa-book-open"></i> AWMKKJ Viewer</h1>
            <p>Login to access the document viewer</p>
        </div>
        <div class="auth-form">
            <?php if (!empty($error)): ?>
                <div class="error-message"><i class="fas fa-exclamation-triangle"></i> <?php echo $error; ?></div>
            <?php endif; ?>
            <form method="POST">
                <div class="form-group">
                    <label>Username or Email</label>
                    <div class="input-with-icon"><i class="fas fa-user"></i><input type="text" name="username" required placeholder="Enter username or email"></div>
                </div>
                <div class="form-group">
                    <label>Password</label>
                    <div class="input-with-icon"><i class="fas fa-lock"></i><input type="password" name="password" required placeholder="Enter your password"></div>
                </div>
                <button type="submit" class="auth-btn"><i class="fas fa-sign-in-alt"></i> Login</button>
            </form>
            <div class="auth-link">Don't have an account? <a href="signup.php">Sign up here</a></div>
        </div>
    </div>
</body>
</html>