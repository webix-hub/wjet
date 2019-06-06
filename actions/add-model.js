const c = require("./common");
const configs = require("./helpers/configs");

async function run(inq, modelData){
	const name = await require("./helpers/filename").setName(inq, "models", "Model");

	const res = await inq.prompt([
		{ type: 'list', name: 'modelType', message: 'Which kind of model do you want to create',
			"default": "Static ( js data )", choices:["Static ( js data )", "Data collection", "Proxy for server API"] },
		{ type: 'input', name: 'url', message: 'REST url for the model',
			"default": "/api/data", when: a => a.modelType == "Proxy for server API" },
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

		modelData = modelData || [{ id:1, value:"One" },{ id:2, value:"Two" },{ id:3, value:"Three" }];
		let data = res.url || JSON.stringify(modelData, null, "\t");

		c.addModel(`models/${res.modelFileName}`, res.modelType, data);

		console.log(message.join("\n")+"\n");

	} catch(e) {
		console.log(e);
	}

	return res;

}

module.exports = {
	run
};