<!doctype html>
<html>
<head>

<link rel="stylesheet" type="text/css" href="/1CSS/home.css"/>
<link rel="stylesheet" type="text/css" href="/1CSS/topMenu.css"/>

<!--<meta name="viewport" content="width:device-width">-->
</head>
<body>

<div id="background"></div>
<%@ include file="/1JSP/topMenu.jsp" %>


<div style="position:absolute;width:5px;height:600px;background-color:#000000;left:0%;top:0;z-index:20;
opacity:.3;border-style:solid;border-width:0px 1px;border-color:#555555;">
</div>

<div id="mainContainer">
	<div id="websiteName">SwitchLearn</div>
	<div id="websiteDescriptionSentence">is a 
		<span class="highlightRed">free student resource.
		</span>
	</div>
	
	<div id="optionsContainer">
		<div class="buttonBlock">
			<a href="/learn" style="">
				<div id="learnButton" class="mainButton"
					onmouseover="this.style.boxShadow='0px 0px 10px #000000';
					this.style.backgroundColor='#3366FF';"
					onmouseout="this.style.boxShadow='0px 0px 0px #000000';
					this.style.backgroundColor='#44BB33';">
					<span class="buttonText">
						Learn
					</span>
					<img src="/1images/modern-button-shine.png" style="width:100%;height:100%;">
				</div>
			</a>
			<img class="optionImg" src="/1images/student.png">
		</div>
		<div class="buttonBlock">
			<a href="/create" style="">
				<div id="createButton" class="mainButton"
					onmouseover="this.style.boxShadow='0px 0px 10px #000000';
					this.style.backgroundColor='#3366FF';"
					onmouseout="this.style.boxShadow='0px 0px 0px #000000';
					this.style.backgroundColor='#44BB33';">
					<span class="buttonText">
						Create
					</span>
					<img src="/1images/modern-button-shine.png" style="width:100%;height:100%;">
				</div>
			</a>
			<img class="optionImg" src="/1images/Untitled.png">
		</div>
		<div class="buttonBlock">
			<a href="/donate" style="">
				<div id="donateButton" class="mainButton"
					onmouseover="this.style.boxShadow='0px 0px 10px #000000';
					this.style.backgroundColor='#3366FF';"
					onmouseout="this.style.boxShadow='0px 0px 0px #000000';
					this.style.backgroundColor='#44BB33';">
					<span class="buttonText">
						Donate
					</span>
					<img src="/1images/modern-button-shine.png" style="width:100%;height:100%;">
				</div>
			</a>
			<img class="optionImg" src="/1images/money.png">
		</div>
	</div>
	
	<div id="websitePurpose">SwitchLearn mixes the concepts of Wikipedia and YouTube together <br>
		to create a <span class="highlightRed">personalized learning</span> experience.
	</div>

	<div style="margin:8em 0 0 0;"></div>
	<div class="horizontalLine" ></div>
	
	<div id="detailsContainer">
		<div id="hardcoreReading">
			<div class="detailsHeaderContainer">
				<div class="detailsHeader">
					Why do we need SwitchLearn?
				</div>
			</div>
		<div class="detailsBody">
			The education system is not a system that can be changed very easily. 
			<br><br>
			This is a problem because today's technology is ready to help students 
			graduate and enter the economy years earlier than they can in the 
			current system. 
			<br><br>
			The disruptive nature of this advancement means that it can only be innovated by 
			flexible outsiders of the system.
			<br><br>
			This is where we come in. SwitchLearn is developing software that will automatically 
			match students with lessons that fit their individual learning styles. 
			We are the only ones doing this for free. That is why SwitchLearn is 
			needed, and that is why we need your help!
			
		</div>
		
		</div>
		
	</div>
	
	<div id="learnMoreInvitation">To learn more about personalized learning, 
	<a href="/personalized-learning">click here.</a>
	</div>
	
	<div style="margin:8em 0 0 0;"></div>
	<div class="horizontalLine"></div>
	
	<div id="siteStatsHolder">
		<div id="siteStatistics">
			<div class="detailsHeaderContainer">
				<div class="detailsHeader">
				SwitchLearn.com Statistics:
				</div>
			</div>
			<div class="detailsBody">
				<div style="position:relative;float:left;">
					Date Created:
					<br><br>
					Number of content contributors: 
					<br><br>
				</div>
				<div style="position:relative;float:right;">
					May 23, 2014
					<br><br>
					2
					<br><br>
				</div>
			</div>
		</div>
	</div>
	

	
	
</div>
<script src="/1JS/topMenu.js"></script>
</body>
</html>