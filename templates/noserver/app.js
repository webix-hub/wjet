/*
	App configuration
*/

define([
	"libs/webix-mvc-core/core",
	"libs/webix-mvc-core/plugins/menu",<% if (user) { %>
	"libs/webix-mvc-core/plugins/user",<% } %><% if (skins) { %>
	"libs/webix-mvc-core/plugins/theme",<% } %><% if (langs) { %>
	"libs/webix-mvc-core/plugins/locale"<% } %>
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