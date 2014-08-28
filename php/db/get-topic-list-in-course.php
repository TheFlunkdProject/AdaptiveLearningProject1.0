
<?php

function getTopicListInCourse($courseID) {
	$jsonOut = array();
	
	// Create connection
	$con=mysqli_connect("localhost","learnfla_aplia","q23rp98U","learnfla_testdb");

	// Check connection
	if (mysqli_connect_errno()) {
	  $jsonOut['messages'] .= "Failed to connect to MySQL: " . mysqli_connect_error();
	}
	
	$jsonOut['topicList'] = array();
	
	$sql = "
		SELECT
		   a.PID AS PID, b.PID AS TopicID, b.Name AS TopicName, c.PID AS SectionID, c.Name AS SectionName
		FROM CourseItems a
		LEFT JOIN Topics AS b ON a.TopicID = b.PID
		LEFT JOIN CourseSections AS c ON a.SectionID = c.PID
		WHERE a.CourseID = $courseID
		GROUP BY a.PID";
	$result = mysqli_query($con,$sql);
	$i = 0;
	while($row = mysqli_fetch_array($result)) {
		if($row['TopicID']) {
			$jsonOut['topicList']["$i"] = array("topicID" => $row['TopicID'], "topicName" => $row['TopicName']);
		} else if($row['SectionID']) {
			$jsonOut['topicList']["$i"] = array("sectionID" => $row['SectionID'], "sectionName" => $row['SectionName']);
		}
		$i++;
	}

	return $jsonOut;

	mysqli_close($con);
}

?>