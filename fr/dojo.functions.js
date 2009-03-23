var functions = {
	uno: function(){
		dojo.doc("page").insert('<div id="prueba"><ul class="pruebaUL"><li><a href="#">Nada</a></li><li>Nada</li><li><a href="#">Nada</a></li><li>Nada</li><li><a href="#">Nada</a></li><li>Nada</li><li><a href="#">Nada</a></li><li>Nada</li><li><a href="#">Nada</a></li><li>Nada</li><li><a href="#">Nada</a></li><li>Nada</li><li><a href="#">Nada</a></li><li>Nada</li><li><a href="#">Nada</a></li><li>Nada</li><li><a href="#">Nada</a></li><li>Nada</li><li><a href="#">Nada</a></li><li>Nada</li><li><a href="#">Nada</a></li><li>Nada</li><li><a href="#">Nada</a></li><li>Nada</li><li><a href="#">Nada</a></li><li>Nada</li><li><a href="#">Nada</a></li><li>Nada</li><li><a href="#">Nada</a></li><li>Nada</li><li><a href="#">Nada</a></li><li>Nada</li></ul></div>');
	},
	dos: function(){
		$$("#page li a").each(function(el){
					el.remove();
		});
	},
	tres: function(){
		$$("#page li").each(function(el){
			el.insert('<strong>Prueba</strong><a href="#">test</a>');
		});
	},
	cuatro: function(){
		$$("#page li").each(function(el){
			el.setStyle({"border": "1px red solid"});
		});
	},
	cinco: function(){
		$$("#page li").each(function(el){
			el.setStyle({
				"backgroundColor": "red",
				"color": "blue"
			});
		});
	},
	seis: function(){
		$$("#page li").each(function(el){
			el.setStyle({"border": "1px red solid"});
		});
	},
	siete: function(){
		$$("#page li").each(function(el){
			el.setStyle({
				"backgroundColor": "",
				"color": ""
			});
		});
	},
	ocho: function(){
		$$("#page li").each(function(el){
			el.writeAttribute("rel", "test");
		});
	},
	nueve: function(){
		$$("#page li").each(function(el){
			el.writeAttribute({
				"attr1": "1",
				"attr2": "2",
				"attr3": "3"
			});
		});
	},
	ocho: function(){
		$$("#page li").each(function(el){
			el.writeAttribute("rel", "");
		});
	},
	nueve: function(){
		$$("#page li").each(function(el){
			el.writeAttribute({
				"attr1": "",
				"attr2": "",
				"attr3": ""
			});
		});
	},
	diez: function(){
		$$("#page li").each(function(el){
			el.addClassName("prueba");
		});
	},
	once: function(){
		$$("#page li").each(function(el){
			el.hasClassName("prueba");
		});
	},
	doce: function(){
		$$("#page li").each(function(el){
			el.removeClassName("prueba");
		});
	},
	trece: function(){
		$$("#page li").each(function(el){
			el.observe("click", function(){});
		});
	},
	catorce: function(){
		$$("#page li").each(function(el){
			el.fire("click");
		});
	},
	quince: function(){
		$$("#page li").each(function(el){
			el.stopObserving("click", function(){});
		});
	}
}