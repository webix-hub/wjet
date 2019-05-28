const configs = require("./helpers/configs");

async function run(inq, viewName){
	const widgets = Object.keys(configs);

	viewName = viewName ? viewName : await require("./helpers/filename").setName(inq, "views");

	let res = await inq.prompt([
		{ type: 'list', name: 'widget', message: 'Select the widget', choices: widgets }
	]);

	let message = [
		"",
		"Changes applied, now",
		"- stop the app",
		"- run 'npm install'",
		"- run 'npm run start' to restart the app",
		""
	];

	const model = res.widget != "Querybuilder" ? await require("./helpers/models").checkModel(inq, "", res.widget) : false;
	if(model){
		res.modelName = model.modelName;
		res.modelType = model.modelType;
		res.modelFileName = model.modelFileName;
	}

	addWidget(res, viewName, message);
}

module.exports = {
	run
};

function addWidget(res, viewName, message){
	require("./helpers/widgets").addWidget(res, viewName, message);
	console.log(message.join("\n")+"\n");
}