<?php
require_once 'config.php'; // Database connection

session_start();

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    // Get admin login data
    $email = $_POST['email'];
    $password = $_POST['password'];

    // Validate input (already partially done in JavaScript)
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        echo "Invalid email format!";
        exit;
    }

    // Check if admin exists
    $sql = "SELECT * FROM admins WHERE email = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param('s', $email);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows == 1) {
        $admin = $result->fetch_assoc();

        // Verify password
        if (password_verify($password, $admin['password'])) {
            $_SESSION['admin_logged_in'] = true;
            // Redirect to the admin panel after successful login
            header('Location: admin-dashboard.html');
            exit; // Make sure no further code is executed after redirect
        } else {
            echo "Invalid password!";
        }
    } else {
        echo "No such admin found!";
    }

    // Close prepared statement and connection
    $stmt->close();
    $conn->close();
}
?>
