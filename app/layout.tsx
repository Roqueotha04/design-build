import type { Metadata } from "next";
import { Instrument_Sans, Instrument_Serif } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/components/providers/LanguageProvider";
import { MotionProvider } from "@/components/providers/MotionProvider";
import { siteMeta } from "@/lib/content/seed";

const headingFont = Instrument_Sans({
  subsets: ["latin"],
  variable: "--font-heading-face",
  display: "swap",
});

const bodyFont = Instrument_Sans({
  subsets: ["latin"],
  variable: "--font-body-face",
  display: "swap",
});

const serifFont = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-serif-face",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteMeta.url),
  title: {
    default: siteMeta.name,
    template: `%s · ${siteMeta.name}`,
  },
  description: siteMeta.description.es,
  openGraph: {
    title: siteMeta.name,
    description: siteMeta.description.es,
    url: siteMeta.url,
    siteName: siteMeta.name,
    locale: "es",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="es"
      suppressHydrationWarning
      className={`${headingFont.variable} ${bodyFont.variable} ${serifFont.variable} h-full antialiased`}
    >
      <body className="min-h-full overflow-x-hidden bg-background font-body text-foreground">
        <MotionProvider>
          <LanguageProvider>{children}</LanguageProvider>
        </MotionProvider>
      </body>
    </html>
  );
}
