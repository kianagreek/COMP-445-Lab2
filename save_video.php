<?php
// Load the counter value from a separate file or database
$counter_file = "counter.txt";
$counter = intval(file_get_contents($counter_file));

if (isset($_FILES['video'])) {
    $upload_dir = "uploaded_video_files/";
     $file_name = "video_" . $counter . ".mp4";
  move_uploaded_file($_FILES['video']['tmp_name'], $upload_dir.$file_name);

  // Increment the counter value and save it to the counter file
  $counter++;
  file_put_contents($counter_file, $counter);
}
?>