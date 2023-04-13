<?php
// These headers are needed for Cross-Origin Resource Sharing
// For security reasons, browsers restrict cross-origin HTTP requests initiated from scripts. 
// For example, XMLHttpRequest and the Fetch API follow the same-origin policy (SOP). 
// This means that a web application using those APIs can only request resources from the same 
// origin the application was loaded from unless the response from other origins includes the right CORS headers.
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: *");

// Loading the counter value from separate file
$counter_file = "counter.txt";
$counter = intval(file_get_contents($counter_file));

if (isset($_FILES['video'])) {

  // location where video segments are saved
  $upload_dir = "video_segments/";

  // video segment name
  $file_name = "video_" . $counter . ".mp4";

  // Moves the uploaded file to the new location
  move_uploaded_file($_FILES['video']['tmp_name'], $upload_dir.$file_name);

  // Increment the counter value and save it to the counter file
  $counter++;
  file_put_contents($counter_file, $counter);
}
?>
