async function run(inq, type){
	let fields = [];
	let done;
	while (done != true) {
		const field = await inq.prompt([
			{ type: 'confirm', name: 'add', message: 'Do you want to add field?', "default": true },
			{ type: 'input', name: 'id', message: 'Field id', when: a => a.add },
			{ type: 'input', name: 'name', message: 'Field name', when: a => a.add }
		]);

		if(field.add)
			fields.push(type == "datatable" ?
				{id: field.id, header: field.name, editor: "text", fillspace:true}:
				{view:"text", name: field.id, label: field.name});
		else
			done = true;
	}
	return fields;
}

module.exports = {
	run
};