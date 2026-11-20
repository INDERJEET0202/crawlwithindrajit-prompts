import LegalPage, { legalMetadata } from "@/components/LegalPage";

export const metadata = legalMetadata("contact");

export default function Page() {
  return <LegalPage slug="contact" />;
}
