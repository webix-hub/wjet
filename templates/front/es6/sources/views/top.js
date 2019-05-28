import {JetView, plugins} from "webix-jet";

export default class TopView extends JetView{
	config(){
		const header = {
			type:"header", template:this.app.config.name
		};

		const menu = {
			view:"menu", id:"top:menu", 
			width:180, layout:"y", select:true,
			template:"<span class='webix_icon #icon#'></span> #value# ",
			data:[
				{ value:"DashBoard", id:"start", icon:"wxi-plus-square" },
				{ value:"Data",		 id:"data",  icon:"wxi-columns" },
				{ value:"Settings",  id:"settings",  icon:"wxi-pencil" },
				/*wjet::Menu*/
			]
		};

		const ui = {
			type:"line", cols:[
				{ 
					type:"clean", css:"app-left-panel",
					padding:10, margin:20, borderless:true, rows: [ header, menu /*wjet::Sidebar*/ ]
				},
				{ rows:[ { height:10}, 
					{ type:"clean", css:"app-right-panel", padding:4, rows:[
						{ $subview:true } 
					]}
				]}
			]
		};

		return ui;
	}

	init(){
		this.use(plugins.Menu, "top:menu");
	}
}