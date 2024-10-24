// Toggle Menu function for the responsive menu
function toggleMenu() {
    const menu = document.getElementById("menu");
    const isExpanded = menu.classList.contains("show");
    menu.classList.toggle("show");
    const hamburgerButton = document.querySelector('.hamburger');
    hamburgerButton.setAttribute('aria-expanded', !isExpanded);
    menu.setAttribute('aria-hidden', isExpanded);
}

window.onclick = function(event) {
    const menu = document.getElementById("menu");
    if (!menu.contains(event.target) && !event.target.matches('.hamburger, .hamburger *')) {
        if (menu.classList.contains("show")) {
            toggleMenu();
        }
    }
};

window.onkeydown = function(event) {
    const menu = document.getElementById("menu");
    if (event.key === "Escape" && menu.classList.contains("show")) {
        toggleMenu();
    }
};

// Highlight the active quiz link in the menu
const currentPath = window.location.pathname;
document.querySelectorAll('.menu-link').forEach(link => {
    if (link.getAttribute('href') === currentPath) {
        link.classList.add('active');
    }
    // Provide feedback when a quiz is selected
    link.addEventListener('click', function() {
        // Removed the alert line
        // alert(`You selected the ${this.innerText}`);
        updateProgress();
    });
});

// Personalized greeting
function personalizedGreeting() {
    const username = localStorage.getItem("username") || prompt("What is your name?");
    if (username) {
        localStorage.setItem("username", username);
        document.getElementById("greeting").innerText = `Welcome back, ${username}!`;
        document.getElementById("personalized-message").innerText = `Continue your journey by selecting a quiz.`;
    }
}

// Quiz progress tracker
function updateProgress() {
    let progress = parseInt(localStorage.getItem("quizProgress")) || 0;
    progress = Math.min(progress + 1, 3);
    localStorage.setItem("quizProgress", progress);
    document.getElementById("progress-count").innerText = progress;
}

// Theme toggle (dark mode/light mode)
const themeToggle = document.getElementById("theme-toggle");
themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
    const isDarkMode = document.body.classList.contains("dark-mode");
    themeToggle.innerText = isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode";
    localStorage.setItem("theme", isDarkMode ? "dark" : "light");
});

// Load theme from localStorage
function loadTheme() {
    const storedTheme = localStorage.getItem("theme");
    if (storedTheme === "dark") {
        document.body.classList.add("dark-mode");
        themeToggle.innerText = "Switch to Light Mode";
    } else {
        themeToggle.innerText = "Switch to Dark Mode"; // Reset button text for light mode
    }
}

// Initialize on page load
window.addEventListener("DOMContentLoaded", () => {
    personalizedGreeting();
    updateProgress();
    loadTheme();
});

// Personalized greeting based on time of day
window.addEventListener('DOMContentLoaded', () => {
    const greeting = document.getElementById('greeting');
    const hour = new Date().getHours();
    
    if (hour < 12) {
        greeting.textContent = 'Good Morning! Welcome to the Code Quest!';
    } else if (hour < 18) {
        greeting.textContent = 'Good Afternoon! Welcome to the Code Quest!';
    } else {
        greeting.textContent = 'Good Evening! Welcome to the Code Quest!';
    }
});

// Countdown Timer
let countdown;
let time = 1800; // 30 minutes in seconds

const timerDisplay = document.getElementById('timer-display');
const circle = document.getElementById('circle');

function startTimer() {
    countdown = setInterval(() => {
        time--;
        updateTimerDisplay(time);
        updateCircleAnimation(time);
        if (time <= 0) {
            clearInterval(countdown);
            alert('Time’s up! The quiz has ended.'); // This alert can also be removed if needed
        }
    }, 1000);
}

function updateTimerDisplay(time) {
    let minutes = Math.floor(time / 60);
    let seconds = time % 60;
    timerDisplay.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

// Circle animation based on remaining time
function updateCircleAnimation(time) {
    const progress = time / 1800;
    const offset = 113 - (113 * progress);
    circle.style.strokeDashoffset = offset;
}

// Smooth scroll for internal page links only
document.querySelectorAll('.menu-link').forEach(link => {
    link.addEventListener('click', (event) => {
        const href = link.getAttribute('href');
        // Check if the link is for a section within the same page (e.g., starts with '#')
        if (href.startsWith('#')) {
            event.preventDefault();
            const target = document.querySelector(href);
            target.scrollIntoView({ behavior: 'smooth' });
        }
        // Otherwise, let the default action (page navigation) happen for external pages
    });
});

function toggleDropdown(dropdownId) {
    // Get all dropdowns
    const dropdowns = document.querySelectorAll('.dropdown');

    // Hide all dropdowns
    dropdowns.forEach(dropdown => {
        if (dropdown.id !== dropdownId) {
            dropdown.style.display = 'none';
        }
    });

    // Toggle the clicked dropdown
    const dropdown = document.getElementById(dropdownId);
    dropdown.style.display = dropdown.style.display === 'block' ? 'none' : 'block';
}

// Sample data for the pie chart (You can update this based on actual quiz results)
const quizData = {
    correct: 6,  // Replace with actual data
    incorrect: 2,
    unanswered: 3
};

// Function to create the pie chart
function createPieChart() {
    const ctx = document.getElementById('quizPieChart').getContext('2d');
    const quizPieChart = new Chart(ctx, {
        type: 'pie',
        data: {
            labels: ['Correct', 'Incorrect', 'Unanswered'],
            datasets: [{
                data: [quizData.correct, quizData.incorrect, quizData.unanswered],
                backgroundColor: ['#4CAF50', '#F44336', '#FFEB3B'],
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'bottom',
                },
                tooltip: {
                    enabled: true,
                }
            }
        }
    });
}

// Call the function to create the pie chart when the page loads
window.onload = function() {
    createPieChart();
};
