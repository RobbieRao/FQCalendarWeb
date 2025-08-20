# FQCalendarWeb 项目说明

FQCalendarWeb 提供 **FQ凯丰月历**，以翻页杂志的形式浏览图片，可配置页面资源。

## 目录结构

### 根目录
- `index.html`：项目入口，加载页面样式和脚本【F:index.html†L1-L42】

### `css/`
- `style.css`：页面基础样式与翻页组件布局【F:css/style.css†L1-L18】
- `player.css`：视频播放控件样式【F:css/player.css†L1-L27】
- `phoneTemplate.css`：移动端缩略图条及按钮样式【F:css/phoneTemplate.css†L1-L37】
- `template.css`：压缩后的通用模板样式

### `js/`
- `config.js`：阅读器核心配置与多语言映射【F:js/config.js†L1-L58】
- `bookImgData.js`：定义页面数量与图片路径，并在初始化时调整页面布局【F:js/bookImgData.js†L1-L23】
- `main.js`：翻页逻辑与界面交互脚本（压缩版）
- `check.js`：提供 SHA 相关函数等校验工具【F:js/check.js†L1-L1】
- `LoadingJS.js`：注入加载动画的样式和脚本【F:js/LoadingJS.js†L1-L1】
- `jquery.js`：jQuery 库文件

### 资源文件
- `images/`：界面图标与背景资源
- `voice/flipsound.ogg`：翻页音效
- `webp/`：示例页面图片

## 使用说明
1. 将图片资源放入 `webp/`，按数字命名。
2. 修改 `bookImgData.js` 中的 `PAGE_START`、`PAGE_END` 或 `loadImgpath` 以匹配资源路径。
3. 更新 `index.html` 中的版本号可避免浏览器缓存旧资源。
4. 直接打开 `index.html`，即可在浏览器中体验 3D 翻页效果。

### 移动端兼容
为确保在 iOS 等移动设备上能够正常加载电子杂志，`index.html` 中的脚本不再使用 `defer` 属性，以保证按顺序同步加载。


