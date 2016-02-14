/**
 * Exception base class
 * 
 * @package com.magadanski.exceptions
 * @author Georgi Popov
 * @version 1.0
 * @license http://www.gnu.org/licenses/old-licenses/gpl-2.0.en.html GPLv2
 * @uses com/magadanski/core/core.js
 */

define('com.magadanski.exceptions.Exception', function () {
	var that;
	
	// private properties
	
	// private methods
	
	/**
	 * An exception object
	 * 
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