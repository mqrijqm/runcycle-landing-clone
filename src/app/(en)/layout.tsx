import type { Metadata } from "next";
import { Document, buildMetadata } from "@/components/Document";

export const metadata: Metadata = buildMetadata("en");

export default function EnglishRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <Document locale="en">{children}</Document>;
}
