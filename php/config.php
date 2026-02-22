<?php
// Database connection settings
$host = 'localhost';  // Your MySQL host (usually 'localhost' for local server)
$dbname = 'findyourfashion';  // Your database name
$username = 'root';  // Your database username
$password = '';  // Your database password (empty for local default in some cases)

try {
    $conn = new PDO("mysql:host=$host;dbname=$dbname", $username, $password);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);  // Enable error reporting
    echo "Database connection successful!";
} catch (PDOException $e) {
    echo "Connection failed: " . $e->getMessage();  // Show error message if connection fails
    die();  // Stop execution if connection fails
}
?>
