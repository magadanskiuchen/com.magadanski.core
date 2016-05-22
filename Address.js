/**
 * Address
 * 
 * @namespace core
 * @author Georgi Popov
 * @version 1.0.0
 * @license http://www.gnu.org/licenses/gpl-3.0.en.html GPLv3
 * @requires com/magadanski/core/core.js
 * @requires com/magadanski/core/EventDispatcher.js
 */

define('com.magadanski.core.Address', function () {
	var that;
	
	// private properties
	/**
	 * Root-relative address to the homepage
	 * 
	 * This variable holds the path to the root of the application. In case it's in the root of the domain the default value of '/' will be used.
	 * 
	 * In case the application is, however, in some subdirectory you'll need to overwrite this by passing an `aRoot` argument to the class constructor.
	 * 
	 * @access private
	 * @inner
	 * @memberOf Address
	 * @type {string}
	 * @see Address
	 */
	var addressRoot = '/';
	
	/**
	 * Copy of deep-linked address
	 * 
	 * The property is not to be mistaken with the `window.location.hash` object (although it can contain it).
	 * This will not always appear with "#" but can also be set as any path.
	 * 
	 * If you use `setHath('#hash')` this will essentially match the `window.location.hash` yet you can ommit the "#" symbol
	 * when calling the method.
	 * 
	 * It gets updated through the `updateHash()` private method each time a `setHash()` call occurs.
	 * 
	 * There is a `getHash()` getter and a `setHath()` setter to allow you to control the property.
	 * 
	 * @access private
	 * @inner
	 * @memberOf Address
	 * @type {string}
	 * @see {@link Address#getHash|getHash}
	 * @see {@link Address#setHash|setHash}
	 */
	var hash = '';
	
	/**
	 * Holder of a state property for HTML5 `history.pushState()`
	 * 
	 * This will be updated when the `setHash()` method is used.
	 * 
	 * You cannot directly set the value of `state` without calling `setHash()` but you can retrieve it with the `getState()` getter.
	 * 
	 * @access private
	 * @inner
	 * @readonly
	 * @memberOf Address
	 * @type {string}
	 * @see {@link Address#getState|getState}
	 */
	var state = '';
	
	// private methods
	/**
	 * Auto handler of the `window.popstate` event
	 * 
	 * @access private
	 * @inner
	 * @memberOf Address
	 * @param  {Event} e The `popstate` event
	 * @return {void}
	 */
	function popStateHandler(e) {
		updateHash();
		state = e.state;
	}
	
	/**
	 * Stores the current hash as a property each time `setHash()` is called.
	 * 
	 * @access private
	 * @inner
	 * @memberOf Address
	 * @return {void}
	 * @see {@link Address~hash|hash}
	 * @see {@link Address#setHash|setHash}
	 */
	function updateHash() {
		hash = '/' + window.location.pathname.replace(addressRoot, '').replace(/^\//, '');
	}
	
	/**
	 * A helper class for working with browser history and push state. This should be used for deep linking.
	 * 
	 * @class Address
	 * @since  1.0.0
	 * @extends {EventDispatcher}
	 * @param {string} aRoot The path to the main script on the server. Defult value is root: '/'.
	 */
	var Address = function (aRoot) {
		that = this;
		if (typeof(aRoot) === 'string') {
			addressRoot = aRoot;
		}
		
		// priviledged properties
		
		// priviledged methods
		/**
		 * Getter for {@link Address~hash|hash}
		 * 
		 * @access public
		 * @instance
		 * @method getHash
		 * @memberof Address
		 * @return {string} The URL hash
		 * @see {@link Address~hash|hash}
		 * @see {@link Address#setHash|setHash}
		 */
		that.getHash = function () {
			return hash;
		}
		
		/**
		 * Sets the URL hash, the title and allows for a custom state to be saved.
		 * 
		 * This is an alias for `history.pushState` that also performs some internal class handling and event triggering.
		 * 
		 * @access public
		 * @instance
		 * @method setHash
		 * @memberof Address
		 * @param {string} hash The new value that would be set for the hash
		 * @param {string} title The title argument to be passed to the history.pushstate function. As of February 8th, 2016 this is still simply ignored by all browsers.
		 * @param {object} state An object storing additional information for the state itself
		 * @see {@link Address~hash|hash}
		 * @see {@link Address#getHash|getHash}
		 */
		that.setHash = function (hash, title, state) {
			var old = { hash: that.getHash(), state: that.getState() };
			
			if (old.hash != hash) {
				history.pushState(title, state, hash);
				updateHash();
				
				window.dispatchEvent(new PopStateEvent('popstate', { state: state }));
				that.dispatchEvent('change', { previousHash: old.hash, previousState: old.state });
			}
		}
		
		/**
		 * Getter for {@link Address~state|state}
		 * 
		 * @access public
		 * @instance
		 * @method getState
		 * @memberof Address
		 * @return {object} The state object
		 * @see {@link Address#state~state}
		 * @see {@link Address#setHash|setHash}
		 */
		that.getState = function () {
			return state;
		}
		
		// constructor
		window.addEventListener('popstate', popStateHandler);
	}
	Address.inherits(com.magadanski.core.EventDispatcher);
	com.magadanski.core.Address = Address;
	
	// public methods
});