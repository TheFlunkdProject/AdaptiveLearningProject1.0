


<?php
function insertNewLessonIntoTable($lessonName,$topicID,$authorID) {
	$sqlOut = array();
	
	// Create connection
	$con=mysqli_connect("localhost","learnfla_aplia","q23rp98U","learnfla_testdb");

	// Check connection
	if (mysqli_connect_errno()) {
	  $sqlOut['messages'] .= "Failed to connect to MySQL: " . mysqli_connect_error();
	}

	//$result = mysqli_query($con,"SET time_zone = 'America/Denver'");
	
	$result = mysqli_query($con,"INSERT INTO Lessons (Name, TopicID, LastSaveDate, AuthorID)
	VALUES ('$lessonName','$topicID',CONVERT_TZ(NOW(),'+01:00','+00:00'),'$authorID')");
	
	$sqlOut['sameAuthor'] = "necessity";
	
	if (!$result) {
		$sqlOut['messages'] .= 'Invalid query: ' . mysql_error();
	}
	
	$sqlOut['PID'] = mysqli_insert_id($con);
	return $sqlOut;



	mysqli_close($con);
}
?>