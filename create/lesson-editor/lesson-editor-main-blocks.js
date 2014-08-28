function insertMainBox(boxType) {
	var i = findMainBoxNumber()
	var istr = i.toString();
	
	var mainBox = createEl('div',['className',' textBox','contentEditable','false','id',boxType+istr])
	var controlBar = createControlBar(boxType,istr);
	var mainBoxBodyElements = createMainBoxBody(boxType,istr);
	var mainBoxBody = mainBoxBodyElements[0];
	var mainBoxTextarea = mainBoxBodyElements[1];

	appendChildren(mainBox,[controlBar,mainBoxBody,mainBoxTextarea]);
	gEBI('editingSpace').appendChild(mainBox);
	applyJS.mainBox(boxType, istr);
	
	if (boxType=='textBox') mainBoxBody.focus();
}


function findMainBoxNumber() {
	var i=1;
	while (gEBI('textBox'+i.toString()) !=null || 
			gEBI('hiddenTextBoxEditor'+i.toString()) !=null || 
			gEBI('multipleChoiceBox'+i.toString()) !=null || 
			gEBI('freeResponseBox'+i.toString()) !=null) {
		i++;
		//The condition has to check for all main box names
	}
	return i;
}


function createControlBar(boxType,istr) {
	var classname = getMainBoxClassName(boxType);
	
	// Main bar:
	var div1 = createEl('div',['className',classname,'contentEditable','false','id','controlBar'+istr]);
	
	//icons for navigation:
	var div2 = createEl('div',['className',' navIconLeft','id','iconDown'+istr]);
	var img2 = createEl('img',['className',' iconImage','src','/1images/downArrowIcon2.png','id','downArrowIcon'+istr]);
	
	var div3 = createEl('div',['className',' navIconLeft','id','iconUp'+istr]);
	var img3 = createEl('img',['className',' iconImage','src','/1images/upArrowIcon2.png','id','upArrowIcon'+istr]);
	
	var div4 = createEl('div',['className',' navIconLeft','id','iconHtmlTag'+istr]);
	var img4 = createEl('img',['className',' iconImage','src','/1images/html-tags3.png','id','htmlTagIcon'+istr]);
	
	var div5 = createEl('div',['className',' navIconRight','id','iconTrash'+istr]);
	var img5 = createEl('img',['className',' iconImage','src',"/1images/trashIcon.png",'id','trashIcon'+istr]);
	
	
	
	// Assemble:
	appendNextElementsInList([div2,img2, div3,img3, div4,img4, div5,img5, div1,[div2,div3,div4,div5]]);
	
	return div1;
}


function getMainBoxClassName(boxType) {
	var classname = '';
	switch(boxType) {
		case 'textBox':
			classname = ' blueControlBar';
			break;
		case 'hiddenTextBoxEditor':
			classname = ' purpleControlBar';
			break;
		case 'multipleChoiceBox':
			classname = ' greenControlBar';
			break;
		case 'freeResponseBox':
			classname = 'greenControlBar';
			break;
	}
	return classname;
}


function createMainBoxBody(boxType,istr) {
	var div;
	switch(boxType) {
		case 'textBox':
			div = createTextBoxBody(istr);
			break;
		case 'hiddenTextBoxEditor':
			div = createHiddenTextBoxBody(istr);
			break;
		case 'multipleChoiceBox':
			div = createMultipleChoiceBoxBody(istr);
			break;
		case 'freeResponseBox':
			div = createFreeResponseBoxBody(istr);
			break;
	}
	var textarea1 = createEl('textarea',['className','htmlTextarea squishedElement','id','htmlTextarea'+istr]);
	var arr = [div, textarea1];
	return arr;
}


function createTextBoxBody(istr) {
	var div = createEl('div',['className',' textField newLineEditable','id','textField'+istr,'contentEditable','true']);
	return div;
}


function createHiddenTextBoxBody(istr) {
	var div = createEl('div',['className',' textField newLineEditable','id','textField'+istr,'contentEditable','true']);
	
	return div;
}

function createMultipleChoiceBoxBody(istr) {
	var textField = createEl('div',['className',' textField','id','textField'+istr,'contentEditable','false']);
	
	var addButton = createEl('div',['className',' multipleChoiceAddOption','id','multipleChoice'+istr+'AddOption'+'1']);
	
	appendNextElementsInList([textField,addButton]);
	addOption(istr,textField,addButton);
	
	return textField;
}

function addOption(istr,textField,addButton) {
	var ii = 0;
	for (ii=0; ii<textField.childNodes.length; ii++) {
		if (textField.childNodes[ii].id.indexOf('OptionContainer') != -1) {
			ii++;
		}
	}
	var chr = String.fromCharCode(96 + ii).toUpperCase(); // To give the corresponding letter of the alphabet
	//ii+=1; //childNodes counted from 0, but we want to count from 1.
	var iistr = ii.toString();
		
	var div1 = createEl('div',['className',' multipleChoiceOptionContainer','id','multipleChoice'+istr+'OptionContainer'+iistr]);
	
	var div2 = createEl('div',['className',' multipleChoiceRadioContainerEditor','id','multipleChoice'+istr+'RadioContainerEditor'+iistr]);
	var input1 = createEl('input',['type','radio','className',' multipleChoiceRadioButtonEditor','id','multipleChoice'+istr+'RadioButtonEditor'+iistr,
			'name','multipleChoiceRadioGroupEditor'+istr]);
	
	var div3 = createEl('div',['className',' multipleChoiceLabelContainer','id','multipleChoice'+istr+'LabelContainer'+iistr]);
	var div4 = createEl('div',['className',' multipleChoiceLable','id','multipleChoice'+istr+'Lable'+iistr]);
	var text1 = document.createTextNode(chr);
	
	var br1 = createEl('br',['className','clearBothElement']);
	
	var div5 = createEl('div',['className',' multipleChoiceAnswerEditor newLineEditable','id','multipleChoice'+istr+'AnswerEditor'+iistr,
			'contentEditable','true']);
	//setNewLineCapability(div5);
	appendNextElementsInList([div2,input1, div4,text1, div3,div4, div1,[div2,div3,div5,br1]]);
	textField.insertBefore(div1, addButton);
}


function createFreeResponseBoxBody(istr) {
	var textField = createEl('div',['className',' textField','id','textField'+istr,'contentEditable','false']);
	
	var addButton = createEl('div',['className',' freeResponseAddVariable','id','freeResponse'+istr+'AddVariable'+'1']);
	
	var answerContainer = createEl('div',['className',' freeResponseAnswerContainerEditor','id','freeResponseAnswerContainerEditor'+istr]);
	var text1 = document.createTextNode('Answer form (in terms of "var1", "var2", etc):');
	var br1 = createEl('br',[]);
	var answerForm = createEl('input',['type','text','className',' freeResponseAnswerEditor','id','freeResponseAnswerEditor'+istr,
			'placeHolder','Answer']);
	var units = createEl('input',['type','text','className',' freeResponseUnitsEditor','id','freeResponseUnitsEditor'+istr,
			'placeHolder','Units (optional)','size','10']);
	
	appendNextElementsInList([answerContainer,[text1,br1,answerForm,units], textField,[addButton,answerContainer]]);
	
	addFreeResponseVariable(istr,textField,addButton)
	
	return textField;
}


function addFreeResponseVariable(istr,textField,addButton) {
	var listOfVariableContainers = document.getElementsByClassName('freeResponseVariableContainer');
	var ii = listOfVariableContainers.length + 1;
	var iistr = ii.toString();
	
	var div1 = createEl('div',['className',' freeResponseVariableContainer','id','freeResponse'+istr+'VariableContainer'+iistr]);
	var text1 = document.createTextNode('var'+iistr+' range: ');
	var input1 = createEl('input',['type','text','className',' varFromEditor','id','var'+iistr+'FromEditor'+istr]);
	var text2 = document.createTextNode(' to ');
	var input2 = createEl('input',['type','text','className',' varToEditor','id','var'+iistr+'ToEditor'+istr]);
	
	appendNextElementsInList([div1,[text1,input1,text2,input2]]);
	textField.insertBefore(div1, addButton);
}