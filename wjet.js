#!/usr/bin/env node
var cfg = require("./package.json");
var cmd = require("commander");
var inquirer  = require('inquirer');
cmd.version(cfg.version);
cmd.command('init').description("create a new webix-jet app").action(function(){
	require("./actions/init").run(inquirer);
	
});
cmd.parse(process.argv)
