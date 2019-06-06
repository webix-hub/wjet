import {JetView} from "webix-jet";

export default class LoginView extends JetView{
    config(){
        const head = { type:"header", template: "Login", css:"webix_dark" };
        const body = {
            view:"form", localId:"form",
            width:400,
            rows:[
                { view:"text", name:"login", label:"User Name", labelPosition:"top" },
                { view:"text", type:"password", name:"pass", label:"Password", labelPosition:"top" },
                { view:"button", value:"Login", click:() => this.Login(), hotkey:"enter" }
            ],
            rules:{
                login:webix.rules.isNotEmpty,
                pass:webix.rules.isNotEmpty
            }
        };

        return {
            view:"window",
            position:"center",
            head,
            body
        };
    }

    init(view){
        this.getRoot().show();
    }

    Login(){
        const user = this.app.getService("user");
        const form = this.getRoot().queryView({ view:"form" });

        if (form.validate()){
            const data = form.getValues();
            user.login(data.login, data.pass).catch(function(){
                webix.html.removeCss(form.$view, "invalid_login");
                form.elements.pass.focus();
                webix.delay(function(){
                    webix.html.addCss(form.$view, "invalid_login");
                });
            });
        }
    }
}