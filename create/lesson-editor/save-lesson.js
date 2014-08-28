function getNewLessonName() {
	showElement(gEBI('enterNewLessonNameContainer'));
}

function closeNewLessonNameBox() {
	hideElement(gEBI('enterNewLessonNameContainer'));
}

function saveLesson(loggedIn,saveAs) {
	
	var lessonName = gEBI('lessonName').innerHTML;
	var lessonID = gEBN('lessonID').value;
	// If the user doesn't think they're saving a new lesson but they are:
	if (!saveAs && (!lessonName || !lessonID)) {
		getNewLessonName();
		return;
	}
	closeNewLessonNameBox();

	var agree = false;
	if (!loggedIn) {
		agree = window.confirm("You are not logged in. This lesson will be available for anyone else to finish.");
		if(!agree) return;
	}
	
	var topicID = gEBI('selectedTopicID').value;
	if (!topicID) {
		alert('Please select a topic');
		return;
	}
	
	
	var saveButton;
	if (saveAs) {
		saveButton = gEBI('saveLessonAsButton');
		lessonName = gEBI('newLessonNameInput').value;
		gEBI('newLessonNameInput').value = '';
	} else {
		saveButton = gEBI('saveLessonButton');
	}
	var theForm = gEBN('savePublishForm');
	var lessonHTML = gEBI('editingSpace').innerHTML;
	
	
	saveButton.value = 'Saving...';
	
	var formData = new FormData(theForm);//theForm
	formData.append('agree', agree);
	formData.append('lessonName', lessonName);
	formData.append('lessonID', lessonID); // Empty if saveAs
	formData.append('theLesson', lessonHTML);
	formData.append('topicID', topicID);
	
	//Set up an AJAX request:
	var xhr = new XMLHttpRequest();
	xhr.open('POST', 'save-lesson.php', true);
	//xhr.setRequestHeader("Content-type", "multipart/form-data");
	
	// Set up a handler for when the request finishes.
	xhr.onload = function () {
		if (xhr.status === 200) {
			// File(s) uploaded.
			if (saveAs) {
				saveButton.value = "Save As";
			} else {
				saveButton.value = 'Save';
			}
			var jj = JSON.parse(xhr.responseText);
			if (jj.status == "success") {
				gEBI('lessonName').innerHTML = jj.lessonName;
				gEBN('lessonID').value = jj.PID;
				if (saveAs) {
					alert("Save successful. New lesson name is \"" + jj.lessonName + "\"");
				} else {
					alert("Save successful.");
				}
				listenForChange();
			} else {
				if (jj.sqlMessages) {
					alert(jj.sqlMessages);
				}
				if (!jj.sameAuthor) {
					alert("You are not authorized to change that lesson.");
				}
				alert("Save was unsuccessful.");
			}
			
		} else {
			alert('An error occurred!');
		}
	};
	
	// Send the Data.
	xhr.send(formData);
}

function listenForChange() {
	var savedLessonText = gEBI('savedLessonText');
	var editingSpace = gEBI('editingSpace');
	savedLessonText.value = editingSpace.innerHTML;
	var detectChangeTimer = setInterval(function(){
		if (gEBI('savedLessonText').value == gEBI('editingSpace').innerHTML) {
			gEBI('lessonChanged').value = '';
		} else {
			gEBI('lessonChanged').value = 'changed';
			clearInterval(detectChangeTimer);
		}
	},3000);
}