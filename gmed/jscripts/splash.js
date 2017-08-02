function $registerNamespace(name_space) {
    var heirarchy = name_space.split('.');
    if (heirarchy.length > 0) {
        var root = null;
        eval('try{' + heirarchy[0] + '}catch(e){' + heirarchy[0] + '= new Object()}; root = ' + heirarchy[0] + ';');
        if (heirarchy.length > 1) {
            for (var ctr = 1; ctr < heirarchy.length; ctr++) {
                root[heirarchy[ctr]] = new Object();
                root = root[heirarchy[ctr]];
            }
            return root;
        }
        else {
            return root;
        }
    }
}

function $bindMethod(instance, method) {
    return function() { return method.apply(instance, arguments); }
}

function $window_addload(handler) {
    if (window.addEventListener) {
        window.addEventListener('load', handler, false);
    }
    else if (document.addEventListener) {
        document.addEventListener('load', handler, false);
    }
    else if (window.attachEvent) {
        window.attachEvent('onload', handler);
    }
    else {
        if (typeof window.onload == 'function') {
            var oldload = window.onload;
            window.onload = function() {
                oldload();
                handler();
            }
        }
        else { window.onload = init; }
    }
}

function $getElementPosition(element) {
    var result = new Object();
    result.x = 0;
    result.y = 0;
    result.width = 0;
    result.height = 0;
    if (element.offsetParent) {
        result.x = element.offsetLeft;
        result.y = element.offsetTop;
        var parent = element.offsetParent;
        while (parent) {
            result.x += parent.offsetLeft;
            result.y += parent.offsetTop;
            var parentTagName = parent.tagName.toLowerCase();
            if (parentTagName != "table" &&
                parentTagName != "body" &&
                parentTagName != "html" &&
                parentTagName != "div" &&
                parent.clientTop &&
                parent.clientLeft) {
                result.x += parent.clientLeft;
                result.y += parent.clientTop;
            }
            parent = parent.offsetParent;
        }
    }
    else if (element.left && element.top) {
        result.x = element.left;
        result.y = element.top;
    }
    else {
        if (element.x) {
            result.x = element.x;
        }
        if (element.y) {
            result.y = element.y;
        }
    }
    if (element.offsetWidth && element.offsetHeight) {
        result.width = element.offsetWidth;
        result.height = element.offsetHeight;
    }
    else if (element.style && element.style.pixelWidth && element.style.pixelHeight) {
        result.width = element.style.pixelWidth;
        result.height = element.style.pixelHeight;
    }
    return result;
}

function $setElementHeight(element, height) {
    if (element && element.style) {
        element.style.height = height + "px";
    }
}
function $setElementWidth(element, width) {
    if (element && element.style) {
        element.style.width = width + "px";
    }
}
function $setElementX(element, x) {
    if (element && element.style) {
        element.style.left = x + "px";
    }
}
function $setElementY(element, y) {
    if (element && element.style) {
        element.style.top = y + "px";
    }
}

function $getCanvasPosition() {
    var myWidth = 0, myHeight = 0;
    if (typeof (window.innerWidth) == 'number') {
        //Non-IE
        myWidth = window.innerWidth;
        myHeight = window.innerHeight;
    } else if (document.documentElement && (document.documentElement.clientWidth || document.documentElement.clientHeight)) {
        //IE 6+ in 'standards compliant mode'
        myWidth = document.documentElement.clientWidth;
        myHeight = document.documentElement.clientHeight;
    } else if (document.body && (document.body.clientWidth || document.body.clientHeight)) {
        //IE 4 compatible
        myWidth = document.body.clientWidth;
        myHeight = document.body.clientHeight;
    }

    var scrOfX = 0, scrOfY = 0;
    if (typeof (window.pageYOffset) == 'number') {
        scrOfY = window.pageYOffset; scrOfX = window.pageXOffset;
    } else if (document.body && (document.body.scrollLeft || document.body.scrollTop)) {
        scrOfY = document.body.scrollTop; scrOfX = document.body.scrollLeft;
    } else if (document.documentElement && (document.documentElement.scrollLeft || document.documentElement.scrollTop)) {
        scrOfY = document.documentElement.scrollTop; scrOfX = document.documentElement.scrollLeft;
    }


    return { x: scrOfX, y: scrOfY, width: myWidth, height: myHeight };
}

$registerNamespace('aspdnsf.Constants');
aspdnsf.Constants.Mode = new Object();
aspdnsf.Constants.Mode.Normal = 1;
aspdnsf.Constants.Mode.Minimized = 2;
aspdnsf.Constants.Mode.Maximized = 4;
aspdnsf.Constants.Mode.Closed = 8;

// Offsets
aspdnsf.Constants.Offset = new Object();

aspdnsf.Constants.Offset.MARGIN_TOP_PANEL = 50;

aspdnsf.Constants.Offset.MAXIMIZED_HEIGHT = 150;
aspdnsf.Constants.Offset.MAXIMIZED_WIDTH = 45;
aspdnsf.Constants.Offset.MAXIMIZED_X = 20;
aspdnsf.Constants.Offset.MAXIMIZED_Y = 30;

$registerNamespace('aspdnsf.Controls');
aspdnsf.Controls.PanelControl = function(id) {
    this.main = document.getElementById(id);
    this.header = document.getElementById(id + '_Header');
    this.content = document.getElementById(id + '_Content');
    this.icon = document.getElementById(id + '_Icon');

    this.showMinimize = true;
    this.showMaximize = true;
    this.showClose = true;

    this.mode = aspdnsf.Constants.Mode.Normal;
    //this.attachHandlers();
    this.src_minimize = '';
    this.src_minimize_hover = '';
    this.src_maximize = '';
    this.src_maximize_hover = '';
    this.src_restore = '';
    this.src_restore_hover = '';
    this.src_close = '';
    this.src_close_hover = '';

    this.modeChangedEventHandlers = new Array();
    this.rememberPosition();

    this.topPanel = null;

    this.minimizeDelegate = this.minimize_default;
    this.minimizePanel = null;

    this.canvas = null;
}
aspdnsf.Controls.PanelControl.prototype = {

    set_MinimizeImage: function(src, hover) {
        this.src_minimize = src;
        this.src_minimize_hover = hover;

        var lnkMinimize = document.getElementById(this.main.id + '_Minimize');
        if (lnkMinimize) {
            lnkMinimize.src = src;
            if (hover != '') {
                lnkMinimize.onmouseover = function() { lnkMinimize.src = hover; };
                lnkMinimize.onmouseout = function() { lnkMinimize.src = src; };
            }
        }
    },

    set_MaximizeImage: function(src, hover) {
        this.src_maximize = src;
        this.src_maximize_hover = hover;

        var lnkMaximize = document.getElementById(this.main.id + '_Maximize');
        if (lnkMaximize) {
            lnkMaximize.src = src;

            var delMax = $bindMethod(this, this.changeMaxRestoreImage);
            lnkMaximize.onmouseover = function() { delMax(lnkMaximize, 'hover'); };
            lnkMaximize.onmouseout = function() { delMax(lnkMaximize, 'out'); };
        }
    },

    set_RestoreImage: function(src, hover) {
        this.src_restore = src;
        this.src_restore_hover = hover;
    },

    set_CloseImage: function(src, hover) {
        this.src_close = src;
        this.src_close_hover = hover;

        var lnkClose = document.getElementById(this.main.id + '_Close');
        if (lnkClose) {
            lnkClose.src = src;
            if (hover != '') {
                lnkClose.onmouseover = function() { lnkClose.src = hover; };
                lnkClose.onmouseout = function() { lnkClose.src = src; };
            }
        }
    },

    changeMaxRestoreImage: function(sender, action) {
        if (this.mode == aspdnsf.Constants.Mode.Maximized) {
            if (action == 'hover') {
                sender.src = this.src_restore_hover;
            }
            else {
                sender.src = this.src_restore;
            }
        }
        else {
            if (action == 'hover') {
                sender.src = this.src_maximize_hover;
            }
            else {
                sender.src = this.src_maximize;
            }
        }
    },

    attachHandlers: function() {
        if (this.header) {
            var lnkMinimize = document.getElementById(this.main.id + '_Minimize');
            if (lnkMinimize) {
                lnkMinimize.onclick = $bindMethod(this, this.minimize);
            }

            var lnkMaximize = document.getElementById(this.main.id + '_Maximize');
            if (lnkMaximize) {
                lnkMaximize.onclick = $bindMethod(this, this.maximize);
            }

            var lnkClose = document.getElementById(this.main.id + '_Close');
            if (lnkClose) {
                lnkClose.onclick = $bindMethod(this, this.close);
            }
        }
    },

    setTopPanel: function(topPanelId) {
        var ctrl = aspdnsf.Controls.PanelController.getControl(topPanelId);
        if (ctrl) {
            this.doSetTopPanel(ctrl);
        }
        else {
            var del = $bindMethod(this, this.doSetTopPanel);
            var observer = {
                notify: function(id, ctrl) {
                    if (topPanelId == id) {
                        del(ctrl);
                    }
                }
            }

            aspdnsf.Controls.PanelController.addObserver(observer);
        }
    },

    doSetTopPanel: function(topPanel) {
        var handler = $bindMethod(this, this.positionAfter);
        topPanel.addModeChangedEventHandler(handler);

        this.positionAfter(topPanel);
    },

    positionAfter: function(topPanel) {
        if (topPanel.get_Mode() == aspdnsf.Constants.Mode.Maximized) {
            // we're not concerned
            return;
        }
        var pos = topPanel.get_Position();

        switch (topPanel.get_Mode()) {
            case aspdnsf.Constants.Mode.Normal:
                var offset = 50;
                $setElementY(this.main, pos.y + pos.height + aspdnsf.Constants.Offset.MARGIN_TOP_PANEL);

                // same x
                $setElementX(this.main, pos.x);
                break;

            case aspdnsf.Constants.Mode.Minimized:
                var offset = 50;
                $setElementY(this.main, pos.y + aspdnsf.Constants.Offset.MARGIN_TOP_PANEL);

                // same x
                $setElementX(this.main, pos.x);
                break;

            case aspdnsf.Constants.Mode.Closed:
                $setElementY(this.main, pos.y);
                // same x
                $setElementX(this.main, pos.x);
                break;
        }

        if (topPanel.get_Mode() != aspdnsf.Constants.Mode.Maximized) {
            this.rememberPosition();

            // cascade..., reposition lower panels
            // trigger mode changed just to trick them to reposition themselves
            this.onModeChanged();
        }
    },

    get_Position: function() {
        var x = this.org_x;
        var y = this.org_y;
        var width = this.org_width;
        var height = this.org_height;

        return { x: x, y: y, width: width, height: height };
    },

    rememberPosition: function() {
        var pos = $getElementPosition(this.main);
        this.org_x = pos.x;
        this.org_y = pos.y;
        this.org_width = pos.width;
        this.org_height = pos.height;

        var cPos = $getElementPosition(this.main);
        this.org_content_height = cPos.height;
        this.org_content_width = cPos.width;
        this.org_content_x = cPos.x;
        this.org_content_y = cPos.y;

        this.main.style.zIndex = '1';
        this.main.style.position = 'absolute';

        $setElementWidth(this.main, this.org_width);
        $setElementHeight(this.main, this.org_height);
        $setElementX(this.main, this.org_x);
        $setElementY(this.main, this.org_y);


        /*
        var div = document.createElement('div');
        div.className = this.content.className + '_Spacer';
        div.innerHTML = '<br /><br /><br /><p>Lorem Ipsum sadgasdgsdg</p>';
        this.main.appendChild(div);
        */
    },

    get_Mode: function() {
        return this.mode;
    },

    maximize: function() {
        if (this.mode == aspdnsf.Constants.Mode.Maximized) {
            this.unMaximize();
        }
        else {
            //var parentNode = document.getElementById('pnlSplash'); //this.main.parentNode;
            //var table = document.getElementById('tblSplash');

            this.resizeMaximized();

            /*
            var hPos = WebForm_GetElementPosition(this.header);                
            WebForm_SetElementHeight(this.content, pos.height - hPos.height);
            */

            // make sure we're not minimized
            this.show(this.content);

            // hide the others
            aspdnsf.Controls.PanelController.hideOthers(this);

            // make sure we scroll on top
            window.scrollTo(0, 0);

            //this.mode = aspdnsf.Constants.Mode.Maximized;
            this.switchMode(aspdnsf.Constants.Mode.Maximized);

            // register that this panel is the current maximized
            // this will be useful later on when the main browser window has been resized as this is rendered inside an iframe
            // and we need to resize this control to re-accomodate the to-be occupied space
            aspdnsf.Controls.PanelController.set_CurrentMaximized(this);
        }
    },

    setPosition: function(x, y, width, height) {
        $setElementWidth(this.main, width);
        $setElementHeight(this.main, height);
        $setElementX(this.main, 0 + x);
        $setElementY(this.main, 0 + y);
    },

    setCanvas: function(canvas) {
        this.canvas = canvas;
    },

    unMaximize: function() {
        this.main.style.zIndex = '1';
        //this.main.style.position = 'relative';

        $setElementWidth(this.main, this.org_width);
        $setElementHeight(this.main, this.org_height);
        $setElementX(this.main, this.org_x);
        $setElementY(this.main, this.org_y);

        /*WebForm_SetElementHeight(this.content, this.org_content_height);*/
        // hide the others
        aspdnsf.Controls.PanelController.showAll();

        //this.mode = aspdnsf.Constants.Mode.Normal;
        this.switchMode(aspdnsf.Constants.Mode.Normal);

        // unregister previously maximized
        this.canvas.unregisterMaximized(this);

        document.body.style.overflow = 'auto';
    },

    resizeMaximized: function() {
        this.main.style.zIndex = '99';
        this.main.style.position = 'absolute';

        //this.canvas.resizeMaximixed(this); 

        var parent = this.main.parentNode;
        var pos = $getElementPosition(parent); //$getCanvasPosition();
        //var cPos = this.canvas.getPosition();

        this.main.style.zIndex = '99';
        this.main.style.position = 'absolute';

        var x = pos.x + aspdnsf.Constants.Offset.MAXIMIZED_X;
        var y = pos.y + aspdnsf.Constants.Offset.MAXIMIZED_Y;
        var width = pos.width - aspdnsf.Constants.Offset.MAXIMIZED_WIDTH;
        var height = pos.height - aspdnsf.Constants.Offset.MAXIMIZED_HEIGHT;

        this.setPosition(x, y, width, height);

        document.body.style.overflow = 'hidden';

        //document.body.style.height = height + 30 + 'px';

        //this.canvas.registerMaximized(this);
    },

    minimize: function() {
        if (this.minimizeDelegate) {
            this.minimizeDelegate();
        }
    },

    minimize_default: function() {
        if (this.content) {
            if (this.mode == aspdnsf.Constants.Mode.Minimized) {
                this.show(this.content);
                this.switchMode(aspdnsf.Constants.Mode.Normal);
            }
            else {
                this.hide(this.content);
                this.switchMode(aspdnsf.Constants.Mode.Minimized);
            }
        }
    },

    showNormal: function() {
        if (this.main) {
            this.show(this.main);
            this.switchMode(aspdnsf.Constants.Mode.Normal);
        }
    },

    close: function() {
        if (this.main) {
            this.hide(this.main);
            this.switchMode(aspdnsf.Constants.Mode.Closed);
        }
    },

    show: function(el) {
        if (el) el.style.display = '';
    },

    hide: function(el) {
        if (el) {
            el.style.display = 'none';
        }
    },

    switchMode: function(mode) {
        this.mode = mode;
        this.toggleControlBox();
        this.onModeChanged();
    },

    toggleControlBox: function() {
        if (this.mode == aspdnsf.Constants.Mode.Maximized) {
            var lnkMinimize = document.getElementById(this.main.id + '_Minimize');
            if (lnkMinimize) {
                this.hide(lnkMinimize);
            }
        }
        else {
            var lnkMinimize = document.getElementById(this.main.id + '_Minimize');
            if (lnkMinimize) {
                this.show(lnkMinimize);
            }
        }
    },

    onModeChanged: function() {
        for (var ctr = 0; ctr < this.modeChangedEventHandlers.length; ctr++) {
            var handler = this.modeChangedEventHandlers[ctr];
            handler(this);
        }
    },

    addModeChangedEventHandler: function(handler) {
        this.modeChangedEventHandlers.push(handler);
    },

    setMinimizePanel: function(id) {
        var pnl = document.getElementById(id);
        if (pnl) {
            this.minimizePanel = pnl;
            this.minimizeDelegate = this.attachMinimizeIcon;
        }
    },

    attachMinimizeIcon: function() {
        var img = document.createElement('img');
        img.src = this.icon.src;

        var showDelegate = $bindMethod(this, this.showNormal);
        var minPanel = this.minimizePanel;
        img.onclick = function() {
            showDelegate();
            minPanel.removeChild(img);
        }

        this.minimizePanel.appendChild(img);
        this.close();
    }

}

aspdnsf.Controls.PanelController = {

    initialize: function() {
        this.controls = new Array();
        this._controls = new Array();
        this.observers = new Array();

        this.currentMaximized = null;
    },

    registerControl: function(id, ctrl) {
        this.controls[id] = ctrl;
        this._controls.push(ctrl);
        this.notifyObservers(id, ctrl);
    },

    getControl: function(id) {
        return this.controls[id];
    },

    getControls: function() {
        return this._controls;
    },

    addObserver: function(observer) {
        this.observers.push(observer);
    },

    notifyObservers: function(id, ctrl) {
        for (var ctr = 0; ctr < this.observers.length; ctr++) {
            this.observers[ctr].notify(id, ctrl);
        }
    },

    hideOthers: function(except) {
        for (var ctr = 0; ctr < this.controls.length; ctr++) {
            var ctrl = this.controls[ctr];
            if (ctrl != except) {
                ctrl.close();
            }
        }
    },

    showAll: function() {
        for (var ctr = 0; ctr < this.controls.length; ctr++) {
            var ctrl = this.controls[ctr];
            ctrl.show();
        }
    },

    get_CurrentMaximized: function() {
        return this.currentMaximized;
    },

    set_CurrentMaximized: function(ctrl) {
        this.currentMaximized = ctrl;
    },

    unregisterCurrentMaximized: function() {
        this.currentMaximized = null;
    }
}

aspdnsf.Controls.PanelController.initialize();


aspdnsf.SplashPage = {

    initialize: function() {
        this.setup_ShowHideLeftPanel();

    },

    setup_ShowHideLeftPanel: function() {
        var imgHideLeft = document.getElementById('imgHideLeftPanel');
        var imgShowLeft = document.getElementById('imgShowLeftPanel');
        var tdLeft = document.getElementById('colLeft');

        if (imgHideLeft) {
            imgHideLeft.onclick = function() {
                tdLeft.style.display = 'none';
                imgShowLeft.style.display = '';
                // show also the containing div
                imgShowLeft.parentNode.style.display = '';
                
                var flag = document.getElementById(tdLeft.id + '_Visible');
                if(flag) {
                    flag.value = '0';
                }
            };

            imgShowLeft.onclick = function() {
                tdLeft.style.display = '';
                imgShowLeft.style.display = 'none';
                // hide also the containing div
                imgShowLeft.parentNode.style.display = 'none';
                
                var flag = document.getElementById(tdLeft.id + '_Visible');
                if(flag) {
                    flag.value = '1';
                }
            };
        }
    }
}

aspdnsf.ToggleButton = function(btnId, targetId) {
    this.btn = document.getElementById(btnId);
    this.target = document.getElementById(targetId);

    if (this.btn && this.target) {
        if(this.target.style.display == 'none') {
            this.mode = aspdnsf.Constants.Mode.Minimized;
        }
        else {
            this.mode = aspdnsf.Constants.Mode.Normal;
        }
        
        this.btn.onclick = $bindMethod(this, this.doToggle);

        this.src = (this.btn && this.btn.attributes['min']) ? this.btn.attributes['min'].value : '';
        this.src_hover = (this.btn && this.btn.attributes['min_hover']) ? this.btn.attributes['min_hover'].value : '';
        this.restore = (this.btn && this.btn.attributes['restore']) ? this.btn.attributes['restore'].value : '';
        this.restore_hover = (this.btn && this.btn.attributes['restore_hover']) ? this.btn.attributes['restore_hover'].value : '';

        this.btn.onmouseover = $bindMethod(this, this.onmouseover);
        this.btn.onmouseout = $bindMethod(this, this.onmouseout);
    }
    else {
        alert('Control and/or target not found!!!, ' + btnId + ', ' + targetId);
    }
}
aspdnsf.ToggleButton.prototype = {

    onmouseover: function() {
        if (this.mode == aspdnsf.Constants.Mode.Normal) {
            this.btn.src = this.src_hover;
        }
        else {
            this.btn.src = this.restore_hover;
        }
    },

    onmouseout: function() {
        if (this.mode == aspdnsf.Constants.Mode.Normal) {
            this.btn.src = this.src;
        }
        else {
            this.btn.src = this.restore;
        }
    },

    doToggle: function() {
        if (this.mode == aspdnsf.Constants.Mode.Normal) {
            this.target.style.display = 'none';
            this.mode = aspdnsf.Constants.Mode.Minimized;
            this.btn.src = this.restore_hover;
            
            var flag = document.getElementById(this.target.id + '_Visible');
            if(flag) {
                flag.value = '0';
            }
        }
        else {
            this.target.style.display = '';
            this.mode = aspdnsf.Constants.Mode.Normal;
            this.btn.src = this.src_hover;
            
            var flag = document.getElementById(this.target.id + '_Visible');
            if(flag) {
                flag.value = '1';
            }
        }
    }

}


function $attachHoverImage(id) {
    var img = document.getElementById(id);
    if (img && img.attributes['hover']) {
        var org = img.src;
        var hover = img.attributes['hover'].value;
        img.onmouseover = function() { img.src = hover; };
        img.onmouseout = function() { img.src = org; };
    }
}

