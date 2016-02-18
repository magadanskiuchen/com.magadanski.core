/**
 * Exception base class
 * 
 * @namespace exceptions
 * @author Georgi Popov
 * @version 1.0.0
 * @license http://www.gnu.org/licenses/gpl-3.0.en.html GPLv3
 * @uses com/magadanski/core/core.js
 */

define('com.magadanski.exceptions.Exception', function () {
	var that;
	
	// private properties
	
	// private methods
	
	/**
	 * An exception object
	 * 
	 * @class Exception
	 * @constructor
	 * @since  1.0.0
	 * @param {string} message The message of the exception
	 * @return {void}
	 */
	var Exception = function (message) {
		that = this;
		
		// priviledged properties
		that.message = message;
		
		// priviledged methods
		
		// constructor
	}
	com.magadanski.exceptions.Exception = Exception;
	
	// public methods
});