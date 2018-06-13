import {JetView} from "webix-jet";
​
export default class LoginView extends JetView{
config(){
    return {
        view:"form",
        rows:[
            { view:"text", name:"login", label:"User Name", labelPosition:"top" },
            { view:"text", type:"password", name:"pass", label:"Password", labelPosition:"top" },
            { view:"button", value:"Login", click:()=>{
                this.do_login(); //do_login() is implemented as a class method below
            }, hotkey:"enter" }
        ],
        rules:{
            login:webix.rules.isNotEmpty,
            pass:webix.rules.isNotEmpty
        }
    };
}