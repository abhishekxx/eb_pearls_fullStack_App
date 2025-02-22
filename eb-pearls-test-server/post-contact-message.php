<?php
require_once 'db_config.php'; 

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Credentials: true");

if ($_SERVER['REQUEST_METHOD'] === 'POST') {

    $data = json_decode(file_get_contents("php://input"), true);

    if (!empty($data['name']) && !empty($data['email']) && !empty($data['message'])) {
        $name = htmlspecialchars($data['name']);
        $email = filter_var($data['email'], FILTER_VALIDATE_EMAIL);
        $message = htmlspecialchars($data['message']);

        if (!$email) {
            echo json_encode(["error" => "Invalid email address"]);
            exit;
        }

        try {
            $stmt = $conn->prepare("INSERT INTO contact_messages (name, email, message) VALUES (:name, :email, :message)");
            $stmt->bindParam(':name', $name);
            $stmt->bindParam(':email', $email);
            $stmt->bindParam(':message', $message);
            $stmt->execute();

            echo json_encode(["success" => "Message sent successfully!"]);
        } catch (PDOException $e) {
            echo json_encode(["error" => "Database Error: " . $e->getMessage()]);
        }
    } else {
        echo json_encode(["error" => "All fields are required"]);
    }
} else {
    echo json_encode(["error" => "Invalid request method"]);
}

?>