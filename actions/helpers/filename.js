const fs = require("fs");
const cfg = require("./app");

async function setName(inq, type, entity){
	entity = entity || "file";

	let fileName;
	while (true) {
		const file = await inq.prompt([
			{ 
				type: 'input', name: 'fileName', message: `Enter ${entity} name`,
				filter: name => name.toLowerCase().replace(/[^a-z0-9_]/gi, "-")
			},
			{ type: 'confirm', name: 'checkFile', message: 'Such file already exists, do you want to overwrite it?', default: false,
				when: a => fs.existsSync(`sources/${type}/${a.fileName}.${cfg.getExt()}`)}
		]);

		const wasChecked = file.hasOwnProperty('checkFile');
		if(wasChecked&&file.checkFile || !wasChecked&&file.fileName){
			fileName = file.fileName;
			break;
		}
	}
	return fileName;
}

module.exports = {
	setName
};