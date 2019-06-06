const data = require("./data");

module.exports = {
	"Pivot": {icon:"wxi-columns", id:"pivot", value:"Pivot", model:data.pivot,
		extra: `structure: {
				rows: ["form", "name"], 
				columns: ["year"],
				values: [{ name:"oil", operation:["min","sum"]}]
			}`
	},
	"Filemanager": {icon:"wxi-file", id:"filemanager", value:"Filemanager", model:data.filemanager},
	"Spreadsheet": {icon:"wxi-columns", id:"spreadsheet", value:"Spreadsheet", model:data.spreadsheet},
	"Kanban": {icon:"wxi-plus-square", id:"kanban", value:"Kanban", model:data.kanban,
		extra: `cols:[
				{header:"Backlog", body:{ view:"kanbanlist", status:"backlog" }},
				{header:"In Progress", body:{ view:"kanbanlist", status:"work" }},
				{header:"Done", body:{ view:"kanbanlist", status:"done" }},
				{header:"Verified", body:{ view:"kanbanlist", status:"verified" }}
			]`
	},
	"Querybuilder": {icon:"wxi-search", id:"querybuilder", value:"Querybuilder", spacer:true,
		extra:`fields: [
				{ id:"fname", value:"First Name", type:"string" },
				{ id:"lname", value:"Last Name",  type:"string" },
				{ id:"age",  value:"Age", type:"number" },
				{ id:"bdate",  value:"Birth Date", type:"date" }
			]`
	},
	"DHX Scheduler": {icon:"wxi-calendar", id:"dhx-scheduler", value:"Schedule", method:"getScheduler", model:data.scheduler, dhx:true},
	"DHX Gantt": {icon:"wxi-calendar", id:"dhx-gantt", value:"Gantt", method:"getGantt", model:data.gantt, dhx:true},
};