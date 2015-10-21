/*
	App configuration
*/

define([
	"libs/webix-jet-core/core",
	"libs/webix-jet-core/plugins/menu",<% if (user) { %>
	"libs/webix-jet-core/plugins/user",<% } %><% if (skins) { %>
	"libs/webix-jet-core/plugins/theme",<% } %><% if (langs) { %>
	"libs/webix-jet-core/plugins/locale"<% } %>
], function(
	core, menu<% if (user) { %>, user<% } %><% if (skins) { %>, theme<% } %><% if (langs) { %>, locale<% } %>
){

	//configuration
	var app = core.create({
		id:         "${appNameDashed}",
		name:       "${appName}",
		version:    "0.1.0",
		debug:      true,
		start:      "/top/start"
	});

	app.use(menu);
<% if (user) { %>	app.use(user);<% } %>
<% if (skins) { %>	app.use(theme);<% } %>
<% if (langs) { %>	app.use(locale);<% } %>
	return app;
});