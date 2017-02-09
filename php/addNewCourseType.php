<?php
require_once('config.php');

$courseType = $_POST['courseType'];

$str = "INSERT INTO courseTypes(course_type) VALUES('".$courseType."'".")";

echo $str;

if ($conn->query($str) === TRUE) { echo "Course Type Saved"; } else { echo "Error: " . $conn->error; }

$conn->close();


?>
