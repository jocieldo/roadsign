app.plugin('listBase', function(){
	var scope = this;

	function ListBase(dom, tpl, data){
		this.dom = dom;
		this.initailize(tpl, data);
	}

	ListBase.prototype.initailize = function(tpl, data){
		var me = this;
		var li = [];

		data.forEach(function(item, index){
			li.push(koala._.render(tpl, item, scope));
		});

		this.dom.html(li.join(''));
	};
	
	return ListBase;
});