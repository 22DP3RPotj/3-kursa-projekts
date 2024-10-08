// Hamburger menu
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
const dropdownMenu = document.querySelector('.dropdown-menu');

document.addEventListener('click', (event) => {
    if (!navLinks.contains(event.target) && !hamburger.contains(event.target)) {
        navLinks.classList.remove('show');
        dropdownMenu.style.display = 'none';
    }
});

hamburger.addEventListener('click', (event) => {
    event.stopPropagation();
    navLinks.classList.toggle('show');
});

const dropdown = document.querySelector('.dropdown');
dropdown.addEventListener('click', (event) => {
    event.stopPropagation();
    const dropdownMenu = dropdown.querySelector('.dropdown-menu');
    dropdownMenu.style.display = dropdownMenu.style.display === 'block' ? 'none' : 'block';
});

// Get modal buttons and modals
const learnMoreButtons = document.querySelectorAll('.learn-more');
const modals = document.querySelectorAll('.modal');
const closeModalBtns = document.querySelectorAll('.close-btn');

// Function to open the modal
learnMoreButtons.forEach(button => {
    button.addEventListener('click', () => {
        const modalId = button.getAttribute('data-modal');
        const modal = document.getElementById(modalId);
        modal.style.display = 'flex';
    });
});

// Function to close the modal
closeModalBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const modalId = btn.getAttribute('data-close');
        const modal = document.getElementById(modalId);
        modal.style.display = 'none';
    });
});

// Close the modal when clicking outside of it
window.addEventListener('click', (e) => {
    modals.forEach(modal => {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });
});

// Dark mode toggle
const darkModeToggle = document.querySelector('.dark-mode-toggle');
const darkModeText = darkModeToggle.querySelector('span');
const body = document.body;

darkModeToggle.addEventListener('click', () => {
    body.classList.toggle('dark-mode');
    if (body.classList.contains('dark-mode')) {
        darkModeText.textContent = 'Light Mode';
    } else {
        darkModeText.textContent = 'Dark Mode';
    }
});
