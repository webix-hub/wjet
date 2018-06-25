import {JetView} from "webix-jet";

export default class DataView extends JetView{
	config(){
		return { template:"Place the main overview here", autoConfig:true };
	}
}