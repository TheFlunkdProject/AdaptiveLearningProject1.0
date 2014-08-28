function selectMouseOver(id) {
e=document.getElementById(id);
if (e.style.borderColor!='#000000') {
	e.style.backgroundColor='blue';
}
}

function selectThisOption(id) {
stringSelected = "background-color: #112288;padding: .25em; color: #3366ff;border-width: 1px 0px;border-style: solid;border-color: #111122;"
document.getElementById(id).style.cssText=stringSelected;
}

function submitWithActionRedirect(actVal) {
	var theForm = gEBN('createForm');
	theForm.action = actVal;
	gEBN('submitCreate').click();
}

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
	