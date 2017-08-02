var TabbedUI = new function() { };

TabbedUI.prototype = {

    //initialize tabs
    initialize: function() {
        var pagetabs = document.getElementById("pagetabs");
        var tablinks = pagetabs.getElementsByTagName("a");
        var tabcount = tablinks.length;
        var i;
        for (i = 0; i < tabcount; i++) {
            var tabName = tablinks.item(i).attributes.getNamedItem("rel").nodeValue;

            tablinks.item(i).setAttribute("href", "javascript:TabbedUI.prototype.showTab('" + tabName + "');");
            if (i == 0) {
                //show first tab
                TabbedUI.prototype.showTab(tabName);
            }
        }

    },

    //show selected tab content
    showTab: function(selectedTab) {
        var contentholder = document.getElementById("tabcontent");
        var content = contentholder.childNodes;
        var tabcount = content.length;
        var contentName;
        var i;

        for (i = 0; i < tabcount; i++) {
            if (content[i].nodeType == 1 && content[i].tagName.toLowerCase() == "div") {
                contentName = content[i].attributes.getNamedItem("id").nodeValue
                var ContentAtt = document.createAttribute("class");

                if (contentName.toLowerCase() == selectedTab.toLowerCase()) {
                    ContentAtt.nodeValue = "selectedTab";
                    content[i].setAttributeNode(ContentAtt);
                }
                else {
                    ContentAtt.nodeValue = "hiddenTab";
                    content[i].setAttributeNode(ContentAtt);
                }
            }
        }

        TabbedUI.prototype.activeLink(selectedTab);
    },

    //highlight selected tab link
    activeLink: function(selectedTab) {
        var pagetabs = document.getElementById("pagetabs");
        var tablinks = pagetabs.childNodes;
        var tabcount = tablinks.length;
        var tablinkName;
        var i;

        //remove class attributes
        for (i = 0; i < tabcount; i++) {
            if (tablinks[i].nodeType == 1 && tablinks[i].tagName.toLowerCase() == "a") {

                if (tablinks[i].attributes.getNamedItem("class")) {
                    tablinks[i].attributes.removeNamedItem("class");
                }
            }
        }

        //set activetab and inactivetab class attribute
        var activeTabLinkAtt = document.createAttribute("class");
        activeTabLinkAtt.nodeValue = "activetab";
        for (i = 0; i < tabcount; i++) {
            var inactiveTabLinkAtt = document.createAttribute("class");
            inactiveTabLinkAtt.nodeValue = "inactivetab";

            if (tablinks[i].nodeType == 1 && tablinks[i].tagName.toLowerCase() == "a") {
                tablinkName = tablinks[i].attributes.getNamedItem("rel").nodeValue;

                if (tablinkName.toLowerCase() == selectedTab.toLowerCase()) {
                    tablinks[i].setAttributeNode(activeTabLinkAtt);
                }
                else {
                    tablinks[i].setAttributeNode(inactiveTabLinkAtt);
                }
            }
        }
    }

}

