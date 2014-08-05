<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<%@ page import="java.io.*,java.lang.*" %>
<%@page import="javax.imageio.ImageIO"%>
<%@page import="java.net.URL"%>
<%@page import="java.util.*, java.awt.image.*,com.sun.image.codec.*" %><!-- java.awt.*-->

<%@ page import="org.apache.commons.fileupload.*"%> 
<%@ page import="commons.fileupload.*"%> 
<%@ page import="org.apache.commons.fileupload.util.*"%> 
<%@ page import="org.apache.commons.fileupload.servlet.*"%>
<%@ page import="org.apache.commons.fileupload.disk.*"%>
<%@ page import="org.apache.commons.fileupload.servlet.ServletFileUpload"%>  
<%@ page import="org.apache.commons.fileupload.disk.DiskFileItemFactory"%>  
<%@ page import="org.apache.commons.fileupload.FileItemFactory"%>  
<%@ page import="org.apache.commons.fileupload.FileItem"%>  
<%@ page import="org.apache.commons.fileupload.FileUpload"%>  
<%@ page import="org.apache.commons.fileupload.FileUploadException"%>


<%
boolean isMultipart = ServletFileUpload.isMultipartContent(request);

// Create a factory for disk-based file items
DiskFileItemFactory factory = new DiskFileItemFactory();

// Configure a repository (to ensure a secure temp location is used)
ServletContext servletContext = this.getServletConfig().getServletContext();
File repository = (File) servletContext.getAttribute("javax.servlet.context.tempdir");
factory.setRepository(repository);

// Create a new file upload handler
ServletFileUpload upload = new ServletFileUpload(factory);

// Parse the request
List<FileItem> items = upload.parseRequest(request);

for (FileItem item : items) {
            if (item.isFormField()) {
                // Process regular form field (input type="text|radio|checkbox|etc", select, etc).
                String fieldname = item.getFieldName();
                String fieldvalue = item.getString();
                // ... (do your job here)
				out.println(fieldname);
				out.println(fieldvalue);
            } else {
                // Process form file field (input type="file").
                String fieldname = item.getFieldName();
                String filename = org.apache.commons.io.FilenameUtils.getName(item.getName());
                InputStream filecontent = item.getInputStream();
                // ... (do your job here)
				
						String initialGraph500Path = "/home/learnfla/tomcat/webapps/switchlearn.com/ROOT/1images/defaultGraph500.png";
						File initialGraph500 = new File(initialGraph500Path);
						
						//Remove the previously created graph stored in the default location:
						if (initialGraph500.exists()) initialGraph500.delete();

						//create file to copy image from URL onto:
						initialGraph500.createNewFile();
						FileOutputStream graphOutputStream = new FileOutputStream(initialGraph500);
						
						BufferedImage img = null;
						byte[] buf = new byte[8192];
						int len;
						while ((len = filecontent.read(buf)) > 0) {
							graphOutputStream.write(buf, 0, len);
						}
						graphOutputStream.close();
            }
        }





%>