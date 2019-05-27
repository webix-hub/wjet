const fs = require("fs");

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
	getSkin
};