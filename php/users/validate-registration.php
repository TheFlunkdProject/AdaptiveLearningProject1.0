<?php
session_start();
?>
<?php
	// define variables and set to empty values
	$emailErr = $passwordErr = $firstNameErr = $lastNameErr = $genderErr = "";
	$email = $password = $passwordRepeat = $firstName = $lastName = $gender = "";

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
			// check if password is well-formed
			if (strlen($password) < 8) {
				$passwordErr = "Password must be at least 8 characters";
			}
		}
		
		if (empty($_POST["passwordRepeat"])) {
			$passwordErr = "Please repeat the password";
		} else {
			$passwordRepeat = test_input($_POST["passwordRepeat"]);
			// check if passwords match
			if ($password != $passwordRepeat) {
				$passwordErr = "Passwords do not match";
			}
		}
	
		if (empty($_POST["firstName"])) {
			$firstNameErr = "First name is required";
		} else {
			$firstName = test_input($_POST["firstName"]);
			// check if name only contains letters and whitespace
			if (!preg_match("/^[a-zA-Z ]*$/",$firstName)) {
				$firstNameErr = "Only letters and white space allowed"; 
			}
		}
	   
		if (empty($_POST["lastName"])) {
			$lastNameErr = "Last name is required";
		} else {
			$lastName = test_input($_POST["lastName"]);
			// check if name only contains letters and whitespace
			if (!preg_match("/^[a-zA-Z ]*$/",$lastName)) {
			$lastName = "Only letters and white space allowed"; 
			}
		}
		
	
		if (empty($_POST["gender"])) {
			$genderErr = "Gender is required";
		} else {
			$gender = test_input($_POST["gender"]);
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
		'passwordErr'=>$passwordErr,
		'firstName'=>$firstName,'firstNameErr'=>$firstNameErr,
		'lastName'=>$lastName,'lastNameErr'=>$lastNameErr,
		'gender'=>$gender,'genderErr'=>$genderErr
		
	);
	
	if ($email && $password && $firstName && $lastName && $gender &&!$emailErr&&!$passwordErr&&!$firstNameErr&&!$lastNameErr&&!$genderErr) {
		
		// Send the new user to the database unless the email is already taken:
		include $_SERVER['DOCUMENT_ROOT'] . '/php/db/register-new-user.php';
		$sqlArray = registerNewUser($email,$password,$firstName,$lastName,$gender);
		$jsonOut['sqlMessages'] = $sqlArray['messages'];
		$jsonOut['emailErr'] = $sqlArray['emailErr'];
		echo $sqlArray['messages'];
		
		// Check that the email was available:
		if (!$sqlArray['emailErr']) {
		
			// log the session in:
			$jsonOut['success'] = 'success';
			$jsonOut['pid'] = $sqlArray['PID'];
			
			$_SESSION['loggedIn'] = 'true';
			$_SESSION['firstName'] = $firstName;
			$_SESSION['lastName'] = $lastName;
			$_SESSION['email'] = $email;
		}
	}
	
	echo json_encode($jsonOut);
?>