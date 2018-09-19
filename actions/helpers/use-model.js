const fs = require("fs");

async function run(inq, res){
	let allModels = [];

	fs.readdirSync("./sources/models").forEach(file => {
		allModels.push(file.slice(0, -3));
	})

	const fileName = await inq.prompt([
		{ type: 'list', name: 'modelName', message: 'Select model', choices: allModels },
	]);

	res.modelFileName = fileName.modelName;

	let str = fs.readFileSync("./sources/models/"+res.modelFileName+".js").toString("utf8");

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

module.exports = {
	run
};