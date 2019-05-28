const c = require("./common");
const model = require("./helpers/models");

async function run(inq, viewName){
	const res = await inq.prompt([
		{ type: 'list', name: 'type', message: 'Main view', default: "tree", choices:["tree", "list", "datatable"] },
		{ type: 'list', name: 'slave', message: 'View as details', default: "table", choices:["datatable", "form"] },
		{ type: 'confirm', name: 'masterFields', message: 'Do you want to add fields for details view?', default: true }
	]);

	const fields = res.masterFields ? await require("./helpers/fields").addFields(inq, res.slave) : [];

	let masterModel = await model.checkModel(inq, "for main view");

	let slaveModel = res.slave == "datatable" ? await model.checkModel(inq, "for details view") : false;

	let data = "";
	if(masterModel)
		data = masterModel.modelType == "proxy" ? 
			`getData().then((data)=>{
			this.$$("master").parse(data.json(), "json");
		});` :  `this.$$("master").parse(${masterModel.modelName}, "json");`;

	if(slaveModel)
		data += slaveModel.modelType == "proxy" ? 
			`
			getData().then((data)=>{
			this.$$("slave").parse(data.json(), "json");
		});` :  `this.$$("slave").parse(${slaveModel.modelName}, "json");`;

	const masterView = res.type == "datatable" ? 
				`
				{
					view:"datatable",
					localId: "master",
					columns: [{id: "id", header: "ID", fillspace:true}],
					select: true
				}`:
				`
				{
					view:"${res.type}",
					template:"#id#",
					localId: "master",
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

	if(masterModel){
		const modelName = masterModel.modelType == "proxy" ? "{getData, saveData}" : `{${masterModel.modelName}}`;
		c.addImport(`views/${viewName}`, modelName, `models/${masterModel.modelFileName}`);
	}

	if(slaveModel){
		const modelName = slaveModel.modelType == "proxy" ? "{getData, saveData}" : `{${slaveModel.modelName}}`;
		c.addImport(`views/${viewName}`, modelName, `models/${slaveModel.modelFileName}`);
	}

	c.addMarker("views/top", "Menu", `{ value:"${viewName}", id:"${viewName}", icon:"wxi-columns" },`);
};

module.exports = {
	run
};