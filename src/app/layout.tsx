import type { Metadata } from "next";
import "../style/globals.css";
import localFont from 'next/font/local'
import Header from "@/components/header";
import Footer from "@/components/footer";
import { Suspense } from "react";
const myFont = localFont({
  src: [
    { path: '../font/ZenKakuGothicNew-Black.ttf', weight: "400", style: "normal" },
    { path: '../font/ZenKakuGothicNew-Bold.ttf', weight: "700", style: "normal" },
    { path: '../font/ZenKakuGothicNew-Light.ttf', weight: "400", style: "normal" },
    { path: '../font/ZenKakuGothicNew-Medium.ttf', weight: "400", style: "normal" },
    { path: '../font/ZenKakuGothicNew-Regular.ttf', weight: "400", style: "normal" }
  ],
})
export const metadata: Metadata = {
  title: "若年層モデル事業就職サイト",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" style={{ scrollBehavior: "smooth" }}>
      <body
        className={`${myFont.className} bg-page-bg  min-h-screen`}
      >
        <Header />
        <Suspense>
          {children}
        </Suspense>
        <Footer />
      </body>
    </html>
  );
}
