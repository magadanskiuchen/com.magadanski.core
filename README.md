# com.magadanski.core

**Core classes and utilities for the com.magadanski JS framework.**

Use `npm` or `bower` to install the package to your project by typing:

```
npm install com.magadanski.core
```

or

```
bower install com.magadanski.core
```

The framework's purpose is to provide a highly extensible core functionality for JavaScript web applications.

Apart from internal structure helper functions, the `core.js` file is the first file you should load as part of the framework, as it extends the `Function` built-in JS class with an `inherits` method.

The `utils.js` file contains some globl helper functions used in development.

### `EventDispatcher`

One of the core classes that lays the foundation of the framework is the `EventDispatcher` class that adds custom developed filler methods that share the same syntax as common JS functions:

* `addEventListener(eventType, callback)`

* `removeEventListener(eventType, callback)`

* `dispatchEvent(eventType, eventObject)`

### `App`

The `App` class extends `EventDispatcher`, adding two main events:

* `init`, which is essentially an alias for the document's `DOMContentLoaded` event

* `load`, which is an alias for `window.load`

It also includes a `title` attribute being set to whatever the HTML document's `<title>` tag is.

Creating a new web application you are encouraged to extend this class.

### `Address`

`Address` is a helper class providing easy-to-use APIs for deep linking.

### `DOMCollection`

`DOMCollection` is a wrapper allowing you to easily perform selection of DOM elements.

It only provides methods for manipulating those, including looping through all elements from the set and applying a callback function to each, assigning and removing event listeners, triggering events, assigning and removing classes to the nodes, applying CSS properties, filtering a subset of the selection and removing the elements from the DOM.

### `Exception` and `TypeException`

The framework includes a generic wrapper class for usage of exceptions -- `Exception`.

This is also extended as `TypeException`, which is triggered by some framework classes when argument type mismatch occurs.

### Language Reference

For more information on this and other packages of the JS framework please refer to the [com.magadanski JS Framework Language Reference](http://magadanskiuchen.github.io/com.magadanski.core/)