<?xml version="1.0" encoding="utf-8"?>

<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">

  <xsl:output method="text" omit-xml-declaration="yes" indent="no" standalone="yes"/>
  <xsl:param name="locale"></xsl:param>

  <xsl:template match="root">
    <xsl:comment>
      <xsl:value-of select="'RecordType'"/>,
    </xsl:comment>
    <xsl:value-of select="'OrderNumber'"/>,<xsl:value-of select="'ShippingTrackingNumber'"/>,<xsl:value-of select="'ShippedOn'"/>,<xsl:value-of select="'ShippingMethod'"/>,<xsl:value-of select="'CustomerID'"/>,<xsl:value-of select="'Name'"/>,<xsl:value-of select="'Email'"/>,<xsl:value-of select="'ShippingName'"/>,<xsl:value-of select="'ShippingCompany'"/>,<xsl:value-of select="'ShippingAddress1'"/>,<xsl:value-of select="'ShippingAddress2'"/>,<xsl:value-of select="'ShippingSuite'"/>,<xsl:value-of select="'ShippingCity'"/>,<xsl:value-of select="'ShippingState'"/>,<xsl:value-of select="'ShippingZip'"/>,<xsl:value-of select="'ShippingCountry'"/>,<xsl:value-of select="'ShippingPhone'"/>,<xsl:value-of select="'OrderSubtotal'"/>,<xsl:value-of select="'OrderTax'"/>,<xsl:value-of select="'OrderShippingCosts'"/>,<xsl:value-of select="'OrderTotal'"/>,<xsl:value-of select="'OrderDate'"/>,<xsl:value-of select="'OrderWeight'"/><xsl:text>&#13;&#10;</xsl:text>

    <xsl:apply-templates select="order"/>
  </xsl:template>

  <xsl:template match="order">
    <xsl:variable name="pShippingMethod"><xsl:if test="substring-before(ShippingMethod,'|') = 'UPS Ground'">GND</xsl:if><xsl:if test="substring-before(ShippingMethod,'|') = 'UPS 3-Day Select'">3DS</xsl:if><xsl:if test="substring-before(ShippingMethod,'|') = 'UPS 2nd Day Air'">2DA</xsl:if><xsl:if test="substring-before(ShippingMethod,'|') = 'UPS Next Day Air Saver'">1DP</xsl:if><xsl:if test="substring-before(ShippingMethod,'|') = 'UPS Next Day Air Early AM'">1DM</xsl:if><xsl:if test="substring-before(ShippingMethod,'|') = 'UPS Next Day Air'">1DA</xsl:if><xsl:if test="substring-before(ShippingMethod,'|') = 'UPS Worldwide Expedited'">EX</xsl:if><xsl:if test="substring-before(ShippingMethod,'|') = 'UPS Express Saver'">ES</xsl:if></xsl:variable>
    <xsl:value-of select="OrderNumber"/>,<xsl:value-of select="ShippingTrackingNumber"/>,<xsl:value-of select="ShippedOn"/>,<xsl:value-of select="$pShippingMethod"/>,<xsl:value-of select="CustomerID"/>,<xsl:value-of select="Name"/>,<xsl:value-of select="Email"/>,<xsl:value-of select="ShippingName"/>,<xsl:value-of select="ShippingCompany"/>,<xsl:value-of select="ShippingAddress1"/>,<xsl:value-of select="ShippingAddress2"/>,<xsl:value-of select="ShippingSuite"/>,<xsl:value-of select="ShippingCity"/>,<xsl:value-of select="ShippingState"/>,<xsl:value-of select="ShippingZip"/>,<xsl:value-of select="ShippingCountry"/>,<xsl:value-of select="ShippingPhone"/>,<xsl:value-of select="OrderSubtotal"/>,<xsl:value-of select="OrderTax"/>,<xsl:value-of select="OrderShippingCosts"/>,<xsl:value-of select="OrderTotal"/>,<xsl:value-of select="OrderDate"/>,<xsl:value-of select="OrderWeight"/><xsl:text>&#13;&#10;</xsl:text>
  </xsl:template>

</xsl:stylesheet>

