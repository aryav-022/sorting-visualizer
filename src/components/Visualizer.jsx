import { useRef, useState } from "react";
import Graph from "./Graph";
import delay from "@/functions/delay";

export default function Visualizer({ visualizerFunction }) {
	const barsRef = useRef(null);
	const elementsInputRef = useRef(null);
	const sizeInputRef = useRef(null);
	const buttonsRef = useRef(null);
	const formatRef = useRef(null);
	const alertRef = useRef(null);

	const [arr, setArr] = useState([]);
	const [gridOn, setGridOn] = useState(true);

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

	const start = async () => {
		disableControls();

		reset();
		await delay(1000);

		const size = parseInt(sizeInputRef.current.value);
		const elements = elementsInputRef.current.value
			.split(",")
			.map((element) => parseInt(element.trim()))
			.slice(0, size);

		if (isNaN(elements[0])) {
			alertRef.current.classList.remove("hidden");
			alertRef.current.classList.add("z-40");

			setTimeout(() => {
				alertRef.current.classList.add("hidden");
				alertRef.current.classList.remove("z-40");
			}, 10000);

			enableControls();
			return;
		}

		setArr(elements);
		await delay(1000);

		const bars = Array.from(barsRef.current.children);
		await visualizerFunction(bars);

		enableControls();
	};

	return (
		<>
			<h2 className={`text-2xl font-bold mt-8`}>Visualization</h2>

			{/* Inputs */}
			<div className={`flex gap-x-8 gap-y-4 justify-between mb-4 flex-wrap`}>
				{/* Size */}
				<div>
					<label htmlFor="size" className={`text-lg block`}>
						Size of array
					</label>
					<select
						name="size"
						id="size"
						ref={sizeInputRef}
						className={`w-full border-2 border-black rounded-lg px-2 py-1 text-lg text-black`}
					>
						<option value="5">5</option>
						<option value="6">6</option>
						<option value="6">7</option>
						<option value="8">8</option>
					</select>
				</div>
				{/* Elements */}
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
				{/* Format */}
				<div>
					<label htmlFor="size" className={`text-lg block`}>
						Bar/Array
					</label>
					<select
						name="format"
						id="format"
						ref={formatRef}
						className={`w-full border-2 border-black rounded-lg px-2 py-1 text-lg text-black`}
					>
						<option value="Bars">Bars</option>
						<option value="Array">Array</option>
					</select>
				</div>
				{/* Grid On/Off */}
				<div>
					<label htmlFor="gridOn" className={`text-lg block`}>
						Grid On/Off
					</label>

					<label className="relative inline-flex items-center cursor-pointer">
						<input
							type="checkbox"
							value=""
							className="sr-only peer"
							onChange={() => setGridOn((prev) => !prev)}
							checked
						/>
						<div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
					</label>
				</div>
			</div>

			<Graph arr={arr} gridOn={gridOn} ref={{ barsRef, formatRef }} />

			{/* Controls */}
			<div
				className={`flex justify-center items-center mt-4 rounded-lg overflow-hidden w-fit m-auto`}
				ref={buttonsRef}
			>
				<button
					className={`bg-slate-800 text-white px-4 py-2 hover:bg-slate-700`}
					id="bubble-sort-btn"
					onClick={start}
				>
					Start
				</button>
				<button
					className={`bg-slate-800 text-white px-4 py-2 border-l border-slate-600 hover:bg-slate-700`}
					id="bubble-sort-btn"
					disabled
				>
					Prev
				</button>
				<button
					className={`bg-slate-800 text-white px-4 py-2 border-l border-r border-slate-600 hover:bg-slate-700`}
					id="bubble-sort-btn"
					disabled
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

			{/* Alert */}
			<div
				className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded hidden -z-20 fixed top-4 left-8 right-8"
				role="alert"
				ref={alertRef}
			>
				<strong className="font-bold">Invalid Input</strong>
				<span className="block">Add elements before start</span>
				<span
					className="absolute top-0 bottom-0 right-0 px-4 py-3"
					onClick={() => {
						alertRef.current.classList.add("hidden");
						alertRef.current.classList.remove("z-40");
					}}
				>
					<svg
						className="fill-current h-6 w-6 text-red-500"
						role="button"
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 20 20"
					>
						<title>Close</title>
						<path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z" />
					</svg>
				</span>
			</div>
		</>
	);
}
