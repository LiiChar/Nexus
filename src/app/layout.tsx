import type { Metadata } from "next";
// import { Lato } from "next/font/google";
import localFont from 'next/font/local'
import "../style/globals.css";

// const inter = Lato({ subsets: ["latin"], weight: '400' });
const inter = localFont({ src: '../style/font/Lato-Light.ttf' })

export const metadata: Metadata = {
  title: "Creative Nexus",
  description: "Create a platform where people can exchange creative ideas, find partners for collaborative projects, and bring their creative concepts to life. The website can bring together individuals from various fields, ranging from artists and writers to programmers and engineers.",
  keywords: ['Creativity', 'Idea exchange', "Collaboration", "Creative community", "Innovation and ideas", "Exchange creative experiences", "Joint development"],
  icons: './favicon.ico'
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html className="dark" lang="en">
      <body className={`${inter.className}`}>
        {children}
      </body>
    </html>
  );
}
