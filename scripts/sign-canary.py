#!/usr/bin/env python3
"""
Sign the CIRIS warrant canary with the root WA key.

Usage:
    python scripts/sign-canary.py > public/canary.json

Requires: pip install pynacl
"""

import json
import base64
from datetime import datetime, timezone
from pathlib import Path

try:
    from nacl.signing import SigningKey
except ImportError:
    print("Error: pynacl not installed. Run: pip install pynacl")
    exit(1)

# Canary statements - update these as needed
CANARY_STATEMENTS = [
    "We have NOT received any National Security Letters (NSLs)",
    "We have NOT received any orders under the Foreign Intelligence Surveillance Act (FISA)",
    "We have NOT been subject to any gag order preventing disclosure of government requests",
    "We have NOT placed any backdoors in our software or been asked to do so",
    "We have NOT provided any user data to government agencies",
    "We have NOT been compelled to modify CIRIS to weaken its ethical constraints",
]

# Key paths
PRIVATE_KEY_PATH = Path.home() / ".ciris" / "wa_keys" / "root_wa.key"
PUBLIC_KEY_PATH = Path.home() / "CIRISAgent" / "seed" / "root_pub.json"


def base64url_encode(data: bytes) -> str:
    """Encode bytes as base64url without padding."""
    return base64.urlsafe_b64encode(data).rstrip(b"=").decode("ascii")


def main():
    # Load private key
    if not PRIVATE_KEY_PATH.exists():
        print(f"Error: Private key not found at {PRIVATE_KEY_PATH}")
        exit(1)

    private_key_bytes = PRIVATE_KEY_PATH.read_bytes()
    signing_key = SigningKey(private_key_bytes)

    # Load public key info
    if PUBLIC_KEY_PATH.exists():
        pub_info = json.loads(PUBLIC_KEY_PATH.read_text())
        wa_id = pub_info.get("wa_id", "unknown")
        pubkey = pub_info.get("pubkey", "unknown")
    else:
        wa_id = "unknown"
        pubkey = base64url_encode(signing_key.verify_key.encode())

    # Create canary document
    timestamp = datetime.now(timezone.utc).isoformat()

    canary_doc = {
        "version": "1.0",
        "timestamp": timestamp,
        "valid_until": None,  # Updated each release or 90 days max
        "statements": CANARY_STATEMENTS,
        "signer": {
            "wa_id": wa_id,
            "role": "root",
        },
    }

    # Create canonical message for signing
    message = json.dumps(canary_doc, sort_keys=True, separators=(",", ":"))
    message_bytes = message.encode("utf-8")

    # Sign
    signed = signing_key.sign(message_bytes)
    signature = base64url_encode(signed.signature)

    # Output
    output = {
        "canary": canary_doc,
        "signature": signature,
        "public_key": pubkey,
        "verify_instructions": "To verify: decode base64url signature and public_key, verify Ed25519 signature over JSON.stringify(canary, sortKeys=true, compact=true)",
    }

    print(json.dumps(output, indent=2))


if __name__ == "__main__":
    main()
