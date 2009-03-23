var functions = {
	uno: function(){
		$("#page").html('<div id="prueba"><ul class="pruebaUL"><li><a href="#">Nada</a></li><li>Nada</li><li><a href="#">Nada</a></li><li>Nada</li><li><a href="#">Nada</a></li><li>Nada</li><li><a href="#">Nada</a></li><li>Nada</li><li><a href="#">Nada</a></li><li>Nada</li><li><a href="#">Nada</a></li><li>Nada</li><li><a href="#">Nada</a></li><li>Nada</li><li><a href="#">Nada</a></li><li>Nada</li><li><a href="#">Nada</a></li><li>Nada</li><li><a href="#">Nada</a></li><li>Nada</li><li><a href="#">Nada</a></li><li>Nada</li><li><a href="#">Nada</a></li><li>Nada</li><li><a href="#">Nada</a></li><li>Nada</li><li><a href="#">Nada</a></li><li>Nada</li><li><a href="#">Nada</a></li><li>Nada</li><li><a href="#">Nada</a></li><li>Nada</li></ul></div>');
	},
	dos: function(){
		$("#page a").remove();
	},
	tres: function(){
		$("#page li").html('<strong>Prueba</strong><a href="#">test</a>');
	},
	cuatro: function(){
		$("#page li").css("border", "1px red solid");
	},
	cinco: function(){
		$("#page li").css({
			"backgroundColor": "red",
			"color": "blue"
		});
	},
	seis: function(){
			$("#page li").css("border","none");
	},
	siete: function(){
		$("#page li").css({
			"backgroundColor": "",
			"color": ""
		});
	},
	ocho: function(){
		$("#page li").attr("rel", "test");
	},
	nueve: function(){
		$("#page li").attr({
			"attr1": "1",
			"attr2": "2",
			"attr3": "3"
		});
	},
	diez: function(){
		$("#page li").attr("rel", "");
	},
	once: function(){
		$("#page li").attr({
			"attr1": "",
			"attr2": "",
			"attr3": ""
		});
	},
	doce: function(){
		$("#page li").addClass("prueba");
	},
	trece: function(){
		$("#page li").hasClass("prueba");
	},
	catorce: function(){
		$("#page li").removeClass("prueba");
	},
	quince: function(){
		$("#page a").bind("click", function(){},false);
	},
	dieziseis: function(){
		$("#page a").click();
	},
	diezisiete: function(){
		$("#page a").unbind("click", function(){},false);
	},
	dieziocho: function(){
		$("#page a").each(function(el){
			$(el).parent().css("border","1px red solid");
		});
	}
}