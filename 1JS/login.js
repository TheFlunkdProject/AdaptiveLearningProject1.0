function prepareForm(theForm, newAction, fun) {
	theForm = gEBN(theForm);
	theForm.action = newAction;
	theForm.addEventListener(
		'submit', function(ev) {
			ev.preventDefault();
			fun();
		}, false
	);
}

prepareForm('registerForm', '/php/users/validate-registration.php', validateRegistrationData);
prepareForm('loginForm', '/php/users/validate-login.php', validateLoginData);


function validateRegistrationData() {
	var email = gEBN('email').value;
	var password = gEBN('password').value;
	var passwordRepeat = gEBN('passwordRepeat').value;
	var firstName = gEBN('firstName').value;
	var lastName = gEBN('lastName').value;
	var male = gEBN('gender',1).checked;
	var female = gEBN('gender',0).checked;
	var gender = "";
	if (male) {
		gender="male";
	} else if (female) {
		gender = "female";
	}
	
	// These checks are also done server side:
	// The email address has to appear valid:
	if (!validateEmail(email)) {
		dumpErrorsIntoContainerFromObj('errorsContainer',['emailErr'],{"emailErr":"Invalid email address"});
		return;
	}
	
	// The passwords:
	if (!password) {
		dumpErrorsIntoContainerFromObj('errorsContainer',['passwordErr'],{"passwordErr":"Password is required"});
		return;
	}
	if (password != passwordRepeat) {
		dumpErrorsIntoContainerFromObj('errorsContainer',['passwordErr'],{"passwordErr":"Passwords do not match"});
		return;
	}
	
	// First and Last names:
	if (!firstName || !lastName) {
		dumpErrorsIntoContainerFromObj('errorsContainer',['firstNameErr'],{"firstNameErr":"First and last names are both required"});
		return;
	}
	
	// Gender:
	if (!gender) {
		dumpErrorsIntoContainerFromObj('errorsContainer',['genderErr'],{"genderErr":"Gender required"});
		return;
	}
	
	var theForm = gEBN('registerForm');
	var submitButton = gEBN('submitRegistration');
	submitButton.value = 'Validating...';
	
	var formData = new FormData(theForm);//theForm
	
	formData.append('email',email);
	formData.append('password',password);
	formData.append('passwordRepeat',passwordRepeat);
	formData.append('firstName', firstName);
	formData.append('lastName', lastName);
	formData.append('gender',gender);
	
	//Set up an AJAX request:
	var xhr = new XMLHttpRequest();
	xhr.open('POST', '/php/users/validate-registration.php', true);
	
	// Set up a handler for when the request finishes.
	xhr.onload = function () {
		if (xhr.status === 200) {
			submitButton.value = 'Register';
			var jj = JSON.parse(xhr.responseText);
			if (jj['success'] == 'success') {
				window.location.replace("http://switchlearn.com/account/");
			}
			
			dumpErrorsIntoContainerFromObj('errorsContainer',['emailErr','passwordErr','firstNameErr','lastNameErr','genderErr'],jj);
			
			
			//updateElementTextWithObj(['emailErr','passwordErr','firstNameErr','lastNameErr','genderErr'],jj);
		} else {
			alert('An AJAX error occurred!');
		}
	};
	
	// Send the Data.
	xhr.send(formData);
}


function validateEmail(email) 
{
    var re = /\S+@\S+\.\S+/;
    return re.test(email);
}


function dumpErrorsIntoContainerFromObj(con,ids,jj) {
	var errorsContainer = gEBI(con);
	var errorList = htmlListObjKeys(ids,jj);
	if (errorList.indexOf('<li>') != -1) {
		errorsContainer.className += ' errors';
	} else {
		swapClassName(errorsContainer,'errors','');
		errorList = "";
	}
	errorsContainer.innerHTML = errorList;
}
	

function htmlListObjKeys(ids,jj) {
	var htmlString = "The following errors occured: <ul>";
	var anyErrors = '';
	for (var i=0; i<ids.length; i++) {
		var thisError = jj[ids[i]];
		anyErrors += thisError;
		if (thisError) {
			htmlString += "<li>" + thisError + "</li>";
		}
	}
	htmlString += "</ul>";
	if (anyErrors) {
		return htmlString;
	} else {
		return "";
	}
}
		

function updateElementTextWithObj(ids,jj) {
	for (var i=0; i<ids.length; i++ ) {
		gEBI(ids[i]).innerHTML = jj[ids[i]];
	}
}


function validateLoginData() {
	var theForm = gEBN('loginForm');
	var submitButton = gEBN('submitLogin');
	submitButton.value = 'Signing in...';
	
	var formData = new FormData(theForm);//theForm
	
	var email = gEBN('emailSignin').value;
	var password = gEBN('passwordSignin').value;
	
	formData.append('email', email);
	formData.append('password', password);
	
	//Set up an AJAX request:
	var xhr = new XMLHttpRequest();
	xhr.open('POST', '/php/users/validate-login.php', true);
	
	// Set up a handler for when the request finishes.
	xhr.onload = function () {
		if (xhr.status === 200) {
			submitButton.value = 'Sign In';
			var jj = JSON.parse(xhr.responseText);
			if (jj['success'] == 'success') {
				window.location.replace("http://switchlearn.com/account/");
			}
			dumpErrorsIntoContainerFromObj('signinErrorsContainer',['emailErr','passwordErr'],jj);
		} else {
			alert('An AJAX error occurred!');
		}
	};
	
	// Send the Data.
	xhr.send(formData);
}