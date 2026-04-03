<?php
session_start();
require_once 'database.php';

// Check if logged in
if (!isset($_SESSION['user_id'])) {
    header('Location: login.php');
    exit();
}

$db = Database::getInstance();
$userId = $_SESSION['user_id'];
$user = $db->findUserById($userId);
if (!$user) {
    session_destroy();
    header('Location: login.php');
    exit();
}

// Update last activity
$db->updateLastActivity($userId);
$db->initializeAdmin();
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>AWMKKJ | Document Viewer</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="css/style.css">
    <script>
        // Pass user data to JavaScript
        const CURRENT_USER = {
            id: '<?php echo $_SESSION['user_id']; ?>',
            username: '<?php echo htmlspecialchars($_SESSION['username']); ?>',
            isAdmin: <?php echo ($_SESSION['is_admin'] ?? false) ? 'true' : 'false'; ?>
        };
        const PHP_DATA = {
            currentPage: <?php echo $user['current_page'] ?? 33; ?>,
            favorites: <?php echo isset($user['favorites_data']) ? $user['favorites_data'] : '[]'; ?>,
            totalPages: 356
        };
    </script>
    <script src="js/main.js"></script>
</head>
<body>
    <!-- Index Page -->
    <div id="index-page">
        <header>
            <div class="hamburger-menu" id="hamburgerBtn">
                <i class="fas fa-bars"></i>
            </div>
            <div class="header-title">
                <i class="fas fa-book-open"></i>
                AWMKKJ Document Viewer
                <span class="user-info">(Welcome, <?php echo htmlspecialchars($_SESSION['username']); ?>)</span>
            </div>
        </header>

        <!-- Side Menu -->
        <div class="side-menu" id="sideMenu">
            <button class="menu-close" id="menuClose"><i class="fas fa-times"></i></button>
            <div class="menu-header"><h3><i class="fas fa-sliders-h"></i> Navigation Menu</h3></div>
            <div class="menu-options">
                <a href="javascript:void(0)" class="menu-option" onclick="openImageViewer()"><i class="fas fa-image"></i><span>Open Image Viewer</span></a>
                <a href="javascript:void(0)" class="menu-option" onclick="showFavoritesPopup()"><i class="fas fa-star"></i><span>My Favorites</span></a>
                <a href="javascript:void(0)" class="menu-option" onclick="showIndexPopup()"><i class="fas fa-list-ol"></i><span>Document Index</span></a>
                <a href="javascript:void(0)" class="menu-option" onclick="showAbout()"><i class="fas fa-info-circle"></i><span>About App</span></a>
                <a href="javascript:void(0)" class="menu-option" onclick="shareApp()"><i class="fas fa-share-alt"></i><span>Share App</span></a>
                <?php if ($_SESSION['is_admin'] ?? false): ?>
                <a href="admin.php" class="menu-option"><i class="fas fa-shield-alt"></i><span>Admin Panel</span></a>
                <?php endif; ?>
                <a href="javascript:void(0)" class="menu-option" id="themeToggleSide" onclick="toggleTheme()"><i class="fas fa-moon"></i><span>Dark Mode</span></a>
                <a href="javascript:void(0)" class="menu-option" onclick="logout()"><i class="fas fa-sign-out-alt"></i><span>Logout</span></a>
            </div>
        </div>

        <!-- Main Content -->
        <div class="container">
            <h1 class="page-title">AWMKKJ Document Index</h1>
            <div class="index-container">
                <div class="state-card">
                    <div class="state-header"><span><i class="fas fa-map-marker-alt"></i> Gujarat Document Index</span><span class="state-count">29 Places</span></div>
                    <div class="index-list" id="gujaratList"></div>
                </div>
                <div class="state-card">
                    <div class="state-header mumbai"><span><i class="fas fa-city"></i> Mumbai Document Index</span><span class="state-count">21 Places</span></div>
                    <div class="index-list" id="mumbaiList"></div>
                </div>
            </div>
            <button class="open-pdf-btn" onclick="openImageViewer()"><i class="fas fa-eye"></i> Open Image Viewer</button>
        </div>

        <!-- Footer -->
        <footer>
            <p class="footer-text">Crafted with <i class="fas fa-heart" style="color: var(--favorite-color); margin: 0 5px;"></i> by <a href="javascript:void(0)" class="developer-name" onclick="showDevPopup()">Hamza Khatri</a></p>
        </footer>
    </div>

    <!-- Image Viewer Page (replaced PDF viewer) -->
    <div id="image-viewer-page" class="pdf-viewer-page">
        <header class="pdf-header">
            <button class="back-arrow" onclick="goToIndexPage()"><i class="fas fa-arrow-left"></i></button>
            <div class="pdf-title"><i class="fas fa-image"></i> AWMKKJ Document Viewer</div>
            <div class="pdf-menu">
                <button class="dots-menu" id="dotsMenuBtn"><i class="fas fa-ellipsis-v"></i></button>
                <div class="dropdown-menu" id="dropdownMenu">
                    <a href="javascript:void(0)" class="dropdown-item" onclick="showIndexPopup()"><i class="fas fa-list-ol"></i><span>Show Index</span></a>
                    <a href="javascript:void(0)" class="dropdown-item" onclick="showFavoritesPopup()"><i class="fas fa-star"></i><span>My Favorites</span></a>
                    <a href="javascript:void(0)" class="dropdown-item" id="themeToggleDropdown" onclick="toggleTheme()"><i class="fas fa-moon"></i><span>Dark Mode</span></a>
                    <a href="javascript:void(0)" class="dropdown-item" onclick="showAbout()"><i class="fas fa-info-circle"></i><span>About</span></a>
                    <a href="javascript:void(0)" class="dropdown-item" onclick="showHelp()"><i class="fas fa-question-circle"></i><span>Help & Shortcuts</span></a>
                </div>
            </div>
        </header>

        <div class="floating-page-indicator">
            <i class="fas fa-image"></i>
            <span id="currentPageDisplay">33</span><span>/</span><span id="totalPagesDisplay">356</span>
        </div>

        <div class="pdf-container">
            <div class="pdf-viewer" id="imageViewer">
                <div class="pdf-loading" id="imageLoading">
                    <div class="spinner"></div>
                    Loading Page <span id="loadingPageNum">33</span>...
                    <p style="margin-top: 10px; font-size: 14px; opacity: 0.7;">Please wait</p>
                </div>
                <div class="pdf-error" id="imageError" style="display:none;">
                    <div class="error-icon"><i class="fas fa-exclamation-triangle"></i></div>
                    <h3>Image Loading Failed</h3>
                    <p>Unable to load page <span id="errorPageNum">33</span>.jpg</p>
                    <p style="font-size: 14px; margin-top: 10px; opacity: 0.8;">
                        Please ensure images are in the "images" folder with format 001.jpg to 356.jpg
                    </p>
                    <button onclick="retryLoadImage()" class="retry-btn"><i class="fas fa-redo"></i> Retry</button>
                </div>
                <div class="pdf-canvas-container" id="imageContainer">
                    <img id="mainImage" class="pdf-canvas" alt="Page" style="max-width: 100%; height: auto;">
                </div>
            </div>
            <div class="nav-overlay">
                <button class="nav-arrow" id="prevPageArrow"><i class="fas fa-chevron-left"></i></button>
                <button class="nav-arrow" id="nextPageArrow"><i class="fas fa-chevron-right"></i></button>
            </div>
        </div>

        <div class="bottom-nav">
            <button class="nav-btn double" id="firstPageBtn"><i class="fas fa-angle-double-left"></i></button>
            <button class="nav-btn" id="prevOneBtn"><i class="fas fa-chevron-left"></i></button>
            <button class="nav-btn heart" id="addFavoriteBtn"><i class="far fa-heart"></i></button>
            <button class="nav-btn" id="nextOneBtn"><i class="fas fa-chevron-right"></i></button>
            <button class="nav-btn double" id="lastPageBtn"><i class="fas fa-angle-double-right"></i></button>
        </div>
    </div>

    <!-- Popups -->
    <div class="popup" id="indexPopup">
        <div class="popup-header"><h2 class="popup-title"><i class="fas fa-list-ol"></i> Document Index</h2><button class="popup-close" onclick="closeIndexPopup()"><i class="fas fa-times"></i></button></div>
        <div class="popup-content"><div class="index-popup-container" id="indexPopupContent"></div></div>
    </div>

    <div class="popup" id="favoritesPopup">
        <div class="popup-header"><h2 class="popup-title"><i class="fas fa-star"></i> Favorite Pages</h2><button class="popup-close" onclick="closeFavoritesPopup()"><i class="fas fa-times"></i></button></div>
        <div class="popup-content"><div class="favorites-list" id="favoritesList"></div></div>
    </div>

    <div class="dev-popup" id="devPopup">
        <div class="dev-popup-content">
            <div class="dev-popup-close" onclick="closeDevPopup()">×</div>
            <img src="https://hostfilebyhamza.rf.gd/uploads/hamza/Image/IMG_20251118_083025.png" alt="Khatri Hamza" class="dev-avatar" onerror="this.src='https://via.placeholder.com/140/8d6e63/FFFFFF?text=HK'">
            <h2 class="dev-name">Khatri Hamza Mustaq</h2>
            <p class="dev-title">🚀 Full Stack Developer</p>
            <div class="dev-contact"><div class="dev-phone"><i class="fas fa-phone"></i> +91 74339 93005</div><div class="dev-email"><i class="fas fa-envelope"></i> khatrihamzaofficial@gmail.com</div></div>
            <div class="dev-social">
                <a href="javascript:void(0)" class="social-icon" onclick="showJoinSoonPopup()"><i class="fab fa-github"></i></a>
                <a href="https://www.linkedin.com/in/khatri-hamza-791933396" class="social-icon" target="_blank"><i class="fab fa-linkedin"></i></a>
                <a href="javascript:void(0)" class="social-icon" onclick="showJoinSoonPopup()"><i class="fab fa-twitter"></i></a>
                <a href="https://www.instagram.com/khatri_hamza_official" class="social-icon" target="_blank"><i class="fab fa-instagram"></i></a>
            </div>
        </div>
    </div>

    <div class="join-popup" id="joinPopup">
        <div class="join-popup-content">
            <div class="join-popup-close" onclick="closeJoinPopup()">×</div>
            <div class="join-icon"><i class="fas fa-hourglass-half"></i></div>
            <h3>Coming Soon!</h3>
            <p>This feature is under development.</p>
        </div>
    </div>
</body>
</html>