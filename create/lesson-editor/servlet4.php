
<?php
$jsonOut = array();
$tempPath = $_SERVER['DOCUMENT_ROOT'] . htmlspecialchars($_POST["tempPath"]);
include $_SERVER['DOCUMENT_ROOT'] . '/image-path-functions.php';
$imageType = getImangeExtensionFromPath($tempPath);
$imageName = htmlspecialchars($_POST["imageName"]) . $imageType;
$imageDescription = htmlspecialchars($_POST["imageDescription"]);
$jsonOut['imageName'] = $imageName;
$jsonOut['imageDescription'] = $imageDescription;

include $_SERVER['DOCUMENT_ROOT'] . '/create-Images-table.php';
$outs = insertImageToTable($imageName,$imageType,$imageDescription);
$pid = $outs[0];
$jsonOut['pid'] = $pid;

if(!is_dir($_SERVER['DOCUMENT_ROOT'] . "/Images")) {
	mkdir($_SERVER['DOCUMENT_ROOT'] . "/Images");
}
if(!is_dir($_SERVER['DOCUMENT_ROOT'] . "/Images/" . $pid % 1000)) {
	mkdir($_SERVER['DOCUMENT_ROOT'] . "/Images/" . $pid % 1000);
}
if(!is_dir($_SERVER['DOCUMENT_ROOT'] . "/Images/" . $pid % 1000 . "/" . $pid % 1000000)) {
	mkdir($_SERVER['DOCUMENT_ROOT'] . "/Images/" . $pid % 1000 . "/" . $pid % 1000000);
}
$newURL = "/Images/" . $pid % 1000 . "/" . $pid % 1000000 . "/" . $pid . $imageType;
$jsonOut['newURL'] = $newURL;
$newPath = $_SERVER['DOCUMENT_ROOT'] . $newURL;
rename($tempPath,$newPath);


echo json_encode($jsonOut);
?>