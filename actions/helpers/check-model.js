async function run(inq, message){
	let model = await inq.prompt([
		{ type: 'confirm', name: 'model', message: `Do you want to add a model${message ? " "+message : ""}?`,"default": true },
		{ type: 'confirm', name: 'useModel', message: 'Use existing model?', "default": false, when: a => a.model }
	]);

	if(model.model){
		if(model.useModel)
			model = await require("./use-model").run(inq, model);
		else
			model = await require("../add-model").run(inq);
	}
	else
		model = false;
	return model;
}

module.exports = {
	run
};