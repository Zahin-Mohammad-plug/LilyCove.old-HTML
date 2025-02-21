// import localFont from "next/font/local";
import { Oxanium } from 'next/font/google';
import { Analytics } from "@vercel/analytics/react"

import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import "./globals.css";

// const geistSans = localFont({
//   src: "./fonts/GeistVF.woff",
//   variable: "--font-geist-sans",
//   weight: "100 900",
// });
// const geistMono = localFont({
//   src: "./fonts/GeistMonoVF.woff",
//   variable: "--font-geist-mono",
//   weight: "100 900",
// });

const oxanium = Oxanium({
  subsets: ['latin'], // Specify subsets based on your language needs
  weight: ['400', '500', '700'], // Specify the font weights you need
  variable: "--font-oxanium",
});

// const oxanium = Oxanium({
//   subsets: ['latin'], // Specify subsets based on your language needs
//   variable: "--font-oxanium",
//   // weight: ['400', '500', '700'], // Specify the font weights you need
// });


export const metadata = {
  title: "LilyCove",
  description: "Track Pokemon cards, sets, series, and prices.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={oxanium.className}>
      <body >
        <NavBar />
        <main >{children}</main>
        <Footer />
      </body>
    </html>
  );
}
