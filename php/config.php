<?php
$db = 'youtrain_eval';
$user = 'youtrain';
$pwd = 'manurshite';
$host = 'localhost';

// $db = 'youtrain_evals';
// $user = 'youtrain_evals_user';
// $pwd = '4B£LyG-IWoU=BuEC6Og';
// $host = 'lon-db-01.youtraingroup.com';


$conn = new mysqli($host, $user, $pwd, $db);
// Check connection
if ($conn->connect_error) {
    echo("Connection failed: " . $conn->connect_error);
    exit();
}


?>
