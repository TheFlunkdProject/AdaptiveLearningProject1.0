function previewLesson() {
	var previewBox = document.getElementById('lessonPreviewBox');
	showElement(previewBox);
	var previewText = document.getElementById('lessonPreviewBody');
	var editingSpace = document.getElementById('editingSpace');
	previewText.innerHTML = "";
	var htmlString = "";
	
	var testNumber = 0;

	var descendants = getAllThoseChildren(editingSpace);
	
	document.getElementById('variableValues').innerHTML = setVariableValuesInHiddenInputs();
	htmlString = dumpNodes(descendants); //Only need to pass the list, because the dump-site is taken care of after the function.

	previewText.innerHTML = htmlString;
	generateRandomVariablesAndTypeSet();
}




function dumpNodes(descendants) {
	var htmlString = "";
	for (var i=0; i<descendants.length; i++) {
		if (descendants[i].nodeType == 3) {
			// It's a text node, so check if it was contentEditable:
			var theResult = checkIfAncestorIsContentEditable(descendants[i]);
			if (descendants[i].contentEditable == "true" || theResult != 'nopes') {
				// Add the text to the main htmlString:
				if (descendants[i].nodeValue != '') {
					htmlString += descendants[i].nodeValue;
				} 
			}
		}
		if (descendants[i].nodeType == 1) {
			// Line breaks
			if (descendants[i].tagName == 'BR') {//This is going to suck to try to figure out...
				var theResult;
				theResult = checkIfAncestorIsContentEditable(descendants[i]);
				if (theResult != 'nopes') {
					htmlString += '<br>';
				}
			}
			// Links
			if (descendants[i].id.indexOf('linkTriggerText') != -1) {
				var args = extractContentsFromElements(descendants[i],['linkTriggerText',2,'linkText',1]);
				htmlString += '<a href="'+args[2]+'" target="_blank">';
				htmlString += args[1];
				htmlString += '</a>';
				i += args[0];
				continue;
			}
			// Titles
			if (descendants[i].id.indexOf('titleTriggerText') != -1) {
				var args = extractContentsFromElements(descendants[i],['titleTriggerText',2,'titleText',1]);
				htmlString += '<span title="'+args[2]+'">';
				htmlString += args[1];
				htmlString += '</span>';
				i += args[0];
				continue;
			}
			// Equations
			if (descendants[i].id.indexOf('equationTriggerBox') != -1) {
				var args = extractContentsFromElements(descendants[i],['equationTriggerBox',0,'equationInput',1,'importantEquationCheckbox',1]);
				var theNumber = descendants[i].id.substring(18);
				var equationClassName = 'equation';
				if (args[2]) equationClassName = 'boxedEquation';
				htmlString += '<span class=" '+equationClassName+'" id="'+equationClassName+theNumber+'">$($'+args[1]+'$)$</span>';
				i += args[0];
				continue;
			}
			// Hidden Text Triggers
			if (descendants[i].id.indexOf('triggerTextEditor') != -1) {
				// In the preview, we will still have 2 elements that need to point to each other. So we need to give them ID's.
				var theNumber = descendants[i].id.substring(17);
				var args = extractContentsFromElements(descendants[i],['triggerTextEditor',2,'hiddenTextBoxEditor',2]);
				htmlString += '<span class="triggerText" id="triggerText'+theNumber+
							'" onclick="switchClassNameOnOff([\'hiddenTextBox'+theNumber+'\',\'hiddenTextBoxRevealed\',\
							this.id,\'triggerTextActive\']);">';
				htmlString += args[1];
				htmlString += '</span><span class="hiddenTextBox" id="hiddenTextBox'+theNumber+'">';
				htmlString += args[2];
				htmlString += '</span>';
				
				i += args[0];
				continue;
			}
			// Hidden Text Boxes
			if (descendants[i].id.indexOf('hiddenTextBoxEditor') != -1) {
				//All we need to do here is skip all the contents. 
				var newDescendants = getAllThoseChildren(descendants[i]);
				i += newDescendants.length;
				continue;
			}
			// Text areas (filled with HTML):
			if (descendants[i].id.indexOf('htmlTextarea') != -1) {
				var dummySpan = createEl('span',[]);
				gEBI('editingSpace').appendChild(dummySpan);
				dummySpan.innerHTML = descendants[i].value;
				dumpNodes(getAllThoseChildren(dummySpan));
				dummySpan.innerHTML = '';
				dummySpan.parentNode.removeChild(dummySpan);
			}
			// Multiple Choice Boxes
			if (descendants[i].id.indexOf('multipleChoiceBox') != -1) {
				var theNumber = descendants[i].id.substring(17);
				var args = extractContentsFromElements(descendants[i],['multipleChoiceBox',0,'multipleChoice'+theNumber+'AnswerEditor',12,
						'multipleChoice'+theNumber+'RadioButtonEditor',13
						]);// theNumber gets included
				
				var iter;
				for (iter=0; iter<(args.length-1)/2; iter++) {
					if (args[1+iter]) {
						htmlString +=  '<span class="multipleChoiceAnswer"' + 
							' id="multipleChoice'+theNumber+'Answer'+(1+iter).toString()+'">' + 
							'<input type="radio" class=" multipleChoiceRadio" name="multipleChoiceRadioGroup'+theNumber+'" ' +
							'id="multipleChoice'+theNumber+'Radio'+(1+iter).toString()+'" />'+
							args[1+iter] + '</span>';
					}
				}
				var correctChoice = '0';
				for (iter=0; iter<(args.length-1)/2; iter++) {
					if (args[1+(args.length-1)/2 + iter] == true) {
						correctChoice = iter.toString();//counting from 0
					}
				}
				htmlString += '<input type="button" value="Check Answer" ' +
						'onclick="checkMultipleChoiceAnswer('+theNumber+');"/>';
				document.getElementById('variableValues').innerHTML += '<input type="hidden" class="multipleChoiceCorrectAnswer" '+
						'id="multipleChoice'+theNumber+'CorrectAnswer" value="'+correctChoice+'"/>';
				htmlString += '<span class="multipleChoiceAnswerResultDisplay" id="multipleChoiceAnswerResultDisplay'+theNumber+'"></span>';
				
				i += args[0];
				continue;
			}
			// Free Response Boxes
			if (descendants[i].id.indexOf('freeResponseBox') != -1) {
				var theNumber = descendants[i].id.substring(15);
				var args = extractContentsFromElements(descendants[i],['freeResponseBox',0,
						'freeResponseAnswerEditor',1,'freeResponseUnitsEditor',1]);// theNumber gets included
				// The variables from and to values are taken care of at the very end.
				document.getElementById('variableValues').innerHTML += '<input type="hidden" class=" freeResponseAnswer"'+
							' id="freeResponseAnswer'+theNumber+
							'" value="'+args[1]+'" />'; // The real answer
				htmlString += '<br><input type="text" class=" freeResponseAttempt" id="freeResponseAttempt'+theNumber+
							'" value="" placeholder="Answer"/>'; // The attempted answer
				htmlString += '<span class=" freeResponseUnits" id="freeResponseUnits'+theNumber+
							'">$($'+args[2]+'$)$</span>'; // units
				htmlString += '<br><input type="button" value="Check Answer" onclick="checkFreeResponseAnswer('+theNumber+')" />';
				htmlString += '<span class=" freeResponseResult" id="freeResponseResult'+theNumber+
							'">'+'</span>'; // Display result of guess
				
				i += args[0];
				continue;
			}
			// Images
			if (descendants[i].id.indexOf('imageBoxPreviewImageEditor') != -1) {
				var theNumber = descendants[i].id.substring(26);
				// 1. Get the image position, insert the image container
				var imagePosition;
				switch(descendants[i].className.indexOf('Centered')) {
					case -1:
						imagePosition = "Right";
						break;
					default:
						imagePosition = "Center";
				}
				htmlString += '<div class="imageContainer'+imagePosition+'"'+
					' id="imageContainer'+imagePosition+theNumber+
					'">';
				// 2. Insert the image
				htmlString += '<img class="imageBoxImage'+imagePosition+
					'" id="imageBoxImage'+imagePosition+theNumber+
					'" src="'+descendants[i].src+'">';
				// 3. Insert the caption
				var theCaption = document.getElementById('imageBoxImageCaptionInput'+theNumber).value;
				htmlString += '<span class="imageCaption" id="imageCaption'+theNumber+
					'">'+theCaption+'</span>';
				htmlString += '</div>';
				continue;
			}
			// Videos
			if (descendants[i].id.indexOf('embeddedVideoEditor') != -1 && descendants[i].id.length < 23) { // 2nd condition is an important distinction
				var theNumber = descendants[i].id.substring(19);
				htmlString += '<div class="videoContainer" id="videoContainer'+theNumber+'"><iframe src="'+descendants[i].src+
					'" type="application/x-shockwave-flash" allowfullscreen="" class="embeddedVideo" id="embeddedVideo'+theNumber+
					'"></iframe></div>';
				htmlString += '<div class="videoCaption" id="videoCaption'+theNumber+
							'">'+
							gEBI('videoCaptionEditor'+theNumber).value+
							'</div>';
							/* '<script type="text/javascript">\
								function youtubeFeedCallback' +theNumber+'( data ) {\
									document.writeln( "<b>Author:</b> " + data.entry[ "author" ][ 0 ].name.$t + "<br/>" );\
									document.writeln( \'<a href="\' + data.entry[ "media$group" ][ "media$player" ].url + \'" target="_blank">Watch on YouTube</a>\' );\
								}\
							</script>\
							<script type="text/javascript" \
								src="http://gdata.youtube.com/feeds/api/videos/XIQ-KnsAsbg?v=2&amp;alt=json-in-script&amp;callback=youtubeFeedCallback'+theNumber+'">\
							</script>\ */
				continue;
			}
			// Lists
			if (descendants[i].tagName == 'UL' || descendants[i].tagName == 'OL' || descendants[i].tagName == 'LI') {
				var args = fillElementWithContents(descendants[i]);
				htmlString += args[1];
				i += args[0];
				continue;
			}
		}
	}
	return htmlString;
}


function extractContentsFromElements(node,args) {//Skips over an element, taking only certain information from it
/* 
Outputs: [Nodes to skip, args[0] html, args[2] html, etc...
Inputs:
node is the actual element that should be skipped over. Its className should be the first element of args.
args = [className, element type, repeat... ]
Element types: 
	0: No information to extract. No output contributed, except the number of nodes to skip.
	1: Text Input. No nodes inside; only a value to extract.
	2: Content editable element. Needs elements extracted out of it.
	3: Only returns the checked status of a single element
	11: Many inputs with ID's containing the "'className'" string exist
	12: Many contentEditable elements with ID's containing the "'className'" string exist
	13: Many checked statuses returned
 */
	var theNumber = node.id.substring(args[0].length); // gets the number after the standard name
	var output = [];
	for (var i=0; i<args.length; i+=2) {
		var el = document.getElementById(args[i]+theNumber);
		switch(args[i+1]) {
			case 0: //Will always be the first element
				var newDescendants = getAllThoseChildren(el);
				if (i==0) output.push(newDescendants.length);
				break;
			case 1:
				if (i==0) output.push(0);
				if (el.type == "checkbox") {
					output.push(el.checked);
				} else {
				output.push(el.value);
				}
				break;
			case 2:
				var newDescendants = getAllThoseChildren(el);
				if (i==0) output.push(newDescendants.length);
				output.push(dumpNodes(newDescendants));
				break;
			case 11:
				var mainDescendants = getAllThoseChildren(node);
				//if (i==0) output.push(mainDescendants.length);
				for (var iter=0; iter<mainDescendants.length; iter++) {	
					if (mainDescendants[iter].nodeType == 1) {
						if (mainDescendants[iter].id.indexOf(args[i]) != -1) {
							output.push(mainDescendants[iter].value);
						}
					}
				}
				break;
			case 12:
				var mainDescendants = getAllThoseChildren(node);
				//if (i==0) output.push(mainDescendants.length);
				for (var iter=0; iter<mainDescendants.length; iter++) {	
					if (mainDescendants[iter].nodeType == 1) {
						if (mainDescendants[iter].id.indexOf(args[i]) != -1) {
							var newDescendants = getAllThoseChildren(mainDescendants[iter]);
							output.push(dumpNodes(newDescendants));
						}
					}
				}
				break;
			case 13:
				var mainDescendants = getAllThoseChildren(node);
				//if (i==0) output.push(mainDescendants.length);
				for (var iter=0; iter<mainDescendants.length; iter++) {	
					if (mainDescendants[iter].nodeType == 1) {
						if (mainDescendants[iter].id.indexOf(args[i]) != -1) {
							output.push(mainDescendants[iter].checked);
						}
					}
				}
		}
	}
	return output;
}


function fillElementWithContents(el) { 
//el = element to turn with its contents into an html string
	var output = [];
	var elContents = getAllThoseChildren(el);
	var numberOfNodes = elContents.length;
	output.push(numberOfNodes);
	var contentsHTML = dumpNodes(elContents);
	var htmlString = '<'+el.tagName.toLowerCase()+'>'+contentsHTML+'</'+el.tagName.toLowerCase()+'>';
	output.push(htmlString);
	return output;
}


function setVariableValuesInHiddenInputs() {
	//document.getElementById('pageName').innerHTML = 'function ran';
	var htmlString = '';
	var varFromList = document.getElementsByClassName('varFromEditor');
	var varToList = document.getElementsByClassName('varToEditor');
	var numberOfVariables = varToList.length;
	//document.getElementById('pageName').innerHTML = numberOfVariables.toString();
	for (iter=0; iter<numberOfVariables; iter++) {
		htmlString +=  '<input type="hidden" class="varFrom"' + 
				' id="varFrom'+iter.toString() + 
				'" value="'+varFromList[iter].value + '" />' +
				'<input type="hidden" class="varTo"' + 
				' id="varTo'+iter.toString() + 
				'" value="'+varToList[iter].value + '" />'+
				'<input type="hidden" class="varValue"' + 
				' id="varValue'+iter.toString() + 
				'" value="" />'; // This value will be randomly generated
	}
	return htmlString;
}

/* <script type="text/javascript">
function youtubeFeedCallback( data )
  {
	document.writeln( '<b>Title:</b> ' + data.entry[ "title" ].$t + '<br/>' );
	document.writeln( '<b>Author:</b> ' + data.entry[ "author" ][ 0 ].name.$t + '<br/>' );
	document.writeln( '<b>Published:</b> ' + new Date( data.entry[ "published" ].$t.substr( 0, 4 ), data.entry[ "published" ].$t.substr( 5, 2 ) - 1, data.entry[ "published" ].$t.substr( 8, 2 ) ).toLocaleDateString( ) + '<br/>' );
	document.writeln( '<b>Duration:</b> ' + Math.floor( data.entry[ "media$group" ][ "yt$duration" ].seconds / 60 ) + ':' + ( data.entry[ "media$group" ][ "yt$duration" ].seconds % 60 ) + ' (' + data.entry[ "media$group" ][ "yt$duration" ].seconds + ' seconds)<br/>' );
	document.writeln( '<b>Rating:</b> ' + new Number( data.entry[ "gd$rating" ].average ).toFixed( 1 ) + ' out of ' + data.entry[ "gd$rating" ].max + '; ' + data.entry[ "gd$rating" ].numRaters + ' rating(s)' + '<br/>' );
	document.writeln( '<b>Statistics:</b> ' + data.entry[ "yt$statistics" ].favoriteCount + ' favorite(s); ' + data.entry[ "yt$statistics" ].viewCount + ' view(s)' + '<br/>' );
	document.writeln( '<br/>' + data.entry[ "media$group" ][ "media$description" ].$t.replace( /\n/g, '<br/>' ) + '<br/>' );
	document.writeln( '<br/><a href="' + data.entry[ "media$group" ][ "media$player" ].url + '" target="_blank">Watch on YouTube</a>' );
  }
</script>
<script type="text/javascript" src="http://gdata.youtube.com/feeds/api/videos/XIQ-KnsAsbg?v=2&amp;alt=json-in-script&amp;callback=youtubeFeedCallback"></script>
 */