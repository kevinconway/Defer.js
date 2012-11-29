=========
Defer.js
=========

**Cross platform async for JavaScript.**

*Status: In Development*

What Is Defer?
===============

Defer utility library that allows JavaScript developers to write async code
that works across multiple JavaScript platforms.

This functionality is provided in Node.js through its `process.nextTick`
function. The ability to micromanage the JavaScript concurrency model is a
major benefit of the language that this library extends to browser environments.

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
`window.postMessage`. In legacy browsers this function falls back on setTimeout.

For more detailed usage guides and API specifications, see the docs directory.

Setup Instructions
==================

This library is designed from the beginning to operate in as many JavaScript
environments as possible. To accomplish this, all modules have been wrapped in
a specialized module pattern that will detect the current environment and
choose the most appropriate loading mechanism.

Currently support platforms are Node.js, browser via <script>, and AMD via
RequireJS.

Node.js
-------

This package is published through NPM under the name `deferjs`::

    $ npm install deferjs

Once installed, this package can be included in a project through `require()`
just like any other node package.

Browser (<script>)
------------------

Developers working with a normal browser environment can include the package
through a normal <script> tag. The Defer package, by default, loads into a
global variable named `defer`::

    <script src="defer.js"></script>

Defer has no dependencies of its own that need to be loaded first.

Browser (AMD)
-------------

Developers working with RequireJS can also load the Defer package. Place the
defer.js file in the /lib directory, or whichever directory has been configured
as the one for dependencies, and it can be loaded with `require()`::

    require(['defer'], function (defer) {

    });

Defer has no dependencies of its own that need to be present in the dependency
directory.

License
=======

Defer
-----

This project is released and distributed under an MIT License.

::

    Copyright (C) 2012 Kevin Conway

    Permission is hereby granted, free of charge, to any person obtaining a copy
    of this software and associated documentation files (the "Software"), to
    deal in the Software without restriction, including without limitation the
    rights to use, copy, modify, merge, publish, distribute, sublicense, and/or
    sell copies of the Software, and to permit persons to whom the Software is
    furnished to do so, subject to the following conditions:

    The above copyright notice and this permission notice shall be included in
    all copies or substantial portions of the Software.

    THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
    IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
    FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
    AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
    LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
    FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS
    IN THE SOFTWARE.

Mocha and Expect
----------------

Mocha and Expect are included with this repository for convenience. Both
libraries are distributed by their original authors under the MIT license.
Each library contains the full license text and original copyright notice.

Contributors
============

Style Guide
-----------

This library needs to be not only cross-platform compatible but also backwards
compatible as much as possible when it comes to browser environments. For this
reason, all code in this repository must validate with JSLint.

Testing
-------

Test coverage is essential to backing up the claim that this library is
compatible across all JavaScript environments. Unit tests are this repository's
guarantee that all components function as advertised in the environment. For
this reason, all code this repository must be tested using the chosen unit
testing library: Mocha.js. The chosen assertion library to use with Mocha
for this project is Expect.js. Mocha and Expect have been chosen for their
cross-platform compatibility.

For convenience and portability, both Mocha and Express are included in this
repository. For further convenience, browser based test runners have also been
included for both <script> and AMD loading.

Commit Messages
---------------

All commit messages in this repository should conform with the commit message
pattern detailed in
`this document <https://github.com/StandardsDriven/Repository>`_.

Contributor's Agreement
-----------------------

All contribution to this project are protected by the contributors agreement
detailed in the CONTRIBUTING file. All contributors should read the file before
contributing, but as a summary::

    You give us the rights to distribute your code and we promise to maintain
    an open source release of anything you contribute.
