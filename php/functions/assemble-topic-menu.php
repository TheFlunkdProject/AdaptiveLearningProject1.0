<?php

function assembleTopicMenu($coursePID, $courseName, $menuArray) {
	$appRoot = $_SERVER['DOCUMENT_ROOT'];
	$htmlString = '' .
		'<div class="contentContainer">' .
			'<table class="topicTable">';
	
	// Loop through each topic:
	foreach($menuArray as $topic => $topicName) {
		$topicPath = "http://switchlearn.com/learn/courses/$courseName/$coursePID/$topicName/$topic/";
	
		// Check if it's a section header:
		if ($topic == "section") {
			$htmlString .= '' .
				'</table>' .
				'<table class="topicMenuSectionHeader">' .
					'<tr>' .
						'<td>' .
							$topicName . '' .
						'</td>' .
					'</tr>' .
				'</table>';
				'<table class="topicTable">';
		} else {
			$htmlString .= '' .
				'<tr>' .
					'<td class="nameColumn"><a href="'.$topicPath.'lesson">'.$topicName.'</a></td>' .
					'<td class="textColumn"><a href="'.$topicPath.'lesson"><img class="courseMenuIcon" src="/1images/textIcon3.png"></a></td>' .
					'<td class="videoColumn"><a href="'.$topicPath.'video"><img class="courseMenuIcon" src="/1images/videoCamera.png"></a></td>' .
					'<td class="practiceColumn"><a href="'.$topicPath.'practice"><img class="courseMenuIcon" src="/1images/writeIcon.png"></a></td>' .
					'<td class="gameColumn"><a href="'.$topicPath.'game"><img class="courseMenuIcon" src="/1images/gameIcon.png"></a></td>' .
				'</tr>';
		}
	}
	
	$htmlString .= '' .
			'</table>' .
		'</div>';
	
	return $htmlString;
}

?>