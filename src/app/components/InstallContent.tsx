// Shared install-page body, driven by a per-locale dictionary. Both the English
// root (src/app/install/page.tsx) and the localized routes
// (src/app/[locale]/install/page.tsx) render this with their own dictionary —
// one content component, two thin entry points, no duplicated markup.
//
// Strings that carry typographic emphasis (<strong>, <code>, inline <a>) are
// stored as HTML in the dictionary and injected with dangerouslySetInnerHTML.
// The content is authored and machine-translated by us (never user input), so
// this is safe; translators are instructed to preserve the tags.

"use client";
import { useState } from "react";
import { FloatingNav } from "@/app/components/ui/floating/nav";
import Footer from "@/app/components/Footer";
import navItems from "@/app/components/navitems";
import LanguageSwitcher from "@/app/components/LanguageSwitcher";
import MachineTranslationBanner from "@/app/components/MachineTranslationBanner";
import type { Dictionary } from "@/i18n/dictionaries";
import { DEFAULT_LOCALE } from "@/i18n/config";

/** Inline raw HTML from the dictionary into `html`. */
const h = (html: string) => ({ __html: html });

export default function InstallContent({ t }: { t: Dictionary }) {
  const locale = t._meta.locale;
  const isLocalized = locale !== DEFAULT_LOCALE;

  const [copiedPip, setCopiedPip] = useState(false);
  const [copiedDocker, setCopiedDocker] = useState(false);
  const [copiedGit, setCopiedGit] = useState(false);

  const copyToClipboard = (text: string, setter: (val: boolean) => void) => {
    navigator.clipboard.writeText(text);
    setter(true);
    setTimeout(() => setter(false), 2000);
  };

  const pipCommand = "pip install ciris-agent";
  const dockerCommand = "docker compose up -d";
  const gitCommand = "git clone https://github.com/CIRISAI/CIRISAgent.git";

  return (
    <>
      <FloatingNav navItems={navItems} locale={locale} />
      {isLocalized && (
        <MachineTranslationBanner
          lead={t.common.mtBanner.lead}
          body={t.common.mtBanner.body}
          cta={t.common.mtBanner.cta}
        />
      )}
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-black">
        <div className="mx-auto max-w-4xl px-6 pt-44 pb-16">
          {/* Hero */}
          <div className="text-center">
            <h1 className="text-5xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-6xl">
              {t.install.h1}
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-700 dark:text-gray-200 max-w-2xl mx-auto">
              {t.install.heroPara1}
            </p>
            <p className="mt-3 text-base text-gray-600 dark:text-gray-400">
              {t.install.heroPara2}
            </p>
          </div>

          {/* Android App NOW AVAILABLE */}
          <div className="mt-8 rounded-lg border-2 border-green-500 bg-green-50 p-6 dark:border-green-400 dark:bg-green-900/20">
            <div className="text-center">
              <p className="text-lg font-bold text-gray-900 dark:text-white">
                {t.install.mobileBannerTitle}
              </p>
              <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                {t.install.mobileBannerSub}
              </p>
            </div>
            <div className="mt-4 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
              <a
                href="https://apps.apple.com/us/app/cirisagent/id6758524415"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg bg-black px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-gray-800"
              >
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
                </svg>
                {t.install.appStoreLabel}
              </a>
              <a
                href="https://play.google.com/store/apps/details?id=ai.ciris.mobile"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg bg-black px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-gray-800"
              >
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M3.609 1.814L13.792 12 3.61 22.186a.996.996 0 0 1-.61-.92V2.734a1 1 0 0 1 .609-.92zm10.89 10.893l2.302 2.302-10.937 6.333 8.635-8.635zm3.199-3.198l2.807 1.626a1 1 0 0 1 0 1.73l-2.808 1.626L15.206 12l2.492-2.491zM5.864 2.658L16.8 8.99l-2.302 2.302-8.634-8.634z"/>
                </svg>
                {t.install.googlePlayLabel}
              </a>
            </div>
          </div>

          {/* Method 1: pip (Preferred) */}
          <div className="mt-12">
            <div className="rounded-lg border-2 border-green-500 bg-green-50 p-6 shadow-lg dark:border-green-400 dark:bg-green-900/20">
              <div className="mb-2 flex items-center gap-2">
                <span className="rounded-full bg-green-600 px-2 py-1 text-xs font-semibold text-white">
                  {t.install.recommendedBadge}
                </span>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                  {t.install.method1Heading}
                </h2>
              </div>
              <p className="mb-4 text-sm text-gray-700 dark:text-gray-300">
                {t.install.method1Desc}
              </p>
              <div className="relative">
                <pre className="overflow-x-auto rounded-md bg-gray-900 p-4 text-sm text-gray-100">
                  <code>{pipCommand}</code>
                </pre>
                <button
                  onClick={() => copyToClipboard(pipCommand, setCopiedPip)}
                  className="absolute right-2 top-2 rounded-md bg-gray-700 px-3 py-1 text-xs text-white hover:bg-gray-600 transition-colors"
                >
                  {copiedPip ? t.install.copiedBtn : t.install.copyBtn}
                </button>
              </div>
              <div className="mt-4 rounded-md bg-green-100 p-3 dark:bg-green-900/40">
                <p className="text-sm text-gray-700 dark:text-gray-300" dangerouslySetInnerHTML={h(t.install.method1ThenRun)} />
              </div>
              <div className="mt-3 text-xs text-gray-600 dark:text-gray-400" dangerouslySetInnerHTML={h(t.install.method1Req)} />
            </div>
          </div>

          {/* Other Methods */}
          <div className="mt-12">
            <h2 className="mb-6 text-2xl font-bold text-gray-900 dark:text-white">
              {t.install.otherMethodsHeading}
            </h2>

            <div className="space-y-6">
              {/* Method 2: Docker */}
              <div className="rounded-lg border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-800">
                <h3 className="mb-3 text-xl font-semibold text-gray-900 dark:text-white">
                  {t.install.method2Heading}
                </h3>
                <p className="mb-3 text-sm text-gray-600 dark:text-gray-400">
                  {t.install.method2Desc}
                </p>
                <div className="relative">
                  <pre className="overflow-x-auto rounded-md bg-gray-900 p-4 text-sm text-gray-100">
                    <code>{dockerCommand}</code>
                  </pre>
                  <button
                    onClick={() => copyToClipboard(dockerCommand, setCopiedDocker)}
                    className="absolute right-2 top-2 rounded-md bg-gray-700 px-3 py-1 text-xs text-white hover:bg-gray-600 transition-colors"
                  >
                    {copiedDocker ? t.install.copiedBtn : t.install.copyBtn}
                  </button>
                </div>
                <div className="mt-3 text-xs text-gray-600 dark:text-gray-400" dangerouslySetInnerHTML={h(t.install.method2Req)} />
              </div>

              {/* Method 3: GitHub Clone */}
              <div className="rounded-lg border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-800">
                <h3 className="mb-3 text-xl font-semibold text-gray-900 dark:text-white">
                  {t.install.method3Heading}
                </h3>
                <p className="mb-3 text-sm text-gray-600 dark:text-gray-400">
                  {t.install.method3Desc}
                </p>
                <div className="relative">
                  <pre className="overflow-x-auto rounded-md bg-gray-900 p-4 text-sm text-gray-100">
                    <code>{gitCommand}</code>
                  </pre>
                  <button
                    onClick={() => copyToClipboard(gitCommand, setCopiedGit)}
                    className="absolute right-2 top-2 rounded-md bg-gray-700 px-3 py-1 text-xs text-white hover:bg-gray-600 transition-colors"
                  >
                    {copiedGit ? t.install.copiedBtn : t.install.copyBtn}
                  </button>
                </div>
                <div className="mt-3 rounded-md bg-gray-100 p-3 dark:bg-gray-700">
                  <p className="text-xs text-gray-700 dark:text-gray-300" dangerouslySetInnerHTML={h(t.install.method3Then)} />
                </div>
              </div>

              {/* Method 4: CIRISManager */}
              <div className="rounded-lg border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-800">
                <h3 className="mb-3 text-xl font-semibold text-gray-900 dark:text-white">
                  {t.install.method4Heading}
                </h3>
                <p className="mb-3 text-sm text-gray-600 dark:text-gray-400">
                  {t.install.method4Desc}
                </p>
                <div className="rounded-md bg-gray-100 p-4 dark:bg-gray-700">
                  <p className="text-sm text-gray-700 dark:text-gray-300">
                    {t.install.method4Body}
                  </p>
                </div>
                <div className="mt-3 text-xs text-gray-600 dark:text-gray-400" dangerouslySetInnerHTML={h(t.install.method4Best)} />
              </div>
            </div>
          </div>

          {/* Hello World */}
          <div className="mt-12">
            <h2 className="mb-2 text-2xl font-bold text-gray-900 dark:text-white">
              {t.install.helloHeading}
            </h2>
            <p className="mb-6 text-sm text-gray-600 dark:text-gray-400">
              {t.install.helloSub}
            </p>

            <div className="grid gap-4 lg:grid-cols-2">
              <div className="rounded-lg border border-gray-200 bg-white p-5 dark:border-gray-700 dark:bg-gray-800">
                <h3 className="mb-2 text-base font-semibold text-gray-900 dark:text-white">
                  {t.install.helloStep1Heading}
                </h3>
                <p className="mb-3 text-sm text-gray-600 dark:text-gray-400">
                  {t.install.helloStep1Desc}
                </p>
                <pre className="overflow-x-auto rounded-md bg-gray-900 p-3 text-xs text-gray-100">
{`pip install ciris-agent
ciris-agent --adapter api --port 8080`}
                </pre>
              </div>

              <div className="rounded-lg border border-gray-200 bg-white p-5 dark:border-gray-700 dark:bg-gray-800">
                <h3 className="mb-2 text-base font-semibold text-gray-900 dark:text-white">
                  {t.install.helloStep2Heading}
                </h3>
                <p className="mb-3 text-sm text-gray-600 dark:text-gray-400" dangerouslySetInnerHTML={h(t.install.helloStep2Desc)} />
                <pre className="overflow-x-auto rounded-md bg-gray-900 p-3 text-xs text-gray-100">
{`pip install ciris-sdk

# hello_ciris.py
import asyncio
from ciris_sdk import CIRISClient

async def main():
    async with CIRISClient(
        base_url="http://localhost:8080",
    ) as client:
        response = await client.interact(
            "Hello, CIRIS!"
        )
        print(response.response)
        print(
            f"[{response.state}] "
            f"{response.processing_time_ms}ms"
        )

asyncio.run(main())`}
                </pre>
              </div>
            </div>

            <p className="mt-4 text-xs text-gray-500 dark:text-gray-400" dangerouslySetInnerHTML={h(t.install.sdkNote)} />
          </div>

          {/* Troubleshooting */}
          <div className="mt-12">
            <h2 className="mb-6 text-2xl font-bold text-gray-900 dark:text-white">
              {t.install.troubleshootingHeading}
            </h2>
            <div className="space-y-4">
              <details className="rounded-lg border border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800">
                <summary className="cursor-pointer p-4 font-semibold text-gray-900 dark:text-white">
                  {t.install.ts1Summary}
                </summary>
                <div className="border-t border-gray-200 p-4 text-sm text-gray-600 dark:border-gray-700 dark:text-gray-300">
                  <p className="mb-2">{t.install.ts1Step1}</p>
                  <pre className="overflow-x-auto rounded-md bg-gray-900 p-2 text-xs text-gray-100">
                    python --version
                  </pre>
                  <p className="mt-2">{t.install.ts1Step2}</p>
                  <pre className="mt-1 overflow-x-auto rounded-md bg-gray-900 p-2 text-xs text-gray-100">
                    pip install --upgrade pip
                  </pre>
                </div>
              </details>

              <details className="rounded-lg border border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800">
                <summary className="cursor-pointer p-4 font-semibold text-gray-900 dark:text-white">
                  {t.install.ts2Summary}
                </summary>
                <div className="border-t border-gray-200 p-4 text-sm text-gray-600 dark:border-gray-700 dark:text-gray-300">
                  <p className="mb-2">{t.install.ts2Step1}</p>
                  <pre className="overflow-x-auto rounded-md bg-gray-900 p-2 text-xs text-gray-100">
                    docker logs ciris-agent
                  </pre>
                  <p className="mt-2">{t.install.ts2Step2}</p>
                  <pre className="mt-1 overflow-x-auto rounded-md bg-gray-900 p-2 text-xs text-gray-100">
                    docker compose -f ~/ciris/docker-compose.yml ps
                  </pre>
                </div>
              </details>

              <details className="rounded-lg border border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800">
                <summary className="cursor-pointer p-4 font-semibold text-gray-900 dark:text-white">
                  {t.install.ts3Summary}
                </summary>
                <div className="border-t border-gray-200 p-4 text-sm text-gray-600 dark:border-gray-700 dark:text-gray-300">
                  <ul className="space-y-2">
                    <li>
                      📖{" "}
                      <a
                        href="https://github.com/CIRISAI/CIRISAgent/blob/main/docs/README.md"
                        className="text-blue-600 hover:underline dark:text-blue-400"
                      >
                        {t.install.ts3Link1}
                      </a>
                    </li>
                    <li>
                      🐛{" "}
                      <a
                        href="https://github.com/CIRISAI/CIRISAgent/issues"
                        className="text-blue-600 hover:underline dark:text-blue-400"
                      >
                        {t.install.ts3Link2}
                      </a>
                    </li>
                    <li>
                      💬{" "}
                      <a
                        href="https://discord.gg/SWGM7Gsvrv"
                        className="text-blue-600 hover:underline dark:text-blue-400"
                      >
                        {t.install.ts3Link3}
                      </a>
                    </li>
                  </ul>
                </div>
              </details>
            </div>
          </div>
        </div>
      </div>
      <Footer locale={locale} />
      <LanguageSwitcher currentLocale={locale} />
    </>
  );
}
