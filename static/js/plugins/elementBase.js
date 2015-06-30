app.plugin('elementBase', function(){
	
	function ElementBase(){
		this.__GUID__ = koala._.md5();
	}

	ElementBase.__initializers__ = [
        function(opts) {
            extend(this, opts);
        }
    ];

    ElementBase.prototype.attr = function(){
    	if(arguments.length == 1){
    		return this[arguments[0]];
    	} else {
    		this.ele.setAttribute(arguments[0], arguments[1]);
    	}
	};

	ElementBase.prototype.toSVG = function(){
		var svg = ['<?xml version="1.0" encoding="utf-8"?>'];
		svg.push('<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">');
		svg.push('<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="128px" height="128px" viewBox="0 0 128 128">');
		svg.push(this.getTemplate());
		svg.push('</svg>');
		return svg.join('');
	};

	ElementBase.prototype.toImage = function(){
		var me = this;
		var img = new Image();
		img.src = "data:image/svg+xml;base64," + btoa(me.toSVG());
		return img;
	};

	ElementBase.derive = function(makeDefaultOpt, initialize, proto) {
		if (typeof initialize == 'object') {
            proto = initialize;
            initialize = null;
        }
        var _super = this;

        var propList;
        if (!(makeDefaultOpt instanceof Function)) {
            // Optimize the property iterate if it have been fixed
            propList = [];
            for (var propName in makeDefaultOpt) {
                if (makeDefaultOpt.hasOwnProperty(propName)) {
                    propList.push(propName);
                }
            }
        }

        var sub = function(options) {
            // call super constructor
            _super.apply(this, arguments);
            if (makeDefaultOpt instanceof Function) {
                // Invoke makeDefaultOpt each time if it is a function, So we can make sure each 
                // property in the object will not be shared by mutiple instances
                extend(this, makeDefaultOpt.call(this));
            } else {
                extendWithPropList(this, makeDefaultOpt, propList);
            }
            
            if (this.constructor === sub) {
                // Initialize function will be called in the order of inherit
                var initializers = sub.__initializers__;
                for (var i = 0; i < initializers.length; i++) {
                    initializers[i].apply(this, arguments);
                }
            }
        };
        // save super constructor
        sub.__super__ = _super;
        // Initialize function will be called after all the super constructor is called
        if (!_super.__initializers__) {
            sub.__initializers__ = [];
        } else {
            sub.__initializers__ = _super.__initializers__.slice();
        }
        if (initialize) {
            sub.__initializers__.push(initialize);
        }

        var Ctor = function() {};
        Ctor.prototype = _super.prototype;
        sub.prototype = new Ctor();
        sub.prototype.constructor = sub;
        extend(sub.prototype, proto);
        
        // extend the derive method as a static method;
        sub.derive = _super.derive;

        return sub;
	};

	function extend(target, source) {
        if (!source) {
            return;
        }
        for (var name in source) {
            if (source.hasOwnProperty(name)) {
                target[name] = source[name];
            }
        }
    }

    function extendWithPropList(target, source, propList) {
        for (var i = 0; i < propList.length; i++) {
            var propName = propList[i];
            target[propName] = source[propName];
        }   
    }
	
	return ElementBase;
});