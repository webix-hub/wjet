var fs = require('vinyl-fs');
var es = require("event-stream");
var tmpl = require("lodash.template");
var bower = require("bower");

var templates = require("fs").realpathSync(__dirname+"/../templates");
function template(file, cb) {

  file.contents = new Buffer()
  cb(null, file);
};

function runner(){
	this.order = [];
}
runner.prototype = {
	add:function(src, opt){
		this.order.push({ src:src, opt:opt });
	},
	save:function(dest, cfg){
		var handlers = [];
		for (var i=0; i<this.order.length; i++)
			handlers.push(this.run(this.order[i].src, this.order[i].opt, dest, cfg));

		es.merge(handlers).on("end", function(){
			console.log("Insaling dependencies...");
			bower.commands.install();
			console.log("done")
		});
	},
	run:function(src, opt, dest, cfg){
		return fs.src(templates+src, opt)
		.pipe(es.map(function(file, cb){
			console.log(file.path);
			if (file.contents)
				file.contents = new Buffer( tmpl(file.contents.toString("utf8"))(cfg) );
			cb(null, file);
		}))
		.pipe(fs.dest(dest));
	}
};

module.exports = {
	files:function(){
		return new runner();
	}
};