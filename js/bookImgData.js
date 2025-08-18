// 书本目录，如果无ols变量则无目录，ols 变量名勿删，全局共享
var PAGE_START = 0;
var PAGE_END = 68;
var ols = [];
for (var i = PAGE_START; i <= PAGE_END; i++) {
  ols.push({
    caption: "第" + (i + 1) + "页",
    page: String(i),
  });
}

// 路径配置
var loadImgpath = "./files/thumb/"

bookConfig.largePath = loadImgpath    // 大图路径
bookConfig.normalPath = loadImgpath
bookConfig.thumbPath = loadImgpath
bookConfig.totalPageCount = ols.length    // 页面数量