const c = require("./common");

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
			c.addPlugin("app", "User", "{ model: session }");
			c.addImport("app", "session", "models/session");
			c.addFile(
				"front/features/auth/session.js",
				"sources/models/session");
			c.addFile(
				"front/features/auth/login.js",
				"sources/views/login");

			c.addUI("views/top",`
		const logout = {
			view:"button", label:"Logout",
			click: () => this.show("/logout")
		};`)
			c.addMarker("views/top", "Sidebar", ", logout");

			message.push("login    = admin");
			message.push("password = 1");
		}

		else if (res.feature === "Localization"){
			c.addPlugin("app", "Locale", "{ lang: \"en\", \n\t\tstorage: webix.storage.prefix(this.config.id, webix.storage.local) }");
			c.addUI("views/settings",`
		const locale = this.app.getService("locale");
		const _ = locale._;

		const langs = {
			paddingX:20, rows:[
				{ type:"section", template:_("AppsLanguage")},
				{ view:"segmented", localId:"lang", options:[
					{ id:"en", value:"English" },
					{ id:"de", value:"Deutsche"}
				], optionWidth:100, click:() => {
					const value = this.$$("lang").getValue();
					locale.setLang(value);
				}, value:locale.getLang() }
			]
		};`);
			c.addMarker("views/settings", "Settings", "langs,");
			c.addFile("front/features/locale/en.js",
					   "sources/locales/en")
			c.addFile("front/features/locale/de.js",
					   "sources/locales/de")
		}

		console.log(message.join("\n")+"\n");


	} catch(e) {
		console.log(e);
	}

}

module.exports = {
	run
};