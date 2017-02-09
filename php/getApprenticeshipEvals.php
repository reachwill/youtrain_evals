<?php
require_once('config.php');

$searchType = $_POST['searchType'];
$interval = $_POST['interval'];



switch($searchType){
  case 'delco':
    $firstname = $_POST['firstname'];
    $lastname = $_POST['lastname'];
    $company = $_POST['company'];
    $trainer = $_POST['trainer'];
    $from = $_POST['from'];
    $to = $_POST['to'];
    $sql = "SELECT * FROM evals,awards WHERE eval.award = awards.award_id ";
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
  case 'award':



    $sql = "SELECT * FROM apprenticeEvals,awards WHERE apprenticeEvals.award = awards.award_id ";
    if($_POST['awardId']!=''){
      $sql.=" AND award = $_POST[awardId]";
    }

    if($_POST['interval']=='mid'){
      $sql.=" AND start >= '$_POST[from]' AND start <= '$_POST[to]'";
    }
    else if($_POST['interval']=='final'){
      $sql.=" AND end >= '$_POST[from]' AND end <= '$_POST[to]'";
    }

    $sql.=" AND eval_interval = '$_POST[interval]'";

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
