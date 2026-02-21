"use client";
import HomeHeader from "@/app/components/HomeHeader";
import Footer from "@/app/components/Footer";
import { FloatingNav } from "@/app/components/ui/floating/nav";
import FlexSection from "@/app/components/SectionFlexContent";
import CardsSection from "@/app/components/CardsSection";
import SeparatorTitleBlock from "@/app/components/Separatortitle";
import navItems from "@/app/components/navitems";

export default function TrustPage() {
  return (
    <>
      <FloatingNav navItems={navItems} />
      <HomeHeader
        headline="The DMV for AI Agents"
        subheadline="Identity, Integrity, and Accountability — cryptographically provable."
        description="CIRISVerify issues the driver's license (identity), performs the vehicle inspection (integrity), and tracks insurance (accountability). Without it, any agent could claim to be anything."
        mediaType="image"
        opacityValue={0.7}
        mediaSrc="/andrew-roberts-euBRXcx57T4-unsplash.jpg"
        buttonText="Open Portal"
        buttonHref="https://portal.ciris.ai"
        linkText="View Source"
        linkHref="https://github.com/CIRISAI/CIRISVerify"
      />

      {/* DMV Analogy - Three Pillars */}
      <div className="bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 py-16">
        <div className="mx-auto max-w-6xl px-4">
          <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-2">
            Every Agent Needs Three Things
          </h2>
          <p className="text-center text-brand-primary font-medium mb-4">
            Just like every car on the road.
          </p>
          <p className="text-center text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto">
            CIRISVerify is the trust anchor for the CIRIS ecosystem. Post-quantum ready with hybrid Ed25519 + ML-DSA-65 cryptography as a day-1 standard.
          </p>

          <div className="grid md:grid-cols-3 gap-6">
            {/* Pillar 1 */}
            <div className="rounded-xl border-2 border-brand-primary bg-brand-primary/5 dark:bg-brand-primary/10 p-6">
              <div className="flex items-center gap-2 mb-3">
                <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-brand-primary text-white font-bold text-sm">1</span>
                <h3 className="text-xl font-bold text-brand-primary">Driver&apos;s License</h3>
              </div>
              <p className="font-semibold text-gray-900 dark:text-white mb-2 text-sm">Identity &amp; Signing Key</p>
              <p className="text-gray-700 dark:text-gray-300 text-sm mb-4">
                A hardware-bound Ed25519 signing key that <em>is</em> the agent&apos;s identity. Stored in secure hardware (TPM, Secure Enclave, Android Keystore). Cannot be forged or transferred.
              </p>
              <p className="text-xs text-brand-primary font-medium">
                The key doesn&apos;t represent the identity &mdash; it is the identity.
              </p>
            </div>

            {/* Pillar 2 */}
            <div className="rounded-xl border-2 border-brand-primary bg-brand-primary/5 dark:bg-brand-primary/10 p-6">
              <div className="flex items-center gap-2 mb-3">
                <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-brand-primary text-white font-bold text-sm">2</span>
                <h3 className="text-xl font-bold text-brand-primary">Registration &amp; Inspection</h3>
              </div>
              <p className="font-semibold text-gray-900 dark:text-white mb-2 text-sm">Software &amp; Hardware Integrity</p>
              <p className="text-gray-700 dark:text-gray-300 text-sm mb-4">
                Every file in the agent distribution is SHA-256 hashed at build time and stored in a signed manifest. At runtime, CIRISVerify validates files against this manifest. Any modification &mdash; even one byte &mdash; triggers forced shutdown.
              </p>
              <p className="text-xs text-brand-primary font-medium">
                Software-only environments are capped at community tier.
              </p>
            </div>

            {/* Pillar 3 */}
            <div className="rounded-xl border-2 border-brand-primary bg-brand-primary/5 dark:bg-brand-primary/10 p-6">
              <div className="flex items-center gap-2 mb-3">
                <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-brand-primary text-white font-bold text-sm">3</span>
                <h3 className="text-xl font-bold text-brand-primary">Insurance</h3>
              </div>
              <p className="font-semibold text-gray-900 dark:text-white mb-2 text-sm">Accountability &amp; Licensing</p>
              <p className="text-gray-700 dark:text-gray-300 text-sm mb-4">
                Tracks the human-in-the-loop accountability chain: which organization deployed this agent, which licensed human is responsible, what capabilities they&apos;re authorized to use, and mandatory disclosure shown to every user.
              </p>
              <p className="text-xs text-brand-primary font-medium">
                Unlicensed agents can operate &mdash; but cannot perform professional services.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="container min-h-screen max-w-7xl">
        {/* Multi-Source Validation */}
        <FlexSection
          logoSrc="logoIcon"
          logoAlt="Brand logo icon"
          headline="Multi-Source Validation"
          subheadline="HTTPS-authoritative. DNS-advisory."
          copyText="CIRISVerify doesn't trust a single source. HTTPS endpoints at independent domains are authoritative; DNS provides advisory cross-checks. If sources disagree, the agent is restricted. Anti-rollback protection tracks the highest-seen revocation revision and rejects any decrease."
        />

        {/* Unified Attestation */}
        <SeparatorTitleBlock
          logoSrc="logoIcon"
          logoAlt="Brand logo icon"
          headline="Unified Attestation"
          subheadline="The full background check."
          className="border-brand-primary text-brand-primary border-t border-b"
        />

        <CardsSection
          cardsData={[
            {
              headline: "Key Attestation",
              copyText:
                "Is this license real? The agent's signing key is verified: portal-issued or ephemeral, hardware-bound or software-only. A random challenge proves possession.",
              logoSrc: "logoIcon",
              logoAlt: "Brand logo icon",
            },
            {
              headline: "File Integrity",
              copyText:
                "Has this car been modified? CIRISVerify fetches the build manifest from CIRISRegistry and SHA-256 verifies every file. Full checks at startup, random spot checks at runtime.",
              logoSrc: "logoIcon",
              logoAlt: "Brand logo icon",
            },
            {
              headline: "Source Validation",
              copyText:
                "Let me run your plates. Multiple independent sources (HTTPS US, HTTPS EU, DNS US, DNS EU) are queried. If they disagree, that's suspicious — the agent is restricted.",
              logoSrc: "logoIcon",
              logoAlt: "Brand logo icon",
            },
          ]}
        />

        {/* Attestation Levels Table */}
        <div className="my-12 px-4 md:px-12">
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2 text-center">
            Attestation Levels
          </h3>
          <p className="text-center text-gray-600 dark:text-gray-400 mb-8 max-w-xl mx-auto">
            The unified attestation produces a trust level based on how many checks pass.
          </p>

          <div className="overflow-x-auto">
            <table className="w-full text-sm max-w-2xl mx-auto">
              <thead>
                <tr className="border-b-2 border-brand-primary">
                  <th className="p-3 text-left font-bold text-brand-primary">Level</th>
                  <th className="p-3 text-left font-bold text-brand-primary">Meaning</th>
                  <th className="p-3 text-left font-bold text-brand-primary">Description</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                <tr className="bg-green-50 dark:bg-green-900/20">
                  <td className="p-3 font-bold text-green-600">5</td>
                  <td className="p-3 font-medium text-gray-900 dark:text-white">Full trust</td>
                  <td className="p-3 text-gray-600 dark:text-gray-400">All checks pass</td>
                </tr>
                <tr>
                  <td className="p-3 font-bold text-green-600">4</td>
                  <td className="p-3 font-medium text-gray-900 dark:text-white">High trust</td>
                  <td className="p-3 text-gray-600 dark:text-gray-400">Minor issues (DNS advisory disagree)</td>
                </tr>
                <tr>
                  <td className="p-3 font-bold text-yellow-500">3</td>
                  <td className="p-3 font-medium text-gray-900 dark:text-white">Medium trust</td>
                  <td className="p-3 text-gray-600 dark:text-gray-400">Some checks failed</td>
                </tr>
                <tr>
                  <td className="p-3 font-bold text-yellow-500">2</td>
                  <td className="p-3 font-medium text-gray-900 dark:text-white">Low trust</td>
                  <td className="p-3 text-gray-600 dark:text-gray-400">Multiple failures</td>
                </tr>
                <tr>
                  <td className="p-3 font-bold text-red-500">1</td>
                  <td className="p-3 font-medium text-gray-900 dark:text-white">Minimal trust</td>
                  <td className="p-3 text-gray-600 dark:text-gray-400">Most checks failed</td>
                </tr>
                <tr className="bg-red-50 dark:bg-red-900/20">
                  <td className="p-3 font-bold text-red-600">0</td>
                  <td className="p-3 font-medium text-gray-900 dark:text-white">No trust</td>
                  <td className="p-3 text-gray-600 dark:text-gray-400">Critical failures (tampered binary, broken audit)</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* CIRISPortal Section */}
        <SeparatorTitleBlock
          logoSrc="logoIcon"
          logoAlt="Brand logo icon"
          headline="CIRISPortal"
          subheadline="The clerk's window."
          className="border-brand-primary text-brand-primary border-t border-b"
        />

        <FlexSection
          logoSrc="logoIcon"
          logoAlt="Brand logo icon"
          headline="Agent Administration"
          subheadline="Live at portal.ciris.ai"
          copyText="CIRISPortal is the web interface where administrators issue driver's licenses, register vehicles, and manage insurance records for AI agents. Register agents, generate Ed25519 keypairs, issue licenses with capability grants, and respond to incidents — all with complete audit trails."
          buttonText="Open Portal"
          buttonHref="https://portal.ciris.ai"
        />

        <CardsSection
          cardsData={[
            {
              headline: "Agent Registry",
              copyText:
                "Register and track AI agents by SHA-256 hash. Issue identities backed by hardware-bound keys. Every registration is cryptographically logged.",
              logoSrc: "logoIcon",
              logoAlt: "Brand logo icon",
            },
            {
              headline: "Build Integrity",
              copyText:
                "Register builds with Tripwire file integrity manifests — 907+ file SHA-256 hashes per build. CIRISVerify validates agents against these manifests at runtime.",
              logoSrc: "logoIcon",
              logoAlt: "Brand logo icon",
            },
            {
              headline: "License Management",
              copyText:
                "Issue and manage licenses with capability grants (medical, legal, financial). Track the full accountability chain from organization to individual human.",
              logoSrc: "logoIcon",
              logoAlt: "Brand logo icon",
            },
          ]}
        />

        <CardsSection
          cardsData={[
            {
              headline: "Key Custody",
              copyText:
                "Generate Ed25519 keypairs with AES-256-GCM envelope encryption. Self-custody or portal-custodied — your choice. ML-DSA-65 post-quantum keys coming soon.",
              logoSrc: "logoIcon",
              logoAlt: "Brand logo icon",
            },
            {
              headline: "Incident Response",
              copyText:
                "Emergency shutdown and mass revocation controls. Suspend licenses, recall registrations. When something goes wrong, the system responds in seconds.",
              logoSrc: "logoIcon",
              logoAlt: "Brand logo icon",
            },
            {
              headline: "Compliance",
              copyText:
                "SOC2, HIPAA, and GDPR compliance reporting. Complete audit trail of all administrative operations. Every action is logged and attributable.",
              logoSrc: "logoIcon",
              logoAlt: "Brand logo icon",
            },
          ]}
        />

        {/* Identity Activation Pricing */}
        <SeparatorTitleBlock
          logoSrc="logoIcon"
          logoAlt="Brand logo icon"
          headline="Identity Activation"
          subheadline="Identity is the foundation. Assurance is the value."
          className="border-brand-primary text-brand-primary border-t border-b"
        />

        <div className="my-12 px-4">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {/* Community */}
            <div className="rounded-xl border-2 border-emerald-400 dark:border-emerald-600 bg-emerald-50 dark:bg-emerald-900/20 p-6 ring-2 ring-emerald-400 ring-offset-2 dark:ring-offset-gray-900">
              <h3 className="text-lg font-bold text-emerald-700 dark:text-emerald-400 mb-1">Community</h3>
              <p className="text-3xl font-bold text-gray-900 dark:text-white mb-1">$1.50</p>
              <p className="text-xs text-gray-500 dark:text-gray-400 mb-4">per agent identity</p>

              <div className="space-y-1 mb-4 text-sm text-gray-600 dark:text-gray-400">
                <div className="flex justify-between">
                  <span>Issuance fee</span>
                  <span>$0.50</span>
                </div>
                <div className="flex justify-between">
                  <span>Identity bond</span>
                  <span>$1.00</span>
                </div>
                <div className="flex justify-between border-t border-emerald-200 dark:border-emerald-800 pt-1">
                  <span>Monthly</span>
                  <span className="font-semibold text-emerald-600">Free</span>
                </div>
              </div>

              <p className="text-xs text-gray-500 dark:text-gray-400 mb-4">Up to 5 agents</p>

              <ul className="space-y-1.5 text-sm text-gray-700 dark:text-gray-300">
                <li className="flex items-start gap-2"><span className="text-emerald-500 mt-0.5">&#10003;</span>Hardware-bound identity</li>
                <li className="flex items-start gap-2"><span className="text-emerald-500 mt-0.5">&#10003;</span>Basic verification</li>
                <li className="flex items-start gap-2"><span className="text-emerald-500 mt-0.5">&#10003;</span>Cryptographic audit trail</li>
                <li className="flex items-start gap-2"><span className="text-emerald-500 mt-0.5">&#10003;</span>Community support</li>
              </ul>

              <a
                href="https://portal.ciris.ai"
                className="mt-6 block w-full rounded-lg bg-emerald-600 px-4 py-2 text-center text-sm font-medium text-white transition-colors hover:bg-emerald-700"
              >
                Activate Now
              </a>
            </div>

            {/* Professional */}
            <div className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-6">
              <h3 className="text-lg font-bold text-brand-primary mb-1">Professional</h3>
              <p className="text-3xl font-bold text-gray-900 dark:text-white mb-1">$15.00</p>
              <p className="text-xs text-gray-500 dark:text-gray-400 mb-4">activation + $10/agent/mo</p>

              <div className="space-y-1 mb-4 text-sm text-gray-600 dark:text-gray-400">
                <div className="flex justify-between">
                  <span>Issuance fee</span>
                  <span>$5.00</span>
                </div>
                <div className="flex justify-between">
                  <span>Identity bond</span>
                  <span>$10.00</span>
                </div>
                <div className="flex justify-between border-t border-gray-200 dark:border-gray-700 pt-1">
                  <span>Monthly</span>
                  <span className="font-semibold">$10.00/agent</span>
                </div>
              </div>

              <p className="text-xs text-gray-500 dark:text-gray-400 mb-4">Up to 50 agents</p>

              <ul className="space-y-1.5 text-sm text-gray-700 dark:text-gray-300">
                <li className="flex items-start gap-2"><span className="text-brand-primary mt-0.5">&#10003;</span>Steward-backed verification</li>
                <li className="flex items-start gap-2"><span className="text-brand-primary mt-0.5">&#10003;</span>Signed licensing chain</li>
                <li className="flex items-start gap-2"><span className="text-brand-primary mt-0.5">&#10003;</span>Capability authorization</li>
                <li className="flex items-start gap-2"><span className="text-brand-primary mt-0.5">&#10003;</span>Support SLA</li>
              </ul>

              <a
                href="mailto:sales@ciris.ai?subject=Professional%20Tier%20Inquiry"
                className="mt-6 block w-full rounded-lg border border-brand-primary px-4 py-2 text-center text-sm font-medium text-brand-primary transition-colors hover:bg-brand-primary/10"
              >
                Contact Sales
              </a>
            </div>

            {/* Enterprise */}
            <div className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-6">
              <h3 className="text-lg font-bold text-brand-primary mb-1">Enterprise</h3>
              <p className="text-3xl font-bold text-gray-900 dark:text-white mb-1">$125.00</p>
              <p className="text-xs text-gray-500 dark:text-gray-400 mb-4">activation + $100/agent/mo</p>

              <div className="space-y-1 mb-4 text-sm text-gray-600 dark:text-gray-400">
                <div className="flex justify-between">
                  <span>Issuance fee</span>
                  <span>$25.00</span>
                </div>
                <div className="flex justify-between">
                  <span>Identity bond</span>
                  <span>$100.00</span>
                </div>
                <div className="flex justify-between border-t border-gray-200 dark:border-gray-700 pt-1">
                  <span>Monthly</span>
                  <span className="font-semibold">$100.00/agent</span>
                </div>
              </div>

              <p className="text-xs text-gray-500 dark:text-gray-400 mb-4">Up to 500 agents</p>

              <ul className="space-y-1.5 text-sm text-gray-700 dark:text-gray-300">
                <li className="flex items-start gap-2"><span className="text-brand-primary mt-0.5">&#10003;</span>Formal attestation support</li>
                <li className="flex items-start gap-2"><span className="text-brand-primary mt-0.5">&#10003;</span>Audit log anchoring</li>
                <li className="flex items-start gap-2"><span className="text-brand-primary mt-0.5">&#10003;</span>Compliance docs (SOC2/HIPAA/GDPR)</li>
                <li className="flex items-start gap-2"><span className="text-brand-primary mt-0.5">&#10003;</span>Incident investigation support</li>
              </ul>

              <a
                href="mailto:sales@ciris.ai?subject=Enterprise%20Tier%20Inquiry"
                className="mt-6 block w-full rounded-lg border border-brand-primary px-4 py-2 text-center text-sm font-medium text-brand-primary transition-colors hover:bg-brand-primary/10"
              >
                Contact Sales
              </a>
            </div>

            {/* Safety-Critical */}
            <div className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-6">
              <h3 className="text-lg font-bold text-brand-primary mb-1">Safety-Critical</h3>
              <p className="text-3xl font-bold text-gray-900 dark:text-white mb-1">$1,250</p>
              <p className="text-xs text-gray-500 dark:text-gray-400 mb-4">activation + custom monthly</p>

              <div className="space-y-1 mb-4 text-sm text-gray-600 dark:text-gray-400">
                <div className="flex justify-between">
                  <span>Issuance fee</span>
                  <span>$250.00</span>
                </div>
                <div className="flex justify-between">
                  <span>Identity bond</span>
                  <span>$1,000.00</span>
                </div>
                <div className="flex justify-between border-t border-gray-200 dark:border-gray-700 pt-1">
                  <span>Monthly</span>
                  <span className="font-semibold">Custom</span>
                </div>
              </div>

              <p className="text-xs text-gray-500 dark:text-gray-400 mb-4">Unlimited agents</p>

              <ul className="space-y-1.5 text-sm text-gray-700 dark:text-gray-300">
                <li className="flex items-start gap-2"><span className="text-brand-primary mt-0.5">&#10003;</span>Enhanced accountability</li>
                <li className="flex items-start gap-2"><span className="text-brand-primary mt-0.5">&#10003;</span>Forensic audit support</li>
                <li className="flex items-start gap-2"><span className="text-brand-primary mt-0.5">&#10003;</span>Regulatory certification</li>
                <li className="flex items-start gap-2"><span className="text-brand-primary mt-0.5">&#10003;</span>Priority infrastructure</li>
              </ul>

              <a
                href="mailto:sales@ciris.ai?subject=Safety-Critical%20Tier%20Inquiry"
                className="mt-6 block w-full rounded-lg border border-brand-primary px-4 py-2 text-center text-sm font-medium text-brand-primary transition-colors hover:bg-brand-primary/10"
              >
                Contact Sales
              </a>
            </div>
          </div>

          {/* Pricing Explainer */}
          <div className="mt-8 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-8">
            <h3 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">
              How Identity Activation Works
            </h3>
            <div className="grid gap-6 md:grid-cols-3">
              <div>
                <h4 className="mb-2 font-medium text-gray-900 dark:text-white">Issuance Fee</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  A small, non-refundable fee that covers registry infrastructure and prevents identity churn. Per agent identity, not per organization.
                </p>
              </div>
              <div>
                <h4 className="mb-2 font-medium text-gray-900 dark:text-white">Identity Bond</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  A per-identity stake for Sybil resistance. Forfeited on revocation. Admin can issue manual refund for properly decommissioned identities.
                </p>
              </div>
              <div>
                <h4 className="mb-2 font-medium text-gray-900 dark:text-white">Monthly Assurance</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Paid tiers include steward-backed verification, compliance documentation, and enhanced accountability support. You&apos;re paying for accountability, not capability.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Post-Quantum Cryptography */}
        <div className="my-12 rounded-lg border-4 border-brand-primary bg-blue-50 dark:bg-blue-900/20 p-8">
          <h2 className="mb-4 text-2xl font-bold text-gray-900 dark:text-white">
            Post-Quantum Ready
          </h2>
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            Every response includes dual signatures: Ed25519 from hardware for classical security and ML-DSA-65 from software for quantum resistance. Both must verify. This is day-1 infrastructure, not a roadmap item.
          </p>
          <div className="grid gap-4 text-sm text-gray-600 dark:text-gray-400 sm:grid-cols-2 md:grid-cols-4">
            <div>
              <strong className="text-gray-900 dark:text-white">Classical</strong>
              <p>Ed25519 (hardware-bound)</p>
            </div>
            <div>
              <strong className="text-gray-900 dark:text-white">Post-Quantum</strong>
              <p>ML-DSA-65 (FIPS 204)</p>
            </div>
            <div>
              <strong className="text-gray-900 dark:text-white">Transparency</strong>
              <p>SHA-256 Merkle tree log</p>
            </div>
            <div>
              <strong className="text-gray-900 dark:text-white">Anti-Rollback</strong>
              <p>Monotonic revision tracking</p>
            </div>
          </div>
        </div>

        {/* Platform Support */}
        <SeparatorTitleBlock
          logoSrc="logoIcon"
          logoAlt="Brand logo icon"
          headline="Platform Support"
          subheadline="Desktop. Mobile. Server."
          className="border-brand-primary text-brand-primary border-t border-b"
        />

        <div className="my-12 px-4 md:px-12">
          <div className="grid gap-6 md:grid-cols-3">
            <div className="rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-6">
              <h4 className="font-bold text-gray-900 dark:text-white mb-3">Desktop &amp; Server</h4>
              <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                <li className="flex items-center gap-2"><span className="text-green-500">&#10003;</span>Linux (x86_64, ARM64)</li>
                <li className="flex items-center gap-2"><span className="text-green-500">&#10003;</span>macOS (Apple Silicon, Intel)</li>
                <li className="flex items-center gap-2"><span className="text-green-500">&#10003;</span>Windows (x86_64)</li>
              </ul>
            </div>
            <div className="rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-6">
              <h4 className="font-bold text-gray-900 dark:text-white mb-3">Mobile</h4>
              <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                <li className="flex items-center gap-2"><span className="text-green-500">&#10003;</span>Android (ARM64, ARM32, x86_64)</li>
                <li className="flex items-center gap-2"><span className="text-green-500">&#10003;</span>iOS (ARM64 + Simulator)</li>
              </ul>
            </div>
            <div className="rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-6">
              <h4 className="font-bold text-gray-900 dark:text-white mb-3">Python (PyPI)</h4>
              <div className="mb-3 rounded-lg bg-gray-900 px-4 py-3 font-mono text-sm text-green-400">
                pip install ciris-verify
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Python 3.10&ndash;3.13. Platform-specific wheel includes the correct Rust binary automatically.
              </p>
            </div>
          </div>
        </div>

        {/* Closing Philosophy */}
        <div className="my-12 rounded-lg border-2 border-brand-primary bg-brand-primary/5 p-8 text-center">
          <p className="text-lg text-gray-700 dark:text-gray-300 max-w-2xl mx-auto mb-4">
            CIRISVerify is infrastructure for trust, not control. The capability is the same whether licensed or not. The difference is accountability &mdash; and with CIRISVerify, that accountability is cryptographically provable.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="https://portal.ciris.ai"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg bg-brand-primary px-6 py-3 font-semibold text-white transition-colors hover:bg-brand-primary/80"
            >
              Open Portal
            </a>
            <a
              href="https://github.com/CIRISAI/CIRISVerify"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg border-2 border-brand-primary px-6 py-3 font-semibold text-brand-primary transition-colors hover:bg-brand-primary/10"
            >
              View Source
            </a>
            <a
              href="mailto:sales@ciris.ai"
              className="inline-flex items-center gap-2 rounded-lg border-2 border-gray-300 dark:border-gray-600 px-6 py-3 font-semibold text-gray-700 dark:text-gray-300 transition-colors hover:bg-gray-50 dark:hover:bg-gray-800"
            >
              Contact Sales
            </a>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}
