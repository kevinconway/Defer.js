/*jslint node: true, indent: 2, passfail: true */
/*globals describe, it */

(function (context, generator) {
  "use strict";

  generator.call(
    context,
    'tests/deferjs',
    ['expect', 'deferjs'],
    function (expect, defer) {

      describe('The Defer library', function () {

        it('loads in the current environment', function () {

          expect(defer).to.be.ok();

        });

        it('exposes a specification compliant interface', function () {

          expect(typeof defer).to.be("function");

        });

        it('triggers async execution of functions', function (done) {

          var test_object = {};

          expect(test_object.test).to.be(undefined);

          defer(function () {
            test_object.test = true;

            expect(test_object.test).to.be(true);

            done();
          });

          expect(test_object.test).to.be(undefined);

        });

      });

    }
  );

}(this, (function (context) {
  "use strict";

  // Ignoring the unused "name" in the Node.js definition function.
  /*jslint unparam: true */
  if (typeof require === "function" &&
        module !== undefined &&
        !!module.exports) {

    // If this module is loaded in Node, require each of the
    // dependencies and pass them along.
    return function (name, deps, mod) {

      var x,
        dep_list = [];

      for (x = 0; x < deps.length; x = x + 1) {

        dep_list.push(require(deps[x]));

      }

      module.exports = mod.apply(context, dep_list);

    };

  }
  /*jslint unparam: false */

  if (context.window !== undefined) {

    // If this module is being used in a browser environment first
    // generate a list of dependencies, run the provided definition
    // function with the list of dependencies, and insert the returned
    // object into the global namespace using the provided module name.
    return function (name, deps, mod) {

      var namespaces = name.split('/'),
        root = context,
        dep_list = [],
        current_scope,
        current_dep,
        i,
        x;

      for (i = 0; i < deps.length; i = i + 1) {

        current_scope = root;
        current_dep = deps[i].split('/');

        for (x = 0; x < current_dep.length; x = x + 1) {

          current_scope = current_scope[current_dep[x]] =
                          current_scope[current_dep[x]] || {};

        }

        dep_list.push(current_scope);

      }

      current_scope = root;
      for (i = 1; i < namespaces.length; i = i + 1) {

        current_scope = current_scope[namespaces[i - 1]] =
                        current_scope[namespaces[i - 1]] || {};

      }

      current_scope[namespaces[i - 1]] = mod.apply(context, dep_list);

    };

  }

  throw new Error("Unrecognized environment.");

}(this))));
