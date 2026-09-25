import type { Metadata } from "next";
import { Document, buildMetadata } from "@/components/Document";

export const metadata: Metadata = buildMetadata("bs");

export default function BosnianRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <Document locale="bs">{children}</Document>;
}
