import anthropicLogo from "@/assets/anthropic-logo.svg";
import type { ICompanyCard } from "@/types";

export const COMPANIES: ICompanyCard[] = [
  {
    id: "anthropic",
    name: "Anthropic",
    description: "https://www.anthropic.com/careers/jobs",
    logo: anthropicLogo,
    logoInitials: "AN",
    color: "#d19b75",
    path: "/matchfinder/anthropic",
    isAvailable: true,
  },
  {
    id: "microsoft",
    name: "Microsoft",
    description: "Coming soon — careers.microsoft.com requires JS rendering.",
    logoInitials: "MS",
    color: "#0078d4",
    path: "/matchfinder/microsoft",
    isAvailable: false,
  },
  {
    id: "google",
    name: "Google",
    description: "Coming soon — careers.google.com requires JS rendering.",
    logoInitials: "G",
    color: "#4285f4",
    path: "/matchfinder/google",
    isAvailable: false,
  },
  {
    id: "amazon",
    name: "Amazon",
    description: "Coming soon — amazon.jobs requires JS rendering.",
    logoInitials: "A",
    color: "#ff9900",
    path: "/matchfinder/amazon",
    isAvailable: false,
  },
];
