<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="2.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform" xmlns:fo="http://www.w3.org/1999/XSL/Format" xmlns:xs="http://www.w3.org/2001/XMLSchema" xmlns:fn="http://www.w3.org/2005/xpath-functions" xmlns:mint="http://mint.litemedia.se">
	
	<xsl:output encoding="utf-8" indent="yes" method="xhtml"/>
	<xsl:output doctype-system="http://www.w3c.org/tr/html4/strict.dtd"/> 
	<xsl:output doctype-public="-//W3c//DTD HTML 4.01//EN"/> 

	<xsl:template match="/">
		<html>
			<head>
				<title>Bookstore</title>
				<link rel="stylesheet" href="style.css" type="text/css" media="screen"/>
			</head>
			<body>
				<h1>Bookstore</h1>
				<ul class="books">
					<xsl:apply-templates select="/mint:bookstore/mint:books/*"/>
				</ul>
			</body>
		</html>
	</xsl:template>
	
	<xsl:template match="mint:book">
		<li class="book">
			<h2><xsl:value-of select="mint:title"/></h2>
			<em>by</em><xsl:value-of select="id(mint:authors-ref/@values)"/>
			<p>
				Plot: <xsl:value-of select="mint:plot"/>
			</p>
			<p class="price">Price: <xsl:value-of select="mint:price/@sek"/>:-</p>
		</li>
	</xsl:template>
</xsl:stylesheet>