import { useEffect, useRef, useState } from "react";
import delay from "@/functions/delay";
import swap from "@/functions/swap";
import copyToClipboard from "@/hooks/copyToClipboard";

const code = `function bubbleSort(arr) {
    let swapped = true;
    while (swapped) {
        swapped = false;
        for (let i = 0; i < arr.length - 1; i++) {
            if (arr[i + 1] < arr[i]) {
                [arr[i], arr[i + 1]] = [arr[i + 1], arr[i]];
                swapped = true;
            }
        }
    }
    return arr;
}`;

export default function BubbleSort() {
	const copyIndicator = useRef(null);
	const barsRef = useRef(null);
	const elementsInputRef = useRef(null);
	const sizeInputRef = useRef(null);
	const buttonsRef = useRef(null);

	const [arr, setArr] = useState([]);
	const [grid, setGrid] = useState([]);

	const reset = () => {
		setArr([]);
	};

	const disableControls = () => {
		Array.from(buttonsRef.current.children).forEach((button) => {
			button.disabled = true;
			button.classList.add("bg-gray-400");
			button.classList.add("hover:bg-gray-400");
		});
	};

	const enableControls = () => {
		Array.from(buttonsRef.current.children).forEach((button) => {
			button.disabled = false;
			button.classList.remove("bg-gray-400");
			button.classList.remove("hover:bg-gray-400");
		});
	};

	const start = async (callback) => {
		disableControls();

		reset();

		await delay(1000);

		const size = parseInt(sizeInputRef.current.value);
		const elements = elementsInputRef.current.value
			.split(",")
			.map((element) => parseInt(element.trim()))
			.slice(0, size);

		setArr(elements);

		await delay(1000);

		await callback();

		enableControls();
	};

	async function bubbleSortVisualizer() {
		const bars = Array.from(barsRef.current.children);

        let swapped = true;
        let size = bars.length;

        while (swapped) {
            swapped = false;
            for (let i = 0; i < size - 1; i++) {
                // Change the color of the bars being compared
                bars[i].classList.add("bg-orange-400");
                bars[i + 1].classList.add("bg-orange-400");

                await delay(2000);

				const value1 = parseInt(bars[i + 1].textContent);
				const value2 = parseInt(bars[i].textContent);

                if (value1 < value2) {
                    swap(i, i + 1, bars);

                    await delay(2000);

                    swapped = true;
                }

                // Change the color of the bars being compared
                bars[i].classList.remove("bg-orange-400");
                bars[i + 1].classList.remove("bg-orange-400");
            }

            size--;
            
            if (swapped) {
                // Change the color of the sorted bar
                bars[size].classList.add("bg-green-400");
                await delay(2000);
            }
        }

        // Change the color of the sorted bar
        bars.forEach((bar) => bar.classList.add("bg-green-400"));
	}

	useEffect(() => {
		const bars = barsRef.current.children;

		const maximum = Math.max(...arr);
		const minimum = Math.min(...arr);

		let factor = 384;
		let baseShift = 192;

		if (minimum < 0 && maximum > 0) {
			factor /= maximum - minimum;
			baseShift += minimum * factor;
		} else if (maximum > 0) {
			factor /= maximum;
		} else {
			factor /= Math.abs(minimum);
			baseShift -= 384;
		}

		for (let i = 0; i < bars.length; i++) {
			bars[i].style.height = `${Math.abs(arr[i] * factor)}px`; // Use the rendering dom to set the height of the bar
			bars[i].style.translate = `0 calc(${arr[i] < 0 ? "" : "-"}50% + ${baseShift}px)`;
			bars[i].classList.add(arr[i] < 0 ? "rounded-b" : "rounded-t");
		}

		// Make an array of size arr.size() * Math.abs(maximum - minimum) / factor
		const len = factor ? 384 * arr.length / factor : 0;
		setGrid(new Array(len).fill(0));
	}, [arr]);

	return (
		<>
			{/* General Information */}
			<h1 className={`text-4xl font-bold`}>Bubble Sort</h1>
			<p className={`text-lg`}>
				Bubble sort, sometimes referred to as sinking sort, is a simple sorting algorithm that repeatedly steps
				through the list, compares adjacent elements and swaps them if they are in the wrong order. This is
				repeated until the list is sorted.
			</p>
			<p className={`text-lg`}>
				Bubble sort has a worst-case and average complexity of O(n<sup>2</sup>), where n is the number of items
				being sorted. Most practical sorting algorithms have substantially better worst-case or average
				complexity, often O(n log n). Even other O(n<sup>2</sup>) sorting algorithms, such as insertion sort,
				generally run faster than bubble sort, and are no more complex. Therefore, bubble sort is not a
				practical sorting algorithm.
			</p>
			<h2 className={`text-2xl font-bold`}>Time Complexity</h2>
			<div>
				Worst-case:{" "}
				<code className="px-2 py-[6px] bg-white bg-opacity-20 rounded-lg">
					O(n<sup>2</sup>)
				</code>
			</div>
			<div>
				Average-case:{" "}
				<code className="px-2 py-[6px] bg-white bg-opacity-20 rounded-lg">
					O(n<sup>2</sup>)
				</code>
			</div>

			{/* Canvas to visualize selection sort */}
			<h2 className={`text-2xl font-bold mt-8`}>Visualization</h2>

			{/* Inputs */}
			<div className={`flex gap-24 items-end my-4`}>
				<div className="flex flex-col h-full justify-between">
					<label htmlFor="size" className={`text-lg block`}>
						Size of array
					</label>
					<select
						name="size"
						id="size"
						ref={sizeInputRef}
						className={`border-2 border-black rounded-lg px-2 py-1 text-lg text-black`}
					>
						<option value="5">5</option>
						<option value="6">6</option>
						<option value="6">7</option>
						<option value="8">8</option>
					</select>
				</div>
				<div>
					<label htmlFor="elements" className={`text-lg block`}>
						Elements of array
					</label>
					<input
						type="text"
						name="elements"
						id="elements"
						placeholder="seperate using comma"
						className={`border-2 border-black rounded-lg px-2 py-1 text-lg text-black`}
						ref={elementsInputRef}
					/>
				</div>
			</div>

			<div className={`flex justify-center items-center`}>
				<div className={`relative flex justify-center items-center p-8 bg-white rounded-lg text-black`}>
					<div className="flex absolute left-8 top-8 h-96 w-[calc(100%-4rem+2px)] overflow-hidden gap-0 flex-wrap border border-black border-opacity-10">
						{/* Generated by React */}
						{
							grid.map((element, index) => (
								<div
									key={index}
									className="w-16 border border-black border-opacity-10"
								></div>
							))
						}
					</div>
					<div className="flex h-96 items-center" ref={barsRef}>
						{/* Generated by React */}
						{arr.length === 0 ? (
							<div
								id="bar"
								className="w-16 border border-black flex items-center justify-center text-md font-light transition-all duration-[2s]"
							>
								Canvas
							</div>
						) : (
							arr.map((element, index) => (
								<div
									id="bar"
									key={index}
									className="w-16 border border-black bg-blue-400 flex items-center justify-center text-md font-light transition-all duration-[2s]"
								>
									{element}
								</div>
							))
						)}
					</div>
				</div>
			</div>

			{/* Controls */}
			<div
				className={`flex justify-center items-center mt-4 rounded-lg overflow-hidden w-fit m-auto`}
				ref={buttonsRef}
			>
				<button
					className={`bg-slate-800 text-white px-4 py-2 hover:bg-slate-700`}
					id="bubble-sort-btn"
					onClick={() => start(bubbleSortVisualizer)}
				>
					Start
				</button>
				<button
					className={`bg-slate-800 text-white px-4 py-2 border-l border-slate-600 hover:bg-slate-700`}
					id="bubble-sort-btn"
				>
					Prev
				</button>
				<button
					className={`bg-slate-800 text-white px-4 py-2 border-l border-r border-slate-600 hover:bg-slate-700`}
					id="bubble-sort-btn"
				>
					Next
				</button>
				<button
					className={`bg-slate-800 text-white px-4 py-2 hover:bg-slate-700`}
					id="bubble-sort-btn"
					onClick={reset}
				>
					Reset
				</button>
			</div>

			{/* Bubble sort code */}
			<h2 className={`text-2xl font-bold mt-8`}>Code</h2>
			<div className={`flex justify-center items-center`}>
				<pre className={`text-lg bg-white bg-opacity-20 rounded p-3 relative`}>
					<code className={`language-javascript`}>{code}</code>
					<button
						className={`bg-white bg-opacity-20 rounded p-2 absolute top-2 right-2`}
						onClick={() => copyToClipboard(copyIndicator, code)}
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							className={`h-6 w-6`}
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth="2"
								d="M9 13h6m-3-3v6m5-13a2 2 0 00-2-2H5a2 2 0
                        00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"
							/>
						</svg>
					</button>
				</pre>
			</div>

			{/* Copied indicator */}
			<div
				ref={copyIndicator}
				className={`fixed -z-10 hiver:z-20 bottom-6 left-1/2 -translate-x-1/2 bg-slate-800 bg-opacity-80 px-4 py-2 rounded-lg opacity-0 transition-opacity`}
			>
				<p className={`text-md`} id="copied">
					Copied to clipboard!
				</p>
			</div>

			{/* Tailwind CSS Class Fetching Hidden Element */}
			<div className={`hidden opacity-100 bg-orange-400`}></div>
			<div className={`hidden bg-gray-400 hover:bg-gray-400`}></div>
		</>
	);
}
