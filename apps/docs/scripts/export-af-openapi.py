from __future__ import annotations

import json
import os
import sys
from pathlib import Path


def main() -> int:
    api_root = Path(os.environ.get("AF_API_ROOT", "../../../af_api")).resolve()
    output_path = Path(os.environ.get("AF_OPENAPI_OUTPUT", "openapi/af-api.json")).resolve()

    if not api_root.exists():
        raise FileNotFoundError(f"AF API root was not found: {api_root}")

    sys.path.insert(0, str(api_root))

    import main as af_main  # noqa: PLC0415

    schema = af_main.app.openapi()
    schema["info"]["title"] = "AF API"
    schema["info"]["description"] = "FastAPI backend for AF mobile application."

    output_path.parent.mkdir(parents=True, exist_ok=True)
    output_path.write_text(
        json.dumps(schema, ensure_ascii=False, indent=2) + "\n",
        encoding="utf-8",
    )
    print(f"Wrote AF OpenAPI schema to {output_path}")

    return 0


if __name__ == "__main__":
    raise SystemExit(main())
