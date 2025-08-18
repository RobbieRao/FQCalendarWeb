// 书本目录，如果无ols变量则无目录，ols 变量名勿删，全局共享
var ols = [];
for (var i = 0; i <= 68; i++) {
  ols.push({
    caption: "页面 " + i,
    page: String(i),
  });
}

// 路径配置
var loadImgpath = "./files/thumb/";

bookConfig.largePath = loadImgpath; // 大图路径
bookConfig.normalPath = loadImgpath;
bookConfig.thumbPath = loadImgpath;
bookConfig.totalPageCount = ols.length; // 页面数量

// 根据首张图片尺寸自适应页面大小
(function () {
  var img = new Image();
  img.onload = function () {
    bookConfig.largePageWidth = img.width;
    bookConfig.largePageHeight = img.height;
  };
  img.src = loadImgpath + "0.png";
})();

