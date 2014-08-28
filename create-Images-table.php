


<?php
function insertImageToTable($imageName,$imageType,$imageDescription) {
	$messages = "";
	
	// Create connection
	$con=mysqli_connect("localhost","learnfla_aplia","q23rp98U","learnfla_testdb");

	// Check connection
	if (mysqli_connect_errno()) {
	  $messages .= "Failed to connect to MySQL: " . mysqli_connect_error();
	}


	// Create table if it doesn't exist
	if(!mysqli_query($con,"DESCRIBE Images")) {
		$sql = "CREATE TABLE Images 
		(
		PID INT NOT NULL AUTO_INCREMENT, 
		PRIMARY KEY(PID),
		Name VARCHAR(50),
		Type CHAR(5),
		Description VARCHAR(255)
		)";

		// Execute query
		if (mysqli_query($con,$sql)) {
		  $messages .= "Table persons created successfully<br>";
		} else {
		  $messages .= "Error creating table: " . mysqli_error($con);
		}
	}

	
	$result = mysqli_query($con,"INSERT INTO Images (Name, Type, Description)
	VALUES ('$imageName','$imageType','$imageDescription')");
	//
	//$
	
	if (!$result) {
		$messages .= 'Invalid query: ' . mysql_error();
	}
	
	$pid = mysqli_insert_id($con);
	return array($pid,$messages);



	mysqli_close($con);
}
?>