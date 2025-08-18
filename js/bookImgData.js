// 书本目录，如果无ols变量则无目录，ols 变量名勿删，全局共享
var ols = [
  {
    "caption": "测试目录1",
    "page": "1"
  },
  {
    "caption": "测试目录2",
    "page": "2"
  },
  {
    "caption": "测试目录3",
    "page": "3"
  },
  {
    "caption": "测试目录4",
    "page": "4"
  }
];

// 路径配置
var contentPath = "./content/"; // 内容图片所在目录

bookConfig.largePath = contentPath;         // 大图路径
bookConfig.normalPath = contentPath;        // 普通图路径
bookConfig.thumbPath = contentPath + "thumbs/"; // 缩略图路径
bookConfig.totalPageCount = 69;             // 页面数量
