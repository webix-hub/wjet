const fs = require("fs");
const cfg = require("./app");

async function setName(inq, type){
	let done;
	let fileName;
	while (done != true) {
		const file = await inq.prompt([
			{ type: 'input', name: 'fileName', message: 'Enter file name' },
			{ type: 'confirm', name: 'checkFile', message: 'Do you want to override file?', default: false,
				when: a => fs.existsSync(`sources/${type}/${a.fileName}.${cfg.getExt()}`)}
		]);
		if(file.hasOwnProperty('checkFile')&&file.checkFile || !file.hasOwnProperty('checkFile')&&file.fileName){
			fileName = file.fileName;
			done = true;
		}
	}
	return fileName;
}

module.exports = {
	setName
};