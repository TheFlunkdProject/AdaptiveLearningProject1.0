<?php
session_start();
$loggedIn = isset($_SESSION['loggedIn']);

$topicID = htmlspecialchars($_POST["topicID"]);


if ($topicID) {
	
	include $_SERVER['DOCUMENT_ROOT'] . '/php/db/get-course-list-with-topic.php';
	$sqlArray = getCourseListWithTopic($topicID);
	//echo var_dump(json_decode(stripslashes($sqlArray['topicOutline']), true));
	//$sqlArray['topicOutline'];
	//$topicOutline = $jsonOut['topicOutline'] =  json_decode('{"Include":{"1":"things"},"Exclude":{"1":"job"}}', true);
	$courseList = $jsonOut['courseList'] = $sqlArray['courseList'];
	$messages .= $jsonOut['sqlMessages'] = $sqlArray['messages'];
	

	if ($courseList && !$messages) {
		$jsonOut['status'] = "success";
	}
	
} else {
	$jsonOut['status'] = 'No topic ID given.';
}


echo json_encode($jsonOut);
?>