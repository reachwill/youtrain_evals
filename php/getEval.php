<?php
require_once('config.php');
//$evalTable = 'evals';
switch($_POST['evalType']){
	case 'resultsByCourse':
		$evalTable = 'evals';
		break;
	case 'resultsByAwardMid':
		$evalTable = 'apprenticeEvals';
		break;
}

$sql = "SELECT * FROM ".$evalTable." WHERE id = $_POST[id]";

$result = $conn->query($sql)
	or die($conn->errorCode());

$rows = array();
while($r = mysqli_fetch_assoc($result)) {
    $rows[] = $r;
}

echo json_encode($rows);

$conn->close();
?>
