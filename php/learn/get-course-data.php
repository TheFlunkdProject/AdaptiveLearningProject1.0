<?php

function getCourseData($coursePID) {
	$courseData = array();
	
	$con=mysqli_connect("localhost","learnfla_aplia","q23rp98U","learnfla_testdb");

	if (mysqli_connect_errno()) {
	  $courseData['messages'] .= "Failed to connect to MySQL: " . mysqli_connect_error();
	}
	
	$sql = "SELECT Name, TopicMenu FROM Courses WHERE PID LIKE '$coursePID'";
	$result = mysqli_query($con,$sql);
	while($row = mysqli_fetch_array($result)) {
		$courseData['Name'] = $row['Name'];
		$courseData['TopicMenu'] = $row["TopicMenu"];
	}
	
	//echo $row["TopicMenu"];

	return $courseData;

	mysqli_close($con);
}

