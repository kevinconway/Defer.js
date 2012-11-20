/*
The MIT License (MIT)
Copyright (c) 2012 Kevin Conway

Permission is hereby granted, free of charge, to any person obtaining a copy of
this software and associated documentation files (the "Software"), to deal in
the Software without restriction, including without limitation the rights to
use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies
of the Software, and to permit persons to whom the Software is furnished to do
so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
*/

/*global require, define, module, process, window, setTimeout

*/
(function (factory) {
    "use strict";

    var env = factory.env,
        def = factory.def,
        deps = {
            amd: [],
            node: [],
            browser: []
        };

    def.call(this, 'defer', deps[env], function () {

        var defer;

        // The defer method becomes whichever method for function
        // deferrence is a best fit for the current environment.
        //
        // Currently defer resolves to `process.nextTick` in Node.js.
        // It resolves to wrapper around `window.postMessage` in the browser.
        // it resolves to `setTimeout` when no other options is available.
        defer = (function () {

            if (process !== undefined && !!process.nextTick) {

                return process.nextTick;

            }

            if (window !== undefined) {

                // window.postMessage is refered to quite a bit in articles
                // discussing a potential `setZeroTimeout` for browsers. The
                // problem it attempts to solve is that `setTimeout` has a
                // minimum wait time in all browsers. This means your function
                // is not scheduled to run on the next cycle of the event loop
                // but, rather, at the next cycle of the event loop after the
                // timeout has passed.
                //
                // Instead, this method a message passing features that has
                // been integrated into modern browsers to replicate the
                // functionality of process.nextTick.
                if (!!window.postMessage) {

                    return (function () {

                        var queue = [],
                            message = "nextTick",
                            handle = function (event) {

                                if (event.source === window &&
                                        event.data === message) {

                                    if (!!event.stopPropogation) {

                                        event.stopPropogation();

                                    }

                                    if (queue.length > 0) {

                                        queue.shift()();

                                    }

                                }

                            };

                        if (!!window.addEventListener) {

                            window.addEventListener("message", handle, true);

                        } else {

                            window.attachEvent("onmessage", handle);

                        }

                        return function (fn) {

                            queue.push(fn);
                            window.postMessage(message, '*');

                        };

                    }.call(this));

                }

                // Try as I might, I could not find a process for deferring
                // function execution in legacy browsers without using
                // `setTimeout`. If you know of a way to trigger asynchronous
                // actions in legacy browsers then I would love to hear it.
                return function (fn) {

                    setTimeout(fn, 0);

                };

            }

            throw new Error("Unsupported environment for async events.");

        }.call(this));


        return defer;

    });

}.call(this, (function () {
    "use strict";

    var currentEnvironment,
        generator;

    // Check the environment to determine the dependency management strategy.

    if (typeof define === "function" && !!define.amd) {

        currentEnvironment = 'amd';

    } else if (typeof require === "function" &&
                        module !== undefined && !!module.exports) {

        currentEnvironment = 'node';

    } else if (this.window !== undefined) {

        currentEnvironment = 'browser';

    }

    generator = (function () {
        switch (currentEnvironment) {

        case 'amd':

            // If RequireJS is used to load this module then return the global
            // define() function.
            return function (name, deps, mod) {
                define(deps, mod);
            };

        case 'node':

            // If this module is loaded in Node, require each of the
            // dependencies and pass them along.
            return function (name, deps, mod) {

                var x,
                    dep_list = [];

                for (x = 0; x < deps.length; x = x + 1) {

                    dep_list.push(require(deps[x]));

                }

                module.exports = mod.apply(this, dep_list);

            };

        case 'browser':

            // If this module is being used in a browser environment first
            // generate a list of dependencies, run the provided definition
            // function with the list of dependencies, and insert the returned
            // object into the global namespace using the provided module name.
            return function (name, deps, mod) {

                var namespaces = name.split('/'),
                    root = this,
                    dep_list = [],
                    current_scope,
                    current_dep,
                    i,
                    x;

                for (i = 0; i < deps.length; i = i + 1) {

                    current_scope = root;
                    current_dep = deps[i].split('/');

                    for (x = 0; x < current_dep.length; x = x + 1) {

                        current_scope = current_scope[current_dep[x]] || {};

                    }

                    dep_list.push(current_scope);

                }

                current_scope = root;
                for (i = 1; i < namespaces.length; i = i + 1) {

                    current_scope = current_scope[namespaces[i - 1]] || {};

                }

                current_scope[namespaces[i - 1]] = mod.apply(this, dep_list);

            };

        default:
            throw new Error("Unrecognized environment.");

        }

    }.call());


    return {
        env: currentEnvironment,
        def: generator
    };

}.call(this))));
