


<?php
function registerNewUser($email,$password,$firstName,$lastName,$gender) {
	$messages = "";
	
	// Create connection
	$con=mysqli_connect("localhost","learnfla_aplia","q23rp98U","learnfla_testdb");

	// Check connection
	if (mysqli_connect_errno()) {
	  $messages .= "Failed to connect to MySQL: " . mysqli_connect_error();
	}


	// Create table if it doesn't exist
	if(!mysqli_query($con,"DESCRIBE Users")) {
		$sql = "CREATE TABLE Users 
		(
		PID INT NOT NULL AUTO_INCREMENT, 
		PRIMARY KEY(PID),
		Email VARCHAR(60),
		Password VARCHAR(255),
		FirstName VARCHAR(30),
		LastName VARCHAR(30),
		Gender CHAR(6)
		)";

		// Execute query
		if (mysqli_query($con,$sql)) {
		  $messages .= "Table persons created successfully<br>";
		} else {
		  $messages .= "Error creating table: " . mysqli_error($con);
		}
	}
	
	// Make sure the email is available:
	
	$sql = "SELECT * FROM Users WHERE Email LIKE '$email'";
	$result = mysqli_query($con,$sql);
	while($row = mysqli_fetch_array($result)) {
		$userData['emailErr'] = "The email address " . $row['Email'] . " is already registered on SwitchLearn";
		return $userData;
		mysqli_close($con);
		return;
	}
	
	
	require $_SERVER['DOCUMENT_ROOT'] . '/php/db/phpass-0.3/PasswordHash.php';
	$t_hasher = new PasswordHash(8, FALSE);
	$passwordHash = $t_hasher->HashPassword($password);
	
	
	$result = mysqli_query($con,"INSERT INTO Users (Email, Password, FirstName, LastName, Gender)
	VALUES ('$email','$passwordHash','$firstName','$lastName','$gender')");
	
	if (!$result) {
		$messages .= 'Invalid query: ' . mysql_errno($con) . mysql_error();
	}
	
	$pid = mysqli_insert_id($con);
	return array('PID'=>$pid,'messages'=>$messages);



	mysqli_close($con);
}
?>