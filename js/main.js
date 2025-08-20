        this.context = this.thicknessCanvas[0].getContext("2d", { willReadFrequently: true })
        var w = Number(this.width);
        w = isFinite(w) && w > 0 ? Math.round(w) : 1;
        this.width = w;
        this.thickness.css({ width: w + "px" });
        this.thicknessCanvas[0].width = w;
        this.thicknessCanvas.css({ width: w + "px" });
        this.isLeft ? (this.thickness.css({ left: -w + "px" }), drawThickeness(this.context, w, this.height, w, -1)) : drawThickeness(this.context, w, this.height, 0, 1)
        var h = Number(c);
        h = isFinite(h) && h > 0 ? Math.round(h) : 1;
        this.height = h;
        var w = Number(this.width);
        w = isFinite(w) && w > 0 ? Math.round(w) : 1;
        this.isLeft && (d = -w + "px");
        this.thickness.css({ left: d });
        var tw = Number(this.thicknessWidth);
        tw = isFinite(tw) && tw > 0 ? Math.round(tw) : 1;
        this.thicknessCanvas[0].height = h;
        this.thicknessCanvas[0].width = tw;
        this.thicknessCanvas.css({ height: h + "px", width: tw + "px" });
        this.context.clearRect(0, 0, tw, h);
        this.isLeft ? drawThickeness(this.context, tw, h, tw, -1) : drawThickeness(this.context, tw, h, 0, 1);
        this.resetTotalWidth(b, h)
    global.phoneIconsURL = [];
    isPad() || isPhone() ? bookConfig.EnableReportButton && window.PhoneReportPanel && (global.reportPanel = new PhoneReportPanel(tmpContainer)) : bookConfig.EnableReportButton && (global.reportPanel = new ReportPanel(tmpContainer))
        bookConfig.EnableReportButton && !window.reportPanel && window.PhoneReportPanel && (global.reportPanel = new PhoneReportPanel(tmpContainer));
