function checkMultipleChoiceAnswer(theNumber) {
	var correctChoice = document.getElementById('multipleChoice'+theNumber+'CorrectAnswer').value;
	var answerResult = 'Incorrect';
	var radioGroup = document.getElementsByName('multipleChoiceRadioGroup'+theNumber);
	var answerDisplay = document.getElementById('multipleChoiceAnswerResultDisplay'+theNumber);
	
	for (var i=0; i<radioGroup.length; i++) {
		if (radioGroup[i].checked && i.toString() == correctChoice) {
			answerResult = 'Correct';
			swapClassName(answerDisplay,'multipleChoiceDisplayIncorrect','multipleChoiceDisplayCorrect');
		}
	}
	if (answerResult != 'Correct') {
		swapClassName(answerDisplay,'multipleChoiceDisplayCorrect','multipleChoiceDisplayIncorrect');
	}
	answerDisplay.innerHTML = answerResult;
}

function checkFreeResponseAnswer(theNumber) {
	var varValues = getVariableValuesObject();
	var attemptString = document.getElementById('freeResponseAttempt'+theNumber).value;
	var attempt = parseFloat(attemptString);//Parser.evaluate( attemptString, varValues);
	var answerString = document.getElementById('freeResponseAnswer'+theNumber).value;
	var answer = Parser.evaluate( answerString, varValues);
	var answerDisplay = document.getElementById('freeResponseResult'+theNumber);
	//document.getElementById('pageName').innerHTML = varValues.var1;
	var result = document.getElementById('freeResponseResult'+theNumber);
	var offBy = Math.abs((attempt-answer))/answer;
	if (offBy < .005) {
		result.innerHTML = 'Correct';
		swapClassName(answerDisplay,'freeResponseDisplayIncorrect','freeResponseDisplayCorrect');
	} else {
		result.innerHTML = 'Incorrect';
		swapClassName(answerDisplay,'freeResponseDisplayCorrect','freeResponseDisplayIncorrect');
	}
}

function getVariableValuesObject() {
	var varValueList = document.getElementsByClassName('varValue');
	var varValues = {};
	for (var i=0; i<varValueList.length; i++) {
		var vari = 'var'+(i+1).toString();
		varValues[vari] = varValueList[i].value;
	}
	return varValues;
}

function generateRandomVariablesAndTypeSet() {
	var variableList = [];
	var varFromList = document.getElementsByClassName('varFrom');
	var varToList = document.getElementsByClassName('varTo');
	var lessonPreviewText = document.getElementById('lessonPreviewBody').innerHTML;//varValue
	for (var i=0; i<varToList.length; i++) {
		var randomVarValue = randomRange(varFromList[i].value,varToList[i].value,3).toString();
		document.getElementById('varValue'+i.toString()).value = randomVarValue;
		var replaceThisString = 'var'+(i+1).toString();
		//document.getElementById('pageName').innerHTML = randomVarValue;
		var rege1 = new RegExp(replaceThisString, 'g');
		lessonPreviewText = lessonPreviewText.replace(rege1, randomVarValue);
	}
	document.getElementById('lessonPreviewBody').innerHTML = lessonPreviewText;
	focusOnAllTextInputs();// If a new text input hasn't been focused on after MathJax finishes, 
	// you lose the ability to type in it for some reason. ?????????????????
	MathJax.Hub.Queue(["Typeset",MathJax.Hub]); 
}

function focusOnAllTextInputs() {
	if (document.getElementsByClassName('freeResponseAttempt').length > 0) {
		var textInputPreviewList = document.getElementsByClassName('freeResponseAttempt');
		for (var i=0; i<textInputPreviewList.length; i++) {
			textInputPreviewList[i].focus();
		}
		textInputPreviewList[0].focus();
	}
}