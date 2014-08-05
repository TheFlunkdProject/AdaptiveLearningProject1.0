<!doctype html>
<html>
<head>

<link rel="stylesheet" type="text/css" href="personalized-learning.css"/>
<link rel="stylesheet" type="text/css" href="/1CSS/topMenu.css"/>

</head>
<body>
<div id="background"></div>

<%@ include file="/1JSP/topMenu.jsp" %>

<div id="mainContainer">
	<div id="pageName">
		Personalized Learning
	</div>
	<div id="pageDescriptionSentence">
		Help us bring personalized learning to the world.
	</div>
	
	<div style="margin:4em 0 0 0;"></div>
	<div class="horizontalLine"></div>
	
	
	
	<div class="horizontalLine"></div>
	
	<div class="relativeDiv" style="height:20em;margin:6em 0 0 0;">
		<div id="inspirationContainer">
			The one exclusive sign of thorough knowledge is the power of teaching.
			<br><br>- Aristotle
		</div>
	</div>
	
</div>

<script src="/1JS/topMenu.js"></script>
<script src="personalized-learning.js"></script>
<script>
	loadVideoData('<jsp:include page="videos.txt" />');
</script>
</body>
</html>