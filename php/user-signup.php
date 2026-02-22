<?php
// Include database connection
require_once 'config.php';

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    // Collect form data
    $name = htmlspecialchars($_POST['name']);
    $phone = htmlspecialchars($_POST['phone']);
    $email = htmlspecialchars($_POST['email']);
    $password = $_POST['password'];
    $confirmPassword = $_POST['confirm-password'];

    // Validate email format
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        echo "Invalid email format!";
        exit;  // Stop execution if the email is invalid
    }

    // Check if passwords match
    if ($password !== $confirmPassword) {
        echo "Passwords do not match!";
        exit;
    }

    // Hash the password securely
    $passwordHash = password_hash($password, PASSWORD_BCRYPT);

    // Prepare SQL query
    try {
        $sql = "INSERT INTO users (name, phone, email, password, created_a) VALUES (?, ?, ?, ?, NOW())";
        $stmt = $conn->prepare($sql);
        $stmt->execute([$name, $phone, $email, $passwordHash]);

        echo "User registered successfully!";
    } catch (PDOException $e) {
        echo "Error: " . $e->getMessage();  // Display any error from the query
    }
}
?>
