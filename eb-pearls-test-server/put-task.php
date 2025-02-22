<?php
require_once 'db_config.php';

header("Access-Control-Allow-Origin:  *");
header("Access-Control-Allow-Methods: GET, POST, DELETE, PUT, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Credentials: true");

// header("Content-Type: application/json");

$method = $_SERVER['REQUEST_METHOD'];

if ($method === 'PUT') {
    $data = json_decode(file_get_contents("php://input"), true);

    if (!empty($data['id']) && isset($data['completed'])) {
        try {
            $stmt = $conn->prepare("UPDATE tasksmanager SET task = :task, completed = :completed WHERE id = :id");
            $stmt->bindParam(':id', $data['id']);
            $stmt->bindParam(':task', $data['task']);
            $stmt->bindParam(':completed', $data['completed']);
            $stmt->execute();

            if ($stmt->rowCount() > 0) {
                echo json_encode(['message' => 'Task updated successfully']);
            } else {
                echo json_encode(['error' => 'Task not found or no change']);
            }
        } catch (PDOException $e) {
            echo json_encode(['error' => $e->getMessage()]);
        }
    } else {
        echo json_encode(['error' => 'Task ID and completed status are required']);
    }
}

?>