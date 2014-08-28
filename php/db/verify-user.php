<?php

function getUserData($email, $password) {
	$userData = array();
	
	$con=mysqli_connect("localhost","learnfla_aplia","q23rp98U","learnfla_testdb");

	if (mysqli_connect_errno()) {
	  $userData['messages'] .= "Failed to connect to MySQL: " . mysqli_connect_error();
	}
	
	
	$storedPasswordHash = '';
	$sql = "SELECT * FROM Users WHERE Email LIKE '$email'";
	$result = mysqli_query($con,$sql);
	while($row = mysqli_fetch_array($result)) {
		$storedPasswordHash = $row['Password'];
	}
	
	if (!$storedPasswordHash) {
		$userData['messages'] .= "Invalid email address";
		$userData['emailErr'] .= "Invalid email address";
		
		mysqli_close($con);
		return $userData;

		return;
	}
	
	require $_SERVER['DOCUMENT_ROOT'] . '/php/db/phpass-0.3/PasswordHash.php';
	
	$hasher = new PasswordHash(8, FALSE);
	
	
	$check = $hasher->CheckPassword($password, $storedPasswordHash);
	
	if ($check) {
		$userData['success'] = 'success';
		$sql = "SELECT * FROM Users WHERE Email LIKE '$email'";
		$result = mysqli_query($con,$sql);
		while($row = mysqli_fetch_array($result)) {
			$userData['PID'] = $row['PID'];
			$userData['Email'] = $row['Email'];
			$userData['FirstName'] = $row['FirstName'];
			$userData['LastName'] = $row['LastName'];
			$userData['Gender'] = $row['Gender'];
		}
	} else {
		$userData['messages'] .= 'Incorrect password';
		$userData['passwordErr'] .= 'Incorrect password';
	}

	return $userData;

	mysqli_close($con);
}

