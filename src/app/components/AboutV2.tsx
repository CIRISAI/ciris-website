// v2 "dark-blueprint" /about page. Renders the same t.about.* dictionary keys
// the old AboutContent did — no copy is rewritten or re-translated here —
// inside the reusable ContentShell, with a teal accent. The page's sections
// (funding, board members, founder, next-steps links, and the closing
// get-in-touch CTA) are mapped onto the shared content.module vocabulary:
// sectionLabel/h2 headers, paragraphs, callouts, and the accent card variants.
// Board-member and founder portraits are kept as next/image inside cards so the
// people stay on the page; existing links/CTAs are preserved verbatim.
//
// Strings that carry typographic emphasis are plain text in this dictionary, so
// no dangerouslySetInnerHTML is needed here.

import Link from "next/link";
import Image from "next/image";
import type { Dictionary } from "@/i18n/dictionaries";
import { localizeHref } from "@/i18n/config";
import ContentShell, { contentStyles as s } from "@/app/components/v2/ContentShell";

export default function AboutV2({ t, locale }: { t: Dictionary; locale: string }) {
  const about = t.about;
  const lh = (href: string) => localizeHref(href, locale);

  return (
    <ContentShell
      locale={locale}
      accent="teal"
      kicker={about.header.subheadline}
      title={about.header.headline}
      backHref="/"
      backLabel="back to the lobby"
      mtBanner={t.common.mtBanner}
    >
      {/* Funding / volunteers */}
      <section className={s.section}>
        <p className={s.sectionLabel}>{about.funding.subheadline}</p>
        <h2 className={s.h2}>{about.funding.headline}</h2>
        <p className={s.paragraph}>{about.funding.copyText}</p>
      </section>

      {/* Board members */}
      <section className={s.section}>
        <p className={s.sectionLabel}>{about.boardSection.headline}</p>
        <h2 className={s.h2}>{about.boardSection.headline}</h2>
        <p className={s.paragraph}>{about.boardSection.subheadline}</p>
        <div className={`${s.cardGrid} ${s.cardGridTwo}`}>
          {about.boardMembers.map((member) => (
            <div key={member.headline} className={`${s.card} ${s.cTeal}`}>
              <Image
                src={member.imageUrl}
                alt={member.headline}
                width={88}
                height={88}
                style={{
                  width: 88,
                  height: 88,
                  objectFit: "cover",
                  borderRadius: 10,
                  marginBottom: 12,
                }}
              />
              <h3>
                {member.headline} · {member.subheadline}
              </h3>
              <p>{member.copyText}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Founder */}
      <section className={s.section}>
        <p className={s.sectionLabel}>{about.founderSection.headline}</p>
        <h2 className={s.h2}>{about.founderSection.headline}</h2>
        <div className={s.cardGrid}>
          <div className={`${s.card} ${s.cBrass}`}>
            <Image
              src="/eric.jpg"
              alt={about.founder.imageAlt}
              width={88}
              height={88}
              style={{
                width: 88,
                height: 88,
                objectFit: "cover",
                borderRadius: 10,
                marginBottom: 12,
              }}
            />
            <h3>
              {about.founder.name} · {about.founder.title}
            </h3>
            <p>{about.founder.bio}</p>
          </div>
        </div>
      </section>

      {/* Next steps */}
      <section className={s.section}>
        <p className={s.footnote}>
          <Link href={lh("/vision")}>{about.links.vision}</Link>
          {"  ·  "}
          <Link href={lh("/first-contact")}>{about.links.firstContact}</Link>
          {"  ·  "}
          <Link href={lh("/mdd")}>{about.links.mdd}</Link>
        </p>
      </section>

      {/* Get in touch CTA */}
      <section className={s.cta}>
        <p className={s.ctaPara}>
          {about.hero.headline} {about.hero.subheadline}
        </p>
        <p className={s.paragraph}>{about.hero.copyText}</p>
        <div className={s.ctaRow}>
          <a href="mailto:info@ciris.ai" className={`${s.btn} ${s.btnP}`}>
            {about.hero.buttonText}
          </a>
        </div>
      </section>
    </ContentShell>
  );
}
