// Load JS syntax highlighter
const hljs = require("highlight.js/lib/core");
hljs.registerLanguage(
	"javascript",
	require("highlight.js/lib/languages/javascript")
);

module.exports = function fromTemplate(
	{ name, id, bundled, content, sources },
	EXAMPLES
) {
	return [
		":html",
		[
			":head",
			[":title", "Hyptiotes " + name + " Example"],
			[
				":style",
				hyptiotes.PLUGINS.styleObjectToCSS({
					body: {
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
			[":h1", "Hyptiotes: ", name],
			[
				":div",
				{ style: { margin: "10px 0" } },
				EXAMPLES.map(({ name, id }) => {
					return [
						":a",
						{ href: "/" + id + ".html", style: { margin: "4px 6px" } },
						name,
					];
				}),
				[":div", content],
			],
			[
				":div",
				{ style: { display: "flex", alignItems: "flex-start" } },
				[
					":div",
					{ style: { flexGrow: "1" } },
					"Sources",
					sources.map(({ name, val }) => {
						return CodeBlock(name, val);
					}),
				],
				bundled
					? [
							":div",
							{ style: { flexGrow: 1} },
							name + " Example App",
							[
								":div",
								{
									id: "root",
									style: {
                    margin: "12px",
										padding: "40px 20px",
										border: "1px solid black",
										borderRadius: "10px",
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
