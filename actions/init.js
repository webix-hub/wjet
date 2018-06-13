const vfs = require("vinyl-fs");
const es = require("event-stream");
const bars = require("handlebars");
const path = require("path");

async function run(inq){

	const res = await inq.prompt([
		{ type: 'input', name: 'appName', message: 'Give your app a name',
			"default": "The App!" },
		{ type: 'confirm', name: 'customTools', message: 'App will use Javascript (ES6) and CSS\n  Do you need advanced preprocessing ( Typescript, Sass, Handlebars ) ?',
			"default": false },
		{ type: 'list', name: 'css', message: 'CSS pre-processor ?',
		 	"default": "No", choices:["No", "Less", "Sass"], when: a => a.customTools },
		{ type: 'confirm', name: 'handlebars', message: 'Use Handlebars for templating ?',
		 	"default": false, when: a => a.customTools  },
		// { type: 'confirm', name: 'typescript', message: 'Use Typescript ?',
		//  	"default": false, when: a => a.customTools },
		{ type: 'list', name: 'skin', message: 'Default app skin ?',
		 	"default": "Flat", choices:["Flat", "Compact"] },
		{ type: 'list', name: 'edition', message: 'GPL or Commercial version of Webix UI ?',
			 "default": "GPL", choices:["GPL", "Commercial"] }
	]);

	try {
		res.appID = res.appName.replace(/[^a-z0-9]+/gi,"-").replace(/-$|^-/, "").toLowerCase();
		res.fileExt = res.typescript ? "ts" : "js";
		res.skin = skins[res.skin];

		res.css = (res.css||"css").toLowerCase();
		if (res.css === "no") res.css = "css";
		res.less = res.css === "less";
		res.sass = res.css === "sass";

		res.webixPath = res.edition === "GPL" ? "node_modules/webix/" : "node_modules/@xbs/webix-pro/";
		res.webixNPM = res.edition === "GPL" ? "webix" : "@xbs/webix-pro";

		var files = stream(res);
		files.pipe(vfs.dest("./"))
			.on("end", function(){
				console.log(`
Files are ready. run

npm install
npm run start

to start the app`)
			});
	} catch(e) {
		console.log(e);
	}

}

const skins = {
	"Flat" : "webix.css",
	"Compact" : "skins/compact.css"
};

module.exports = {
	run
};

function stream(cfg){

	const rootDir = path.resolve(__dirname+"/../templates");
	const folder = cfg.typescript === "Yes" ? "typescript" : "es6";
	const front = `${rootDir}/front/${folder}`;

	const source = vfs.src([
		`${front}/sources/**`,
		`!${front}/sources/**/*.{ts,js}`,
	], { base: front });

	const app = vfs.src([
		`${front}/sources/**/*.{ts,js}`,
	], { base: front })
		.pipe(through(f => template(f, cfg)));

	const styles = vfs.src([
		`${rootDir}/front/styles/${cfg.css}/**`
	])
		.pipe(through(f => move(f, "sources")));

	const configs = vfs.src([
		`${front}/*`
	], { dot: true })
		.pipe(through(f => template(f, cfg)));


	const all = [source, app, configs, styles]

	if (cfg.handlebars){
		const bars = vfs.src([
			`${rootDir}/front/handlebars/**`
		])
			.pipe(through(f => move(f, "sources")));
		all.push(bars);
	}

	return es.merge.apply(es, all);
}

function move(file, name){
	file.path = path.join(file.base, name,  file.relative);
	return file;
}

function template(file, cfg){
	if (!file.contents) return null;
	const str = bars.compile(file.contents.toString("utf8"));
	file.contents = new Buffer(str(cfg));
	return file;
}

function through(lambda){
	return es.through(function(file){
		const res = lambda(file);
		if (res !== null)
			this.emit('data', res);
	})
}