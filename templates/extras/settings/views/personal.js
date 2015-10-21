define([
	"app"<% if (user) { %>,
	"models/user"<% } %><% if (langs) { %>,
	"libs/webix-jet-core/plugins/locale"<% } %><% if (skins) { %>,
	"libs/webix-jet-core/plugins/theme"<% } %>
],function(app<% if (user) { %>, users<% } %><% if (langs) { %>, locales<% } %><% if (skins) { %>, themes<% } %>){

<% if (langs) { %>
	var languages = [
		{ id:"ru", value:"Russian" },
		{ id:"en", value:"English" }
	];
	var lang_ui = { view:"segmented", name:"language", label:"Language",
		options:languages, optionWidth:120,
		click:function(){ locales.setLang(this.getValue()); }
	};

<% } %><% if (skins) { %>
	var themenames = [
		{ id:"siberia:webix", 			value:"Siberia" },
		{ id:"siberia:skins/compact", 	value:"Compact" }
	];
	var skins_ui = { view:"segmented", name:"theme", label:"Theme",
		options:themenames, optionWidth:120,
		click:function(){ themes.setTheme(this.getValue()); }
	};
<% } %>

<% if (user) { %>
	var user1 = { type:"section", template:"User Info" };
	var user2 = { cols:[
		{ view:"label", label: "You have logged as" + logout },
		{ view:"button", value: "Change password", click:function(){
			this.$scope.ui(pass.$popup).show( this.$view );
			pass.onPassChange = function(value){
				users.changePassword("", value);
			};
        }},{}
	]};

	var me = users.getCurrentUser();
	var logout =" <b>"+me.login+"</b>, <a href='#!/logout'>" + "logout" + "</a>";
<% } else { %>
<% } %>

    var personal = { view:"form", rows:[
    	{ type:"section", template:"App settings" },
		<% if (user) { %>user1, user2, <%}%><% if (langs) { %>lang_ui, <%}%><% if (skins) { %>skins_ui, <%}%>
		{}
	]};

	var view = {
		$ui : personal<% if (langs || skins) {%>,
		$oninit:function(view){<% if (langs) { %>
			view.elements.language.setValue( locales.getLang() );<% } %><% if (skins) { %>
			view.elements.theme.setValue( themes.getThemeId() );<% } %>
		}<% } %>
	};

	return view;
});