import React, { useState } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
} from "framer-motion";
import { cn } from "@/lib/utils";
import Link from "next/link";
import Image from "next/image";
import { GithubLogoIcon, DiscordLogo, UserCircle, GridFour } from "@phosphor-icons/react";
import LogoIcon from "./LogoIcon";

export const FloatingNav = ({
  navItems,
  className,
}: {
  navItems: {
    name: string;
    link: string;
    subtitle?: string;
    icon?: React.JSX.Element;
  }[];
  className?: string;
}) => {
  const { scrollYProgress } = useScroll();

  const [visible, setVisible] = useState(true);

  useMotionValueEvent(scrollYProgress, "change", (current) => {
    if (typeof current === "number") {
      const direction = current! - scrollYProgress.getPrevious()!;

      if (scrollYProgress.get() < 0.05) {
        setVisible(true);
      } else {
        if (direction < 0) {
          setVisible(true);
        } else {
          setVisible(false);
        }
      }
    }
  });

  return (
    <AnimatePresence mode="wait">
      <motion.div
        initial={{
          opacity: 1,
          y: -100,
        }}
        animate={{
          y: visible ? 0 : -100,
          opacity: visible ? 1 : 0,
        }}
        transition={{ type: "spring" }}
        className={cn(
          "fixed inset-x-0 top-10 z-[5000] mx-auto flex flex-col md:flex-row max-w-fit items-center justify-center rounded-lg border-white/[0.1] bg-white/70 py-4 px-6 md:pr-8 md:pl-12 backdrop-blur-md md:space-x-16 dark:bg-black/50",
          className
        )}
      >
        {/* Mobile Layout: Logo + Nav Items in first row */}
        <div className="flex items-center justify-center w-full md:w-auto">
          <Link
            href={"/"}
            className={cn(
              "relative flex items-center space-x-1 text-neutral-800 hover:text-neutral-500 dark:text-neutral-50 dark:hover:text-neutral-300 mr-4 md:mr-0"
            )}
          >
            {/* LogoIcon SVG extracted to its own component */}
            <LogoIcon />
          </Link>
          <div className="flex items-center">
            {navItems.map((navItem: any, idx: number) => (
              <Link
                key={`link=${idx}`}
                href={navItem.link}
                className={cn(
                  "hover:text-brand-primary flex-column relative mx-2 md:mx-4 block items-center space-x-1 text-sm font-normal text-neutral-700 dark:text-neutral-50 dark:hover:text-neutral-300"
                )}
              >
                <p className="text-[0.64rem] font-bold sm:block md:text-sm md:font-normal">
                  {navItem.name}
                </p>
                <p className="text-xxs hidden font-bold uppercase sm:block">
                  {navItem.subtitle}
                </p>
              </Link>
            ))}
          </div>
        </div>

        {/* Mobile Layout: Action buttons in second row, Desktop: inline */}
        <div className="flex items-center justify-center mt-3 md:mt-0 gap-2">
          <Link
            href={"https://discord.gg/SWGM7Gsvrv"}
            className={
              "bg-[#5865F2] hover:bg-[#4752C4] text-white flex items-center space-x-1 rounded-full px-3 md:px-4 py-1 text-xs md:text-sm transition-colors"
            }
          >
            <DiscordLogo weight="fill" className="mr-1" size={16} />
            <span className="text-xxs font-bold">Chat with Agents</span>
          </Link>
          <Link
            href={"https://agents.ciris.ai"}
            className={
              "text-neutral-700 border-neutral-400 flex items-center space-x-1 rounded-full border-2 px-3 md:px-4 py-1 text-xs md:text-sm hover:text-black hover:border-black dark:text-neutral-50 dark:border-neutral-50 dark:hover:text-neutral-300 dark:hover:border-neutral-300 transition-colors"
            }
          >
            <UserCircle className="mr-1" size={16} />
            <span className="text-xxs font-bold">Login</span>
          </Link>
          <Link
            href={"https://agents.ciris.ai/lens"}
            className={
              "text-neutral-700 border-neutral-400 flex items-center space-x-1 rounded-full border-2 px-3 md:px-4 py-1 text-xs md:text-sm hover:text-black hover:border-black dark:text-neutral-50 dark:border-neutral-50 dark:hover:text-neutral-300 dark:hover:border-neutral-300 transition-colors"
            }
          >
            <GridFour className="mr-1" size={16} />
            <span className="text-xxs font-bold">Dashboard</span>
          </Link>
        </div>

        {/* Mobile Layout: GitHub in third row, Desktop: inline */}
        <div className="flex items-center justify-center mt-3 md:mt-0">
          <Link
            href={"https://github.com/CIRISAI/CIRISAgent"}
            className={
              "text-brand-primary border-brand-primary fill-brand-primary flex items-center space-x-1 rounded-full border-2 px-3 md:px-4 py-1 text-xs md:text-sm hover:fill-black hover:text-black dark:text-neutral-50"
            }
          >
            <GithubLogoIcon fill="current" className="mr-1" size={16} />
            <span className="text-xxs font-bold">Github</span>
          </Link>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};
