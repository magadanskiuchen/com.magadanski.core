/**
 * Event Dispatcher base class
 * 
 * @package com.magadanski.core
 * @author Georgi Popov
 * @version 1.0
 * @license http://www.gnu.org/licenses/old-licenses/gpl-2.0.en.html GPLv2
 * @uses com/magadanski/core/core.js
 */

define('com.magadanski.core.EventDispatcher', function () {
	var that;
	
	// private properties
	
	// private methods
	
	/**
	 * Core EventDispatcher class that should be extended in case you need ability to fire custom events from an object
	 */
	var EventDispatcher = function () {
		that = this;
		
		// priviledged properties
		that.events = {};
		
		// priviledged methods
		
		// constructor
	}
	com.magadanski.core.EventDispatcher = EventDispatcher;
	
	// public methods
	/**
	 * Attaches an event handler to a specific event type
	 * 
	 * @param {string} eventType The type of the event you'd like to listen for
	 * @param {function(event:Event)} callback The function to be executed when the event occurs
	 * @return {void}
	 */
	EventDispatcher.prototype.addEventListener = function (eventType, callback) {
		var that = this;
		
		if (typeof(eventType.split) != 'undefined') {
			eventType = eventType.split(/[\s\,]/);
		}
		
		for (var e in eventType) {
			var eventName = eventType[e];
			
			if (eventName.length > 1) {
				if (typeof(that.events[eventName]) == 'undefined') {
					that.events[eventName] = [];
				}
				
				that.events[eventName].push(callback);
			}
		}
	}
	
	/**
	 * Removes a previously attached event to a specific event type.
	 * 
	 * @param  {string} eventType The type of the event you'd like to unbind a handler for
	 * @param  {function(event:Event)} callback This must be a reference to the same Function object that has been set as a listener. Otherwise the removal will not take place.
	 * @return {void}
	 */
	EventDispatcher.prototype.removeEventListener = function (eventType, callback) {
		var that = this;
		
		if (typeof(eventType.split) != 'undefined') {
			eventType = eventType.split(',');
		}
		
		for (var e in eventType) {
			var eventName = eventType[e].replace(/\s/, '');
			
			if (typeof(that.events[eventName]) != 'undedined') {
				for (var c in that.events[eventName]) {
					var shouldCallbackBeRemoved = false;
					
					if (typeof(callback) !== 'Function') {
						shouldCallbackBeRemoved = true;
					} else if (c == callback || that.events[eventName][c] == callback) {
						shouldCallbackBeRemoved = true;
					}
					
					if (shouldCallbackBeRemoved) {
						that.events[eventName].splice(c, 1);
					}
				}
			}
		}
	}
	
	/**
	 * Fires an event on behalf of the object
	 * 
	 * @param  {string} eventType The type of the event you'd like to fire
	 * @param  {Event} eventObj The actual event object that will be passed to listener functions. This can be used to store additional information for the situation.
	 * @return {void}
	 */
	EventDispatcher.prototype.dispatchEvent = function (eventType, eventObj) {
		var that = this;
		
		if (typeof(eventObj) == 'undefined') {
			eventObj = {}; // TODO: check options to migrate to native JS event objects
		}
		
		if (typeof(that.events[eventType]) == 'object') {
			for (var callback in that.events[eventType]) {
				eventObj.type = eventType;
				eventObj.currentTarget = this;
				
				if (typeof(that.events[eventType][callback]) == 'function') {
					that.events[eventType][callback](eventObj);
				}
			}
		}
	}
});
