const vfs = require("vinyl-fs");
const es = require("event-stream");

var starter = require("./starter");

async function run(inq){

	res = await inq.prompt([
		// Get app name from arguments by default
		{ type: 'input', name: 'appName', message: 'Give your app a name',
			"default": "The App!" },
		{ type: 'confirm', name: 'customTools', message: 'App will use Javascript (ES6) and CSS\n  Do you need advanced preprocessing ( Typescript, Sass, Handlebars ) ?',
			"default": false },
		{ type: 'list', name: 'css', message: 'CSS pre-processor ?',
		 	"default": "No", choices:["No", "Less", "Sass"], when: a => a.customTools },
		{ type: 'confirm', name: 'handlebars', message: 'Use Handlebars for templating ?',
		 	"default": false, when: a => a.customTools  },
		{ type: 'confirm', name: 'typescript', message: 'Use Typescript ?',
		 	"default": false, when: a => a.customTools },
		{ type: 'list', name: 'skin', message: 'Default app skin ?',
		 	"default": "Flat", choices:["Flat", "Compact"] },
		{ type: 'list', name: 'edition', message: 'GPL or Commercial version of Webix UI ?',
			 "default": "GPL", choices:["GPL", "Commercial"] }
	]);

	try {
		res.appID = res.appName.replace(/[^a-z0-9]+/gi,"-").replace(/-$|^-/, "").toLowerCase();
		res.fileExt = res.typescript ? "ts" : "js";
		res.skin = skins[res.skin];

		res.css = (res.css||"no").toLowerCase();
		if (res.css === "no") res.css = "css";
		res.less = res.css === "Less";
		res.sass = res.css === "Sass";

		res.webixPath = res.edition === "GPL" ? "node_modules/webix/" : "node_modules/@xbs/webix-pro/";
		res.webixNPM = res.edition === "GPL" ? "webix" : "@xbs/webix-pro";

		var files = starter.stream(res);
		files.pipe(vfs.dest("./"));
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