/**
 * App
 * 
 * @namespace core
 * @author Georgi Popov
 * @version 1.0.0
 * @license http://www.gnu.org/licenses/gpl-3.0.en.html GPLv3
 * @requires com/magadanski/core/core.js
 * @requires com/magadanski/core/EventDispatcher.js
 */

define('com.magadanski.core.App', function () {
	var that;
	
	// private properties
	
	// private methods
	
	/**
	 * Core app class firing two events as the site loads. An `init` event id fired on document.DOMContentLoaded and a `load` event is fired on window.load
	 * 
	 * @class App
	 * @since 1.0.0
	 * @extends {EventDispatcher}
	 * @fires {@link App#init|init}
	 * @fires {@link App#load|load}
	 */
	var App = function () {
		that = this;
		
		// priviledged properties
		/**
		 * The application's name/title, which will originally pulls from the browser's title
		 * 
		 * @access public
		 * @instance
		 * @member {string} title
		 * @memberof App
		 * @default document.title
		 */
		that.title = document.title;
		
		// priviledged methods
		
		// constructor
		document.addEventListener('DOMContentLoaded', function (e) {
			var customEvent = {};
			customEvent.originalEvent = e;
			customEvent.currentTarget = that;
			
			/**
			 * Alias for the `document`'s `DOMContentLoaded` event
			 * 
			 * @event App#init
			 * @type {Object}
			 * @property {Event} originalEvent The actual DOMContentLoaded event
			 * @property {Object} currentTarget The App instance triggering the event
			 */
			that.dispatchEvent('init', customEvent);
		});
		
		window.addEventListener('load', function (e) {
			var customEvent = {};
			customEvent.originalEvent = e;
			customEvent.currentTarget = that;
			
			/**
			 * Alias for `window.load`
			 * 
			 * @event App#load
			 * @type {Object}
			 * @property {Event} originalEvent The actual DOMContentLoaded event
			 * @property {Object} currentTarget The App instance triggering the event
			 */
			that.dispatchEvent('load', customEvent);
		});
		
		// TODO: update object's title on change of DOM's title tag and vice-versa
	}
	App.inherits(com.magadanski.core.EventDispatcher);
	com.magadanski.core.App = App;
	
	// public methods
});
