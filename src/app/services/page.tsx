"use client";
import { FloatingNav } from "@/app/components/ui/floating/nav";
import Footer from "@/app/components/Footer";
import navItems from "@/app/components/navitems";
import FlexSection from "@/app/components/SectionFlexContent";
import CardsSection from "@/app/components/CardsSection";
import SeparatorTitleBlock from "@/app/components/Separatortitle";
import { DeviceMobile, Shield, CurrencyDollar } from "@phosphor-icons/react";

export default function ServicesPage() {
  return (
    <>
      <FloatingNav navItems={navItems} />
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-black">
        <div className="mx-auto max-w-4xl px-6 pt-44 pb-16">
          {/* Try CIRIS Now - Scout Preview */}
          <div className="mb-8 rounded-lg border-2 border-brand-primary bg-gradient-to-br from-blue-50 to-purple-50 p-6 shadow-lg dark:from-blue-900/20 dark:to-purple-900/20">
            <h2 className="mb-3 text-2xl font-bold text-gray-900 dark:text-white">
              Try CIRIS Now
            </h2>
            <p className="mb-4 text-gray-700 dark:text-gray-300">
              Experience CIRIS without installing anything. Log in to our hosted preview agent and try it instantly.
            </p>
            <a
              href="https://scout.ciris.ai"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block rounded-lg bg-brand-primary px-6 py-3 font-semibold text-white transition-colors hover:bg-brand-primary/80"
            >
              Try Scout Preview Agent →
            </a>
          </div>

          {/* Android App NOW AVAILABLE */}
          <div className="mb-12 rounded-lg border-4 border-green-500 bg-gradient-to-br from-green-50 to-blue-50 p-8 text-center shadow-xl dark:from-green-900/20 dark:to-blue-900/20">
            <div className="mb-4 flex justify-center">
              <DeviceMobile size={64} weight="fill" className="text-green-600" />
            </div>
            <h1 className="mb-4 text-4xl font-bold text-gray-900 dark:text-white">
              CIRIS Android App
            </h1>
            <div className="mb-4 inline-block rounded-full bg-green-600 px-4 py-2 text-lg font-semibold text-white">
              NOW AVAILABLE
            </div>
            <p className="mb-6 text-lg text-gray-700 dark:text-gray-300">
              Your personal ethical AI agent, now on mobile. Private, local-first, and fully open source.
            </p>
            <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <a
                href="https://play.google.com/store/apps/details?id=ai.ciris.mobile"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg bg-black px-6 py-3 font-semibold text-white transition-colors hover:bg-gray-800"
              >
                <svg className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M3.609 1.814L13.792 12 3.61 22.186a.996.996 0 0 1-.61-.92V2.734a1 1 0 0 1 .609-.92zm10.89 10.893l2.302 2.302-10.937 6.333 8.635-8.635zm3.199-3.198l2.807 1.626a1 1 0 0 1 0 1.73l-2.808 1.626L15.206 12l2.492-2.491zM5.864 2.658L16.8 8.99l-2.302 2.302-8.634-8.634z"/>
                </svg>
                Google Play
              </a>
              <a
                href="https://github.com/CIRISAI/CIRISAgent/releases/latest"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg border-2 border-gray-800 bg-white px-6 py-3 font-semibold text-gray-800 transition-colors hover:bg-gray-100 dark:border-gray-300 dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700"
              >
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
                </svg>
                Direct APK Download
              </a>
            </div>
            <p className="mt-4 text-sm text-gray-600 dark:text-gray-400">
              Or{" "}
              <a
                href="https://github.com/CIRISAI/CIRISAgent"
                target="_blank"
                rel="noopener noreferrer"
                className="text-green-600 hover:underline dark:text-green-400"
              >
                build from source on GitHub
              </a>
            </p>
          </div>

          {/* Hero Section */}
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-4xl font-bold tracking-tight text-gray-900 dark:text-white">
              CIRIS Hosted Services
            </h2>
            <p className="text-lg leading-8 text-gray-600 dark:text-gray-300">
              Privacy-focused LLM proxy and billing services for the CIRIS Android App
            </p>
            <div className="mt-4 rounded-md bg-blue-100 p-3 dark:bg-blue-900/40">
              <p className="text-sm font-semibold text-gray-900 dark:text-white">
                Note: The CIRIS LLM proxy is exclusively available for use with the CIRIS Android App
              </p>
            </div>
          </div>

          {/* Privacy-First Section */}
          <div className="mb-12 rounded-lg border-2 border-green-500 bg-green-50 p-6 dark:border-green-400 dark:bg-green-900/20">
            <div className="mb-4 flex items-center gap-3">
              <Shield size={32} weight="fill" className="text-green-600 dark:text-green-400" />
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                Zero Data Retention
              </h3>
            </div>
            <p className="mb-4 text-gray-700 dark:text-gray-300">
              CIRISProxy functions as a billing and authentication gateway without ever logging or storing your LLM conversation content.
            </p>
            <div className="rounded-md bg-green-100 p-4 dark:bg-green-900/40">
              <p className="mb-2 font-semibold text-gray-900 dark:text-white">What we LOG:</p>
              <ul className="mb-4 list-inside list-disc space-y-1 text-sm text-gray-700 dark:text-gray-300">
                <li>HTTP status codes (200, 401, 503)</li>
                <li>Token counts (integers only)</li>
                <li>Cost in dollars</li>
                <li>Model names and duration</li>
              </ul>
              <p className="mb-2 font-semibold text-gray-900 dark:text-white">What we DO NOT log:</p>
              <ul className="list-inside list-disc space-y-1 text-sm text-gray-700 dark:text-gray-300">
                <li>User messages</li>
                <li>Assistant responses</li>
                <li>System prompts</li>
                <li>Any message content whatsoever</li>
              </ul>
            </div>
          </div>

          {/* Daily Free Uses */}
          <FlexSection
            logoSrc="logoIcon"
            logoAlt="Brand logo icon"
            headline="Daily Free Uses"
            subheadline="2 free LLM calls every day, no credit card required."
            copyText="Every CIRIS account gets 2 free LLM API calls daily, resetting at midnight UTC. Use them for quick tasks, testing, or just exploring what CIRIS can do. No payment information needed to get started."
          />

          {/* Pricing */}
          <div className="mb-12 rounded-lg border-2 border-purple-500 bg-purple-50 p-6 dark:border-purple-400 dark:bg-purple-900/20">
            <div className="mb-4 flex items-center gap-3">
              <CurrencyDollar size={32} weight="fill" className="text-purple-600 dark:text-purple-400" />
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                Simple, Transparent Pricing
              </h3>
            </div>
            <div className="mb-4 text-center">
              <div className="inline-block rounded-lg bg-purple-100 p-6 dark:bg-purple-900/40">
                <div className="mb-2 inline-block rounded-full bg-green-500 px-3 py-1 text-xs font-semibold text-white">
                  BETA PRICING
                </div>
                <p className="text-4xl font-bold text-purple-600 dark:text-purple-400">$0.05</p>
                <p className="text-lg text-gray-700 dark:text-gray-300">per interaction</p>
                <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">$0.10 after beta</p>
              </div>
            </div>
            <p className="text-center text-sm text-gray-600 dark:text-gray-400">
              1 interaction = 1 session (up to 7 processing rounds). Pricing adjusted for actual cost.
            </p>
            <div className="mt-4 rounded-md bg-purple-100 p-3 dark:bg-purple-900/40">
              <p className="text-sm text-gray-700 dark:text-gray-300">
                <strong>Purchase credits via Stripe:</strong> Log in to{" "}
                <a
                  href="https://scout.ciris.ai/billing"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-purple-600 hover:underline dark:text-purple-400"
                >
                  scout.ciris.ai/billing
                </a>{" "}
                to add credits to your account. Payment processing through Stripe.
              </p>
            </div>
          </div>

          {/* Billing Model */}
          <div className="mb-12">
            <SeparatorTitleBlock
              logoSrc="logoIcon"
              logoAlt="Brand logo icon"
              headline="How Billing Works"
              subheadline="Transparent, pay-as-you-go pricing with no subscriptions."
            />
            <CardsSection
              cardsData={[
                {
                  headline: "Daily Free Uses",
                  copyText:
                    "2 free API calls every day, automatically reset at midnight UTC. Perfect for casual use and testing.",
                  logoSrc: "logoIcon",
                  logoAlt: "Brand logo icon",
                },
                {
                  headline: "Free Trial Credits",
                  copyText:
                    "Google OAuth users get 3 free interaction credits to try CIRIS. These are used after your daily free uses are exhausted.",
                  logoSrc: "logoIcon",
                  logoAlt: "Brand logo icon",
                },
                {
                  headline: "Paid Credits via Stripe",
                  copyText:
                    "Purchase credits securely through Stripe. Beta: $0.05/interaction, $0.10 after beta. Only charged when daily free and trial credits are used up.",
                  logoSrc: "logoIcon",
                  logoAlt: "Brand logo icon",
                },
              ]}
            />
          </div>

          {/* Priority Order */}
          <div className="mb-12 rounded-lg border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-800">
            <h3 className="mb-4 text-xl font-semibold text-gray-900 dark:text-white">
              Credit Usage Priority
            </h3>
            <p className="mb-4 text-sm text-gray-600 dark:text-gray-400">
              CIRIS always uses your credits in this order to maximize your free usage:
            </p>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-500 text-white font-semibold">
                  1
                </div>
                <div>
                  <p className="font-semibold text-gray-900 dark:text-white">Daily Free Uses</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Resets every day</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-500 text-white font-semibold">
                  2
                </div>
                <div>
                  <p className="font-semibold text-gray-900 dark:text-white">Free Trial Credits</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">3 free credits for Google OAuth users</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-purple-500 text-white font-semibold">
                  3
                </div>
                <div>
                  <p className="font-semibold text-gray-900 dark:text-white">Paid Credits (Stripe)</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">$0.05/interaction (beta) • Only used after free credits</p>
                </div>
              </div>
            </div>
          </div>

          {/* Technical Details */}
          <div className="mb-12">
            <h3 className="mb-6 text-2xl font-bold text-gray-900 dark:text-white">
              Technical Details
            </h3>
            <div className="space-y-4">
              <details className="rounded-lg border border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800">
                <summary className="cursor-pointer p-4 font-semibold text-gray-900 dark:text-white">
                  API Endpoint
                </summary>
                <div className="border-t border-gray-200 p-4 dark:border-gray-700">
                  <p className="mb-3 text-sm text-gray-600 dark:text-gray-400">
                    OpenAI-compatible API endpoint for CIRIS Agent
                  </p>
                  <pre className="overflow-x-auto rounded-md bg-gray-900 p-3 text-xs text-gray-100">
                    https://proxy.ciris.ai/v1/chat/completions
                  </pre>
                </div>
              </details>

              <details className="rounded-lg border border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800">
                <summary className="cursor-pointer p-4 font-semibold text-gray-900 dark:text-white">
                  Authentication
                </summary>
                <div className="border-t border-gray-200 p-4 text-sm text-gray-600 dark:border-gray-700 dark:text-gray-300">
                  <p className="mb-2">API key authentication via Authorization header:</p>
                  <pre className="overflow-x-auto rounded-md bg-gray-900 p-3 text-xs text-gray-100">
                    Authorization: Bearer YOUR_API_KEY
                  </pre>
                </div>
              </details>

              <details className="rounded-lg border border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800">
                <summary className="cursor-pointer p-4 font-semibold text-gray-900 dark:text-white">
                  Supported Models
                </summary>
                <div className="border-t border-gray-200 p-4 text-sm text-gray-600 dark:border-gray-700 dark:text-gray-300">
                  <p className="mb-2">CIRISProxy supports multiple LLM providers:</p>
                  <ul className="list-inside list-disc space-y-1">
                    <li>Anthropic (Claude models)</li>
                    <li>OpenAI (GPT models)</li>
                    <li>Other OpenAI-compatible providers</li>
                  </ul>
                </div>
              </details>
            </div>
          </div>

          {/* CTA */}
          <div className="text-center">
            <p className="mb-4 text-gray-600 dark:text-gray-400">
              Ready to get started?
            </p>
            <a
              href="/install"
              className="inline-block rounded-lg bg-brand-primary px-6 py-3 font-semibold text-white transition-colors hover:bg-brand-primary/80"
            >
              Install CIRIS Agent
            </a>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
