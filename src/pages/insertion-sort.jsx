import Visualizer from "@/components/Visualizer";
import ComplexityInfo from "@/components/ComplexityInfo";
import CodeBlock from "@/components/CodeBlock";
import delay from "@/functions/delay";
import swap from "@/functions/swap";

const code = `function insertionSort(arr) {
    for (let i = 1; i < arr.length; i++) {
        let j = i - 1;
        let key = arr[i];
        
        while (j >= 0 && arr[j] > key) {
            arr[j + 1] = arr[j];
            j--;
        }
        
        arr[j + 1] = key;
    }
}`;

export default function InsertionSort() {
    async function insertionSortVisualizer(bars) {
        bars[0].classList.add("bg-green-400");

        await delay(2000);

        for (let i = 1; i < bars.length; i++) {
            let j = i - 1;
            const key = parseInt(bars[i].textContent);
            let value1 = parseInt(bars[j].textContent);

            while (j >= 0 && value1 > key) {
				if (j - 1 >= 0) {
					value1 = parseInt(bars[j - 1].textContent);
				}

                // Change the color of the bars being compared
                bars[j].classList.add("bg-orange-400");
                bars[j + 1].classList.add("bg-orange-400");

				await delay(2000);

                // Swap the bars
                swap(j, j + 1, bars);

                await delay(2000);

                // Remove the color of the bars being compared
                bars[j].classList.remove("bg-orange-400");
                bars[j + 1].classList.remove("bg-orange-400");

                j--;

                await delay(2000);
            }

            // Change the color of sorted bar
            bars[j + 1].classList.add("bg-green-400");

            await delay(2000);
        }
    }

	return (
		<>
			{/* General Information */}
			<h1 className={`text-4xl font-bold`}>Insertion Sort</h1>
			<p className={`text-lg`}>
                Insertion sort is a sorting algorithm that places an unsorted element at its suitable place in each iteration.
			</p>
			<p className={`text-lg`}>
                It is similar to the way we sort playing cards in our hands.
                We start with an empty left hand and the cards face down on the table.
                We then remove one card at a time from the table and insert it into the correct position in the left hand.
                To find the correct position for a card, we compare it with each of the cards already in the hand, from right to left.
                At all times, the cards held in the left hand are sorted, and these cards were originally the top cards of the pile on the table.
			</p>
			
			{/* Complexity Analysis */}
			<ComplexityInfo avTime={<span>O(n<sup>2</sup>)</span>} worstTime={<span>O(n<sup>2</sup>)</span>} />

			{/* Visualizer */}
			<Visualizer visualizerFunction={insertionSortVisualizer} />
			
			{/* Insertion Sort Code */}
			<CodeBlock code={code} />

			{/* Tailwind CSS Class Fetching Hidden Element */}
			<div className={`hidden opacity-100 bg-orange-400`}></div>
			<div className={`hidden bg-gray-400 hover:bg-gray-400`}></div>
		</>
	);
}
