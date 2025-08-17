import argparse
from pathlib import Path

from PIL import Image


def png_to_webp(input_dir: str, output_dir: str | None = None, quality: int = 80) -> None:
    """Compress PNG images to WebP format."""
    src = Path(input_dir)
    dst = Path(output_dir) if output_dir else src
    dst.mkdir(parents=True, exist_ok=True)

    for png_path in src.glob("*.png"):
        with Image.open(png_path) as img:
            out_path = dst / f"{png_path.stem}.webp"
            img.save(out_path, "webp", quality=quality)
            print(f"Saved {out_path}")


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Convert PNG files to WebP.")
    parser.add_argument("input_dir", help="Directory containing PNG files")
    parser.add_argument("-o", "--output", help="Output directory")
    parser.add_argument("-q", "--quality", type=int, default=80, help="WebP quality (0-100)")
    args = parser.parse_args()
    png_to_webp(args.input_dir, args.output, args.quality)
