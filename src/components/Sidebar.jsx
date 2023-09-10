import { Charmonman } from "next/font/google";
import Link from "next/link";

const charmonman = Charmonman({ subsets: ["latin"], weight: ['400'] });

export default function Sidebar() {
  return (
    <nav className={`flex flex-col h-screen w-1/4 max-w-xs left-0 top-0 z-20 bg-black fixed p-8 border-r border-slate-400 max-lg:-left-full`}>
      <Link href="/" className={`${charmonman.className} text-3xl leading-snug`}>
        <div>Sorting</div>
        <div className="mx-8">Visualizer</div>
      </Link>

      <ul className="flex flex-col grow text-xl justify-end">
        <li className="my-4 hover:translate-x-3 transition-transform w-fit">
          <Link href="/selection-sort">Selection Sort</Link>
        </li>
        <li className="my-4 hover:translate-x-3 transition-transform w-fit">
          <Link href="/bubble-sort">Bubble Sort</Link>
        </li>
        <li className="my-4 hover:translate-x-3 transition-transform w-fit">
          <Link href="/insertion-sort">Insertion Sort</Link>
        </li>
        <li className="my-4 hover:translate-x-3 transition-transform w-fit">
          <Link href="/merge-sort">Merge Sort</Link>
        </li>
        <li className="my-4 hover:translate-x-3 transition-transform w-fit">
          <Link href="/quick-sort">Quick Sort</Link>
        </li>
        <li className="my-4 hover:translate-x-3 transition-transform w-fit">
          <Link href="/heap-sort">Heap Sort</Link>
        </li>
      </ul>
    </nav>
  )
}
