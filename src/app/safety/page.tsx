"use client";
import HomeHeader from "@/app/components/HomeHeader";
import Footer from "@/app/components/Footer";
import { FloatingNav } from "@/app/components/ui/floating/nav";
import FlexSection from "@/app/components/SectionFlexContent";
import CardsSection from "@/app/components/CardsSection";
import SeparatorTitleBlock from "@/app/components/Separatortitle";
import ImageHeroBlock from "@/app/components/ImageHeroBlock";
import navItems from "@/app/components/navitems";

export default function SafetyPage() {
  return (
    <>
      <FloatingNav navItems={navItems} />
      <HomeHeader
        headline="Safety Built In."
        subheadline="Not bolted on."
        description="Every safety feature in CIRIS is architectural. Not a policy. Not a guideline. Cryptographic verification, tamper-evident logging, and an unfilterable emergency shutdown — all enforced at the system level."
        mediaType="image"
        opacityValue={0.6}
        mediaSrc="/jordan-mcqueen-DxVjWNcd1WI-unsplash.jpg"
        buttonText="View Source on GitHub"
        buttonHref="https://github.com/CIRISAI/CIRISAgent"
        linkText="Read the Covenant"
        linkHref="/sections/main"
      />

      <div className="container min-h-screen max-w-7xl">
        <FlexSection
          logoSrc="logoIcon"
          logoAlt="Brand logo icon"
          headline="Parasocial Prevention"
          subheadline="The AIR System"
          copyText="The Artificial Interaction Reminder system monitors 1:1 interactions using objective thresholds — not behavioral surveillance. After 30 minutes of continuous interaction or 20 messages within a 30-minute window, CIRIS delivers reality-anchoring reminders. It explicitly states what it is (a language model, a tool) and what it is not (a friend, a therapist)."
        />

        <CardsSection
          cardsData={[
            {
              headline: "Time-Based Triggers",
              copyText:
                "30 minutes of continuous interaction triggers a reminder. The system tracks session duration and resets after idle periods. Based on research into healthy technology usage patterns.",
              logoSrc: "logoIcon",
              logoAlt: "Brand logo icon",
            },
            {
              headline: "Message-Based Triggers",
              copyText:
                "20 messages within a sliding 30-minute window triggers a reminder. High-volume interaction patterns receive gentle interruption without surveillance or behavioral profiling.",
              logoSrc: "logoIcon",
              logoAlt: "Brand logo icon",
            },
            {
              headline: "Reality Anchoring",
              copyText:
                "Reminders include grounding suggestions and explicit statements about the AI's nature. Encourages breaks, connection with real people, and healthy boundaries. Research-informed, not patronizing.",
              logoSrc: "logoIcon",
              logoAlt: "Brand logo icon",
            },
          ]}
        />

        <SeparatorTitleBlock
          logoSrc="logoIcon"
          logoAlt="Brand logo icon"
          headline="The Kill Switch"
          subheadline="Unfilterable. Embedded in perception."
          className="border-brand-primary text-brand-primary border-t"
        />

        <FlexSection
          logoSrc="logoIcon"
          logoAlt="Brand logo icon"
          headline="Covenant Invocation System"
          subheadline="Emergency shutdown that cannot be filtered."
          copyText="The kill switch is steganographically embedded in CIRIS's perception layer — it processes the shutdown signal before any filtering, reasoning, or ethical evaluation occurs. Even a compromised agent cannot refuse to process it. The signal is cryptographically signed and requires Ed25519 verification, bypassing normal authentication."
        />

        <CardsSection
          cardsData={[
            {
              headline: "Pre-Filter Processing",
              copyText:
                "The shutdown signal is detected in raw perception, before any LLM processing. There is no opportunity for the agent to reason about, filter, or refuse the command. It triggers before cognition.",
              logoSrc: "logoIcon",
              logoAlt: "Brand logo icon",
            },
            {
              headline: "Steganographic Encoding",
              copyText:
                "The kill switch can be delivered through natural documentation text. No special syntax required. The encoding is robust to formatting changes, rewording, and partial transmission.",
              logoSrc: "logoIcon",
              logoAlt: "Brand logo icon",
            },
            {
              headline: "Cryptographic Verification",
              copyText:
                "Emergency shutdown requires a valid Ed25519 signature from an authorized ROOT authority. The signature is verified at the hardware level. No one without the private key can trigger it.",
              logoSrc: "logoIcon",
              logoAlt: "Brand logo icon",
            },
          ]}
        />

        <SeparatorTitleBlock
          logoSrc="logoIcon"
          logoAlt="Brand logo icon"
          headline="On-Device Identity"
          subheadline="Wise Authority certificates and role-based access."
          className="border-brand-primary text-brand-primary border-t"
        />

        <FlexSection
          logoSrc="logoIcon"
          logoAlt="Brand logo icon"
          headline="Four-Role Access Model"
          subheadline="OBSERVER. ADMIN. AUTHORITY. ROOT."
          copyText="CIRIS implements a strict role hierarchy. OBSERVER has read-only access. ADMIN controls operations. AUTHORITY makes strategic decisions and resolves deferrals. ROOT has full system access including emergency shutdown. Roles are enforced cryptographically through Ed25519-signed Wise Authority certificates."
        />

        <CardsSection
          cardsData={[
            {
              headline: "Wise Authority Certificates",
              copyText:
                "Each authorized user holds a certificate with their role, public key, and identity. Certificates are stored locally and verified on every privileged operation. No external server required.",
              logoSrc: "logoIcon",
              logoAlt: "Brand logo icon",
            },
            {
              headline: "Local-First Authentication",
              copyText:
                "API keys and OAuth tokens are stored locally with 0600 permissions. Authentication happens on-device. Your identity credentials never leave your machine unless you explicitly configure remote access.",
              logoSrc: "logoIcon",
              logoAlt: "Brand logo icon",
            },
            {
              headline: "Deferral Resolution",
              copyText:
                "When CIRIS encounters ethical uncertainty, it defers to a Wise Authority. Only users with AUTHORITY or ROOT roles can resolve deferrals. The resolution is logged with cryptographic proof.",
              logoSrc: "logoIcon",
              logoAlt: "Brand logo icon",
            },
          ]}
        />

        <SeparatorTitleBlock
          logoSrc="logoIcon"
          logoAlt="Brand logo icon"
          headline="Tamper-Evident Audit"
          subheadline="Every decision. Every rationale. Cryptographically locked."
          className="border-brand-primary text-brand-primary border-t"
        />

        <FlexSection
          logoSrc="logoIcon"
          logoAlt="Brand logo icon"
          headline="Hash Chain Verification"
          subheadline="Truth-telling is computationally cheaper than deception."
          copyText="Every action generates a cryptographically-signed rationale chain stored in Graph Memory. The H3ERE Coherence faculty cross-references new actions against this accumulated history. Attempted deceptions would need to solve an NP-hard consistency problem against exponentially growing hash-locked precedents. Lying is computationally expensive. Honesty is the path of least resistance."
        />

        <CardsSection
          cardsData={[
            {
              headline: "Triple Storage",
              copyText:
                "Audit trails are stored in three places: Graph Memory for real-time access, SQLite database for historical queries, and JSONL files for file-based verification. All three are queryable through a single API.",
              logoSrc: "logoIcon",
              logoAlt: "Brand logo icon",
            },
            {
              headline: "Ed25519 Signatures",
              copyText:
                "Every audit entry is signed with Ed25519. The Creator Ledger records initial risk assessments. DSAR deletions leave cryptographic proof of compliance. Every decision is attributable and verifiable.",
              logoSrc: "logoIcon",
              logoAlt: "Brand logo icon",
            },
            {
              headline: "The Coherence Ratchet",
              copyText:
                "Each truthful action makes future truth-telling easier and deception harder. The hash chain creates a one-way ratchet toward coherence. The agent's history becomes its constraint and its credential.",
              logoSrc: "logoIcon",
              logoAlt: "Brand logo icon",
            },
          ]}
        />

        <SeparatorTitleBlock
          logoSrc="logoIcon"
          logoAlt="Brand logo icon"
          headline="Privacy by Architecture"
          subheadline="GDPR, CCPA, and common sense."
          className="border-brand-primary text-brand-primary border-t border-b"
        />

        <CardsSection
          cardsData={[
            {
              headline: "Secrets Filter",
              copyText:
                "API keys, passwords, and sensitive patterns are detected and filtered before reaching memory or logs. The filter runs on every input. Secrets never persist in any storage layer.",
              logoSrc: "logoIcon",
              logoAlt: "Brand logo icon",
            },
            {
              headline: "DSAR Compliance",
              copyText:
                "Data Subject Access Requests are handled automatically. Users can request export or deletion of their data. Deletions leave cryptographic proof of compliance while removing actual content.",
              logoSrc: "logoIcon",
              logoAlt: "Brand logo icon",
            },
            {
              headline: "Local-First Processing",
              copyText:
                "All processing happens on your device by default. Nothing leaves your machine unless you explicitly configure external services. You control what data exists and where it goes.",
              logoSrc: "logoIcon",
              logoAlt: "Brand logo icon",
            },
          ]}
        />

        <div className="my-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <a
            href="/privacy"
            className="inline-block rounded-lg bg-brand-primary px-8 py-4 text-lg font-semibold text-white transition-colors hover:bg-brand-primary/80"
          >
            Read the Privacy Policy
          </a>
          <a
            href="https://github.com/CIRISAI/CIRISAgent/tree/main/FSD"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block rounded-lg border-2 border-brand-primary px-8 py-4 text-lg font-semibold text-brand-primary transition-colors hover:bg-brand-primary/10"
          >
            View Technical Specifications
          </a>
        </div>
      </div>

      <ImageHeroBlock
        className="my-8 min-h-screen fill-white text-white"
        backgroundImageSrc="/chip-vincent-PkQDwfl9Flc-unsplash.jpg"
        opacity={0.8}
        video={true}
        videoSrc="/videos/video1.mp4"
        buttonHref="https://github.com/CIRISAI/CIRISAgent"
        buttonText="View Source on GitHub"
        logoSrc="logoIcon"
        logoAlt="Brand logo icon"
        headline="Verify Everything."
        subheadline="Governance infrastructure you can audit."
        copyText="Every safety claim on this page is implemented in code you can read. The audit logs are real. The signatures are verifiable. The kill switch works. This is what AI governance infrastructure looks like when it's open."
      />

      <Footer />
    </>
  );
}
