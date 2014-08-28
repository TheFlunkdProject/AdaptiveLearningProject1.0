
<?php
function insertCourseToTable($Name,$TopicMenu) {
	$messages = "";
	
	// Create connection
	$con=mysqli_connect("localhost","learnfla_aplia","q23rp98U","learnfla_testdb");

	// Check connection
	if (mysqli_connect_errno()) {
	  $messages .= "Failed to connect to MySQL: " . mysqli_connect_error();
	}


	// Create table if it doesn't exist
	if(!mysqli_query($con,"DESCRIBE Courses")) {
		$sql = "CREATE TABLE Courses 
		(
		PID INT NOT NULL AUTO_INCREMENT, 
		PRIMARY KEY(PID),
		Name VARCHAR(255),
		
		TopicMenu VARCHAR(32762)
		)";

		// Execute query
		if (mysqli_query($con,$sql)) {
		  $messages .= "Table Courses created successfully<br>";
		} else {
		  $messages .= "Error creating table: " . mysqli_error($con);
		}
	}

        

        
	
	$result = mysqli_query($con,"INSERT INTO Courses (Name, TopicMenu)
	VALUES ('$Name','$TopicMenu')");
	//
	//
	
	if (!$result) {
		$messages .= 'Invalid query: ' . mysql_error();
	}
	
	$pid = mysqli_insert_id($con);
	return array($pid,$messages);



	mysqli_close($con);
}
$TopicMenu= '{"1":"Introduction","2":"Batman"}';
$Name= "Superheroes";
echo $TopicMenu;
echo $Name;

function test($testing) {
	return $testing;
}

echo test("<br><br>function worked here<br><br>");


$result = insertCourseToTable($Name,$TopicMenu);
echo $result{0};
echo $result{1};
?>