
<?php

function getCourseListWithTopic($topicID) {
	$jsonOut = array();
	
	// Create connection
	$con=mysqli_connect("localhost","learnfla_aplia","q23rp98U","learnfla_testdb");

	// Check connection
	if (mysqli_connect_errno()) {
	  $jsonOut['messages'] .= "Failed to connect to MySQL: " . mysqli_connect_error();
	}
	
	$jsonOut['courseList'] = array();
	
	$sql = "
		SELECT
			a.CourseID, a.TopicID, b.Name
		FROM CourseItems a, Courses b
			WHERE a.TopicID LIKE $topicID AND a.CourseID = b.PID";
	$result = mysqli_query($con,$sql);
	$i=0;
	while($row = mysqli_fetch_array($result)) {
		$jsonOut['courseList']["$i"] = array("courseID" => $row["CourseID"], "courseName" => $row["Name"]);
		$i++;
	}

	return $jsonOut;

	mysqli_close($con);
}

?>