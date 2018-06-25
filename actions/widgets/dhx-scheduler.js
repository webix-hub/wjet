const c = require("../common");

module.exports = function(res, message){


	c.addPackage("@wbx/view-dhx-scheduler");
	c.addModel("models/events.js", "plain", `[
	{
		id:1, text:"The Shawshank Redemption",
		start_date:"05/2/2018", end_date:"05/5/2018" },
	{
		id:2, text:"The Godfather",
		start_date:"05/4/2018", end_date:"05/7/2018" },
	{
		id:3, text:"The Godfather: Part II",
		start_date:"05/6/2018", end_date:"05/7/2018" },
	{
		id:4, text:"The Good, the Bad and the Ugly",
		start_date:"05/8/2018", end_date:"05/11/2018" },
	{
		id:5, text:"My Fair Lady",
		start_date:"05/12/2018", end_date:"05/14/2018" },
	{
		id:6, text:"12 Angry Men",
		start_date:"05/16/2018", end_date:"05/22/2018" }
]`);

	c.addView("views/dhx-scheduler.js",`
		return {
			view:"dhx-scheduler",
			mode:"month",
			date:"05/16/2018"
		};
			`, `
		view.getScheduler(true).then(sch => {
			sch.clearAll();
			sch.parse(data, "json");
		});
			`);
	c.addImport("views/dhx-scheduler.js", "", "@wbx/view-dhx-scheduler");
	c.addImport("views/dhx-scheduler.js", "{data}", "models/events");
	c.addMarker("views/top.js", "Menu", "{ value:\"Schedule\", id:\"dhx-scheduler\", icon:\"bus\" },");

}