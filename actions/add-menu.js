const c = require("./common");

async function run(inq, viewName, type){
	let menuItems = [];
	while (true) {
		const item = await inq.prompt([
			{ type: 'input', name: 'name', message: 'Item name' },
			{ type: 'input', name: 'url', message: 'Related view' },
			{ type: 'confirm', name: 'add', message: 'Add more items?', "default": true }
		]);

		menuItems.push({ value:item.name, id:item.url });
		if(!item.add)
			break;
	}

	let view;
	let layout = type == "sidebar" ? `cols` : `rows`;

	if(type == "top menu"){
		let extra = type == "sidebar" ? `
					width:250` : "";

		view = `view:"segmented",
					options:${JSON.stringify(menuItems, null, "\t")},
					optionWidth:120
					`;
	}
	else if(type == "sidebar"){
		view = `view:"sidebar",
					data:${JSON.stringify(menuItems, null, "\t")},
					width:250
					`;
	} else
		view = `view:"tabbar",
					optionWidth:120,
					options:${JSON.stringify(menuItems, null, "\t")}`;

	view = `
			${layout}:[
				{
					localId:"navigation",
					${view}
				},
				{$subview:true}
			]`;

	c.addView(`views/${viewName}`,`
		return{
			${view}
		};`, `
		this.use(plugins.Menu, this.$$("navigation"));`
	);

	c.addImport(`views/${viewName}`, "{plugins}", "webix-jet");

	c.addMarker("views/top", "Menu", `{ value:"${viewName}", id:"${viewName}", icon:"wxi-search" },`);
}

module.exports = {
	run
};