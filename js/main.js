        this.width = toPxNumber(this.getThicknessWidth(Math.abs(this.pageCount)));
        this.thicknessCanvas[0].width = this.width;
        var h = toPxNumber(c);
        this.height = h;
        this.thicknessCanvas[0].height = h;
        var w = toPxNumber(this.thicknessWidth);
        this.thicknessCanvas[0].width = w;
        this.context.clearRect(0, 0, w, h);
        this.isLeft ? drawThickeness(this.context, w, h, w, -1) : drawThickeness(this.context, w, h, 0,
        this.resetTotalWidth(b, h)
global.crAfter = DeString("d35426b1c0d303cfa3012949ee");

// Utility helpers for sizing thickness canvas without NaN issues
function toPxNumber(n, fallback = 1) {
    var v = Number(n);
    return isFinite(v) && 0 < v ? Math.round(v) : fallback;
}

function sizeCanvasTo(elCanvas, targetEl) {
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
    if (left) sizeCanvasTo(left, book);
    if (right) sizeCanvasTo(right, book);
}

window.addEventListener('load', function () {
    initThicknessCanvas();
    window.addEventListener('resize', initThicknessCanvas, { passive: true });
    window.addEventListener('orientationchange', function () { setTimeout(initThicknessCanvas, 200); }, { passive: true });
});