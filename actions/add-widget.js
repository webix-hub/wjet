const configs = require("./helpers/configs");

async function run(inq){
	const widgets = Object.keys(configs);

	const res = await inq.prompt([
		{ type: 'list', name: 'widget', message: 'Select the widget',
			choices: widgets},
		{ type: 'confirm', name: 'model', message: 'Do you want to create new model for the widget?',
			"default": false, when: a => configs[a.widget] && configs[a.widget].model },
	]);
	let message = [
		"",
		"Changes applied, now",
		"- stop the app",
		"- run 'npm install'",
		"- run 'npm run start' to restart the app",
		""
	];

	if(res.model)
		require("./add-model").run(inq, res.widget).then(function(model){
			res.modelName = model.modelName;
			res.modelType = model.modelType;
			res.fileName = model.fileName;
			addWidget(res, message);
		});
	else
		addWidget(res, message);
}

module.exports = {
	run
};

function addWidget(res, message){
	require("./helpers/widgets")(res, message);
	console.log(message.join("\n")+"\n");
}