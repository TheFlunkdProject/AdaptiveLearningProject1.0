<!DOCTYPE html>
<%@ page import="test.Testing" %>
<%@ page import="test.MaybeServlet" %>
<html>
<head>
</head>
<body>
<%
Testing bob = new Testing();
%><%=bob.getString()%><%
MaybeServlet harry = new MaybeServlet();
String nice = harry.createMyFile("Do-I-Exist.txt");
%><%=nice%><%
%>
</body>
</html>