var functions = {
	uno: function(){
		$("page").update('<div id="prueba"><ul class="pruebaUL"><li><a href="#">Nada</a></li><li>Nada</li><li><a href="#">Nada</a></li><li>Nada</li><li><a href="#">Nada</a></li><li>Nada</li><li><a href="#">Nada</a></li><li>Nada</li><li><a href="#">Nada</a></li><li>Nada</li><li><a href="#">Nada</a></li><li>Nada</li><li><a href="#">Nada</a></li><li>Nada</li><li><a href="#">Nada</a></li><li>Nada</li><li><a href="#">Nada</a></li><li>Nada</li><li><a href="#">Nada</a></li><li>Nada</li><li><a href="#">Nada</a></li><li>Nada</li><li><a href="#">Nada</a></li><li>Nada</li><li><a href="#">Nada</a></li><li>Nada</li><li><a href="#">Nada</a></li><li>Nada</li><li><a href="#">Nada</a></li><li>Nada</li><li><a href="#">Nada</a></li><li>Nada</li></ul></div>');
	},
	dos: function(){
		$$("#page li a").each(function(el){
					el.remove();
		});
	},
	tres: function(){
		$$("#page li").each(function(el){
			el.update('<strong>Prueba</strong><a href="#">test</a>');
		});
	},
	cuatro: function(){
		$$("#page li").each(function(el){
			el.setStyle({border: "1px red solid"});
		});
	},
	cinco: function(){
		$$("#page li").each(function(el){
			el.setStyle({
				backgroundColor: "red",
				color: "blue"
			});
		});
	},
	seis: function(){
		$$("#page li").each(function(el){
			el.setStyle({border: ""});
		});
	},
	siete: function(){
		$$("#page li").each(function(el){
			el.setStyle({
				backgroundColor: "",
				color: ""
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
	diez: function(){
		$$("#page li").each(function(el){
			el.writeAttribute("rel", "");
		});
	},
	once: function(){
		$$("#page li").each(function(el){
			el.writeAttribute({
				"attr1": "",
				"attr2": "",
				"attr3": ""
			});
		});
	},
	doce: function(){
		$$("#page li").each(function(el){
			el.addClassName("prueba");
		});
	},
	trece: function(){
		$$("#page li").each(function(el){
			el.hasClassName("prueba");
		});
	},
	catorce: function(){
		$$("#page li").each(function(el){
			el.removeClassName("prueba");
		});
	},
	quince: function(){
		$$("#page li").each(function(el){
			el.observe("click", function(){});
		});
	},
	dieziseis: function(){
		$$("#page li").each(function(el){
			el.fire("click");
		});
	},
	diezisiete: function(){
		$$("#page li").each(function(el){
			el.stopObserving("click", function(){});
		});
	},
	dieziocho: function(){
		$$("#page a").each(function(el){
			el.up().setStyle("border","1px red solid");
		});
	}
}