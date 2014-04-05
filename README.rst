=========
Defer.js
=========

**Cross platform async for JavaScript.**

.. image:: https://travis-ci.org/kevinconway/Defer.js.png?branch=master
    :target: https://travis-ci.org/kevinconway/Defer.js
    :alt: Current Build Status

What Is Defer?
===============

Defer is a utility library that allows JavaScript developers to write async
code that works across multiple JavaScript platforms.

This functionality is provided in Node.js through its `process.nextTick`
function. The ability to micromanage the JavaScript concurrency model is a
major benefit of the language that this library extends to browser
environments.

Developers of cross platform JavaScript libraries can use Defer as a foundation
for providing async behaviour that is consistent across multiple environments.

Show Me
=======

::

    function logSomething() { console.log("ASYNC"); }

    defer(logSomething);
    console.log("SYNC");

    // Console Output: "SYNC"
    // At some point later:
    // Console Output: "ASYNC"

Defer exposes a single function called `defer`. This function is an abstraction
over platform specific methods for deferring the execution of a function until
the next cycle of the event loop. In Node.js this function aliases
`process.nextTick`. In modern browsers this function leverages
`window.postMessage`. In legacy browsers this function falls back on
setTimeout.

For more detailed usage guides and API specifications, see the docs directory.

Setup
=====

Node.js
-------

This package is published through NPM under the name `deferjs`::

    $ npm install deferjs

Once installed, simply `defer = require("deferjs")`.

Browser
-------

Developers working in normal browser environments can use <script> tags to load
this package::

    <script src="defer.js"></script>

Defer has no dependencies of its own that need to be loaded first.

Tests
-----

To run the tests in Node.js use the `npm test` command.

To run the tests in a browser, run the `install_libs` script in the test
directory and then open the `runner.html` in the browser of your choice.


License
=======

Defer
-----

This project is released and distributed under an MIT License.

::

    Copyright (C) 2013 Kevin Conway

    Permission is hereby granted, free of charge, to any person obtaining a
    copy of this software and associated documentation files (the "Software"),
    to deal in the Software without restriction, including without limitation
    the rights to use, copy, modify, merge, publish, distribute, sublicense,
    and/or sell copies of the Software, and to permit persons to whom the
    Software is furnished to do so, subject to the following conditions:

    The above copyright notice and this permission notice shall be included in
    all copies or substantial portions of the Software.

    THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
    IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
    FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
    AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
    LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
    FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
    DEALINGS IN THE SOFTWARE.

Contributors
============

Style Guide
-----------

All code must validate against JSlint.

Testing
-------

Mocha plus expect. All tests and functionality must run in Node.js and the
browser.

Contributor's Agreement
-----------------------

All contribution to this project are protected by the contributors agreement
detailed in the CONTRIBUTING file. All contributors should read the file before
contributing, but as a summary::

    You give us the rights to distribute your code and we promise to maintain
    an open source release of anything you contribute.
