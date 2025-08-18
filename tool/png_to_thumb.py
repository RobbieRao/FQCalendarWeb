import argparse
from pathlib import Path

from PIL import Image


def png_to_thumbs(
    input_dir: str, output_dir: str | None = None, size: int = 200, quality: int = 80
) -> None:
    """Generate WebP thumbnails from PNG images."""
    src = Path(input_dir)
    dst = Path(output_dir) if output_dir else src / "thumbs"
    dst.mkdir(parents=True, exist_ok=True)

    for png_path in src.glob("*.png"):
        if png_path.stem == "0":
            continue
        with Image.open(png_path) as img:
            img.thumbnail((size, size))
            out_path = dst / f"{png_path.stem}.webp"
            img.save(out_path, "webp", quality=quality)
            print(f"Saved {out_path}")


if __name__ == "__main__":
    parser = argparse.ArgumentParser(
        description="Generate WebP thumbnails from PNG images."
    )
    parser.add_argument("input_dir", help="Directory containing PNG files")
    parser.add_argument(
        "-o", "--output", help="Output directory (default: <input>/thumbs)"
    )
    parser.add_argument(
        "-s", "--size", type=int, default=200, help="Maximum thumbnail dimension"
    )
    parser.add_argument(
        "-q", "--quality", type=int, default=80, help="WebP quality (0-100)"
    )
    args = parser.parse_args()
    png_to_thumbs(args.input_dir, args.output, args.size, args.quality)
