const fs = require("fs");

function notImported(url){
	const name = `./sources/app.${getExt()}`;
	let str = fs.readFileSync(name).toString("utf8");
	return str.indexOf(url) == -1;
}

function getConfigs(){
	return fs.readFileSync("./config.txt").toString("utf8").split(";");
}

function getExt(){
	return getConfigs()[0];
}

function getSkin(){
	return getConfigs()[1];
}

module.exports = {
	getExt,
	getSkin,
	notImported
};