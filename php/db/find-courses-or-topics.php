
<?php

function findCoursesOrTopics($search,$courseOrTopic) {
	$search = str_replace(" ", "%", $search);
	$jsonOut = array();
	
	// Create connection
	$con=mysqli_connect("localhost","learnfla_aplia","q23rp98U","learnfla_testdb");

	// Check connection
	if (mysqli_connect_errno()) {
	  $jsonOut['messages'] .= "Failed to connect to MySQL: " . mysqli_connect_error();
	}
	$jsonOut['finalSearchString'] = $search;
	
	$i = 0;
	$numberOfResults = 5;
	
	if ($courseOrTopic == "Course") {
	
		$sql = "
			SELECT DISTINCT
				b.PID,
				b.Name,
				IF (b.PID LIKE '$search', 1, 0) AS One,
				IF (b.Name LIKE '$search%', 1, 0) AS Two,
				IF (b.Name LIKE '%$search%', 1, 0) AS Three,
				IF (c.PID LIKE '$search', 1, 0) AS Four,
				IF (c.Name LIKE '%$search%', 1, 0) AS Five
			FROM Courses AS b
			LEFT JOIN CourseItems AS a ON b.PID = a.CourseID
			LEFT JOIN Topics AS c ON c.PID = a.TopicID
			WHERE b.PID LIKE '$search' OR b.Name LIKE '%$search%' OR c.PID LIKE '$search' OR c.Name LIKE '%$search%'
			ORDER BY One DESC, Two DESC, Three DESC, Four DESC, Five DESC
			LIMIT 0, $numberOfResults";
		
		$result = mysqli_query($con,$sql);
		while($row = mysqli_fetch_array($result)) {
			$jsonOut["courseList"][$i] = array("courseID" => $row["PID"], "courseName" => $row["Name"],
				"byTopicName" => $row["Five"]);
			$i++;
		}
	
	} else if ($courseOrTopic == "Topic") {
		$sql = "
			SELECT DISTINCT
				b.PID,
				b.Name,
				IF (b.PID LIKE '$search', 1, 0) AS One,
				IF (b.Name LIKE '$search%', 1, 0) AS Two,
				IF (b.Name LIKE '%$search%', 1, 0) AS Three
			FROM Topics AS b
			LEFT JOIN CourseItems AS a ON b.PID = a.TopicID
			WHERE b.PID LIKE '$search' OR b.Name LIKE '%$search%'
			ORDER BY One DESC, Two DESC, Three DESC
			LIMIT 0, $numberOfResults";
		
		$result = mysqli_query($con,$sql);
		while($row = mysqli_fetch_array($result)) {
			$jsonOut["topicList"][$i] = array("topicID" => $row["PID"], "topicName" => $row["Name"]);
			$i++;
		}
	}
	return $jsonOut;
// OR c.Name = '%$search%'
	mysqli_close($con);
}

?>