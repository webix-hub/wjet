const c = require("./common");
const configs = require("./helpers/configs");

async function run(inq, widget){
	const name = await require("./helpers/file-confirm").run(inq, "models");

	const res = await inq.prompt([
		{ type: 'list', name: 'modelType', message: 'Which kind of model do you want to create',
			"default": "Static ( js data )", choices:["Static ( js data )", "Data collection", "Proxy for server API"] },
		{ type: 'input', name: 'modelName', message: 'Name your model',
			"default": "data", when: a => a.modelType != "Proxy for server API" },
		{ type: 'input', name: 'url', message: 'Model url',
			"default": "data.php", when: a => a.modelType == "Proxy for server API" },
	]);

	res.modelFileName = name;

	let message = [
		"",
		"Model successfully added.",
		""
	];

	try {

		let type;

		switch (res.modelType) {
			case "Static ( js data )":
				res.modelType = "static";
				break;
			case "Data collection":
				res.modelType = "collection";
				break;
			case "Proxy for server API":
				res.modelType = "proxy";
				break;
		}

		let data = res.url || (widget && configs[widget].model ? configs[widget].model : "[]");

		c.addModel(`models/${res.modelFileName}`, res.modelName, res.modelType, data);

		console.log(message.join("\n")+"\n");

	} catch(e) {
		console.log(e);
	}

	return res;

}

module.exports = {
	run
};