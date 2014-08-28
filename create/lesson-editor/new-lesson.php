<?php
session_start();
$loggedIn = isset($_SESSION['loggedIn']);

$topicID = htmlspecialchars($_POST["topicID"]);


if ($topicID) {
	
	include $_SERVER['DOCUMENT_ROOT'] . '/php/db/get-topic-outline.php';
	$sqlArray = getTopicOutline($topicID);
	//echo var_dump(json_decode(stripslashes($sqlArray['topicOutline']), true));
	//$sqlArray['topicOutline'];
	//$topicOutline = $jsonOut['topicOutline'] =  json_decode('{"Include":{"1":"things"},"Exclude":{"1":"job"}}', true);
	$topicOutline = $jsonOut['topicOutline'] = json_decode($sqlArray['topicOutline'], true);
	$messages .= $jsonOut['sqlMessages'] = $sqlArray['messages'];
	

	if ($topicOutline && !$messages) {
		$jsonOut['status'] = "success";
	}
	
} else {
	$jsonOut['status'] = 'No topic ID given.';
}


echo json_encode($jsonOut);
?>