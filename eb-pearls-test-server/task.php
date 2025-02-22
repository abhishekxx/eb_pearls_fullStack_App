<?php
require_once 'db_config.php';

header("Access-Control-Allow-Origin:  *");
header("Access-Control-Allow-Methods: GET, POST, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Credentials: true");

// header("Content-Type: application/json");

$method = $_SERVER['REQUEST_METHOD'];

if ($method === 'POST') {
    $data = json_decode(file_get_contents("php://input"), true);
    
    if (!empty($data['task'])) {
        try {
            $stmt = $conn->prepare("INSERT INTO tasksmanager (task, completed) VALUES (:task, 0)");
            $stmt->bindParam(':task', $data['task']);
            $stmt->execute();
            $taskId = $conn->lastInsertId();

            $stmt = $conn->prepare("SELECT * FROM tasksmanager WHERE id = :id");
            $stmt->bindParam(':id', $taskId);
            $stmt->execute();
            $newTask = $stmt->fetch(PDO::FETCH_ASSOC);

            echo json_encode($newTask);
        } catch (PDOException $e) {
            echo json_encode(['error' => $e->getMessage()]);
        }
    } else {
        echo json_encode(['error' => 'Task content is required']);
    }
}
 elseif ($method === 'DELETE') {

    $data = json_decode(file_get_contents("php://input"), true);
    
    if (!empty($data['id'])) {
        try {
            $stmt = $conn->prepare("DELETE FROM tasksmanager WHERE id = :id");
            $stmt->bindParam(':id', $data['id']);
            $stmt->execute();
            echo json_encode(['message' => 'Task deleted successfully']);
        } catch (PDOException $e) {
            echo json_encode(['error' => $e->getMessage()]);
        }
    } else {
        echo json_encode(['error' => 'Invalid Task ID']);
    }
} 
?>
