// 书本目录，如果无ols变量则无目录，ols 变量名勿删，全局共享
// 图片资源以 1 开始命名，因此从 1 起算，避免移动端加载不到首页。
var PAGE_START = 1;
var PAGE_END = 69;
var ols = [];
for (var i = PAGE_START; i <= PAGE_END; i++) {
  ols.push({
    // 目录标题从 1 开始计算，与图片文件编号一致
    caption: "第" + i + "页",
    page: String(i),
  });
}

// 路径配置
var loadImgpath = "./files/thumb/";

bookConfig.largePath = loadImgpath;    // 大图路径
bookConfig.normalPath = loadImgpath;
bookConfig.thumbPath = loadImgpath;
bookConfig.totalPageCount = ols.length;    // 页面数量

// 使用预设尺寸，避免额外请求首张图片，加快启动速度
if (typeof onStageResize === 'function') {
  onStageResize();
}
