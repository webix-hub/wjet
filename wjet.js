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

cmd.command('add <entity> <name>')
	.description("add view, model, widget, feature")
	.action(function(entity, name, cmd){

	});

cmd.parse(process.argv)

if (!process.argv.slice(2).length) {
  cmd.outputHelp();
}
