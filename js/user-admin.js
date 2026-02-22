// Form validation for User Signup
function validateForm() {
    let isValid = true;

    // Name validation
    const name = document.getElementById("name").value.trim();
    if (name.length < 2) {
        setError("name-error", "Name must be at least 2 characters.");
        isValid = false;
    }

    // Phone validation (10 digits)
    const phone = document.getElementById("phone").value.trim();
    if (!/^\d{10}$/.test(phone)) {
        setError("phone-error", "Phone number must be exactly 10 digits.");
        isValid = false;
    }

    // Email validation
    const email = document.getElementById("email").value.trim();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        setError("email-error", "Invalid email format.");
        isValid = false;
    }

    // Password validation
    const password = document.getElementById("password").value.trim();
    if (password.length < 8) {
        setError("password-error", "Password must be at least 8 characters.");
        isValid = false;
    }
    if (!/[A-Za-z]/.test(password)) {
        setError("password-error", "Password must contain at least one letter.");
        isValid = false;
    }
    if (!/[0-9]/.test(password)) {
        setError("password-error", "Password must contain at least one number.");
        isValid = false;
    }

    // Confirm Password validation (Signup only)
    const confirmPassword = document.getElementById("confirm-password").value.trim();
    if (password !== confirmPassword) {
        setError("confirm-password-error", "Passwords do not match.");
        isValid = false;
    }

    return isValid; // Return whether form is valid or not
}

// Form validation for Admin Login
function validateAdminForm() {
    let isValid = true;

    // Email validation
    const adminEmail = document.getElementById("admin-email").value.trim();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(adminEmail)) {
        setError("email-error", "Invalid email format.");
        isValid = false;
    }

    // Password validation
    const adminPassword = document.getElementById("admin-password").value.trim();
    if (adminPassword.length < 6) {
        setError("password-error", "Password must be at least 6 characters.");
        isValid = false;
    }

    return isValid; // Return whether admin login form is valid or not
}

// Helper function to set error message
function setError(id, message) {
    document.getElementById(id).textContent = message;
}

// Helper function to clear all error messages
function clearErrors() {
    const errors = document.querySelectorAll(".error-message");
    errors.forEach(err => err.textContent = "");
}

// Toggle between Signup and Login forms
const toggleForm = document.getElementById("toggle-form");
const submitBtn = document.getElementById("submit-btn");
const nameField = document.getElementById("name-field");
const phoneField = document.getElementById("phone-field");
const confirmPasswordField = document.getElementById("confirm-password-field");
const toggleLink = document.getElementById("toggle-link");

let isSignup = false;

toggleForm.addEventListener("click", () => {
    isSignup = !isSignup;

    if (isSignup) {
        nameField.style.display = "block";
        phoneField.style.display = "block";
        confirmPasswordField.style.display = "block";
        submitBtn.textContent = "Sign Up";
        toggleLink.innerHTML = `Already have an account? <a href="#" id="toggle-form">Login</a>`;
    } else {
        nameField.style.display = "none";
        phoneField.style.display = "none";
        confirmPasswordField.style.display = "none";
        submitBtn.textContent = "Login";
        toggleLink.innerHTML = `Don't have an account? <a href="#" id="toggle-form">Sign Up</a>`;
    }
});

// Attach event listener to forms for validation
document.getElementById("login-signup-form").addEventListener("submit", function (e) {
    e.preventDefault();

    clearErrors(); // Clear previous errors

    if (isSignup) {
        // Validate signup form
        if (!validateForm()) {
            return;
        }
    } else {
        // Validate login form
        if (!validateAdminForm()) {
            return;
        }
    }

    alert(isSignup ? "Signup successful!" : "Login successful!");
    // Optionally, submit the form via AJAX or redirect to another page
    // this.submit();
});
document.getElementById("toggle-form").addEventListener("click", function() {
    var form = document.getElementById("login-signup-form");
    var confirmPasswordField = document.getElementById("confirm-password-field");
    var formHeading = document.getElementById("form-heading");

    if (formHeading.innerHTML === "User Login") {
        formHeading.innerHTML = "User Signup";
        confirmPasswordField.style.display = "block"; // Show confirm password
        document.getElementById("submit-btn").textContent = "Sign Up"; // Change button text
    } else {
        formHeading.innerHTML = "User Login";
        confirmPasswordField.style.display = "none"; // Hide confirm password for login
        document.getElementById("submit-btn").textContent = "Login"; // Change button text
    }
});