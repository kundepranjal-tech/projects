
const themeToggle = document.getElementById("themeToggle");
const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");

// Automatically update footer year
document.querySelectorAll(".year").forEach(function (element) {
    element.textContent = new Date().getFullYear();
});

// Load saved theme
try {
    if (localStorage.getItem("portfolioTheme") === "dark") {
        document.body.classList.add("dark");
    }
} catch (error) {
    // The website still works if browser storage is unavailable.
}

// Update theme button icon
function updateThemeIcon() {
    if (themeToggle) {
        themeToggle.textContent =
            document.body.classList.contains("dark") ? "☀️" : "🌙";
        themeToggle.setAttribute(
            "aria-label",
            document.body.classList.contains("dark")
                ? "Switch to light mode"
                : "Switch to dark mode"
        );
    }
}

updateThemeIcon();

// Dark and light mode
if (themeToggle) {
    themeToggle.addEventListener("click", function () {
        document.body.classList.toggle("dark");

        const theme = document.body.classList.contains("dark")
            ? "dark"
            : "light";

        try {
            localStorage.setItem("portfolioTheme", theme);
        } catch (error) {
            // Theme can still change for the current page.
        }

        updateThemeIcon();
    });
}

// Mobile navigation menu
if (menuToggle && navLinks) {
    menuToggle.addEventListener("click", function () {
        navLinks.classList.toggle("open");

        menuToggle.textContent =
            navLinks.classList.contains("open") ? "✕" : "☰";

        menuToggle.setAttribute(
            "aria-expanded",
            navLinks.classList.contains("open") ? "true" : "false"
        );
    });
}

// Contact form validation
const contactForm = document.getElementById("contactForm");

if (contactForm) {
    contactForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const name = document.getElementById("name").value.trim();
        const email = document.getElementById("email").value.trim();
        const message = document.getElementById("message").value.trim();
        const formMessage = document.getElementById("formMessage");

        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (name.length < 2) {
            formMessage.textContent =
                "Please enter a name with at least 2 characters.";
        } else if (!emailPattern.test(email)) {
            formMessage.textContent =
                "Please enter a valid email address.";
        } else if (message.length < 10) {
            formMessage.textContent =
                "Message must contain at least 10 characters.";
        } else {
            formMessage.textContent =
                "Form validated successfully! This demo does not send emails.";

            contactForm.reset();
        }
    });
}
