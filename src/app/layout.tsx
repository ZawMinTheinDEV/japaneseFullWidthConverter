import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "文字幅 · Japanese width converter",
  description:
    "Convert Japanese text to full-width and half-width characters, privately in your browser.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
