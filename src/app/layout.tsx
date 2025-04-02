import type { Metadata } from "next";
import "./globals.css";
import { Inter } from "next/font/google";
import {ClerkProvider} from "@clerk/nextjs"
import { TRPCProvider } from "@/trpc/client";
import { Toaster } from "@/components/ui/sonner";

const inter = Inter({subsets: ["latin"]});

export const metadata: Metadata = {
  title: "JoeTuBe",
  description: "Joey's Tube",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider afterSignOutUrl="/">
      <html lang="en">
        <body
          className={inter.className}
        >
          <TRPCProvider>
            <Toaster />
            {children}
          </TRPCProvider>
         
        </body>
      </html>
    </ClerkProvider>
  );
}
