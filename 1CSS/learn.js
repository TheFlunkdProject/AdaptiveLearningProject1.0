function shinyCourse(id) {
document.getElementById(id).style.cssText='box-shadow: 0px 1px 10px #000000';
shinyTarget = id+"ShinyGlass";
shinyString='transition:opacity 0s;opacity:1;';
document.getElementById(shinyTarget).style.cssText=shinyString;
}

function unshinyCourse(id) {
document.getElementById(id).style.cssText='box-shadow: 0px 1px 5px #000000';
unshinyTarget = id+"ShinyGlass";
unshinyString='transition:opacity 0s;opacity:0;';
document.getElementById(unshinyTarget).style.cssText=unshinyString;
}

function crackedCourse(id) {
crackedTarget = id+"Crack";
document.getElementById(crackedTarget).style.cssText='opacity:.7';
}

function inputRequestedCourse() {
cssInputBox='visibility:visible;z-index:500;';
document.getElementById('inputRequestedCourseBox').style.cssText=cssInputBox;
}

function cancelRequestCourse() {
cssInputBoxClose='visibility:hidden;z-index:-10;';
document.getElementById('inputRequestedCourseBox').style.cssText=cssInputBoxClose;
}