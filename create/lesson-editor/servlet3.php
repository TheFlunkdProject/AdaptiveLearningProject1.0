<?php


$data = array();

$fileName = htmlspecialchars($_POST["theName"]);
$data['fileName'] = $fileName;

$allowedExts = array("gif", "jpeg", "jpg", "png");
$temp = explode(".", $_FILES[$fileName]["name"]);
$extension = end($temp);

$url = htmlspecialchars($_POST["imageURL"]);

include $_SERVER['DOCUMENT_ROOT'] . '/image-path-functions.php';

if ($url) {
	$data = saveImageFromURL($url,$data);
}


if($_FILES[$fileName]) {
	$imageExtension = getExtensionFromImageType($_FILES[$fileName]["type"]);
	$data['imageType'] = $imageExtension;
	if ($imageExtension
	&& ($_FILES[$fileName]["size"] < 2000000)//20000
	&& in_array($extension, $allowedExts)) {
	  if ($_FILES[$fileName]["error"] > 0) {
		$data['ReturnCode'] = $_FILES[$fileName]["error"];
	  } 
	  else {
		$data['Upload'] = $_FILES[$fileName]["name"];
		$data['Type'] = $_FILES[$fileName]["type"];
		$data['fileSize'] = ($_FILES[$fileName]["size"] / 1024) . ' kB';
		$data['TempFile'] = $_FILES[$fileName]["tmp_name"];
		move_uploaded_file($_FILES[$fileName]["tmp_name"], $_SERVER['DOCUMENT_ROOT']."/upload/" . $_FILES[$fileName]["name"]);
		$data['StoredPath'] = '/upload/' . $_FILES[$fileName]["name"];
	  }
	} else {
	  $data['Validity'] = 'Invalid file';
	}
}


echo json_encode($data);
?>