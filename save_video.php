<?php
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