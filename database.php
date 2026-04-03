<?php
class Database {
    private static $instance = null;
    private $data = [];
    private $dbFile = 'users.json';
    
    private function __construct() {
        $this->loadData();
    }
    
    public static function getInstance() {
        if (self::$instance === null) {
            self::$instance = new self();
        }
        return self::$instance;
    }
    
    private function loadData() {
        if (file_exists($this->dbFile)) {
            $json = file_get_contents($this->dbFile);
            $this->data = json_decode($json, true) ?? [];
            
            // Initialize access control if not exists
            if (!isset($this->data['access_control'])) {
                $this->data['access_control'] = [];
            }
            if (!isset($this->data['users'])) {
                $this->data['users'] = [];
            }
            if (!isset($this->data['favorites'])) {
                $this->data['favorites'] = [];
            }
            if (!isset($this->data['user_logs'])) {
                $this->data['user_logs'] = [];
            }
        } else {
            $this->data = [
                'users' => [],
                'favorites' => [],
                'access_control' => [],
                'user_logs' => []
            ];
        }
        $this->saveData();
    }
    
    private function saveData() {
        $json = json_encode($this->data, JSON_PRETTY_PRINT);
        file_put_contents($this->dbFile, $json);
    }
    
    // User management
    public function createUser($username, $email, $phone, $password, $privacyAccepted = false) {
        $user = [
            'id' => uniqid('user_', true),
            'username' => $username,
            'email' => $email,
            'phone' => $phone,
            'password' => password_hash($password, PASSWORD_DEFAULT),
            'privacy_accepted' => $privacyAccepted,
            'is_admin' => false,
            'created_at' => date('Y-m-d H:i:s'),
            'last_login' => null,
            'last_activity' => null,
            'last_logout' => null,
            'login_count' => 0,
            'current_page' => 33,
            'favorites' => [],
            'favorites_data' => '[]',
            'is_active' => true,
            'access_allowed' => true,
            'home_page' => 'index.php'  // default home
        ];
        
        $this->data['users'][] = $user;
        $this->saveData();
        
        // Add to access control
        $this->data['access_control'][$user['id']] = 'allow';
        $this->saveData();
        
        return $user;
    }
    
    public function findUserById($id) {
        foreach ($this->data['users'] as $user) {
            if ($user['id'] === $id) {
                return $user;
            }
        }
        return null;
    }
    
    public function findUserByUsernameOrEmail($usernameOrEmail) {
        foreach ($this->data['users'] as $user) {
            if ($user['username'] === $usernameOrEmail || $user['email'] === $usernameOrEmail) {
                return $user;
            }
        }
        return null;
    }
    
    public function updateUser($userId, $data) {
        foreach ($this->data['users'] as &$user) {
            if ($user['id'] === $userId) {
                $user = array_merge($user, $data);
                $this->saveData();
                return true;
            }
        }
        return false;
    }
    
    public function getAllUsers() {
        return $this->data['users'];
    }
    
    // Access control management
    public function getUserAccess($userId) {
        return $this->data['access_control'][$userId] ?? 'allow';
    }
    
    public function setUserAccess($userId, $status) {
        $this->data['access_control'][$userId] = $status;
        
        // Update user status as well
        foreach ($this->data['users'] as &$user) {
            if ($user['id'] === $userId) {
                $user['access_allowed'] = ($status === 'allow');
                break;
            }
        }
        
        $this->saveData();
        return true;
    }
    
    public function canUserAccess($userId) {
        $access = $this->getUserAccess($userId);
        return $access === 'allow';
    }
    
    // Update last activity
    public function updateLastActivity($userId) {
        foreach ($this->data['users'] as &$user) {
            if ($user['id'] === $userId) {
                $user['last_activity'] = date('Y-m-d H:i:s');
                $this->saveData();
                return true;
            }
        }
        return false;
    }
    
    // Get users filtered by last activity
    public function getUsersByLastActivity($filter) {
        $users = $this->data['users'];
        $now = time();
        
        switch ($filter) {
            case 'today':
                $threshold = strtotime('today midnight');
                break;
            case 'yesterday':
                $threshold = strtotime('yesterday midnight');
                $end = strtotime('today midnight') - 1;
                break;
            case '3days':
                $threshold = strtotime('-3 days midnight');
                break;
            case '5days':
                $threshold = strtotime('-5 days midnight');
                break;
            case 'week':
                $threshold = strtotime('-1 week midnight');
                break;
            case 'older':
                // older than a week
                $threshold = strtotime('-1 week midnight');
                return array_filter($users, function($u) use ($threshold) {
                    $last = isset($u['last_activity']) ? strtotime($u['last_activity']) : 0;
                    return $last < $threshold;
                });
            default:
                return $users;
        }
        
        if ($filter === 'yesterday') {
            return array_filter($users, function($u) use ($threshold, $end) {
                $last = isset($u['last_activity']) ? strtotime($u['last_activity']) : 0;
                return $last >= $threshold && $last <= $end;
            });
        } else {
            return array_filter($users, function($u) use ($threshold) {
                $last = isset($u['last_activity']) ? strtotime($u['last_activity']) : 0;
                return $last >= $threshold;
            });
        }
    }
    
    // Password management
    public function changePassword($userId, $newPassword) {
        return $this->updateUser($userId, [
            'password' => password_hash($newPassword, PASSWORD_DEFAULT),
            'password_changed_at' => date('Y-m-d H:i:s')
        ]);
    }
    
    // Log management
    public function addUserLog($userId, $action, $details = '') {
        if (!isset($this->data['user_logs'][$userId])) {
            $this->data['user_logs'][$userId] = [];
        }
        
        $log = [
            'id' => uniqid('log_', true),
            'action' => $action,
            'details' => $details,
            'timestamp' => date('Y-m-d H:i:s'),
            'ip' => $_SERVER['REMOTE_ADDR'] ?? 'Unknown'
        ];
        
        array_unshift($this->data['user_logs'][$userId], $log);
        
        // Keep only last 50 logs per user
        if (count($this->data['user_logs'][$userId]) > 50) {
            $this->data['user_logs'][$userId] = array_slice($this->data['user_logs'][$userId], 0, 50);
        }
        
        $this->saveData();
        return $log;
    }
    
    public function getUserLogs($userId, $limit = 20) {
        $logs = $this->data['user_logs'][$userId] ?? [];
        return array_slice($logs, 0, $limit);
    }
    
    // Page management
    public function getUserPage($userId) {
        $user = $this->findUserById($userId);
        return $user['current_page'] ?? 33;
    }
    
    public function saveUserPage($userId, $page) {
        return $this->updateUser($userId, ['current_page' => $page]);
    }
    
    // Favorites management
    public function addFavorite($userId, $pdfPage, $place, $page) {
        foreach ($this->data['users'] as &$user) {
            if ($user['id'] === $userId) {
                $favorite = [
                    'id' => uniqid('fav_', true),
                    'pdf_page' => $pdfPage,
                    'place' => $place,
                    'page' => $page,
                    'added_at' => date('Y-m-d H:i:s')
                ];
                
                $user['favorites'][] = $favorite;
                
                // Also update favorites_data for backward compatibility
                $favId = "page_{$pdfPage}";
                $favoritesData = json_decode($user['favorites_data'] ?? '[]', true) ?: [];
                if (!in_array($favId, $favoritesData)) {
                    $favoritesData[] = $favId;
                    $user['favorites_data'] = json_encode($favoritesData);
                }
                
                $this->saveData();
                
                // Add log
                $this->addUserLog($userId, 'add_favorite', "Added favorite: {$place} (Page {$page})");
                
                return $favorite;
            }
        }
        return null;
    }
    
    public function removeFavorite($userId, $favoriteId) {
        foreach ($this->data['users'] as &$user) {
            if ($user['id'] === $userId) {
                // Remove from favorites array
                foreach ($user['favorites'] as $key => $fav) {
                    if ($fav['id'] === $favoriteId) {
                        $place = $fav['place'];
                        array_splice($user['favorites'], $key, 1);
                        
                        // Also update favorites_data
                        $favId = "page_{$fav['pdf_page']}";
                        $favoritesData = json_decode($user['favorites_data'] ?? '[]', true) ?: [];
                        $index = array_search($favId, $favoritesData);
                        if ($index !== false) {
                            array_splice($favoritesData, $index, 1);
                            $user['favorites_data'] = json_encode($favoritesData);
                        }
                        
                        $this->saveData();
                        
                        // Add log
                        $this->addUserLog($userId, 'remove_favorite', "Removed favorite: {$place}");
                        
                        return true;
                    }
                }
            }
        }
        return false;
    }
    
    public function getUserFavorites($userId) {
        $user = $this->findUserById($userId);
        return $user ? ($user['favorites'] ?? []) : [];
    }
    
    public function getUserFavoritesData($userId) {
        $user = $this->findUserById($userId);
        if ($user && isset($user['favorites_data'])) {
            return json_decode($user['favorites_data'], true) ?: [];
        }
        return [];
    }
    
    public function saveUserFavoritesData($userId, $favorites) {
        return $this->updateUser($userId, [
            'favorites_data' => json_encode($favorites)
        ]);
    }
    
    // Initialize admin user if not exists
    public function initializeAdmin() {
        $adminUsername = 'khatrihamza';
        $adminEmail = 'khatrihamzaofficial@gmail.com';
        $adminPassword = '0mnsawh1';
        
        $admin = $this->findUserByUsernameOrEmail($adminUsername);
        if (!$admin) {
            $user = $this->createUser(
                $adminUsername,
                $adminEmail,
                '7433993005',
                $adminPassword,
                true
            );
            
            // Make the admin user an admin
            foreach ($this->data['users'] as &$user) {
                if ($user['username'] === $adminUsername) {
                    $user['is_admin'] = true;
                    $user['created_at'] = '2024-01-01 00:00:00'; // Set earlier date for admin
                    break;
                }
            }
            
            // Set admin access to allow
            $this->data['access_control'][$user['id']] = 'allow';
            $this->saveData();
        }
    }
    
    // Get user activity stats
    public function getUserActivityStats($userId) {
        $user = $this->findUserById($userId);
        if (!$user) return null;
        
        $logs = $this->getUserLogs($userId, 100);
        
        $loginCount = $user['login_count'] ?? 0;
        $favoriteCount = count($user['favorites'] ?? []);
        
        // Calculate average session duration
        $sessionDurations = [];
        $lastLogin = null;
        
        foreach ($logs as $log) {
            if ($log['action'] === 'login') {
                $lastLogin = strtotime($log['timestamp']);
            } elseif ($log['action'] === 'logout' && $lastLogin) {
                $logoutTime = strtotime($log['timestamp']);
                $sessionDurations[] = $logoutTime - $lastLogin;
                $lastLogin = null;
            }
        }
        
        $avgSessionDuration = 0;
        if (!empty($sessionDurations)) {
            $avgSessionDuration = array_sum($sessionDurations) / count($sessionDurations);
        }
        
        return [
            'login_count' => $loginCount,
            'favorite_count' => $favoriteCount,
            'avg_session_duration' => $avgSessionDuration,
            'last_active' => $user['last_activity'] ?? 'Never',
            'account_age' => round((time() - strtotime($user['created_at'])) / (60 * 60 * 24)) // in days
        ];
    }
}
?>