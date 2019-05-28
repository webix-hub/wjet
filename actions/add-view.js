const c = require("./common");

async function run(inq, widget){
	const name = await require("./helpers/filename").setName(inq, "views");

	const res = await inq.prompt([
		{ type: 'list', name: 'viewType', message: 'which kind of view do you need?', choices:
			["Navigation with sub-elements", "Widget centric", "CRUD", "Data navigation"]
		},
		{ type: 'list', name: 'navType', message: 'Select the navigation type', choices:
			["top menu", "sidebar", "tabbar"], when: a => a.viewType == "Navigation with sub-elements"
		}
	]);

	res.name = name;

	try {
		switch (res.viewType) {
			case "Widget centric":
				require("./add-widget").run(inq, res.name);
				break;
			case "Navigation with sub-elements":
				require("./add-menu").run(inq, res.name, res.navType);
				break;
			case "CRUD":
				require("./add-crud").run(inq, res.name);
				break;
			case "Data navigation":
				require("./add-data-navigation").run(inq, res.name);
				break;
		}
	} catch(e) {
		console.log(e);
	}
	return res;
}

module.exports = {
	run
};