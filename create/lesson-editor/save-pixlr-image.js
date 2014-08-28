function submitSaveImageAjax(theForm) {
	theForm.onsubmit = function(event) {
		event.preventDefault();
		saveImageAjax();
	};
	theForm.onsubmit(event);
}

function gEBI(str) {
	var el = document.getElementById(str);
	return el;
}

function saveImageAjax() {
	var saveButton = gEBI('saveImageButton');
	var theForm = gEBI('saveImage');
	var imgSrc = gEBI('newImagePreview').src;
	var tempPath = imgSrc.substring(imgSrc.indexOf('/upload/'));
	var imageName = gEBI('imageName').value;
	var imageDescription = gEBI('imageDescription').value;
	saveButton.value = 'Saving...';
	
	var formData = new FormData(theForm);//theForm
	formData.append('tempPath', tempPath);
	formData.append('imageName',imageName);
	formData.append('imageDescription',imageDescription);
	
	//Set up an AJAX request:
	var xhr = new XMLHttpRequest();
	xhr.open('POST', '/create/lesson-editor/servlet4.php', true);
	
	xhr.onload = function () {
		if (xhr.status === 200) {
			// File(s) uploaded.
			saveButton.value = 'Save';
			var jsonObj = JSON.parse(xhr.responseText);
			gEBI('saveStatus').innerHTML = "<br><span class='label'>Image saved successfully!<br><br><div id='savedImageDetails'>Image ID:  </span>" + 
				jsonObj['pid'] + "<br><br><span class='label'>Image Name:  </span>" + 
				jsonObj['imageName'] + "<br><br><span class='label'>Image Description:  </span>" + 
				jsonObj['imageDescription'] + '</div>';
			theForm.innerHTML = '';
			
		} else {
			alert('An error occurred!');
		}
	};
	
	xhr.send(formData);
}