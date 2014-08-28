<?php
$query = $_GET["query"];
$courseOrTopic = $_GET["courseOrTopic"];
include $_SERVER["DOCUMENT_ROOT"] . "/php/db/find-courses-or-topics.php";

$jsonOut = findCoursesOrTopics($query,$courseOrTopic);

$jsonOut["status"] = "success";

echo json_encode($jsonOut);

?>

