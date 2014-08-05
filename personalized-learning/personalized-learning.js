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





function changeVideoStartEnd(jv,someString,someString2) {


var vidFrame = document.getElementById('vid'+jv);
var oldSrc=vidFrame.src;
var startTime = hhmmssToSeconds(someString);
if (oldSrc.indexOf('start') == -1) {
	oldSrc += '&start=' + startTime.toString();
} else {
	var si=0;
	var ii=oldSrc.indexOf('start=')+6;
	while (!isNaN(oldSrc.charAt(ii+si))) {//while it's a number
		si++;
		if (ii+si==oldSrc.length) {
			break;//Once it gets to the end, it will crash the browser.
		}
	}
	oldSrc=oldSrc.replace('start='+oldSrc.substring(ii,ii+si), 'start='+startTime.toString());
}

var endTime = hhmmssToSeconds(someString2);
if (oldSrc.indexOf('end') == -1) {
	oldSrc += '&end=' + endTime.toString();
} else {
	var si=0;
	var ii=oldSrc.indexOf('end=')+4;
	while (!isNaN(oldSrc.charAt(ii+si))) {//...so while it IS a number...
		si++;
		if (ii+si==oldSrc.length) {//Because once it gets to the end, it crashes the browser...
			break;
		}
	}
	oldSrc=oldSrc.replace('end='+oldSrc.substring(ii,ii+si), 'end='+endTime.toString());
}
vidFrame.src = oldSrc; 
}





function findMatch(inputId) {
var inputList = document.getElementById('inputList').value;
var thisInput = document.getElementById(inputId);
inputList = inputList.split(',');
for (var i=0; i<inputList.length; i++) {
	if (!isNaN(inputList[i])) {
		
		document.getElementById('inspirationContainer').innerHTML=inputList[i];
		if (document.getElementById('input'+inputList[i]).value == thisInput.value) {
			thisInput.style.cssText="color:#003388";
		}
	}
}
}








function loadVideoData(longString) {
document.getElementById('mainContainer').innerHTML += '<form name="vidSectionsTopics" '+
	'id="vidSectionsTopics" action="storeVidSectionsTopics.jsp" method="post">';
var elelele = document.createElement('input');
elelele.type="hidden";
elelele.id="inputList";
elelele.name="inputList";
elelele.value="";
document.getElementById('mainContainer').appendChild(elelele);

var inputListString = '';
var vidNum = 0;
//longString = longString.replace(/[\\]+/g, '');
var dataList = longString.replace( /\\/g, " " ).split(/,| |\\/);
var jv,j1,j2;
for (var i=0; i<dataList.length; i++) {
	if (dataList[i].indexOf('http')!=-1) {
		jv=i;
		var idIndex = dataList[i].indexOf('v=');
		var theId = dataList[i].substring(idIndex+2, idIndex+13);
		document.getElementById('mainContainer').innerHTML += '<iframe id="vid' + jv.toString() + 
				'" src="https://www.youtube.com/embed/'+theId+'?wmode=transparent'+
				'&rel=0&amp;modestbranding=1&amp;version=3&amp;ap=%2526fmt%3D18&amp;autohide=1&amp;fs=1&'+
				'amp;theme=light&amp;color=white" width="50%" height="300px"></iframe><br><br>';
	}
	var someArray = [];
	var someString = '';
	var someArray2 = [];
	var someString2 = '';
	if (!isNaN(dataList[i].charAt(0)) && dataList[i].charAt(0) != '') {
		j1=i;
		for (var k=dataList[i].length; k>0; k--) {
			
			someArray.push(dataList[i].substring(k-1,k));
		}
		for (var l=0; l<someArray.length; l++) {
			someString += someArray[l];
			if (l>0 && l%2 == 1 && l<someArray.length-1) {
				someString += ':';
			}
		}
		someString = someString.split("").reverse().join("");
		i++;
		while (dataList[i]=='') i++;
		j2=i;
		for (var k=dataList[i].length; k>0; k--) {
			
			someArray2.push(dataList[i].substring(k-1,k));	
		}
		for (var l=0; l<someArray2.length; l++) {
			someString2 += someArray2[l];
			if (l>0 && l%2 == 1 && l<someArray2.length-1) {
				someString2 += ':';
			}
		}
		someString2 = someString2.split("").reverse().join("");
		document.getElementById('mainContainer').innerHTML += '<input type="button" value="' + 
		someString + ' - ' + someString2 + 
		'" id="button' + i.toString() + '" name="button' + i.toString() + '"' +
		'" onclick="changeVideoStartEnd('+jv+',\''+someString+'\',\''+someString2+'\');"/>\
		<input type="text" id="input'+i.toString()+'" name="input'+i.toString()+
		'" oninput="findMatch(\'input'+i.toString()+'\');" placeholder="Topic" width="200px"/><br>';
		
		
		inputListString += i.toString() + ',';
	}
}


document.getElementById('mainContainer').innerHTML += '<input type="button" name="submitTopics" value="Submit"'+
	' onclick="document.getElementById(\'vidSectionsTopics\').submit();"/></form>';

// document.getElementById('inspirationContainer').value = inputListString;
// elelele.value=inputListString;
// document.getElementById('inspirationContainer').value = elelele.value;
}

/*
switch (innerBox) {
	case 'videoBox': {
		// Container:
		div6.className += " " + innerBox+'InnerContainer';//innerBox is videoBox, but I can copy & paste this
		// div6.setAttribute("contentEditable", false);
		var innerContainerID=innerBox+'InnerContainer'+i.toString();
		div6.id=innerContainerID;
		
		// Embedded video:
		var div7=document.createElement('div');
		div7.className += ' embeddedVideoContainer';
		var embeddedVideoContainerID=innerBox+'embeddedVideoContainer'+i.toString();
		div6.id=embeddedVideoContainerID;
		
		var iframe1=document.createElement('iframe');
		var srcStr = "https://www.youtube.com/embed/qC_T9ePzANg?wmode=transparent"+
				"&rel=0&amp;modestbranding=1&amp;version=3&amp;ap=%2526fmt%3D18&amp;autohide=1&amp;fs=1&"+
				"amp;theme=light&amp;color=white";
		iframe1.setAttribute('src', srcStr);
		iframe1.setAttribute('type', "application/x-shockwave-flash");
		iframe1.setAttribute('allowFullScreen', '');
		iframe1.className += ' embeddedVideo';
		var embeddedVideoID = 'embeddedVideo'+i.toString();
		iframe1.id=embeddedVideoID;
		
		// For the video specs:
		
		// Video URL:
		var div8=document.createElement('div');
		div8.className += ' videoUrlInputsContainer';
		var videoSpecsContainerID = 'videoUrlInputsContainer'+i.toString();
		div8.id=videoSpecsContainerID;
		
		var input1=document.createElement('input');
		input1.type='text';
		input1.className += ' videoUrlInput';
		input1.setAttribute('placeHolder', "Video URL");
		var videoUrlInputID = 'videoUrlInput' + i.toString();
		input1.id=videoUrlInputID;
		
		var input2=document.createElement('input');
		input2.type='button';
		input2.value="Apply URL";
		input2.onclick=function() {
			var url=document.getElementById('videoUrlInput' + i.toString()).value;
			var k = url.indexOf('v=');
			var theId = url.substring(k+2,k+13);
			srcStr = "https://www.youtube.com/embed/"+theId+"?wmode=transparent"+
				"&rel=0&amp;modestbranding=1&amp;version=3&amp;ap=%2526fmt%3D18&amp;autohide=1&amp;fs=1&"+
				"amp;theme=light&amp;color=white";
			document.getElementById('embeddedVideo'+i.toString()).src = srcStr;
			// document.getElementById('videoUrlInput' + i.toString()).value = srcStr;
			};
		input2.className += ' videoUrlButton';
		var videoUrlButtonID = 'videoUrlButton' + i.toString();
		input2.id=videoUrlButtonID;
		
		// Video start and end times:
		var div9=document.createElement('div');
		div9.className += ' videoTimeInputsContainer';
		var videoTimeInputsContainerID = 'videoTimeInputsContainer'+i.toString();
		div9.id=videoTimeInputsContainerID;
		
		var text1=document.createTextNode('Start time:');
		var text2=document.createTextNode('End Time:');
		
		var input3=document.createElement('input');
		input3.type='text';
		input3.className += ' videoStartTimeInput';
		input3.setAttribute('placeHolder', "hh:mm:ss");
		var videoStartTimeInputID = 'videoStartTimeInput' + i.toString();
		input3.id=videoStartTimeInputID;
		
		var input4=document.createElement('input');
		input4.type='text';
		input4.className += ' videoEndTimeInput';
		input4.setAttribute('placeHolder', "hh:mm:ss");
		var videoEndTimeInputID = 'videoEndTimeInput' + i.toString();
		input4.id=videoEndTimeInputID;
		
		var input5=document.createElement('input');
		input5.type='button';
		input5.value="Apply times";
		input5.onclick=function() {
			var oldSrc=document.getElementById('embeddedVideo'+i.toString()).src;
			var startInput=document.getElementById('videoStartTimeInput' + i.toString()).value;
			if (startInput != "") {
				var startTime = hhmmssToSeconds(startInput);
				if (oldSrc.indexOf('start') == -1) {
					oldSrc += '&start=' + startTime.toString();
				} else {
					var si=0;
					var ii=oldSrc.indexOf('start=')+6;
					while (!isNaN(oldSrc.charAt(ii+si))) {//...so while it IS a number...
						si++;
						if (ii+si==oldSrc.length) {
							break;//Because once it gets to the end, it crashes the browser...
						}
					}
					oldSrc=oldSrc.replace('start='+oldSrc.substring(ii,ii+si), 'start='+startTime.toString());
					document.getElementById('videoUrlInput' + i.toString()).value = oldSrc;
				}
			}
			
			var endInput=document.getElementById('videoEndTimeInput' + i.toString()).value;
			if (endInput != "") {
				var endTime = hhmmssToSeconds(endInput);
				if (oldSrc.indexOf('end') == -1) {
					oldSrc += '&end=' + endTime.toString();
				} else {
					var si=0;
					var ii=oldSrc.indexOf('end=')+4;
					while (!isNaN(oldSrc.charAt(ii+si))) {//...so while it IS a number...
						si++;
						if (ii+si==oldSrc.length) {//Because once it gets to the end, it crashes the browser...
							break;
						}
					}
					oldSrc=oldSrc.replace('end='+oldSrc.substring(ii,ii+si), 'end='+endTime.toString());
				}
			}
			document.getElementById('embeddedVideo'+i.toString()).src = oldSrc;
			};
		input5.className += ' videoTimesButton';
		var videoTimesButtonID = 'videoTimesButton' + i.toString();
		input5.id=videoTimesButtonID;
		
		
		// Assemble the DOM branch:
		div7.appendChild(iframe1);
		
		div8.appendChild(input1);
		div8.appendChild(input2);
		
		div8.appendChild(text1);
		div8.appendChild(input3);
		div8.appendChild(text2);
		div8.appendChild(input4);
		div8.appendChild(input5);
		
		div6.appendChild(div7);
		div6.appendChild(div8);
		div6.appendChild(div9);
		break;
	}

*/

