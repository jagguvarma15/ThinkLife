import type React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import Head from "next/head"; // <-- import

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ThinkxLife",
  description: "",
  icons: {
    icon: "/ThinkxLife.png", // main favicon
    shortcut: "/ThinkxLife.png", // <link rel="shortcut icon">
    apple: "/ThinkxLife.png", // for iOS homescreen
  },
  generator: "v0.dev",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <Head>
        <link rel="icon" href="/ThinkxLife.jpeg" />
      </Head>
      <body
        className={`${inter.className} bg-white text-gray-800 min-h-screen flex flex-col`}
      >
        <Navbar />
        <main className="flex-grow">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
