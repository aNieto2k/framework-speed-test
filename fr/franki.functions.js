var functions = {
	uno: function(){
		franki.get("#page").insert('<div id="prueba"><ul class="pruebaUL"><li><a href="#">Nada</a></li><li>Nada</li><li><a href="#">Nada</a></li><li>Nada</li><li><a href="#">Nada</a></li><li>Nada</li><li><a href="#">Nada</a></li><li>Nada</li><li><a href="#">Nada</a></li><li>Nada</li><li><a href="#">Nada</a></li><li>Nada</li><li><a href="#">Nada</a></li><li>Nada</li><li><a href="#">Nada</a></li><li>Nada</li><li><a href="#">Nada</a></li><li>Nada</li><li><a href="#">Nada</a></li><li>Nada</li><li><a href="#">Nada</a></li><li>Nada</li><li><a href="#">Nada</a></li><li>Nada</li><li><a href="#">Nada</a></li><li>Nada</li><li><a href="#">Nada</a></li><li>Nada</li><li><a href="#">Nada</a></li><li>Nada</li><li><a href="#">Nada</a></li><li>Nada</li></ul></div>');
	},
	dos: function(){
		franki.get("#page li a").remove();
	},
	tres: function(){
		franki.get("#page li").each(function(el){
			el.innerHTML = '<strong>Prueba</strong><a href="#">test</a>';
		});
	},
	cuatro: function(){
		franki.get("#page li").css("border", "1px red solid");
	},
	cinco: function(){
		franki.get("#page li").css({
			"backgroundColor": "red",
			"color": "blue"
		});
	},
	seis: function(){
			franki.get("#page li").css("border","none");
	},
	siete: function(){
		franki.get("#page li").css({
			"backgroundColor": "",
			"color": ""
		});
	},
	ocho: function(){
		franki.get("#page li").attr("rel", "test");
	},
	nueve: function(){
		franki.get("#page li").attr({
			"attr1": "1",
			"attr2": "2",
			"attr3": "3"
		});
	},
	diez: function(){
		franki.get("#page li").attr("rel", "");
	},
	once: function(){
		franki.get("#page li").attr({
			"attr1": "",
			"attr2": "",
			"attr3": ""
		});
	},
	doce: function(){
		franki.get("#page li").addClass("prueba");
	},
	trece: function(){
		franki.get("#page li").hasClass("prueba");
	},
	catorce: function(){
		franki.get("#page li").removeClass("prueba");
	},
	quince: function(){
		franki.get("#page li a").addEvent("click", function(){},false);
	},
	dieziseis: function(){
		franki.get("#page li a").fireEvent("click");
	},
	diezisiete: function(){
		franki.get("#page li a").removeEvent("click", function(){},false);
	}
}