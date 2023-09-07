import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
	return (
		<Html lang="en">
			<Head />
			<link rel="icon" href="/favicon_light.png" />
			<link rel="icon" href="/favicon_dark.png" media="(prefers-color-scheme: dark)" />
			<body>
				<Main />
				<NextScript />
			</body>
		</Html>
	);
}
