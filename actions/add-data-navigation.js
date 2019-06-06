const c = require("./common");
const model = require("./helpers/models");

async function run(inq, viewName){
	const res = await inq.prompt([
		{ type: 'list', name: 'type', message: 'Main view', default: "tree", choices:["tree", "list", "datatable"] },
		{ type: 'list', name: 'slave', message: 'Related view', default: "table", choices:["datatable", "form"] },
		{ type: 'confirm', name: 'masterFields', message: 'Do you want to configure fields of details view?', default: true }
	]);

	const fields = res.masterFields ? await require("./helpers/fields").addFields(inq, res.slave) : [];
	const masterModel = await model.checkModel(inq, "for main view");
	const slaveModel = res.slave == "datatable" ? await model.checkModel(inq, "for details view") : false;

	const data = getData(masterModel)+getData(slaveModel);

	const masterView = res.type == "datatable" ?
				`{
					view:"datatable",
					localId: "master",
					columns: [{id: "id", header: "ID", fillspace:true}],
					select: true
				}`:
				`{
					view:"${res.type}",
					template:"#id#",
					localId: "master",
					width: 250,
					select: true
				}`;

	const slaveView = res.slave == "form" ?
				`{
					view:"form",
					localId: "slave",
					elements:[
						${JSON.stringify(fields).slice(1, -1)},
						{}
					]
				}`:
				`{
					view:"datatable",
					localId: "slave",
					columns: ${JSON.stringify(fields)},
				}`;

	const bind = res.slave == "form"? `this.$$("slave").bind(this.$$("master"));` : `this.$$("slave").bind(this.$$("master"), function(slave, master){
			if (!master) return false;
			return master.id == slave.${fields.length > 0 ? fields[0].id : "value"};
		});`

	c.addView(`views/${viewName}`,`
		return{
			cols:[
				${masterView},
				${slaveView}
			]
		};`, `
		${data}
		${bind}
		`
	);

	importModel(masterModel, viewName);
	importModel(slaveModel, viewName);

	c.addMarker("views/top", "Menu", `{ value:"${viewName}", id:"${viewName}", icon:"wxi-columns" },`);
};

function importModel(model, viewName){
	if(!model) return;
	const modelName = model.modelType == "proxy" ? "{getData, saveData}" : `{data}`;
	c.addImport(`views/${viewName}`, modelName, `models/${model.modelFileName}`);
}

function getData(model){
	return model ?
		model.modelType == "proxy" ? 
			`getData().then((data)=>{
			this.$$("master").parse(data.json(), "json");
		});` :  `this.$$("master").parse(data, "json");`:
		"";
}

module.exports = {
	run
};