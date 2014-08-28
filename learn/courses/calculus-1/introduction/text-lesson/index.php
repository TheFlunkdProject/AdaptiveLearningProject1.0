<!doctype html>
<html>
<head>

<link rel="stylesheet" type="text/css" href="/1CSS/lesson-page.css"/>
<link rel="stylesheet" type="text/css" href="/1CSS/topMenu.css"/>
<link rel="stylesheet" type="text/css" href="/1CSS/lesson.css"/>

</head>
<body>
a
<div id="background"></div>

<?php 
include $_SERVER['DOCUMENT_ROOT'] . '/site-includes/top-menu.php';
?>

<!-- <div style="position:absolute;width:800px;height:5px;background-color:#000000;bottom:-100%;z-index:20;
opacity:.3;border-style:solid;border-width:1px 0px;border-color:#555555;margin:auto;left:0;right:0;">
</div>
<div style="position:absolute;width:5px;height:600px;background-color:#000000;left:0%;top:0%;z-index:20;
opacity:.3;border-style:solid;border-width:0px 1px;border-color:#555555;">
</div> -->

<div id="mainContainer">
<!-- I'm really lost as to what to do for this background. Here are some more ideas:
#aac7FF




-->
	<div id="pageLocation">
		<span id="locationCourseTitle" 
			onmouseover="courseMenuOn()"
			onmouseout="courseMenuOff()">
			Calculus 1
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
			
			Introduction
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
		<div class="contentContainer">
			<table>
				<tr>
					<td class="nameColumn"><a href="#">Introduction</a></td>
					<td class="textColumn"><a href="#"><img class="courseMenuIcon" src="/1images/textIcon3.png"></a></td>
					<td class="videoColumn"><a href="#"><img class="courseMenuIcon" src="/1images/videoCamera.png"></a></td>
					<td class="practiceColumn"><a href="#"><img class="courseMenuIcon" src="/1images/writeIcon.png"></a></td>
					<td class="gameColumn"><a href="#"><img class="courseMenuIcon" src="/1images/gameIcon.png"></a></td>
				</tr>
			</table>
			<table class="topicMenuSectionHeader">
				<tr>
					<td>
						Pre-Calculus Review
					</td>
				</tr>
			</table>
			<table>
				<tr>	
					<td class="nameColumn"><a href="#">Graphs of Basic Functions</a></td>
					<td class="textColumn"><a href="#"><img class="courseMenuIcon" src="/1images/textIcon3.png"></a></td>
					<td class="videoColumn"><a href="#"><img class="courseMenuIcon" src="/1images/videoCamera.png"></a></td>
					<td class="practiceColumn"><a href="#"><img class="courseMenuIcon" src="/1images/writeIcon.png"></a></td>
					<td class="gameColumn"><a href="#"><img class="courseMenuIcon" src="/1images/gameIcon.png"></a></td>
				</tr>
				<tr>	
					<td class="nameColumn"><a href="#">Trigonometry</a></td>
					<td class="textColumn"><a href="#"><img class="courseMenuIcon" src="/1images/textIcon3.png"></a></td>
					<td class="videoColumn"><a href="#"><img class="courseMenuIcon" src="/1images/videoCamera.png"></a></td>
					<td class="practiceColumn"><a href="#"><img class="courseMenuIcon" src="/1images/writeIcon.png"></a></td>
					<td class="gameColumn"><a href="#"><img class="courseMenuIcon" src="/1images/gameIcon.png"></a></td>
				</tr>
				<tr>	
					<td class="nameColumn"><a href="#">Exponents</a></td>
					<td class="textColumn"><a href="#"><img class="courseMenuIcon" src="/1images/textIcon3.png"></a></td>
					<td class="videoColumn"><a href="#"><img class="courseMenuIcon" src="/1images/videoCamera.png"></a></td>
					<td class="practiceColumn"><a href="#"><img class="courseMenuIcon" src="/1images/writeIcon.png"></a></td>
					<td class="gameColumn"><a href="#"><img class="courseMenuIcon" src="/1images/gameIcon.png"></a></td>
				</tr>
				<tr>	
					<td class="nameColumn"><a href="#">Factoring</a></td>
					<td class="textColumn"><a href="#"><img class="courseMenuIcon" src="/1images/textIcon3.png"></a></td>
					<td class="videoColumn"><a href="#"><img class="courseMenuIcon" src="/1images/videoCamera.png"></a></td>
					<td class="practiceColumn"><a href="#"><img class="courseMenuIcon" src="/1images/writeIcon.png"></a></td>
					<td class="gameColumn"><a href="#"><img class="courseMenuIcon" src="/1images/gameIcon.png"></a></td>
				</tr>
				<tr>	
					<td class="nameColumn"><a href="#">Fractions</a></td>
					<td class="textColumn"><a href="#"><img class="courseMenuIcon" src="/1images/textIcon3.png"></a></td>
					<td class="videoColumn"><a href="#"><img class="courseMenuIcon" src="/1images/videoCamera.png"></a></td>
					<td class="practiceColumn"><a href="#"><img class="courseMenuIcon" src="/1images/writeIcon.png"></a></td>
					<td class="gameColumn"><a href="#"><img class="courseMenuIcon" src="/1images/gameIcon.png"></a></td>
				</tr>
				<tr>	
					<td class="nameColumn"><a href="#">Inverse Functions</a></td>
					<td class="textColumn"><a href="#"><img class="courseMenuIcon" src="/1images/textIcon3.png"></a></td>
					<td class="videoColumn"><a href="#"><img class="courseMenuIcon" src="/1images/videoCamera.png"></a></td>
					<td class="practiceColumn"><a href="#"><img class="courseMenuIcon" src="/1images/writeIcon.png"></a></td>
					<td class="gameColumn"><a href="#"><img class="courseMenuIcon" src="/1images/gameIcon.png"></a></td>
				</tr>
				<tr>	
					<td class="nameColumn"><a href="#">Log Rules</a></td>
					<td class="textColumn"><a href="#"><img class="courseMenuIcon" src="/1images/textIcon3.png"></a></td>
					<td class="videoColumn"><a href="#"><img class="courseMenuIcon" src="/1images/videoCamera.png"></a></td>
					<td class="practiceColumn"><a href="#"><img class="courseMenuIcon" src="/1images/writeIcon.png"></a></td>
					<td class="gameColumn"><a href="#"><img class="courseMenuIcon" src="/1images/gameIcon.png"></a></td>
				</tr>
			</table>
			<table class="topicMenuSectionHeader">
				<tr>
					<td>
						Limits
					</td>
				</tr>
			</table>
			<table>
				<tr>	
					<td class="nameColumn"><a href="#">Limits of Simple Functions</a></td>
					<td class="textColumn"><a href="#"><img class="courseMenuIcon" src="/1images/textIcon3.png"></a></td>
					<td class="videoColumn"><a href="#"><img class="courseMenuIcon" src="/1images/videoCamera.png"></a></td>
					<td class="practiceColumn"><a href="#"><img class="courseMenuIcon" src="/1images/writeIcon.png"></a></td>
					<td class="gameColumn"><a href="#"><img class="courseMenuIcon" src="/1images/gameIcon.png"></a></td>
				</tr>
				<tr>	
					<td class="nameColumn"><a href="#">Removable Discontinuities</a></td>
					<td class="textColumn"><a href="#"><img class="courseMenuIcon" src="/1images/textIcon3.png"></a></td>
					<td class="videoColumn"><a href="#"><img class="courseMenuIcon" src="/1images/videoCamera.png"></a></td>
					<td class="practiceColumn"><a href="#"><img class="courseMenuIcon" src="/1images/writeIcon.png"></a></td>
					<td class="gameColumn"><a href="#"><img class="courseMenuIcon" src="/1images/gameIcon.png"></a></td>
				</tr>
				<tr>	
					<td class="nameColumn"><a href="#">One-Sided Limits</a></td>
					<td class="textColumn"><a href="#"><img class="courseMenuIcon" src="/1images/textIcon3.png"></a></td>
					<td class="videoColumn"><a href="#"><img class="courseMenuIcon" src="/1images/videoCamera.png"></a></td>
					<td class="practiceColumn"><a href="#"><img class="courseMenuIcon" src="/1images/writeIcon.png"></a></td>
					<td class="gameColumn"><a href="#"><img class="courseMenuIcon" src="/1images/gameIcon.png"></a></td>
				</tr>
				<tr>	
					<td class="nameColumn"><a href="#">Piecewise Functions</a></td>
					<td class="textColumn"><a href="#"><img class="courseMenuIcon" src="/1images/textIcon3.png"></a></td>
					<td class="videoColumn"><a href="#"><img class="courseMenuIcon" src="/1images/videoCamera.png"></a></td>
					<td class="practiceColumn"><a href="#"><img class="courseMenuIcon" src="/1images/writeIcon.png"></a></td>
					<td class="gameColumn"><a href="#"><img class="courseMenuIcon" src="/1images/gameIcon.png"></a></td>
				</tr>
				<tr>	
					<td class="nameColumn"><a href="#">Infinite Limites</a></td>
					<td class="textColumn"><a href="#"><img class="courseMenuIcon" src="/1images/textIcon3.png"></a></td>
					<td class="videoColumn"><a href="#"><img class="courseMenuIcon" src="/1images/videoCamera.png"></a></td>
					<td class="practiceColumn"><a href="#"><img class="courseMenuIcon" src="/1images/writeIcon.png"></a></td>
					<td class="gameColumn"><a href="#"><img class="courseMenuIcon" src="/1images/gameIcon.png"></a></td>
				</tr>
				<tr>	
					<td class="nameColumn"><a href="#">Definition of Continuity</a></td>
					<td class="textColumn"><a href="#"><img class="courseMenuIcon" src="/1images/textIcon3.png"></a></td>
					<td class="videoColumn"><a href="#"><img class="courseMenuIcon" src="/1images/videoCamera.png"></a></td>
					<td class="practiceColumn"><a href="#"><img class="courseMenuIcon" src="/1images/writeIcon.png"></a></td>
					<td class="gameColumn"><a href="#"><img class="courseMenuIcon" src="/1images/gameIcon.png"></a></td>
				</tr>
				<tr>
					<td class="nameColumn"><a href="#">Intermediate Value Theorem</a></td>
					<td class="textColumn"><a href="#"><img class="courseMenuIcon" src="/1images/textIcon3.png"></a></td>
					<td class="videoColumn"><a href="#"><img class="courseMenuIcon" src="/1images/videoCamera.png"></a></td>
					<td class="practiceColumn"><a href="#"><img class="courseMenuIcon" src="/1images/writeIcon.png"></a></td>
					<td class="gameColumn"><a href="#"><img class="courseMenuIcon" src="/1images/gameIcon.png"></a></td>
				</tr>
				<tr>
					<td class="nameColumn"><a href="#">Precise Definition of a Limit</a></td>
					<td class="textColumn"><a href="#"><img class="courseMenuIcon" src="/1images/textIcon3.png"></a></td>
					<td class="videoColumn"><a href="#"><img class="courseMenuIcon" src="/1images/videoCamera.png"></a></td>
					<td class="practiceColumn"><a href="#"><img class="courseMenuIcon" src="/1images/writeIcon.png"></a></td>
					<td class="gameColumn"><a href="#"><img class="courseMenuIcon" src="/1images/gameIcon.png"></a></td>
				</tr>
			</table>
			<table class="topicMenuSectionHeader">
				<tr>
					<td>
						Derivatives
					</td>
				</tr>
			</table>
			<table>
				<tr>	
					<td class="nameColumn"><a href="#">Definition of the Derivative</a></td>
					<td class="textColumn"><a href="#"><img class="courseMenuIcon" src="/1images/textIcon3.png"></a></td>
					<td class="videoColumn"><a href="#"><img class="courseMenuIcon" src="/1images/videoCamera.png"></a></td>
					<td class="practiceColumn"><a href="#"><img class="courseMenuIcon" src="/1images/writeIcon.png"></a></td>
					<td class="gameColumn"><a href="#"><img class="courseMenuIcon" src="/1images/gameIcon.png"></a></td>
				</tr>
				<tr>	
					<td class="nameColumn"><a href="#">Graphing Derivatives</a></td>
					<td class="textColumn"><a href="#"><img class="courseMenuIcon" src="/1images/textIcon3.png"></a></td>
					<td class="videoColumn"><a href="#"><img class="courseMenuIcon" src="/1images/videoCamera.png"></a></td>
					<td class="practiceColumn"><a href="#"><img class="courseMenuIcon" src="/1images/writeIcon.png"></a></td>
					<td class="gameColumn"><a href="#"><img class="courseMenuIcon" src="/1images/gameIcon.png"></a></td>
				</tr>
				<tr>	
					<td class="nameColumn"><a href="#">Derivative Formula</a></td>
					<td class="textColumn"><a href="#"><img class="courseMenuIcon" src="/1images/textIcon3.png"></a></td>
					<td class="videoColumn"><a href="#"><img class="courseMenuIcon" src="/1images/videoCamera.png"></a></td>
					<td class="practiceColumn"><a href="#"><img class="courseMenuIcon" src="/1images/writeIcon.png"></a></td>
					<td class="gameColumn"><a href="#"><img class="courseMenuIcon" src="/1images/gameIcon.png"></a></td>
				</tr>
				<tr>	
					<td class="nameColumn"><a href="#">Derivatives of Special Functions</a></td>
					<td class="textColumn"><a href="#"><img class="courseMenuIcon" src="/1images/textIcon3.png"></a></td>
					<td class="videoColumn"><a href="#"><img class="courseMenuIcon" src="/1images/videoCamera.png"></a></td>
					<td class="practiceColumn"><a href="#"><img class="courseMenuIcon" src="/1images/writeIcon.png"></a></td>
					<td class="gameColumn"><a href="#"><img class="courseMenuIcon" src="/1images/gameIcon.png"></a></td>
				</tr>
				<tr>	
					<td class="nameColumn"><a href="#">Product Rule</a></td>
					<td class="textColumn"><a href="#"><img class="courseMenuIcon" src="/1images/textIcon3.png"></a></td>
					<td class="videoColumn"><a href="#"><img class="courseMenuIcon" src="/1images/videoCamera.png"></a></td>
					<td class="practiceColumn"><a href="#"><img class="courseMenuIcon" src="/1images/writeIcon.png"></a></td>
					<td class="gameColumn"><a href="#"><img class="courseMenuIcon" src="/1images/gameIcon.png"></a></td>
				</tr>
				<tr>	
					<td class="nameColumn"><a href="#">Quotient Rule</a></td>
					<td class="textColumn"><a href="#"><img class="courseMenuIcon" src="/1images/textIcon3.png"></a></td>
					<td class="videoColumn"><a href="#"><img class="courseMenuIcon" src="/1images/videoCamera.png"></a></td>
					<td class="practiceColumn"><a href="#"><img class="courseMenuIcon" src="/1images/writeIcon.png"></a></td>
					<td class="gameColumn"><a href="#"><img class="courseMenuIcon" src="/1images/gameIcon.png"></a></td>
				</tr>
				<tr>
					<td class="nameColumn"><a href="#">Chain Rule</a></td>
					<td class="textColumn"><a href="#"><img class="courseMenuIcon" src="/1images/textIcon3.png"></a></td>
					<td class="videoColumn"><a href="#"><img class="courseMenuIcon" src="/1images/videoCamera.png"></a></td>
					<td class="practiceColumn"><a href="#"><img class="courseMenuIcon" src="/1images/writeIcon.png"></a></td>
					<td class="gameColumn"><a href="#"><img class="courseMenuIcon" src="/1images/gameIcon.png"></a></td>
				</tr>
				<tr>
					<td class="nameColumn"><a href="#">L=Hospital's Rule</a></td>
					<td class="textColumn"><a href="#"><img class="courseMenuIcon" src="/1images/textIcon3.png"></a></td>
					<td class="videoColumn"><a href="#"><img class="courseMenuIcon" src="/1images/videoCamera.png"></a></td>
					<td class="practiceColumn"><a href="#"><img class="courseMenuIcon" src="/1images/writeIcon.png"></a></td>
					<td class="gameColumn"><a href="#"><img class="courseMenuIcon" src="/1images/gameIcon.png"></a></td>
				</tr>
			</table>
		</div>
	</div>
	<!--
	<div id="pageTitleBox">
		<div id="pageTitleBoxHeaderContainer">
			<div id="pageTitleBoxHeader">
			Learn
			</div>
		</div>
		<div id="pageQuote">
		Stuff and stuff...
		</div>
	</div>
	-->
	
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
				Calculus 1 Introduction
			</div>
			<div id="lessonBody">
				<!-- Here's to hoping all of it gets here:-->
				<div id="lessonPreviewBody">
					<div class="imageContainerRight" id="imageContainerRight2">
						<img class="imageBoxImageRight" id="imageBoxImageRight2" src="http://switchlearn.com/1images/matryoshkaDoll.JPG">
						<span class="imageCaption" id="imageCaption2">
							Matryoshka dolls
						</span>
					</div>
					The chain rule could probably be called the 
					<a href="http://en.wikipedia.org/wiki/Matryoshka_doll" target="_blank">
						Matryoshka doll
					</a>
					&nbsp;method. This is the formula for it:
					<br>
					<br>
					<span class=" equation" id="equation13">
						$($ (f(g))'=f'(g)g' $)$
					</span>
					<br>
					<br>
					<span class="triggerText" id="triggerText2"
						onclick="switchClassNameOnOff(['hiddenTextBox2','hiddenTextBoxRevealed',this.id,'triggerTextActive'])">
						Here are some examples.
					</span>
					<span class="hiddenTextBox" id="hiddenTextBox2">
						<ol>
							<li>
								<span class=" equation" id="equation5">
									$($ \frac{d}{dx}(2x+1)^2 = $)$
								</span>
								<span class="triggerText" id="triggerText3"
										onclick="switchClassNameOnOff(['hiddenTextBox3','hiddenTextBoxRevealed',this.id,'triggerTextActive'])">
									<span class=" equation" id="equation4">
										$($ 2(2x+1)^1*(2+0) $)$
									</span>
								</span>
								<span class="hiddenTextBox" id="hiddenTextBox3">
									In this example,&nbsp;
									<span class=" equation" id="equation6">
										$($ 2x+1 $)$
									</span>
									&nbsp;is&nbsp;
									<span class=" equation" id="equation7">
										$($ g $)$
									</span>
									&nbsp;from the formula and&nbsp;
									<span class=" equation" id="equation8">
										$($ 2+0 $)$
									</span>
									&nbsp;is&nbsp;
									<span class=" equation" id="equation9">
										$($ g' $)$
									</span>
									.
								</span>
								<span class=" equation" id="equation3">
									$($ =4*(2x+1)=8x+4 $)$
								</span>
							</li>
							<li>
								<span class=" equation" id="equation10">
									$($ \frac{d}{dx}(sin(x^2))= $)$
								</span>
									<span class="triggerText" id="triggerText4"
											onclick="switchClassNameOnOff(['hiddenTextBox4','hiddenTextBoxRevealed',this.id,'triggerTextActive'])">
										<span class=" equation" id="equation11">
											$($ cos(x^2)\,2x = $)$
										</span>
									</span>
								<span class="hiddenTextBox" id="hiddenTextBox4">
									The thing to notice here is that the inside of the outer function doesn't change. 
									Its derivative is taken, and then the derivative of its insides goes out next to it.
								</span>
								<span class=" equation" id="equation12">
									$($ 2x\,cos(x^2) $)$
								</span>
							</li>
							<br>
							<br>
						</ol>
						<br>
					</span>
					<br>
					<br>
					The trick is to start on the very outside, and work your way inside. 
					You start with the main form of the whole expression, and pretend that 
					everything inside of it is x. Then, you multiply by the derivative of 
					what was inside that you were pretending was an x, and you keep doing 
					that until what is on the inside is actually an x. Like this:
					<br>
					<br>
					<span class=" equation" id="equation14">
						$($ \frac{d}{dx}(ln(ln(ln(ln(x)))))= $)$
					</span>
					<span class="triggerText" id="triggerText5"
								onclick="switchClassNameOnOff(['hiddenTextBox5','hiddenTextBoxRevealed',this.id,'triggerTextActive'])">
						<span class=" equation" id="equation15">
							$($ \frac{1}{ln(ln(ln(x))))} $)$
							</script>
						</span>
						<span class=" equation" id="equation16">
							$($ \frac{1}{ln(ln(x)))}\frac{1}{ln(x))}\frac{1}{x} $)$
						</span>
					</span>
					<span class="hiddenTextBox" id="hiddenTextBox5">
						<br>
						<div class="imageContainerCenter" id="imageContainerCenter1">
							<img class="imageBoxImageCenter" id="imageBoxImageCenter1" src="http://switchlearn.com/1images/yoDawgChainRule.jpg">
							<span class="imageCaption" id="imageCaption1">
							</span>
						</div>
						<br>
					</span>
					<br>
					<br>
					Here is a video that teaches the same things:
					<br>
					<br>
					<br>
					<div class="videoContainer" id="videoContainer1">
						<iframe src="https://www.youtube.com/embed/XIQ-KnsAsbg?wmode=transparent&amp;rel=0&amp;modestbranding=1&amp;version=3&amp;ap=%2526fmt%3D18&amp;autohide=1&amp;fs=1&amp;theme=light&amp;color=white&amp;start=256&amp;end=424" 
								type="application/x-shockwave-flash" allowfullscreen="" class="embeddedVideo" id="embeddedVideo1">
						</iframe>
					</div>
					<div class="videoCaption" id="videoCaption1">
						<script type="text/javascript">
							function youtubeFeedCallback1( data ) {
								document.writeln( '<b>Author:</b> ' + data.entry[ "author" ][ 0 ].name.$t + '<br/>' );
								document.writeln( '<a href="' + data.entry[ "media$group" ][ "media$player" ].url + '" target="_blank">Watch on YouTube</a>' );
							}
						</script>
						<script type="text/javascript" 
							src="http://gdata.youtube.com/feeds/api/videos/XIQ-KnsAsbg?v=2&amp;alt=json-in-script&amp;callback=youtubeFeedCallback1">
						</script>
					</div>
					<span class=" equation" id="equation17">
						$($ f(x)=tan(3x) $)$
					</span>
					<br>
					<br>
					Find&nbsp;
					<span class=" equation" id="equation18">
						$($ f'(x) $)$
					</span>
					.
					<br>
					<br>
					<span class="triggerText" id="triggerText7"
							onclick="switchClassNameOnOff(['hiddenTextBox7','hiddenTextBoxRevealed',this.id,'triggerTextActive'])">
						Similar Example
					</span>
					<span class="hiddenTextBox" id="hiddenTextBox7">
						<span class=" equation" id="equation19">
							$($ f(x)=sec(2x) $)$
						</span>
						<br>
						<br>
						<br>
						<span class=" boxedEquation" id="boxedEquation20">
							$($ f'(x)=2\,sec(2x)tan(2x) $)$
						</span>
					</span>
					<br>
					<br>
					<br>
					<br>
					<span class="multipleChoiceAnswer" id="multipleChoice8Answer1">
						<input type="radio" class=" multipleChoiceRadio" name="multipleChoiceRadioGroup8" id="multipleChoice8Radio1">
						<span class=" equation" id="equation21">
							$($ 3\,sec^2(3x) $)$
						</span>
					</span>
					<span class="multipleChoiceAnswer" id="multipleChoice8Answer2">
						<input type="radio" class=" multipleChoiceRadio" name="multipleChoiceRadioGroup8" id="multipleChoice8Radio2">
						<span class=" equation" id="equation22">
							$($ tan(3x)\,sec(3x)*3 $)$
						</span>
					</span>
					<span class="multipleChoiceAnswer" id="multipleChoice8Answer3">
						<input type="radio" class=" multipleChoiceRadio" name="multipleChoiceRadioGroup8" id="multipleChoice8Radio3">
						<span class=" equation" id="equation23">
							$($ sec^2(3x) $)$
						</span>
					</span>
					<span class="multipleChoiceAnswer" id="multipleChoice8Answer4">
						<input type="radio" class=" multipleChoiceRadio" name="multipleChoiceRadioGroup8" id="multipleChoice8Radio4">
					</span>
					<input type="button" value="Check Answer" onclick="checkMultipleChoiceAnswer(8);">
					<span class="multipleChoiceAnswerResultDisplay" id="multipleChoiceAnswerResultDisplay8">
						Correct
					</span>
					<input type="hidden" class="multipleChoiceCorrectAnswer" id="multipleChoice8CorrectAnswer" value="0"/>
					Find&nbsp;
					<span class=" equation" id="equation24">
						$($ \frac{d}{dx}(e^{tan(x)}) $)$
					</span>
					&nbsp;evaluated at&nbsp;
					<span class=" equation" id="equation25">
						$($ x=3.34 $)$
					</span>
					<br>
					<br>
					<br>
					<span class="triggerText" id="triggerText11"
						onclick="switchClassNameOnOff(['hiddenTextBox11','hiddenTextBoxRevealed',this.id,'triggerTextActive'])">
						Similar Example
					</span>
					<span class="hiddenTextBox" id="hiddenTextBox11">
						<span class=" equation" id="equation26">
							$($ \frac{d}{dx}(e^{sin(x)}) $)$
						</span>
						<span class=" boxedEquation" id="boxedEquation27">
							$($ =e^{sin(x)}*cos(x) $)$
						</span>
						<br>
						<br>
						The derivative of the outside function,&nbsp;
						<span class=" equation" id="equation28">
							$($ e^{(stuff)} $)$
						</span>
						, is&nbsp;
						<span class=" equation" id="equation29">
							$($ e^{(stuff)} $)$
						</span>
						, and the derivative of the stuff on the inside of that function is&nbsp;
						<span class=" equation" id="equation30">
							$($ \frac{d}{dx}(sin(x))=cos(x) $)$
						</span>
						.
						<br>
						<br>
						And then we could evaluate our final answer at a value of&nbsp;
						<span class=" equation" id="equation31">
							$($ x $)$
						</span>
					</span>
					<input type="text" class=" freeResponseAttempt" id="freeResponseAttempt10" value="" placeholder="Answer">
					<span class=" freeResponseUnits" id="freeResponseUnits10">
						$($ $)$
					</span>
					<input type="button" value="Check Answer" onclick="checkFreeResponseAnswer(10)">
					<span class=" freeResponseResult" id="freeResponseResult10">
					</span>
				</div>
				<!-- Good.-->
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