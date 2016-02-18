/**
 * Address
 * 
 * @namespace core
 * @author Georgi Popov
 * @version 1.0.0
 * @license http://www.gnu.org/licenses/gpl-3.0.en.html GPLv3
 * @uses com/magadanski/core/core.js
 * @uses com/magadanski/core/EventDispatcher.js
 */

define('com.magadanski.core.Address', function () {
	var that;
	
	// private properties
	var addressRoot = '/';
	var hash = '';
	var state = '';
	
	// private methods
	function popStateHandler(e) {
		updateHash();
		state = e.state;
	}
	
	function updateHash() {
		hash = '/' + window.location.pathname.replace(addressRoot, '').replace(/^\//, '');
	}
	
	/**
	 * A helper class for working with browser history and push state. This should be used for deep linking.
	 * 
	 * @class Address
	 * @constructor
	 * @since  1.0.0
	 * @extends {core.EventDispatcher}
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
		 * Returns the current URL hash
		 * 
		 * @method getHash
		 * @return {string} The URL hash
		 */
		that.getHash = function () {
			return hash;
		}
		
		/**
		 * Sets the URL hash
		 * 
		 * @method setHash
		 * @param {string} hash The new value that would be set for the hash
		 * @param {string} title The title argument to be passed to the history.pushstate function. As of February 8th, 2016 this is still simply ignored by all browsers.
		 * @param {object} state An object storing additional information for the state itself
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
		 * Returns the state object for the current history state
		 * 
		 * @method getState
		 * @return {object} The state object
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