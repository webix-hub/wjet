const c = require("./common");

async function run(inq, viewName){
	const res = await inq.prompt([
		{ type: 'list', name: 'type', message: 'CRUD type', default: "datatable", choices:["datatable", "form"] },
	]);

	let fields = await require("./helpers/fields").run(inq, res.type);
	const model = await require("./helpers/model").checkModel(inq);

	const widget = res.type == "datatable" ? "this.datatable" : "this.list";

	let data = "";
	if(model)
		data = model.modelType == "proxy" ? 
			`getData().then((data)=>{
			${widget}.parse(data.json(), "json");
		});` :  `${widget}.parse(${model.modelName}, "json");`;

	const view = res.type == "datatable" ?
			`rows:[
				{ view:"button", value:"add new",click:()=>{ this.datatable.add({});}},
				{
					view: "datatable",
					editable: true,
					columns: [
						${JSON.stringify(fields).slice(1, -1)},
						{header: "delete", template: "{common.trashIcon()}", width:60}
					],
					onClick: {
						"wxi-trash": (ev, id) => {
							webix.confirm({
								text: "This record will be deleted. <br/> Are you sure?",
								ok: "Yes",
								cancel: "Cancel",
								callback: (res) => {
									if (res)
										this.datatable.remove(id);
								}
							});
						}
					}
				}
			]`:
			`cols:[
				{
					view:"list",
					template: "#${fields.length > 0 ? fields[0].name : ""}#",
					select:true
				},
				{
					view:"form",
					elements:[
						${JSON.stringify(fields).slice(1, -1)},
						{cols:[
							{view:"button", value:"Save", click:()=>{this.form.save();}},
							{view:"button", value:"Add", click:()=>{
								let values = this.form.getValues();
								values.id = webix.uid();
								this.list.add(values);
							}},
							{view:"button", value:"Remove", click:(id)=>{this.list.remove(this.list.getSelectedId())}}
						]},
						{}
					]
				}
			]`;

	let views = res.type == "datatable" ? `this.datatable = view.queryView({view:"datatable"});` : `this.list = view.queryView({view:"list"});
		this.form = view.queryView({view:"form"});
		this.form.bind(this.list);`;
	c.addView(`views/${viewName}`,`
		return{
			${view}
		};`, `		${views}
		${data}`
	);

	if(model){
		const modelName = model.modelType == "proxy" ? "{getData, saveData}" : `{${model.modelName}}`;
		c.addImport(`views/${viewName}`, modelName, `models/${model.modelFileName}`);
	}
	c.addMarker("views/top", "Menu", `{ value:"${viewName}", id:"${viewName}", icon:"wxi-pencil" },`);
};

module.exports = {
	run
};