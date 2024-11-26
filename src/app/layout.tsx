import type { Metadata } from "next";
import "./globals.css";
import { LayoutMain } from "@/components/Layout/Main";
import { Providers } from "@/providers/Providers";

export const metadata: Metadata = {
  title: "Stellar DEX",
  description: "Stellar DEX PoC",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <LayoutMain>{children}</LayoutMain>
        </Providers>
      </body>
    </html>
  );
}
