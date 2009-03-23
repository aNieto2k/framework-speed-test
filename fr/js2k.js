/*
Document: js2k.js
Created on: 03-dic-2008, 11:08:16
Version: 0.1
Author: Andrés Nieto Porras
Description: Core de JS2K, funciones necesarias y básicas para unir todas las
  funcionalidades del framework.
*/
var js2k = {
   /*
	Property: Class
          Añade la posibilidad de generar clases en Javascript, emulando la herencia.
	Arguments:
        - opt:  Atributos, métodos y funcionalidades que compondrán la clase.
	Returns:
        Una Clase que podrá ser usada para obtener objetos apartir de dicha clase.
	Example:
      var Human = new js2k.Class({
          name: null,
          init: function(name){
            this.name = name;
          },
          presentarse: function(){
            alert("Hola, soy " + this.name);
          }
      });

    var Juan = new Humano("Juan");
    Juan.prensentar();
	*/
    Class: function(opt){
      // Creamos Class
      var _class = function(){
        return (arguments[0] !== null &&
                this.init && typeof this.init == 'function') ? this.init.apply(this,arguments): this;
      }

      _class.prototype = opt;
      _class.constructor = js2k.Class;

      // Extendemos la clase
      _class.Extend = function(properties){
        var proto = new this(null);
        for (var property in properties){
            var tmp = proto[property];
            proto[property] = this.Merge(tmp,properties[property]);
        }
        return new js2k.Class(proto);
      }
      // Implementamos nuevos métodos
      _class.Implement = function(){
        for (var i = 0, l = arguments.length; i < l; i++)
          js2k.extend(arguments[i],this.prototype);
      }
      _class.Merge = function(a,b){
          if (a && a != b){
              var type = typeof b;
              if (type != typeof a) return b;
              switch(type){
                  case 'function':
                        var m = function(){
                            this.parent = arguments.callee.parent;
                            return b.apply(this, arguments);
                        };
                        m.parent = a;
                        return m;
                  case 'object':
                        return js2k.merge(a,b);
              }
          }
          return b;
      }
      return _class;
    },
   /*
	Property: merge
          Funcionalidad que nos permite unir las funcionalidades de varios elementos.
	Arguments:
        -arguments:  Listado de elementos a extenderse.
	Returns:
        Un elemento que combina las características de ambos elementos.
	Example:
		var a = {
			uno: "UNO"
		};
		
		var b = {
			dos: "DOS"
		};
		var c = js2k.merge(a,b);
		// --> {
			uno: "UNO",
			dos: "DOS"
		}
	*/
    merge: function(){
       var m = {};
       for (var i = 0; i < arguments.length; i++){
        for (var x in arguments[i]) {
          var a = arguments[i][x];
          var b = m[x];
          if (b && typeof a == 'object' && typeof b == 'object')
                m[x] = js2k.merge(b,a);
          else
                m[x] = a;
        }
       }
       return m;
    },
	/*
		Property: get
				Nos permite buscar apartir del elemento actual.
		Arguments:
				-selector: Selector en formato CSS3.
				-contexto: Nodo inicial desde el que partimos la búsqueda (por defecto: document)
		Returns:
				Uno o varios elementos que concuerden con el selector indicado.
		Example:
				js2k.get("div#page li.dos a");
				// --> '<a href="..." />
	*/
	cache: {},
    cleanCache: function(){
        js2k.cache = {};  
    },
    xpath: function(selector){
	     var expr = "//" + selector.replace(/ /g, '/descendant::');
	     var elements = new Array();
	     var iterator = document.evaluate(expr, document, null, XPathResult.ANY_TYPE, null );
	     try {
	         while (thisNode = iterator.iterateNext())
	             elements.push(thisNode);
	     } catch (e) { }
	     return elements;
    },
    get: function(selector, context, cache) {
        var cache = cache || true;
      
        // Cache
        if (cache && js2k.cache[selector]) return js2k.cache[selector];
  
        // Navegadores MUY antiguos
        if (!document.getElementsByTagName) { return new Array();}

        var Special = function(selector) {
            return (selector.indexOf("#") > -1 || selector.indexOf(".") > -1);
        }
        var context = new Array(context || document);
        
        if (selector.indexOf(",") > -1) {
        	var parts = selector.split(","), results = [];
        	for (var y in parts){
        		results = results.concat(js2k.toArray(js2k.get(parts[y].trim())));
        	}
        	return (js2k.cache[selector] = results);
        }
        
        // Un token
        if (selector.indexOf(" ") == -1 && !Special(selector)){
            return (js2k.cache[selector] = js2k.getTag(selector, context[0]));
        }
				// Multiples tags [xpath]
        if (document.evaluate && selector.indexOf(" ") > -1 && !Special(selector)){
                return (js2k.cache[selector] = js2k.xpath(selector).slice(0));
        }
        
        var tokens = selector.split(' ');
        var i = 0;
        while(i < tokens.length) {
            var found = new Array, h = 0;
            token = tokens[i++].trim();
            // ID
            if (token.indexOf('#') > -1) {
                var el = js2k.getID(token);
                context = el?new Array(el):new Array();
                continue;
            }  
            // Class      
            if (token.indexOf('.') > -1) {
                while(h<context.length)
                        found = found.concat(js2k.getClass(token, context[h++]));
                context = found;
                continue;
            }
  
            // Tag
            while(h<context.length)
                found = found.concat(js2k.toArray(js2k.getTag(token, context[h++])));
            context = found.uniq();
        }// while(i < tokens.length)
    return (js2k.cache[selector] = context.slice(0));
    },
    getID: function(token){
        return document.getElementById(token.split('#')[1]);
    },
    getClass: function(){
        if (document.getElementsByClassName){
            return function(token, context){
                var context = context || document;
                var bits = token.split('.');
          
                var tag = bits[0] ;
                var className = bits[1]
                      
                var elements = context.getElementsByClassName(className),
                    nodeName = (tag)? new RegExp("\\b" + tag + "\\b", "i") : null,
                    returnElements = [],
                    current;
                for(var i=0, il=elements.length; i<il; i+=1){
                    current = elements[i];
                    if(!nodeName || nodeName.test(current.nodeName)) {
                        returnElements.push(current);
                    }
                }
                return returnElements;
            };              
        } else if (document.evaluate) {
            return function(token, context){
                var context = context || document;
                var bits = token.split('.');
          
                var tag = bits[0]?bits[0]:"*";
                var className = bits[1]

                var xhtmlNamespace = "http://www.w3.org/1999/xhtml",
                    namespaceResolver = (document.documentElement.namespaceURI === xhtmlNamespace)? xhtmlNamespace : null,
                    returnElements = [],
                    elements,
                    node;
                try    {
                    elements = document.evaluate(".//" + tag + '[@class="'+className+'"]', context, namespaceResolver, 0, null);
                } catch (e) {}
              
                while ((node = elements.iterateNext())) {
                    returnElements.push(node);
                }
                return returnElements;
            };
        } else {
            return function(token, context){
                var elm = context || document;
                var bits = token.split('.');
          
                var tag = bits[0]?bits[0]:"*";
                var className = bits[1]

                var classes = className.split(" "),
                    classesToCheck = [],
                    elements = (tag === "*" && elm.all)? elm.all : elm.getElementsByTagName(tag),
                    current,
                    returnElements = [],
                    match;
                for(var k=0, kl=classes.length; k<kl; k+=1){
                    classesToCheck.push(new RegExp("(^|\\s)" + classes[k] + "(\\s|$)"));
                }
                for(var l=0, ll=elements.length; l<ll; l+=1){
                    current = elements[l];
                    match = false;
                    for(var m=0, ml=classesToCheck.length; m<ml; m+=1){
                        match = classesToCheck[m].test(current.className);
                        if (!match) {
                            break;
                        }
                    }
                    if (match) {
                        returnElements.push(current);
                    }
                }
                return returnElements;
                };
            } // Else
    }(),
    getTag: function(token, context){
        return (context || document).getElementsByTagName(token);
    },
    toArray: function(){
            if( !!(window.attachEvent && !window.opera) ) {
                return function(a){
                    if( a instanceof Array ) return a;
                    for( var i=0, result = [], m; m = a[ i++ ]; )
                        result[ result.length ] = m;
                    return result;
                };
            } else {
                return function(a){
                    return Array.prototype.slice.call(a);
                };
            }
    }(),
	extend: function(methods, el){
        var el = el || this;
        for(var x in methods) el[x] =  methods[x];
        return el;
    },
    toDOM: function(html){
        var returnElements = [];
        var div = js2k.create("div",{innerHTML: html});
        var nodes = js2k.toArray(div.childNodes);
		nodes.each(function(el){returnElements.push(el);});
		return returnElements[0];
    },
    create: function(type,opt,parent){
		var el = document.createElement(type) ;
		if (opt.style)
			js2k.extend(opt.style,el.style);
		delete opt.style;
		js2k.extend(opt,el);
		if (parent)
			parent.appendChild(el);
		return el;
    },
    addJS: function(src, oload){
		var oload = oload || function(){};
		var opt = {src: src, type: "text/javascript", onload: oload, onreadystatechange: oload};
        return js2k.create("script",opt, js2k.get("head"));
    },
    addMethod: function(name, method, Elem){
        var Elem = Elem || this;
		Elem[name] = method;
    },
    GET: function(url, queryString, func, fError) {
        this.request("GET",url, queryString,func,fError);
    },
    POST: function(url, queryString, func,fError) {
        this.request("POST",url,queryString, func,fError);
    },
    request: function(method, url, queryString, func,fError) {
        var oAjax = (XMLHttpRequest)?new XMLHttpRequest():new ActiveXObject('Microsoft.XMLHTTP');
        if (!oAjax) return;
        if ("GET" == method) {
          oAjax.open("GET", url + queryString, true);
        } else {
          oAjax.open("POST", url, true);
          oAjax.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
        }
        oAjax.onreadystatechange = function() {
          if (oAjax.readyState == 4) {
            if (oAjax.status == 200) fn = (func == null)?function() {return null;}:func;
            else fn = (fError == null)?function() {return null;}:fError;
            fn(oAjax.responseXML,oAjax.responseText,oAjax);
          }
        };
        oAjax.send(queryString);
        return false;
    }
};

// Extensiones para Array
js2k.extend({
 each: function(fun){
      if (typeof fun != "function") throw new TypeError();
      for (var i = 0; i < this.length; i++) {
        if (i in this) fun.call(arguments[1], this[i], i)
      }
    return this;
 },
 item: function(x){
      return this[x] || this;
 },
 indexOf: function(s){
      for (var x=0;x<this.length;x++)
          if(this[x] == s) return x;
      return false;
 },
 sortNum: function(){
      return this.sort( function (a,b) { return a-b; } );
 },
 every: function(num, fun){
      if (typeof fun != "function") throw new TypeError();
      for (var i = 0; i < this.length; i++) {
        if (i in this && i%num == 0) fun.call(arguments[1], this[i], i)
      }
    return this;
 }, 
  uniq: function( a, tag ) {
      var r = [], uids = {}, _uid =0;
      if( tag ) tag = new RegExp( "^" + tag + "$", "i" );
      for( var i = 0, ae; ae = a[ i++ ]; ) {
          ae.uid = ae.uid || _uid++;
          if( !uids[ae.uid] && (!tag || ae.nodeName.search( tag ) !== -1) ) {
              r[r.length] = uids[ae.uid] = ae;
          }
      }
      return r;
  }
}, Array.prototype);



// Extendemos String
js2k.extend({
  trim: function(){
      return this.replace(/^\s+|\s+$/g,'');
  },
  capitalize: function(){
      return this[0].toUpperCase() + this.substr(1, this.length-1);
  }
}, String.prototype);


// Extendemos Funciones
js2k.extend({
    delay: function(ms, arguments){
        window.setTimeout(this,ms, arguments);
    }
}, Function.prototype);


// Extendemos Elementos
js2k.extend({
  remove: function(){
    if(!this.parentNode) return this;
    this.parentNode.removeChild(this);
  },
  replace: function(node){
    if(!this.parentNode) return this;
    this.parentNode.insertBefore(node,this);
    this.remove();
    return this;
  },
  parent: function(){
    if (!this.parentNode) return this;
    if (arguments.length == 0) {
        return this.get(this.parentNode);
    } else {
    if (this.parentNode.tagName == (arguments[0]).toUpperCase())
        return this.get(this.parentNode);
    else
        this.get(this.parentNode).parent(arguments[0]);
    }
  },
  insert: function(what) {
      if (typeof what == "string") what = js2k.toDOM(what);
      return this.appendChild(what);
  },
  insertText: function(text) {
      return this.innerHTML = text;
  },
  addEvent: function(ev, func, useCapture){
      if (this.addEventListener) {
            this.addEventListener(ev, func, useCapture);
            return true;
		}else if (this.attachEvent) {
            var r = this;
            this.attachEvent('on' + ev, func);
            return r;
		}else {
            this['on' + ev] = func;
		}
 },
 get: function(selector){
	js2k.get(selector, this);
 },
 getClassName: function(klass){
     js2k.getClassName(klass,this);
 },
 getTagName: function(tagName) {
	js2k.getTagName(tagName, context);
 },
 css: function(){
     if (arguments.length == 1) {
         var a = arguments[0];
	 if (typeof a == 'string') {return this.style[a];}
	 else {for (var p in a) this.style[p] = a[p];}
     }else {
         for(var i = 0, l = arguments.length;i<l;) {
             this.style[arguments[i++]] = arguments[i++];
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
     if (!this.attr) return false;
     if(this.hasClass(cl)) return this;
     var classes = this.attr('class');
     if(classes==null) this.attr('class',cl);
     else this.attr('class',classes+" "+cl);
     return this;
 },
 removeClass: function(cl){
     if (!this.attr) return false;
     var classes = this.attr('class');
     if(classes==null) return this;
     var arrClasses=classes.split(" ");
     for(var i=0;i<arrClasses.length;i++){
         if(arrClasses[i]==cl){
             arrClasses.splice(i,1);
             break;
         }
     }
     this.attr('class',arrClasses.join(" "));
     return this;
 },
 hasClass: function(cl){
     if (!this.attr) return false;
     var classes=this.attr('class');
     if(classes==null) return false;
     var arrClasses=classes.split(" ");
     for(var i=0;i<arrClasses.length;i++)
         if(arrClasses[i]==cl) return true;
     return false;
  }
}, HTMLElement.prototype);


/*
Inspired by:
   Peppy - A lightning fast CSS 3 Compliant selector engine.
   Author: James Donaghue - james.donaghue@gmail.com
   Copyright (c) 2008 James Donaghue (jamesdonaghue.com)
   Licenced under the FreeBSD (http://www.freebsd.org/copyright/freebsd-license.html) licence.

And:
    From John Resig -> http://ejohn.org/blog/thoughts-on-queryselectorall/
    Copyright 2008, John Resig (http://ejohn.org/)
     released under the MIT License
*/
if (document.querySelectorAll) {
    (function(){
        js2k.old = js2k.get;
        js2k.get = function(sel, context){
                try {
                    return (context || document).querySelectorAll(sel);
                } catch(e){}
            return js2k.old.apply(js2k.old, js2k.toArray(arguments));
        };
    })();  
} else {
/*
And:
    Sizzle -> http://github.com/jeresig/sizzle/tree/master
    Copyright 2008, John Resig (http://ejohn.org/)
    released under the MIT License
*/
    var aEvent = document.addEventListener || document.attachEvent;
    function clearCache(){ js2k.cache = {}; }
    aEvent("DOMAttrModified", clearCache, false);
    aEvent("DOMNodeInserted", clearCache, false);
    aEvent("DOMNodeRemoved", clearCache, false);
	var $ = js2k.get;
}