const EXAMPLES = require("./Examples");
// Load JS syntax highlighter
const hljs = require("highlight.js/lib/core");
hljs.registerLanguage(
	"javascript",
	require("highlight.js/lib/languages/javascript")
);

// Example page markup defined as array tree
module.exports = function fromTemplate({ name, id, bundled, sources }) {
	return [
		":html",
		[
			":head",
			[":title", "Hyptiotes " + name + " Example"],
			[
				":style",
				hyptiotes.PLUGINS.styleObjectToCSS({
					body: {
						background: "#009688",
						fontFamily: "system-ui",
					},
					"#main-content": {
						display: "flex",
						flexDirection: "column",
						alignItems: "center",
					},
					pre: {
						tabSize: 2,
						whiteSpace: "pre-wrap",
						padding: "12px",
						background: "#222",
						borderRadius: "4px",
						color: "white",
						boxShadow: "5px 5px 5px black",
					},
				}),
			],
			[
				":link",
				{
					rel: "stylesheet",
					href: "https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.8.0/styles/atom-one-dark.min.css",
				},
			],
		],
		[
			":body",
			[
				":div",
				{ style: { display: "flex", margin: "10px 0" } },
				EXAMPLES.map(({ name, id: exampleId }) => {
					return [
						":a",
						{
							href: "/" + exampleId + ".html",
							style: {
								...(id === exampleId
									? {
											background: "#fff",
											color: "#444",
									  }
									: {
											background: "#444",
											color: "white",
									  }),
								borderRadius: "4px",
								marginLeft: "15px",
								padding: "8px 12px",
								textDecoration: "none",
							},
						},
						name,
					];
				}),
			],
			[
				":div",
				{ style: { display: "flex", alignItems: "flex-start" } },
				[
					":div",
					{ style: { flexGrow: "1" } },
					midText("Sources"),
					sources.map(({ name, val }) => {
						return CodeBlock(name, val);
					}),
				],
				bundled
					? [
							":div",
							{
								style: {
									flexGrow: 1,
									maxWidth: "800px",
									position: "sticky",
									top: 0,
								},
							},
							midText(name + " Rendered"),
							[
								":div",
								{
									id: "root",
									style: {
										margin: "12px",
										padding: "40px 20px",
										border: "1px solid black",
										borderRadius: "10px",
										background: "white",
									},
								},
							],
							[":script", { src: "./" + id + ".bundle.js" }],
					  ]
					: null,
			],
		],
	];
};

function midText(text) {
	return [
		":div",
		{ style: { textAlign: "center", margin: "10px" } },
		[
			":span",
			{
				style: {
					background: "yellow",
					padding: "4px 6px",
					borderRadius: "4px",
				},
			},
			text,
		],
	];
}

function CodeBlock(name, code) {
	return [
		":pre",
		{ class: "code", style: { position: "relative", margin: "12px" } },
		[
			":div",
			{
				style: {
					position: "absolute",
					top: 0,
					right: 0,
					padding: "8px",
					background: "black",
					fontSize: "14px",
				},
			},
			name,
		],
		[":code", hljs.highlight(code, { language: "javascript" }).value],
	];
}
