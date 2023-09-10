import Visualizer from "@/components/Visualizer";
import ComplexityInfo from "@/components/ComplexityInfo";
import CodeBlock from "@/components/CodeBlock";
import delay from "@/functions/delay";
import swap from "@/functions/swap";

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
	async function selectionSortVisualizer(bars) {
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

			{/* Complexity Analysis */}
			<ComplexityInfo avTime={<span>O(n<sup>2</sup>)</span>} worstTime={<span>O(n<sup>2</sup>)</span>} />

			{/* Visualizer */}
			<Visualizer visualizerFunction={selectionSortVisualizer} />
			
			{/* Insertion Sort Code */}
			<CodeBlock code={code} />

			{/* Tailwind CSS Class Fetching Hidden Element */}
			<div className={`hidden opacity-100 bg-orange-400`}></div>
			<div className={`hidden bg-gray-400 hover:bg-gray-400`}></div>
		</>
	);
}
