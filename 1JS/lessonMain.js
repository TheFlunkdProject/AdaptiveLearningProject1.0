function topicMenuOn() {
cssTriggering='transition:.3s;background-color:rgba(248,248,248,.00);';
document.getElementById('locationTopicTitle').style.cssText=cssTriggering;
cssTopicMenuAppears='transition:visibility 0s .4s,opacity .1s .4s;visibility:visible;opacity:.95;';
document.getElementById('topicMenu').style.cssText=cssTopicMenuAppears;
}

function topicMenuOff() {
cssTriggering='transition:.4s;background-color:rgba(248,248,248,.05);';
document.getElementById('locationTopicTitle').style.cssText=cssTriggering;
cssTopicMenuDisappears='transition:visibility 0s .5s,opacity .1s .4s;visibility:hidden;opacity:0;';
document.getElementById('topicMenu').style.cssText=cssTopicMenuDisappears;
}

function courseMenuOn() {
cssTriggering='transition:.3s;background-color:rgba(248,248,248,.00);';
document.getElementById('locationCourseTitle').style.cssText=cssTriggering;
cssTopicMenuAppears='transition:visibility 0s .4s,opacity .1s .4s;visibility:visible;opacity:.95;';
document.getElementById('courseMenu').style.cssText=cssTopicMenuAppears;
}

function courseMenuOff() {
cssTriggering='transition:.4s;background-color:rgba(248,248,248,.05);';
document.getElementById('locationCourseTitle').style.cssText=cssTriggering;
cssTopicMenuDisappears='transition:visibility 0s .5s,opacity .1s .4s;visibility:hidden;opacity:0;';
document.getElementById('courseMenu').style.cssText=cssTopicMenuDisappears;
}

function informationOn() {
information = document.getElementById('informationContainer');
if (information.style.display != "none") {
	information.style.display="none";
}
else {
	information.style.display="block";
}
}


function preferencesOn() {
preferences = document.getElementById('preferencesContainer');
if (preferences.style.display == "block") {
	preferences.style.display="none";
}
else {
	preferences.style.display="block";
}
}

function toolsOn() {
tools = document.getElementById('toolsContainer');
if (tools.style.display == "block") {
	tools.style.display="none";
}
else {
	tools.style.display="block";
}
}