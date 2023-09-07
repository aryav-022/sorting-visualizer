import '@/styles/globals.css'
import { Inter } from "next/font/google";
import Sidebar from "../components/Sidebar";

const inter = Inter({ subsets: ["latin"] });

export default function App({ Component, pageProps }) {
  return (
    <main className={`flex min-h-screen ${inter.className}`}>
      <Sidebar />
      <main className={`flex flex-col w-[max(75%,calc(100vw-320px))] p-8 gap-4 ml-[min(25%,320px)]`}>
        <Component {...pageProps} />
      </main>
		</main>
  )
}
