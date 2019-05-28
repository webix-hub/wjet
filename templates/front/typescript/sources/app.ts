import "./styles/app.css";
import {JetApp, EmptyRouter, HashRouter } from "webix-jet";

declare var APPNAME, VERSION, PRODUCTION, BUILD_AS_MODULE;

export default class MyApp extends JetApp{
	constructor(config = {}){
		const defaults = {
			id 		: APPNAME,
			version : VERSION,
			router 	: BUILD_AS_MODULE ? EmptyRouter : HashRouter,
			debug 	: !PRODUCTION,
			start 	: "/top/start"
		};

		super({ ...defaults, ...config });

		/*wjet::plugin*/
	}
}

if (!BUILD_AS_MODULE){
	webix.ready(() => {
		const extra = [
			/*wjet::extra*/
		];

		(extra.length ? webix.require(extra) : webix.promise.resolve()).then(function(){
			new MyApp().render();
		});
	});
}