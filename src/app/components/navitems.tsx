import {
  IconCompass,
  IconRocket,
  IconScale,
  IconFlask,
  IconBook,
  IconBrandGithub,
  IconLockOpen,
  IconNetwork,
} from "@tabler/icons-react";

const navItems = [
  {
    name: "First Contact",
    subtitle: "Start Here: the Why",
    link: "/first-contact",
    icon: <IconCompass className="h-4 w-4 text-neutral-500 dark:text-white" />,
  },
  {
    name: "Install",
    subtitle: "Get the Agent",
    link: "/install",
    icon: <IconRocket className="h-4 w-4 text-neutral-500 dark:text-white" />,
  },
  {
    name: "Coherence Ratchet",
    subtitle: "The Pressure",
    link: "/coherence-ratchet",
    icon: <IconLockOpen className="h-4 w-4 text-neutral-500 dark:text-white" />,
  },
  {
    name: "Federation",
    subtitle: "The Response",
    link: "/federation",
    icon: <IconNetwork className="h-4 w-4 text-neutral-500 dark:text-white" />,
  },
  {
    name: "Compare",
    subtitle: "See the Safety Case",
    link: "/compare",
    icon: <IconScale className="h-4 w-4 text-neutral-500 dark:text-white" />,
  },
  {
    name: "Research",
    subtitle: "Papers & Trace Commons",
    link: "/research-status",
    icon: <IconFlask className="h-4 w-4 text-neutral-500 dark:text-white" />,
  },
  {
    name: "Accord",
    subtitle: "Read the Framework",
    link: "/sections/main",
    icon: <IconBook className="h-4 w-4 text-neutral-500 dark:text-white" />,
  },
  {
    name: "GitHub",
    subtitle: "Open Source Code",
    link: "https://github.com/CIRISAI/CIRISAgent",
    icon: <IconBrandGithub className="h-4 w-4 text-neutral-500 dark:text-white" />,
  },
];

export default navItems;
