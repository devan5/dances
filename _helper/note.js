/*_______
with dances

	called: {name}

	version: {numberSign}

	firstDate: 2013.07.07

	lastDate: 2013.07.07

	require: [
		""
	],

	effect: [
		+. {effects},
		+. {effects}
	],

	log: {
		"v1.0": [
			+. {logs},
			+. {logs}
		]
	}

_______*/


/*~~~~~~~
jQuery CDN :
	<script type="text/javascript" src="http://ajax.googleapis.com/ajax/libs/jquery/1.4.4/jquery.min.js"></script>
	<script type="text/javascript" src="http://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js"></script>
~~~~~~~*/

// console.log() 方法 兼容IE6
if (!window.console) {
	window.console = {};
	window.console.log = window.alert;
}

// console.log() 静默
if (!window.console) {
	window.console = {};
	window.$log = window.console.log = window.Boolean;
}

// 命名扩展
if ("function" !== typeof window.dances &&  "object" !== typeof window.dances){
	window.dances = {};

	dances.$eval = function(){
		return eval.apply(null, arguments);
	};

	// $log
	window._log = window.$log = (function(){
		var
			$log,
			$$log,
			logRepo = {}
		;

		$log = Boolean;

		if(window.console && window.console.log){
			$log = console.log;

			try{
				$log("_____" + (new Date).toString() + "_____");

			}catch(e){
				$log = null;
			}

			$log || ($log = function(){ console.log.apply(console, arguments); }) && $log("_____" + (new Date).toString() + "_____");

			$$log = function(msg, method){
				method = method || "log";

				logRepo[method] || (logRepo[method] = console[method] ? console[method] : console.log);

				"function" === typeof console[method] ?
					logRepo[method].call(console, msg) :
					logRepo[method](msg)
				;

			};

			window.$$log || (window.$$log = $$log);
			window.__log || (window.__log = $$log);

		}

		return $log;
	})();
}

// .add("../../%23dances%23/dances_pre1.0.js")
