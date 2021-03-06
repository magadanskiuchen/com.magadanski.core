/**
 * Type Exception
 * 
 * @namespace exceptions
 * @author Georgi Popov
 * @version 1.0.0
 * @license http://www.gnu.org/licenses/gpl-3.0.en.html GPLv3
 * @requires com/magadanski/core/core.js
 * @requires com/magadanski/exceptions/Exception.js
 */

define('com.magadanski.exceptions.TypeException', function () {
	var that;
	
	// private properties
	
	// private methods
	
	/**
	 * An exception in case a type mismatch for arguments has occurred
	 * 
	 * @class TypeException
	 * @since 1.0.0
	 * @extends {Exception}
	 * @param {string} message The message for the exception
	 * @return {void}
	 */
	var TypeException = function (message) {
		that = this;
		
		// priviledged properties
		/**
		 * The exception's message
		 * 
		 * @access public
		 * @instance
		 * @member {string} message
		 * @memberOf Exception
		 */
		that.message = message; // TODO: ditch excess line when migrating to ECMAScript 2015 (ES6)
		
		// priviledged methods
		
		// constructor
	}
	TypeException.inherits(com.magadanski.exceptions.Exception);
	com.magadanski.exceptions.TypeException = TypeException;
	
	// public methods
});