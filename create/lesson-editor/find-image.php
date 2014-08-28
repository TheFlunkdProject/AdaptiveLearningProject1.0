<?php
$query = $_GET["query"];
if (!$query) {
	$query = "Moun";
}
include $_SERVER["DOCUMENT_ROOT"] . "/find-image-from-db.php";


$jsonOut = findStringFromTable($query,"Images");
echo json_encode($jsonOut);

?>

