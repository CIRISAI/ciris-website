import Link from "next/link";
import { FloatingNav } from "@/app/components/ui/floating/nav";
import Footer from "@/app/components/Footer";
import navItems from "@/app/components/navitems";

export const metadata = {
  title: "Events & Talks: Where CIRIS Is Showing Up | CIRIS",
  description:
    "Upcoming events, past talks, and recorded interviews. CIRIS at Foresight (Berlin), IEEE Madison, Agentic Engineering Chicago, AICamp, CodeNinja, and more, with recordings where available.",
  alternates: { canonical: "/events" },
  openGraph: {
    type: "website",
    url: "https://ciris.ai/events",
    title: "Events & Talks: Where CIRIS Is Showing Up",
    description:
      "Upcoming events, past talks, and recorded interviews from the CIRIS project, with recordings where available.",
    images: [{ url: "/og/og-events.gif", type: "image/gif", width: 1200, height: 630, alt: "Events & Talks: Where CIRIS Is Showing Up" }],
    videos: [{ url: "https://ciris.ai/og/og-events.mp4", type: "video/mp4", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Events & Talks: Where CIRIS Is Showing Up",
    description:
      "Upcoming events, past talks, and recorded interviews from the CIRIS project.",
    images: ["/og/og-events.gif"],
  },
};

type EventItem = {
  date: string;
  title: string;
  href?: string;
  where?: string;
  note?: string;
  recording?: string;
};

// Mirror of github.com/CIRISAI/.github/blob/main/events/README.md. Keep in sync.
const UPCOMING: EventItem[] = [
  {
    date: "Jul 18–19, 2026",
    title: "Secure & Sovereign AI Workshop (Foresight Institute)",
    href: "https://foresight.org/events/2026-secure-sovereign-ai-workshop/",
    where: "Berlin, Germany",
    note: "Eric presenting, confirmed speaker.",
  },
];

const PAST: EventItem[] = [
  {
    date: "Apr 28, 2026",
    title:
      "CIRIS: An Open-Source Ethical AI Governance Framework, Agentic Engineering Chicago",
    href: "https://luma.com/fg2png4u",
    where: "TeamWorking by TechNexus, Lyric Opera House, Chicago, IL",
    note: "In-person CIRISAgent demo.",
    recording: "https://youtu.be/Jgdw9WvjTMc",
  },
  {
    date: "Feb 9, 2026",
    title: "Building AI with a Conscience, IEEE Madison Section",
    href: "https://enotice.vtools.ieee.org/public/191195",
    where: "Madison Central Library, Madison, WI",
    note: "Invited talk and live demo.",
  },
  {
    date: "~Dec 2025",
    title: "AICamp Chicago, Agentic AI Meetup (host David Giard, Microsoft)",
    where: "Chicago, IL",
    note: "In-person, co-speaker Joel Vasallo. Exact date to confirm.",
  },
];

const RECORDED: EventItem[] = [
  {
    date: "2025",
    title: "The Need for Urgency: Embedding Ethical Reasoning in AI Systems",
    href: "https://www.youtube.com/watch?v=ZvVIPE8iw30",
    where: "CodeNinja Podcast (host Bilal Butt)",
  },
  {
    date: "Apr 17, 2025",
    title:
      "AI Getting Smarter: How Do We Keep It Ethical? Exploring the CIRIS Covenant",
    href: "https://www.youtube.com/watch?v=JoJUd9oJ8CU",
    where: "YouTube",
  },
  {
    date: "Mar 31, 2026",
    title: "The Race Towards Autonomy: Ethics, Control & the Multi-Agent Future",
    where: "CodeNinja Podcast (host Bilal Butt)",
    note: "LinkedIn Live, permalink coming.",
  },
  {
    date: "Oct 2, 2025",
    title: "Ethical AI and The Future of Software in 2025",
    where: "Software Finder, LinkedIn Live with Courtney King",
    note: "Permalink coming.",
  },
];

function EventRow({ item }: { item: EventItem }) {
  const titleEl = item.href ? (
    <a
      href={item.href}
      target="_blank"
      rel="noopener noreferrer"
      className="font-semibold text-slate-900 underline-offset-2 hover:text-brand-primary hover:underline dark:text-slate-100"
    >
      {item.title}
    </a>
  ) : (
    <span className="font-semibold text-slate-900 dark:text-slate-100">
      {item.title}
    </span>
  );
  return (
    <li className="flex flex-col gap-1 rounded-2xl border border-slate-200 bg-white p-4 dark:border-gray-800 dark:bg-gray-900 sm:flex-row sm:gap-4">
      <span className="shrink-0 font-mono text-xs font-semibold uppercase tracking-wide text-brand-primary sm:w-32 sm:pt-0.5">
        {item.date}
      </span>
      <div className="min-w-0">
        <p className="text-sm leading-6">{titleEl}</p>
        {item.where ? (
          <p className="mt-0.5 text-[13px] text-slate-600 dark:text-slate-400">
            {item.where}
          </p>
        ) : null}
        {item.note ? (
          <p className="mt-0.5 text-[13px] text-slate-500 dark:text-slate-500">
            {item.note}
          </p>
        ) : null}
        {item.recording ? (
          <a
            href={item.recording}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-1 inline-flex items-center gap-1 text-[13px] font-medium text-brand-primary hover:underline"
          >
            ▶ Watch the recording
          </a>
        ) : null}
      </div>
    </li>
  );
}

function Section({ title, items }: { title: string; items: EventItem[] }) {
  return (
    <section className="mt-10">
      <h2 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white md:text-2xl">
        {title}
      </h2>
      <ul className="mt-4 space-y-3">
        {items.map((it) => (
          <EventRow key={it.date + it.title} item={it} />
        ))}
      </ul>
    </section>
  );
}

// Structured data so Google can surface the talks as event + video rich
// results. Only events/videos with firm dates and real URLs are included.
const eventsJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Event",
      name: "Secure & Sovereign AI Workshop (Foresight Institute)",
      startDate: "2026-07-18",
      endDate: "2026-07-19",
      eventStatus: "https://schema.org/EventScheduled",
      eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
      location: {
        "@type": "Place",
        name: "Berlin",
        address: { "@type": "PostalAddress", addressLocality: "Berlin", addressCountry: "DE" },
      },
      url: "https://foresight.org/events/2026-secure-sovereign-ai-workshop/",
      organizer: { "@type": "Organization", name: "Foresight Institute", url: "https://foresight.org/" },
      performer: { "@type": "Person", name: "Eric Moore" },
      description: "CIRIS presenting at the Foresight Institute Secure & Sovereign AI Workshop.",
    },
    {
      "@type": "Event",
      name: "CIRIS: An Open-Source Ethical AI Governance Framework, Agentic Engineering Chicago",
      startDate: "2026-04-28",
      eventStatus: "https://schema.org/EventScheduled",
      eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
      location: {
        "@type": "Place",
        name: "TeamWorking by TechNexus, Lyric Opera House",
        address: { "@type": "PostalAddress", addressLocality: "Chicago", addressRegion: "IL", addressCountry: "US" },
      },
      url: "https://luma.com/fg2png4u",
      performer: { "@type": "Person", name: "Eric Moore" },
      description: "In-person CIRISAgent demo at Agentic Engineering Chicago.",
    },
    {
      "@type": "Event",
      name: "Building AI with a Conscience, IEEE Madison Section",
      startDate: "2026-02-09",
      eventStatus: "https://schema.org/EventScheduled",
      eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
      location: {
        "@type": "Place",
        name: "Madison Central Library",
        address: { "@type": "PostalAddress", addressLocality: "Madison", addressRegion: "WI", addressCountry: "US" },
      },
      url: "https://enotice.vtools.ieee.org/public/191195",
      organizer: { "@type": "Organization", name: "IEEE Madison Section" },
      performer: { "@type": "Person", name: "Eric Moore" },
      description: "Invited talk and live demo.",
    },
    {
      "@type": "VideoObject",
      name: "CIRIS: An Open-Source Ethical AI Governance Framework (Agentic Engineering Chicago)",
      description: "In-person CIRISAgent demo at Agentic Engineering Chicago.",
      thumbnailUrl: "https://i.ytimg.com/vi/Jgdw9WvjTMc/hqdefault.jpg",
      uploadDate: "2026-04-28",
      contentUrl: "https://youtu.be/Jgdw9WvjTMc",
      embedUrl: "https://www.youtube.com/embed/Jgdw9WvjTMc",
    },
    {
      "@type": "VideoObject",
      name: "AI Getting Smarter: How Do We Keep It Ethical? Exploring the CIRIS Covenant",
      description: "Talk on the CIRIS Covenant and keeping AI ethical.",
      thumbnailUrl: "https://i.ytimg.com/vi/JoJUd9oJ8CU/hqdefault.jpg",
      uploadDate: "2025-04-17",
      contentUrl: "https://www.youtube.com/watch?v=JoJUd9oJ8CU",
      embedUrl: "https://www.youtube.com/embed/JoJUd9oJ8CU",
    },
  ],
};

export default function EventsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(eventsJsonLd) }}
      />
      <FloatingNav navItems={navItems} />
      <main className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-100 dark:from-gray-950 dark:via-black dark:to-gray-950">
        <div className="mx-auto max-w-3xl px-4 pb-20 pt-40 md:px-6 md:pt-44">
          <header className="space-y-4">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-primary">
              Events & Talks
            </p>
            <h1 className="text-4xl font-bold leading-tight tracking-tight text-slate-900 dark:text-white md:text-5xl">
              Where CIRIS is showing up
            </h1>
            <p className="text-base leading-7 text-slate-700 dark:text-slate-300">
              Conferences, talks, and recorded interviews. If you will be
              around, reach out on{" "}
              <a
                href="https://discord.gg/fKrVfXC9"
                target="_blank"
                rel="noopener noreferrer"
                className="text-brand-primary hover:underline"
              >
                Discord
              </a>{" "}
              or at{" "}
              <a
                href="mailto:eric@ciris.ai"
                className="text-brand-primary hover:underline"
              >
                eric@ciris.ai
              </a>
              .
            </p>
          </header>

          <Section title="Upcoming" items={UPCOMING} />
          <Section title="Past talks" items={PAST} />
          <Section title="Interviews & recorded talks" items={RECORDED} />

          <p className="mt-10 text-sm text-slate-500 dark:text-slate-400">
            Also tracked in the{" "}
            <Link
              href="https://github.com/CIRISAI/.github/tree/main/events"
              className="text-brand-primary hover:underline"
            >
              org events list
            </Link>
            .
          </p>
        </div>
      </main>
      <Footer />
    </>
  );
}
