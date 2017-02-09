<?php
/**
 * PHPExcel
 *
 * Copyright (C) 2006 - 2014 PHPExcel
 *
 * This library is free software; you can redistribute it and/or
 * modify it under the terms of the GNU Lesser General Public
 * License as published by the Free Software Foundation; either
 * version 2.1 of the License, or (at your option) any later version.
 *
 * This library is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU
 * Lesser General Public License for more details.
 *
 * You should have received a copy of the GNU Lesser General Public
 * License along with this library; if not, write to the Free Software
 * Foundation, Inc., 51 Franklin Street, Fifth Floor, Boston, MA  02110-1301  USA
 *
 * @category   PHPExcel
 * @package    PHPExcel
 * @copyright  Copyright (c) 2006 - 2014 PHPExcel (http://www.codeplex.com/PHPExcel)
 * @license    http://www.gnu.org/licenses/old-licenses/lgpl-2.1.txt	LGPL
 * @version    1.8.0, 2014-03-02
 */

/** Error reporting */
error_reporting(E_ALL);
ini_set('display_errors', TRUE);
ini_set('display_startup_errors', TRUE);
date_default_timezone_set('Europe/London');

if (PHP_SAPI == 'cli')
	die('This example should only be run from a Web Browser');

/** Include PHPExcel */
require_once '../Classes/PHPExcel.php';

require_once('../../config.php');

// Create new PHPExcel object
//$objPHPExcel = new PHPExcel();
$objReader = PHPExcel_IOFactory::createReader('Excel5');
$objPHPExcel = $objReader->load("templates/trainer-led.xls");


$course = $_GET['course'];
$startdate =  $_GET['startdate'];
$enddate =  $_GET['enddate'];
$firstname =  $_GET['firstname'];
$lastname =  $_GET['lastname'];

$sql = "SELECT * FROM evals WHERE course = '".$course."' AND today >= '".$startdate."' AND today <= '".$enddate."'";
if($firstname!=''){
    $sql.=" AND firstname = '".$firstname."'";
}
if($lastname!=''){
    $sql.=" AND lastname = '".$lastname."'";
}

$result = $conn->query($sql)
	or die($conn->errorCode());
 
$rows = array();
while($r = mysqli_fetch_assoc($result)) {
    $rows[]=$r;
}

$objPHPExcel->setActiveSheetIndex(0);
//$objPHPExcel->getActiveSheet()->setCellValue('D1', PHPExcel_Shared_Date::PHPToExcel(time()));
$objPHPExcel->getActiveSheet()->setCellValue('A5', $startdate . ' to ' . $enddate);

//echo $rows[0]['firstname'];
$baseRow = 9;
foreach($rows as $r ) {
	
	$objPHPExcel->getActiveSheet()->setCellValue('A'.$baseRow, $rows[0]['course'])
        ->setCellValue('B'.$baseRow, $r['firstname'])
        ->setCellValue('C'.$baseRow, $r['lastname'])
        ->setCellValue('D'.$baseRow, $r['company'])
        ->setCellValue('E'.$baseRow, $r['tel'])
        ->setCellValue('F'.$baseRow, $r['email'])
        ->setCellValue('G'.$baseRow, $r['start'])
        ->setCellValue('H'.$baseRow, $r['today'])
        ->setCellValue('I'.$baseRow, $r['trainer'])
        ->setCellValue('J'.$baseRow, $r['enthusiastic'])
        ->setCellValue('K'.$baseRow, $r['knowledgeable'])
        ->setCellValue('L'.$baseRow, $r['prepared'])
        ->setCellValue('M'.$baseRow, $r['participation'])
        ->setCellValue('N'.$baseRow, $r['communicates'])
        ->setCellValue('O'.$baseRow, htmlspecialchars(urldecode($r['trainerComments'])))
        ->setCellValue('P'.$baseRow, $r['objectives'])
        ->setCellValue('Q'.$baseRow, $r['organised'])
        ->setCellValue('R'.$baseRow, $r['pace'])
        ->setCellValue('S'.$baseRow, $r['activities'])
        ->setCellValue('T'.$baseRow, htmlspecialchars(urldecode($r['courseComments'])))
        ->setCellValue('U'.$baseRow, $r['confirmation'])
        ->setCellValue('V'.$baseRow, $r['classroom'])
        ->setCellValue('W'.$baseRow, $r['equipment'])
        ->setCellValue('X'.$baseRow, htmlspecialchars(urldecode($r['classroomComments'])))
        ->setCellValue('Y'.$baseRow, htmlspecialchars(urldecode($r['comments'])))
        ->setCellValue('Z'.$baseRow, $r['recommend'])
        ->setCellValue('AA'.$baseRow, $r['use']);
	                              
	 $baseRow++;                            
}




// Redirect output to a clientÃ¢ÂÂs web browser (Excel5)
header('Content-Type: application/vnd.ms-excel');
header('Content-Disposition: attachment;filename="customer-usage-'.gmdate('D, d M Y H:i:s').'-GMT.xls"');
header('Cache-Control: max-age=0');
// If you're serving to IE 9, then the following may be needed
header('Cache-Control: max-age=1');

// If you're serving to IE over SSL, then the following may be needed
header ('Expires: Mon, 26 Jul 1997 05:00:00 GMT'); // Date in the past
header ('Last-Modified: '.gmdate('D, d M Y H:i:s').' GMT'); // always modified
header ('Cache-Control: cache, must-revalidate'); // HTTP/1.1
header ('Pragma: public'); // HTTP/1.0

$objWriter = PHPExcel_IOFactory::createWriter($objPHPExcel, 'Excel5');
$objWriter->save('php://output');
exit;