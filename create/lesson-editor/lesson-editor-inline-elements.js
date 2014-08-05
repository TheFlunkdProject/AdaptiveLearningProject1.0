function insertHiddenText() {
	var theResult = checkIfContentEditable();
	if (theResult == 'nopes') {
		return;//Quit function
	}
	
	var i = findMainBoxNumber()
	var istr = i.toString();
	
	var triggerBox = createEl('span',['className',' triggerBox','contentEditable','false','id','triggerBox'+istr]);
	var triggerText = createEl('span',['className',' triggerTextEditor','contentEditable','true','id','triggerTextEditor'+istr]);
	
	triggerText.onfocus=function() {
		gEBI('hiddenTextBoxEditor'+istr).className += ' hiddenTextBoxEditorHighlighted';
	};
	triggerText.onblur=function() {
		switchClassNameOnOff('hiddenTextBoxEditor'+istr,' hiddenTextBoxEditorHighlighted');
	};
	
	triggerBox.appendChild(triggerText);
	insertNodeAtCursor(triggerBox);
	
	insertMainBox('hiddenTextBoxEditor'); // This is our in-line element's pair.
}
	

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


function insertInlineElement(eType) {//'title','link'
	var theResult = checkIfContentEditable();
	if (theResult == 'nopes') {
		return;//Quit function
	}
	
	//Find out id number:
	var i=1;
	while (document.getElementById(eType+'TriggerBox'+i.toString()) !=null ) {
		i++;//See which title this will be...
	}
	var istr = i.toString();
	
	//Create the title trigger box
	var eTriggerBox = createEl('span',['className',' '+eType+'TriggerBox','id',eType+'TriggerBox'+istr,'contentEditable','false']);
	var eTriggerText = createEl('span',['className',' '+eType+'TriggerText','id',eType+'TriggerText'+istr,'contentEditable','true']);
	eTriggerText.onfocus=function() {showElement(eType+'Box'+istr);};
	eTriggerText.onblur=function() {
		setTimeout(function() {
			if (document.activeElement != document.getElementById(eType+'Text'+istr)) {
				hideElement(eType+'Box'+istr);
			}
		}, 10);
	};
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
	eText.onfocus=function() {showElement(this.parentNode)};
	eText.onblur=function() {hideElement(this.parentNode)};
	eText.oninput=function() {
		if(this.value.length>8) {
		this.size=this.value.length+1;
		} else {
		this.size=8;
		}
	};
	//Icon trash can (because Fire fox doesn't erase elements with backspace)
	var inlineIconRight = createEl('div',['className',' inlineIconRight','id',eType+'IconTrash'+istr]);
	inlineIconRight.onclick=function() {closeInlineElement(i,eType);};
	var img1 = createEl('img',['className',' iconImage','src',"/1images/trashIcon.png",'id',eType+'TrashIcon'+istr]);
	//Append it together
	appendNextElementsInList([eBox,eText, inlineIconRight,img1, eTriggerBox,[eBox,eTriggerText,inlineIconRight]]);
	
	insertNodeAtCursor(eTriggerBox);
}


function insertEquation() {
	var theResult = checkIfContentEditable();
	if (theResult == 'nopes') {
		return;//Quit function
	}
	
	//Find out id number:
	var i=1;
	while (document.getElementById('equationInput'+i.toString()) != null) {
		i++;
	}
	var istr = i.toString();
	
	var equationTriggerBox = createEl('span',['className',' equationTriggerBox','id','equationTriggerBox'+istr,'contentEditable','false']);
	var equationInput = createEl('input',['type','text','className',' equationInput','id','equationInput'+istr,'size','2','placeholder','f(x)']);
	var equationPreviewBox = createEl('div',['className',' equationPreviewBox','id','equationPreviewBox'+istr,'title','Check for boxed equation',
			'tabindex','-1']);
	var equationPreview = createEl('span',['className',' equationPreview','id','equationPreview'+istr]);
	var importantEquationCheckbox = createEl('input',['type','checkbox','className',' importantEquationCheckbox',
			'id','importantEquationCheckbox'+istr,'checked','false']);
	equationInput.oninput=function() {
		//Resize and display equation:
		if (equationInput.value.length>2) {
			equationInput.size=equationInput.value.length+1;
			}
			else {
			equationInput.size=2;
			}
		equationPreview.innerHTML="$($"+equationInput.value + "$)$";
		MathJax.Hub.Queue(["Typeset",MathJax.Hub]);
	};
	createFocusGroup([equationInput],[equationPreviewBox,importantEquationCheckbox]);

	importantEquationCheckbox.onclick= function(event) {event.stopPropagation();};
	setCheckOrUncheckFunction(equationPreviewBox,importantEquationCheckbox);
	
	var equationIconTrash = createEl('div',['className',' inlineIconRight','id','equationIconTrash'+istr]);
	equationIconTrash.onclick=function() {closeInlineElement(istr,'equation');};
	var iconImage = createEl('img',['className',' iconImage','src',"/1images/trashIcon.png",'id','equationTrashIcon'+istr]);
	//Create a little textNode after so that you can continue typing on the end:
	//var text1=document.createTextNode(' ');
	appendNextElementsInList([equationIconTrash,iconImage, equationPreviewBox,[equationPreview,importantEquationCheckbox],
			equationTriggerBox,[equationPreviewBox,equationInput,equationIconTrash]])
	
	insertNodeAtCursor(equationTriggerBox);
	//equationTriggerBox.parentNode.insertBefore(text1, equationTriggerBox.nextSibling)
}

function createFocusGroup(visibleList,invisibleList) {// THEY MUST BE LISTS.
	for (var i=0; i<visibleList.length; i++) {
		visibleList[i].onfocus = function() {
			for (var ii=0; ii<invisibleList.length; ii++) {
				showElement(invisibleList[ii]);
			}
		};
		setFocusGroupOnblurFunction(visibleList[i],visibleList,invisibleList);
	}
	for (var ii=0; ii<invisibleList.length; ii++) {
		setFocusGroupOnblurFunction(invisibleList[ii],visibleList,invisibleList);
	}
}

function setFocusGroupOnblurFunction(el,visibleList,invisibleList) {
	el.onblur=function() {
		setTimeout(function() {
			if (getActiveMembersFromNodeList(visibleList).length > 0 || getActiveMembersFromNodeList(invisibleList).length > 0 ) return;
			for (var hider=0; hider<invisibleList.length; hider++) {
				hideElement(invisibleList[hider]);
			}
		}, 10);
	};
}

function getActiveMembersFromNodeList(list) {
	var activeNodes = [];
	for (var i=0; i<list.length; i++) {
		if (document.activeElement == list[i]) {
			activeNodes.push(list[i]);
		}
	}
	return activeNodes;
}

function setCheckOrUncheckFunction(clickElement,checkBoxElement) {
	clickElement.onclick = function() {
		if (checkBoxElement.checked) {
			checkBoxElement.checked = false;
		} else {
			checkBoxElement.checked = true;
		}
	};
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