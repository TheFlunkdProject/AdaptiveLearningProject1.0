<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<%@ page import="java.io.*,java.lang.*" %>
<%@page import="javax.imageio.ImageIO"%>
<%@page import="java.net.URL"%>
<%@page import="java.util.*, java.awt.image.*,com.sun.image.codec.*" %><!-- java.awt.*-->

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

<!--<c:forEach var="pageParameter" items="${param}">
        <c:out value="${pageParameter.key}" /> = <c:out value="${pageParameter.value}" />
      </c:forEach>
<c:out value="${param.imageBoxChooseFileButton1}" />-->


<%

%><%=request.getParameter("whatDaHeck")%><%

class FileUploader extends HttpServlet {

    protected void doPost(HttpServletRequest request,

                          HttpServletResponse response)

                          throws ServletException, IOException {

        String ajaxUpdateResult = "";

        try {

            List<FileItem> items = new ServletFileUpload(new DiskFileItemFactory()).parseRequest(request);  
			//items;

            for (FileItem item : items) {

                if (item.isFormField()) {

                    ajaxUpdateResult += "Field " + item.getFieldName() + 

                    " with value: " + item.getString() + " is successfully read\n\r";

                } else {

                    String fileName = item.getName();

                    InputStream content = item.getInputStream();

                    response.setContentType("text/plain");

                    response.setCharacterEncoding("UTF-8");

                    // Do whatever with the content InputStream.
					
						String initialGraph500Path = "/home/learnfla/tomcat/webapps/learningflare.com/ROOT/create/LessonBuilder/newImages/defaultGraph500.png";
						File initialGraph500 = new File(initialGraph500Path);
						
						//Remove the previously created graph stored in the default location:
						if (initialGraph500.exists()) initialGraph500.delete();

						//create file to copy image from URL onto:
						initialGraph500.createNewFile();
						FileOutputStream graphOutputStream = new FileOutputStream(initialGraph500);
						
						BufferedImage img = null;
						byte[] buf = new byte[8192];
						int len;
						while ((len = content.read(buf)) > 0) {
							graphOutputStream.write(buf, 0, len);
						}
						graphOutputStream.close();

                    System.out.println(Streams.asString(content));

                    ajaxUpdateResult += "File " + fileName + " is successfully uploaded\n\r";

                }

            }

        } catch (FileUploadException e) {

            throw new ServletException("Parsing file upload failed.", e);

        }

        response.getWriter().print(ajaxUpdateResult);

    }
}

%>