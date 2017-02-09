<?php
//create the database connection ($conn)
require_once('config.php');


/*
Instructions: the following 2 arrays must contain values which match the field names in the evals table in the database. Also the names
of the form elements in trainerled2.html must be identical to these values too. The code in this page has been written to automatically
construct an SQL statement based on the data object sent form the client. So to add a new field to the eval form follow these steps:
1. add field to database evals table (eg. newFieldName)
2. add new form element to trainerled.html and assign name attribute to be exactly same as database field (name="newFieldName")
3. add new field new 1 of the following arrays depending on whether the database field is set to accept an numeric or string value
*/


/* $varchars array is for any string field data types */
$varchars = array('firstname','company','course','email','start','trainer','date','tel','trainerComments','courseComments','classroomComments','comments','lastname','recommend','canuse','other_courses');
/* $ints array is for any numeric field data types */
$ints = array('enthusiastic','knowledgeable','prepared','participation','communicates','objectives','organised','pace','activities','confirmation','classroom','equipment');

// start building the SQL string
$str = 'INSERT INTO evals (';
// loop thru each POST variables and concat into SQL string
foreach($_POST as $key => $value){
    $str .= $key . ',';
}
//remove last comma concatenated in by the previous loop process
$str = rtrim($str, ',');
//prepare SQL string for the VALUES
$str .= ') VALUES(';
//loop thru POST variables and cancatenate in the values
foreach($_POST as $key => $value){
    //check if the POST var is string or numeric (does it need quotes or not)
    if(in_array($key,$varchars)){
        $str.="'".$value."',";
    }else{
        $str.=$value.',';
    }
}
//remove last comma concatenated in by the previous loop process
$str = rtrim($str, ',');
//complete SQL string with a losing bracket
$str.=')';

//echo $str;
//execute the query
if ($conn->query($str) === TRUE) { echo "Eval Saved"; } else { echo "Error: " . $conn->error; }
//close the conneection
$conn->close();


//NOW IS THE TIME TO CHECK IF OTHER COURSES ARE OF INTEREST TO THE USER. IF SO SEND EMAIL TO SALES



?>
