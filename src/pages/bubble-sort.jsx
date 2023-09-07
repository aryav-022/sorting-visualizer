import { useRef } from "react";

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
}`

export default function BubbleSort() {
    const copyIndicator = useRef(null);

    // Copy code to clipboard
    const copyToClipboard = () => {
        navigator.clipboard.writeText(code);
        copyIndicator.current.classList.add("opacity-100");
        setTimeout(() => {
            copyIndicator.current.classList.remove("opacity-100");
        }, 4000);
    }

    return (
        <>
        {/* General Information */}
        <h1 className={`text-4xl font-bold`}>Bubble Sort</h1>
        <p className={`text-lg`}>
            Bubble sort, sometimes referred to as sinking sort, is a simple sorting algorithm that repeatedly steps through the list, compares adjacent elements and swaps them if they are in the wrong order. This is repeated until the list is sorted.
        </p>
        <p className={`text-lg`}>
            Bubble sort has a worst-case and average complexity of O(n<sup>2</sup>), where n is the number of items being sorted. Most practical sorting algorithms have substantially better worst-case or average complexity, often O(n log n). Even other O(n<sup>2</sup>) sorting algorithms, such as insertion sort, generally run faster than bubble sort, and are no more complex. Therefore, bubble sort is not a practical sorting algorithm.
        </p>
        <h2 className={`text-2xl font-bold mt-8`}>Time Complexity</h2>
        <div>Worst-case: <code className="px-2 py-[6px] bg-white bg-opacity-20 rounded-lg">O(n<sup>2</sup>)</code></div>
        <div>Average-case: <code className="px-2 py-[6px] bg-white bg-opacity-20 rounded-lg">O(n<sup>2</sup>)</code></div>

        {/* Canvas to visualize bubble sort */}
        <h2 className={`text-2xl font-bold mt-8`}>Visualization</h2>

        {/* Inputs */}
        <div className={`flex gap-24 items-end my-4`}>
            <div className="flex flex-col h-full justify-between">
                <label htmlFor="size" className={`text-lg block`}>Size of array</label>
                <select name="size" id="size" className={`border-2 border-black rounded-lg px-2 py-1 text-lg text-black`}>
                    <option value="5">5</option>
                    <option value="6">6</option>
                    <option value="6">7</option>
                    <option value="8">8</option>
                    <option value="6">9</option>
                    <option value="10">10</option>
                    <option value="6">11</option>
                    <option value="12">12</option>
                </select>
            </div>
            <div>
                <label htmlFor="elements" className={`text-lg block`}>Elements of array</label>
                <input type="text" name="elements" id="elements" placeholder="seperate using comma" className={`border-2 border-black rounded-lg px-2 py-1 text-lg`} />
            </div>
        </div>

        <div className={`flex justify-center items-center`}>
            <canvas id="bubbleSort" width="500" height="500" className={`border-2 border-black bg-white rounded-lg`}></canvas>
        </div>

        {/* Bubble sort code */}
        <h2 className={`text-2xl font-bold mt-8`}>Code</h2>
        <div className={`flex justify-center items-center`}>
            <pre className={`text-lg bg-white bg-opacity-20 rounded p-3 relative`}>
                <code className={`language-javascript`}>
                    {code}
                </code>
                <button className={`bg-white bg-opacity-20 rounded p-2 absolute top-2 right-2`} onClick={copyToClipboard}>
                    <svg xmlns="http://www.w3.org/2000/svg" className={`h-6 w-6`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                            d="M9 13h6m-3-3v6m5-13a2 2 0 00-2-2H5a2 2 0
                            00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/>
                    </svg>
                </button>
            </pre>
        </div>

        {/* Copied indicator */}
        <div ref={copyIndicator} className={`fixed bottom-6 left-1/2 -translate-x-1/2 bg-slate-800 bg-opacity-80 px-4 py-2 rounded-lg opacity-0 transition-opacity`}>
            <p className={`text-md`} id="copied">Copied to clipboard!</p>
        </div>

        {/* Tailwind CSS Class Fetching Hidden Element */}
        <div className={`hidden opacity-100`}></div>
        </>
    )
}