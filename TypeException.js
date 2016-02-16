/**
 * Type Exception
 * 
 * @namespace exceptions
 * @author Georgi Popov
 * @version 1.0.0
 * @license http://www.gnu.org/licenses/old-licenses/gpl-2.0.en.html GPLv2
 * @uses com/magadanski/core/core.js
 * @uses com/magadanski/exceptions/Exception.js
 */

define('com.magadanski.exceptions.TypeException', function () {
	var that;
	
	// private properties
	
	// private methods
	
	/**
	 * An exception in case a type mismatch for arguments has occurred
	 * 
	 * @class TypeException
	 * @constructor
	 * @since 1.0.0
	 * @extends {exceptions.Exception}
	 * @param {string} message The message for the exception
	 */
	var TypeException = function (message) {
		that = this;
		
		// priviledged properties
		that.message = message; // TODO: ditch excess line when migrating to ECMAScript 2015 (ES6)
		
		// priviledged methods
		
		// constructor
	}
	TypeException.inherits(com.magadanski.exceptions.Exception);
	com.magadanski.exceptions.TypeException = TypeException;
	
	// public methods
});