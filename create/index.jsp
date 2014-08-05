<!doctype html>
<html>
<head>

<link rel="stylesheet" type="text/css" href="create.css"/>
<link rel="stylesheet" type="text/css" href="/1CSS/topMenu.css"/>

</head>
<body>
<div id="background"></div>

<%@ include file="/1JSP/topMenu.jsp" %>

<div id="mainContainer">
	<div id="pageName">
		Create
	</div>
	<div id="pageDescriptionSentence">
		Help us bring personalized learning to the world.
	</div>
	
	<div id="stepsContainer">
		<div class="stepBlock">
			<div class="stepHeader">
				Step 1
			</div>
			<div class="stepOptionsContainer">
				
				
				<select class="stepSelect" id="selectedCourse" view="6">
					<option class="selOption" id="chooseACourse" selected="true">
						- Choose a course -
					</option>
					<option class="selOption" id="calculus1">
						Calculus 1
					</option>
					<option class="selOption" id="modernPhysics">
						Modern Physics
					</option>
					<option class="selOption" id="modernPhysics">
						Modern Physics
					</option>
					<option class="selOption" id="modernPhysics">
						Modern Physics
					</option>
					<option class="selOption" id="modernPhysics">
						Modern Physics
					</option>
					<option class="selOption" id="modernPhysics">
						Modern Physics
					</option>
					<option class="selOption" id="modernPhysics">
						Modern Physics
					</option>
					<option class="selOption" id="modernPhysics">
						Modern Physics
					</option>
					<option class="selOption" id="modernPhysics">
						Modern Physics
					</option>
					<option class="selOption" id="modernPhysics">
						Modern Physics
					</option>
					<option class="selOption" id="modernPhysics">
						Modern Physics
					</option>
					<option class="selOption" id="modernPhysics">
						Modern Physics
					</option>
				</select>
				<br>
				or create a 
				<a href="/create/new-course">
					new course
				</a>
			</div>
		</div>
		<div class="stepBlock" id="step2Block">
			<div class="stepHeader">
				Step 2
			</div>
			<div class="stepOptionsContainer">
				<select class="stepSelect" id="selectedTopic">
					<option class="selOption" id="chooseATopic" selected="true">
						- Choose a topic -
					</option>
					<option class="selOption" id="chainRule">
						Chain Rule
					</option>
					<option class="selOption" id="productRule">
						Product Rule
					</option>
				</select>
				<br>
				or 
				<a href="/create/new-course">
					change the topic order.
				</a>
				
			</div>
		</div>
		<div class="stepBlock" id="step3Block">
			<div class="stepHeader">
				Step 3
			</div>
			<div class="stepOptionsContainer">
				Choose a link:
				<br>
				<ul id="mediumList">
					<li>
						<a href="/create/lesson-editor">
							Create a lesson
						</a>
					
					</li>
					<br>
					<li>
						<a href="/create/problem-editor">
							Create a practice problem
						</a>
					</li>
					<br>
					<li>
						<a href="/create/game-editor">
							Make a game
						</a>
					</li>
					<br>
				</ul>
			</div>
		</div>
		
	</div>
	<div style="margin:4em 0 0 0;"></div>
	<div class="horizontalLine"></div>
	
	<div class="relativeDiv" style="height:20em;margin:6em 0 0 0;">
		<div id="createAccountContainer">
				Log in to save your work and begin building up points.
			<br><br>
			 <input type="text" id="usernameInput" placeholder="Username"/>
			<input type="password" id="passwordInput" placeholder="Password"/>
			<div id="loginButtonsContainer">
				<a href="/account" style="">
					<div id="loginButton" class="mainButton" style="position:relative;"
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
					<div id="newAccountButton" class="mainButton" style="position:relative;"
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
	
	<div class="horizontalLine"></div>
	
	<div class="relativeDiv" style="height:20em;margin:6em 0 0 0;">
		<div id="inspirationContainer">
			The one exclusive sign of thorough knowledge is the power of teaching.
			<br><br>- Aristotle
		</div>
	</div>
	
</div>
<script src="/1JS/topMenu.js"></script>
<script src="create.js"></script>
</body>
</html>