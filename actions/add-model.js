const c = require("./common");
const configs = require("./helpers/configs");

async function run(inq, widget){

	const res = await inq.prompt([
		{ type: 'input', name: 'fileName', message: 'Enter file name',
			"default": "my_model", when: a => !a.fileName ||  a.fileName == "my_model" },
		{ type: 'list', name: 'modelType', message: 'Which kind of model do you want to create',
			"default": "Static ( js data )", choices:["Static ( js data )", "Data collection", "Proxy for server API"] },
		{ type: 'input', name: 'modelName', message: 'Name your model',
			"default": "data", when: a => a.modelType != "Proxy for server API" },
		{ type: 'input', name: 'url', message: 'Model url',
			"default": "data.php", when: a => a.modelType == "Proxy for server API" },
	]);
	let message = [
		"",
		"Changes applied, refresh the app to see the new functionality.",
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

		c.addModel(`models/${res.fileName}.js`, res.modelName, res.modelType, data);

		console.log(message.join("\n")+"\n");

	} catch(e) {
		console.log(e);
	}

	return res;

}

module.exports = {
	run
};