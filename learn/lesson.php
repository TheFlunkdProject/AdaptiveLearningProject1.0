<?php
session_start();
?>
<?php 
	$appRoot = $_SERVER['DOCUMENT_ROOT'];
	
	$coursePID = $_GET['course'];
	include $appRoot . '/php/learn/get-course-data.php';
	$courseData = getCourseData($coursePID);
	$courseName = $courseData['Name'];
	if (!$courseData) echo "no course data";
	$menuArray = json_decode($courseData['TopicMenu'],true);
	if (!$courseData['TopicMenu']) echo "no menu returned";
	echo $courseData['messages'];
	
	$topicPID = $_GET['topic'];
	if (!$topicPID) {
		$topicPID = key($menuArray); // returns the first key in the array (PID of first topic)
	}
	
	// Determine lesson PID and path
	$lessonPID = $_GET['lesson'];
	if ($lessonPID) {
		$lessonPID = intval($lessonPID);
	} else {
		$lessonPID = 0;
		// Code to find good lesson matching SESSION parameters
		// Code to get the most popular lesson
	}
	$lessonRealPath = "$appRoot/lessons/" . $lessonPID % 1000 . "/" . $lessonPID % 1000000 . "/" . $lessonPID . ".php";
		
?>
<!doctype html>
<html>
<head>

<link rel="stylesheet" type="text/css" href="/1CSS/lesson-page.css"/>
<link rel="stylesheet" type="text/css" href="/1CSS/topMenu.css"/>
<link rel="stylesheet" type="text/css" href="/1CSS/lesson.css"/>
</head>
<body>

<div id="background"></div>
<?php
	include $appRoot . '/site-includes/top-menu.php'; // echoes the contents
?>
<div style="color:#fff;font-size:2em;">
<?php
	echo "$coursePID<BR>$topicPID<BR>$lessonPID";
?>
</div>

<div id="mainContainer">

	<div id="pageLocation">
		<span id="locationCourseTitle" 
			onmouseover="courseMenuOn()"
			onmouseout="courseMenuOff()">
			<?php 
				echo $courseName;
			?>
			<div style="display:inline-block;width:1.25em;height:1em;">
				<img src="/1images/downArrowWhite.png" class="dropDownArrow">
			</div>
		</span>
		<div style="display:inline-block;width:1.5em;height:1em;">
			<img src="/1images/rightArrowWhite.png" class="navRightArrow">
		</div>
		<span id="locationTopicTitle" 
			onmouseover="topicMenuOn()"
			onmouseout="topicMenuOff()">
			
			<?php
				echo $menuArray[$topicPID];
			?>
			<div style="display:inline-block;width:1.25em;height:1em;">
				<img src="/1images/downArrowWhite.png" class="dropDownArrow">
			</div>
			
		</span>
	</div>
	<div id="courseMenu" 
		onmouseover="courseMenuOn()"
		onmouseout="courseMenuOff()">
		
	</div>
	<div id="topicMenu" 
			onmouseover="topicMenuOn()"
			onmouseout="topicMenuOff()">
		<?php
			$timeStart = microtime();
			include $appRoot . '/php/functions/assemble-topic-menu.php';
			echo assembleTopicMenu($coursePID, $courseName, $menuArray);
			echo microtime() - $timeStart;
		?>
	</div>
	
	<div id="mainMaterialContainer">
		<div id="rightPage">
			<div id="rightPageTabs">
				<div id="informationHeader" class="tab activeTab"
						onclick="toggleClassOnGroupOffGroup([this.id],['activeTab'],['preferencesHeader','toolsHeader']);
						toggleClassOnGroupOffGroup(['informationContainer'],['displayContents'],['toolsContainer','preferencesContainer']);">
					Info
				</div>
				
				<div id="preferencesHeader" class="tab"
						onclick="toggleClassOnGroupOffGroup([this.id],['activeTab'],['informationHeader','toolsHeader']);
						toggleClassOnGroupOffGroup(['preferencesContainer'],['displayContents'],['informationContainer','toolsContainer']);">
					 Preferences
				</div>
				
				<div id="toolsHeader" class="tab"
						onclick="toggleClassOnGroupOffGroup([this.id],['activeTab'],['informationHeader','preferencesHeader']);
						toggleClassOnGroupOffGroup(['toolsContainer'],['displayContents'],['informationContainer','preferencesContainer']);">
					Tools
				</div>
			</div>
			
			<div id="rightPageContents">
				<div id="rightPageBody">
					<!--<img src="/1images/downArrowBlack.png" class="dropDownArrow">-->
					
					
					
					<div id="informationContainer" class="hideContents displayContents">
						<div class="floatLeftHalf">
							<b>Author:</b>
							<br>
							<b>Date Created:</b>
							<br>
							<b>Length:</b>
							<br>
							<b>Visual content:</b>
							<br>
							<b>Views:</b>
							<br>
						</div>
						<div class="floatRightHalf">
							pears22
							<br>
							28 May 2014
							<br>
							1/10
							<br>
							7/10 
							<br>
							1
						</div>
						<span id="likesSpan">
								<img src="/1images/like.png" class="icon"> 0
								<img src="/1images/dislike.png" class="icon"> 0
						</span>
						<br>
						<div id="userJudgements">
							<img src="/1images/like.png" class="iconSideMargins">
							<img src="/1images/dislike.png" class="iconSideMargins">
							<img src="/1images/starBlack.png" class="iconSideMargins"> 
							<img src="/1images/flagBlack.png" class="iconSideMargins">
							<img src="/1images/statsBlack.png" class="iconSideMargins">
						</div>
					</div>
					
					<div id="preferencesContainer" class="hideContents">
					
						<div class="preferenceContainer">
							<div class="preferenceHeader">
								<input type="checkbox" />
								Length: <output name="preferredLengthOutput" 
										id="preferredLengthOutput" for="preferredLength">
										1
									</output>
							</div>
							<div class="preferenceMinLabel">
								Short
							</div>
							<div class="preferenceMaxLabel">
								Long
							</div>
							<div class="sliderContainer">
								<input type="range" name="preferredLength" 
									id="preferredLength" class="slider" 
									min="1" max="10" value="1" 
									oninput="preferredLengthOutput.value=preferredLength.value"/>
								<div class="sliderDisplay"><!-- orient="vertical" for firefox -->
									
								</div>
							</div>
							<div class="preferenceMinLabel">
								1
							</div>
							<div class="preferenceMaxLabel">
								10
							</div>
							<div class="preferenceHeader">
								
							</div>
						</div>
						
						<div class="preferenceContainer">
							<div class="preferenceHeader">
								<input type="checkbox" />
								Visualness: <output name="preferredVisualOutput" 
										id="preferredVisualOutput" for="preferredVisual">
										1
									</output>
							</div>
							<div class="preferenceMinLabel">
								Textual
							</div>
							<div class="preferenceMaxLabel">
								Visual
							</div>
							<div class="sliderContainer">
								<input type="range" name="preferredVisual" 
									id="preferredVisual" class="slider" orient="vertical" 
									min="1" max="10" value="1" 
									oninput="preferredVisualOutput.value=preferredVisual.value"/> 
									<!--"orient" is for firefox-->
								<div class="sliderDisplay">
									
								</div>
							</div>
							<div class="preferenceMinLabel">
								1
							</div>
							<div class="preferenceMaxLabel">
								10
							</div>
						</div>
						
						<br style="clear:both">
						<br><input type="button" value="Apply Preferences"/>
						<br><br><br>
						Log in to personalize your learning:
						<br><input type="text" id="usernameInput" placeholder="Username"/>
						<br><input type="password" id="passwordInput" placeholder="Password"/>
						<br><input type="button" id="loginButton" value="Log In"/>
						<input type="button" id="newAccountButton" value="New Account"/>
						<br>
					</div>
					
					<div id="toolsContainer" class="hideContents">
						<br><br>
						Wolfram API
						<br><br>
					</div>
					
					
				</div>
			</div>
			<div id="detailsFooter">
				facebook
			</div>
		<br style="clear:both" />
		</div>
		
		<div id="leftPage">
		
			<div id="lessonTopNav">
				<a href="#">
					<span class="previousLesson">
						
						<img src="/1images/leftArrowNavBlack.png" class="prevArrow">
							<span class="verticalAlign">
								Prev. Lesson
							</span>
					</span>
				</a>
				<div class="centerNavIconHolder">
					<img src="/1images/textIcon3.png" class="textIcon">
					<img src="/1images/videoCamera.png" class="videoIcon">
					<img src="/1images/writeIcon.png" class="writeIcon">
				</div>
				<a href="#">
					<span class="nextLesson">
						<span class="verticalAlign">
							Next Lesson
						</span>
						<img src="/1images/rightArrowNavBlack.png" class="nextArrow">
					</span>
				</a>
			</div>
			
			
			<div id="lessonHeader">
				<?php
					echo $menuArray[$topicPID];
				?>
			</div>
			<div id="lessonBody">
				<?php
					include $lessonRealPath;
				?>
			</div>
			<div id="lessonFooter">
				<a href="#">
					Examples/Practice
				</a>
			</div>
			<div id="lessonBottomNav">
				<a href="#">
					<span class="previousLesson">
						
						<img src="/1images/leftArrowNavBlack.png" class="prevArrow">
							<span class="verticalAlign">
								Prev. Lesson
							</span>
					</span>
				</a>
				<div class="centerNavIconHolder">
					<img src="/1images/textIcon3.png" class="textIcon">
					<img src="/1images/videoCamera.png" class="videoIcon">
					<img src="/1images/writeIcon.png" class="writeIcon">
				</div>
				<a href="#">
					<span class="nextLesson">
						<span class="verticalAlign">
							Next Lesson
						</span>
						<img src="/1images/rightArrowNavBlack.png" class="nextArrow">
					</span>
				</a>
			</div>
			
		</div>
		<div id="pageDivider">
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
<script src="/1JS/useful-functions.js"></script>
<script src="/1JS/lessonMain.js"></script>
<script src="/1JS/problem-generation.js" type="text/javascript"></script>
<script type="text/x-mathjax-config">
  MathJax.Hub.Config({
   tex2jax: {inlineMath: [["$($","$)$"]]},
   displayAlign: "center",
   displayIndent: "0.1em"
  });
</script>
<script src="http://cdn.mathjax.org/mathjax/latest/MathJax.js?config=TeX-AMS_HTML.js"></script>
</body>
</html>