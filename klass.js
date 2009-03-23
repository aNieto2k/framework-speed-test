var Klass = function(prop) {
        var klass = function(){ if(this.init) this.init.apply(this, arguments);};
        klass.prototype = prop || {};
        klass.constructor = Klass;
        klass.extend = Klass.extend;
        return klass;
};

Klass.extend = function(prop){
	function setParent(fn, parent) {
		      return function() {
		         this.parent = parent;
		         return fn.apply(this, arguments);
		      }
	  }
	function merge(prev, next){
			for (var name in next){
				if (prev[name] && (typeof prev[name] == 'object' && typeof next[name] == 'object'))
					merge(prev[name], next[name]);
				else
					prev[name] = next[name];
			}
		return prev;
	};

      for (var name in this.prototype) {
		if (!prop[name])
			prop[name] = this.prototype[name];
		else if(typeof prop[name] == 'function' && typeof this.prototype[name] == 'function')
          prop[name] = setParent(prop[name], this.prototype[name]);
		else if(typeof prop[name] == 'object' && typeof this.prototype[name] == 'object')
          prop[name] = merge(prop[name], this.prototype[name]);
      }
  return new Klass(prop);
};