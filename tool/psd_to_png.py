import argparse
from pathlib import Path

from psd_tools import PSDImage


def psd_to_png(input_dir: str, output_dir: str | None = None) -> None:
    """Convert all PSD files in ``input_dir`` to PNG images.

    Parameters
    ----------
    input_dir: str
        Directory containing PSD files.
    output_dir: str, optional
        Directory to output PNG files. Defaults to ``input_dir``.
    """
    src = Path(input_dir)
    dst = Path(output_dir) if output_dir else src
    dst.mkdir(parents=True, exist_ok=True)

    for psd_path in src.glob("*.psd"):
        psd = PSDImage.open(psd_path)
        # ``PSDImage.compose`` was renamed to ``PSDImage.composite`` in
        # psd-tools 1.9.0.  The older name no longer exists in recent
        # versions, so use ``composite`` to build the flattened image.
        image = psd.composite()
        out_path = dst / f"{psd_path.stem}.png"
        image.save(out_path)
        print(f"Saved {out_path}")


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Convert PSD files to PNG.")
    parser.add_argument("input_dir", help="Directory containing PSD files")
    parser.add_argument("-o", "--output", help="Output directory")
    args = parser.parse_args()
    psd_to_png(args.input_dir, args.output)
