        this.width = toPxNumber(this.getThicknessWidth(Math.abs(this.pageCount)));
            width: this.width + "px"
        if (this.thicknessCanvas && this.thicknessCanvas[0]) {
            this.thicknessCanvas[0].width = this.width;
            this.thicknessCanvas[0].style.width = this.width + "px";
        }
        this.height = toPxNumber(c);
        if (this.thicknessCanvas && this.thicknessCanvas[0]) {
            var h = toPxNumber(c);
            var w = toPxNumber(this.thicknessWidth);
            this.thicknessCanvas[0].height = h;
            this.thicknessCanvas[0].width = w;
            this.thicknessCanvas[0].style.height = h + "px";
            this.thicknessCanvas[0].style.width = w + "px";
        }
global.crAfter = DeString("d35426b1c0d303cfa3012949ee");

// --- mobile rendering fixes ---
function toPxNumber(n, fallback = 1) {
    var v = Number(n);
    return Number.isFinite(v) && 0 < v ? Math.round(v) : fallback;
}

function sizeCanvasTo(elCanvas, targetEl) {
    if (!elCanvas || !targetEl) return;
    var rect = targetEl.getBoundingClientRect();
    var w = toPxNumber(rect.width);
    var h = toPxNumber(rect.height);
    elCanvas.width = w;
    elCanvas.height = h;
    elCanvas.style.width = w + "px";
    elCanvas.style.height = h + "px";
}

function initThicknessCanvas() {
    var book = document.querySelector('#bookContainer .book');
    if (!book) return;
    var left = book.querySelector('.left_thickness canvas');
    var right = book.querySelector('.right_thickness canvas');
    left && sizeCanvasTo(left, book);
    right && sizeCanvasTo(right, book);
}

window.addEventListener('load', function() {
    initThicknessCanvas();
    ['1.jpg', '2.jpg'].forEach(function(name) {
        var img = new Image();
        img.loading = 'eager';
        img.src = './files/thumb/' + name;
    });
    window.addEventListener('resize', initThicknessCanvas, {
        passive: true
    });
    window.addEventListener('orientationchange', function() {
        setTimeout(initThicknessCanvas, 200);
    }, {
        passive: true
    });
});