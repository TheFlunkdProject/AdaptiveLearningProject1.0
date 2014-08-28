<?php
function saveExistingLesson($lessonID,$lessonName,$topicID,$authorID) {
	// The only thing this function does is update the LastSaveDate column IF the author is the real author.
	$sqlOut = array();
	
	// Create connection
	$con=mysqli_connect("localhost","learnfla_aplia","q23rp98U","learnfla_testdb");

	// Check connection
	if (mysqli_connect_errno()) {
	  $sqlOut['messages'] .= "Failed to connect to MySQL: " . mysqli_connect_error();
	}

	//$result = mysqli_query($con,"SET time_zone = 'America/Denver'");
	
	$result = mysqli_query($con,"UPDATE Lessons SET LastSaveDate=CONVERT_TZ(NOW(),'+01:00','+00:00')
		WHERE PID=$lessonID AND AuthorID = '$authorID'");
	//
	//$
	$sqlOut['sameAuthor'] = mysqli_affected_rows($con); // returns 1 if 1 row is affected (author matched, update made)
	
	if (!$result) {
		$sqlOut['messages'] .= 'Invalid query: ' . mysql_error();
	}
	
	$sqlOut['PID'] = $lessonID;
	return $sqlOut;

	mysqli_close($con);
}
?>