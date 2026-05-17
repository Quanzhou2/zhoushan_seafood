import type { Metadata } from "next";
import "./globals.css";
import { StoreProvider } from "@/lib/store";
import { DataProvider } from "@/lib/data-context";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: "Zhoushan Catch — Cross-border seafood marketplace",
  description:
    "Verified Zhoushan fishing cooperatives shipping wild and farmed seafood to 23 countries. End-to-end cold chain, customs done-for-you, multi-currency settlement.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col">
        <StoreProvider>
          <DataProvider>
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
          </DataProvider>
        </StoreProvider>
      </body>
    </html>
  );
}
