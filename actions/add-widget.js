async function run(inq){


	const res = await inq.prompt([
		{ type: 'list', name: 'widget', message: 'Select the widget',
			choices:["Spreadsheet", "DHX Scheduler", "DHX Gantt"] }
	]);
	let message = [
		"",
		"Changes applied, now",
		"- stop the app",
		"- run 'npm install'",
		"- run 'npm run start' to restart the app",
		""
	];

	if (res.widget === "DHX Scheduler"){
		require("./widgets/dhx-scheduler")(res, message);
	} else if (res.widget === "DHX Gantt"){
		require("./widgets/dhx-gantt")(res, message);
	} else if (res.widget === "Spreadsheet"){
		require("./widgets/spreadsheet")(res, message);
	}

	console.log(message.join("\n")+"\n");

}

module.exports = {
	run
};