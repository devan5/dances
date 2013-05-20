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

// 预加一系列载图片 + 回调
// syntax: fPreLoadImg(src1[, src2], [callback])
fPreLoadImg = function(){
	var
		args = Array.prototype.slice.call(arguments, 0),
		callback = args.pop(),

		item,
		imgEl,

		firstImgEl,
		firstSrc,

		nextImgEl,
		nextSrc
	;

	if("function" !== typeof callback){
		args.push(callback);
		callback = null;
	}

	for(var i = 0, len = args.length; i < len; i++){
		item = args[i];

		if("string" === typeof item){

			if(!firstImgEl){
				firstImgEl = imgEl = document.createElement("img");
				imgEl.style.display = "none";
				firstSrc = item;
			}

			nextSrc = args[i + 1];

			if("string" === typeof nextSrc){
				nextImgEl = document.createElement("img");
				nextImgEl.style.display = "none";

				imgEl.onload = (function(El, src){
					return function(){
						El.src = src;
					}
				})(nextImgEl, nextSrc);

			}else{

				imgEl.onload = function(){
					callback && callback();

					(!dances.uAgent.msie || dances.uAgent.msie > 6) && document.body.removeChild(firstImgEl);
				};

				break;
			}

			imgEl = nextImgEl;
		}

	}

	firstImgEl.src = firstSrc;
	document.body.appendChild(firstImgEl);

};

fValidArgs = function(conf, requireType, defaultConf){
	var fType = dances.type
	;

	for(var prop in requireType){
		// 可配置参数
		if(requireType.hasOwnProperty(prop)){

			// 不符合的必须配置参数
			if(!conf.hasOwnProperty(prop) || requireType[prop].indexOf(fType(conf[prop])) === -1){
				// 必须配置参数 有推荐值
				if(defaultConf.hasOwnProperty(prop)){
					conf[prop] = defaultConf[prop];

					// 必须配置参数 没有推荐值
				}else{
					conf[prop] = null;
				}
			}
		}
	}

	return conf;
};

// 重复输出
function dynWrite(str, num){
	document.write(new Array((isNaN(parseInt(num, 10)) ? 0 : num) + 1).join(str));
}

