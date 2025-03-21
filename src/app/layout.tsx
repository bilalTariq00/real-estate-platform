import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Providers from "@/components/Providers";
import "leaflet/dist/leaflet.css";
import { Toaster } from "react-hot-toast";


export const metadata: Metadata = {
  title: "Real Estate",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
 return (
    <html lang="en">
      <Providers>
      <body>
          <Navbar />
          <main>
           <Toaster  reverseOrder={false} />
            {children} 
          </main>
         
      </body>
      </Providers>
    </html>
  );
}