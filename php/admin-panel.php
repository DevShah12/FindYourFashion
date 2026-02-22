<?php
session_start();
require_once 'config.php'; // Database connection

// Check if admin is logged in
if (!isset($_SESSION['admin_logged_in'])) {
    header('Location: admin-login.html');
    exit;
}

// Fetch users (CRUD operations can go here)
$sql = "SELECT * FROM users";
$result = $conn->query($sql);

?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Admin Panel</title>
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <h1>Welcome to the Admin Panel</h1>
    <h2>Manage Users</h2>
    <table>
        <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Actions</th>
        </tr>
        <?php while ($row = $result->fetch_assoc()): ?>
        <tr>
            <td><?= $row['id'] ?></td>
            <td><?= $row['name'] ?></td>
            <td><?= $row['email'] ?></td>
            <td><a href="edit-user.php?id=<?= $row['id'] ?>">Edit</a> | <a href="delete-user.php?id=<?= $row['id'] ?>">Delete</a></td>
        </tr>
        <?php endwhile; ?>
    </table>

    <footer>
        <a href="logout.php">Logout</a>
    </footer>
</body>
</html>

<?php
$conn->close();
?>
