<body>

<div id="background"></div>
<img id="backgroundTexture" src="/1images/texture.png">
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
		<div class="menuUnderline" style="opacity: 1;"> 
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
			<input type="text" id="searchInput" placeholder="search">
			<div id="searchButton">
				<img id="searchIcon" src="/1images/searchIcon.png">
				<!--<img src="/1images/modern-button-shine.png" style="position:absolute;
				left:0%;right:0%;top:0%;bottom:0%;">-->
			</div>
		</div>
	</div>
	
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
	<input type="button" name="submitFeedback" id="submitFeedback" value="Submit" onclick="feedbackInputSubmit()">
	<input type="button" name="cancelFeedback" id="cancelFeedback" value="Cancel" onclick="feedbackInputBoxOff()">
</div>
<div id="thanksForFeedbackBox">
	<div id="thanksForFeedback">
		Thanks for your input!
	</div>
</div>
<div id="formsContainer">
	<form name="submitFeedbackForm" id="submitFeedbackForm" action="" method="post">
		<input type="hidden" name="feedbackInputInForm" id="feedbackInputInForm">
	</form>
</div>


<div style="position:absolute;width:5px;height:600px;background-color:#000000;left:0%;top:0;z-index:20;
opacity:.3;border-style:solid;border-width:0px 1px;border-color:#555555;">
</div>

<div id="mainContainer">
	<div id="websiteName" style="
    /* border: 10px solid rgba(255,255,255,.3); */
    border-radius: 30px;
                             
    /* box-shadow: 0px 1px 4px rgba(255,255,255,.3); */
    overflow: hidden;
    color: rgba(255,255,255,.8);
    padding: .1em;
">SwitchLearn
<div id="websiteDescriptionSentence">is a 
		<span class="highlightRed">free </span><span style="
    color: #7FC3FF;
">student resource.
		</span>
	</div>
</div>
	
	
	<div id="optionsContainer">
		<div class="buttonBlock">
			<a href="/learn" style="">
  <span style="
    position: absolute;
    width: 20%;
    margin: auto;
    left: 0;
    right: 0;
    bottom: .0em;
    font-size: 2em;
    color: #fff;
    text-decoration: underline;
">Learn</span>
			</a>
			<img class="optionImg" src="http://cf.ltkcdn.net/photography/images/slide/164666-849x565-woman-reading-book.jpg">
		</div>
		<div class="buttonBlock">
			<a href="/create" style="">
				<span style="
    position: absolute;
    width: 20%;
    margin: auto;
    left: 0;
    right: 0;
    bottom: .0em;
    font-size: 2em;
    color: #fff;
    text-decoration: underline;
">Create</span>
			</a>
			<img class="optionImg" src="http://teachfirstnz.org/images/uploads/Hero/science_teacher_whiteboard.jpg">
		</div>
		<div class="buttonBlock">
			<a href="/donate" style="">
				<span style="
    position: absolute;
    width: 20%;
    margin: auto;
    left: 0;
    right: 0;
    bottom: .0em;
    font-size: 2em;
    color: #fff;
    text-decoration: underline;
">Donate</span>
			</a>
			<img class="optionImg" src="http://i2.wp.com/thekitchencabinet.us/wp-content/uploads/hands-holding-money2724991187645861.jpg">
		</div><!--http://www.onebigworldtravel.com/wp-content/uploads/2013/10/money-in-hand.jpg-->
	</div>
	
	<div class="greyBackground" style="
    position: fixed;
    left: 0;
    margin: 4em 0 0 0;
    padding: 2em 0 0 0;
    width: 100%;
    height: 100%;
    /* background-color: #111; */
    /* border-style: solid; */
    /* border-width: 2px 0 0 0; */
    /* border-color: rgba(0,0 ,0 ,.5); */
    background: -webkit-gradient(linear, left center, right center,   from(#080808), to(#080808), color-stop(.5, #181818));
    box-shadow: 0px -3px 15px rgba(0,0,0,.9);
    z-index: -999;
"></div>
<div id="websitePurpose">SwitchLearn mixes the concepts of Wikipedia and YouTube together <br>
		to create a <span class="highlightRed">personalized learning</span> experience.
	</div>

	<div style="margin:8em 0 0 0;"></div>
	<div class="horizontalLine"></div>
	
	<div id="detailsContainer">
		<div id="hardcoreReading">
			<div class="detailsHeaderContainer">
				<div class="detailsHeader">
					Why do we need SwitchLearn?
				</div>
			</div>
		<div class="detailsBody">
			The education system is not a system that can be changed very easily. 
			This is a problem because today's technology is ready to help students 
			graduate and enter the economy years earlier than they could in the 
			currently supported education system. 
			<br><br>
			The disruptive nature of this advancement requires the innovative efforts of  
			flexible outsiders of the system.
			<br><br>
			This is where we come in. SwitchLearn is developing software that will automatically 
			match students with lessons that fit their individual learning styles. 
			We are the only ones doing this for free. That is why SwitchLearn is 
			needed, and that is why we need your help.
			
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