const root = document.getElementById("root");

function randomColor() {
	return Math.floor(Math.random() * 255);
}

let count = 0;
let parties = [];
hyptiotes.mount(root, [
	"div",
	[
		"p",
		{
			style: {
				"font-size": "20px",
			},
		},
		"Time to... ",
	],
	function ({ update, onRef }) {
		onRef((e) => console.log("ref", e));
		return [
			"div",
			[
				"button",
				{
					onclick: () => {
						count++;
            parties.push([
              "p",
              {
                style: {
                  color: `rgba(${randomColor()},${randomColor()},${randomColor()}, 1)`,
                },
                onclick: function (e) {
                  console.log("clicked!", e);
                },
              },
              "Party!",
            ]);
						update();
					},
				},
				count,
			],
      ...parties
		];
	},
]);
