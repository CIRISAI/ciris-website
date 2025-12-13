import { IconHome, IconHeart, IconBook, IconRocket, IconBrandGithub } from "@tabler/icons-react";

const navItems = [
  {
    name: "Home",
    subtitle: "Welcome to CIRIS",
    link: "/",
    icon: <IconHome className="h-4 w-4 text-neutral-500 dark:text-white" />,
  },
  {
    name: "Vision",
    subtitle: "Why CIRIS Exists",
    link: "/vision",
    icon: <IconHeart className="h-4 w-4 text-neutral-500 dark:text-white" />,
  },
  {
    name: "Covenant",
    subtitle: "The Ethical Framework",
    link: "/sections/main",
    icon: <IconBook className="h-4 w-4 text-neutral-500 dark:text-white" />,
  },
  {
    name: "Get Started",
    subtitle: "Install & Use CIRIS",
    link: "/install",
    icon: <IconRocket className="h-4 w-4 text-neutral-500 dark:text-white" />,
  },
  {
    name: "GitHub",
    subtitle: "Open Source Code",
    link: "https://github.com/CIRISAI/CIRISAgent",
    icon: <IconBrandGithub className="h-4 w-4 text-neutral-500 dark:text-white" />,
  },
];

export default navItems;
