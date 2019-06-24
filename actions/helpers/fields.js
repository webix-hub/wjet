async function addFields(inq, type){
	let fields = [];
	while (true) {
		const field = await inq.prompt([
			{ type: 'input', name: 'name', message: 'Field name'},
			{ type: 'input', name: 'id', message: 'Field id'},
			{ type: 'confirm', name: 'add', message: 'Do you want to add one more field?', "default": true }
		]);

		fields.push(type == "datatable" ?
			{id: field.id, header: field.name, editor: "text", fillspace:true}:
			{view:"text", name: field.id, label: field.name});

		if (!field.add)
			break;
	}
	return fields;
}

module.exports = {
	addFields
};