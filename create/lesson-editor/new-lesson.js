function newLesson(dontSaveChanges) {
	
	var lessonChanged = gEBI('lessonChanged').value;
	if (lessonChanged && !dontSaveChanges) {
		showElement(gEBI('confirmChangesMade'));
		return;
	}
	
	var topicID = gEBI('selectedTopicID').value;
	if (!topicID) {
		alert('Please select a topic');
		return;
	}
	
	
	var newLessonButton = gEBI('newLessonButton');
	var theForm = gEBN('savePublishForm');
	
	
	newLessonButton.value = 'Getting topic info...';
	
	var formData = new FormData(theForm);//theForm
	formData.append('topicID', topicID);
	
	//Set up an AJAX request:
	var xhr = new XMLHttpRequest();
	xhr.open('POST', 'new-lesson.php', true);
	//xhr.setRequestHeader("Content-type", "multipart/form-data");
	
	// Set up a handler for when the request finishes.
	xhr.onload = function () {
		if (xhr.status === 200) {
			// File(s) uploaded.
			newLessonButton.value = "New";
			var jj = JSON.parse(xhr.responseText);
			if (jj.status == "success") {
				var topicInfoInTrash = gEBI('textBox1');
				if (topicInfoInTrash.parentNode.id == "trashBox") {
					topicInfoInTrash.parentNode.removeChild(topicInfoInTrash);
				}
				gEBI('editingSpace').innerHTML = getNewLessonHTML(jj['topicOutline']);
				listenForChange();
				applyAllJS();
			} else {
				if (jj.sqlMessages) {
					alert(jj.sqlMessages);
				}
			}
			
		} else {
			alert('An error occurred!');
		}
	};
	
	// Send the Data.
	xhr.send(formData);
}

function getNewLessonHTML(topicOutline) {
	var includes = topicOutline['Include'];
	var excludes = topicOutline['Exclude'];
	var newHTML = '<div class="textBoxGray" contenteditable="false" id="textBox1" style="padding:0 0 .5em 0;">\
					<div class="grayControlBar" contenteditable="false" id="controlBar1">\
						<span class="textBoxTitle">\
							Lesson Outline\
						</span>\
						<div class="navIconLeft" id="iconDown1">\
							<img class="iconImage" src="/1images/downArrowIcon2.png" id="downArrowIcon1" />\
						</div>\
						<div class="navIconLeft" id="iconUp1">\
							<img class="iconImage" src="/1images/upArrowIcon2.png" id="upArrowIcon1" />\
						</div>\
						<div class="navIconRight" id="iconTrash1">\
							<img class="iconImage" src="/1images/trashIcon.png" id="trashIcon1" />\
						</div>\
					</div>\
					<div class="textField" id="textField1" contenteditable="false">\
						<span style="font-size:.85em;">\
							Please include at least the follwing in your lesson:\
							<ul>';
								
	for (var str in includes) {
		newHTML += '<li>';
		newHTML += includes[str];
		newHTML += '</li>';
	}
	
	newHTML += 				'</ul>\
							Please do not include the following in your lesson:\
							<ul>';
								
	for (var str in excludes) {
		newHTML += '<li>';
		newHTML += excludes[str];
		newHTML += '</li>';
	}
	
newHTML += 					'</ul>\
						</span>\
					</div>\
				</div>\
				\
				<div class=" textBox" contenteditable="false" id="textBox2">\
					<div class=" blueControlBar" contenteditable="false" id="controlBar2">\
						<div class=" navIconLeft" id="iconDown2">\
							<img class=" iconImage" src="/1images/downArrowIcon2.png" id="downArrowIcon2">\
						</div>\
						<div class=" navIconLeft" id="iconUp2">\
							<img class=" iconImage" src="/1images/upArrowIcon2.png" id="upArrowIcon2">\
						</div>\
						<div class=" navIconLeft" id="iconHtmlTag2">\
							<img class=" iconImage" src="/1images/html-tags3.png" id="htmlTagIcon2">\
						</div>\
						<div class=" navIconRight" id="iconTrash2">\
							<img class=" iconImage" src="/1images/trashIcon.png" id="trashIcon2">\
						</div>\
					</div>\
					<div class=" textField newLineEditable" id="textField2" contenteditable="true">\
					</div>\
					<textarea class="htmlTextarea squishedElement" id="htmlTextarea2">\
					</textarea>\
				</div>';
	return newHTML;
}