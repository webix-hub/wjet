const c = require("../common");

module.exports = function(res, message){

	c.addView("views/spreadsheet.js",`
		webix.require("//cdn.webix.com/site/spreadsheet/spreadsheet.css");
		return webix.require("//cdn.webix.com/site/spreadsheet/spreadsheet.js").then(() => {
			return {
				view:"spreadsheet",
				toolbar:"full"
			};
		});`, ``);
	c.addMarker("views/top.js", "Menu", "{ value:\"Spreadsheet\", id:\"spreadsheet\", icon:\"table\" },");

}