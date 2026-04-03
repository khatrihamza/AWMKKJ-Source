<?php
session_start();

if (!isset($_SESSION['user_id'])) {
    header('HTTP/1.1 401 Unauthorized');
    echo json_encode(['success' => false, 'error' => 'Not authenticated']);
    exit();
}

require_once 'database.php';

header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    echo json_encode(['success' => false, 'error' => 'Invalid request method']);
    exit();
}

$data = json_decode(file_get_contents('php://input'), true);
$db = Database::getInstance();
$userId = $_SESSION['user_id'];

if (!$data || !isset($data['action'])) {
    echo json_encode(['success' => false, 'error' => 'Invalid data']);
    exit();
}

$response = ['success' => false];

switch ($data['action']) {
    case 'save_page':
        if (isset($data['page'])) {
            $success = $db->saveUserPage($userId, (int)$data['page']);
            $response = ['success' => $success];
        }
        break;
        
    case 'save_favorites':
        if (isset($data['favorites'])) {
            $success = $db->saveUserFavoritesData($userId, $data['favorites']);
            $response = ['success' => $success];
        }
        break;
        
    case 'add_favorite':
        if (isset($data['pdf_page'], $data['place'], $data['page'])) {
            $favorite = $db->addFavorite($userId, $data['pdf_page'], $data['place'], $data['page']);
            $response = ['success' => !!$favorite, 'favorite' => $favorite];
        }
        break;
        
    case 'remove_favorite':
        if (isset($data['favorite_id'])) {
            $success = $db->removeFavorite($userId, $data['favorite_id']);
            $response = ['success' => $success];
        }
        break;
        
    default:
        $response = ['success' => false, 'error' => 'Unknown action'];
}

echo json_encode($response);
?>