<?php
$host = "127.0.0.1";
$username = "root";
$password = "Abhishek123$";
$dbname = "eb_pearls_test_data";

try {
    $conn = new PDO("mysql:host=$host;dbname=$dbname", $username, $password);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch(PDOException $e) {
    echo "Connection failed: " . $e->getMessage();
}
?>