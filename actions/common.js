const fs = require("fs");
const path = require("path");

function replaceFile(name, mode, text){
	name = "./sources/"+name;

	let str = fs.readFileSync(name).toString("utf8");
	const pos = str.indexOf("/*wjet::"+mode+"*/");
	if (pos != -1){
		str = str.substr(0, pos) + text + "\n"+str.substr(pos);
		fs.writeFileSync(name, str);
	}
}

async function addPlugin(file, name){
	addImport(file, "plugins", "webix-jet");

	const plugin = `this.use(plugins.${name}, { model: session });`;
	return replaceFile(file, "plugin", plugin);
}

async function addImport(file, name, from){
	const line = `import ${name} from "${from}";\n`;

	let str = fs.readFileSync(name).toString("utf8");
	const pos = str.indexOf(line);
	if (pos != -1){
		str = line + str;
		fs.writeFileSync(name, str);
	}
}

async function addSettings(){

}

async function addMenu(){

}

async function addView(){

}

async function addFile(from, to){
	const rootDir = path.resolve(__dirname+"/../templates");
	return new Promise((resolve, reject) => {
		fs.copyFile(path.join(rootDir, from), to, result => resolve());	
	});
	
}

async function addModel(){

}

module.exports = {
	addPlugin,
	addSettings,
	addMenu,
	addView,
	addFile,
	addModel,
	addImport
}