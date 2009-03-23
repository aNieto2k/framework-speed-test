var functions = {
	uno: function() {
		js2k.get("#page").item(0).insert('<div id="prueba"><ul class="pruebaUL"><li><a href="#">Nada</a></li><li>Nada</li><li><a href="#">Nada</a></li><li>Nada</li><li><a href="#">Nada</a></li><li>Nada</li><li><a href="#">Nada</a></li><li>Nada</li><li><a href="#">Nada</a></li><li>Nada</li><li><a href="#">Nada</a></li><li>Nada</li><li><a href="#">Nada</a></li><li>Nada</li><li><a href="#">Nada</a></li><li>Nada</li><li><a href="#">Nada</a></li><li>Nada</li><li><a href="#">Nada</a></li><li>Nada</li><li><a href="#">Nada</a></li><li>Nada</li><li><a href="#">Nada</a></li><li>Nada</li><li><a href="#">Nada</a></li><li>Nada</li><li><a href="#">Nada</a></li><li>Nada</li><li><a href="#">Nada</a></li><li>Nada</li><li><a href="#">Nada</a></li><li>Nada</li></ul></div>');
	},
	dos: function() {
		js2k.get('#page li a').each(function(el) {
			el.remove();
		});
	},
	tres: function() {
		$('page').getElements('li').each(function(el) {
			el.set({
				html : '<strong>Prueba</strong><a href="#">test</a>'
			});
		});
	},
	cuatro: function() {
		$('page').getElements('li').each(function(el) {
			el.setStyle('border', '1px red solid');
		});
	},
	cinco : function() {
		$('page').getElements('li').each(function(el) {
			el.setStyles({
				"backgroundColor": "red",
				"color": "blue"
			});
		});
	},
	seis: function() {
		$('page').getElements('li').each(function(el) {
			el.setStyle("border","none");
		});
	},
	siete: function() {
		$('page').getElements('li').each(function(el) {
			el.setStyles({
				"backgroundColor": "",
				"color": ""
			});
		});
	},
	ocho: function() {
		$('page').getElements('li').each(function(el) {
			el.setProperty("rel", "test");
		});
	},
	nueve: function() {
		$('page').getElements('li').each(function(el) {
			el.setProperties({
				"attr1": "1",
				"attr2": "2",
				"attr3": "3"
			});
		});
	},
	diez: function() {
		$('page').getElements('li').each(function(el) {
			el.setProperty("rel", "");
		});
	},
	once: function() {
		$('page').getElements('li').each(function(el) {
			el.setProperties({
				"attr1": "",
				"attr2": "",
				"attr3": ""
			});
		});
	},
	doce: function() {
		$('page').getElements('li').each(function(el) {
			el.addClass('prueba');
		});
	},
	trece: function() {
		$('page').getElements('li').each(function(el) {
			el.hasClass("prueba");
		});
	},
	catorce: function() {
		$('page').getElements('li').each(function(el) {
			el.removeClass("prueba");
		});
	},
	quince: function() {
		$('page').getElements('li').each(function(el) {
			el.getElements('a').each(function(a) {
					a.set({
						'events' : {
							'click' : function() {}
						}
					});
				});
			});
	},
	dieziseis: function() {
		$('page').getElements('li').each(function(el) {
			el.getElements('a').each(function(a) {
				a.fireEvent('click');
			});
		});
	},
	diezisiete: function() {
		$('page').getElements('li').each(function(el) {
			el.getElements('a').each(function(a) {
				a.removeEvent('click');
			});
		});
	}
}