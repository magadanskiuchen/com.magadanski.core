/**
 * DOMCollection
 * 
 * @package com.magadanski.core
 * @author Georgi Popov
 * @version 1.0
 * @license http://www.gnu.org/licenses/old-licenses/gpl-2.0.en.html GPLv2
 * @uses com/magadanski/core/core.js
 */

define('com.magadanski.core.DOMCollection', function () {
	var that;
	
	// private properties
	var selection = null;
	var callFunction = 'querySelectorAll';
	
	// private methods
	
	/**
	 * @param {string} selector A CSS selector to be used to fetch elements
	 * @param {?DOMNode} context The context in which the CSS selector will be used. If empty then document will be used a context. If some DOMNode element is passed, the collection will load only elements within that context that match the selector
	 */
	var DOMCollection = function (selector, context) {
		that = this;
		
		// priviledged properties
		/**
		 * A list of the DOMNode elements that fall within the collection
		 * @type {Array}
		 */
		that.elements = [];
		
		// priviledged methods
		
		// constructor
		if (context instanceof HTMLElement) {
			// all OK -- no need to do anything
		} else if (context instanceof DOMCollection) {
			callFunction = 'find';
		} else {
			context = document;
		}
		
		if (typeof(selector) == 'string') {
			selection = context[callFunction](selector);
		} else if (typeof(selector) == 'object') { // support to pass a result of querySelectorAll or similar
			selection = selector;
		} else {
			selection = false;
		}
		
		if (!!selection) {
			for (var i = 0; i < selection.length; i++) {
				that.elements.push(selection.item(i));
			}
		}
	}
	com.magadanski.core.DOMCollection = DOMCollection;
	
	// public methods
	/**
	 * Adds event listener to all DOMNode elements within the collection
	 * 
	 * @param {eventType} eventType The type of the event to listen for
	 * @param {function(event:Event)} callback The function to be executed when the event occurs
	 * @return {void}
	 */
	DOMCollection.prototype.addEventListener = function (eventType, callback) {
		this.elements.map(function (el) {
			el.addEventListener(eventType, callback);
		});
	}
	
	/**
	 * Remved a previously assigned event listener to all of the elements from the collection. The same reference to the callback function must be provided, otherwise the method will not work.
	 * 
	 * @param  {string} eventType The type of the event to remove listener for
	 * @param  {function(event:Event)} callback The function to be removed as handler
	 * @return {void}
	 */
	DOMCollection.prototype.removeEventListener = function (eventType, callback) {
		this.elements.map(function (el) {
			el.removeEventListener(eventType, callback);
		});
	}
	
	/**
	 * Adds a CSS class to all elements from the collection
	 * 
	 * @param {string} className The CSS class to be applied
	 * @return {void}
	 */
	DOMCollection.prototype.addClass = function (className) {
		this.elements.map(function (el) {
			el.classList.add(className);
		});
	}
	
	/**
	 * Removes a CSS class from all elements from the collection
	 * 
	 * @param  {string} className The CSS class to be removed
	 * @return {void}
	 */
	DOMCollection.prototype.removeClass = function (className) {
		this.elements.map(function (el) {
			el.classList.remove(className);
		});
	}
	
	/**
	 * Executes a function for all elements from the collection
	 * 
	 * @param  {function(element:DOMElement, i:int)} callback The function to be executed for each of the elements
	 * @return {void}
	 */
	DOMCollection.prototype.each = function (callback) {
		this.elements.map(function (el, i) {
			callback(el, i);
		});
	}
	
	/**
	 * Applies CSS styles to all elements from the collection
	 * 
	 * @param  {object} styles An object representation of the CSS styles to be applied to the elements from the collection
	 * @return {void}
	 */
	DOMCollection.prototype.css = function (styles) {
		this.elements.map(function (el) {
			for (att in styles) {
				el.style[att] = styles[att];
			}
		});
	}
	
	/**
	 * Filters elements from the collection, so only ones that meet a provided CSS selector remain
	 * 
	 * @param  {string} selector CSS selector to test the elements against
	 * @return {DOMCollection}
	 */
	DOMCollection.prototype.filter = function (selector) {
		var filteredElements = new DOMCollection();
		
		this.elements.map(function (el) {
			if (el.matches(selector)) {
				filteredElements.elements.push(el);
			}
		});
		
		return filteredElements;
	}
	
	/**
	 * Finds child elements to the ones from the collection that match a specific CSS selector
	 * 
	 * @param  {string} selector CSS selector to describe desired child elements
	 * @return {DOMCollection}
	 */
	DOMCollection.prototype.find = function (selector) {
		var foundElements = new DOMCollection();
		
		this.elements.map(function (el) {
			var subset = new DOMCollection(selector, el);
			foundElements.elements = foundElements.elements.concat(subset.elements);
		});
		
		return foundElements;
	}
	
	/**
	 * Detaches from the DOM all elements from the collection
	 * @return {void}
	 */
	DOMCollection.prototype.remove = function () {
		this.elements.map(function (el) {
			el.remove();
		});
	}
});