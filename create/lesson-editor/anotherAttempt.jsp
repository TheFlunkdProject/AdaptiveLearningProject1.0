<form enctype="multipart/form-data" method="post" name="fileinfo">
  <label>Your email address:</label>
  <input type="email" autocomplete="on" autofocus name="userid" placeholder="email" required size="32" maxlength="64" /><br />
  <label>Custom file label:</label>
  <input type="text" name="filelabel" size="12" maxlength="32" /><br />
  <label>File to stash:</label>
  <input type="file" name="file" required />
  <input type="button" value="Stash the file!" id="submitter"/>
</form>
<div id="output"></div>

<script>
var form = document.forms.namedItem("fileinfo");
//form.addEventListener('submit', function(ev) {
document.getElementById('submitter').onclick = function() {

  var
    oOutput = document.getElementById("output"),
    oData = new FormData(document.forms.namedItem("fileinfo"));

  oData.append("CustomField", "This is some extra data");

  var oReq = new XMLHttpRequest();
  oReq.open("POST", "servlet3.jsp", true);
  oReq.onload = function(oEvent) {
    if (oReq.status == 200) {
		alert(this.responseText);
      oOutput.innerHTML = "Done";
    } else {
      oOutput.innerHTML = "Error " + oReq.status + " occurred uploading your file.<br \/>";
    }
  };

  oReq.send(oData);
  //ev.preventDefault();
};//, false);

</script>