<?php
session_start();
require_once 'database.php';

if (isset($_SESSION['user_id'])) {
    header('Location: index.php');
    exit();
}

$db = Database::getInstance();
$error = '';
$success = '';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $username = trim($_POST['username'] ?? '');
    $email = trim($_POST['email'] ?? '');
    $phone = trim($_POST['phone'] ?? '');
    $password = $_POST['password'] ?? '';
    $confirm_password = $_POST['confirm_password'] ?? '';
    $privacyAccepted = isset($_POST['privacy']);
    
    if (empty($username) || empty($email) || empty($password) || empty($phone)) {
        $error = "All fields are required!";
    } elseif (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        $error = "Invalid email format!";
    } elseif ($password !== $confirm_password) {
        $error = "Passwords do not match!";
    } elseif (strlen($password) < 6) {
        $error = "Password must be at least 6 characters!";
    } elseif (!$privacyAccepted) {
        $error = "You must accept the Privacy Policy!";
    } elseif (stripos($username, 'khatri') === false) {
        $error = "You are not acceptable to this page. Contact us at 74339 93005.";
    } else {
        $existing = $db->findUserByUsernameOrEmail($username);
        if ($existing) {
            $error = "Username or email already exists!";
        } else {
            $user = $db->createUser($username, $email, $phone, $password, true);
            if ($user) {
                $success = "Registration successful! Please login.";
                header('refresh:2;url=login.php');
            } else {
                $error = "Registration failed. Please try again.";
            }
        }
    }
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Sign Up - AWMKKJ Document Viewer</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="css/style.css">
</head>
<body class="auth-body">
    <div class="auth-container">
        <div class="auth-header">
            <h1><i class="fas fa-user-plus"></i> Create Account</h1>
            <p>Sign up to access AWMKKJ Document Viewer</p>
        </div>
        <div class="auth-form">
            <?php if ($error): ?>
                <div class="error-message"><i class="fas fa-exclamation-triangle"></i> <?php echo $error; ?></div>
            <?php endif; ?>
            <?php if ($success): ?>
                <div class="success-message"><i class="fas fa-check-circle"></i> <?php echo $success; ?></div>
            <?php endif; ?>
            <form method="POST">
                <div class="form-row">
                    <div class="form-group">
                        <label>Username *</label>
                        <div class="input-with-icon"><i class="fas fa-user"></i><input type="text" name="username" required placeholder="e.g., johnkhatri"></div>
                    </div>
                    <div class="form-group">
                        <label>Email *</label>
                        <div class="input-with-icon"><i class="fas fa-envelope"></i><input type="email" name="email" required placeholder="e.g., john@example.com"></div>
                    </div>
                </div>
                <div class="form-row">
                    <div class="form-group">
                        <label>Phone Number *</label>
                        <div class="input-with-icon"><i class="fas fa-phone"></i><input type="tel" name="phone" required placeholder="e.g., 9876543210"></div>
                    </div>
                    <div class="form-group">
                        <label>Password *</label>
                        <div class="input-with-icon"><i class="fas fa-lock"></i><input type="password" name="password" required placeholder="At least 6 characters"></div>
                    </div>
                </div>
                <div class="form-group">
                    <label>Confirm Password *</label>
                    <div class="input-with-icon"><i class="fas fa-lock"></i><input type="password" name="confirm_password" required placeholder="Confirm your password"></div>
                </div>
                <div class="privacy-policy">
                    <h4><i class="fas fa-shield-alt"></i> Privacy Policy</h4>
                    <p>1. We collect your username, email, phone number, and encrypted password for authentication.<br>2. Your favorites and reading progress are stored securely.<br>3. We do not share your personal data with third parties.<br>4. You can delete your account anytime by contacting admin.<br>5. By signing up, you agree to these terms and conditions.</p>
                </div>
                <div class="checkbox-group">
                    <input type="checkbox" name="privacy" id="privacy" required>
                    <label for="privacy">I have read and agree to the Privacy Policy and Terms of Service</label>
                </div>
                <button type="submit" class="auth-btn"><i class="fas fa-user-plus"></i> Create Account</button>
            </form>
            <div class="auth-link">Already have an account? <a href="login.php">Login here</a></div>
        </div>
    </div>
</body>
</html>