import {
  IconRocket,
  IconNetwork,
  IconShieldCheck,
  IconCompass,
  IconFlask,
  IconBook,
  IconBrandGithub,
} from "@tabler/icons-react";

// Golden-paths nav: the three things a visitor should do (install, understand
// the vision, trust the safety case) are flagged `golden` and highlighted; the
// rest is a lean supporting rail. Insider concept pages (first-contact,
// coherence-ratchet, federation, compare) live in the footer / in-page links.
const navItems = [
  {
    name: "Install",
    subtitle: "Own it today",
    link: "/install",
    key: "install",
    golden: true,
    icon: <IconRocket className="h-4 w-4 text-neutral-500 dark:text-white" />,
  },
  {
    name: "Epistemic Web",
    subtitle: "An internet with no center",
    link: "/epistemic-web",
    key: "epistemicWeb",
    golden: true,
    icon: <IconNetwork className="h-4 w-4 text-neutral-500 dark:text-white" />,
  },
  {
    name: "Safety",
    subtitle: "The safety case",
    link: "/safety",
    key: "safety",
    golden: true,
    icon: <IconShieldCheck className="h-4 w-4 text-neutral-500 dark:text-white" />,
  },
  {
    name: "How it works",
    subtitle: "Inside the agent",
    link: "/how-it-works",
    key: "howItWorks",
    icon: <IconCompass className="h-4 w-4 text-neutral-500 dark:text-white" />,
  },
  {
    name: "Research",
    subtitle: "Papers & proof",
    link: "/research-status",
    key: "research",
    icon: <IconFlask className="h-4 w-4 text-neutral-500 dark:text-white" />,
  },
  {
    name: "Accord",
    subtitle: "The framework",
    link: "/sections/main",
    key: "accord",
    icon: <IconBook className="h-4 w-4 text-neutral-500 dark:text-white" />,
  },
  {
    name: "GitHub",
    subtitle: "Open source",
    link: "https://github.com/CIRISAI/CIRISAgent",
    key: "github",
    icon: <IconBrandGithub className="h-4 w-4 text-neutral-500 dark:text-white" />,
  },
];

export default navItems;
