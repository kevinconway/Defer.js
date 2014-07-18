/*
The MIT License (MIT)
Copyright (c) 2013 Kevin Conway

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

/*jslint node: true, browser: true, indent: 2, passfail: true */

module.exports = (function (context) {
  "use strict";

  var defer;

  // The defer method becomes whichever method for function
  // deferrence is a best fit for the current environment.
  //
  // Currently defer resolves to setImmediate in modern Node.js and
  // process.nextTick in legacy Node.js.
  // It resolves to wrapper around `window.postMessage` in a modern
  // browser and setTimeout in legacy browsers.
  defer = (function () {

    try {

      return setImmediate;

    } catch (err) {

      try {

        return process.nextTick;

        // If process.nextTick does not exist, a ReferenceError is thrown.
        // The next step is to try the window.postMessage method.
      } catch (exc) {

        // window.postMessage is refered to quite a bit in articles
        // discussing a potential setZeroTimeout for browsers. The
        // problem it attempts to solve is that setTimeout has a
        // minimum wait time in all browsers. This means your function
        // is not scheduled to run on the next cycle of the event loop
        // but, rather, at the next cycle of the event loop after the
        // timeout has passed.
        //
        // Instead, this method uses a message passing features that
        // has been integrated into modern browsers to replicate the
        // functionality of process.nextTick.
        if (!!context.window && !!context.window.postMessage) {

          return (function (ctx) {

            var queue = [],
              message = "nextTick",
              handle = function (event) {

                if (event.source === ctx.window &&
                      event.data === message) {

                  if (!!event.stopPropogation) {

                    event.stopPropogation();

                  }

                  if (queue.length > 0) {

                    queue.shift()();

                  }

                }

              };

            if (!!ctx.window.addEventListener) {

              ctx.window.addEventListener(
                "message",
                handle,
                true
              );

            } else {

              ctx.window.attachEvent("onmessage", handle);

            }

            return function defer(fn) {

              queue.push(fn);
              ctx.window.postMessage(message, '*');

            };

          }(context));

        }

        // Try as I might, I could not find a process for deferring
        // function execution in legacy browsers without using
        // `setTimeout`. If you know of a way to trigger asynchronous
        // actions in legacy browsers then I would love to hear it.
        return function defer(fn) {

          setTimeout(fn, 0);

        };

      }

    }

  }());

  defer.bind = function bind(fn, ctx) {

    var boundArgs;

    if (!!Function.prototype.bind) {

      boundArgs = Array.prototype.slice.call(arguments, 1);
      return Function.prototype.bind.apply(fn, boundArgs);

    }

    boundArgs = Array.prototype.slice.call(arguments, 2);

    return function () {

      var unboundArgs = Array.prototype.slice.call(arguments);
      return fn.apply(ctx, boundArgs.concat(unboundArgs));

    };

  };

  defer.defer = defer;

  return defer;
}(this));
