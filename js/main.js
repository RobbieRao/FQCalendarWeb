                h = $("<canvas></canvas>")[0], k = h.getContext("2d", { willReadFrequently: true })
            if (isPhone() || isPad()) {
                this.searchButton = $("<div class='searchButton'></div>");
                phoneIconsURL[0] && this.searchButton.addCssSprite(phoneIconsURL[0], "searchButton", 15, 15, phoneIconInfo);
            }
            if (window.shareObj) {
                this.logo = $("<img class='logo' src='" + this.info.logo + "'/>");
            } else {
                this.logo = $("<div class='logo'></div>");
                phoneIconsURL[0] && this.logo.addCssSprite(phoneIconsURL[0], this.info.name, 40, 40, phoneIconInfo);
            }
            phoneIconsURL[0] && this.titleState.cssSprite(phoneIconsURL[0], "collapsed", 24, 24, phoneIconInfo);
                phoneIconsURL[0] && c.cssSprite(phoneIconsURL[0], b, 20, 20, phoneIconInfo);
                this.expanded && (this.expanded = !0, phoneIconsURL[0] && this.titleState.cssSprite(phoneIconsURL[0], "expanded", 24, 24, phoneIconInfo));
            phoneIconsURL[0] && this.titleState.cssSprite(phoneIconsURL[0], "collapsed", 24, 24, phoneIconInfo)
            var c = b.getContext("2d", { willReadFrequently: true }),
                d = document.createElement("canvas").getContext("2d", { willReadFrequently: true }),
        this.thicknessCanvas.attr("width", toPxNumber(this.width));
        this.thicknessCanvas.attr("height", toPxNumber(c));
        this.thicknessCanvas.attr("width", toPxNumber(this.thicknessWidth));
        phoneIconsURL[0] && this.icon.addCssSprite(phoneIconsURL[0], "passward", 100, 100, phoneIconInfo)
    global.phoneIconsURL = [];
    ["1.jpg","2.jpg"].forEach(function(src){
        var i = new Image();
        i.loading = "eager";
        i.src = bookConfig.normalPath + src;
    });
    isPhone() || isPad() ? c() : $(window).loader(toolBarIconsURL, b)
}

function toPxNumber(n, fallback) {
    var v = Number(n);
    return isFinite(v) && v > 0 ? Math.round(v) : (fallback || 1);
    if (bookConfig.EnableReportButton) {
        if (isPad() || isPhone()) {
            if (typeof window.PhoneReportPanel === "function") {
                global.reportPanel = new PhoneReportPanel(tmpContainer);
            } else {
                console.warn("[UI] PhoneReportPanel missing, hide report button");
                $(".button[title='举报']").hide();
            }
        } else {
            global.reportPanel = new ReportPanel(tmpContainer);
        }
    }
        if (bookConfig.EnableReportButton && typeof window.PhoneReportPanel === "function" && !window.reportPanel) {
            global.reportPanel = new PhoneReportPanel(tmpContainer);
        }
        if (global.reportPanel) {
            function() {
                global.reportPanel.showOrHide()
            }.delay(10);
        } else {
            console.warn("[UI] PhoneReportPanel missing, hide report button");
            $(".button[title='举报']").hide();
        }
