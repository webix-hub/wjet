const c = require("./common");

async function run(inq, viewName){
	const res = await inq.prompt([
		{ type: 'list', name: 'type', message: 'CRUD type', default: "datatable", choices:["datatable", "form"] },
	]);

	const fields = await require("./helpers/fields").addFields(inq, res.type);
	const model = await require("./helpers/models").checkModel(inq);

	const widget = res.type == "datatable" ? "this.datatable" : "this.list";

	let data = "";
	if(model)
		data = model.modelType == "proxy" ? 
			`getData().then((data)=>{
			${widget}.parse(data.json(), "json");
		});` :  `${widget}.parse(data, "json");`;

	const view = res.type == "datatable" ?
			`rows:[
				{ view:"toolbar", cols:[
					{ view:"button", width:120, value:"Add new",click:()=>{ this.datatable.add({});}},
					{}
				]},
				{
					view: "datatable",
					editable: true,
					columns: [
						${JSON.stringify(fields).slice(1, -1)},
						{header: " ", template: "{common.trashIcon()}", width:60}
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
					width:250,
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

	let views = res.type == "datatable" ? `this.datatable = view.queryView("datatable");` : `this.list = view.queryView("list");
		this.form = view.queryView("form");
		this.form.bind(this.list);`;
	c.addView(`views/${viewName}`,`
		return{
			${view}
		};`, `		${views}
		${data}`
	);

	if(model){
		const modelName = model.modelType == "proxy" ? "{getData, saveData}" : `{data}`;
		c.addImport(`views/${viewName}`, modelName, `models/${model.modelFileName}`);
	}
	c.addMarker("views/top", "Menu", `{ value:"${viewName}", id:"${viewName}", icon:"wxi-pencil" },`);
};

module.exports = {
	run
};