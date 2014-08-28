<?php
session_start();
?>
<!doctype html>
<html>
<head>

<link rel="stylesheet" type="text/css" href="/1CSS/login.css"/>
<link rel="stylesheet" type="text/css" href="/1CSS/topMenu.css"/>

</head>
<body>


<div id="background"></div>

<?php 
include $_SERVER['DOCUMENT_ROOT'] . '/site-includes/top-menu.php';
?>

<div id="mainContainer">

	<div class="pageName">Sign in:</div>
	
	<div class="inputsBlock">
		<div class="inputsContainer">
			

			<form name="loginForm" id="loginForm" method="post"> 
			   
			   E-mail: <input type="text" class="floatRight darkInputs" name="emailSignin" autocomplete="email">
			   <span class="error floatRight">* </span>
			   <br><br><br>
			   Password: <input type="password" class="floatRight darkInputs" name="passwordSignin">
			   <span class="error floatRight">* </span>
			   <br><br>
			   <div class="error" id="signinErrorsContainer"></div>
			   <br>
			   <input type="submit" name="submitLogin" id="submitLogin" value="Sign In"> 
			   <div class="error" id="signinErrorsContainer"></div>
			</form>
			

		</div>
	</div>

	<div class="pageName">Register:</div>
	
	<div class="inputsBlock">
		<div class="inputsContainer">
			

			<form name="registerForm" id="registerForm" method="post"> 
			   
			   E-mail: <input type="text" class="floatRight darkInputs" name="email">
			   <span class="error floatRight" id="emailErr">* </span>
			   <br><br><br>
			   Password: <input type="password" class="floatRight darkInputs" name="password">
			   <span class="error floatRight" >(At least 8 characters) * </span>
			   <br><br><br>
			   Repeat password: <input type="password" class="floatRight darkInputs" name="passwordRepeat">
			   <span class="error floatRight" >* </span>
			   <br><br><br>
			   First name: <input type="text" class="floatRight darkInputs" name="firstName">
			   <span class="error floatRight" >* </span>
			   <br><br><br>
			   Last name: <input type="text" class="floatRight darkInputs" name="lastName">
			   <span class="error floatRight" >* </span>
			   
			   <br><br><br>
			   
			   Gender:
			   <input type="radio" name="gender" class="floatRight darkInputs" value="female"><span class="floatRight">&nbsp;&nbsp;Female</span>
			   <input type="radio" name="gender" class="floatRight darkInputs" value="male"><span class="floatRight">Male</span>
			   <span class="error floatRight" >* </span>
			   <br><br>
			   <div class="error" id="errorsContainer"></div><br>
			   <input type="submit" name="submitRegistration" id="submitRegistration" value="Register"> 
			</form>
			

		</div>
	</div>
	
	
	<div class="emptySpacer4"></div>
	<div class="horizontalLine" ></div>
	
	<div class="relativeDiv" style="height:20em;margin:6em 0 0 0;">
		<div id="inspirationContainer">
			"Education is the most powerful weapon which you can use to change the world."
			<br><br>- Nelson Mandela
		</div>
	</div>
	
	
</div>
<script src="/1JS/topMenu.js"></script>
<script src="/1JS/useful-functions.js"></script>
<script src="/1JS/login.js"></script>
</body>
</html>