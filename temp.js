function MaterialMenu(e) {
    "use strict";
    this.element_ = e, this.init()
}

function MaterialLayout(e) {
    "use strict";
    this.element_ = e, this.init()
}
var componentHandler = function() {
    "use strict";

    function e(e, t) {
        for(var s = 0; s < _.length; s++)
            if(_[s].className === e) return void 0 !== t && (_[s] = t), _[s];
        return !1
    }

    function t(i, n) {
        if(void 0 === i && void 0 === n)
            for(var a = 0; a < _.length; a++) t(_[a].className, _[a].cssClass);
        else {
            if(void 0 === n) {
                var l = e(i);
                l && (n = l.cssClass)
            }
            for(var r = document.querySelectorAll("." + n), o = 0; o < r.length; o++) s(r[o], i)
        }
    }

    function s(t, s) {
        var i = t.getAttribute("data-upgraded");
        if(null === i || -1 === i.indexOf(s)) {
            null === i && (i = ""), t.setAttribute("data-upgraded", i + "," + s);
            var n = e(s);
            if(!n) throw "Unable to find a registered component for the given class.";
            var a = new n.classConstructor(t);
            a[c] = n, d.push(a), n.callbacks.forEach(function(e) {
                e(t)
            }), n.widget && (t[s] = a);
            var l = document.createEvent("Events");
            l.initEvent("componentupgraded", !0, !0), t.dispatchEvent(l)
        }
    }

    function i(t) {
        var s = {
            classConstructor: t.constructor,
            className: t.classAsString,
            cssClass: t.cssClass,
            widget: void 0 === t.widget ? !0 : t.widget,
            callbacks: []
        };
        if(_.forEach(function(e) {
                if(e.cssClass === s.cssClass) throw "The provided cssClass has already been registered.";
                if(e.className === s.className) throw "The provided className has already been registered"
            }), t.constructor.prototype.hasOwnProperty(c)) throw "MDL component classes must not have " + c + " defined as a property.";
        var i = e(t.classAsString, s);
        i || _.push(s)
    }

    function n(t, s) {
        var i = e(t);
        i && i.callbacks.push(s)
    }

    function a() {
        for(var e = 0; e < _.length; e++) t(_[e].className)
    }

    function l(e) {
        for(var t = 0; t < d.length; t++) {
            var s = d[t];
            if(s.element_ === e) return s
        }
    }

    function r(e) {
        if(e && e[c].classConstructor.prototype.hasOwnProperty(h)) {
            e[h]();
            var t = d.indexOf(e);
            d.splice(t, 1);
            var s = e.element_.dataset.upgraded.split(","),
                i = s.indexOf(e[c].classAsString);
            s.splice(i, 1), e.element_.dataset.upgraded = s.join(",");
            var n = document.createEvent("Events");
            n.initEvent("componentdowngraded", !0, !0), e.element_.dispatchEvent(n)
        }
    }

    function o(e) {
        var t = function(e) {
            r(l(e))
        };
        if(e instanceof Array || e instanceof NodeList)
            for(var s = 0; s < e.length; s++) t(e[s]);
        else {
            if(!(e instanceof Node)) throw "Invalid argument provided to downgrade MDL nodes.";
            t(e)
        }
    }
    var _ = [],
        d = [],
        h = "mdlDowngrade_",
        c = "mdlComponentConfigInternal_";
    return {
        upgradeDom: t,
        upgradeElement: s,
        upgradeAllRegistered: a,
        registerUpgradedCallback: n,
        register: i,
        downgradeElements: o
    }
}();
window.addEventListener("load", function() {
        "use strict";
        "classList" in document.createElement("div") && "querySelector" in document && "addEventListener" in window && Array.prototype.forEach ? (document.documentElement.classList.add("js"), componentHandler.upgradeAllRegistered()) : componentHandler.upgradeElement = componentHandler.register = function() {}
    }), MaterialLayout.prototype.Constant_ = {
        MENU_ICON: "menu",
    }, MaterialLayout.prototype.Mode_ = {
        WATERFALL: 2
    }, MaterialLayout.prototype.CssClasses_ = {
        HEADER: "layout__header",
        DRAWER: "layout__drawer",
        DRAWER_BTN: "layout__drawer-button",
        ICON: "material-icons",
        OBFUSCATOR: "layout__obfuscator",
        IS_DRAWER_OPEN: "is-visible",
      }, MaterialLayout.prototype.screenSizeHandler_ = function() {
        "use strict";
        this.screenSizeMediaQuery_.matches ? this.element_.classList.add(this.CssClasses_.IS_SMALL_SCREEN) : (this.element_.classList.remove(this.CssClasses_.IS_SMALL_SCREEN), this.drawer_ && this.drawer_.classList.remove(this.CssClasses_.IS_DRAWER_OPEN))
    }, MaterialLayout.prototype.drawerToggleHandler_ = function() {
        "use strict";
        this.drawer_.classList.toggle(this.CssClasses_.IS_DRAWER_OPEN)
    }, MaterialLayout.prototype.resetTabState_ = function(e) {
        "use strict";
        for(var t = 0; t < e.length; t++) e[t].classList.remove(this.CssClasses_.IS_ACTIVE)
    }, MaterialLayout.prototype.init = function() {
        "use strict";
        if(this.element_) {
            var e = document.createElement("div");
            e.classList.add(this.CssClasses_.CONTAINER), this.element_.parentElement.insertBefore(e, this.element_), this.element_.parentElement.removeChild(this.element_), e.appendChild(this.element_);
            for(var t = this.element_.childNodes, s = 0; s < t.length; s++) {
                var i = t[s];
                i.classList && i.classList.contains(this.CssClasses_.HEADER) && (this.header_ = i), i.classList && i.classList.contains(this.CssClasses_.DRAWER) && (this.drawer_ = i), i.classList && i.classList.contains(this.CssClasses_.CONTENT) && (this.content_ = i)
            }
            this.header_ && (this.tabBar_ = this.header_.querySelector("." + this.CssClasses_.TAB_BAR));
            var n = this.Mode_.STANDARD;
            if(this.screenSizeMediaQuery_ = window.matchMedia(this.Constant_.MAX_WIDTH), this.screenSizeMediaQuery_.addListener(this.screenSizeHandler_.bind(this)), this.screenSizeHandler_(), this.header_ && (this.header_.classList.contains(this.CssClasses_.HEADER_SEAMED) ? n = this.Mode_.SEAMED : this.header_.classList.contains(this.CssClasses_.HEADER_WATERFALL) ? (n = this.Mode_.WATERFALL, this.header_.addEventListener("transitionend", this.headerTransitionEndHandler.bind(this)), this.header_.addEventListener("click", this.headerClickHandler.bind(this))) : this.header_.classList.contains(this.CssClasses_.HEADER_SCROLL) && (n = this.Mode_.SCROLL, e.classList.add(this.CssClasses_.HAS_SCROLLING_HEADER)), n === this.Mode_.STANDARD ? (this.header_.classList.add(this.CssClasses_.CASTING_SHADOW), this.tabBar_ && this.tabBar_.classList.add(this.CssClasses_.CASTING_SHADOW)) : n === this.Mode_.SEAMED || n === this.Mode_.SCROLL ? (this.header_.classList.remove(this.CssClasses_.CASTING_SHADOW), this.tabBar_ && this.tabBar_.classList.remove(this.CssClasses_.CASTING_SHADOW)) : n === this.Mode_.WATERFALL && (this.content_.addEventListener("scroll", this.contentScrollHandler_.bind(this)), this.contentScrollHandler_())), this.drawer_) {
                var a = document.createElement("div");
                a.classList.add(this.CssClasses_.DRAWER_BTN);
                var l = document.createElement("i");
                l.classList.add(this.CssClasses_.ICON), l.textContent = this.Constant_.MENU_ICON, a.appendChild(l), a.addEventListener("click", this.drawerToggleHandler_.bind(this)), this.element_.classList.add(this.CssClasses_.HAS_DRAWER), this.element_.classList.contains(this.CssClasses_.FIXED_HEADER) ? this.header_.insertBefore(a, this.header_.firstChild) : this.element_.insertBefore(a, this.content_);
                var r = document.createElement("div");
                r.classList.add(this.CssClasses_.OBFUSCATOR), this.element_.appendChild(r), r.addEventListener("click", this.drawerToggleHandler_.bind(this))
            }
            this.element_.classList.add(this.CssClasses_.IS_UPGRADED)
        }
    }, componentHandler.register({
        constructor: MaterialLayout,
        cssClass: "js-layout"
    })