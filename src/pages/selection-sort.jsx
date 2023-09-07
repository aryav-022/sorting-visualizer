import { useEffect, useRef, useState } from "react";
import delay from "@/functions/delay";
import swap from "@/functions/swap";
import copyToClipboard from "@/hooks/copyToClipboard";

const code = `function selectionSort(arr) {
    for (let i = 0; i < arr.length; i++) {
        let minIndex = i;
        let minValue = arr[i];
        for (let j = i + 1; j < arr.length; j++) {
            if (arr[j] < minValue) {
                minIndex = j;
                minValue = arr[j];
            }
        }
        [arr[i], arr[minIndex]] = [arr[minIndex], arr[i]];
    }
    return arr;
}`;

export default function SelectionSort() {
	const copyIndicator = useRef(null);
	const barsRef = useRef(null);
	const elementsInputRef = useRef(null);
	const sizeInputRef = useRef(null);
	const buttonsRef = useRef(null);

	const [arr, setArr] = useState([]);

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

	async function selectionSortVisualizer() {
		const bars = Array.from(barsRef.current.children);

		for (let i = 0; i < bars.length; i++) {
			let minIndex = i;
			for (let j = i + 1; j < bars.length; j++) {
				const value1 = parseInt(bars[j].textContent);
				const value2 = parseInt(bars[minIndex].textContent);

				if (value1 < value2) {
					minIndex = j;
				}
			}

			// Change the color of the bars being compared
			bars[i].classList.add("bg-orange-400");
			bars[minIndex].classList.add("bg-orange-400");

			await delay(2000);

			swap(i, minIndex, bars);

			// Change the color of the bars being compared
			bars[i].classList.remove("bg-orange-400");
			bars[minIndex].classList.remove("bg-orange-400");

			// Change the color of the bars that are sorted
			bars[i].classList.add("bg-green-400");

			await delay(3000);
		}
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
		}
	}, [arr]);

	return (
		<>
			{/* General Information */}
			<h1 className={`text-4xl font-bold`}>Selection Sort</h1>
			<p className={`text-lg`}>
				Selection sort is an in-place comparison sorting algorithm that divides the input list into two parts:
				the sublist of items already sorted, which is built up from left to right at the front (left) of the
				list, and the sublist of items remaining to be sorted that occupy the rest of the list.
			</p>
			<p className={`text-lg`}>
				Initially, the sorted sublist is empty and the unsorted sublist is the entire input list. The algorithm
				proceeds by finding the smallest (or largest, depending on sorting order) element in the unsorted
				sublist, exchanging (swapping) it with the leftmost unsorted element (putting it in sorted order), and
				moving the sublist boundaries one element to the right.{" "}
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
				<div className={`flex justify-center items-center p-8 bg-white rounded-lg text-black`}>
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
									className="w-16 border border-black flex items-center justify-center text-md font-light transition-all duration-[2s]"
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
					onClick={() => start(selectionSortVisualizer)}
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

			{/* Selection sort code */}
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
