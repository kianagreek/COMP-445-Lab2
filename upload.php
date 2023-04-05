<?php
if ($_SERVER["REQUEST_METHOD"] == "POST" && isset($_FILES["video"])) {
  $file = $_FILES["video"];
  $fileName = $file["name"];
  $tmpName = $file["tmp_name"];
  $uploadDir = "uploads/".$fileName;

  if (move_uploaded_file($_FILES['file']['tmp_name'], $uploadDir)) {
    http_response_code(200);
    echo '<p>The file upload was a success!</p>'; 
  } else {
    http_response_code(500);
    echo '<p>The file upload failed.</p>';
  }
}
?>


/*  <?php
// $servername = 'ruc353.encs.concordia.ca:3306';
// $database = 'ruc353_1';
// $username = 'ruc353_1';
// $password = 'DROP_TAB';

// $servername = 'localhost:3306';
// $username = 'root';
// $password = '';
// $database = 'mysql';

// try {
    // $conn = new PDO("mysql:host=$servername;dbname=$database;", $username, $password);
// } catch (PDOException $e) {
    // die('Connection Failed: ' . $e->getMessage());
// }
// ?> */