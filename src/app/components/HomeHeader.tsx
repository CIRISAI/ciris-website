"use client";
import FadeInwrapper from "./ui/fadeInwrapper";
import TextGenerateEffectRND from "./ui/text-generate-effect-rdn";
import CButton from "./Buttons";
import Image from "next/image";
import RotatingLogo from "./ui/floating/RotatingLogo";
// TODO RANDOM VIDEOS
interface HomeHeaderProps {
  headline: string;
  subheadline?: string;
  description?: string;
  supportingText?: string;
  mediaType: "video" | "image";
  mediaSrc: string;
  opacityValue: number;
  buttonText?: string;
  buttonHref?: string;
  linkText?: string;
  linkHref?: string;
}

export default function HomeHeader({
  headline,
  subheadline,
  description,
  supportingText,
  mediaType,
  mediaSrc,
  buttonText,
  buttonHref,
  linkText,
  linkHref,
  opacityValue,
}: HomeHeaderProps) {
  return (
    <div className="h-90v relative isolate container mt-4 overflow-hidden rounded-[28px] shadow-2xl">
      <FadeInwrapper delay={1}>
        <div className="bg-black opacity-100">
          {mediaType === "video" ? (
            <video
              autoPlay
              loop
              muted
              playsInline
              src={mediaSrc}
              className="absolute inset-0 -z-10 h-full w-full rounded-xl object-cover"
            />
          ) : (
            <Image
              alt="Background Image"
              src={mediaSrc}
              width={1536}
              height={768}
              className="absolute inset-0 -z-10 h-full w-full rounded-xl object-cover"
            />
          )}
        </div>
      </FadeInwrapper>
      <div
        style={{ opacity: opacityValue }}
        className="absolute inset-0 rounded-xl bg-black"
      />
      <div className="relative top-0 z-10 max-w-[1536px] px-8 py-32 sm:py-44 md:px-40 lg:py-52">
        <div className="text-left">
          <RotatingLogo
            className="absolute top-24 -left-20 z-1 animate-[spin_150s_linear_infinite] fill-white opacity-100 md:top-52 md:left-10 dark:fill-white/50"
            width={222}
            height={222}
          />
          <TextGenerateEffectRND
            textContent={headline}
            className="mt-[120px] w-full text-5xl font-medium tracking-tight text-white md:text-8xl dark:text-white"
          />
          {subheadline && (
            <FadeInwrapper delay={1.2}>
              <div className="relative top-1 opacity-0">
                <h2 className="text-2xl font-normal text-gray-100 md:max-w-[500px]">
                  {subheadline}
                </h2>
              </div>
            </FadeInwrapper>
          )}
          <FadeInwrapper delay={1.4}>
            <div className="relative top-1 opacity-0">
              <p className="text-md mt-6 leading-relaxed font-normal text-gray-100 md:max-w-[500px]">
                {description}
              </p>
            </div>
          </FadeInwrapper>{" "}
          <FadeInwrapper delay={1.6}>
            <div className="mt-10 flex items-center justify-start gap-x-6 opacity-0">
              {buttonText && buttonHref && (
                <CButton
                  href={buttonHref}
                  text={buttonText}
                  variant="primary"
                />
              )}
              {linkText && linkHref && (
                <a
                  href={linkHref}
                  className="text-sm text-white transition-colors duration-300 hover:text-white hover:underline"
                >
                  {linkText}
                </a>
              )}
            </div>
          </FadeInwrapper>
          {supportingText && (
            <FadeInwrapper delay={1.75}>
              <div className="relative top-1 mt-6 opacity-0">
                <p className="text-sm font-medium text-white/90 md:max-w-[720px]">
                  {supportingText}
                </p>
              </div>
            </FadeInwrapper>
          )}
        </div>
      </div>
    </div>
  );
}
