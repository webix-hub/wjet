import {JetView} from "webix-jet";
import {data} from "models/records";
import info from "templates/info.handlebars";

export default class DataView extends JetView{
	config(){
		return { template:info };
	}
	init(view){
		view.setValues({ record: data.serialize() });
	}
}