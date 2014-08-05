<!doctype html>
<html>
<head>

<link rel="stylesheet" type="text/css" href="lesson-editor.css"/>
<link rel="stylesheet" type="text/css" href="/1CSS/topMenu.css"/>
<!--<link rel="stylesheet" type="text/css" href="http://fonts.googleapis.com/css?family=Balthazar">-->
</head>
<body">
<div id="background"></div>

<%@ include file="/1JSP/topMenu.jsp" %>




<div id="mainContainer">
	
	<div id="topBanner">
		<div id="pageName">
			Lesson Editor
		</div>
		<input type="button" value="Preview Lesson" onclick="previewLesson()" 
			id="previewLesson"/>
	</div>
	<div id="lessonPreviewBox">
		<div id="lessonPreviewOptionsBar">
			<div id="closeLessonPreview" onclick="hideElement('lessonPreviewBox')">
			</div>
		</div>
		<div id="lessonPreviewBody">awefawef
		</div>
	</div>
	<div id="variableValues" style="visibility:hidden;">
	</div>
	<div id="videoCaptionEditorDefault">
	</div>
	<div id="loginAndTools">
	
		<div id="loginBoxContainer">
			<div id="loginBox">
				<div id="username">
					Anonomous
				</div>
				Log in to save your work and build up points.
				<br><input type="text" id="usernameInput" placeholder="Username"/>
				<br><input type="password" id="passwordInput" placeholder="Password"/>
				<br><input type="button" id="loginButton" value="Log In"/>
				<input type="button" id="newAccountButton" value="New Account"/>
				<div style="width:100%;height:1em;position:relative;clear:both;"></div>
			</div>
			<!--<div style="position:relative;width:100%;height:.85em;background-color:#112;
				margin:3em 0 0 0;"></div>-->
		</div>
		<div id="toolContainer">
			<div id="toolContainerCell">
				<div id="toolBox">
					<div id="toolHeader">
						Tools
					</div>
					<div class="toolIconRow">
						<div class="icon" id="insertLink">
							<img class="iconImage" src="/1images/linkIcon.png" 
								id="insertLinkIcon"
								onclick="insertInlineElement('link')">
						</div>
						<div class="icon" id="insertTitle">
							<img class="iconImage" src="/1images/titleIcon.png" 
								id="insertTitleIcon"
								onclick="insertInlineElement('title')">
						</div>
						<div class="icon" id="insertEquation">
							<img class="iconImage" src="/1images/equationIcon.png" 
								id="insertEquationIcon"
								onclick="insertEquation()">
						</div>
						
					</div>
					<div class="toolIconRow">
						<!--<div style="position:relative;clear:both;width:100%;height:2em;"></div>-->
						<div class="icon" id="insertVideo">
							<img class="iconImage" src="/1images/videoIcon.png" 
								id="insertVideoIcon"
								onclick="insertInnerBox('videoBox')">
						</div>
						<div class="icon" id="insertImage">
							<img class="iconImage" src="/1images/imageIcon.jpg" 
								id="insertImageIcon"
								onclick="insertInnerBox('imageBox')">
						</div>
						<div class="icon" id="insertOrderedList">
							<img class="iconImage" src="/1images/orderedListIcon.jpg" 
								id="insertOrderedListIcon"
								onclick="insertOrderedList()">
						</div>
						<div class="icon" id="insertUnorderedList">
							<img class="iconImage" src="/1images/unorderedListIcon.png" 
								id="insertUnorderedListIcon"
								onclick="insertUnorderedList()">
						</div>
					</div>
					<div class="toolIconRow">
						<div class="icon" id="insertTextBox">
							<img class="iconImage" src="/1images/textBoxIcon2.png"
								id="insertTextBoxIcon"
								onclick="insertMainBox('textBox')">
						</div>
						<div class="icon" id="insertHiddenText">
							<img class="iconImage" src="/1images/hiddenTextIcon.jpg" 
								id="insertHiddenTextIcon"
								onclick="insertHiddenText()">
						</div>
						<div class="icon" id="insertMultipleChoice">
							<img class="iconImage" src="/1images/multipleChoiceIcon.png" 
								id="insertMultipleChoiceIcon"
								onclick="insertMainBox('multipleChoiceBox')">
						</div>
						<div class="icon" id="insertFreeResponse">
							<img class="iconImage" src="/1images/freeResponseIcon2.jpg" 
								id="insertFreeResponseIcon"
								onclick="insertMainBox('freeResponseBox')"
							/>
						</div>
					</div>
					
				</div>
			</div>
			<div id="trashBox">
				<div class="grayControlBar" contenteditable="false" id="controlBar1">
					<span class="textBoxTitle">
						Trash Box
					</span>
					<div class="navIconRight" id="iconCloseTrash" 
						onclick="switchClassNameOnOff('trashBox',' visibleElement');">
						<img class="iconImage" src="/1images/trashIcon.png" 
							id="closeTrashBoxIcon"
						/>
					</div>
				</div>
			</div>
			<div id="footerIconBox">
				<div class="footerIconRow">
					<div class="icon" id="openTrashBox" style="top:.5em;">
						<img class="iconImage" src="/1images/trashIcon.png"
							id="openTrashBoxIcon"
							onclick="switchClassNameOnOff('trashBox',' visibleElement')"
						/>
					</div>
					<div class="icon" id="resize" style="top:.5em;">
						<img class="iconImage" src="/1images/resizeIcon.png"
							id="resizeIconIcon"
							onclick="changeMeShtyles(['style.css','lesson-editor.css'])"
						/>
					</div>
				</div>
			</div>
		</div>
	</div>
	
	<div id="editingSpace" contenteditable="false">
	
		<div class="textBoxGray" contenteditable="false" id="textBox1" style="padding:0 0 .5em 0;">
			<div class="grayControlBar" contenteditable="false" id="controlBar1">
				<span class="textBoxTitle">
					Lesson Outline
				</span>
				<div class="navIconLeft" id="iconDown1"
					onclick="divDown(1,'textBox');">
					<img class="iconImage" src="/1images/downArrowIcon2.png" 
						id="downArrowIcon1" 
					/>
				</div>
				<div class="navIconLeft" id="iconUp1"
					onclick="divUp(1,'textBox');">
					<img class="iconImage" src="/1images/upArrowIcon2.png"
						id="upArrowIcon1" 
					/>
				</div>
				<div class="navIconRight" id="iconTrash1" 
					onclick="closeBox(1,'textBox');">
					<img class="iconImage" src="/1images/trashIcon.png" 
						id="trashIcon1"
					/>
				</div>
			</div>
			<div class="textField" id="textField1" contenteditable="false">
				<span style="font-size:.85em;">
					The lesson outlines are to be used as general guides when writing lessons. They make sure 
					that all lessons created for a topic cover the same minimum material.
				</span>
				<br><br>
				This topic currently has no lesson outline. The shortest approved lesson will become the 
				lesson outline for this topic.
			</div>
		</div>
		
		<div class="textBox" contenteditable="false" id="textBox2">
			<div class="blueControlBar" contenteditable="false" id="controlBar2">
				<div class="navIconLeft" id="iconDown2">
					<img class="iconImage" src="/1images/downArrowIcon2.png" 
						id="downArrowIcon2" 
					onclick="divDown(2,'textBox');"
					/>
				</div>
				<div class="navIconLeft" id="iconUp2"
					onclick="divUp(2,'textBox');">
					<img class="iconImage" src="/1images/upArrowIcon2.png"
						id="upArrowIcon2" 
					/>
				</div>
				<div class="navIconRight" id="iconTrash2" 
					onclick="closeBox(2,'textBox');">
					<img class="iconImage" src="/1images/trashIcon.png" 
						id="trashIcon2"
					/>
				</div>
			</div>
			<div class="textField newLineEditable" id="textField2" contenteditable="true"
				onload="">
			</div>
		</div>
	</div>
</div>

<script src="/1JS/topMenu.js"></script>
<script src="/1JS/useful-functions.js"></script>
<script src="lesson-editor-inline-elements.js"></script>
<script src="lesson-editor-inner-blocks.js"></script>
<script src="lesson-editor-main-blocks.js"></script>
<script src="lesson-editor-move-elements.js"></script>
<script src="lesson-editor-preview.js"></script>
<script src="expression-evaluater.js" type="text/javascript"></script>
<script src="/1JS/problem-generation.js" type="text/javascript"></script>
<script>
setNewLineCapability('textField2');
setPostPasteFunction('textField2');
</script>

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