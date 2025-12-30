"use client";
import Image from "next/image";
import Link from "next/link";
import FadeInwrapper from "./ui/fadeInwrapper";
import LogoIcon from "./ui/floating/LogoIcon";

interface CardProps {
  headline: string;
  headlineHref?: string;
  copyText: string;
  logoSrc: string;
  logoAlt: string;
  delay?: number;
}

function Card({ headline, headlineHref, copyText, logoSrc, logoAlt, delay = 0 }: CardProps) {
  return (
    <FadeInwrapper delay={delay}>
      <div className="bg-ciris-vlback/40 flex h-full flex-col p-8 transition-shadow duration-300 md:p-20 dark:bg-gray-800">
        {/* Logo */}
        <div className="mb-4 flex justify-center">
          <div className="relative h-8 w-8">
            {logoSrc === "logoIcon" ? (
              <LogoIcon className="fill-brand-primary h-8 w-8 object-contain" />
            ) : (
              <Image
                src={logoSrc}
                alt={logoAlt}
                fill
                className="object-contain"
              />
            )}
          </div>
        </div>
        {headlineHref ? (
          <Link href={headlineHref} className="text-brand-primary text-center text-xl hover:underline">
            {headline}
          </Link>
        ) : (
          <h3 className="text-brand-primary text-center text-xl">{headline}</h3>
        )}
        <p className="flex-grow text-center text-sm leading-relaxed text-gray-600 dark:text-gray-100">
          {copyText}
        </p>
      </div>
    </FadeInwrapper>
  );
}

export default Card;
