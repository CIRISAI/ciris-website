// Slim notice above the /sections Accord reader: the Accord text preserved
// here was folded into the CIRIS Constitution, which is the current document.
// This is the one sanctioned place the historical name stays visible, framed
// as history, with the way forward one click away.

import Link from "next/link";
import { getDictionary } from "@/i18n/dictionaries";
import { localizeHref } from "@/i18n/config";

export default function SectionsConstitutionNotice({ locale }: { locale: string }) {
  const t = getDictionary(locale);
  return (
    <div className="mx-4 mt-4 rounded-lg border border-amber-500/40 bg-amber-500/10 px-4 py-3 text-sm">
      <span>{t.constitution.readerNotice}</span>{" "}
      <Link
        href={localizeHref("/constitution", locale)}
        className="font-medium text-brand-primary hover:underline"
      >
        {t.constitution.readerNoticeCta}
      </Link>
    </div>
  );
}
