// Hamburger menu toggle
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
const dropdownMenu = document.querySelector('.dropdown-menu');

// Function to close dropdown when clicking outside
document.addEventListener('click', (event) => {
    if (!navLinks.contains(event.target) && !hamburger.contains(event.target)) {
        navLinks.classList.remove('show');
        dropdownMenu.style.display = 'none'; // Close dropdown if open
    }
});

hamburger.addEventListener('click', (event) => {
    event.stopPropagation();
    navLinks.classList.toggle('show');
});

// Dropdown toggle for mobile (click inside hamburger menu)
const dropdown = document.querySelector('.dropdown');
dropdown.addEventListener('click', (event) => {
    event.stopPropagation();
    const dropdownMenu = dropdown.querySelector('.dropdown-menu');
    dropdownMenu.style.display = dropdownMenu.style.display === 'block' ? 'none' : 'block';
});

// Modal functionality
const learnMoreButtons = document.querySelectorAll('.learn-more');
const modal = document.getElementById('modal');
const closeModalBtn = document.querySelector('.close-btn');

learnMoreButtons.forEach(button => {
    button.addEventListener('click', () => {
        modal.style.display = 'flex';
    });
});

closeModalBtn.addEventListener('click', () => {
    modal.style.display = 'none';
});

window.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.style.display = 'none';
    }
});

// Dark mode toggle with text change
const darkModeToggle = document.querySelector('.dark-mode-toggle');
const darkModeIcon = darkModeToggle.querySelector('i');
const darkModeText = darkModeToggle.querySelector('span');
const body = document.body;

darkModeToggle.addEventListener('click', () => {
    body.classList.toggle('dark-mode');
    if (body.classList.contains('dark-mode')) {
        darkModeIcon.classList.replace('fa-moon', 'fa-sun');
        darkModeText.textContent = 'Light Mode';
    } else {
        darkModeIcon.classList.replace('fa-sun', 'fa-moon');
        darkModeText.textContent = 'Dark Mode';
    }
});
