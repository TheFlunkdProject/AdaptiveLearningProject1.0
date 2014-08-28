<!doctype html>
<html>
<head>
<style>
body {
	text-align:center;
	background-color:#112;
	color:#aaa;
	font-family:sans-serif;
}
#newImagePreview {
	width:28%;
}
#saveStatus {
	
}
#savedImageDetails {
	position:absolute;
	width:600px;
	margin:auto;
	left:0;
	right:0;
	background-color:#243655;
	padding:1em;
	text-align:left;
}
.darkInput {
	margin:1em;
	padding:.2em;
	border-width:2px;
	border-style:inset;
	border-color:#888;
	background-color:#112;
	color:#eee;
	opacity:.7;
	font-family:monospace;
	width:200px;
}
#imageDescription {
	resize: none;
	height:3.8em;
}
.label {
	font-weight:bold;
}
</style>
</head>
<body>
<?php
$url = htmlspecialchars($_GET["image"]);// image URL
$data = array();
include $_SERVER['DOCUMENT_ROOT'] . '/image-path-functions.php';

if ($url) {
	$data = saveImageFromURL($url,$data);
}
?>
<img src="<?php echo $data['StoredPath'];?>" id="newImagePreview"/>
<br><br>
<form name="saveImage" id="saveImage" >
	Image Name:
	<br>
	<?php
	echo '<input type="text" class="darkInput" id="imageName" name="imageName" value="'.$_GET['title'].'" placeholder="Name"/>';
	?>
	<br>
	Image key words/description:
	<br>
	<textarea class="darkInput" id="imageDescription" name="imageDescription" placeholder="Description"></textarea>
	<br>
	<input type="button" id="saveImageButton" name="saveImageButton" value="Save" 
		onclick='submitSaveImageAjax(gEBI("saveImage"));' />
	
</form>
<div id="saveStatus"></div>
<script src="/create/lesson-editor/save-pixlr-image.js"></script>

</body>
</html>
