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