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
          "fixed inset-x-0 top-10 z-[5000] mx-auto flex flex-col md:flex-row max-w-fit items-center justify-between rounded-full border border-white/[0.2] bg-white/80 py-2 px-4 md:px-8 backdrop-blur-md dark:bg-black/70 shadow-lg",
          className
        )}
      >
        {/* Logo and Nav Items Group */}
        <div className="flex items-center gap-8">
          <Link
            href={"/"}
            className={cn(
              "relative flex items-center text-neutral-800 hover:text-neutral-500 dark:text-neutral-50 dark:hover:text-neutral-300"
            )}
          >
            <LogoIcon />
          </Link>
          
          {/* Navigation Items */}
          <div className="hidden md:flex items-center gap-6">
            {navItems.map((navItem: any, idx: number) => (
              <Link
                key={`link=${idx}`}
                href={navItem.link}
                className={cn(
                  "flex flex-col items-center text-neutral-700 hover:text-neutral-900 dark:text-neutral-300 dark:hover:text-white transition-colors"
                )}
              >
                <span className="text-sm font-medium">
                  {navItem.name}
                </span>
                <span className="text-[10px] uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
                  {navItem.subtitle}
                </span>
              </Link>
            ))}
          </div>
        </div>

        {/* Mobile Nav Items */}
        <div className="flex md:hidden items-center gap-3 mt-2">
          {navItems.map((navItem: any, idx: number) => (
            <Link
              key={`mobile-link=${idx}`}
              href={navItem.link}
              className={cn(
                "text-xs font-medium text-neutral-700 hover:text-neutral-900 dark:text-neutral-300 dark:hover:text-white"
              )}
            >
              {navItem.name}
            </Link>
          ))}
        </div>

        {/* Action Buttons Group */}
        <div className="flex items-center gap-3 mt-3 md:mt-0">
          <Link
            href={"https://discord.gg/SWGM7Gsvrv"}
            className="bg-[#5865F2] hover:bg-[#4752C4] text-white flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-all hover:shadow-md"
          >
            <DiscordLogo weight="fill" size={18} />
            <span className="hidden sm:inline">Chat with Agents</span>
          </Link>
          
          <Link
            href={"https://agents.ciris.ai"}
            className="text-neutral-700 border border-neutral-300 hover:border-neutral-400 hover:bg-neutral-50 flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-all dark:text-neutral-300 dark:border-neutral-600 dark:hover:border-neutral-500 dark:hover:bg-neutral-800"
          >
            <UserCircle size={18} />
            <span className="hidden sm:inline">Login</span>
          </Link>
          
          <Link
            href={"https://agents.ciris.ai/lens"}
            className="text-neutral-700 border border-neutral-300 hover:border-neutral-400 hover:bg-neutral-50 flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-all dark:text-neutral-300 dark:border-neutral-600 dark:hover:border-neutral-500 dark:hover:bg-neutral-800"
          >
            <GridFour size={18} />
            <span className="hidden sm:inline">Dashboard</span>
          </Link>
          
          <Link
            href={"https://github.com/CIRISAI/CIRISAgent"}
            className="text-neutral-700 border border-neutral-300 hover:border-neutral-400 hover:bg-neutral-50 flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-all dark:text-neutral-300 dark:border-neutral-600 dark:hover:border-neutral-500 dark:hover:bg-neutral-800"
          >
            <GithubLogoIcon size={18} />
            <span className="hidden sm:inline">GitHub</span>
          </Link>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};
