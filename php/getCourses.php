<?php
require_once('config.php');

//get courseTypes and then loop thru courseTypes to get courses for that type - all stored in array of objectives

$courseTypes = array();

//check for a course filter
if(isset($_POST['c'])){
	$c = $_POST['c'];
}

$str = "SELECT * FROM courseTypes";
if(isset($_POST['c'])){
	$str .= " WHERE course_type LIKE '%$_POST[c]%' ";
}
$str .= " ORDER BY course_type ASC";


$result = mysqli_query($conn,$str);

while($row = mysqli_fetch_array($result))
{
	$courseType = new stdClass();
	$courseType->courseTypeTitle = $row['course_type'];
	$courseType->courseTypeId = $row['id'];
	array_push($courseTypes, $courseType);
}


foreach ($courseTypes as $courseType) {
    $str = "SELECT * FROM courses WHERE course_type_id = ".$courseType->courseTypeId." ORDER BY course_name ASC";
		$result = mysqli_query($conn,$str);
		$courseType->courses=array();
		while($row = mysqli_fetch_array($result))
		{
			$course = new stdClass();
			$course->courseTitle = $row['course_name'];
			$course->courseId = $row['course_id'];
			array_push($courseType->courses, $course);
		}
}


//send back to dashboard
echo json_encode($courseTypes);

$conn->close();


?>
