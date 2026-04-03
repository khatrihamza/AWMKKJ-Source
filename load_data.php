<?php
session_start();

if (!isset($_SESSION['user_id'])) {
    header('HTTP/1.1 401 Unauthorized');
    echo json_encode(['success' => false, 'error' => 'Not authenticated']);
    exit();
}

require_once 'database.php';

header('Content-Type: application/json');

$db = Database::getInstance();
$userId = $_SESSION['user_id'];
$user = $db->findUserById($userId);

if (!$user) {
    echo json_encode(['success' => false, 'error' => 'User not found']);
    exit();
}

$data = [
    'success' => true,
    'page' => $db->getUserPage($userId),
    'favorites' => $db->getUserFavoritesData($userId),
    'totalPages' => 356,
    'user' => [
        'username' => $user['username'],
        'email' => $user['email'],
        'is_admin' => $user['is_admin'] ?? false
    ]

];

echo json_encode($data);
?>