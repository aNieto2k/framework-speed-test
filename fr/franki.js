			/*
		*	Controlamos los cambios en el DOM y reiniciamos la caché.
		if ( document.addEventListener && !document.querySelectorAll ) {
		  franki.cache = {};
	  	function cleanCache(){ alert("Cambios");franki.cache = {}; }
	  	["DOMAttrModified", "DOMNodeInserted", "DOMNodeRemoved"].each(function(el){document.addEventListener(el, cleanCache, false);});
		}
*/
var franki = (function(){
    /*
     *  Métodos que extenderán los arrays
     **/
    var MetodosExtedidoArray = ["css", "attr", "addClass", "removeClass", "hasClass", "addEvent", "removeEvent", "insert", "remove"];
    /*
     *  trim()
     *
     *  Desc:
     *    No elimina los espacios a derecha e izquierda de un string.
     **/
    String.prototype.trim = function() {return this.replace(/^[\s]+|[\s]+$/g, '');}

    /*
     *  each()
     *
     *  Desc:
     *    Nos permite iterar un array/objeto ejecutando una funcionalidad por
     *    cada uno de sus items.
     **/
    Array.prototype.each = function(fun){
      if (typeof fun != "function") throw new TypeError();
      for (var i = 0; i < this.length; i++) {
        if (i in this) fun.call(arguments[1], this[i], i)
      }
      return this;
     };
    /*
     *  get()
     *
     *  Desc:
     *    Nos devuelve (si existe) el elemento de la posición X.
     **/

			Array.prototype.item = function(x) {return this[x] || this;}
    /*
     *  each()
     *
     *  Desc:
     *    Específico para Objetos. Nos permite iterar un array/objeto ejecutando una funcionalidad por
     *    cada uno de sus items.
     **/
    Object.prototype.each = function(fun){
      if (typeof fun != "function") throw new TypeError();
      for (var i in this) {
        if (i !== 'each') fun.call(arguments[1], this[i], i);
      }
      return this;
     };
/*
 *  get();
 *
 *  Desc:
 *    Función adaptada de document.querySelector() de Simon Willson
 *    http://simonwillison.net/2003/Mar/25/getElementsBySelector/
 **/
var get = function(selector, cache) {
	  var selector = selector || document;
	  var cache = cache || false;
	  var context = (this == franki)?document:this;
	  if (cache && franki.cache[selector]) return franki.cache[selector];
	  var items = find(selector, context);
		if (cache) franki.cache[selector] = items;
  	return items;
}

var find = function(selector, context) {
	if (typeof context != "object") context = franki.get(context);
	if (typeof selector == "object") return franki.extend(selector, metodosExtendidos);
  if (document.querySelectorAll) return this.querySelectorAll(selector);
  var getAllChildren = function(e){ return e.all ? e.all : e.getElementsByTagName('*')};
  if (!document.getElementsByTagName) { return new Array();}
  var tokens = selector.split(' ');
  var currentContext = new Array(context);
  for (var i = 0; i < tokens.length; i++) {
    token = tokens[i].replace(/^\s+/,'').replace(/\s+$/,'');;
    if (token.indexOf('#') > -1) {
      var bits = token.split('#');
      var tagName = bits[0];
      var id = bits[1];
      var element = document.getElementById(id);
      if (tagName && element.nodeName.toLowerCase() != tagName) {return new Array();}
      currentContext = new Array(element);
      continue;
    }
    if (token.indexOf('.') > -1) {
      var bits = token.split('.');
      var tagName = bits[0];
      var className = bits[1];
      if (!tagName) {
        tagName = '*';
      }
      var found = new Array;
      var foundCount = 0;
      for (var h = 0; h < currentContext.length; h++) {
        var elements;
        if (tagName == '*') {elements = getAllChildren(currentContext[h]);}
        else {elements = currentContext[h].getElementsByTagName(tagName);}
        for (var j = 0; j < elements.length; j++) {
          found[foundCount++] = elements[j];
        }
      }
      currentContext = new Array;
      var currentContextIndex = 0;
      for (var k = 0; k < found.length; k++) {
        if (found[k].className && found[k].className.match(new RegExp('\\b'+className+'\\b'))) {
          currentContext[currentContextIndex++] = found[k];
        }
      }
      continue;
    }
    if (token.match(/^(\w*)\[(\w+)([=~\|\^\$\*]?)=?"?([^\]"]*)"?\]$/)) {
      var tagName = RegExp.$1;
      var attrName = RegExp.$2;
      var attrOperator = RegExp.$3;
      var attrValue = RegExp.$4;
      if (!tagName) { tagName = '*';}
      var found = new Array;
      var foundCount = 0;
      for (var h = 0; h < currentContext.length; h++) {
        var elements;
        if (tagName == '*') { elements = getAllChildren(currentContext[h]);}
        else { elements = currentContext[h].getElementsByTagName(tagName);}
        for (var j = 0; j < elements.length; j++) {found[foundCount++] = elements[j];}
      }
      currentContext = new Array;
      var currentContextIndex = 0;
      var checkFunction;
      switch (attrOperator) {
        case '=': checkFunction = function(e) { return (e.getAttribute(attrName) == attrValue); };break;
        case '~': checkFunction = function(e) { return (e.getAttribute(attrName).match(new RegExp('\\b'+attrValue+'\\b'))); };break;
        case '|': checkFunction = function(e) { return (e.getAttribute(attrName).match(new RegExp('^'+attrValue+'-?'))); };break;
        case '^': checkFunction = function(e) { return (e.getAttribute(attrName).indexOf(attrValue) == 0); };break;
        case '$': checkFunction = function(e) { return (e.getAttribute(attrName).lastIndexOf(attrValue) == e.getAttribute(attrName).length - attrValue.length); };break;
        case '*': checkFunction = function(e) { return (e.getAttribute(attrName).indexOf(attrValue) > -1); };break;
        default : checkFunction = function(e) { return e.getAttribute(attrName); };
      }
      currentContext = new Array;
      var currentContextIndex = 0;
      for (var k = 0; k < found.length; k++) {
        if (checkFunction(found[k])) {currentContext[currentContextIndex++] = found[k];}
      }
      continue;
    }
    tagName = token;
    var found = new Array;
    var foundCount = 0;
    for (var h = 0; h < currentContext.length; h++) {
      var elements = currentContext[h].getElementsByTagName(tagName);
      for (var j = 0; j < elements.length; j++) { found[foundCount++] = elements[j];}
    }
    currentContext = found;
  }
  MetodosExtedidoArray.each(function(func){
      currentContext[func] = function(){
         var args = arguments;
         return currentContext.each(function(el){ el[func].apply(el, args);});
      };
  });
	currentContext.each(function(el){franki.extend(el, metodosExtendidos)});
  // cssRules
  // http://catcode.com/dominfo/getstyle2.html
  currentContext.cssRules = (function(){
       var sheetList = document.styleSheets;
       var ruleList;
       var i, j;
       for (i=sheetList.length-1; i >= 0; i--) {
           ruleList = sheetList[i].cssRules;
           for (j=0; j<ruleList.length; j++) {
               if (ruleList[j].type == CSSRule.STYLE_RULE &&
                   ruleList[j].selectorText == selector){
                   return ruleList[j].style;
               }
           }
       }
       return null;
  })(selector)
	if (currentContext.length == 1) return currentContext[0];
  return currentContext;
};

/*
* metodosExtendidos
*
* Desc:
*   Métodos con los que extendemos los objetos devueltos por franki.
*/

var metodosExtendidos = {
	get: get,
	find: find,
  parent: function(){
    if (!this.parentNode) return this;
    if (arguments.length == 0) {
        return franki.get(this.parentNode);
    } else {
    if (this.parentNode.tagName == (arguments[0]).toUpperCase())
        return franki.get(this.parentNode);
    else
        franki.get(this.parentNode).parent(arguments[0]);
    }
	},
	extend: function(opt){
      for (var name in opt) this[name] = opt[name];
      return this;
  },
  insert: function(what) {
      if (typeof what == "string") what = franki.toDOM(what);
      return this.appendChild(what);
  },
  insertText: function(text) {
      return this.innerHTML = text;
  },
  remove: function(){
          if(!this.parentNode) return this;
          this.parentNode.removeChild(this);
          return franki;
  },
  replace: function(node){
          if(!this.parentNode) return this;
          this.parentNode.insertBefore(node,this);
          this.remove();
          return this;
  },
  wrap: function(node){
          node = franki.get(node);
          this.replace(node);
          node.insert(this);
          return node;
  },
  css: function() {
                   if (arguments.length == 0) {
                                  return this.style;
                    } else if (arguments.length == 1) {
                      var a = arguments[0];
                      if (typeof a == 'string') {return this.style[a];}
                      else {for (var p in a) this.style[p] = a[p];}
                          }else {
                     for(var i = 0, l = arguments.length;i<l;) {
                        this.style[arguments[i++]] = arguments[i++]
                     }
                   }
                  return this;
  },
  attr: function(name, value) {
      if (typeof name == 'object') {
          for (var x in name) this.attr(x, name[x]);
          return this;
      }
      if (!value) return this.getAttribute(name);
      this.setAttribute(name, value);
      return this;
  },
  addClass: function(cl){
     if (!this.getAttribute) return false;
     if(this.hasClass(cl)) return this;
     var classes = this.getAttribute('class');
     if(classes==null) this.setAttribute('class',cl);
     else this.setAttribute('class',classes+" "+cl);
     return this;
  },
  removeClass: function(cl){
     if (!this.getAttribute) return false;
     var classes = this.getAttribute('class');
     if(classes==null) return this;
     var arrClasses=classes.split(" ");
     for(var i=0;i<arrClasses.length;i++){
      if(arrClasses[i]==cl){
        arrClasses.splice(i,1);
        break;
      }
     }
     this.setAttribute('class',arrClasses.join(" "));
     return this;
  },
  hasClass: function(cl){
     if (!this.getAttribute) return false;
     var classes=this.getAttribute('class');
     if(classes==null) return false;
     var arrClasses=classes.split(" ");
     for(var i=0;i<arrClasses.length;i++)
        if(arrClasses[i]==cl) return true;
     return false;
  },
  addEvent: function(type, fn ) {
      if ( this.addEventListener ) {
          this.addEventListener( type, fn, false );
      } else if(this.attachEvent){
          var _this=this;
          var f= function(){fn.call(_this,window.event);}
          this.attachEvent( 'on'+type, f);
          this[fn.toString()+type]=f;
      }else{
          this['on'+type]=fn;
      }
      return this;
  },
  removeEvent: function(type, fn ) {
      if( this.removeEventListener){
              this.removeEventListener( type, fn, false );
      }else if(this.detachEvent){
              this.detachEvent('on'+type,this[fn.toString()+type]);
              this[fn.toString()+type]=null;
      }else{
      this['on'+type]=function(){};
      }
      return this;
  },
fireEvent: function(type){
		var evt;
		if (document.createEvent) {
			evt = document.createEvent("HTMLEvents");
			evt.initEvent("dataavailable", true, true);
		} else {
	        evt = document.createEventObject();
	        evt.eventType = "ondataavailable";
		}
		evt.eventName = type;
		if (document.createEvent) {
	        this.dispatchEvent(evt);
	     } else {
	        this.fireEvent(evt.eventType, evt);
	     }
		return evt;
	}
};

/*
* Franki!
*
* Desc:
*   Metodos de franki.
*/
return {
			cache: {},
  	  get: get,
  	  find: find,
      extend: function(el, opt){
        var opt = opt || metodosExtendidos;
      	if (typeof el.get != 'undefined') return el;
        for (var name in opt) el[name] = opt[name];
        return el;
      },
      create: function ( args ) {
          // http://spudly.shuoink.com/2008/02/20/using-the-xml-dom-without-writing-150000-lines-of-code/
         var el;
         if( typeof(args) == "string" ) {
            el = document.createTextNode(args);
         } else if ( typeof(args) == "object" ) {
          el = franki.extend(document.createElement( args.tag ),metodosExtendidos);
           if ( args.attr ) {
              for ( i in args.attr ) el.attr(i, args.attr[i]);
           }
           if ( args.style ) {
              for ( i in args.style ) el.css(style[i],args.style[i]);
           }
           if ( args.children ) {
              for ( var i = 0; i < args.children.length; i++ ) {
                 el.insert( franki.create( args.children[i] ) );
              }
           }
        }
        return el;
      },
      argumentsToArray: function(args){
          if ( args instanceof Array ) return args;
          if ( args instanceof String ) return [args];
          if ( args.length != undefined && args.length != null ) {
              var r = [];
              for ( var i = 0; i< args.length; i++ ) r.push( args[i] );
              return r;
          }
          return [args];
      },
      toDOM: function(html){
			 	var returnElements = [];
				var div = document.createElement('div');
				div.innerHTML = html;
				var nodes = div.childNodes;
				nodes.each(function(el){returnElements.push(franki.extend(el,metodosExtendidos));});
				return returnElements[0];
      },
      extendEl: function(name, func, eArray) {
        metodosExtendidos[name] = func;
        if (eArray)
             MetodosExtedidoArray.push(name);
      },
      addMethod: function(name, func){
          this[name] = func;
      },
      ImportCSS: function() {
	var nbr_att = arguments.length;
	var css_style = franki.create({
              tag: 'link',
              attributes: {
                  rel: 'stylesheet',
                  type: 'text/css',
                  href: arguments[0],
                  media: "screen"
              }
          });
	if(nbr_att>1){
		for (var i = 1; i<nbr_att; i++){
			css_style.attr(arguments[i][0], arguments[i][1]);
		}
	}
	franki.get("head").get(0).insert(css_style);
      },
      ImportJS: function () {
	var nbr_att = arguments.length;
	var js_effets = franki.create({
              tag: 'script',
              attributes: {
                  type: 'text/javascript',
                  src: arguments[0]
              }
          });
	if(nbr_att>1){
		for (var i = 1; i<nbr_att; i++){
			js_effets.attr(arguments[i][0], arguments[i][1]);
		}
	}
	franki.get("head").get(0).insert(js_effets);
      }
    };
}());