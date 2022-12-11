<%@include file="header.jsp" %>
<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="ISO-8859-1">
<link rel="stylesheet" type="text/css" href="css/main.css">
<script src="scripts/main.js"></script>
<title>Asiakkaan listaus</title>
</head>
<body onload="asetaFocus('hakusana')" onkeydown="tutkiKey(event, 'listaa')">




<table id ="listaus">
<thead>
<tr>
<th colspan="5" class="oikealle"><a href="lisaaasiakas.jsp">Lisää uusi asiakas</a></th>

	
</thead>
<script scr="scripts/main.js"></script>
	<thead>
	<tr>
			<th><a id="linkki" href="login?logout=1">Kirjaudu ulos (<%out.print(session.getAttribute("kayttaja"));%>);</a></th>
			<th colspan="5" class="oikealle"><a id="linkki" href="lisaaasiakas.jsp"> Lisää uusi aisakas</a></th>
	<tr>
			<th>Hakusana:</th>
			<th colspan="3"><input type="text" id="hakusana"></th>
			<th><input type="button" value="hae" id="hakunappi" onclick="haeAsiakkaat()"></th>
		</tr>	
	
	
	<th>etunimi</th>
	<th>sukunimi</th>
	<th>puhelin</th>
	<th>sposti</th>
	</thead>
	<tbody id = "tbody">
	</tbody>
	</tr>
</table>

</body>
</html>