import { IconHome } from "@tabler/icons-react";

const navItems = [
  {
    name: "Home",
    subtitle: "Welcome to CIRIS",
    link: "/",
    icon: <IconHome className="h-4 w-4 text-neutral-500 dark:text-white" />,
  },
  {
    name: "About us",
    subtitle: "Learn more about CIRIS",
    link: "/about",
    icon: <IconHome className="h-4 w-4 text-neutral-500 dark:text-white" />,
  },
  {
    name: "Covenant",
    subtitle: "Our ethical covenant",
    link: "/sections/main",
    icon: <IconHome className="h-4 w-4 text-neutral-500 dark:text-white" />,
  },
  {
    name: "GitHub",
    subtitle: "Open Source Code",
    link: "https://github.com/CIRISAI/CIRISAgent",
    icon: <IconHome className="h-4 w-4 text-neutral-500 dark:text-white" />,
  },
];

export default navItems;
