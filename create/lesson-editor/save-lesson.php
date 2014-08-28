<?php
session_start();
$loggedIn = isset($_SESSION['loggedIn']);

$jsonOut = array();
$jsonOut['loggedIn'] = $loggedIn;

$agree = htmlspecialchars($_POST["agree"]);
$lessonName = htmlspecialchars($_POST["lessonName"]);
$lessonID = htmlspecialchars($_POST["lessonID"]);
$topicID = htmlspecialchars($_POST["topicID"]);
$lessonHTML = stripcslashes($_POST["theLesson"]);

$authorID;
if ($loggedIn) {
	$authorID = $_SESSION['userID'];
} else {
	$authorID = "0";
}
$jsonOut['authorID'] = $authorID;

if (($loggedIn || $agree) && $lessonName && $topicID  && $lessonHTML) {
	
	$sqlArray;
	// Check if user is saving an existing lesson:
	if ($lessonID) {
		// If the user changed the ID manually, this function will only save if he was the author or they were both anonymous.
		include $_SERVER['DOCUMENT_ROOT'] . '/php/db/save-existing-lesson.php';
		$sqlArray = saveExistingLesson($lessonID,$lessonName,$topicID,$authorID);
		
	} else {
		include $_SERVER['DOCUMENT_ROOT'] . '/php/db/insert-new-lesson-into-table.php';
		$sqlArray = insertNewLessonIntoTable($lessonName,$topicID,$authorID);
	}
	$pid = $jsonOut['PID'] = $sqlArray['PID'];
	$messages = $jsonOut['sqlMessages'] = $sqlArray['messages'];
	$sameAuthor = $jsonOut['sameAuthor'] = $sqlArray['sameAuthor'];

	if ($pid && $sameAuthor && !$messages) {
		if(!is_dir($_SERVER['DOCUMENT_ROOT'] . "/lessons")) {
			mkdir($_SERVER['DOCUMENT_ROOT'] . "/lessons");
		}
		if(!is_dir($_SERVER['DOCUMENT_ROOT'] . "/lessons/" . $pid % 1000)) {
			mkdir($_SERVER['DOCUMENT_ROOT'] . "/lessons/" . $pid % 1000);
		}
		if(!is_dir($_SERVER['DOCUMENT_ROOT'] . "/lessons/" . $pid % 1000 . "/" . $pid % 1000000)) {
			mkdir($_SERVER['DOCUMENT_ROOT'] . "/lessons/" . $pid % 1000 . "/" . $pid % 1000000);
		}
		$newURL = "/lessons/" . $pid % 1000 . "/" . $pid % 1000000 . "/" . $pid . ".source.php";
		$jsonOut['newURL'] = $newURL;
		$newPath = $_SERVER['DOCUMENT_ROOT'] . $newURL;
		$newLessonSourceFile = fopen("$newPath", "w") or die("Unable to open file!");
		fwrite($newLessonSourceFile, $lessonHTML);
		fclose($newLessonSourceFile);
		
		// Send back info:
		$jsonOut['lessonName'] = $lessonName;
		$jsonOut['status'] = "success";
	}
	
} else {
	$jsonOut['status'] = 'Incorrect parameters ($loggedIn || $agree) && $lessonName && $topicID && $lessonHTML';
}


echo json_encode($jsonOut);
?>