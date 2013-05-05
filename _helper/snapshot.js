// 原型 继承
create = Object.create || (function(){

	var Foo = function(){ };

	return function(){

		if(arguments.length > 1){
			throw new Error('Object.create implementation only accepts the first parameter.');
		}

		var proto = arguments[0],
			type = typeof proto
			;

		if(!proto || ("object" !== type && "function" !== type)){
			throw new TypeError('TypeError: ' + proto + ' is not an object or null');
		}

		Foo.prototype = proto;

		return new Foo();
	}
})();

// 反柯里化
uc =function(fn){
	return function(){
		return Function.prototype.call.apply(fn, arguments);
	}
};

// 异步脚本 加载成功回调
fnBindReady = undefined === document.createElement("script").onload ?
	function(elem, fLoaded, scope){
		var
			fPreLoaded = "function" === typeof elem.onreadystatechange ?
			elem.onreadystatechange :
			false
		;

		if("function" === typeof fLoaded){
			elem.onreadystatechange = function(){
				if("loaded" === elem.readyState || "complete" === elem.readyState){
					if(fPreLoaded){
						fPreLoaded.call(scope);

						// gc
						fPreLoaded = null;
					}
					fLoaded.call(scope);

					// gc
					elem.onreadystatechange = null;
					scope = elem = fLoaded = null;
				}
			};
		}
	} :

	function(elem, fLoaded, scope){
		var
			fPreLoaded = "function" === typeof elem.onload ?
			elem.onload :
			false
		;

		if("function" === typeof fLoaded){
			elem.onload = function(){
				if(fPreLoaded){
					fPreLoaded.call(scope);

					//gc
					fPreLoaded = null;
				}
				fLoaded.call(scope);

				// gc
				elem.onload = null;
				scope = elem = fLoaded = null;
			};
		}
	}
;