<?php
require_once('config.php');



$str = "SELECT * FROM courseTypes ORDER BY course_type ASC";



$result = mysqli_query($conn,$str);


$rows= array();

while($row = mysqli_fetch_array($result))
{
	array_push($rows, $row);
}


//send back to dashboard
echo json_encode($rows);

$conn->close();


?>
