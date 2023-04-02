<?php
if ($_SERVER["REQUEST_METHOD"] == "POST" && isset($_FILES["video"])) {
  $file = $_FILES["video"];
  $fileName = $file["name"];
  $fileType = $file["type"];
  $fileSize = $file["size"];
  $tmpName = $file["tmp_name"];
  $uploadDir = "uploads/";
  $uploadFile = $uploadDir . basename($fileName);

  if (move_uploaded_file($tmpName, $uploadFile)) {
    http_response_code(200);
  } else {
    http_response_code(500);
  }
}
?>