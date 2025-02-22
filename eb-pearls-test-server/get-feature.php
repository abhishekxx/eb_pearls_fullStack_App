<?php
require_once 'db_config.php';

header("Access-Control-Allow-Origin:  *");
header("Access-Control-Allow-Methods: GET, POST, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Credentials: true");

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    try {
        $stmt = $conn->prepare("SELECT * FROM features ORDER BY id ASC");
        $stmt->execute();
        
        $features = $stmt->fetchAll(PDO::FETCH_ASSOC);

        echo json_encode($features);
    } catch (PDOException $e) {
        echo json_encode(['error' => 'Error fetching features: ' . $e->getMessage()]);
    }
}
?>
