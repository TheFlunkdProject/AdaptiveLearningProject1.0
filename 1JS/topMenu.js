function feedbackInputBoxOn() {
cssStringFeedbackInputBoxOn = "visibility:visible;opacity:1;transition:visibility 0s 0s, opacity .1s 0s;"
document.getElementById('feedbackInputBox').style.cssText = cssStringFeedbackInputBoxOn;

}

function feedbackInputBoxOff() {
cssStringFeedbackInputBoxOff = "visibility:hidden;opacity:0;transition:visibility 0s .1s, opacity .1s 0s;"
cssStringThanksForFeedbackOff = "visibility:hidden;opacity:0;transition:visibility 0s .1s, opacity .1s 0s;"
document.getElementById('feedbackInputBox').style.cssText = cssStringFeedbackInputBoxOff;
document.getElementById('thanksForFeedbackBox').style.cssText = cssStringThanksForFeedbackOff;
}

function feedbackInputSubmit() {
cssStringFeedbackInputBoxOff = "visibility:hidden;opacity:0;transition:visibility 0s .1s, opacity .1s 0s;"
cssStringThanksForFeedbackOff = "visibility:hidden;opacity:0;transition:visibility 0s 2.1s, opacity .1s 2s;"
document.getElementById('feedbackInputBox').style.cssText = cssStringFeedbackInputBoxOff;
document.getElementById('thanksForFeedbackBox').style.cssText = cssStringThanksForFeedbackOff;

document.getElementById('feedbackInputInForm').value = document.getElementById('feedbackInput').value;
var currentPage = window.location.href;
document.submitFeedbackForm.action = currentPage;
document.getElementById('submitFeedbackForm').submit();
}

function thanksForFeedbackOn() {
cssStringThanksForFeedbackOn = "visibility:visible;opacity:1;transition:visibility 0s 0s, opacity 0s 0s;"
document.getElementById('thanksForFeedbackBox').style.cssText = cssStringThanksForFeedbackOn;
}

function thanksForFeedbackOff() {
cssStringThanksForFeedbackOff = "visibility:hidden;opacity:0;transition:visibility 0s 2s, opacity .5s 1.5s;"
document.getElementById('thanksForFeedbackBox').style.cssText = cssStringThanksForFeedbackOff;
}