"use client";
import { useEffect, useState } from "react";
import { FloatingNav } from "@/app/components/ui/floating/nav";
import Footer from "@/app/components/Footer";
import navItems from "@/app/components/navitems";

interface CanaryData {
  canary: {
    version: string;
    timestamp: string;
    valid_until: string | null;
    statements: string[];
    signer: {
      wa_id: string;
      role: string;
    };
  };
  signature: string;
  public_key: string;
  verify_instructions: string;
}

export default function CanaryPage() {
  const [data, setData] = useState<CanaryData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState<string | null>(null);

  useEffect(() => {
    fetch("/canary.json")
      .then((res) => res.json())
      .then(setData)
      .catch((err) => setError(err.message));
  }, []);

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopied(label);
    setTimeout(() => setCopied(null), 2000);
  };

  const formatDate = (iso: string) => {
    return new Date(iso).toLocaleString("en-US", {
      dateStyle: "full",
      timeStyle: "long",
    });
  };

  // Calculate days since last update
  const daysSinceUpdate = data
    ? Math.floor(
        (Date.now() - new Date(data.canary.timestamp).getTime()) /
          (1000 * 60 * 60 * 24)
      )
    : 0;

  const isStale = daysSinceUpdate > 90;

  return (
    <>
      <FloatingNav navItems={navItems} />
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-black">
        <div className="mx-auto max-w-4xl px-6 pt-44 pb-16">
          {/* Hero */}
          <div className="mb-12">
            <h1 className="text-5xl font-bold tracking-tight text-gray-900 dark:text-white">
              Warrant Canary
            </h1>
            <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
              Cryptographically signed statement of what we have not received.
            </p>
          </div>

          {error && (
            <div className="mb-8 rounded-lg border-2 border-red-500 bg-red-50 p-6 dark:bg-red-900/20">
              <p className="text-red-700 dark:text-red-300">
                Failed to load canary: {error}
              </p>
            </div>
          )}

          {data && (
            <>
              {/* Status Badge */}
              <div
                className={`mb-8 rounded-lg border-2 p-6 ${
                  isStale
                    ? "border-red-500 bg-red-50 dark:bg-red-900/20"
                    : "border-green-500 bg-green-50 dark:bg-green-900/20"
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span
                      className={`inline-block h-4 w-4 rounded-full ${
                        isStale ? "bg-red-500" : "bg-green-500"
                      }`}
                    />
                    <span
                      className={`text-xl font-bold ${
                        isStale
                          ? "text-red-800 dark:text-red-300"
                          : "text-green-800 dark:text-green-300"
                      }`}
                    >
                      {isStale ? "STALE - Assume Compromised" : "All Clear"}
                    </span>
                  </div>
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    {daysSinceUpdate} days ago
                  </span>
                </div>
                <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                  Last signed: {formatDate(data.canary.timestamp)}
                </p>
                {isStale && (
                  <p className="mt-2 text-sm font-medium text-red-700 dark:text-red-300">
                    This canary has not been updated in over 90 days. Per EFF
                    guidance, you should assume it is no longer valid.
                  </p>
                )}
              </div>

              {/* Statements */}
              <div className="mb-8">
                <h2 className="mb-4 text-2xl font-bold text-gray-900 dark:text-white">
                  Statements
                </h2>
                <div className="rounded-lg border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-800">
                  <p className="mb-4 text-sm text-gray-500 dark:text-gray-400">
                    As of {formatDate(data.canary.timestamp)}, CIRIS L3C affirms:
                  </p>
                  <ul className="space-y-3">
                    {data.canary.statements.map((statement, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <span className="text-green-600 dark:text-green-400 mt-0.5">
                          ✓
                        </span>
                        <span className="text-gray-700 dark:text-gray-300">
                          {statement}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Cryptographic Proof */}
              <div className="mb-8">
                <h2 className="mb-4 text-2xl font-bold text-gray-900 dark:text-white">
                  Cryptographic Proof
                </h2>

                <div className="space-y-4">
                  {/* Signature */}
                  <div className="rounded-lg border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-800">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-semibold text-gray-900 dark:text-white">
                        Ed25519 Signature
                      </h3>
                      <button
                        onClick={() =>
                          copyToClipboard(data.signature, "signature")
                        }
                        className="text-sm text-brand-primary hover:underline"
                      >
                        {copied === "signature" ? "Copied!" : "Copy"}
                      </button>
                    </div>
                    <code className="block overflow-x-auto rounded bg-gray-100 p-3 text-xs text-gray-800 dark:bg-gray-900 dark:text-gray-300">
                      {data.signature}
                    </code>
                  </div>

                  {/* Public Key */}
                  <div className="rounded-lg border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-800">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-semibold text-gray-900 dark:text-white">
                        Public Key (base64url)
                      </h3>
                      <button
                        onClick={() =>
                          copyToClipboard(data.public_key, "pubkey")
                        }
                        className="text-sm text-brand-primary hover:underline"
                      >
                        {copied === "pubkey" ? "Copied!" : "Copy"}
                      </button>
                    </div>
                    <code className="block overflow-x-auto rounded bg-gray-100 p-3 text-xs text-gray-800 dark:bg-gray-900 dark:text-gray-300">
                      {data.public_key}
                    </code>
                    <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
                      Verify against:{" "}
                      <a
                        href="https://github.com/CIRISAI/CIRISAgent/blob/main/seed/root_pub.json"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-brand-primary hover:underline"
                      >
                        CIRISAgent/seed/root_pub.json
                      </a>
                    </p>
                  </div>

                  {/* Signer Info */}
                  <div className="rounded-lg border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-800">
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                      Signer
                    </h3>
                    <div className="text-sm text-gray-700 dark:text-gray-300">
                      <p>
                        <span className="text-gray-500 dark:text-gray-400">
                          WA ID:
                        </span>{" "}
                        {data.canary.signer.wa_id}
                      </p>
                      <p>
                        <span className="text-gray-500 dark:text-gray-400">
                          Role:
                        </span>{" "}
                        {data.canary.signer.role}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Verification Instructions */}
              <div className="mb-8">
                <h2 className="mb-4 text-2xl font-bold text-gray-900 dark:text-white">
                  How to Verify
                </h2>
                <div className="rounded-lg border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-800">
                  <ol className="list-decimal list-inside space-y-3 text-sm text-gray-700 dark:text-gray-300">
                    <li>
                      Download the raw canary:{" "}
                      <a
                        href="/canary.json"
                        className="text-brand-primary hover:underline"
                      >
                        /canary.json
                      </a>
                    </li>
                    <li>
                      Extract the <code className="bg-gray-100 px-1 rounded dark:bg-gray-700">canary</code> object
                    </li>
                    <li>
                      Serialize it as compact JSON with sorted keys:{" "}
                      <code className="bg-gray-100 px-1 rounded dark:bg-gray-700">
                        JSON.stringify(canary, Object.keys(canary).sort())
                      </code>
                    </li>
                    <li>
                      Decode the base64url <code className="bg-gray-100 px-1 rounded dark:bg-gray-700">signature</code> and{" "}
                      <code className="bg-gray-100 px-1 rounded dark:bg-gray-700">public_key</code>
                    </li>
                    <li>
                      Verify the Ed25519 signature over the serialized message
                    </li>
                  </ol>

                  <div className="mt-6">
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                      Python Example
                    </h4>
                    <pre className="overflow-x-auto rounded bg-gray-100 p-4 text-xs text-gray-800 dark:bg-gray-900 dark:text-gray-300">
{`import json, base64
from nacl.signing import VerifyKey

# Load canary.json
with open("canary.json") as f:
    data = json.load(f)

# Recreate signed message
message = json.dumps(data["canary"], sort_keys=True, separators=(",", ":"))

# Decode base64url (add padding if needed)
def b64url_decode(s):
    s += "=" * (4 - len(s) % 4)
    return base64.urlsafe_b64decode(s)

sig = b64url_decode(data["signature"])
pub = b64url_decode(data["public_key"])

# Verify
verify_key = VerifyKey(pub)
verify_key.verify(message.encode(), sig)
print("Signature valid!")`}
                    </pre>
                  </div>
                </div>
              </div>

              {/* Raw JSON */}
              <div className="mb-8">
                <h2 className="mb-4 text-2xl font-bold text-gray-900 dark:text-white">
                  Raw Canary Document
                </h2>
                <div className="rounded-lg border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-800">
                  <div className="flex justify-end mb-2">
                    <button
                      onClick={() =>
                        copyToClipboard(JSON.stringify(data, null, 2), "json")
                      }
                      className="text-sm text-brand-primary hover:underline"
                    >
                      {copied === "json" ? "Copied!" : "Copy JSON"}
                    </button>
                  </div>
                  <pre className="overflow-x-auto rounded bg-gray-100 p-4 text-xs text-gray-800 dark:bg-gray-900 dark:text-gray-300">
                    {JSON.stringify(data, null, 2)}
                  </pre>
                </div>
              </div>
            </>
          )}

          {/* Footer Links */}
          <div className="mt-12 flex flex-col gap-4 sm:flex-row sm:justify-center">
            <a
              href="/safety-policy"
              className="inline-block rounded-lg bg-brand-primary px-8 py-4 text-center text-lg font-semibold text-white transition-colors hover:bg-brand-primary/80"
            >
              Safety Policy
            </a>
            <a
              href="/canary.json"
              className="inline-block rounded-lg border-2 border-brand-primary px-8 py-4 text-center text-lg font-semibold text-brand-primary transition-colors hover:bg-brand-primary/10"
            >
              Download Raw JSON
            </a>
          </div>

          {/* Footer */}
          <div className="mt-12 border-t border-gray-200 pt-8 text-center text-sm text-gray-500 dark:border-gray-700 dark:text-gray-400">
            <p>CIRIS - Ethical AI by Design</p>
            <p className="mt-2">© 2025 Eric Moore and CIRIS L3C | Apache 2.0 License</p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
