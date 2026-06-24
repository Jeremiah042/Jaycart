import type { Metadata } from "next";
import "./globals.css";
import Header from "@/src/components/Header/Header";
import Footer from "@/src/components/Footer/Footer";
import { ClerkProvider } from "@clerk/nextjs";
import { CartProvider } from "@/src/Context/cartContext";

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
      <html lang="en" suppressHydrationWarning className={`antialiased`}>
        <body className="font-poppins antialiased">
          <CartProvider>
            <div className="flex flex-col min-h-screen">
              <Header />
              <main className="flex-1">{children}</main>
              <Footer />
            </div>
          </CartProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
