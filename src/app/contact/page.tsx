import type { Metadata } from "next";
import ContactView from "@/components/ContactView";

export const metadata: Metadata = {
  title: "Contact — Start a Project",
  description:
    "Inquiries, collaborations, engineering retainers, and the occasional 'just hi'. Fuad Talukder is a Full-Stack Developer & Software Engineer based in Dhaka, Bangladesh.",
  alternates: {
    canonical: "/contact",
  },
  openGraph: {
    title: "Contact — Start a Project | Fuad Talukder",
    description:
      "Direct inquiry and structured project brief for Fuad Talukder — Full-Stack Developer & Software Engineer.",
    url: "https://fuadtalukder.vercel.app/contact",
  },
};

export default function ContactPage() {
  return <ContactView />;
}
