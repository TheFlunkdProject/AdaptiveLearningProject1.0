<?php
session_start();

$jsonOut = array();

session_destroy();
if (session_id() == "") {
	$jsonOut['success'] = 'success';
}

echo json_encode($jsonOut);
?>