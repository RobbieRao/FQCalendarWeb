import os

folder = os.getcwd()
files = [f for f in os.listdir(folder) if f.lower().endswith(".jpg")]

# 第一步：加后缀，避免覆盖
for f in files:
    old = os.path.join(folder, f)
    name, ext = os.path.splitext(f)
    tmp = os.path.join(folder, f"{name}_tmp{ext}")
    os.rename(old, tmp)

# 第二步：再统一改成目标名字
for f in os.listdir(folder):
    if f.endswith("_tmp.jpg"):
        old = os.path.join(folder, f)
        name = f.replace("_tmp.jpg", "")
        new = os.path.join(folder, str(int(name) + 1) + ".jpg")
        os.rename(old, new)
        print(f"{f} -> {os.path.basename(new)}")

print("批量重命名完成！")
