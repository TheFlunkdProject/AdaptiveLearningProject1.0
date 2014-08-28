<?php
session_start();
$loggedIn = isset($_SESSION['loggedIn']);

$courseID = htmlspecialchars($_POST["courseID"]);


if ($courseID) {
	
	include $_SERVER['DOCUMENT_ROOT'] . '/php/db/get-topic-list-in-course.php';
	$sqlArray = getTopicListInCourse($courseID);
	//echo var_dump(json_decode(stripslashes($sqlArray['topicOutline']), true));
	//$sqlArray['topicOutline'];
	//$topicOutline = $jsonOut['topicOutline'] =  json_decode('{"Include":{"1":"things"},"Exclude":{"1":"job"}}', true);
	$topicList = $jsonOut['topicList'] = $sqlArray['topicList'];
	$messages .= $jsonOut['sqlMessages'] = $sqlArray['messages'];
	

	if ($topicList && !$messages) {
		$jsonOut['status'] = "success";
	}
	
} else {
	$jsonOut['status'] = 'No course ID given.';
}


echo json_encode($jsonOut);
?>