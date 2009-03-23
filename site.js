/*
		Temporizador
		
		Author: Andrés Nieto
		Fecha:  13-Mar-2009
*/
var Timer = new Klass({
	init: function(){
		this.time = new Date().getTime();
	}, 
	stop: function(){
		return (new Date().getTime() - this.time);
	}
});

var Test = new Klass({
		init: function(name){
			this.name = name;
			this.functions = window.frames[name].functions;
			this.execTest = window.frames[name].test
			this.totalTime = 0;
			this.file = window.frames[name].fileInfo;
		},
		start: function(){
			for (var x in this.functions){
				var fn = this.functions[x];
				var results =  this.execTest(fn);
				this.totalTime = this.totalTime + results.time;
				this.paintResults(x, results.time);
			}
			this.paintResults("total", this.totalTime);
		},
		paintResults: function(name, time){
			var td = document.getElementById("_"+this.name + "_" + name);
			if (!td) return;
			td.innerHTML = time + 'ms.';
			td.className=name;
			td.speed = time;
		}
});

/*
var jQuery = new Test("jquery");
jQuery.start();
*/