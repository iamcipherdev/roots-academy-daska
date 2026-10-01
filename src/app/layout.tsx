import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as SonnerToaster } from "@/components/ui/sonner";

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("http://localhost:3000"),
  title: "Roots Academy of Sciences & Computer College — Daska | Strong Roots. Better Results.",
  description:
    "Roots Academy of Sciences & Computer College, Model Town Daska — quality education, weekly tests, monthly short tests, science and computer education under the supervision of Dr. Mohsin Ali (PhD Physics). Admissions open for Daska and Jamkey Cheema campuses.",
  keywords: [
    "Roots Academy Daska",
    "Roots Academy of Sciences",
    "academy in Daska",
    "computer college Daska",
    "Dr Mohsin Ali",
    "IELTS Daska",
    "DIT diploma Daska",
    "Model Town Daska academy",
  ],
  openGraph: {
    title: "Roots Academy of Sciences & Computer College — Daska",
    description:
      "Strong Roots. Better Results. — Quality education, regular assessment and dedicated academic guidance for students in Daska.",
    type: "website",
    images: ["/images/lab-hero.jpg"],
  },
};

export const viewport: Viewport = {
  themeColor: "#c1121f",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${jakarta.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        {children}
        <Toaster />
        <SonnerToaster position="top-center" richColors closeButton />
      </body>
    </html>
  );
}
