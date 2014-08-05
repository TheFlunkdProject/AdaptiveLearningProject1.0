<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<%@ page import="java.io.*,java.lang.*" %>
<%@page import="javax.imageio.ImageIO"%>
<%@page import="java.net.URL"%>
<%@page import="java.awt.*, java.awt.image.*,com.sun.image.codec.*" %>

<%@ page import="org.apache.commons.fileupload.*"%> 
<%@ page import="org.apache.commons.fileupload.util.*"%> 
<%@ page import="org.apache.commons.fileupload.servlet.*"%>
<%@ page import="commons.fileupload.*"%> 
<%@ page import="org.apache.commons.fileupload.disk.*"%>
<%@ page import="org.apache.commons.fileupload.servlet.ServletFileUpload"%>  
<%@ page import="org.apache.commons.fileupload.disk.DiskFileItemFactory"%>  
<%@ page import="org.apache.commons.fileupload.FileItemFactory"%>  
<%@ page import="org.apache.commons.fileupload.FileItem"%>  
<%@ page import="org.apache.commons.fileupload.FileUpload"%>  
<%@ page import="org.apache.commons.fileupload.FileUploadException"%>

<c:forEach var="pageParameter" items="${param}">
        <c:out value="${pageParameter.key}" /> = <c:out value="${pageParameter.value}" />
      </c:forEach>
<c:out value="${param.imageBoxChooseFileButton1.value}" />
<%
/*
//if (request.getParameter("imageBoxChooseFileButton1") != null) {

	String initialGraph500Path = "/home/learnfla/tomcat/webapps/learningflare.com/ROOT/create/LessonBuilder/newImages/defaultGraph500.png";

	File initialGraph500 = new File(initialGraph500Path);

	//Remove the previously created graph stored in the default location:
	if (initialGraph500.exists()) initialGraph500.delete();

	//create file to copy image from URL onto:
	initialGraph500.createNewFile();
	FileOutputStream graphOutputStream = new FileOutputStream(initialGraph500);

	
	
	
	
	boolean isMultipart = ServletFileUpload.isMultipartContent(request);
	
	ServletFileUpload upload = new ServletFileUpload();
	
	// Parse the request
	FileItemIterator iter = upload.getItemIterator(request);
	while (iter.hasNext()) {
		FileItemStream item = iter.next();
		String name = item.getFieldName();
		InputStream stream = item.openStream();
		if (item.isFormField()) {
			
			out.println("Form field " + name + " with value "
				+ Streams.asString(stream) + " detected.");
		} else {
			System.out.println("File field " + name + " with file name "
				+ item.getName() + " detected.");
			// Process the input stream
			//Write onto the new file:
			//URL url = new URL(graphSourceURL);
			BufferedImage img = null;
			//img = ImageIO.read(stream);
			//ImageIO.write(img, "png", graphOutputStream);
			
			
						
						byte[] buf = new byte[8192];
						int len;
						while ((len = stream.read(buf)) > 0) {
							graphOutputStream.write(buf, 0, len);
						}
			
			
			graphOutputStream.close();
		}
	}
	
	
	
	


*/


%>