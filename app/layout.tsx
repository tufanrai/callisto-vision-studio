import type { Metadata, Viewport } from "next";
import { Montserrat, Playfair_Display } from "next/font/google";
import { site } from "@/lib/site";
import { jsonLdGraph } from "@/lib/seo";
import { MotionProvider } from "@/components/motion/MotionProvider";
import { ScrollProgress } from "@/components/motion/ScrollProgress";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import "./globals.css";

/**
 * Primary and secondary typefaces, per the Pomelli brand book. Both are
 * loaded as variable fonts so display type can sit at 800 and labels at 700
 * without pulling extra weight files.
 */
const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  display: "swap",
});

const title = `${site.name} — Creative & Digital Marketing, Priced in the Open`;

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: title,
    template: `%s — ${site.name}`,
  },
  description: site.description,
  applicationName: site.name,
  authors: [{ name: site.founder.name }],
  creator: site.name,
  publisher: site.name,
  generator: null,
  keywords: [
    "creative agency",
    "digital marketing agency",
    "graphic design services",
    "branding agency",
    "motion graphics",
    "video editing services",
    "social media management",
    "logo design",
    "agency pricing",
    "design agency UK",
    "design agency Australia",
    "design agency UAE",
    "Kathmandu design studio",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    siteName: site.name,
    title,
    description: site.description,
    url: site.url,
    locale: "en",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description: site.description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  category: "Design & Marketing Services",
  formatDetection: {
    telephone: true,
    address: true,
    email: true,
  },
};

export const viewport: Viewport = {
  themeColor: "#1C3D7A",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${montserrat.variable}`}
      /**
       * globals.css sets `scroll-behavior: smooth` for in-page anchors. Next
       * needs this marker to know the smoothness is deliberate, so it can
       * suppress it during route transitions — without it, a navigation
       * animates the scroll reset instead of jumping.
       */
      data-scroll-behavior="smooth"
      /**
       * The bootstrap below writes `data-js` onto this element before React
       * hydrates, which is the entire point of it — the attribute has to be
       * in the DOM before first paint. React therefore always finds an
       * attribute here that was not in the server HTML. Scoped to this one
       * element and one level deep, so a genuine mismatch anywhere in the
       * tree is still reported.
       */
      suppressHydrationWarning
    >
      <body className="bg-snow text-twilight antialiased">
        {/* Runs before first paint, so animated elements start hidden without
            a flash. The timer is the failsafe: MotionProvider clears it on
            mount, and if that never happens — bundle failure, JS disabled,
            a runtime error — everything becomes visible again rather than
            being stranded at opacity 0. */}
        <script
          dangerouslySetInnerHTML={{
            __html:
              'document.documentElement.dataset.js="on";' +
              'window.__animFailsafe=setTimeout(function(){' +
              'document.documentElement.dataset.js="off"},4000)',
          }}
        />
        <a
          href="#main"
          className="label sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:bg-doe focus:px-6 focus:py-4 focus:text-ink-deep"
        >
          Skip to content
        </a>
        <MotionProvider />
        <ScrollProgress />
        <Header />
        <main id="main">{children}</main>
        <Footer />
        <script
          type="application/ld+json"
          // Serialised from typed content modules; no user input reaches this.
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdGraph()) }}
        />
      </body>
    </html>
  );
}
