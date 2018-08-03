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
		{ "id": "video", "value": "Video", "type": "folder", "date":  "2014-02-10 16:12", "data":[
			{"id": "video1", "value": "New Year 2013.avi", "icon": "file-video-o", "type":"video", "date":  "2014-02-10 16:12", "size": "25030000", "pId": "video" },
			{"id": "video2", "value": "Presentation.avi", "icon": "file-video-o","type":"video", "date":  "2014-02-10 16:12", "size": "11072000" , "pId": "video"},
			{"id": "video3", "value": "Conference.avi", "icon": "file-video-o", "type":"video", "date":  "2014-02-10 16:12", "size": "31256000", "pId": "video" }
		]}
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