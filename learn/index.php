<?php
session_start();
?>
<!doctype html>
<html>
<head>


<link rel="stylesheet" type="text/css" href="/1CSS/learn.css"/>
<link rel="stylesheet" type="text/css" href="/1CSS/topMenu.css"/>

</head>
<body>
<div id="background"></div>

<?php 
include $_SERVER['DOCUMENT_ROOT'] . '/site-includes/top-menu.php';
?>

<div id="mainContainer">
	<div id="pageName">Learn</div>
	
	<div id="searchRelativeBlock">
		<div id="searchAbsoluteBlock">
			<input type="text" id="mainSearchInput" placeholder="Search course content"/>
			<div id="mainSearchButton">
				<img id="searchIcon" src="/1images/searchIcon.png">
			</div>
		</div>
	</div>
	
	
	<div class="emptySpacer4"></div>
	
	<!--
	<div id="availableCourses">
		These are the subjects that are currently available:
	</div>
	-->
	
	<div id="courseBoxesContainer">
		<div class="courseBoxContainer">
			<a href="/learn/courses/calculus-1/introduction/text-lesson">
				<div class="greenCourseBox" id="calculus1"
					onmouseover="shinyCourse(this.id)"
					onmouseout="unshinyCourse(this.id)"
					onclick="crackedCourse(this.id)">
					<img src="/1images/glass.png" class="boxGlass" id="calculus1Glass">
					<img src="/1images/glass.png" class="boxImageHidden" id="calculus1ShinyGlass">
					<img src="/1images/crack1.png" class="boxImageHidden" id="calculus1Crack">
					<img src="/1images/texture2.png" class="boxTexture">
					<div class="courseDetailsContainer">
						<div class="courseTitleHeader">
							Calculus 1
						</div>
						<img src="/1images/sinx+x2.png" class="courseImage">
					</div>
				</div>
			</a>
			<div class="coursePostInfo">
				Contributors: 2
			</div>
		</div>
		
		<div class="courseBoxContainer">
			<a href="/learn/courses/modern-physics/introduction/text-lesson">
				<div class="redCourseBox" id="modernPhysics"
					onmouseover="shinyCourse(this.id)"
					onmouseout="unshinyCourse(this.id)"
					onclick="crackedCourse(this.id)">
					<img src="/1images/glass3.png" class="boxGlass" id="modernPhysicsGlass">
					<img src="/1images/glass.png" class="boxImageHidden" id="modernPhysicsShinyGlass">
					<img src="/1images/crack1.png" class="boxImageHidden" id="modernPhysicsCrack">
					<img src="/1images/texture2.png" class="boxTexture">
					<div class="courseDetailsContainer">
						<div class="courseTitleHeader">
							Modern Physics
						</div>
						<img src="/1images/energyEinstein.png" class="courseImage">
					</div>
				</div>
			</a>
			<div class="coursePostInfo">
				Contributors: 1
			</div>
		</div>
		
		<div class="courseBoxContainer">
			<a href="/learn/courses/modern-physics/introduction/text-lesson">
				<div class="redCourseBox" id="modernPhysics"
					onmouseover="shinyCourse(this.id)"
					onmouseout="unshinyCourse(this.id)"
					onclick="crackedCourse(this.id)">
					<img src="/1images/glass3.png" class="boxGlass" id="modernPhysicsGlass">
					<img src="/1images/glass.png" class="boxImageHidden" id="modernPhysicsShinyGlass">
					<img src="/1images/crack1.png" class="boxImageHidden" id="modernPhysicsCrack">
					<img src="/1images/texture2.png" class="boxTexture">
					<div class="courseDetailsContainer">
						<div class="courseTitleHeader">
							Modern Physics
						</div>
						<img src="/1images/energyEinstein.png" class="courseImage">
					</div>
				</div>
			</a>
			<div class="coursePostInfo">
				Contributors: 1
			</div>
		</div>
		
		
		
		<div class="courseBoxContainer">
			<div id="requestNewCourse" 
				onclick="inputRequestedCourse()">
				<div id="requestCourseDetailsContainer"
					onmouseover="this.style.opacity='.6';"
				onmouseout="this.style.opacity='.3';">
					<div class="courseTitleHeader">
							Request New Course
					</div>
					<div id="plusContainer">
						<div id="horizontalLine">
						</div>
						<div id="verticalLine">
						</div>
					</div>
					
				</div>
			</div>
		</div>
		
		<div id="inputRequestedCourseBox">
			<form name="requestCourseForm" action="/learn">
				Input requested course name:
				<br>
				<input type="text" name="requestedCourseName" style="width:16em;"/>
				<br>
				<input type="submit" name="requestedCourseSubmitted" value="Submit"/>
				<input type="button" value="Cancel"
					onclick="cancelRequestCourse()"/>
			</form>
		</div>
	
	</div>
	
	
	<div style="margin:4em 0 0 0;"></div>
	<div class="horizontalLine" ></div>
	
	<div class="relativeDiv" style="height:20em;margin:6em 0 0 0;">
		<div id="createAccountContainer">
			Log in to make your experience more personalized.
			<br><br>
			 <input type="text" id="usernameInput" placeholder="Username"/>
			<input type="password" id="passwordInput" placeholder="Password"/>
			<div id="loginButtonsContainer">
				<a href="/account" style="">
					<div id="loginButton" class="mainButton"
						onmouseover="this.style.boxShadow='0px 0px 10px #000000';
						this.style.backgroundColor='#3366FF';"
						onmouseout="this.style.boxShadow='0px 0px 0px #000000';
						this.style.backgroundColor='#44BB33';">
						<span class="buttonText">
							Log In
						</span>
						<img src="/1images/modern-button-shine.png" style="width:100%;height:100%;">
					</div>
				</a>
				<a href="/new-account" style="">
					<div id="newAccountButton" class="mainButton"
						onmouseover="this.style.boxShadow='0px 0px 10px #000000';
						this.style.backgroundColor='#3366FF';"
						onmouseout="this.style.boxShadow='0px 0px 0px #000000';
						this.style.backgroundColor='#44BB33';">
						<span class="buttonText">
							New Account
						</span>
						<img src="/1images/modern-button-shine.png" style="width:100%;height:100%;">
					</div>
				</a>
			</div>
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
	
	












<!--
<br>
<br>
learn
<br>
<br>
<a href="/">Home</a>
<br>
<br>
<a href="/learn/courses/calculus-1">Calculus 1</a>
<br>
<br>
<a href="/learn/courses/modern-physics">Modern Physics</a>
-->
</div>
<script src="/1JS/topMenu.js"></script>
<script src="/1JS/learn.js"></script>
</body>
</html>