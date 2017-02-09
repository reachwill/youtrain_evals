<?php
require_once('config.php');
$sql = 'SELECT DISTINCT course FROM evals ORDER BY course ASC';

$result = $conn->query($sql)
	or die($conn->errorCode());
 
$rows = array();
while($r = mysqli_fetch_assoc($result)) {
    $rows[] = $r;
}

echo json_encode($rows);  

$conn->close();
?>