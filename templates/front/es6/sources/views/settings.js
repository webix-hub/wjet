import {JetView} from "webix-jet";

export default class SettingsView extends JetView{
	config(){
		return {
			type:"clean", rows:[
				{ type:"header", template:"Settings"},
				/*wjet::Settings*/
				{ template:"Place app's seetings here" }
			]
		}
	}
}