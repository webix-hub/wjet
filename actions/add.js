const vfs = require("vinyl-fs");
const es = require("event-stream");
const bars = require("handlebars");
const path = require("path");

const common = require("./common");

async function run(inq){


	const res = await inq.prompt([
		{ type: 'list', name: 'feature', message: 'Select the feature',
			"default": "Authentication", choices:["Authentication", "Localization"] }
	]);
	let message = [
		"",
		"Changes applied, refresh the app to see the new functionality.",
		""
	];

	try {

		if (res.feature === "Authentication"){
			await common.addPlugin("app.js", "User");
			await common.addImport("app.js", "session", "models/session");
			await common.addFile(
				"front/features/auth/session.js",
				"sources/models/session.js");
			await common.addFile(
				"front/features/auth/login.js",
				"sources/views/login.js");
			await common.addSettings("");

			message.push("login    = admin");
			message.push("password = 1");
		}

		if (res.feature === "Localization"){
			await common.addPlugin("Locale");
			await common.copyFiles();
			await common.addSettings();
		}

		console.log(message.join("\n"));


	} catch(e) {
		console.log(e);
	}

}

const skins = {
	"Flat" : "webix.css",
	"Compact" : "skins/compact.css"
};

module.exports = {
	run
};