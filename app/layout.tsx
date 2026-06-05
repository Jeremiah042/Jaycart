import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/ui/Header";
import Footer from "@/components/ui/Footer";
import { ClerkProvider } from "@clerk/nextjs";
import { ThemeProvider } from "@/components/ui/ThemeProvider";
import { NuqsAdapter } from 'nuqs/adapters/next/app'

export const metadata: Metadata = {
  title: "%s - shopcart online store",
  description: "shopcart online store, your one stop shop for all your needs",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en"  suppressHydrationWarning className={`antialiased`}>
        <body className="font-poppins antialiased">
           <NuqsAdapter>
             <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
          <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
          </ThemeProvider>
          </NuqsAdapter>
        </body>
      </html>
    </ClerkProvider>
  );
}
