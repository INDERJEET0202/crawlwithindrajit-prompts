#!/usr/bin/env python3
"""Remove hidden metadata (GPS location, camera details, EXIF/XMP) from JPEG files.

Phones save the exact GPS location inside every photo. Run this on any photo
before it goes on the website:

    python3 scripts/strip_metadata.py assets/images/**/*.jpg

Only JPEG metadata segments are removed; the image pixels are untouched.
"""
import sys

KEEP = {0xE0}  # APP0 (JFIF header) only; drop APP1 (EXIF/XMP, incl. GPS) … APP15, and comments


def strip(data: bytes) -> bytes:
    if data[:2] != b"\xff\xd8":
        raise ValueError("not a JPEG")
    out, i = bytearray(b"\xff\xd8"), 2
    while i < len(data):
        if data[i] != 0xFF:
            raise ValueError(f"bad marker at {i}")
        marker = data[i + 1]
        if marker == 0xDA:  # start of scan: the rest is image data
            out += data[i:]
            return bytes(out)
        length = int.from_bytes(data[i + 2:i + 4], "big")
        segment = data[i:i + 2 + length]
        is_meta = 0xE1 <= marker <= 0xEF or marker == 0xFE
        if not is_meta or marker in KEEP:
            out += segment
        i += 2 + length
    return bytes(out)


if __name__ == "__main__":
    for path in sys.argv[1:]:
        with open(path, "rb") as f:
            before = f.read()
        after = strip(before)
        with open(path, "wb") as f:
            f.write(after)
        print(f"{path}: removed {len(before) - len(after)} bytes of metadata")
