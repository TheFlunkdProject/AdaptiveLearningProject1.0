// All other functions are used within the applyJS object.

function applyAllJS(container) {

	if (!container) container = 'editingSpace';
	if (typeof container == "string") container = gEBI(container);
	
	
	var spans = container.getElementsByTagName('span');
		inputs = container.getElementsByTagName('input');
		divs = container.getElementsByTagName('div');
	
	for (var i=0; i<divs.length; i++) {
		if (divs[i].contentEditable) {
			setNewLineCapability(divs[i]);
			setPostPasteFunction(divs[i]);
		}
	}
	
	for (var i=0; i<spans.length; i++) {
		if (spans[i].contentEditable) {
			setNewLineCapability(spans[i]);
			setPostPasteFunction(spans[i]);
		}
	}

	
	// Inline elements:
	var inlineElements = [];
	for (var i=0; i<spans.length; i++) {
		if (spans[i].id && spans[i].id.indexOf('TriggerText') != -1) {
			var thisID = spans[i].id;
			
			var istr = thisID.substring(thisID.indexOf('TriggerText') + 'TriggerText'.length);
			var inlineType = thisID.substring(0, thisID.indexOf('TriggerText'));
			inlineElements.push([istr , inlineType]);
		}
	}
	
	for (var i=0; i<inlineElements.length; i++) {
		applyJS.inlineElementEditor(inlineElements[i][1], inlineElements[i][0]);
	}
	
	
	// Equations
	var equations = [];
	for (var i=0; i<inputs.length; i++) {
		if (inputs[i].id && inputs[i].id.indexOf('equationInput') != -1) {
			var thisID = inputs[i].id;
			
			var istr = thisID.substring(thisID.indexOf('equationInput') + 'equationInput'.length);
			equations.push(istr);
		}
	}
	
	for (var i=0; i<equations.length; i++) {
		applyJS.equationEditor(equations[i]);
	}
	
	
	// Inner blocks:
	var innerBlocks = [];
	var imageVideoRegex = /.*(video|image)Box([1-9]+)/;
	for (var i=0; i<divs.length; i++) {
		if (divs[i].id) {
			var thisID = divs[i].id.match(imageVideoRegex);
			if (thisID) {
				innerBlocks.push([thisID[1] , thisID[2]]);
			}
		}
	}
	
	for (var i=0; i<innerBlocks.length; i++) {
		applyJS.innerBoxEditor(innerBlocks[i][0] + 'Box', innerBlocks[i][1]);
	}
	
	
	// Main Blocks
	var mainBlocks = [];
	var mainBoxRegex = /.*(textBox|hiddenTextBoxEditor|freeResponseBox|multipleChoiceBox)([1-9]+)/;
	// Either the container is the editing space, or it is "textField#", in which case we need the main block to get its type.
	if (container == gEBI('editingSpace')) {
		for (var i=0; i<divs.length; i++) {
			if (divs[i].id) {
				var thisID = divs[i].id.match(mainBoxRegex);
				if (thisID) {
					mainBlocks.push([thisID[1] , thisID[2]]);
				}
			}
		}
	} else {
		var thisID = container.parentNode.id.match(mainBoxRegex);
		if (thisID) {
			mainBlocks.push([thisID[1] , thisID[2]]);
		}
	}
	
	for (var i=0; i<mainBlocks.length; i++) {
		applyJS.mainBox(mainBlocks[i][0], mainBlocks[i][1]);
	}
	
	
}

var applyJS = {
	// Course and topic list item results:
	
	courseOrTopicSelected : function(courseOrTopic, searchOrContext) {
		alert(courseOrTopic);
		// If this function is applied to course context list item, it will create a list of topics when clicked on
		// which will point back to the course list. Likewise for a topic context list item.
		if (searchOrContext == "context") {
			if (courseOrTopic == "Topic") {
				courseOrTopic = "Course";
			} else if (courseOrTopic == "Course") {
				courseOrTopic = "Topic";
			}
		}
		
		var list = getCourseOrTopicListChildren(courseOrTopic, searchOrContext);
		
			
		for (var i=0; i<list.length; i++) {
			if (list[i].nodeType == 1 && list[i].id.indexOf('Section') == -1) {
				list[i].onclick = function() {
					updateSelecedTopicOrCourseInfo(this, courseOrTopic);
					selectThisListItem(this);
					hideElement(this.parentNode);
				};
			}
		}
	},

	// In-line elements:
	triggerTextEditor : function (istr) {
		gEBI('triggerTextEditor'+istr).onfocus = function() {
			gEBI('hiddenTextBoxEditor'+istr).className += ' hiddenTextBoxEditorHighlighted';
		};
		gEBI('triggerTextEditor'+istr).onblur = function() {
			switchClassNameOnOff('hiddenTextBoxEditor'+istr,' hiddenTextBoxEditorHighlighted');
		};
	},

	inlineElementEditor : function (eType, istr) {
		
		eTypeTriggerTextApplyJS(eType, istr);
		eTypeTextApplyJS(eType, istr);
		inlineTrashIconApplyJS(eType, istr);
	},
	
	equationEditor : function (istr) {
		equationInputGroupApplyJS(istr);
		inlineTrashIconApplyJS('equation',istr);
	},
	
	
	// innerBlock elements :
	innerBoxEditor : function (innerBox, istr) {
	
		// They all have the same control bar:
		innerBoxTrashIconApplyJS(innerBox, istr);
		
		switch (innerBox) {
			case 'videoBox':
				for(var prop in applyVideoBoxJS){
					applyVideoBoxJS[prop](istr);
				}
				break;
			case 'imageBox':
				for(var prop in applyImageBoxJS){
					applyImageBoxJS[prop](istr);
				}
				break;
		}
	},
	
	
	// Main Blocks:
	mainBox : function (boxType, istr) {
	
		var conBar = mainBoxJS.controlBarJS;
		for (var prop in conBar) {
			conBar[prop](istr, boxType);
		}
		
		var texFi = mainBoxJS.textFieldJS;
		switch (boxType) {
			case 'textBox':
				// No special JS here. Only the control bar.
				break;
			case 'hiddenTextBoxEditor':
				texFi.hiddenTextFieldApplyJS(istr);
				this.triggerTextEditor(istr);
				break;
			case 'multipleChoiceBox':
				texFi.multipleChoiceAddOptionApplyJS(istr);
				break;
			case 'freeResponseBox':
				texFi.freeResponseAddVariableApplyJS(istr);
				break;
		}
		
	}

}




function eTypeTriggerTextApplyJS(eType, istr) {
	var ID = eType+'TriggerText'+istr;
	var eTriggerText = gEBI(ID);
	
	eTriggerText.onfocus=function() {showElement(eType+'Box'+istr);};
	
	eTriggerText.onblur=function() {
		setTimeout(function() {
			if (document.activeElement != document.getElementById(eType+'Text'+istr)) {
				hideElement(eType+'Box'+istr);
			}
		}, 10);
	};
}


function eTypeTextApplyJS(eType, istr) {
	var eText = gEBI(eType+'Text'+istr);
	eText.onfocus=function() {showElement(this.parentNode)};
	eText.onblur=function() {hideElement(this.parentNode)};
	eText.oninput=function() {
		if(this.value.length>8) {
		this.size=this.value.length+1;
		} else {
		this.size=8;
		}
	};
}


function inlineTrashIconApplyJS(eType, istr) {
	var inlineIconRight = gEBI(eType+'IconTrash'+istr);
	inlineIconRight.onclick=function() {
		closeInlineElement(istr,eType);
	};
}


function equationInputGroupApplyJS(istr) {
	var equationInput = gEBI('equationInput'+istr);
	var equationPreviewBox = gEBI('equationPreviewBox'+istr);
	var equationPreview = gEBI('equationPreview'+istr);
	var importantEquationCheckbox = gEBI('importantEquationCheckbox' + istr);
	
	function updateEquationPreview(eqIn, eqPr) {
		//Resize and display equation:
		if (eqIn.value.length>2) {
			eqIn.size=eqIn.value.length+1;
			}
			else {
			eqIn.size=2;
			}
		eqPr.innerHTML="$($"+eqIn.value + "$)$";
		MathJax.Hub.Queue(["Typeset",MathJax.Hub]);
	}
	// Execute to begin with:
	updateEquationPreview(equationInput, equationPreview);
	
	equationInput.oninput=function() {
		updateEquationPreview(equationInput, equationPreview);
	};
	
	createFocusGroup([equationInput],[equationPreviewBox,importantEquationCheckbox]);
	
	importantEquationCheckbox.onclick= function(event) {event.stopPropagation();};
	setCheckOrUncheckFunction(equationPreviewBox,importantEquationCheckbox);
}

// ========== inner Boxes =========================
function innerBoxTrashIconApplyJS(innerBox, istr) {
	var inlineIconRight = gEBI(innerBox+'IconTrash'+istr);
	inlineIconRight.onclick=function() {
		closeInnerBox(istr,innerBox);
	};
}



// VIDEO
var applyVideoBoxJS = {
	
	videoUrlButtonApplyJS : function (istr) {
		var videoUrlButton = gEBI('videoUrlButton'+istr);
		videoUrlButton.onclick = function() {
			applyUrl(istr);
		};
	},

	videoTimesButtonApplyJS : function (istr) {
		var videoTimesButton = gEBI('videoTimesButton'+istr);
		videoTimesButton.onclick = function() {
			applyVideoTimes(istr);
		};
	}
}



// IMAGE
var applyImageBoxJS = {

	createNewImageButtonApplyJS : function (istr) {
		var createNewImageButton = gEBI('imageBoxCreateNewImageButton'+istr);
		createNewImageButton.onclick = function() {
			editImage('http://switchlearn.com/upload/new/800x600.jpg');
		};
	},

	loadImageButtonApplyJS : function (istr) {
		var loadImageButton = gEBI('imageBoxLoadImageButton'+istr);
		loadImageButton.onclick = function() {
			showElement('imageBoxImageUploadBox'+istr);
		};
	},

	searchImageInputApplyJS : function (istr) {
		var searchImageInput = gEBI('imageBoxSearchImageInput'+istr);
		var divList = gEBI('imageListContainer'+istr);
		
		searchImageInput.oninput = function() {
			if(searchImageInput.value.length>0) {
				findImage(istr);
			} else {
				hideElement(divList);
			}
		};
	},

	editSelectedImageApplyJS : function (istr) {
		var editSelectedImage = gEBI('imageBoxEditSelectedImage'+istr);
		var img5 = gEBI('imageBoxPreviewImageEditor'+istr);
		
		editSelectedImage.onclick = function() {
			editImage(img5.src);
		}
	},

	imagePlacementCenterRadioApplyJS : function (istr) {
		var imagePlacementCenterRadio = gEBI('imageBoxImagePlacementCenterRadio'+istr);
		imagePlacementCenterRadio.onclick=function() {
			updateImagePosition('imageBoxImagePlacementCenterRadio'+istr,'imageBoxPreviewImageEditor'+istr);
		};
	},

	imagePlacementRightRadioApplyJS : function (istr) {
		var imagePlacementRightRadio = gEBI('imageBoxImagePlacementRightRadio'+istr);
		imagePlacementRightRadio.onclick=function() {
			updateImagePosition('imageBoxImagePlacementCenterRadio'+istr,'imageBoxPreviewImageEditor'+istr);//Since there are only 2 options
		};
	},

	imageUploadCloseBoxButtonApplyJS : function (istr) {
		var imageUploadCloseBoxButton = gEBI('imageBoxImageUploadCloseBoxButton'+istr);
		imageUploadCloseBoxButton.onclick=function() {
			hideElement('imageBoxImageUploadBox'+istr);
			hideElement('imageBoxInputImageName'+istr);
			hideElement('imageBoxInputImageDescription'+istr);
			gEBI('imageBoxSaveFileFromURL'+istr).disabled="true";
		};
	},

	uploadImageFormApplyJS : function (istr) {
		var uploadImageForm = gEBI('uploadImageForm'+istr);
		uploadImageForm.addEventListener(
			'submit', function(ev) {
				alert('submitted');
				ev.preventDefault();
				uploadingStatus(istr);
			}, false
		);
	},

	uploadFileButtonApplyJS : function (istr) {
		var uploadFileButton = gEBI('imageBoxUploadFileButton'+istr);
		var form2 = gEBI('uploadImageForm'+istr);
		uploadFileButton.onclick = function() {
			form2.action = "servlet3.php"; // The action doesn't even matter, does it?
		};
	},

	clearFileButtonApplyJS : function (istr) {
		var clearFileButton = gEBI('imageBoxClearFileButton'+istr);
		var inputFile = gEBI('imageBoxChooseFileButton'+istr);
		var inputURL = gEBI('imageBoxPasteImageURL'+istr);
		
		clearFileButton.onclick = function() {
			inputFile.value = '';
			if (inputFile.value) {
				inputFile.type = "text";
				inputFile.type = "file";
			}
			inputURL.value = '';
		};
	},

	editCurrentImageApplyJS : function (istr) {
		var editCurrentImage = gEBI('imageBoxEditCurrentImage'+istr);
		var img5 = gEBI('imageBoxPreviewImageEditor'+istr);
		editCurrentImage.onclick = function() {
			editImage(img5.src);
		}
	},

	saveFileFromURLApplyJS : function (istr) {
		var saveFileFromURL = gEBI('imageBoxSaveFileFromURL'+istr);
		var form2 = gEBI('uploadImageForm'+istr);
		saveFileFromURL.onclick = function() {
			form2.action = "servlet4.php"; // The action doesn't even matter, does it?
		};
	}
}




// ========== Main Blocks =========================

var mainBoxJS = {
	controlBarJS : {

		iconDownApplyJS : function (istr, boxType) {
			var div2 = gEBI('iconDown'+istr);
			div2.onclick=function() {
				divDown(istr,boxType)};
		},
		
		iconUpApplyJS : function (istr, boxType) {
			var div3 = gEBI('iconUp'+istr);
			div3.onclick=function() {
				divUp(istr,boxType);
			};
		},
		
		iconHtmlTagJS : function (istr, boxType) {
			if (istr != "1") { // topics box, doesn't have this
				var div4 = gEBI('htmlTagIcon' + istr);
				div4.onclick = function() {
					htmlEdit(istr,boxType);
				};
			}
		},
		
		mainBlockIconTrashApplyJS : function (istr, boxType) {
			var div4 = gEBI('iconTrash'+istr);
			switch(boxType) {
				case 'textBox':
				case 'multipleChoiceBox':
				case 'freeResponseBox':
					div4.onclick=function() {
						closeBox(istr,boxType);
					};
					break;
				case 'hiddenTextBoxEditor':
					div4.onclick=function() {
						closeHiddenBox(istr);
					};
					break;
			}
		}
	},
	
	textFieldJS : {
	
		hiddenTextFieldApplyJS : function (istr) {
			var div = gEBI('textField'+istr);
			div.onfocus=function() {
				gEBI('triggerBox'+istr).className += ' triggerBoxHighlighted';
			};
			div.onblur=function() {
				var classname = gEBI('triggerBox'+istr).className;
				gEBI('triggerBox'+istr).className = replaceAllInstancesOf(classname, ' triggerBoxHighlighted','');
			};
		},
		
		multipleChoiceAddOptionApplyJS : function (istr) {
			var addButton = gEBI('multipleChoice'+istr+'AddOption'+'1'),
				textField = gEBI('textField'+istr);
				
			addButton.onclick = function() {
				addOption(istr,textField,addButton);
			};
		},
		
		freeResponseAddVariableApplyJS : function (istr) {
			var addButton = gEBI('freeResponse'+istr+'AddVariable'+'1'),
				textField = gEBI('textField'+istr);
			
			addButton.onclick = function() {
				addFreeResponseVariable(istr,textField,addButton);
			};
		}
	}
}

	












