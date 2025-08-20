        this.context = this.thicknessCanvas[0].getContext("2d");
        this.thicknessCanvas.attr("width", 1);
        this.thicknessCanvas.attr("height", 1)
        this.width = isNaN(this.width) || this.width <= 0 ? 1 : this.width;
        this.height = isNaN(this.height) || this.height <= 0 ? 1 : this.height;
            width: this.width + "px"
        this.thicknessCanvas.attr("width", this.width);
        this.context.clearRect(0, 0, this.width, this.height);
        this.height = isNaN(c) || c <= 0 ? 1 : c;
        var widthVal = isNaN(this.thicknessWidth) || this.thicknessWidth <= 0 ? 1 : this.thicknessWidth;
        this.thicknessCanvas.attr("height", this.height);
        this.thicknessCanvas.attr("width", widthVal);
        this.context.clearRect(0, 0, widthVal, this.height);
        this.isLeft ? drawThickeness(this.context, widthVal, this.height, widthVal, -1) : drawThickeness(this.context, widthVal, this.height, 0, 1);
        var widthVal = isNaN(this.width) || this.width <= 0 ? 1 : this.width;
        var heightVal = isNaN(this.height) || this.height <= 0 ? 1 : this.height;
        this.line.attr("width", widthVal);
        this.line.attr("height", heightVal);
    if (isPad() || isPhone()) {
        if (bookConfig.EnableReportButton) {
            if (typeof PhoneReportPanel === "function") global.reportPanel = new PhoneReportPanel(tmpContainer);
            else console.warn("PhoneReportPanel is missing, skip initialization");
        }
    } else bookConfig.EnableReportButton && (global.reportPanel = new ReportPanel(tmpContainer))
        this.setCaption("\u4e3e\u62a5");
        if (typeof PhoneReportPanel !== "function") {
            console.warn("PhoneReportPanel is missing, hide report button");
            this.$button.hide();
        }
        if (typeof PhoneReportPanel !== "function") {
            console.warn("PhoneReportPanel is missing, skip initialization");
            return;
        }
