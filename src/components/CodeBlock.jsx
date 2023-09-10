import { useRef } from "react";

export default function CodeBlock({ code }) {
	const copyIndicator = useRef(null);

	const copyToClipboard = () => {
		navigator.clipboard.writeText(code);
		copyIndicator.current.classList.add("opacity-100");
		copyIndicator.current.classList.add("z-20");
		setTimeout(() => {
			copyIndicator.current.classList.remove("opacity-100");
			copyIndicator.current.classList.remove("z-20");
		}, 4000);
	};

	return (
		<>
			<h2 className={`text-2xl font-bold mt-8`}>Code</h2>
			<div className={`flex justify-center items-center`}>
				<pre
					className={`text-lg bg-white bg-opacity-20 rounded p-3 max-w-full overflow-x-auto max-sm:text-sm relative`}
				>
					<code className={`language-javascript`}>{code}</code>
					<button
						className={`bg-gray-700 rounded p-2 absolute top-2 right-2`}
						onClick={copyToClipboard}
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
				className={`fixed -z-10 bottom-6 left-1/2 -translate-x-1/2 bg-slate-800 bg-opacity-90 px-4 py-2 rounded-lg opacity-0 transition-opacity`}
			>
				<p className={`text-md`} id="copied">
					Copied to clipboard!
				</p>
			</div>
		</>
	);
}
