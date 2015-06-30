app.plugin('dayList', 'plugins/listBase',  function(ListBase){
	
	function DayList(dom, data){
		this.dom = dom;
		this.initailize(data);
	}

	DayList.prototype.initailize = function(data){
		var me = this;

		var tpl = "<div class=\"day-item\">\n	<a href=\"#/show?id={{id}}\">\n		<div class=\"row content\">\n			<div class=\"col-12\">\n				{{content}}\n				<br>\n				<p class=\"date\">{{postTime|datetime}}</p>\n			</div>\n		</div>\n	</a>\n	<div class=\"row tool\">\n		<div class=\"col-6\">\n			<i class=\"icon-heart2\"></i>\n		</div>\n		<div class=\"col-4\">\n			<i class=\"icon-typing\"></i>\n		</div>\n	</div>\n</div>";
		var list = new ListBase(me.dom, tpl, data);


	};
	
	return DayList;
});