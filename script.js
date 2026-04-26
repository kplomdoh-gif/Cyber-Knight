// Search functionality
function setupDashboard() {
    const searchInput = document.getElementById('searchInput');
    const searchCards = document.querySelectorAll('.cards-container .card');
    const toggleSidebar = document.getElementById('toggleSidebar');
    const sidenav = document.getElementById('mySidenav');

    if (toggleSidebar && sidenav) {
        toggleSidebar.addEventListener('click', () => {
            sidenav.classList.toggle('collapsed');
            localStorage.setItem('sidebarCollapsed', sidenav.classList.contains('collapsed'));
        });

        const wasCollapsed = localStorage.getItem('sidebarCollapsed') === 'true';
        if (wasCollapsed) {
            sidenav.classList.add('collapsed');
        }
    }

    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            const searchTerm = e.target.value.toLowerCase();
            searchCards.forEach(card => {
                const text = card.textContent.toLowerCase();
                if (text.includes(searchTerm) || searchTerm === '') {
                    card.style.display = '';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    }

    const sidenavLinks = document.querySelectorAll('.nav-link');
    sidenavLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const section = link.getAttribute('data-section');
            navigateToSection(section);
        });
    });

    const backgroundGradientSelect = document.getElementById('backgroundGradient');
    const applyBackgroundButton = document.getElementById('applyBackground');
    const savedBackground = localStorage.getItem('dashboardBackground');

    if (savedBackground) {
        applyBackgroundColor(savedBackground);
    }

    if (backgroundGradientSelect && savedBackground) {
        backgroundGradientSelect.value = savedBackground;
    }

    if (applyBackgroundButton && backgroundGradientSelect) {
        applyBackgroundButton.addEventListener('click', () => {
            const gradient = backgroundGradientSelect.value;
            applyBackgroundColor(gradient);
            localStorage.setItem('dashboardBackground', gradient);
        });
    }

    const userProfile = document.querySelector('.user-profile');
    if (userProfile) {
        userProfile.addEventListener('click', () => {
            customizeUserProfile();
        });
    }
}

function navigateToSection(section) {
    const sectionMap = {
        'home': 'DGN C.html',
        'help': 'help.html',
        'videos': 'videos.html',
        'blogs': 'blogs.html',
        'games': 'games.html',
        'resources': 'resources.html',
        'settings': 'settings.html'
    };
    const url = sectionMap[section];
    if (url) {
        window.location.href = url;
    }
}

function customizeUserProfile() {
    const newName = prompt('Enter your name:', localStorage.getItem('userName') || 'User');
    if (newName !== null) {
        const userName = document.getElementById('userName');
        if (userName) {
            userName.textContent = newName || 'User';
        }
        localStorage.setItem('userName', newName || 'User');
    }
}

function loadUserProfile() {
    const savedName = localStorage.getItem('userName');
    if (savedName) {
        const userName = document.getElementById('userName');
        if (userName) userName.textContent = savedName;
    }
}

function applyBackgroundColor(color) {
    document.body.style.background = color;
}

document.addEventListener('DOMContentLoaded', () => {
    setupDashboard();
    loadUserProfile();
});