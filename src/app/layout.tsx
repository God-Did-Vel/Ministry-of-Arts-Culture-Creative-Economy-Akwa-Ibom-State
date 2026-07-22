import type { Metadata } from "next";
import { Outfit, Playfair_Display } from "next/font/google";
import "./globals.css";
import { AppProvider } from "@/components/AppContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ChatAssistant from "@/components/ChatAssistant";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Ministry of Arts, Culture & Creative Economy Akwa Ibom State",
  description: "Official digital portal of the Ministry of Arts, Culture & Creative Economy, Akwa Ibom State ('The Land of Promise') for cultural heritage preservation, creative sector grants, artist registration, virtual museum exhibitions, and public services.",
  keywords: ["Akwa Ibom State", "Uyo", "Culture", "Arts", "Creative Economy", "Raffia City", "Ikot Ekpene", "Oron Museum", "Ekpe Heritage", "Ibeno Beach", "Artist Directory", "Nigeria"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${outfit.variable} ${playfair.variable} scroll-smooth`}>
      <body className="bg-[#FAF8F5] text-[#111A2E] antialiased min-h-screen flex flex-col selection:bg-[#C7A349]/30 selection:text-[#0B5E3C]">
        <AppProvider>
          <Header />
          <main className="flex-grow">
            {children}
          </main>
          <Footer />
          <ChatAssistant />
        </AppProvider>
      </body>
    </html>
  );
}
