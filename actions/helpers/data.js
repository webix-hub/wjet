const gantt = `{
	"data": [{
		"id": 1,
		"start_date": new Date(),
		"duration": 5,
		"text": "Project #1",
		"progress": 0.8,
		"sortorder": 20,
		"parent": 0,
		"open": true
	}]
};`;

const scheduler = `[
	{ id:1, text:"my task", start_date:new Date(), end_date:new Date(new Date().getTime() + 24 * 60 * 60 * 1000) }
]`;

const filemanager = `[
	{"id": "files", "value": "Files", "open": 1,  "type": "folder", "date":  "2014-02-10 16:10", "data":[
		{"id": "presentations", "value": "Presentations", "type": "folder", "date":  "2014-02-10 16:10", "data":[
			{"id": "pres2", "value": "June 2014.ppt",  "type":"pp", "date":  "2014-02-10 16:10", "size": "20100"},
			{"id": "pres3", "value": "April 2014.ppt", "type":"pp", "date":  "2014-02-10 16:10", "size": "15750"}
		]},
		{"id": "pres1", "value": "October 2014.ppt", "type":"pp", "date": "2014-02-10 16:10", "size": "12830"},
	]}
]`;

const kanban = `[
	{ "id":1, "status":"work", "text":"Task 1", "tags":"webix,docs", "comments":[{"text":"Comment 1"}, {"text":"Comment 2"}] },
]`;

const pivot = `[
	{"name": "Argentina", "year": 2005, "continent": "South America", "form": "Republic", "gdp": 181.357, "oil": 1.545, "balance": 4.699},
	{"name": "Argentina", "year": 2006, "continent": "South America", "form": "Republic", "gdp": 212.507, "oil": 1.732, "balance": 7.167}
]`;

const spreadsheet = `{
	"data": [
		[1,1,"1",""],
		[1,2,"2",""],
		[1,3,"=A1+B1",""],
	]
}`;

module.exports = {
	gantt,
	scheduler,
	filemanager,
	kanban,
	pivot,
	spreadsheet
}