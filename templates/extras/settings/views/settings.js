define([],function(){

	var views = [
		{ value:"Personal", 	id:"personal",	href:"#!/app/settings/personal", 	icon:"home" },			
	];

	var menu = {
		view:"tabbar", id:"settings:menu",
		options:views, optionWidth:150,
		click:function(id){
			this.$scope.show("./"+this.getValue())
		}
	};

	var ui = {
		rows:[
			menu,
			{ $subview:true }
		]
	};

	return {
		$ui: ui,
		$menu: "settings:menu"
	};
});