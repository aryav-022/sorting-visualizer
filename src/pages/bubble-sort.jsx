import Visualizer from "@/components/Visualizer";
import ComplexityInfo from "@/components/ComplexityInfo";
import CodeBlock from "@/components/CodeBlock";
import delay from "@/functions/delay";
import swap from "@/functions/swap";

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
	async function bubbleSortVisualizer(bars) {
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

			{/* Complexity Analysis */}
			<ComplexityInfo
				avTime={
					<span>
						O(n<sup>2</sup>)
					</span>
				}
				worstTime={
					<span>
						O(n<sup>2</sup>)
					</span>
				}
			/>

			{/* Visualizer */}
			<Visualizer visualizerFunction={bubbleSortVisualizer} />

			{/* Bubble Sort Code */}
			<CodeBlock code={code} />

			{/* Tailwind CSS Class Fetching Hidden Element */}
			<div className={`hidden opacity-100 bg-orange-400`}></div>
			<div className={`hidden bg-gray-400 hover:bg-gray-400`}></div>
		</>
	);
}
