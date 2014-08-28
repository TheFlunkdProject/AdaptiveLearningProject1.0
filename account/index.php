<?php
session_start();
?>
<!doctype html>
<html>
<head>

<link rel="stylesheet" type="text/css" href="/1CSS/account.css"/>
<link rel="stylesheet" type="text/css" href="/1CSS/topMenu.css"/>

<?php
	if (!isset($_SESSION['loggedIn'])) {
		// Redirect if they aren't logged in:
		?>
			<script>
				window.location.replace("http://switchlearn.com/login/");
			</script>
		<?php
	}
?>
</head>
<body>

<div id="background"></div>
<?php 
include $_SERVER['DOCUMENT_ROOT'] . '/site-includes/top-menu.php';
?>


<div style="position:absolute;width:5px;height:600px;background-color:#000000;left:0%;top:0;z-index:20;
opacity:.3;border-style:solid;border-width:0px 1px;border-color:#555555;">
</div>

<div id="mainContainer">
	<div class="l1Container" id="userMainInfoContainer">
		<div class="leftFloatColumn" id="imageContainerColumn">
			<div id="userImageContainer">
				<img src="/1images/default_original_profile_pic.png" id="userImage"/>
			</div>
			<div id="userName">
				<?php 
					echo $_SESSION['firstName'];
				?>
			</div>
		</div>
		<div class="leftFloatColumn" id="userOptionsColumn">
			<form name="logoutForm">
				<input type="submit" style="display:none" name="submit" value="Log out"/>
				<a class="whiteLink logoutLink">Log out</a>
			</form>
		</div>
		<div id="totalPointsDisplayColumn">
			<br>
			<div id="totalPointsLabel">
				Total points:
			</div>
			<div id="totalPoints">
				3037
			</div>
		</div>
		
	</div>
	<div class="l1Container learnCreateContainers" id="learnInformationContainer">
		<br>
		Total learn points:
		<br>
		30
		<ul>
		<li>
		Liked lessons
		</li>
		<li>
		Starred lessons
		</li>
		<li>
		Course progress
		</li>
		</ul>
	</div>
	<div class="l1Container learnCreateContainers" id="createInformationContainer">
		<br>
		Total create points:
		<br>
		3007
		<ul>
		<li>
		Published courses
		</li>
		<li>
		Published lessons
		</li>
		<li>
		Other things
		</li>
		</ul>
	</div>

</div>
<script src="/1JS/topMenu.js"></script>
<script src="/1JS/logout.js"></script>
</body>
</html>