var common = require("./common.js");

function run(inq){

	inq.prompt([
		// Get app name from arguments by default
		{ type: 'input', name: 'appName', message: 'Give your app a name',
			"default": "The App!" },
		{ type: 'list', name: 'typescript', message: 'Do you want to use TypeScript ?',
			"default": "No", choices:["Yes", "No"]},
		// { type: 'list', name: 'less', message: 'CSS pre-processor ?',
		// 	"default": "No", choices:["No", "Less", "Sass"] },
		// { type: 'list', name: 'template', message: 'External template engine ?',
		// 	"default": "No", choices:["No", "Handlebars"] },
		// { type: 'list', name: 'skin', message: 'Default app skin ?',
		// 	"default": "Flat", choices:["Flat", "Compact", "Material"] },
		{ type: 'list', name: 'edition', message: 'GPL or Commercial version of Webix UI ?',
		 	"default": "GPL", choices:["GPL", "Commercial"] },
		// { type: 'list', name: 'backend', message: 'Backend ?',
		// 	"default": "None", choices:["None", "PHP", "NodeJS", ".Net"] },

	]).then(res => {

		res.appID = res.appName.replace(/[^a-z0-9]+/gi,"-").replace(/-$|^-/, "").toLowerCase();
		res.fileExt = res.typescript === "Yes" ? "ts" : "js";
		res.webixPath = res.edition === "GPL" ? "node_modules/webix/" : "node_modules/@xbs/webix-pro/";

		var ctp = common.files();
		ctp.add("/front/package.json");
		ctp.add("/front/webpack.config.js");

		if (res.typescript === "Yes")
			ctp.add("/front/typescript/**", { dot: true });
		else
			ctp.add("/front/es6/**", { dot: true });
	
		ctp.save("./", res);

	}).catch(e => console.log(e));

}

module.exports = {
	run
};