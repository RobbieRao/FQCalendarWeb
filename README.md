# FQCalendarWeb

静态 3D 电子画册示例。将图片按 `1.webp`, `2.webp` … 命名后放入 `content/` 目录中，再在浏览器中打开 `index.html` 体验翻页效果。点击右侧工具栏的 **缩略图** 按钮可以预览所有页面的缩略图并快速跳转。

## 图片处理工具

`tool/` 目录提供了三个便捷的 Python 脚本帮助处理图片：

| 脚本 | 功能 |
|------|------|
| `psd_to_png.py` | 将指定目录中的 PSD 文件批量转换为 PNG |
| `png_to_webp.py` | 将 PNG 压缩为 WebP 格式（默认质量 80） |
| `webp_to_thumb.py` | 将 WebP 进一步转换为缩略图，默认输出到 `<输入目录>/thumbs` |

示例流程：

```bash
# 1. PSD 转 PNG
python tool/psd_to_png.py assets/psd -o assets/png

# 2. PNG 转 WebP
python tool/png_to_webp.py assets/png -o content

# 3. 生成缩略图
python tool/webp_to_thumb.py content
```

最终将生成的 `1.webp`, `2.webp` … 以及对应的 `thumbs/1.webp`, `thumbs/2.webp` … 放在 `content/` 中即可。

需要依赖 [psd-tools](https://pypi.org/project/psd-tools/) 和 [Pillow](https://pypi.org/project/Pillow/)。
