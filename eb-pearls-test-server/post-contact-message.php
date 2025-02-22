<?php
require_once 'db_config.php'; 

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Credentials: true");

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;

require 'PHPMailer/Exception.php';
require 'PHPMailer/PHPMailer.php';
require 'PHPMailer/SMTP.php';

$mail = new PHPMailer(true);

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

            $mail->isSMTP();                                            
            $mail->Host       = 'smtp.gmail.com';                     
            $mail->SMTPAuth   = true;                                  
            $mail->Username   = 'johnchand941@gmail.com';                   
            $mail->Password   = 'rlzn bxih guvi doqz';                               
            $mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS;           
            $mail->Port       = 465;

            //Recipients
            $mail->setFrom($email, $name);
            $mail->addAddress('johnchand941@gmail.com', 'John Chand');     
            
            
            $mail->isHTML(true);                                 
            $mail->Subject = 'Contact Form';
            $mail->Body = "Sender Name: $name <br> Sender Email: $email <br> Sender Message: $message";

            if ($mail->send()) {
                echo json_encode(["success" => "Message sent successfully!"]);
            } else {
                echo json_encode(["error" => "Message saved, but email not sent."]);
            }
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