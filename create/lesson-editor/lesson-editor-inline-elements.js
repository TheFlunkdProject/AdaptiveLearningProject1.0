//====== insert hidden text trigger and box ================================
function insertHiddenText() {
	var theResult = checkIfContentEditable();
	if (theResult == 'nopes') {
		return;//Quit function
	}
	
	var i = findMainBoxNumber()
	var istr = i.toString();
	
	var triggerBox = createHiddenTriggerTextElementsTree(istr);
	
	insertNodeAtCursor(triggerBox);
	insertMainBox('hiddenTextBoxEditor'); // This is our in-line element's pair.
	//applyJS.triggerTextEditor(istr);
}


function createHiddenTriggerTextElementsTree(istr) {
	var triggerBox = createEl('span',['className',' triggerBox','contentEditable','false','id','triggerBox'+istr]);
	var triggerText = createEl('span',['className',' triggerTextEditor','contentEditable','true','id','triggerTextEditor'+istr]);
	
	triggerBox.appendChild(triggerText);
	return triggerBox;
}
	

//====== insert ordered list ================================
function insertOrderedList() {
	var theResult = checkIfContentEditableAndNewLineCapable();
	if (theResult == 'nopes') {
		return;//Quit function
	}
	var ol1=createEl('ol');
	var li1=createEl('li',['tabindex','-1']);
	ol1.appendChild(li1);
	insertNodeAtCursor(ol1);
	li1.focus();
}


//====== insert unordered list ================================
function insertUnorderedList() {
	var theResult = checkIfContentEditableAndNewLineCapable();
	if (theResult == 'nopes') {
		return;//Quit function
	}
	var ul1=createEl('ul');
	var li1=createEl('li');
	ul1.appendChild(li1);
	insertNodeAtCursor(ul1);
}


//====== insert inline element ================================
function insertInlineElement(eType) {//'title','link'
	var theResult = checkIfContentEditable();
	if (theResult == 'nopes') {
		return;//Quit function
	}
	
	//Find out id number:
	var istr = findIstr(eType+'TriggerBox');
	
	var eTriggerBox = createInlineElementsTree(eType, istr);
	insertNodeAtCursor(eTriggerBox);
	applyJS.inlineElementEditor(eType, istr);
}


function createInlineElementsTree(eType, istr) {
	//Create the title trigger box
	var eTriggerBox = createEl('span',['className',' '+eType+'TriggerBox','id',eType+'TriggerBox'+istr,'contentEditable','false']);
	var eTriggerText = createEl('span',['className',' '+eType+'TriggerText','id',eType+'TriggerText'+istr,'contentEditable','true']);
	
	//Create the display box that will appear when you focus on the title trigger text:
	var eBox = createEl('div',['className',' '+eType+'Box','id',eType+'Box'+istr]);
	var inputPlaceHolder = '';
	switch(eType) {
		case 'title':
		inputPlaceHolder = 'Title/Label';
		break;
		case 'link':
		inputPlaceHolder = 'Paste URL';
		break;
	}
	var eText = createEl('input',['type','text','className',' '+eType+'Text','id',eType+'Text'+istr,'size','8','placeHolder',inputPlaceHolder]);
	
	//Icon trash can (because Fire fox doesn't erase elements with backspace)
	var inlineIconRight = createEl('div',['className',' inlineIconRight','id',eType+'IconTrash'+istr]);
	var img1 = createEl('img',['className',' iconImage','src',"/1images/trashIcon.png",'id',eType+'TrashIcon'+istr]);
	
	//Append it together
	appendNextElementsInList([eBox,eText, inlineIconRight,img1, eTriggerBox,[eBox,eTriggerText,inlineIconRight]]);
	
	return eTriggerBox;
}


//====== insert Equation ===============================
function insertEquation() {
	var theResult = checkIfContentEditable();
	if (theResult == 'nopes') {
		return; // Only insertEquation() if contentEditable.
	}
	
	// Find id # for this equation:
	var istr = findIstr('equationInput');

	var equationTriggerBox = createEquationElementsTree(istr);
	insertNodeAtCursor(equationTriggerBox);
	applyJS.equationEditor(istr);
}


function createEquationElementsTree(istr) {
	var equationTriggerBox = createEl('span',['className',' equationTriggerBox','id','equationTriggerBox'+istr,'contentEditable','false']);
	var equationInput = createEl('input',['type','text','className',' equationInput','id','equationInput'+istr,'size','2','placeholder','f(x)']);
	var equationPreviewBox = createEl('div',['className',' equationPreviewBox','id','equationPreviewBox'+istr,'title','Check for boxed equation',
			'tabindex','-1']);
	var equationPreview = createEl('span',['className',' equationPreview','id','equationPreview'+istr]);
	var importantEquationCheckbox = createEl('input',['type','checkbox','className',' importantEquationCheckbox',
			'id','importantEquationCheckbox'+istr,'checked','false']);
	
	var equationIconTrash = createEl('div',['className',' inlineIconRight','id','equationIconTrash'+istr]);
	
	var iconImage = createEl('img',['className',' iconImage','src',"/1images/trashIcon.png",'id','equationTrashIcon'+istr]);
	
	appendNextElementsInList([equationIconTrash,iconImage, equationPreviewBox,[equationPreview,importantEquationCheckbox],
			equationTriggerBox,[equationPreviewBox,equationInput,equationIconTrash]])
		
	return equationTriggerBox;
}


function findIstr(idWithoutIstr) {
	var i=1;
	while (document.getElementById(idWithoutIstr+i.toString()) != null) {
		i++;
	}
	var istr = i.toString();
	return istr;
}
	


/*window.onscroll=loginAndToolsFade;

var scrollTimer = -1;

function loginAndToolsFade() {
document.getElementById('loginAndTools').style.opacity=".95";
if (scrollTimer != -1)
clearTimeout(scrollTimer);
scrollTimer = window.setTimeout("scrollFinished()", 100);
}


function scrollFinished() {
document.getElementById('loginAndTools').style.opacity="1";
}*/





//var jj=0;