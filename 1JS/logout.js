if (gEBC('logoutLink')) {
	gEBC('logoutLink').onclick = function() {
		gEBN('submit').click();
	}
}

function prepareForm(theForm) {
	theForm = gEBN(theForm);
	theForm.action = '/php/users/logout.php';
	theForm.addEventListener(
		'submit', function(ev) {
			ev.preventDefault();
			logOut();
		}, false
	);
}

prepareForm('logoutForm');

function gEBI(ID) {
	if (typeof ID == 'string') ID = document.getElementById(ID);
	return ID;
}

function gEBN(n,i) {
	if (typeof i == 'undefined') i=0;
	n = document.getElementsByName(n)[i];
	return(n);
}

function gEBC(n,i) {
	if (typeof i == 'undefined') i=0;
	n = document.getElementsByClassName(n)[i];
	return(n);
}



function logOut() {
	var theForm = gEBN('logoutForm');
	var submitButton = gEBN('submit');
	submitButton.value = 'Loggin out...';
	
	var formData = new FormData(theForm);//theForm
	
	
	//Set up an AJAX request:
	var xhr = new XMLHttpRequest();
	xhr.open('POST', '/php/users/logout.php', true);
	
	// Set up a handler for when the request finishes.
	xhr.onload = function () {
		if (xhr.status === 200) {
			submitButton.value = 'Log out';
			var jsonObj = JSON.parse(xhr.responseText);
			if (jsonObj['success'] == 'success') {
				window.location.replace("http://switchlearn.com/login/");
			}
		} else {
			alert('An error occurred!');
		}
	};
	
	// Send the Data.
	xhr.send(formData);
}