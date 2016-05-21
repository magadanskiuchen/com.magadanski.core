/**
 * Core framework functionality
 * 
 * @module com.magadanski.core
 * @namespace core
 * @author Georgi Popov
 * @version 1.0.0
 * @license http://www.gnu.org/licenses/gpl-3.0.en.html GPLv3
 */

/**
 * A function to automatically create (if not already defined) an object with all necessary properties to represent a package in a revrese domain notation
 * 
 * @static
 * @since  1.0.0
 * @param  {string} struct A reverse domain notation of the package you'd like to create
 * @return {object} The object in the end of the packge you've efined
 */
function pack(struct) {
	var elements = struct.split('.');
	var lastElement = window;
	
	for (var i = 0; i < elements.length; ++i) {
		var e = elements[i];
		
		lastElement[e] = (typeof(lastElement[e]) != 'undefined') ? lastElement[e] : {};
		lastElement = lastElement[e];
	}
	
	return lastElement;
}

/**
 * A wrapper function to create a package and define a class within it.
 * 
 * @static
 * @since  1.0.0
 * @param  {string} struct A reverse domain notation of the package you'd like to create along with a class name
 * @param  {function} declaration A function that would be executed as soon as the package variable is created and should declare a class for the package.
 * @return {void}
 */
function define(struct, declaration) {
	pack(struct);
	declaration();
}

/**
 * A function to load a package, class or a property of a reverse domain notated instance and bring it as a global root variable or return it as a result
 * 
 * @static
 * @since  1.0.0
 * @param  {string} struct The reverse domain notation of the package, class or property you'd like to have as global
 * @param  {bool} local Whether you'd like to make this as a global variable or you'd like the result returned to you to assign to a local variable
 * @return {void|object} Would not return anything of `local` is false. If the second function parameter is `true` then this would return the object rather than making it global.
 */
function inc(struct, local) {
	if (typeof(local) == 'undefined') local = false;
	
	var elements = struct.split('.');
	var full = window;
	
	for (var i = 0; i < elements.length; ++i) {
		var e = elements[i];
		var full = full[e];
		
		if (i+1 == elements.length) {
			if (local) {
				return full;
			} else {
				window[e] = full;
			}
		}
	}
}

// JS class inheritance
Function.prototype.inherits = function (parent) {
	if (parent.constructor == Function) {
		//Normal Inheritance
		this.prototype = new parent;
		this.prototype.constructor = this;
		this.prototype.parent = parent.prototype;
	} else {
		//Pure Virtual Inheritance
		this.prototype = parent;
		this.prototype.constructor = this;
		this.prototype.parent = parent;
	}
	
	return this;
}
