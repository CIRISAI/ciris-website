import {
  IconRocket,
  IconScale,
  IconShieldCheck,
  IconBook,
  IconBrandGithub,
} from "@tabler/icons-react";

const navItems = [
  {
    name: "Install",
    subtitle: "Get the Agent",
    link: "/install",
    icon: <IconRocket className="h-4 w-4 text-neutral-500 dark:text-white" />,
  },
  {
    name: "Compare",
    subtitle: "See the Safety Case",
    link: "/compare",
    icon: <IconScale className="h-4 w-4 text-neutral-500 dark:text-white" />,
  },
  {
    name: "Platform",
    subtitle: "Hosted, Mobile, and More",
    link: "/services",
    icon: <IconShieldCheck className="h-4 w-4 text-neutral-500 dark:text-white" />,
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
