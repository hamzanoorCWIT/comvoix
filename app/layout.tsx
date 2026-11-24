import type { Metadata } from "next";
import { connection } from "next/server";
import { Ubuntu } from "next/font/google";
import "./globals.css";
import { SiteHeader } from "./components/site-header";
import { SiteFooter } from "./components/site-footer";
import { HeadingLines } from "./components/heading-lines";
const ubuntu = Ubuntu({ subsets: ["latin"], weight: ["400", "500", "700"], variable: "--font-ubuntu", display: "swap" });

export const metadata: Metadata = {
    title: "Comvoix — Global Communication Solutions",
    description: "Secure voice, messaging and collaboration solutions designed to keep modern businesses connected, productive and ready to grow.",
};
export default async function RootLayout({ children }: LayoutProps<"/">) {
    // Nonces must be generated per request, never baked into a static HTML shell.
    await connection();
    return (<html lang="en" className={`h-full antialiased ${ubuntu.variable}`}>
      {/* Browser extensions may inject body attributes before hydration (e.g. cz-shortcut-listen). */}
      <body className="min-h-full flex flex-col" suppressHydrationWarning><SiteHeader />{children}<SiteFooter /><HeadingLines /></body>
    </html>);
}
