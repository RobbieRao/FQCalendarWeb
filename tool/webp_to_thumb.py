import argparse
from pathlib import Path

from PIL import Image


def webp_to_thumbs(input_dir: str, output_dir: str | None = None, size: int = 200) -> None:
    """Generate WebP thumbnails from WebP images."""
    src = Path(input_dir)
    dst = Path(output_dir) if output_dir else src / "thumbs"
    dst.mkdir(parents=True, exist_ok=True)

    for webp_path in src.glob("*.webp"):
        with Image.open(webp_path) as img:
            img.thumbnail((size, size))
            out_path = dst / f"{webp_path.stem}.webp"
            img.save(out_path, "webp", quality=80)
            print(f"Saved {out_path}")


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Generate thumbnails from WebP images.")
    parser.add_argument("input_dir", help="Directory containing WebP files")
    parser.add_argument("-o", "--output", help="Output directory (default: <input>/thumbs)")
    parser.add_argument("-s", "--size", type=int, default=200, help="Maximum thumbnail dimension")
    args = parser.parse_args()
    webp_to_thumbs(args.input_dir, args.output, args.size)
