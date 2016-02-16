/**
 * Core framework functionality
 * 
 * @module com.magadanski.utils
 * @namespace core
 * @author Georgi Popov
 * @version 1.0.0
 * @license http://www.gnu.org/licenses/old-licenses/gpl-2.0.en.html GPLv2
 * @uses com/magadanski/core/core.js
 */

pack('com.magadanski.utils');

/**
 * A helper function to calculate the full height of a DOMNode element (including margin)
 * 
 * @static
 * @since  1.0.0
 * @param  {DOMNode} el The DOMNode you'd like to get the height of
 * @return {int} The height of the element in pixels
 */
com.magadanski.utils.getFullHeight = function (el) {
	var height = 0;
	var computedStyle = document.defaultView.getComputedStyle(el, '');
	
	height += (typeof(el.clientHeight) !== 'undefined') ? el.clientHeight : 0;
	
	if (typeof(computedStyle) !== 'undefined') {
		height += parseInt(computedStyle.getPropertyValue('margin-top'));
		height += parseInt(computedStyle.getPropertyValue('margin-bottom'));
	}
	
	return height;
}

/**
 * A helper function to extend the properties of a configuration object with additional defaul values
 * 
 * @static
 * @since  1.0.0
 * @param  {object} defaults The default values for the options
 * @param  {object} options The options passed by the developer
 * @return {object} The options object extended with additional default properties that were not passed by the developer
 */
com.magadanski.utils.extendOptions = function (defaults, options) {
	var extended = {};
	
	for (o in options) {
		extended[o] = options[o];
	}
	
	for (o in defaults) {
		if (typeof(extended[o]) === 'undefined') {
			extended[o] = defaults[o];
		}
	}
	
	return extended;
}