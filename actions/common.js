const fs = require("fs");
const path = require("path");


function replaceAndSave(name, mode, text, after){
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

function addMarker(name, mode, text, after){
	mode = "/*wjet::"+mode+"*/";
	return replaceAndSave(name, mode, text, after);
}

function addPlugin(file, name, config){
	addImport(file, "{plugins}", "webix-jet");

	const plugin = `this.use(plugins.${name}, ${config});`;
	return addMarker(file, "plugin", plugin);
}

function addImport(file, name, from){
	file =  "./sources/" + file;
	let line;
	if (name)
		line = `import ${name} from "${from}";\n`;
	else
		line = `import "${from}";\n`;

	let str = fs.readFileSync(file).toString("utf8");
	const pos = str.indexOf(line);
	if (pos === -1){
		str = line + str;
		fs.writeFileSync(file, str);
	}
}

function addUI(file, code){
	replaceAndSave(file, "config(){", "\n"+code+"\n\n", true);
}

function addPackage(name){
	const code = fs.readFileSync("./package.json").toString("utf8");
	const json = JSON.parse(code);
	if (!json.dependencies[name] && !json.devDependencies[name]){
		json.dependencies[name] = "*";
		fs.writeFileSync("./package.json", JSON.stringify(json, null, "  "));
	}
}


function addFile(from, to){
	const rootDir = path.resolve(__dirname+"/../templates");
	fs.copyFileSync(path.join(rootDir, from), to);	
}

function addView(name, content, init){
	name = "./sources/"+name;
	let str = `import {JetView} from "webix-jet";

export default class MyView extends JetView{
	config(){
${content}
	}
	init(view){
${init}
	}
}
`;
	fs.writeFileSync(name, str);
}

function addModel(fileName, name, mode, content){
	fileName = "./sources/"+fileName;

	let str;
	if (mode === "static"){
		str = `export const ${name} = ${content};`;
	} else if(mode === "collection"){
		str = `export const ${name} = new webix.DataCollection({
	data: ${content}
});`;
	} else if(mode === "proxy"){
		str = `export function getData(){
	return webix.ajax("${content}");
}
export function saveData(id, operation, data){
	return webix.ajax().post("${content}", id, operation, data)
}`;
	}

	fs.writeFileSync(fileName, str);
}

module.exports = {
	addPlugin,
	addPackage,
	addView,
	addFile,
	addModel,
	addImport,
	addUI,
	addMarker
}