app.plugin('today', function(){
	
	function Today(dom){
		this.dom = dom;
		this.initailize();
	}

	Today.prototype.initailize = function(){
		var tpl = "<div class=\"koala-plugin-today\">\n	<span class=\"month\"></span>\n	<span class=\"day\"></span>\n</div>";
		this.dom.html(tpl);

		var d = new Date();
		var mon = d.getMonth()+1;
    	var day = d.getDate();

    	this.dom.find('.month').text(mon);
    	this.dom.find('.day').text(day);
	};
	
	return Today;
});