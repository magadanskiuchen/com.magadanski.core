/**
 * App
 * 
 * @package com.magadanski.core
 * @author Georgi Popov
 * @version 1.0
 * @license http://www.gnu.org/licenses/old-licenses/gpl-2.0.en.html GPLv2
 * @uses com/magadanski/core/core.js
 * @uses com/magadanski/core/EventDispatcher.js
 */

define('com.magadanski.core.App', function () {
	var that;
	
	// private properties
	
	// private methods
	
	/**
	 * Core app class firing two events as the site loads. An `init` event id fired on document.DOMContentLoaded and a `load` event is fired on window.load
	 */
	var App = function () {
		that = this;
		
		// priviledged properties
		/**
		 * The application's name/title, which will originally pulls from the browser's title
		 * 
		 * @type {string}
		 */
		that.title = document.title;
		
		// priviledged methods
		
		// constructor
		document.addEventListener('DOMContentLoaded', function (e) {
			var customEvent = {};
			customEvent.originalEvent = e;
			customEvent.currentTarget = that;
			
			that.dispatchEvent('init', customEvent);
		});
		
		window.addEventListener('load', function (e) {
			var customEvent = {};
			customEvent.originalEvent = e;
			customEvent.currentTarget = that;
			
			that.dispatchEvent('load', customEvent);
		});
		
		// TODO: update object's title on change of DOM's title tag and vice-versa
	}
	App.inherits(com.magadanski.core.EventDispatcher);
	com.magadanski.core.App = App;
	
	// public methods
});
