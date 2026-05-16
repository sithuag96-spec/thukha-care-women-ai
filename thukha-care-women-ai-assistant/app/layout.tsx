import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Thukha Care Women AI Assistant",
  description: "Safe, private, and supportive AI health assistant for women's health education and triage by Thukha Medical Centre.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="my">
      <body>
        {children}
      </body>
    </html>
  );
}
