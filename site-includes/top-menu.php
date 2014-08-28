<script>
currentURL=window.location.href;
</script>
<div id="topbannerContainer">
<div id="topMenuContainer">
	<div id="menuHome">
		<a class="menu" href="/">
		<div id="menuHomeText">
		SwitchLearn
		</div>
		</a>
		<div class="menuUnderline"> 
			<script>
			if (currentURL.length < 25) {
				menuUnderlines=document.getElementsByClassName('menuUnderline');
				menuUnderlines[0].style.opacity='1';
				}
			</script>
		</div>
	</div>
	<div id="menuLearnDiv">
		<a class="menu" href="/learn">
		<div id="menuLearnText">
		Learn
		</div>
		</a>
		<div class="menuUnderline"> 
			<script>
			if (currentURL.indexOf('/learn') != -1) {
				menuUnderlines=document.getElementsByClassName('menuUnderline');
				menuUnderlines[1].style.opacity='1';
				}
			</script>
		</div>
	</div>
	<!--<div class="spacerLine"></div>
	<div id="menuCourse1">
		<a class="menu" href="/Calculus1/Calculus1.jsp">
		<div id="menuCourse1Text">
		Calculus 1
		</div>
		</a>
	</div>-->
	<!--<div id="menuCourse2">
		<a class="menu" href="#">
		<div id="menuCourse2Text">
		Linear Algebra
		</div>
		</a>
	</div>-->
	<!--<div id="menuCourse3">
		<a class="menu" href="/ModernPhysics/ModernPhysics.jsp">
		<div id="menuCourse3Text">
		Modern Physics
		</div>
		</a>
	</div>-->
	<div id="menuCreateDiv">
		<a class="menu" href="/create">
		<div id="menuCreateText">
		Create
		</div>
		</a>
		<div class="menuUnderline"> 
			<script>
			if (currentURL.indexOf('create') != -1) {
				menuUnderlines=document.getElementsByClassName('menuUnderline');
				menuUnderlines[2].style.opacity='1';
				}
			</script>
		</div>
	</div>
	<div id="menuDonateDiv">
		<a class="menu" href="/donate">
		<div id="menuDonateText">
		Donate
		</div>
		</a>
		<div class="menuUnderline"> 
			<script>
			if (currentURL.indexOf('donate') != -1) {
				menuUnderlines=document.getElementsByClassName('menuUnderline');
				menuUnderlines[3].style.opacity='1';
				}
			</script>
		</div>
	</div>
	<div id="feedbackDiv" onclick="feedbackInputBoxOn();" onmouseover="this.cursor = 'pointer';">
		<a class="menu">
			<div id="feedbackText">
			Feedback
			</div>
		</a>
	</div>
	<div id="menuSearchDiv">
		<div id="menuSearchContainer">
			<input type="text" id="searchInput" placeholder="search"/>
			<div id="searchButton">
				<img id="searchIcon" src="/1images/searchIcon.png">
				<!--<img src="/1images/modern-button-shine.png" style="position:absolute;
				left:0%;right:0%;top:0%;bottom:0%;">-->
			</div>
		</div>
	</div>
	
	<?php
		if($_SESSION['loggedIn'] == 'true') {
			?>
				<div id="menuAccountDiv">
					<a class="menu" href="/account">
						<div id="menuAccountText">
							Account
						</div>
					</a>
					<div class="menuUnderline"> 
						<script>
						if (currentURL.indexOf('account') != -1) {
							menuUnderlines=document.getElementsByClassName('menuUnderline');
							menuUnderlines[4].style.opacity='1';
							}
						</script>
					</div>
				</div>
			<?php
		} else {
			?>
				<div id="menuLoginDiv">
					<a class="menu" href="/login">
						<div id="menuLoginText">
							Login
						</div>
					</a>
					<div class="menuUnderline"> 
						<script>
						if (currentURL.indexOf('login') != -1) {
							menuUnderlines=document.getElementsByClassName('menuUnderline');
							menuUnderlines[4].style.opacity='1';
							}
						</script>
					</div>
				</div>
			<?php
		}
	?>
		
</div>
<div class="horizontalLine"></div>
</div>
<div id="feedbackInputBox">
	<div id="feedbackInstructions">
		Please tell us what you think about SwitchLearn.
	</div>
	<textarea id="feedbackInput"></textarea>
	<div id="feedbackSuggestions">
	</div>
	<input type="button" name="submitFeedback" id="submitFeedback" value="Submit" 
		onclick="feedbackInputSubmit()" />
	<input type="button" name="cancelFeedback" id="cancelFeedback" value="Cancel" 
		onclick="feedbackInputBoxOff()" />
</div>
<div id="thanksForFeedbackBox">
	<div id="thanksForFeedback">
		Thanks for your input!
	</div>
</div>
<div id="formsContainer">
	<form name="submitFeedbackForm" id="submitFeedbackForm" action="" method="post">
		<input type="hidden" name="feedbackInputInForm" id="feedbackInputInForm" />
	</form>
</div>
<?php
$feedback = htmlspecialchars($_POST["feedbackInputInForm"]);
if ($feedback != "") {
	
	// Write date, IP, and feedback to /feedback.txt:
	date_default_timezone_set("America/Denver");
	$d = getdate();
	$d = "$d[mon]/$d[mday]/$d[year] at $d[hours]:$d[minutes]:$d[seconds]";
	$theIP = $_SERVER['REMOTE_ADDR'];
	$feedback = "\r\n\r\nFeedback given on $d by user at IP $theIP:\r\n$feedback";
	
	file_put_contents($_SERVER['DOCUMENT_ROOT'] . "/feedback.txt", $feedback, FILE_APPEND);
	
	?>
	<script>
	alert('Thanks for your feedback!');
	</script>
	<?php
}
?>