
<?php

function getTopicOutline($topicID) {
	$jsonOut = array();
	
	// Create connection
	$con=mysqli_connect("localhost","learnfla_aplia","q23rp98U","learnfla_testdb");

	// Check connection
	if (mysqli_connect_errno()) {
	  $jsonOut['messages'] .= "Failed to connect to MySQL: " . mysqli_connect_error();
	}
	
	$sql = "
		SELECT
			PID, Outline
		FROM Topics
			WHERE PID LIKE $topicID";
		
	$result = mysqli_query($con,$sql);
	while($row = mysqli_fetch_array($result)) {
		$jsonOut['topicOutline'] = $row['Outline'];
	}

	return $jsonOut;

	mysqli_close($con);
}

?>