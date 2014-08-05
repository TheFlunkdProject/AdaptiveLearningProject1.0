<form id="form1" name="form1" method="post" enctype="multipart/form-data">    
<script>
form1.onsubmit = function(event){event.preventDefault();performAjaxSubmit();};
</script>
    <label for="sampleText">Please enter a text</label>

    <input id="sampleText" name="sampleText" type="text" /> <br/>

    <label for="sampleFile">Please select a file

    <input id="sampleFile" name="sampleFile" type="file" /> <br/>

    <input id="uploadBtn" type="submit" value="Ajax Submit" onClick=""></input>

</form>

<script type="text/javascript">

    function performAjaxSubmit() {

        //var sampleText = document.getElementById("sampleText").value;

        //var sampleFile = document.getElementById("sampleFile").files[0];

        /* var formdata = new FormData();

        formdata.append("sampleText", sampleText);

        formdata.append("sampleFile", sampleFile);
		formdata.append("whatDaHeck",'why not?'); */

        var xhr = new XMLHttpRequest();       

        xhr.open("POST","handler.jsp");
		
		//xhr.setRequestHeader("Content-type","application/x-www-form-urlencoded");
		//alert(formdata);
        xhr.send(new FormData(document.getElementById('form1')));

        xhr.onload = function(e) {

            if (this.status == 200) {

               alert(this.responseText);

            }

        };                    

    }   

</script>