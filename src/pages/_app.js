import '@/styles/globals.css'
import { Inter } from "next/font/google";
import Sidebar from "../components/Sidebar";
import { Analytics } from '@vercel/analytics/react';

const inter = Inter({ subsets: ["latin"] });

export default function App({ Component, pageProps }) {
  return (
    <main className={`flex min-h-screen ${inter.className} max-lg:flex-col`}>
      <Sidebar />
      <main className={`flex flex-col w-3/4 ml-[25%] p-8 gap-4 max-lg:w-screen max-lg:ml-0`}>
        <Component {...pageProps} />
        <Analytics />
      </main>
		</main>
  )
}
