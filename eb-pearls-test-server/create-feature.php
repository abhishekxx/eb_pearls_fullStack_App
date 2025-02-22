<?php
require_once 'db_config.php';

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $icon = $_POST['icon'];
    $title = $_POST['title'];
    $description = $_POST['description'];

    if (!empty($icon) && !empty($title) && !empty($description)) {
        try {
            $stmt = $conn->prepare("INSERT INTO features (icon, title, description) VALUES (:icon, :title, :description)");
            $stmt->bindParam(':icon', $icon);
            $stmt->bindParam(':title', $title);
            $stmt->bindParam(':description', $description);

            $stmt->execute();

            echo json_encode(['message' => 'Feature added successfully!']);
        } catch (PDOException $e) {
            echo json_encode(['error' => 'Error: ' . $e->getMessage()]);
        }
    } else {
        echo json_encode(['error' => 'All fields are required!']);
    }
} 

?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Add New Feature</title>
    <link rel="stylesheet" href="../style.css">
</head>
<body>

    <h2>Add a New Feature</h2>
    <form method="POST" action="">
        <div>
            <label for="icon">Icon (URL or Text):</label>
            <input type="text" id="icon" name="icon" required>
        </div>
        <div>
            <label for="title">Title:</label>
            <input type="text" id="title" name="title" required>
        </div>
        <div>
            <label for="description">Description:</label>
            <textarea id="description" name="description" rows="4" required></textarea>
        </div>
        <div>
            <button type="submit">Add Feature</button>
        </div>
    </form>

</body>
</html>