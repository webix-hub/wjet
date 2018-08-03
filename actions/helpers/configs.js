const data = require("./data");

module.exports = {
	"Pivot": {icon:"th", id:"pivot", value:"Pivot", model:data.pivot,
		extra: `structure: {
				rows: ["form", "name"], 
				columns: ["year"],
				values: [{ name:"oil", operation:["min","sum"]}]
			}`
	},
	"Filemanager": {icon:"file", id:"filemanager", value:"Filemanager", model:data.filemanager},
	"Spreadsheet": {icon:"table", id:"spreadsheet", value:"Spreadsheet", model:data.spreadsheet},
	"Kanban": {icon:"id-card", id:"kanban", value:"Kanban", model:data.kanban,
		extra: `cols:[
				{header:"In Progress", body:{ view:"kanbanlist", status:"work" }},
				{header:"Done", body:{ view:"kanbanlist", status:"done" }}
			]`
	},
	"Querybuilder": {icon:"question", id:"querybuilder", value:"Querybuilder", spacer:true,
		extra:`fields: [
				{ id:"fname", value:"First Name", type:"string" },
				{ id:"lname", value:"Last Name",  type:"string" },
				{ id:"age",  value:"Age", type:"number" },
				{ id:"bdate",  value:"Birth Date", type:"date" }
			]`
	},
	"DHX Scheduler": {icon:"bus", id:"dhx-scheduler", value:"Schedule", method:"getScheduler", model:data.scheduler, dhx:true},
	"DHX Gantt": {icon:"bars", id:"dhx-gantt", value:"Gantt", method:"getGantt", model:data.gantt, dhx:true},
};