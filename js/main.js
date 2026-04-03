// ====== GLOBAL VARIABLES ======
let currentPage = 33;
let totalPages = 356;
let favorites = [];
let isImageViewerOpen = false;
let isDarkMode = localStorage.getItem('awmkkj-dark-mode') === 'true';

// ====== MANUAL IMAGE PATHS ARRAY - YOU ADD ALL 356 PATHS HERE ======
// Format: images/001.jpg, images/002.jpg, images/003.jpg, ... images/356.jpg
const imagePaths = [
    "", // index 0 (not used)
    "images/001.jpg",
    "images/002.jpg",
    "images/003.jpg",
    "images/004.jpg",
    "images/005.jpg",
    "images/006.jpg",
    "images/007.jpg",
    "images/008.jpg",
    "images/009.jpg",
    "images/010.jpg",
    "images/011.jpg",
    "images/012.jpg",
    "images/013.jpg",
    "images/014.jpg",
    "images/015.jpg",
    "images/016.jpg",
    "images/017.jpg",
    "images/018.jpg",
    "images/019.jpg",
    "images/020.jpg",
    "images/021.jpg",
    "images/022.jpg",
    "images/023.jpg",
    "images/024.jpg",
    "images/025.jpg",
    "images/026.jpg",
    "images/027.jpg",
    "images/028.jpg",
    "images/029.jpg",
    "images/030.jpg",
    "images/031.jpg",
    "images/032.jpg",
    "images/033.jpg",
    "images/034.jpg",
    "images/035.jpg",
    "images/036.jpg",
    "images/037.jpg",
    "images/038.jpg",
    "images/039.jpg",
    "images/040.jpg",
    "images/041.jpg",
    "images/042.jpg",
    "images/043.jpg",
    "images/044.jpg",
    "images/045.jpg",
    "images/046.jpg",
    "images/047.jpg",
    "images/048.jpg",
    "images/049.jpg",
    "images/050.jpg",
    "images/051.jpg",
    "images/052.jpg",
    "images/053.jpg",
    "images/054.jpg",
    "images/055.jpg",
    "images/056.jpg",
    "images/057.jpg",
    "images/058.jpg",
    "images/059.jpg",
    "images/060.jpg",
    "images/061.jpg",
    "images/062.jpg",
    "images/063.jpg",
    "images/064.jpg",
    "images/065.jpg",
    "images/066.jpg",
    "images/067.jpg",
    "images/068.jpg",
    "images/069.jpg",
    "images/070.jpg",
    "images/071.jpg",
    "images/072.jpg",
    "images/073.jpg",
    "images/074.jpg",
    "images/075.jpg",
    "images/076.jpg",
    "images/077.jpg",
    "images/078.jpg",
    "images/079.jpg",
    "images/080.jpg",
    "images/081.jpg",
    "images/082.jpg",
    "images/083.jpg",
    "images/084.jpg",
    "images/085.jpg",
    "images/086.jpg",
    "images/087.jpg",
    "images/088.jpg",
    "images/089.jpg",
    "images/090.jpg",
    "images/091.jpg",
    "images/092.jpg",
    "images/093.jpg",
    "images/094.jpg",
    "images/095.jpg",
    "images/096.jpg",
    "images/097.jpg",
    "images/098.jpg",
    "images/099.jpg",
    "images/100.jpg",
    "images/101.jpg",
    "images/102.jpg",
    "images/103.jpg",
    "images/104.jpg",
    "images/105.jpg",
    "images/106.jpg",
    "images/107.jpg",
    "images/108.jpg",
    "images/109.jpg",
    "images/110.jpg",
    "images/111.jpg",
    "images/112.jpg",
    "images/113.jpg",
    "images/114.jpg",
    "images/115.jpg",
    "images/116.jpg",
    "images/117.jpg",
    "images/118.jpg",
    "images/119.jpg",
    "images/120.jpg",
    "images/121.jpg",
    "images/122.jpg",
    "images/123.jpg",
    "images/124.jpg",
    "images/125.jpg",
    "images/126.jpg",
    "images/127.jpg",
    "images/128.jpg",
    "images/129.jpg",
    "images/130.jpg",
    "images/131.jpg",
    "images/132.jpg",
    "images/133.jpg",
    "images/134.jpg",
    "images/135.jpg",
    "images/136.jpg",
    "images/137.jpg",
    "images/138.jpg",
    "images/139.jpg",
    "images/140.jpg",
    "images/141.jpg",
    "images/142.jpg",
    "images/143.jpg",
    "images/144.jpg",
    "images/145.jpg",
    "images/146.jpg",
    "images/147.jpg",
    "images/148.jpg",
    "images/149.jpg",
    "images/150.jpg",
    "images/151.jpg",
    "images/152.jpg",
    "images/153.jpg",
    "images/154.jpg",
    "images/155.jpg",
    "images/156.jpg",
    "images/157.jpg",
    "images/158.jpg",
    "images/159.jpg",
    "images/160.jpg",
    "images/161.jpg",
    "images/162.jpg",
    "images/163.jpg",
    "images/164.jpg",
    "images/165.jpg",
    "images/166.jpg",
    "images/167.jpg",
    "images/168.jpg",
    "images/169.jpg",
    "images/170.jpg",
    "images/171.jpg",
    "images/172.jpg",
    "images/173.jpg",
    "images/174.jpg",
    "images/175.jpg",
    "images/176.jpg",
    "images/177.jpg",
    "images/178.jpg",
    "images/179.jpg",
    "images/180.jpg",
    "images/181.jpg",
    "images/182.jpg",
    "images/183.jpg",
    "images/184.jpg",
    "images/185.jpg",
    "images/186.jpg",
    "images/187.jpg",
    "images/188.jpg",
    "images/189.jpg",
    "images/190.jpg",
    "images/191.jpg",
    "images/192.jpg",
    "images/193.jpg",
    "images/194.jpg",
    "images/195.jpg",
    "images/196.jpg",
    "images/197.jpg",
    "images/198.jpg",
    "images/199.jpg",
    "images/200.jpg",
    "images/201.jpg",
    "images/202.jpg",
    "images/203.jpg",
    "images/204.jpg",
    "images/205.jpg",
    "images/206.jpg",
    "images/207.jpg",
    "images/208.jpg",
    "images/209.jpg",
    "images/210.jpg",
    "images/211.jpg",
    "images/212.jpg",
    "images/213.jpg",
    "images/214.jpg",
    "images/215.jpg",
    "images/216.jpg",
    "images/217.jpg",
    "images/218.jpg",
    "images/219.jpg",
    "images/220.jpg",
    "images/221.jpg",
    "images/222.jpg",
    "images/223.jpg",
    "images/224.jpg",
    "images/225.jpg",
    "images/226.jpg",
    "images/227.jpg",
    "images/228.jpg",
    "images/229.jpg",
    "images/230.jpg",
    "images/231.jpg",
    "images/232.jpg",
    "images/233.jpg",
    "images/234.jpg",
    "images/235.jpg",
    "images/236.jpg",
    "images/237.jpg",
    "images/238.jpg",
    "images/239.jpg",
    "images/240.jpg",
    "images/241.jpg",
    "images/242.jpg",
    "images/243.jpg",
    "images/244.jpg",
    "images/245.jpg",
    "images/246.jpg",
    "images/247.jpg",
    "images/248.jpg",
    "images/249.jpg",
    "images/250.jpg",
    "images/251.jpg",
    "images/252.jpg",
    "images/253.jpg",
    "images/254.jpg",
    "images/255.jpg",
    "images/256.jpg",
    "images/257.jpg",
    "images/258.jpg",
    "images/259.jpg",
    "images/260.jpg",
    "images/261.jpg",
    "images/262.jpg",
    "images/263.jpg",
    "images/264.jpg",
    "images/265.jpg",
    "images/266.jpg",
    "images/267.jpg",
    "images/268.jpg",
    "images/269.jpg",
    "images/270.jpg",
    "images/271.jpg",
    "images/272.jpg",
    "images/273.jpg",
    "images/274.jpg",
    "images/275.jpg",
    "images/276.jpg",
    "images/277.jpg",
    "images/278.jpg",
    "images/279.jpg",
    "images/280.jpg",
    "images/281.jpg",
    "images/282.jpg",
    "images/283.jpg",
    "images/284.jpg",
    "images/285.jpg",
    "images/286.jpg",
    "images/287.jpg",
    "images/288.jpg",
    "images/289.jpg",
    "images/290.jpg",
    "images/291.jpg",
    "images/292.jpg",
    "images/293.jpg",
    "images/294.jpg",
    "images/295.jpg",
    "images/296.jpg",
    "images/297.jpg",
    "images/298.jpg",
    "images/299.jpg",
    "images/300.jpg",
    "images/301.jpg",
    "images/302.jpg",
    "images/303.jpg",
    "images/304.jpg",
    "images/305.jpg",
    "images/306.jpg",
    "images/307.jpg",
    "images/308.jpg",
    "images/309.jpg",
    "images/310.jpg",
    "images/311.jpg",
    "images/312.jpg",
    "images/313.jpg",
    "images/314.jpg",
    "images/315.jpg",
    "images/316.jpg",
    "images/317.jpg",
    "images/318.jpg",
    "images/319.jpg",
    "images/320.jpg",
    "images/321.jpg",
    "images/322.jpg",
    "images/323.jpg",
    "images/324.jpg",
    "images/325.jpg",
    "images/326.jpg",
    "images/327.jpg",
    "images/328.jpg",
    "images/329.jpg",
    "images/330.jpg",
    "images/331.jpg",
    "images/332.jpg",
    "images/333.jpg",
    "images/334.jpg",
    "images/335.jpg",
    "images/336.jpg",
    "images/337.jpg",
    "images/338.jpg",
    "images/339.jpg",
    "images/340.jpg",
    "images/341.jpg",
    "images/342.jpg",
    "images/343.jpg",
    "images/344.jpg",
    "images/345.jpg",
    "images/346.jpg",
    "images/347.jpg",
    "images/348.jpg",
    "images/349.jpg",
    "images/350.jpg",
    "images/351.jpg",
    "images/352.jpg",
    "images/353.jpg",
    "images/354.jpg",
    "images/355.jpg",
    "images/356.jpg"
];

// Function to get image path from page number
function getImagePath(page) {
    if (page >= 1 && page <= totalPages && imagePaths[page]) {
        return imagePaths[page];
    }
    return null;
}

// ====== INDEX DATA ======
const gujaratIndex = [
    { sr: 1, place: "Aadesar", page: "1", pdfPage: 33 },
    { sr: 2, place: "Gagodar", page: "2", pdfPage: 34 },
    { sr: 3, place: "Rapar", page: "5 to 14", pdfPage: 37 },
    { sr: 4, place: "Suvai", page: "15 - 16", pdfPage: 47 },
    { sr: 5, place: "Lakadiya", page: "18 to 20", pdfPage: 50 },
    { sr: 6, place: "Aadhoi", page: "21", pdfPage: 53 },
    { sr: 7, place: "Samkhiyali", page: "23 to 36", pdfPage: 55 },
    { sr: 8, place: "Vaandhiya", page: "36-A to 37", pdfPage: 69 },
    { sr: 9, place: "Bhachau", page: "38 to 87", pdfPage: 72 },
    { sr: 10, place: "Chhadvaara", page: "89", pdfPage: 122 },
    { sr: 11, place: "Manfara", page: "90", pdfPage: 123 },
    { sr: 12, place: "Gandhidham - Adipur", page: "91 to 96", pdfPage: 124 },
    { sr: 13, place: "Anjar", page: "97 to 112", pdfPage: 130 },
    { sr: 14, place: "Dhamadka", page: "113 to 115", pdfPage: 146 },
    { sr: 15, place: "Bhuj", page: "117 to 180", pdfPage: 150 },
    { sr: 16, place: "Madhapar", page: "181", pdfPage: 214 },
    { sr: 17, place: "Naranpar", page: "183", pdfPage: 216 },
    { sr: 18, place: "Ajarakhpur", page: "185 to 218", pdfPage: 218 },
    { sr: 19, place: "Radhanpur", page: "219 - 220", pdfPage: 252 },
    { sr: 20, place: "Chhapi", page: "221 to 223", pdfPage: 254 },
    { sr: 21, place: "Bhaalak", page: "224 - 225", pdfPage: 257 },
    { sr: 22, place: "Mahesana", page: "226 to 231", pdfPage: 259 },
    { sr: 23, place: "Palanpur", page: "232 to 234", pdfPage: 265 },
    { sr: 24, place: "Ahmedabad", page: "235", pdfPage: 268 },
    { sr: 25, place: "Surat", page: "236", pdfPage: 269 },
    { sr: 26, place: "Morbi", page: "237 - 238", pdfPage: 270 },
    { sr: 27, place: "Rajkot", page: "239 - 240", pdfPage: 272 },
    { sr: 28, place: "Jamnagar", page: "241 to 243", pdfPage: 274 },
    { sr: 29, place: "Vapi", page: "244 to 251", pdfPage: 277 }
];

const mumbaiIndex = [
    { sr: 1, place: "Adesar", page: "253", pdfPage: 286 },
    { sr: 2, place: "Varahi", page: "254-255", pdfPage: 287 },
    { sr: 3, place: "Mahesana", page: "255", pdfPage: 288 },
    { sr: 4, place: "Gagodar", page: "256 To 259", pdfPage: 289 },
    { sr: 5, place: "Kidiyanagar", page: "259", pdfPage: 292 },
    { sr: 6, place: "Pragpar", page: "260", pdfPage: 293 },
    { sr: 7, place: "Rapar", page: "261 To 269", pdfPage: 294 },
    { sr: 8, place: "Trambo", page: "270", pdfPage: 303 },
    { sr: 9, place: "Suvai", page: "270-271", pdfPage: 303 },
    { sr: 10, place: "Ramvav", page: "272 To 274", pdfPage: 305 },
    { sr: 11, place: "Lakadiya", page: "276 To 283", pdfPage: 309 },
    { sr: 12, place: "Shikarpur", page: "284 To 290", pdfPage: 317 },
    { sr: 13, place: "Vandhiya", page: "292 To 297", pdfPage: 325 },
    { sr: 14, place: "Samakhiyali", page: "297 To 303", pdfPage: 330 },
    { sr: 15, place: "Chhadwara", page: "304 To 306", pdfPage: 337 },
    { sr: 16, place: "Vondh", page: "307 To 313", pdfPage: 340 },
    { sr: 17, place: "Bharudiya", page: "314-315", pdfPage: 347 },
    { sr: 18, place: "Manfara", page: "316", pdfPage: 349 },
    { sr: 19, place: "Chobari", page: "317 To 321", pdfPage: 350 },
    { sr: 20, place: "Chirai", page: "322", pdfPage: 355 },
    { sr: 21, place: "Important Notes", page: "324", pdfPage: 357 }
];

// ====== INITIALIZATION ======
document.addEventListener('DOMContentLoaded', function() {
    console.log("DOM loaded, initializing...");
    initTheme();
    setupEventListeners();
    renderIndexLists();
    createConfirmationPopup();
    loadUserData();
});

function initTheme() {
    if (isDarkMode) {
        document.body.classList.add('dark-theme');
    }
    updateThemeToggleText();
}

function updateThemeToggleText() {
    const toggles = document.querySelectorAll('#themeToggleSide, #themeToggleDropdown');
    toggles.forEach(el => {
        if (el) {
            el.innerHTML = isDarkMode ? 
                '<i class="fas fa-sun"></i><span>Light Mode</span>' : 
                '<i class="fas fa-moon"></i><span>Dark Mode</span>';
        }
    });
}

function setupEventListeners() {
    console.log("Setting up event listeners...");
    
    // Hamburger menu
    const hamburger = document.getElementById('hamburgerBtn');
    const menuClose = document.getElementById('menuClose');
    if (hamburger) hamburger.addEventListener('click', openSideMenu);
    if (menuClose) menuClose.addEventListener('click', closeSideMenu);

    // Theme toggle
    const themeToggleSide = document.getElementById('themeToggleSide');
    const themeToggleDropdown = document.getElementById('themeToggleDropdown');
    if (themeToggleSide) themeToggleSide.addEventListener('click', toggleTheme);
    if (themeToggleDropdown) themeToggleDropdown.addEventListener('click', toggleTheme);

    // Dots menu
    const dotsBtn = document.getElementById('dotsMenuBtn');
    const dropdown = document.getElementById('dropdownMenu');
    if (dotsBtn) {
        dotsBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            dropdown.classList.toggle('show');
        });
    }

    // Close menus on outside click
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.pdf-menu')) {
            const dropdown = document.getElementById('dropdownMenu');
            if (dropdown) dropdown.classList.remove('show');
        }
        if (!e.target.closest('.side-menu') && !e.target.closest('.hamburger-menu')) {
            closeSideMenu();
        }
    });

    // Navigation buttons
    const prevArrow = document.getElementById('prevPageArrow');
    const nextArrow = document.getElementById('nextPageArrow');
    const firstBtn = document.getElementById('firstPageBtn');
    const lastBtn = document.getElementById('lastPageBtn');
    const prevOne = document.getElementById('prevOneBtn');
    const nextOne = document.getElementById('nextOneBtn');
    const favBtn = document.getElementById('addFavoriteBtn');

    if (prevArrow) prevArrow.addEventListener('click', () => goToPage(currentPage - 1));
    if (nextArrow) nextArrow.addEventListener('click', () => goToPage(currentPage + 1));
    if (firstBtn) firstBtn.addEventListener('click', () => goToPage(1));
    if (lastBtn) lastBtn.addEventListener('click', () => goToPage(totalPages));
    if (prevOne) prevOne.addEventListener('click', () => goToPage(currentPage - 1));
    if (nextOne) nextOne.addEventListener('click', () => goToPage(currentPage + 1));
    if (favBtn) favBtn.addEventListener('click', toggleCurrentFavorite);

    // Keyboard shortcuts
    document.addEventListener('keydown', handleKeyboard);
}

function handleKeyboard(e) {
    if (!isImageViewerOpen) return;
    switch(e.key) {
        case 'ArrowLeft': e.preventDefault(); goToPage(currentPage - 1); break;
        case 'ArrowRight': e.preventDefault(); goToPage(currentPage + 1); break;
        case 'Home': e.preventDefault(); goToPage(1); break;
        case 'End': e.preventDefault(); goToPage(totalPages); break;
        case 'Escape': closeAllPopups(); break;
        case 'f':
        case 'F':
            if (e.ctrlKey) { e.preventDefault(); toggleCurrentFavorite(); }
            break;
    }
}

// ====== SIDE MENU ======
function openSideMenu() {
    const sideMenu = document.getElementById('sideMenu');
    if (sideMenu) sideMenu.classList.add('show');
}

function closeSideMenu() {
    const sideMenu = document.getElementById('sideMenu');
    if (sideMenu) sideMenu.classList.remove('show');
}

// ====== THEME ======
function toggleTheme() {
    isDarkMode = !isDarkMode;
    localStorage.setItem('awmkkj-dark-mode', isDarkMode);
    document.body.classList.toggle('dark-theme', isDarkMode);
    updateThemeToggleText();
    showNotification(isDarkMode ? "Dark Mode Enabled" : "Light Mode Enabled");
}

// ====== RENDER INDEX LISTS ======
function renderIndexLists() {
    console.log("Rendering index lists...");
    
    const gujaratList = document.getElementById('gujaratList');
    const mumbaiList = document.getElementById('mumbaiList');
    
    if (!gujaratList || !mumbaiList) {
        console.error("Index list elements not found!");
        return;
    }

    gujaratList.innerHTML = '';
    gujaratIndex.forEach((item, index) => {
        const itemEl = document.createElement('div');
        itemEl.className = 'index-item';
        itemEl.style.animationDelay = `${index * 0.05}s`;
        itemEl.innerHTML = `
            <div class="item-sr">${item.sr}.</div>
            <div class="item-place">${item.place}</div>
            <div class="item-page">Page ${item.page}</div>
        `;
        itemEl.addEventListener('click', () => {
            currentPage = item.pdfPage;
            saveCurrentPage();
            openImageViewer();
        });
        gujaratList.appendChild(itemEl);
    });

    mumbaiList.innerHTML = '';
    mumbaiIndex.forEach((item, index) => {
        const itemEl = document.createElement('div');
        itemEl.className = 'index-item';
        itemEl.style.animationDelay = `${index * 0.05}s`;
        itemEl.innerHTML = `
            <div class="item-sr">${item.sr}.</div>
            <div class="item-place">${item.place}</div>
            <div class="item-page">Page ${item.page}</div>
        `;
        itemEl.addEventListener('click', () => {
            currentPage = item.pdfPage;
            saveCurrentPage();
            openImageViewer();
        });
        mumbaiList.appendChild(itemEl);
    });
}

// ====== IMAGE VIEWER FUNCTIONS ======
function openImageViewer() {
    console.log("Opening image viewer, page:", currentPage);
    
    const indexPage = document.getElementById('index-page');
    const imageViewerPage = document.getElementById('image-viewer-page');
    
    if (indexPage) indexPage.style.display = 'none';
    if (imageViewerPage) imageViewerPage.style.display = 'flex';
    
    isImageViewerOpen = true;
    closeSideMenu();
    loadImage();
}

function goToIndexPage() {
    console.log("Going back to index page");
    
    isImageViewerOpen = false;
    
    const indexPage = document.getElementById('index-page');
    const imageViewerPage = document.getElementById('image-viewer-page');
    const dropdown = document.getElementById('dropdownMenu');
    
    if (indexPage) indexPage.style.display = 'block';
    if (imageViewerPage) imageViewerPage.style.display = 'none';
    if (dropdown) dropdown.classList.remove('show');
    
    const loading = document.getElementById('imageLoading');
    const error = document.getElementById('imageError');
    
    if (loading) loading.style.display = 'none';
    if (error) error.style.display = 'none';
}

function loadImage() {
    console.log("Loading image for page:", currentPage);
    
    const mainImage = document.getElementById('mainImage');
    const imageContainer = document.getElementById('imageContainer');
    const loading = document.getElementById('imageLoading');
    const error = document.getElementById('imageError');
    const loadingPageNum = document.getElementById('loadingPageNum');
    const errorPageNum = document.getElementById('errorPageNum');
    
    if (!mainImage) {
        console.error("mainImage element not found!");
        return;
    }
    
    mainImage.classList.remove('loaded');
    mainImage.style.opacity = '0';
    
    if (loadingPageNum) loadingPageNum.textContent = currentPage;
    if (errorPageNum) errorPageNum.textContent = currentPage;
    
    if (loading) loading.style.display = 'block';
    if (error) error.style.display = 'none';
    if (imageContainer) imageContainer.style.display = 'none';
    
    const imagePath = getImagePath(currentPage);
    
    if (!imagePath) {
        console.error("No image path for page:", currentPage);
        if (loading) loading.style.display = 'none';
        if (error) error.style.display = 'block';
        return;
    }
    
    console.log("Loading image from:", imagePath);
    
    const img = new Image();
    
    img.onload = function() {
        console.log("Image loaded successfully:", imagePath);
        mainImage.src = imagePath;
        mainImage.classList.add('loaded');
        mainImage.style.opacity = '1';
        if (loading) loading.style.display = 'none';
        if (imageContainer) imageContainer.style.display = 'flex';
        centerImage();
        updatePageInfo();
        updateNavigationButtons();
        updateFavoriteButton();
        saveCurrentPage();
        preloadNeighbors();
    };
    
    img.onerror = function() {
        console.error('Error loading image:', imagePath);
        if (loading) loading.style.display = 'none';
        if (error) error.style.display = 'block';
    };
    
    img.src = imagePath;
}

function retryLoadImage() {
    const error = document.getElementById('imageError');
    if (error) error.style.display = 'none';
    loadImage();
}

function centerImage() {
    const container = document.getElementById('imageContainer');
    const image = document.getElementById('mainImage');
    if (container) {
        container.style.display = 'flex';
        container.style.justifyContent = 'center';
        container.style.alignItems = 'center';
    }
    if (image) {
        image.style.maxWidth = '100%';
        image.style.maxHeight = 'calc(100vh - 150px)';
        image.style.width = 'auto';
        image.style.height = 'auto';
    }
}

function preloadNeighbors() {
    if (currentPage < totalPages) {
        const nextPath = getImagePath(currentPage + 1);
        if (nextPath) {
            const nextImg = new Image();
            nextImg.src = nextPath;
        }
    }
    if (currentPage > 1) {
        const prevPath = getImagePath(currentPage - 1);
        if (prevPath) {
            const prevImg = new Image();
            prevImg.src = prevPath;
        }
    }
}

function updatePageInfo() {
    const currentDisplay = document.getElementById('currentPageDisplay');
    const totalDisplay = document.getElementById('totalPagesDisplay');
    if (currentDisplay) currentDisplay.textContent = currentPage;
    if (totalDisplay) totalDisplay.textContent = totalPages;
}

function updateNavigationButtons() {
    const prevDisabled = currentPage <= 1;
    const nextDisabled = currentPage >= totalPages;
    
    const prevArrow = document.getElementById('prevPageArrow');
    const nextArrow = document.getElementById('nextPageArrow');
    const firstBtn = document.getElementById('firstPageBtn');
    const lastBtn = document.getElementById('lastPageBtn');
    const prevOne = document.getElementById('prevOneBtn');
    const nextOne = document.getElementById('nextOneBtn');
    
    if (prevArrow) prevArrow.disabled = prevDisabled;
    if (nextArrow) nextArrow.disabled = nextDisabled;
    if (firstBtn) firstBtn.disabled = prevDisabled;
    if (prevOne) prevOne.disabled = prevDisabled;
    if (nextOne) nextOne.disabled = nextDisabled;
    if (lastBtn) lastBtn.disabled = nextDisabled;
}

function goToPage(page) {
    if (page < 1) page = 1;
    if (page > totalPages) page = totalPages;
    if (currentPage === page) return;
    
    console.log("Going to page:", page);
    currentPage = page;
    loadImage();
}

// ====== FAVORITES FUNCTIONS ======
function getFavoriteId(pdfPage) {
    return `page_${pdfPage}`;
}

function getFavoriteData(pdfPage) {
    for (const item of gujaratIndex) {
        if (item.pdfPage === pdfPage) {
            return { ...item, type: 'gujarat' };
        }
    }
    for (const item of mumbaiIndex) {
        if (item.pdfPage === pdfPage) {
            return { ...item, type: 'mumbai' };
        }
    }
    return {
        sr: 0,
        place: `Page ${pdfPage}`,
        page: `${pdfPage}`,
        pdfPage: pdfPage,
        type: 'other'
    };
}

function updateFavoriteButton() {
    const favId = getFavoriteId(currentPage);
    const isFavorite = favorites.includes(favId);
    const btn = document.getElementById('addFavoriteBtn');
    if (btn) {
        btn.innerHTML = isFavorite ? '<i class="fas fa-heart"></i>' : '<i class="far fa-heart"></i>';
        btn.classList.toggle('active', isFavorite);
        btn.title = isFavorite ? 'Remove from Favorites' : 'Add to Favorites';
    }
}

async function toggleCurrentFavorite() {
    const favId = getFavoriteId(currentPage);
    const index = favorites.indexOf(favId);
    const favData = getFavoriteData(currentPage);
    
    if (index > -1) {
        favorites.splice(index, 1);
        const result = await removeFavoriteFromServer(favId);
        if (!result.success) {
            favorites.push(favId);
            showNotification('Failed to remove favorite');
        } else {
            showNotification('Removed from Favorites');
        }
    } else {
        favorites.push(favId);
        const result = await addFavoriteToServer(currentPage, favData.place, favData.page);
        if (!result.success) {
            favorites.pop();
            showNotification('Failed to add favorite');
        } else {
            showNotification('Added to Favorites');
        }
    }
    
    saveFavorites();
    updateFavoriteButton();
    
    const favoritesPopup = document.getElementById('favoritesPopup');
    if (favoritesPopup && favoritesPopup.style.display !== 'none') {
        showFavoritesPopup();
    }
}

async function addFavoriteToServer(pdfPage, place, page) {
    try {
        const response = await fetch('save_data.php', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                action: 'add_favorite',
                pdf_page: pdfPage,
                place: place,
                page: page
            })
        });
        return await response.json();
    } catch (error) {
        console.error('Error adding favorite:', error);
        return { success: false };
    }
}

async function removeFavoriteFromServer(favoriteId) {
    try {
        const response = await fetch('save_data.php', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                action: 'remove_favorite',
                favorite_id: favoriteId
            })
        });
        return await response.json();
    } catch (error) {
        console.error('Error removing favorite:', error);
        return { success: false };
    }
}

async function saveCurrentPage() {
    try {
        await fetch('save_data.php', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ action: 'save_page', page: currentPage })
        });
    } catch (error) {
        console.error('Error saving page:', error);
    }
}

async function saveFavorites() {
    try {
        await fetch('save_data.php', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ action: 'save_favorites', favorites: favorites })
        });
    } catch (error) {
        console.error('Error saving favorites:', error);
    }
}

async function loadUserData() {
    try {
        const response = await fetch('load_data.php');
        const data = await response.json();
        if (data.success) {
            currentPage = data.page || 33;
            favorites = data.favorites || [];
            totalPages = data.totalPages || 356;
            const currentDisplay = document.getElementById('currentPageDisplay');
            const totalDisplay = document.getElementById('totalPagesDisplay');
            if (currentDisplay) currentDisplay.textContent = currentPage;
            if (totalDisplay) totalDisplay.textContent = totalPages;
        }
    } catch (error) {
        console.error('Error loading user data:', error);
    }
}

// ====== POPUP FUNCTIONS ======
function showIndexPopup() {
    console.log("Showing index popup");
    
    const popup = document.getElementById('indexPopup');
    const content = document.getElementById('indexPopupContent');
    
    if (!popup || !content) return;
    
    content.innerHTML = '';
    
    const gujaratSection = document.createElement('div');
    gujaratSection.className = 'index-section';
    gujaratSection.innerHTML = `
        <div class="index-header">
            <span><i class="fas fa-map-marker-alt"></i> Gujarat Index</span>
            <span class="index-count">${gujaratIndex.length}</span>
        </div>
        <div class="index-content" id="popupGujaratList"></div>
    `;
    
    const mumbaiSection = document.createElement('div');
    mumbaiSection.className = 'index-section mumbai';
    mumbaiSection.innerHTML = `
        <div class="index-header">
            <span><i class="fas fa-city"></i> Mumbai Index</span>
            <span class="index-count">${mumbaiIndex.length}</span>
        </div>
        <div class="index-content" id="popupMumbaiList"></div>
    `;
    
    content.appendChild(gujaratSection);
    content.appendChild(mumbaiSection);
    
    const popupGujaratList = gujaratSection.querySelector('.index-content');
    gujaratIndex.forEach((item) => {
        const itemEl = document.createElement('div');
        itemEl.className = 'index-popup-item';
        itemEl.innerHTML = `
            <div class="index-popup-sr">${item.sr}.</div>
            <div class="index-popup-place">${item.place}</div>
            <div class="index-popup-page">Page ${item.page}</div>
        `;
        itemEl.addEventListener('click', () => {
            goToPage(item.pdfPage);
            closeIndexPopup();
            const dropdown = document.getElementById('dropdownMenu');
            if (dropdown) dropdown.classList.remove('show');
        });
        popupGujaratList.appendChild(itemEl);
    });
    
    const popupMumbaiList = mumbaiSection.querySelector('.index-content');
    mumbaiIndex.forEach((item) => {
        const itemEl = document.createElement('div');
        itemEl.className = 'index-popup-item';
        itemEl.innerHTML = `
            <div class="index-popup-sr">${item.sr}.</div>
            <div class="index-popup-place">${item.place}</div>
            <div class="index-popup-page">Page ${item.page}</div>
        `;
        itemEl.addEventListener('click', () => {
            goToPage(item.pdfPage);
            closeIndexPopup();
            const dropdown = document.getElementById('dropdownMenu');
            if (dropdown) dropdown.classList.remove('show');
        });
        popupMumbaiList.appendChild(itemEl);
    });
    
    popup.style.display = 'flex';
    const dropdown = document.getElementById('dropdownMenu');
    if (dropdown) dropdown.classList.remove('show');
}

function closeIndexPopup() {
    const popup = document.getElementById('indexPopup');
    if (popup) popup.style.display = 'none';
}

async function showFavoritesPopup() {
    console.log("Showing favorites popup");
    
    const popup = document.getElementById('favoritesPopup');
    const list = document.getElementById('favoritesList');
    
    if (!popup || !list) return;
    
    popup.style.display = 'flex';
    closeSideMenu();
    
    const dropdown = document.getElementById('dropdownMenu');
    if (dropdown) dropdown.classList.remove('show');
    
    list.innerHTML = '<div class="loading" style="text-align:center;padding:40px;">Loading favorites...</div>';
    
    await loadUserData();
    
    if (!favorites || favorites.length === 0) {
        list.innerHTML = `
            <div class="no-favorites">
                <i class="fas fa-star"></i>
                <h3>No Favorite Pages Yet</h3>
                <p>Click the heart button while viewing a page to add it to favorites.</p>
            </div>
        `;
        return;
    }
    
    list.innerHTML = '';
    for (let index = 0; index < favorites.length; index++) {
        const favId = favorites[index];
        if (!favId || !favId.startsWith('page_')) continue;
        
        const pdfPage = parseInt(favId.replace('page_', ''));
        if (isNaN(pdfPage)) continue;
        
        const favData = getFavoriteData(pdfPage);
        
        const card = document.createElement('div');
        card.className = 'favorite-card';
        card.style.animationDelay = `${index * 0.1}s`;
        card.innerHTML = `
            <div class="fav-thumbnail">
                <i class="fas fa-image" style="font-size: 24px;"></i>
                <div class="page-number">${pdfPage}</div>
            </div>
            <div class="fav-content">
                <div class="fav-type">${favData.type ? favData.type.toUpperCase() : 'PAGE'}</div>
                <div class="fav-place">${favData.place || `Page ${pdfPage}`}</div>
                <div class="fav-page-info">
                    <i class="fas fa-file-alt"></i>
                    <span>Book Page: ${favData.page || pdfPage}</span>
                </div>
            </div>
            <div class="fav-actions">
                <button class="fav-remove-btn" onclick="event.stopPropagation(); showRemoveConfirmation('${favId}', '${favData.place || `Page ${pdfPage}`}')">&times;</button>
            </div>
        `;
        card.addEventListener('click', (e) => {
            if (!e.target.classList.contains('fav-remove-btn') && !e.target.closest('.fav-remove-btn')) {
                goToPage(pdfPage);
                closeFavoritesPopup();
            }
        });
        list.appendChild(card);
    }
}

function closeFavoritesPopup() {
    const popup = document.getElementById('favoritesPopup');
    if (popup) popup.style.display = 'none';
}

// Confirmation popup for removing favorites
let confirmationPopup = null;

function createConfirmationPopup() {
    confirmationPopup = document.createElement('div');
    confirmationPopup.id = 'confirmationPopup';
    confirmationPopup.style.cssText = `
        display: none;
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.8);
        backdrop-filter: blur(10px);
        z-index: 3000;
        align-items: center;
        justify-content: center;
    `;
    confirmationPopup.innerHTML = `
        <div style="background: var(--popup-bg); border-radius: 16px; padding: 30px; max-width: 400px; width: 90%; text-align: center; border: 1px solid var(--popup-border); box-shadow: var(--shadow-lg); color: var(--popup-text);">
            <h3 style="font-size: 22px; margin-bottom: 15px; color: var(--text-color);">
                <i class="fas fa-exclamation-triangle" style="color: var(--favorite-color); margin-right: 10px;"></i>
                Remove Favorite?
            </h3>
            <p id="confirmationMessage" style="margin-bottom: 25px; line-height: 1.6; font-size: 16px;"></p>
            <div style="display: flex; gap: 15px; justify-content: center;">
                <button id="cancelRemoveBtn" style="padding: 12px 30px; background: var(--accent-light); color: var(--text-color); border: 1px solid var(--border-color); border-radius: var(--radius); font-weight: 600; cursor: pointer; transition: var(--transition); flex: 1;">Cancel</button>
                <button id="confirmRemoveBtn" style="padding: 12px 30px; background: var(--remove-btn); color: white; border: none; border-radius: var(--radius); font-weight: 600; cursor: pointer; transition: var(--transition); flex: 1;">Remove</button>
            </div>
        </div>
    `;
    document.body.appendChild(confirmationPopup);
    
    const cancelBtn = document.getElementById('cancelRemoveBtn');
    const confirmBtn = document.getElementById('confirmRemoveBtn');
    
    if (cancelBtn) {
        cancelBtn.addEventListener('click', () => {
            if (confirmationPopup) confirmationPopup.style.display = 'none';
            window.pendingRemoveFavoriteId = null;
        });
    }
    
    if (confirmBtn) {
        confirmBtn.addEventListener('click', () => {
            if (window.pendingRemoveFavoriteId) {
                removeFavorite(window.pendingRemoveFavoriteId);
                window.pendingRemoveFavoriteId = null;
            }
            if (confirmationPopup) confirmationPopup.style.display = 'none';
        });
    }
    
    if (confirmationPopup) {
        confirmationPopup.addEventListener('click', (e) => {
            if (e.target === confirmationPopup) {
                confirmationPopup.style.display = 'none';
                window.pendingRemoveFavoriteId = null;
            }
        });
    }
}

function showRemoveConfirmation(favId, placeName) {
    window.pendingRemoveFavoriteId = favId;
    const message = document.getElementById('confirmationMessage');
    if (message) message.textContent = `Are you sure you want to remove "${placeName}" from favorites?`;
    if (confirmationPopup) confirmationPopup.style.display = 'flex';
}

async function removeFavorite(favId) {
    const result = await removeFavoriteFromServer(favId);
    if (result.success) {
        const index = favorites.indexOf(favId);
        if (index > -1) {
            favorites.splice(index, 1);
            saveFavorites();
        }
        if (getFavoriteId(currentPage) === favId) {
            updateFavoriteButton();
        }
        showNotification('Removed from favorites');
        showFavoritesPopup();
    } else {
        showNotification('Failed to remove favorite');
    }
}

// ====== OTHER POPUPS ======
function showDevPopup() {
    const popup = document.getElementById('devPopup');
    if (popup) popup.style.display = 'flex';
}

function closeDevPopup() {
    const popup = document.getElementById('devPopup');
    if (popup) popup.style.display = 'none';
}

function showJoinSoonPopup() {
    const popup = document.getElementById('joinPopup');
    if (popup) popup.style.display = 'flex';
}

function closeJoinPopup() {
    const popup = document.getElementById('joinPopup');
    if (popup) popup.style.display = 'none';
}

function showAbout() {
    showNotification(`AWMKKJ Document Viewer v2.0\nComplete Gujarat & Mumbai Index\nTotal Pages: 356\nImage Based Viewer\nFavorite System`);
}

function showHelp() {
    showNotification(`Navigation: Arrow Keys ← →\nFavorites: Ctrl+F\nIndex: Click from menu\nClose: Esc`);
}

function logout() {
    if (confirm('Are you sure you want to logout?')) {
        window.location.href = 'logout.php';
    }
}

function shareApp() {
    const shareData = {
        title: 'AWMKKJ Document Viewer',
        text: 'Check out this amazing document viewer! Total 356 pages of documents.',
        url: 'https://khatrihamza.com'
    };
    if (navigator.share) {
        navigator.share(shareData).catch(console.error);
    } else {
        navigator.clipboard.writeText('https://khatrihamza.com').then(() => {
            showNotification('Link copied to clipboard!');
        }).catch(() => {
            prompt('Copy this link:', 'https://khatrihamza.com');
        });
    }
}

function showNotification(message) {
    const existing = document.querySelector('.notification');
    if (existing) existing.remove();
    
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.innerHTML = `
        <div class="notification-header">
            <div class="notification-title"><i class="fas fa-info-circle"></i> Information</div>
            <button class="notification-close" onclick="this.parentElement.parentElement.remove()">×</button>
        </div>
        <div>${message}</div>
    `;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        if (notification.parentElement) notification.remove();
    }, 2000);
}

function closeAllPopups() {
    closeIndexPopup();
    closeFavoritesPopup();
    closeDevPopup();
    closeJoinPopup();
    const dropdown = document.getElementById('dropdownMenu');
    if (dropdown) dropdown.classList.remove('show');
    if (confirmationPopup) {
        confirmationPopup.style.display = 'none';
        window.pendingRemoveFavoriteId = null;
    }
}

// Make all functions global for onclick
window.openImageViewer = openImageViewer;
window.goToIndexPage = goToIndexPage;
window.showIndexPopup = showIndexPopup;
window.closeIndexPopup = closeIndexPopup;
window.showFavoritesPopup = showFavoritesPopup;
window.closeFavoritesPopup = closeFavoritesPopup;
window.showDevPopup = showDevPopup;
window.closeDevPopup = closeDevPopup;
window.showJoinSoonPopup = showJoinSoonPopup;
window.closeJoinPopup = closeJoinPopup;
window.showAbout = showAbout;
window.showHelp = showHelp;
window.logout = logout;
window.toggleTheme = toggleTheme;
window.retryLoadImage = retryLoadImage;
window.shareApp = shareApp;
window.showRemoveConfirmation = showRemoveConfirmation;
window.toggleCurrentFavorite = toggleCurrentFavorite;