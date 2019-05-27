const fs = require("fs");

async function useModel(inq, res){
	let allModels = [];

	fs.readdirSync("./sources/models").forEach(file => {
		allModels.push(file);
	})

	const fileName = await inq.prompt([
		{ type: 'list', name: 'modelName', message: 'Select model', choices: allModels },
	]);

	//remove file extension
	res.modelFileName = fileName.modelName.slice(0, -3);

	let str = fs.readFileSync("./sources/models/"+fileName.modelName).toString("utf8");

	if(str.indexOf("webix.DataCollection") > -1){
		res.modelType = "collection";
		res.modelName = /export const (.*) =/g.exec(str) ? /export const (.*) =/g.exec(str)[1] : "";
	}
	else if(str.indexOf("webix.ajax") > -1)
		res.modelType = "proxy";
	else{
		res.modelType = "static";
		res.modelName = /export const (.*) =/g.exec(str) ? /export const (.*) =/g.exec(str)[1] : "";
	}
	return res;
}

async function checkModel(inq, message, widget){
	let model = await inq.prompt([
		{ type: 'confirm', name: 'model', message: `Do you want to add a model${message ? " "+message : ""}?`,"default": true },
		{ type: 'confirm', name: 'useModel', message: 'Use existing model?', "default": false, when: a => a.model }
	]);

	if(model.model){
		if(model.useModel)
			model = await useModel(inq, model);
		else
			model = await require("../add-model").run(inq, widget);
	}
	else
		model = false;
	return model;
}

module.exports = {
	useModel,
	checkModel
};