<?php
require_once('config.php');

$course_type_id = $_POST['courseTypeId'];
$course_name = $_POST['courseName'];

$str = "INSERT INTO courses(course_name,course_type_id) VALUES('".$course_name."', '".$course_type_id."')";

echo $str;

if ($conn->query($str) === TRUE) { echo "Course Saved"; } else { echo "Error: " . $conn->error; }

$conn->close();


?>
