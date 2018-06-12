const vfs = require("vinyl-fs");
const es = require("event-stream");

const bars = require("handlebars");
const path = require("path");

function stream(cfg){

	const rootDir = path.resolve(__dirname+"/../templates");
	const folder = cfg.typescript === "Yes" ? "typescript" : "es6";
	const front = `${rootDir}/front/${folder}`;

	const source = vfs.src([
		`${front}/sources/**`,
		`!${front}/sources/app.{ts,js}`,
	], { base: front });

	const app = vfs.src([
		`${front}/sources/app.{ts,js}`,
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

	return es.merge(source, app, configs, styles);
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
	file.path = file.path.replace(file.base, "")
}

function through(lambda){
	return es.through(function(file){
		const res = lambda(file);
		if (res !== null)
			this.emit('data', res);
	})
}

module.exports = { stream };