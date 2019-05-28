const config = require("./configs");
const c = require("../common");
const cfg = require("./app");

function addWidget(res, viewName, message){
	let values = config[res.widget];
	let data = "";
	let init = "";

	if(res.modelType){
		if(values.dhx){
			let loading = res.modelType == "proxy" ? 
			`getData().then((data)=>{
					widget.parse(data.json(), "json");
				});` :  `widget.parse(${res.modelName}, "json")`;

			init = `
			view.${values.method}(true).then(widget => {
				widget.clearAll();
				${loading};
			});`;
		}
		else{
			data = res.modelType && res.modelType == "proxy"  ? `url:getData,
			save:saveData,` : `data: ${res.modelName},`;
		}
	}

	let view = `view: "${values.id}",
			${data}
			${values.extra || ""}`;

	if(values.spacer)
		view = `rows:[{
				${view}
			},{}]`

	c.addView(`views/${viewName}`,`
		return{
			${view}
		};`, init);

	if(values.dhx){
		c.addPackage(`@wbx/view-${values.id}`);
		c.addImport(`views/${viewName}`, "", `@wbx/view-${values.id}`);
	}
	else{
		const cdn = `//cdn.webix.com/site/${values.id}/`;
		if(require("./app").notImported(cdn)){
			let skin = cfg.getSkin();
			skin = skin == "material" ? values.id : "skins/"+skin;
			c.addMarker("app", "extra",`
				"${cdn}${values.id}.js",
				"${cdn}${skin}.css",`);
		}
	}

	if(res.modelType){
		const modelName = res.modelType == "proxy" ? "{getData, saveData}" : `{${res.modelName}}`;
		c.addImport(`views/${viewName}`, modelName, `models/${res.modelFileName}`);
	}

	c.addMarker("views/top", "Menu", `{ value:"${viewName}", id:"${viewName || values.id}", icon:"${values.icon}" },`);
}

module.exports = {
	addWidget
};