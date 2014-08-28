function uploadingStatus(istr) {
	var chooseFileButton = gEBI('imageBoxChooseFileButton'+istr);
	var uploadButton = gEBI('imageBoxUploadFileButton'+istr);
	var theForm = gEBI('uploadImageForm'+istr);
	alert(theForm.action);
	if (theForm.action.indexOf("servlet4.php") != -1) {
		saveImage(istr);
		return;
	}
	var imageURL = gEBI('imageBoxPasteImageURL'+istr).value;
	uploadButton.value = 'Uploading...';
	
	var files = chooseFileButton.files;
	var formData = new FormData(theForm);//theForm
	formData.append('theName', 'imageBoxChooseFileButton'+istr);
	if (!imageURL) {
		for (var i = 0; i < files.length; i++) {
			var file = files[i];
			// Check the file type.
			if (!file.type.match('image.*')) {
				continue;
			}

			// Add the file to the request.
			formData.append('imageBoxChooseFileButton'+istr, file, file.name);
		}
	}
	else {
		formData.append('imageURL',imageURL);
	}
	
	//Set up an AJAX request:
	var xhr = new XMLHttpRequest();
	xhr.open('POST', 'servlet3.php', true);
	//xhr.setRequestHeader("Content-type", "multipart/form-data");
	
	// Set up a handler for when the request finishes.
	xhr.onload = function () {
		if (xhr.status === 200) {
			// File(s) uploaded.
			uploadButton.value = 'Upload';
			
			var jsonObj = JSON.parse(xhr.responseText);
			
			if (jsonObj.StoredPath) {
				gEBI('imageBoxEditCurrentImage'+istr).disabled = false;
			}
			if (jsonObj.errorMessage) {
				alert(jsonObj.errorMessage);
				alert(jsonObj.imageType + ' ' + jsonObj.fileSize);
				hideElement(gEBI('imageBoxInputImageName'+istr));
				hideElement(gEBI('imageBoxInputImageDescription'+istr));
				gEBI('imageBoxSaveFileFromURL'+istr).disabled = true;
			} else {
				alert(jsonObj.imageType + ' ' + jsonObj.fileSize);
				var tempPath = jsonObj.StoredPath;
				if (tempPath == 'url') {
					gEBI('imageBoxTempPath'+istr).value = imageURL;
					gEBI('imageBoxPreviewImageEditor'+istr).src = "";
					gEBI('imageBoxPreviewImageEditor'+istr).src = imageURL;
					editImage(imageURL);
					
					hideElement(gEBI('imageBoxInputImageName'+istr));
					hideElement(gEBI('imageBoxInputImageDescription'+istr));
					gEBI('imageBoxSaveFileFromURL'+istr).disabled = true;
				} else {
					gEBI('imageBoxTempPath'+istr).value = tempPath;
					//success.call(null, xhr.responseText);
					gEBI('imageBoxPreviewImageEditor'+istr).src = "";
					gEBI('imageBoxPreviewImageEditor'+istr).src = tempPath;
					
					showElement(gEBI('imageBoxInputImageName'+istr));
					showElement(gEBI('imageBoxInputImageDescription'+istr));
					gEBI('imageBoxSaveFileFromURL'+istr).disabled = false;
				}
			}
		} else {
			// AJAX didn't work
			alert('An error occurred!');
		}
	};
	
	// Send the Data.
	xhr.send(formData);
}

function editImage(imgSrc) {
	var pixlrForm = gEBI('pixlrForm');
	gEBI("pixlrFormImage").value =  imgSrc;
	pixlrForm.submit();
}

function saveImage(istr) {
	var chooseFileButton = gEBI('imageBoxChooseFileButton'+istr);
	var saveButton = gEBI('imageBoxSaveFileFromURL'+istr);
	var theForm = gEBI('uploadImageForm'+istr);
	var tempPath = gEBI('imageBoxTempPath'+istr).value;
	var imageName = gEBI('imageBoxInputImageName'+istr).value;
	var imageDescription = gEBI('imageBoxInputImageDescription'+istr).value;
	saveButton.value = 'Saving...';
	
	var files = chooseFileButton.files;
	var formData = new FormData(theForm);//theForm
	formData.append('theName', 'imageBoxChooseFileButton'+istr);
	formData.append('tempPath', tempPath);
	formData.append('imageName',imageName);
	formData.append('imageDescription',imageDescription);
	
	//Set up an AJAX request:
	var xhr = new XMLHttpRequest();
	xhr.open('POST', 'servlet4.php', true);
	//xhr.setRequestHeader("Content-type", "multipart/form-data");
	
	// Set up a handler for when the request finishes.
	xhr.onload = function () {
		if (xhr.status === 200) {
			// File(s) uploaded.
			saveButton.value = 'Save';
			gEBI('pageName').innerHTML = xhr.responseText;
			
			hideElement(gEBI('imageBoxInputImageName'+istr));
			hideElement(gEBI('imageBoxInputImageDescription'+istr));
			
			gEBI('imageBoxSaveFileFromURL'+istr).disabled = true;
			
			var jsonObj = JSON.parse(xhr.responseText);
			gEBI('pageName').innerHTML = getImagePathFromPID(jsonObj.pid) + tempPath.substring(tempPath.lastIndexOf('.'));
			gEBI('imageBoxPreviewImageEditor'+istr).src = jsonObj.newURL;
			//getImagePathFromPID(jsonObj.pid) + tempPath.substring(tempPath.lastIndexOf('.'))
		} else {
			alert('An error occurred!');
		}
	};
	
	// Send the Data.
	xhr.send(formData);
}

function getImagePathFromPID(pid) {
	var path = '/Images/';
	path += (parseInt(pid) % 1000).toString();
	path += '/';
	path += (parseInt(pid) % 1000000).toString();
	path += '/';
	path += pid;
	return path;
}


function findImage(istr) {
	
	var searchImageInputElement = gEBI('imageBoxSearchImageInput'+istr);
	var searchImageInput = searchImageInputElement.value;
	var theForm = gEBI('imageBoxImageForm'+istr);
	
	var formData = new FormData(theForm);
	formData.append('query', searchImageInput);
	
	//Set up an AJAX request:
	var xhr = new XMLHttpRequest();
	xhr.open('GET', 'find-image.php?query=' + searchImageInput, true);
	//xhr.setRequestHeader("Content-type", "multipart/form-data");
	
	// Set up a handler for when the request finishes.
	xhr.onload = function () {
		if (xhr.status === 200) {
			// File(s) uploaded.
			var imageListContainer = gEBI('imageListContainer'+istr);
			removeChildren(imageListContainer);
			
			//alert(xhr.responseText)
			var jsonObj = JSON.parse(xhr.responseText);
			//alert(jsonObj["9"])
			
			var i=0;
			while (jsonObj[i.toString()]) {
				var listItem = createEl('div',['className','imageListItem','tabindex','-1']);
				var hiddenSrc = createEl('input',['type','hidden','id',istr+'imageListItem'+i.toString()+'PID',
					'value',getImagePathFromPID(jsonObj[i.toString()]["PID"]) + jsonObj[i.toString()]["Type"] ]);
				(function (i) {
					listItem.onclick = function() {
						updateImage(i.toString(),istr);
					};
				})(i);
				var listItemText = document.createTextNode(jsonObj[i.toString()]["Name"]);
				var br1 = createEl('br',[]);
				var itemDescription = createEl('span',['className','imageListItemDescription','id',istr+'imageListItem'+i.toString()+'Description']);
				var itemDescriptionText = document.createTextNode(jsonObj[i.toString()]["Description"]);
				
				appendNextElementsInList([itemDescription,itemDescriptionText, 
					listItem,[listItemText,br1,itemDescription,hiddenSrc], 
					imageListContainer,listItem]);
				i++;
			}
			if (i == 0) {
				hideElement(imageListContainer);
			} else {
				var theChildren = imageListContainer.childNodes;
				var focusGroup2 = [];
				for (var n=0; n<theChildren.length; n++) focusGroup2.push(theChildren[n]);
				focusGroup2.push(imageListContainer);
				createFocusGroup([searchImageInputElement],focusGroup2);
				showElement(imageListContainer);
			}
			//alert(htmlStr);
			//getImagePathFromPID(jsonObj.pid) + tempPath.substring(tempPath.lastIndexOf('.'))
		} else {
			alert('An error occurred!');
		}
	};
	
	// Send the Data.
	xhr.send(formData);
}


function removeChildren(el) {
	var list = getAllThoseChildren(el);
	for (var i=0; i<list.length; i++) {
		list[i].parentNode.removeChild(list[i]);
	}
}


function updateImage(listNumber,imageBoxNumber) {
	var newCaption = gEBI(imageBoxNumber+'imageListItem'+listNumber+'Description').innerHTML;
	var capt = gEBI('imageBoxImageCaptionInput'+imageBoxNumber).value = newCaption;
	var newSrc = gEBI(imageBoxNumber+'imageListItem'+listNumber+'PID').value;
	var img = gEBI('imageBoxPreviewImageEditor'+imageBoxNumber);
	img.src = "";
	img.src = newSrc;
}



function submitTheForm(istr) {
	gEBI('theForm').submit();
}

function stopDefAction(evt){
	evt.preventDefault();
}

function submitFormWithAction(f,a,event) {
	f.action = a;
	f.onsubmit(event);
	event.preventDefault();
}


function requestAjaxBidness() {
	
}


function replaceAllInstancesOf(string,str1,str2) {
	while (string.indexOf(str1) != -1) {
		var index = string.indexOf(str1);
		string = string.substring(0,index) + str2 + string.substring(index + str1.length);
	}
	return string;
}

function switchClassNameOnOff(el,classname) {
	if (!classname && el.length) {
		if(el.length % 2 == 0) {
			for(var i=0; i<el.length; i+=2) {
				switchClassNameOnOff(el[i],el[i+1]);
			}
		}
	} else {
		if (classname.charAt(0) != ' ') classname = ' ' + classname;
		if (typeof el == 'string') el = gEBI(el);
		if (el.className.indexOf(classname) == -1) {
			el.className += classname;
		} else {
			el.className = replaceAllInstancesOf(el.className,classname,'');
		}
	}
}

function toggleClassOnGroupOffGroup(els1,classnames1,els2,classnames2) {
	// This function will apply a classname1 to everything in els1 and take classname2 away from everything in els2
	// This assumes that all inputs are arrays
	for (var i=0; i<els1.length; i++) {
		els1[i] = gEBI(els1[i]);
		for (var ii=0; ii<classnames1.length; ii++) {
			// Make sure classnames1[ii] starts with a space, then add it to els1[i].className
			classnames1[ii] = prepClassName(classnames1[ii]);
			els1[i].className += classnames1[ii];
		}
	}
	
	if (!els2) return;
	
	if (!classnames2) {
		for (var i=0; i<els2.length; i++) {
			els2[i] = gEBI(els2[i]);
			for (var ii=0; ii<classnames1.length; ii++) {
				// Take classnames1[ii] away from els2[i].className
				els2[i].className = replaceAllInstancesOf(els2[i].className,classnames1[ii],'');
			}
		}
	}
	else {
		for (var i=0; i<els2.length; i++) {
				els2[i] = gEBI(els2[i]);
			for (var ii=0; ii<classnames2.length; ii++) {
				// Take classnames2[ii] away from els2[i].className
				els2[i].className = replaceAllInstancesOf(els2[i].className,classnames2[ii],'');
			}
		}
	}
}
	
function prepClassName(classname) {
	if (classname && classname.charAt(0) != ' ') classname = ' ' + classname;
	return classname;
}

function swapClassName(el,oldClassName,newClassName) {
	if (typeof el == 'string') el = gEBI(el);
	oldClassName = prepClassName(oldClassName);
	newClassName = prepClassName(newClassName);
	// First, replace all oldClassName strings with newClassName strings:
	el.className = replaceAllInstancesOf(el.className,oldClassName,newClassName);
	// Then, get rid of all newClassName strings:
	if (el.className.split("newClassName").length - 1 > 1) {
		el.className = replaceAllInstancesOf(el.className,newClassName,'');
	}
	// Now add just one newClassName string:
	if (el.className.indexOf(newClassName) == -1) el.className += newClassName;
	
}

function changeMeShtyles(styleNames) { //Only takes arrays
	if (typeof styleNames != 'string') {
		if (styleNames.length > 1) {
			var styleSheets = document.getElementsByTagName('link');
			for (var i=0; i<styleSheets.length; i++) {
				if (!styleSheets[i].href) {
					styleSheets.splice(i,1);
					i--;
				}
			}
			for (var ii=0; ii<styleSheets.length; ii++) {
				for (var i=0; i<styleNames.length; i++) {
					if (styleSheets[ii].href.substring(styleSheets[ii].href.lastIndexOf('/')+1) == styleNames[i]) { //Find the existing style sheet
						//setTimeout( function() {
							styleSheets[ii].parentNode.removeChild(styleSheets[ii]);
						//}, 1000);
						var nextSheetNumber = i+1;
							if (nextSheetNumber==styleNames.length) {
								nextSheetNumber = 0;
							}
						
						var newSheet = createEl('link',['type','text/css','rel','stylesheet','href',styleNames[nextSheetNumber]]);
						var theHead = document.getElementsByTagName('head')[0];
						theHead.insertBefore(newSheet,theHead.firstChild); 
						
						
						return;
					}
				}
			}
			// This should run if there are no style sheets like this already:
			var newSheet = createEl('link',['type','text/css','rel','stylesheet','href',styleNames[0]]);
			var theHead = document.getElementsByTagName('head')[0];
			theHead.appendChild(newSheet);
			theHead.insertBefore(newSheet,theHead.firstChild); 
		}
	} else {// I'll write it later
		return;
	}
}

function gEBI(el) {
	if (typeof el == "string") {
		el = document.getElementById(el);
	}
	return el;
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

function gEBT(n,i) {
	if (typeof i == 'undefined') i=0;
	n = document.getElementsByTagName(n)[i];
	return(n);
}

function hhmmssToSeconds(timeInput) {//Takes a string or float and returns a float
	var timeArray=timeInput.split(':');
	var totalSeconds;
	for (var i=0; i<timeArray.length; i++) {
		timeArray[i] = parseFloat(timeArray[i]);
	}
	switch (timeArray.length) {
		case 0: {
		alert(timeInput + " is blank.");
		break;
		}
		case 1: {
		totalSeconds = timeArray[0];
		break;
		}
		case 2: {
		totalSeconds = timeArray[0]*60 + timeArray[1];
		//alert("Total seconds = 60*"+timeArray[0].toString()+" + "+timeArray[1].toString()+" = "+
		//	totalSeconds.toString());
		break;
		}
		case 3: {
		totalSeconds = timeArray[0]*60*60 + timeArray[1]*60 + timeArray[2];
		break;
		}
	}
	return totalSeconds;
}


function insertNodeAtCursor(node) {
    var range, html;
    if (window.getSelection && window.getSelection().getRangeAt) {
		sel = window.getSelection();
        range = sel.getRangeAt(0);
		var selectedText = range.toString();
		//range.deleteContents();
		range.insertNode(node);
		//Put the cursor after:
		range.setEndAfter(node);
		range.setStartAfter(node);
		sel.removeAllRanges();
		sel.addRange(range);
    } else if (document.selection && document.selection.createRange) {
		var sel = document.selection;
        range = sel.createRange();
        html = (node.nodeType == 3) ? node.data : node.outerHTML;
        range.pasteHTML(html);
		//Put the cursor after:
		/*range.setStartAfter(node);
		range.setEndAfter(node); 
		sel.removeAllRanges();
		sel.addRange(range);*/
		
    }
} 


function checkIfContentEditable() {
	testSpan1=document.createElement('span');
	insertNodeAtCursor(testSpan1);
	var theResult;
	theResult = checkIfAncestorIsContentEditable(testSpan1);
	removeTestSpan(testSpan1);
	return theResult;
}

function checkIfAncestorIsContentEditable(el) {
	//jj++;
	if (el.parentNode.contentEditable == "false" || el.parentNode.id == "loginAndTools") {
		var rtrn = 'nopes';
		return rtrn;
	} else if (el.parentNode.contentEditable == "true") {
		var rtrn = '';
		return rtrn;
	} else if (el.parentNode.contentEditable == null || "" || "inherit") {
		// We want it to climb recursively until one of the other conditions is met.
		el = el.parentNode;
		var theResult;
		theResult = checkIfAncestorIsContentEditable(el);
		return theResult;
	}
}

function checkIfNewLineCapable() {
	var theResult;
	var testSpan1=document.createElement('span');
	insertNodeAtCursor(testSpan1);
	if (testSpan1.parentNode.className.indexOf('newLineEditable') == -1) theResult = 'nopes';
	removeTestSpan(testSpan1);
	return theResult;
}

function checkIfContentEditableAndNewLineCapable() {
	var theResultEditable = checkIfContentEditable();
	var theResultLineable = checkIfNewLineCapable();
	var theResult;
	if (theResultEditable == 'nopes' || theResultLineable == 'nopes') {
		theResult = 'nopes';
	} else {
		theResult == '';
	}
	return theResult;
}




function removeTestSpan(testSpan1) {
	//document.getElementById('pageName').innerHTML = "why is this code running...";
	// In case there are contents inside:
	while (testSpan1.childNodes.length > 0) {
		testSpan1.parentNode.insertBefore(testSpan1.childNodes[testSpan1.childNodes.length-1], testSpan1.nextSibling);
		//that puts each node right after the inline element.
	}
	testSpan1.parentNode.removeChild(testSpan1);
}


function appendChildren(newParent,args) {
	for (var i=0; i<args.length; i++) {
		newParent.appendChild(args[i]);
	}
}

function appendNextElementsInList(args) {//[parent,child/children, etc...
	for (var i=0; i<args.length; i+=2) {
		if (args[i+1].length != undefined) { // need to make sure it is a list of elements, but it still could be a text node
			if (args[i+1].nodeType != 3) {
				appendChildren(args[i],args[i+1]);
			} else {
				args[i].appendChild(args[i+1]); // <- for text nodes; the problem here is that both text nodes and [el,el2] are // objects, and they both have lengths.
			}
		} else {
			args[i].appendChild(args[i+1]);
		}
	}
}

function createEl(tagName,args) { //args = [attribute,value, etc...]
	var el = document.createElement(tagName);
	if (args) {
		for (var i=0; i<args.length; i+=2) {
			var str = args[i+1];
			switch(args[i]) {
				case 'allowFullScreen':
				case 'type':
				case 'name':
				case 'size':
				case 'placeHolder':
				case 'title':
				case 'tabindex':
				case 'href':
				case 'rel':
				case 'action':
				case 'method':
				case 'enctype':
				case 'target':
					el.setAttribute(args[i],str);
					break;
				case 'className':
					el.className += str;
					break;
				case 'id':
					el.id = str;
					break;
				case 'contentEditable':
					el.setAttribute(args[i],stringToBoolean(str));// 'contentEditable','true' or 'false'
					if (stringToBoolean(str)) {// for contentEditable elements, we can check this thing
						setNewLineCapability(el);
						setPostPasteFunction(el);
					}
					break;
				case 'src':
					el.src = str;
					break;
				case 'value':
					el.value = str;
					break;
				case 'style':
					el.style.cssText = str;
					break;
				case 'checked':
					el.checked = stringToBoolean(str);
					break;
				case 'disabled':
					el.disabled = stringToBoolean(str);
					break;
					//el.placeHolder = str;
					//break;
				case 'onclick':
					el.onclick = str;
					break;
				case 'childNode':
					el.appendChild(appenders[str]);
					break;
				case 'innerHTML':
					el.innerHTML = str;
					break;
			}
		}
	}
	return el;
}


function createEls(tagName,n,args) {
	var els = [];
	for (var i=0; i<n; i++) {
		els.push(createEl(tagName,args));
	}
	return els;
}


function createText(str) {
	return document.createTextNode(str);
}


function createTexts(strs) {
	var texts = [];
	if (typeof strs != "string") {
		for (var i=0; i<strs.length; i++) {
			texts.push(createText(strs[i]));
		}
	} else {
		texts.push(createText(strs));
	}
	return texts;
}


function appendEach(args1, args2) {
	if (typeof args1 == "string" || typeof args2 == "string") {
		return "Incorrect inputs";
	}
	if (args1.length != args2.length) {
		return "Input arrays must be the same length";
	}
	for (var i=0; i<args1.length; i++) {
		if (!args2[i].length || args2[i].nodeType == 3) {
			args1[i].appendChild(args2[i]);
		} else {
			appendChildren(args1[i],args2[i]);
		}
	}
}


function stringToBoolean(string){
	switch(string.toLowerCase()){
		case "true": case "yes": case "1": return true;
		case "false": case "no": case "0": case null: return false;
		default: return false;
	}
}

function booleanToString(bools){
	switch(bools){
		case true: return "true";
		case false: return "false";
		default: return "true";
	}
}


function setNewLineCapability(el) {
	if (typeof el == 'string') {
		el = document.getElementById(el);
	}
	el.focus();
	el.onkeydown = function (event) {//This needs to be done for all contentEditable things.
		if (event.which == 13 || event.keyCode == 13) {
			//code to execute here
			if (!this.lastChild || this.lastChild.nodeName.toLowerCase() != ("br" || "ol" || "ul" || "li")) {
				this.appendChild(document.createElement("br"));
			}
			var br1 = document.createElement('br');
			insertNodeAtCursor(br1);
			if (br1.parentNode.tagName == 'LI') {
				//this.appendChild(document.createTextNode("ha"));
				br1.parentNode.removeChild(br1);
				
				/* if (event.stopPropagation) {//Necessary; keeps onKeypress to only this element
				event.stopPropagation();
				} else { // Older IE.
					event.cancelBubble = true;
				} */
				return true;
			}
			
			// Check className for permission
			if (el.className.indexOf('newLineEditable') == -1) {
				br1.parentNode.removeChild(br1);
			} 
			
			if (event.stopPropagation) {//Necessary; keeps onKeypress to only this element
				event.stopPropagation();
			} else { // Older IE.
				event.cancelBubble = true;
			}
			
			return false; //Necessary to block contentEditable settings
		}
		return true;
	};
	el.onkeyup = function (event) {//This is to get rid of <DIV><BR></DIV> arrangements, in case some random thing causes it
	if (event.which == 13 || event.which == 8 || event.keyCode == 13 || event.which == 8) {
			var elList = el.childNodes;
			for (var i=0; i<elList.length; i++) {
				if (elList[i].firstChild) {
					//remove the element if its only child is a <BR>
					if (elList[i].tagName == "DIV" && elList[i].childNodes.length == 1 && elList[i].firstChild.tagName == 'BR') {
						elList[i].removeChild(elList[i].firstChild);
						el.removeChild(elList[i]);
						//at this point, the cursor doesn't know exactly where to appear, though it is in the right place...
						var br1 = createEl('br');
						insertNodeAtCursor(br1);
						br1.parentNode.removeChild(br1);
					}
				}
				/* //now remove all nodes that have been copy-pasted with styles
				if (el.childNodes[i].nodeType == 1) {
					if (el.childNodes[i].style.cssText) {
						el.removeChild(el.childNodes[i]);
					}
				} */
			}
			return false;
		}
		return true;
	};
}


function setPostPasteFunction(el) {
	if (typeof el == 'string') {
		el = document.getElementById(el);
	}
	el.onpaste = function(event) {
		if (document.activeElement.tagName != 'INPUT') {
			
			document.getElementById('pageName').innerHTML = document.activeElement.tagName;
			setTimeout( function() {
				var allTheChildren = getAllThoseChildren(el);
				var styledElements = [];
				for (var t=0; t<allTheChildren.length; t++) {
					if (allTheChildren[t].nodeType == 1) {
						
						if(allTheChildren[t].style.cssText) {
							styledElements.push(allTheChildren[t]);
						}
					}
				}
				var pastedHTML = ['']; //length = 1
				var isBR = 0; // When a break is detected, we make pastedHTML longer.
				//document.getElementById('pageName').innerHTML += styledElements.length.toString();
				for (var t=0; t<styledElements.length; t++) {
					for (var tt=0; tt<styledElements[t].childNodes.length; tt++) {
						if (styledElements[t].childNodes[tt].nodeType == 3) {
							var newHTML = styledElements[t].childNodes[tt].nodeValue;
							if (isBR) {
								pastedHTML.push(newHTML);
							} else {
								pastedHTML[pastedHTML.length -1] += newHTML;
							}
							isBR = 0;
						}
					}
					if (styledElements[t].nodeType == 1) {
							document.getElementById('pageName').innerHTML += 'br';
						if (styledElements[t].tagName == 'BR') {
							if (el.className.indexOf('newLineEditable') != -1) {
								if (isBR) pastedHTML.push('');
								isBR = 1;
							}
						}
					}
				}
				var stillThere = 0;
				if (styledElements.length > 0) {
					while (stillThere == 0) { // Cycle the list until all are removed, starting from the bottom.
						for (var t=0; t<styledElements.length; t++) {
							if (styledElements[t]) { // if its a remaining node
								if (styledElements[t] != 0) {
									styledElements[t].parentNode.removeChild(styledElements[t]);
									styledElements[t] = 0;
								}
							}
							if (styledElements[t]) {
								stillThere = 0;
							} else {
								stillThere = 1;
							}
						}
					}
				}
				//setTimeout( function() {
				//document.getElementById('pageName').innerHTML = pastedHTML;
				for (var i=0; i<pastedHTML.length-1; i++) {
					var newPastedText = document.createTextNode(pastedHTML[i]);
					insertNodeAtCursor(newPastedText);
					var br = createEl('BR',[]);
					insertNodeAtCursor(br);
				}
				var newPastedText = document.createTextNode(pastedHTML[pastedHTML.length-1]);
				insertNodeAtCursor(newPastedText);
				//},1000);
			}, 0); 
		}
		/*
		setTimeout( function() { // 1 layer iteration for pasted elements inside el
			for (var i=0; i<el.childNodes.length; i++) {
				
				if (el.childNodes[i].nodeType == 1) {
					document.getElementById('pageName').innerHTML += 'Paste';
					if (el.childNodes[i].style.cssText) {
						var richSpan = el.childNodes[i];
						//document.getElementById('pageName').innerHTML = richSpan.tagName;
						while (richSpan.childNodes.length > 0) {
							richSpan.parentNode.insertBefore(richSpan.childNodes[richSpan.childNodes.length-1], richSpan.nextSibling);
						}
						el.removeChild(el.childNodes[i]);
					}
				}
			}
		}, 0); */
		/* setTimeout( function(){ 
			var testSpan1 = createEl('span',[]);
			insertNodeAtCursor(testSpan1);// To the end of the browser event queue; let the other onPaste event happen first
			if (testSpan1.parentNode.tagName == 'SPAN') {
				if (testSpan1.parentNode.style.cssText) { // If it has inLine CSS going on
					document.getElementById('pageName').innerHTML += testSpan1.parentNode.style.cssText;
					// More than plain text was copied; take contents out.
					var richSpan = testSpan1.parentNode;
					//document.getElementById('pageName').innerHTML = richSpan.tagName;
					while (richSpan.childNodes.length > 0) {
						richSpan.parentNode.insertBefore(richSpan.childNodes[richSpan.childNodes.length-1], richSpan.nextSibling);
					}
					richSpan.parentNode.removeChild(richSpan);
				}
			}
			testSpan1.parentNode.removeChild(testSpan1);
		}, 0); */ // To the end of the browser event queue; let the other onPaste event happen first
		
		if (event.stopPropagation) {//Necessary; keeps onPaste to only this element
			event.stopPropagation();
		} else { // Older IE.
			event.cancelBubble = true;
		}
		
		return true;
	}; 
}


function capitaliseFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}


function hideElement(el,toggle) {
	if (typeof el == 'string') el = gEBI(el);
	var classname = el.className;
	if (toggle) {
		switchClassNameOnOff(el,' visibleElement');
	} else {
		el.className = replaceAllInstancesOf(classname,' visibleElement','');
	}
}


function showElement(el) {
	if (typeof el == 'string') el = gEBI(el);
	if (el.className.indexOf('visibleElement') == -1) {
		el.className += ' visibleElement';
	}
}


function randomRange(small,big,sigFigs) {// Returns string if sigFigs != undefined
	if (typeof small == "string") small = parseFloat(small);
	if (typeof big == "string") big = parseFloat(big);
	var random1 = parseFloat(Math.random());
	// Apply range
	random1 = random1*(big-small)+small;
	// Apply sigFigs
	if (sigFigs) random1 = applySigFigs(random1,sigFigs);
	return random1;
}

function applySigFigs(r,sigFigs) {
	if (typeof r != "string") r=r.toString();
	var randomStr = r.toString();
	var decimalPoint = randomStr.indexOf('.');
	if (decimalPoint != -1) {
		if (randomStr.charAt(0) == "0") {
			var i=0; // this will represent the number of 0's after the decimal point.
			while (randomStr.charAt(i+2) == "0") {
				i++;
			}
			document.getElementById('pageName').innerHTML = i.toString();
			r = Math.round(r*Math.pow(10,i+sigFigs))/(Math.pow(10,i+sigFigs));
		} else if (decimalPoint > 3) {
			r = Math.round(r/Math.pow(10,decimalPoint-3))*(Math.pow(10,decimalPoint-3));
		}  else if (decimalPoint <= 4) { //This is handled separately because multiplying by 10^-# has rounding errors
			r = Math.round(r*Math.pow(10,3-decimalPoint))/(Math.pow(10,3-decimalPoint));
		}
	} else if (decimalPoint == -1) {
	}
	return r;
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


function getAllThoseChildren(mainContainerNode) {
	var descendants = [];
	var node = mainContainerNode.childNodes[0];
	if (mainContainerNode.hasChildNodes()){
	//document.getElementById('pageName').innerHTML = mainContainerNode.childNodes[4].previousSibling.id;
	}
	//if (node == null) document.getElementById('pageName').innerHTML = "already null";
    while(node != null && node.previousSibling != mainContainerNode) {
        if(node.nodeType == 3 || 1) { /* Fixed a bug here. Thanks @theazureshadow */
            descendants.push(node);//.nodeValue
        }
		
		//testNumber++;
		//if (node.id == 'textBox2') document.getElementById('pageName').innerHTML = testNumber.toString();
		//if (testNumber == 58) document.getElementById('pageName').innerHTML = node.parentNode.id;
		
        if(node.hasChildNodes()) {
			//document.getElementById('pageName').innerHTML = "has a child";
            node = node.firstChild;
        }
        else {
			
			//previewText.innerHTML = node.parentNode.innerHTML;
			if (node == null) node = node.parentNode;
			
            while(node.nextSibling == null && node != mainContainerNode) {
                node = node.parentNode;
            }
            node = node.nextSibling;
        }
    }
	return descendants;
}

function disableIfEmpty(ID,button1) {
	if (!gEBI(ID).value) {
		gEBI(button1).disabled=true;
	} else {
		gEBI(button1).disabled=false;
	}
}

function selectThisListItem(el) {
	var listContainer = el.parentNode;
	var siblings = listContainer.childNodes;
	for (var i=0; i<siblings.length; i++) {
		swapClassName(siblings[i],'selectedListItem','');
	}
	el.className += ' selectedListItem';
}


function getNumberAtStringEnd(str) {
	var i = str.length;
	while (!isNaN(str.charAt(i-1))) {
		i--;
	}
	return str.substring(i);
}


function otherString(str, strs) {
	if (str == strs[0]) {
		str = strs[1];
	} else if (str == strs[1]) {
		str = strs[0];
	} else {
		str = "";
	}
	return str;
}
	
	
	
	
	
	
	
	
	
	