const fs = require("fs");
const path = require("path");


async function replaceAndSave(name, mode, text, after){
	name = "./sources/"+name;

	let str = fs.readFileSync(name).toString("utf8");
	let pos = str.indexOf(mode);
	if (pos != -1){
		const exists = str.indexOf(text) != -1;
		if (!exists){
			if (after)
				pos += mode.length;

			str = str.substr(0, pos) + text + "\n"+str.substr(pos);
			fs.writeFileSync(name, str);
		}
	}
}
async function addMarker(name, mode, text, after){
	mode = "/*wjet::"+mode+"*/";
	return replaceAndSave(name, mode, text, after);
}

async function addPlugin(file, name){
	addImport(file, "{plugins}", "webix-jet");

	const plugin = `this.use(plugins.${name}, { model: session });`;
	return addMarker(file, "plugin", plugin);
}

async function addImport(file, name, from){
	file =  "./sources/" + file;
	const line = `import ${name} from "${from}";\n`;

	let str = fs.readFileSync(file).toString("utf8");
	const pos = str.indexOf(line);
	if (pos === -1){
		str = line + str;
		fs.writeFileSync(file, str);
	}
}

async function addUI(file, code){
	replaceAndSave(file, "config(){", "\n"+code+"\n\n", true);
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
	addImport,
	addUI,
	addMarker
}