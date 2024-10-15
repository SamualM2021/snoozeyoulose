import Link from "next/link";
import "./globals.css";

export const metadata = {
  title: "Snooze You Lose",
  description: "A sleep tracker app to view the sleep you've missed",
};

import { Open_Sans, Shojumaru } from "next/font/google"
import { AuthProvider } from "@/context/authContext";
import Head from "./head";
import Logout from "@/components/Logout";

const openSans = Open_Sans({subsets : ['latin'] })
const shoju = Shojumaru({subsets : ['latin'], weight: ['400'] })

export default function RootLayout({ children }) {

const header = (
  <header className='p-4 sm:p-8 flex items-center justify-between
  gap-4'>
    <Link href={'/'}><h1 className={'text-base sm:text-lg textGradient ' + shoju.className}>Snooze You Lose</h1></Link>
    <Logout />
  </header>
)

const footer = (
  <footer className='p-4 sm:p-8 grid place-items-center'>
    <p className={'text-purple-600 ' + shoju.className}>If you wake up feeling refreshed... you're using this app wrong 🤣.</p>
  </footer>
)

  return (
    <html lang="en">
      <Head />
      <AuthProvider>
        <body className={`w-full max-w-[1000px] mx-auto text-sm
sm:text-base min-h-screen flex flex-col text-slate-800` + openSans.className}>
          {header}
          {children}
          {footer}
        </body>
      </AuthProvider>
    </html>
  );
}
