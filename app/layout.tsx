import type { Metadata } from "next";
import { Schibsted_Grotesk , Martian_Mono, Geist } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import ScrollBackground from "@/components/ScrollBackground";
import NavBar from "@/components/NavBar";
import ContactModal from "@/components/ContactModal";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

const schibstedGrotesk = Schibsted_Grotesk({
  variable: "--font-schibsted_grotesk",
  subsets: ["latin"],
});

const martianMono = Martian_Mono({
  variable: "--font-matian-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "DevEvent",
  description: "The Hub for Every Dev Event You Mustn't Miss",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={cn("min-h-screen", "antialiased", schibstedGrotesk.variable, martianMono.variable, "font-sans", geist.variable)}
    >
      <body className="min-h-full flex flex-col">
        <NavBar/>
        <ScrollBackground />
        <main>{children}</main>
        <ContactModal />
      </body>
    </html>
  );
}
