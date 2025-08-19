(function() {
  function hidePanels() {
    if (window.frmSearch && frmSearch.visible) {
      frmSearch.hide();
    }
    if (window.frmTableOfContent && frmTableOfContent.visible) {
      frmTableOfContent.hide();
    }
    if (window.thumbnail && thumbnail.visible) {
      thumbnail.hide();
    }
  }
  if (/Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent)) {
    document.addEventListener('DOMContentLoaded', function() {
      setTimeout(hidePanels, 500);
    });
    window.addEventListener('load', hidePanels);
  }
})();
