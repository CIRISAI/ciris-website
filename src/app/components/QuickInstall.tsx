"use client";
import { useState } from "react";
import Link from "next/link";

export default function QuickInstall() {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText("pip install ciris-agent");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="my-16 rounded-lg border-2 border-brand-primary bg-gradient-to-br from-gray-50 to-white p-8 dark:from-gray-900 dark:to-black">
      <div className="text-center">
        <h2 className="text-brand-primary mb-2 text-3xl font-bold">
          Quick Install
        </h2>
        <p className="mb-6 text-gray-600 dark:text-gray-400">
          Get started with CIRIS in seconds
        </p>

        <div className="relative mx-auto max-w-2xl">
          <pre className="overflow-x-auto rounded-md bg-gray-900 p-4 text-left text-sm text-gray-100">
            <code>pip install ciris-agent</code>
          </pre>
          <button
            onClick={copyToClipboard}
            className="absolute right-2 top-2 rounded-md bg-gray-700 px-3 py-1 text-xs text-white transition-colors hover:bg-gray-600"
          >
            {copied ? "✓ Copied!" : "Copy"}
          </button>
        </div>

        <p className="mt-4 text-sm text-gray-500 dark:text-gray-400">
          Windows, macOS, and Linux supported | Python 3.9+
        </p>

        <Link
          href="/install"
          className="text-brand-primary hover:text-brand-primary/80 mt-4 inline-block font-semibold transition-colors"
        >
          See all 5 installation methods →
        </Link>
      </div>
    </div>
  );
}
