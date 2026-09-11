// The spec these pages read has moved, and the build must not die over it.
//
// /grammar/details and /grammar/explore render from the CEG chapters that used
// to live at CIRISRegistry/FSD/CEG/*.md. That directory is now a stub: the
// grammar was absorbed into the CIRIS Constitution, and the upstream signpost
// says the old version line is dead lineage that must not be cited. So there
// is nothing honest to render from the old source and nothing to fall back to.
//
// Rather than fail the whole site's build on a 404, or publish a vendored copy
// of a retired document, these pages say what happened and point at the
// document that is now authoritative. The reader loses tables that no longer
// have a source; they do not get stale ones presented as current.

import Link from "next/link";

export default function SpecMoved({ title }: { title: string }) {
  return (
    <section className="rounded-2xl border border-amber-300/60 bg-amber-50 p-6 dark:border-amber-500/30 dark:bg-amber-950/30 md:p-8">
      <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white md:text-3xl">
        {title}
      </h1>
      <p className="mt-4 max-w-2xl text-sm leading-6 text-slate-700 dark:text-slate-200">
        This page used to render the CIRIS Epistemic Grammar from its own
        chapters. The grammar is no longer a separate document: it was folded
        into the CIRIS Constitution, which is now the one source of truth. The
        chapters this page read are gone from where they lived, and the version
        line they carried was discontinued at the move, so there is nothing here
        we can show you that would still be true.
      </p>
      <p className="mt-4 max-w-2xl text-sm leading-6 text-slate-700 dark:text-slate-200">
        The wire format, the primitives, the envelope fields and the namespace
        all live in the constitution now, in Parts 2 and 3.
      </p>
      <div className="mt-6 flex flex-wrap gap-3">
        <Link
          href="/constitution"
          className="inline-block rounded-lg bg-brand-primary px-5 py-3 text-sm font-semibold text-white"
        >
          Read the Constitution
        </Link>
        <a
          href="https://github.com/CIRISAI/CIRISConstitution"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block rounded-lg border border-slate-300 px-5 py-3 text-sm font-semibold text-slate-700 dark:border-slate-600 dark:text-slate-200"
        >
          The source repository
        </a>
        <Link
          href="/grammar"
          className="inline-block rounded-lg border border-slate-300 px-5 py-3 text-sm font-semibold text-slate-700 dark:border-slate-600 dark:text-slate-200"
        >
          Back to CEG
        </Link>
      </div>
    </section>
  );
}
