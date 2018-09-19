const config = require("./configs");
const c = require("../common");

module.exports = function(res, viewName, message){
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

	c.addView(`views/${viewName}.js`,`
		return{
			${view}
		};`, init);

	if(values.dhx){
		c.addPackage(`@wbx/view-${values.id}`);
		c.addImport(`views/${viewName}.js`, "", `@wbx/view-${values.id}`);
	}
	else
		c.addMarker("app.js", "extra",`
				"//cdn.webix.com/site/${values.id}/${values.id}.js",
				"//cdn.webix.com/site/${values.id}/${values.id}.css",`);

	if(res.modelType){
		const modelName = res.modelType == "proxy" ? "{getData, saveData}" : `{${res.modelName}}`;
		c.addImport(`views/${viewName}.js`, modelName, `models/${res.modelFileName}`);
	}

	c.addMarker("views/top.js", "Menu", `{ value:"${viewName}", id:"${viewName || values.id}", icon:"${values.icon}" },`);
}