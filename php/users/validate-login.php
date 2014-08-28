<?php
session_start();
?>
<?php
	// define variables and set to empty values
	$emailErr = $passwordErr = "";
	$email = $password = "";

	if ($_SERVER["REQUEST_METHOD"] == "POST") {
	
	   if (empty($_POST["email"])) {
		 $emailErr = "Email is required";
	   } else {
		 $email = test_input($_POST["email"]);
		 // check if e-mail address is well-formed
		 if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
		   $emailErr = "Invalid email format"; 
		 }
	   }

	   if (empty($_POST["password"])) {
		 $passwordErr = "Password is required";
	   } else {
		 $password = test_input($_POST["password"]);
		 // check if e-mail address is well-formed
	   }
	}

	function test_input($data) {
	   $data = trim($data);
	   $data = stripslashes($data);
	   $data = htmlspecialchars($data);
	   return $data;
	}
	
	$jsonOut = array(
		'email'=>$email,'emailErr'=>$emailErr,
		'passwordErr'=>$passwordErr
	);
	
	if ($email && $password &&!$emailErr&&!$passwordErr) {
	
		// Verify the user is in the database:
		include $_SERVER['DOCUMENT_ROOT'] . '/php/db/verify-user.php';
		$userArray = getUserData($email, $password);
		$jsonOut['sqlMessages'] = $userArray['messages'];
		$jsonOut['emailErr'] = $userArray['emailErr'];
		$jsonOut['passwordErr'] = $userArray['passwordErr'];
		
		// log the session in:
		if ($userArray['success'] == 'success') {
		
			$jsonOut['success'] = $userArray['success'];
			$_SESSION['loggedIn'] = 'true';
			$_SESSION['userID'] = $userArray['PID'];
			$_SESSION['firstName'] = $userArray['FirstName'];
			$_SESSION['lastName'] = $userArray['LastName'];
			$_SESSION['email'] = $userArray['Email'];
			$_SESSION['gender'] = $userArray['Gender'];
		
		} else {
			$jsonOut['success'] = 'fail';
		}
	}
	
	echo json_encode($jsonOut);
?>