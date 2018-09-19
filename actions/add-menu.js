const c = require("./common");

async function run(inq, viewName, type){
	let menuItems = [];
	let done;
	while (done != true) {
		const item = await inq.prompt([
			{ type: 'confirm', name: 'add', message: 'Do you want to add menu item?', "default": true },
			{ type: 'input', name: 'name', message: 'Menu item name', when: a => a.add },
			{ type: 'input', name: 'url', message: 'Menu item url', when: a => a.add }
		]);

		if(item.add)
			menuItems.push({value:item.name, id:item.url});
		else
			done = true;
	}

	let view;
	let layout = type == "sidebar" ? `cols` : `rows`;

	if(type == "top menu" || type == "sidebar"){
		let extra = type == "sidebar" ? `
					width:250,
					layout:"y"` : "";

		view = `view:"menu",
					data:${JSON.stringify(menuItems)},
					select:true,
					${extra}`;
	}
	else
		view = `view:"tabbar",
					options:${JSON.stringify(menuItems)}`;

	view = `
			${layout}:[
				{
					localId:"${viewName}",
					${view}
				},
				{$subview:true}
			]`;

	c.addView(`views/${viewName}.js`,`
		return{
			${view}
		};`, `
		this.use(plugins.Menu, this.$$("${viewName}"));`
	);

	c.addImport(`views/${viewName}.js`, "{plugins}", "webix-jet");

	c.addMarker("views/top.js", "Menu", `{ value:"${viewName}", id:"${viewName}", icon:"compass" },`);
}

module.exports = {
	run
};