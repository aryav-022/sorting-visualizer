import { Charmonman } from "next/font/google";
import Link from "next/link";
import { useEffect, useRef } from "react";

const charmonman = Charmonman({ subsets: ["latin"], weight: ["400"] });

export default function Sidebar() {
	const sidebarRef = useRef(null);
  const buttonRef = useRef(null);

	const openSidebar = () => {
    sidebarRef.current.classList.remove("max-lg:-left-full");
	};

  // Close sidebar when clicked outside
  useEffect(() => {
    const closeSidebar = (e) => {
      if (!sidebarRef.current.contains(e.target) && !buttonRef.current.contains(e.target)) {
        sidebarRef.current.classList.add("max-lg:-left-full");
      }
    };

    document.addEventListener("click", closeSidebar);

    return () => {
      document.removeEventListener("click", closeSidebar);
    };
  }, []);

	return (
		<>
			<nav
				className="fixed z-20 top-0 left-0 h-screen w-1/4 max-lg:w-80 border-r border-r-white bg-black text-white flex flex-col justify-between p-8 transform transition-transform duration-300 max-lg:-left-full"
				ref={sidebarRef}
			>
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

        {/* Close Sidebar button */}
        <div className="absolute top-4 right-4 lg:hidden">
          <button className="text-white rounded-full p-2" onClick={() => sidebarRef.current.classList.add("max-lg:-left-full")}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 transform rotate-90"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="square" strokeLinejoin="square" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
        </div>
			</nav>

			<div className="m-4 hidden max-lg:flex" ref={buttonRef}>
				<button className="text-white rounded-full p-2" onClick={openSidebar}>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						className="h-6 w-6 transform -rotate-90"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
					>
						<path strokeLinecap="square" strokeLinejoin="square" strokeWidth={2} d="M19 9l-7 7-7-7" />
					</svg>
				</button>
			</div>
		</>
	);
}
