var common = require("./common.js");

var notempty = function(a){ return !!a; };
var dashed   = function(a){
  return a.replace(/[^a-zA-Z0-9]+/g," ").trim().replace(" ","-");
};
var hasServer = function(a){ return a.server && a.server != "None"; };
var hasDB = function(a){ return a.db && a.db != "None"; };
var hasNoSkins = function(a){ return !a.skins; };

function generate_app(cfg){

	cfg.user = !!cfg.user;
	cfg.less = cfg.skins?"Less":(cfg.less||"None");
	cfg.settings = cfg.user || cfg.skins || cfg.langs;

	cfg.server = cfg.db = cfg.ajax = "None";

	cfg.appNameDashed = dashed(cfg.appName);


	var ctp = common.files();

	//default files
	ctp.add('/noserver/**', { dot: true });

	//remove unused files from default app
	if (cfg.less == "None")
	  ctp.add('/extras/css/**');


	//add extra features
	if (cfg.settings)
	  ctp.add('/extras/settings/**');

	if (cfg.less == "Less")
	  ctp.add('/extras/less/**');


	ctp.save("./", cfg);
}

function action(inq){

	inq.prompt([
	    // Get app name from arguments by default
	    {type: 'input', name: 'appName', message: 'Give your app a name',
	      "default": "My App!" },
	    {type: 'confirm', name: 'langs', message: 'Do you want to create a multi-language app?',
	      "default": false },
	    {type: 'confirm', name: 'skins', message: 'Do you want to use multiple skins?',
	      "default": false },
	    {type: 'list', name: 'less', message: 'Css pre-processor?',
	      "default": "None", choices:["None", "Less"], when:hasNoSkins }
	], generate_app);

}

module.exports = {
	run:action
};