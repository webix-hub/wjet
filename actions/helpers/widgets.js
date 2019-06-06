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
				});` :  `widget.parse(data, "json")`;

			init = `
			view.${values.method}(true).then(widget => {
				widget.clearAll();
				${loading};
			});`;
		}
		else{
			data = res.modelType && res.modelType == "proxy"  ? `url:getData,
			save:saveData,` : `data: data,`;
		}
	}

	let view = `view: "${values.id}",
			${data}
			${values.extra || ""}`;

	if(values.spacer)
		view = `rows:[{
				${view}
			},{}]`

	if(values.dhx){
		c.addView(`views/${viewName}`,`
			return {
				${view}
			};`, init);

		c.addPackage(`@wbx/view-${values.id}`);
		c.addImport(`views/${viewName}`, "", `@wbx/view-${values.id}`);
	}
	else{
		const cdn = `//cdn.webix.com/pro/edge/${values.id}/`;

		let skin = cfg.getSkin();
		skin = skin == "material" ? values.id : "skins/"+skin;

		c.addView(`views/${viewName}`,`
			return webix.require({
				"${cdn}${values.id}.js":true,
				"${cdn}${skin}.css":true
			}).then(() => {
				return { ${view} };
			});`, init);
	}

	if(res.modelType){
		const modelName = res.modelType == "proxy" ? "{getData, saveData}" : `{data}`;
		c.addImport(`views/${viewName}`, modelName, `models/${res.modelFileName}`);
	}

	c.addMarker("views/top", "Menu", `{ value:"${viewName}", id:"${viewName || values.id}", icon:"${values.icon}" },`);
}

module.exports = {
	addWidget
};