#!/usr/bin/env node
var cfg = require("./package.json");
var cmd = require("commander");
var inquirer  = require('inquirer');

cmd.version(cfg.version, "-v, --version");
cmd.usage("[options] <command>");
cmd.command('init')
	.description("create a new webix-jet app")
	.action(function(){
		require("./actions/init").run(inquirer);
	});

cmd.command('add <entity>')
	.description("add widget, feature")
	.action(function(entity, cmd){
		if (entity === "feature")
			require("./actions/add-feature").run(inquirer);
		else if (entity === "widget")
			require("./actions/add-widget").run(inquirer);
		else if (entity === "model")
			require("./actions/add-model").run(inquirer);
		else 
			console.log("Sorry, I don't know how to add "+entity);
	});

cmd.parse(process.argv)

if (!process.argv.slice(2).length) {
  cmd.outputHelp();
}
