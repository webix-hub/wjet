import {JetView} from "webix-jet";

export default class StartView extends JetView{
	config(){
		return {
			rows:[
				{ type:"header", template:"Dashboard"},
				/*wjet::Settings*/
				{ template:"Place main app's stats here", borderless:true }
			]
		}
	}
}