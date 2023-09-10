export default function ComplexityInfo({ avTime, worstTime, bestTime, space }) {
	return (
		<>
			<h2 className={`text-2xl font-bold`}>Time Complexity</h2>
			<div>
				Worst-case:{" "}
				<code className="px-2 py-[6px] bg-white bg-opacity-20 rounded-lg">
					{worstTime}
				</code>
			</div>
			<div>
				Average-case:{" "}
				<code className="px-2 py-[6px] bg-white bg-opacity-20 rounded-lg">
					{avTime}
				</code>
			</div>
		</>
	);
}

// Set the default props of the component
ComplexityInfo.defaultProps = {
    avTime: "-",
    worstTime: "-",
    bestTime: "-",
    space: "-"
}