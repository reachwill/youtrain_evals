<?php
require_once('config.php');

$searchType = $_POST['searchType'];

switch($searchType){
  case 'delco':
    $firstname = $_POST['firstname'];
    $lastname = $_POST['lastname'];
    $company = $_POST['company'];
    $trainer = $_POST['trainer'];
    $from = $_POST['from'];
    $to = $_POST['to'];
    $sql = "SELECT * FROM evals,courses WHERE evals.course=courses.course_id ";
    if($_POST['firstname']!=''){
      $sql.=" AND firstname = '$_POST[firstname]'";
    }
    if($_POST['lastname']!=''){
      $sql.=" AND lastname = '$_POST[lastname]'";
    }
    if($_POST['company']!=''){
      $sql.=" AND company = '$_POST[company]'";
    }
    if($_POST['trainer']!=''){
      $sql.=" AND trainer LIKE '%$_POST[trainer]%'";
    }
    $sql.=" AND start >= '$_POST[from]' AND start <= '$_POST[to]'";
    //echo $sql;
    break;
  case 'course':
    $courseId = $_POST['courseId'];
    $from = $_POST['from'];
    $to = $_POST['to'];
    $sql = "SELECT * FROM evals,courses WHERE evals.course=courses.course_id ";
    if($_POST['courseId']!=''){
      $sql.=" AND course = '$_POST[courseId]'";
    }
    $sql.=" AND start >= '$_POST[from]' AND start <= '$_POST[to]'";
    //echo $sql;
    break;
}



$result = $conn->query($sql)
	or die($conn->errorCode());

$rows = array();
while($r = mysqli_fetch_assoc($result)) {
    $rows[] = $r;
}

echo json_encode($rows);

$conn->close();
?>
