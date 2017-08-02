<%@ Page Inherits="AspDotNetStorefrontAdmin.shipwire" CodeFile="shipwire.aspx.cs" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
    <title>Shipwire</title>
    <style>
body {
	color: #000;
	background: #FFF;
}
body {
	font: 13px/1.22 arial,helvetica,clean,sans-serif;
	*font-size: small;
	*font: x-small;
						}
body, div, dl, dt, dd, ul, ol, li, h1, h2, h3, h4, h5, h6, pre, code, form, fieldset, legend, input, textarea, p, blockquote, th, td {
	margin: 0;
	padding: 0;
}
fieldset, img {
	border: 0;
}
address, caption, cite, code, dfn, em, strong, th, var {
	font-style: normal;
	font-weight: normal;
}
li {
	list-style: none;
}
h1, h2, h3, h4, h5, h6 {
	font-size: 100%;
	font-weight: normal;
}
.sw_ext_pg a:link, a:visited {
	text-decoration: none;
	color: #7c8f3f;
}
.sw_ext_pgcont {
	width: 809px;
	margin: 0 auto;
	position: relative;
}
#sw_main {
	background: url('images/shipwire_bd_bg.gif') repeat-y left top;
	float: left;
	width: 809px;
	padding-bottom: 20px;
}
h1#sw_logo a {
	background: url('images/shipwire_logo.gif') no-repeat left top;
	height: 79px;
	width: 277px;
	display: block;
	clear: both;
}
h1#sw_logo em {
	display: none;
}
#sw_home {
	color: #363942;
}
#sw_home h2.focus {
	background: url('images/shipwire_tagline.gif') no-repeat left top;
	margin-left: 20px;
	margin-bottom: 5px;
	height: 48px;
	width: 445px;
}
#sw_home h2.focus em {
	display: none;
}
#sw_home .salesrow {
	background: url('images/shipwire_mainbg.gif') repeat-y left top;
	float: left;
	width: 809px;
}
#sw_home .salesrow .salesrowhd {
	background: url('images/shipwire_wht_crns_top.gif') no-repeat left top;
	padding-top: 5px;
	float: left;
	width: 809px;
	margin-bottom: -5px;
}
#sw_home .salesrow .salesrowbd {
	background: url('imagaes/shipwire_wht_crns_btm.gif') no-repeat left bottom;
	padding-bottom: 2px;
	float: left;
	width: 809px;
}
#sw_home .salesrow .steps {
	padding-left: 62px;
	float: left;
	background: url('images/shipwire_hp_cont_left2.gif') no-repeat left bottom;
	padding-bottom: 10px;
}
#sw_home .salesrow li {
	text-align: center;
	color: #96ab54;
	font-size: 108%;
	line-height: 1em;
	font-family: "Trebuchet MS",Arial,Helvetica,sans-serif;
	font-weight: bold;
}
#sw_home .salesrow .steps .sendstep {
	padding: 15px 27px 100px 0;
	width: 112px;
	height: 4.35em; *;
	height: 4.25em;
	float: left;
	position: relative;
	background: url('images/shipwire_hp_cont_1.gif') no-repeat left bottom;
}
#sw_home .salesrow .steps .orderstep {
	padding: 15px 13px 100px 4px;
	background-image: url('images/shipwire_hp_cont_2.gif');
	width: 136px;
	height: 4.35em; *;
	height: 4.25em;
	float: left;
	position: relative;
	background-position: left bottom;
	background-repeat: no-repeat;
}
#sw_home .salesrow .steps .shipstep {
	padding: 15px 47px 100px 10px;
	background-image: url('images/shipwire_hp_cont_3.gif');
	width: 127px;
	height: 4.35em; *;
	height: 4.25em;
	float: left;
	position: relative;
	background-position: left bottom;
	background-repeat: no-repeat;
}
#sw_home .tryitnow h3 {
	color: #6a5a0e;
	font: 138.5% "Trebuchet MS",Arial,Helvetica,sans-serif;
	text-align: center;
	mnrgin-right: 30px;
	padding: 0;
}
#sw_home .tryitnow {
	background: url('images/shipwire_hp_cont_4.gif') no-repeat left top;
    width: 236px;
	height: 161px;
	float: left;
	padding: 10px 15px 8px 2px;
	text-align: center;
}
#sw_home .tryitnow p {
	color: #363942;
	font-family: "Trebuchet MS",Arial,Helvetica,Sans-Serif;
}
#sw_home .tryitnow .free {
	color: #407584;
	font-size: 93%;
	font-weight: bold;
	padding-bottom: 3px;
}
#sw_home .tryitnow .store {
	font: 85% Arial, Helvetica, "Sans Serif";
}
#sw_home .startbtn {
	border-style: none;
	border-color: inherit;
	border-width: 0;
	background: url('images/shipwire_start_trial_button_top.gif') no-repeat left top;
	width: 156px;
		xheight: 3.39em;
		margin: 20px 41px 5px 41px;
		font: bold 108% "Trebuchet MS",Arial,Helvetica,Sans-serif;
		color: #fff;
		text-align: center;
		cursor: pointer;
		text-transform: uppercase;
		display: block;
}
#sw_home .tryitnow .startbtn em {
	padding: 1.11em 10px;
	background: url('images/shipwire_start_trial_button_btm.gif') no-repeat left bottom;
	display: block;
}
a {
	text-decoration: none;
}
h1 {
	font: bold 123.1% arial;
}
</style>
</head>
<body id="sw_home">
<form runat=server>
    <div class="sw_ext_pgcont">
        <h1 id="sw_logo">
            <a href="http://partner.shipwire.com/o.php?id=1886"><em>Shipwire</em></a></h1>
        <div id="sw_main">
            <div id="SalesRow" runat="server" class="salesrow">
                <div class="salesrowhd">
                    <h2 class="focus">
                        <em>Shipwire lets you focus on growing your business by removing the hassle of shipping
                            &amp; storage</em></h2>
                </div>
                <div class="salesrowbd">
                    <ol class="steps">
                        <li class="sendstep">You Send Us Merchandise</li>
                        <li class="orderstep">Your Customers Order Online</li>
                        <li class="shipstep">Shipwire Takes Care of Shipping</li>
                    </ol>
                    <div class="tryitnow">
                        <h3>
                            Try it Out</h3>
                        <p class="free">
                            Free, no obligation trial</p>
                        <p class="store">
                            Store and ship up to 6 products, free!</p>
                        <a href="http://partner.shipwire.com/o.php?id=1886" class="startbtn"><em>Get More Information</em></a>
                    </div>
                </div>
            </div>
            <div id="TrackingRow" runat="server" class="salesrow">
                <div class="salesrowhd"></div><div class="salesrowbd">
                    <ol class="steps">
                        <li class="shipstep">Update Shipment Tracking</li>
                    </ol>
                    <div class="tryitnow">
                        <p class="free">Pull shipper tracking numbers into AspDotNetStorefront</p>
                        <asp:LinkButton ID="UpdateTracking" runat="server" CssClass="startbtn" OnClick="UpdateTracking_Click" ><em>Update Order Tracking</em></asp:LinkButton>
                        <asp:Label ID="UpdateTrackingStatus" runat="server"></asp:Label>
                    </div>
               </div>
            </div>
            <div id="InventoryRow" runat="server" class="salesrow">
                <div class="salesrowhd"></div><div class="salesrowbd">
                    <ol class="steps">
                        <li class="orderstep">Update Product Inventory</li>
                    </ol>
                    <div class="tryitnow">
                        <p class="free">Pull Warehouse Inventory in AspDotNetStorefront</p>
                        <p class="store">Ensure that your product quantities are in sync!</p>
                        <asp:LinkButton ID="UpdateInventory" runat="server" CssClass="startbtn" OnClick="UpdateInventory_Click" ><em>Update Product Inventory</em></asp:LinkButton>
                        <asp:Label ID="UpdateInventoryStatus" runat="server"></asp:Label>
                    </div>
               </div>            </div>
            <div id="AppConfigRow" runat="server" class="salesrow">
                <div class="salesrowhd"></div>
                <div class="salesrowbd">
                    <ol class="steps">
                        <li class="sendstep">Configure your Storefront</li>
                    </ol>
                    <div id="divMain" runat="server" class="tryitnow">
                    <p class="free">Configure AspDotNetStorefront</p>
                    <p class="store">Get these values from Shipwire:</p>
                        <table cellpadding="1" cellspacing="0" border="0">
                            <tr>
                                <td align="right" valign="middle">
                                    Username:
                                </td>
                                <td align="left" valign="middle">
                                    <asp:TextBox ID="txtUsername" runat="server"></asp:TextBox>
                                </td>
                            </tr>
                            <tr>
                                <td align="right" valign="middle">
                                    Password:
                                </td>
                                <td align="left" valign="middle">
                                    <asp:TextBox ID="txtPassword" runat="server"></asp:TextBox>
                                </td>
                            </tr>
                        </table>
                        <asp:LinkButton ID="ConfigureShipwire" runat="server" CssClass="startbtn" OnClick="ConfigureShipwire_Click"><em>Store Values</em></asp:LinkButton>
                        <asp:Label ID="ConfigureShipwireStatus" runat="server"></asp:Label>
                    </div>
                </div>
            </div>
        </div><!-- sw_main -->
    </div>
    </form>
</body>
</html>
