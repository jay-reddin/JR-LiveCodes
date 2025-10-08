var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// node_modules/prismjs/prism.js
var require_prism = __commonJS({
  "node_modules/prismjs/prism.js"(exports, module) {
    var _self = typeof window !== "undefined" ? window : typeof WorkerGlobalScope !== "undefined" && self instanceof WorkerGlobalScope ? self : {};
    var Prism2 = function(_self2) {
      var lang = /(?:^|\s)lang(?:uage)?-([\w-]+)(?=\s|$)/i;
      var uniqueId = 0;
      var plainTextGrammar = {};
      var _ = {
        /**
         * By default, Prism will attempt to highlight all code elements (by calling {@link Prism.highlightAll}) on the
         * current page after the page finished loading. This might be a problem if e.g. you wanted to asynchronously load
         * additional languages or plugins yourself.
         *
         * By setting this value to `true`, Prism will not automatically highlight all code elements on the page.
         *
         * You obviously have to change this value before the automatic highlighting started. To do this, you can add an
         * empty Prism object into the global scope before loading the Prism script like this:
         *
         * ```js
         * window.Prism = window.Prism || {};
         * Prism.manual = true;
         * // add a new <script> to load Prism's script
         * ```
         *
         * @default false
         * @type {boolean}
         * @memberof Prism
         * @public
         */
        manual: _self2.Prism && _self2.Prism.manual,
        /**
         * By default, if Prism is in a web worker, it assumes that it is in a worker it created itself, so it uses
         * `addEventListener` to communicate with its parent instance. However, if you're using Prism manually in your
         * own worker, you don't want it to do this.
         *
         * By setting this value to `true`, Prism will not add its own listeners to the worker.
         *
         * You obviously have to change this value before Prism executes. To do this, you can add an
         * empty Prism object into the global scope before loading the Prism script like this:
         *
         * ```js
         * window.Prism = window.Prism || {};
         * Prism.disableWorkerMessageHandler = true;
         * // Load Prism's script
         * ```
         *
         * @default false
         * @type {boolean}
         * @memberof Prism
         * @public
         */
        disableWorkerMessageHandler: _self2.Prism && _self2.Prism.disableWorkerMessageHandler,
        /**
         * A namespace for utility methods.
         *
         * All function in this namespace that are not explicitly marked as _public_ are for __internal use only__ and may
         * change or disappear at any time.
         *
         * @namespace
         * @memberof Prism
         */
        util: {
          encode: function encode(tokens) {
            if (tokens instanceof Token) {
              return new Token(tokens.type, encode(tokens.content), tokens.alias);
            } else if (Array.isArray(tokens)) {
              return tokens.map(encode);
            } else {
              return tokens.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/\u00a0/g, " ");
            }
          },
          /**
           * Returns the name of the type of the given value.
           *
           * @param {any} o
           * @returns {string}
           * @example
           * type(null)      === 'Null'
           * type(undefined) === 'Undefined'
           * type(123)       === 'Number'
           * type('foo')     === 'String'
           * type(true)      === 'Boolean'
           * type([1, 2])    === 'Array'
           * type({})        === 'Object'
           * type(String)    === 'Function'
           * type(/abc+/)    === 'RegExp'
           */
          type: function(o) {
            return Object.prototype.toString.call(o).slice(8, -1);
          },
          /**
           * Returns a unique number for the given object. Later calls will still return the same number.
           *
           * @param {Object} obj
           * @returns {number}
           */
          objId: function(obj) {
            if (!obj["__id"]) {
              Object.defineProperty(obj, "__id", { value: ++uniqueId });
            }
            return obj["__id"];
          },
          /**
           * Creates a deep clone of the given object.
           *
           * The main intended use of this function is to clone language definitions.
           *
           * @param {T} o
           * @param {Record<number, any>} [visited]
           * @returns {T}
           * @template T
           */
          clone: function deepClone(o, visited) {
            visited = visited || {};
            var clone;
            var id;
            switch (_.util.type(o)) {
              case "Object":
                id = _.util.objId(o);
                if (visited[id]) {
                  return visited[id];
                }
                clone = /** @type {Record<string, any>} */
                {};
                visited[id] = clone;
                for (var key in o) {
                  if (o.hasOwnProperty(key)) {
                    clone[key] = deepClone(o[key], visited);
                  }
                }
                return (
                  /** @type {any} */
                  clone
                );
              case "Array":
                id = _.util.objId(o);
                if (visited[id]) {
                  return visited[id];
                }
                clone = [];
                visited[id] = clone;
                /** @type {Array} */
                /** @type {any} */
                o.forEach(function(v, i) {
                  clone[i] = deepClone(v, visited);
                });
                return (
                  /** @type {any} */
                  clone
                );
              default:
                return o;
            }
          },
          /**
           * Returns the Prism language of the given element set by a `language-xxxx` or `lang-xxxx` class.
           *
           * If no language is set for the element or the element is `null` or `undefined`, `none` will be returned.
           *
           * @param {Element} element
           * @returns {string}
           */
          getLanguage: function(element) {
            while (element) {
              var m = lang.exec(element.className);
              if (m) {
                return m[1].toLowerCase();
              }
              element = element.parentElement;
            }
            return "none";
          },
          /**
           * Sets the Prism `language-xxxx` class of the given element.
           *
           * @param {Element} element
           * @param {string} language
           * @returns {void}
           */
          setLanguage: function(element, language) {
            element.className = element.className.replace(RegExp(lang, "gi"), "");
            element.classList.add("language-" + language);
          },
          /**
           * Returns the script element that is currently executing.
           *
           * This does __not__ work for line script element.
           *
           * @returns {HTMLScriptElement | null}
           */
          currentScript: function() {
            if (typeof document === "undefined") {
              return null;
            }
            if ("currentScript" in document && 1 < 2) {
              return (
                /** @type {any} */
                document.currentScript
              );
            }
            try {
              throw new Error();
            } catch (err) {
              var src = (/at [^(\r\n]*\((.*):[^:]+:[^:]+\)$/i.exec(err.stack) || [])[1];
              if (src) {
                var scripts = document.getElementsByTagName("script");
                for (var i in scripts) {
                  if (scripts[i].src == src) {
                    return scripts[i];
                  }
                }
              }
              return null;
            }
          },
          /**
           * Returns whether a given class is active for `element`.
           *
           * The class can be activated if `element` or one of its ancestors has the given class and it can be deactivated
           * if `element` or one of its ancestors has the negated version of the given class. The _negated version_ of the
           * given class is just the given class with a `no-` prefix.
           *
           * Whether the class is active is determined by the closest ancestor of `element` (where `element` itself is
           * closest ancestor) that has the given class or the negated version of it. If neither `element` nor any of its
           * ancestors have the given class or the negated version of it, then the default activation will be returned.
           *
           * In the paradoxical situation where the closest ancestor contains __both__ the given class and the negated
           * version of it, the class is considered active.
           *
           * @param {Element} element
           * @param {string} className
           * @param {boolean} [defaultActivation=false]
           * @returns {boolean}
           */
          isActive: function(element, className, defaultActivation) {
            var no = "no-" + className;
            while (element) {
              var classList = element.classList;
              if (classList.contains(className)) {
                return true;
              }
              if (classList.contains(no)) {
                return false;
              }
              element = element.parentElement;
            }
            return !!defaultActivation;
          }
        },
        /**
         * This namespace contains all currently loaded languages and the some helper functions to create and modify languages.
         *
         * @namespace
         * @memberof Prism
         * @public
         */
        languages: {
          /**
           * The grammar for plain, unformatted text.
           */
          plain: plainTextGrammar,
          plaintext: plainTextGrammar,
          text: plainTextGrammar,
          txt: plainTextGrammar,
          /**
           * Creates a deep copy of the language with the given id and appends the given tokens.
           *
           * If a token in `redef` also appears in the copied language, then the existing token in the copied language
           * will be overwritten at its original position.
           *
           * ## Best practices
           *
           * Since the position of overwriting tokens (token in `redef` that overwrite tokens in the copied language)
           * doesn't matter, they can technically be in any order. However, this can be confusing to others that trying to
           * understand the language definition because, normally, the order of tokens matters in Prism grammars.
           *
           * Therefore, it is encouraged to order overwriting tokens according to the positions of the overwritten tokens.
           * Furthermore, all non-overwriting tokens should be placed after the overwriting ones.
           *
           * @param {string} id The id of the language to extend. This has to be a key in `Prism.languages`.
           * @param {Grammar} redef The new tokens to append.
           * @returns {Grammar} The new language created.
           * @public
           * @example
           * Prism.languages['css-with-colors'] = Prism.languages.extend('css', {
           *     // Prism.languages.css already has a 'comment' token, so this token will overwrite CSS' 'comment' token
           *     // at its original position
           *     'comment': { ... },
           *     // CSS doesn't have a 'color' token, so this token will be appended
           *     'color': /\b(?:red|green|blue)\b/
           * });
           */
          extend: function(id, redef) {
            var lang2 = _.util.clone(_.languages[id]);
            for (var key in redef) {
              lang2[key] = redef[key];
            }
            return lang2;
          },
          /**
           * Inserts tokens _before_ another token in a language definition or any other grammar.
           *
           * ## Usage
           *
           * This helper method makes it easy to modify existing languages. For example, the CSS language definition
           * not only defines CSS highlighting for CSS documents, but also needs to define highlighting for CSS embedded
           * in HTML through `<style>` elements. To do this, it needs to modify `Prism.languages.markup` and add the
           * appropriate tokens. However, `Prism.languages.markup` is a regular JavaScript object literal, so if you do
           * this:
           *
           * ```js
           * Prism.languages.markup.style = {
           *     // token
           * };
           * ```
           *
           * then the `style` token will be added (and processed) at the end. `insertBefore` allows you to insert tokens
           * before existing tokens. For the CSS example above, you would use it like this:
           *
           * ```js
           * Prism.languages.insertBefore('markup', 'cdata', {
           *     'style': {
           *         // token
           *     }
           * });
           * ```
           *
           * ## Special cases
           *
           * If the grammars of `inside` and `insert` have tokens with the same name, the tokens in `inside`'s grammar
           * will be ignored.
           *
           * This behavior can be used to insert tokens after `before`:
           *
           * ```js
           * Prism.languages.insertBefore('markup', 'comment', {
           *     'comment': Prism.languages.markup.comment,
           *     // tokens after 'comment'
           * });
           * ```
           *
           * ## Limitations
           *
           * The main problem `insertBefore` has to solve is iteration order. Since ES2015, the iteration order for object
           * properties is guaranteed to be the insertion order (except for integer keys) but some browsers behave
           * differently when keys are deleted and re-inserted. So `insertBefore` can't be implemented by temporarily
           * deleting properties which is necessary to insert at arbitrary positions.
           *
           * To solve this problem, `insertBefore` doesn't actually insert the given tokens into the target object.
           * Instead, it will create a new object and replace all references to the target object with the new one. This
           * can be done without temporarily deleting properties, so the iteration order is well-defined.
           *
           * However, only references that can be reached from `Prism.languages` or `insert` will be replaced. I.e. if
           * you hold the target object in a variable, then the value of the variable will not change.
           *
           * ```js
           * var oldMarkup = Prism.languages.markup;
           * var newMarkup = Prism.languages.insertBefore('markup', 'comment', { ... });
           *
           * assert(oldMarkup !== Prism.languages.markup);
           * assert(newMarkup === Prism.languages.markup);
           * ```
           *
           * @param {string} inside The property of `root` (e.g. a language id in `Prism.languages`) that contains the
           * object to be modified.
           * @param {string} before The key to insert before.
           * @param {Grammar} insert An object containing the key-value pairs to be inserted.
           * @param {Object<string, any>} [root] The object containing `inside`, i.e. the object that contains the
           * object to be modified.
           *
           * Defaults to `Prism.languages`.
           * @returns {Grammar} The new grammar object.
           * @public
           */
          insertBefore: function(inside, before, insert, root) {
            root = root || /** @type {any} */
            _.languages;
            var grammar = root[inside];
            var ret = {};
            for (var token in grammar) {
              if (grammar.hasOwnProperty(token)) {
                if (token == before) {
                  for (var newToken in insert) {
                    if (insert.hasOwnProperty(newToken)) {
                      ret[newToken] = insert[newToken];
                    }
                  }
                }
                if (!insert.hasOwnProperty(token)) {
                  ret[token] = grammar[token];
                }
              }
            }
            var old = root[inside];
            root[inside] = ret;
            _.languages.DFS(_.languages, function(key, value) {
              if (value === old && key != inside) {
                this[key] = ret;
              }
            });
            return ret;
          },
          // Traverse a language definition with Depth First Search
          DFS: function DFS(o, callback, type, visited) {
            visited = visited || {};
            var objId = _.util.objId;
            for (var i in o) {
              if (o.hasOwnProperty(i)) {
                callback.call(o, i, o[i], type || i);
                var property = o[i];
                var propertyType = _.util.type(property);
                if (propertyType === "Object" && !visited[objId(property)]) {
                  visited[objId(property)] = true;
                  DFS(property, callback, null, visited);
                } else if (propertyType === "Array" && !visited[objId(property)]) {
                  visited[objId(property)] = true;
                  DFS(property, callback, i, visited);
                }
              }
            }
          }
        },
        plugins: {},
        /**
         * This is the most high-level function in Prism’s API.
         * It fetches all the elements that have a `.language-xxxx` class and then calls {@link Prism.highlightElement} on
         * each one of them.
         *
         * This is equivalent to `Prism.highlightAllUnder(document, async, callback)`.
         *
         * @param {boolean} [async=false] Same as in {@link Prism.highlightAllUnder}.
         * @param {HighlightCallback} [callback] Same as in {@link Prism.highlightAllUnder}.
         * @memberof Prism
         * @public
         */
        highlightAll: function(async, callback) {
          _.highlightAllUnder(document, async, callback);
        },
        /**
         * Fetches all the descendants of `container` that have a `.language-xxxx` class and then calls
         * {@link Prism.highlightElement} on each one of them.
         *
         * The following hooks will be run:
         * 1. `before-highlightall`
         * 2. `before-all-elements-highlight`
         * 3. All hooks of {@link Prism.highlightElement} for each element.
         *
         * @param {ParentNode} container The root element, whose descendants that have a `.language-xxxx` class will be highlighted.
         * @param {boolean} [async=false] Whether each element is to be highlighted asynchronously using Web Workers.
         * @param {HighlightCallback} [callback] An optional callback to be invoked on each element after its highlighting is done.
         * @memberof Prism
         * @public
         */
        highlightAllUnder: function(container, async, callback) {
          var env = {
            callback,
            container,
            selector: 'code[class*="language-"], [class*="language-"] code, code[class*="lang-"], [class*="lang-"] code'
          };
          _.hooks.run("before-highlightall", env);
          env.elements = Array.prototype.slice.apply(env.container.querySelectorAll(env.selector));
          _.hooks.run("before-all-elements-highlight", env);
          for (var i = 0, element; element = env.elements[i++]; ) {
            _.highlightElement(element, async === true, env.callback);
          }
        },
        /**
         * Highlights the code inside a single element.
         *
         * The following hooks will be run:
         * 1. `before-sanity-check`
         * 2. `before-highlight`
         * 3. All hooks of {@link Prism.highlight}. These hooks will be run by an asynchronous worker if `async` is `true`.
         * 4. `before-insert`
         * 5. `after-highlight`
         * 6. `complete`
         *
         * Some the above hooks will be skipped if the element doesn't contain any text or there is no grammar loaded for
         * the element's language.
         *
         * @param {Element} element The element containing the code.
         * It must have a class of `language-xxxx` to be processed, where `xxxx` is a valid language identifier.
         * @param {boolean} [async=false] Whether the element is to be highlighted asynchronously using Web Workers
         * to improve performance and avoid blocking the UI when highlighting very large chunks of code. This option is
         * [disabled by default](https://prismjs.com/faq.html#why-is-asynchronous-highlighting-disabled-by-default).
         *
         * Note: All language definitions required to highlight the code must be included in the main `prism.js` file for
         * asynchronous highlighting to work. You can build your own bundle on the
         * [Download page](https://prismjs.com/download.html).
         * @param {HighlightCallback} [callback] An optional callback to be invoked after the highlighting is done.
         * Mostly useful when `async` is `true`, since in that case, the highlighting is done asynchronously.
         * @memberof Prism
         * @public
         */
        highlightElement: function(element, async, callback) {
          var language = _.util.getLanguage(element);
          var grammar = _.languages[language];
          _.util.setLanguage(element, language);
          var parent = element.parentElement;
          if (parent && parent.nodeName.toLowerCase() === "pre") {
            _.util.setLanguage(parent, language);
          }
          var code = element.textContent;
          var env = {
            element,
            language,
            grammar,
            code
          };
          function insertHighlightedCode(highlightedCode) {
            env.highlightedCode = highlightedCode;
            _.hooks.run("before-insert", env);
            env.element.innerHTML = env.highlightedCode;
            _.hooks.run("after-highlight", env);
            _.hooks.run("complete", env);
            callback && callback.call(env.element);
          }
          _.hooks.run("before-sanity-check", env);
          parent = env.element.parentElement;
          if (parent && parent.nodeName.toLowerCase() === "pre" && !parent.hasAttribute("tabindex")) {
            parent.setAttribute("tabindex", "0");
          }
          if (!env.code) {
            _.hooks.run("complete", env);
            callback && callback.call(env.element);
            return;
          }
          _.hooks.run("before-highlight", env);
          if (!env.grammar) {
            insertHighlightedCode(_.util.encode(env.code));
            return;
          }
          if (async && _self2.Worker) {
            var worker = new Worker(_.filename);
            worker.onmessage = function(evt) {
              insertHighlightedCode(evt.data);
            };
            worker.postMessage(JSON.stringify({
              language: env.language,
              code: env.code,
              immediateClose: true
            }));
          } else {
            insertHighlightedCode(_.highlight(env.code, env.grammar, env.language));
          }
        },
        /**
         * Low-level function, only use if you know what you’re doing. It accepts a string of text as input
         * and the language definitions to use, and returns a string with the HTML produced.
         *
         * The following hooks will be run:
         * 1. `before-tokenize`
         * 2. `after-tokenize`
         * 3. `wrap`: On each {@link Token}.
         *
         * @param {string} text A string with the code to be highlighted.
         * @param {Grammar} grammar An object containing the tokens to use.
         *
         * Usually a language definition like `Prism.languages.markup`.
         * @param {string} language The name of the language definition passed to `grammar`.
         * @returns {string} The highlighted HTML.
         * @memberof Prism
         * @public
         * @example
         * Prism.highlight('var foo = true;', Prism.languages.javascript, 'javascript');
         */
        highlight: function(text, grammar, language) {
          var env = {
            code: text,
            grammar,
            language
          };
          _.hooks.run("before-tokenize", env);
          if (!env.grammar) {
            throw new Error('The language "' + env.language + '" has no grammar.');
          }
          env.tokens = _.tokenize(env.code, env.grammar);
          _.hooks.run("after-tokenize", env);
          return Token.stringify(_.util.encode(env.tokens), env.language);
        },
        /**
         * This is the heart of Prism, and the most low-level function you can use. It accepts a string of text as input
         * and the language definitions to use, and returns an array with the tokenized code.
         *
         * When the language definition includes nested tokens, the function is called recursively on each of these tokens.
         *
         * This method could be useful in other contexts as well, as a very crude parser.
         *
         * @param {string} text A string with the code to be highlighted.
         * @param {Grammar} grammar An object containing the tokens to use.
         *
         * Usually a language definition like `Prism.languages.markup`.
         * @returns {TokenStream} An array of strings and tokens, a token stream.
         * @memberof Prism
         * @public
         * @example
         * let code = `var foo = 0;`;
         * let tokens = Prism.tokenize(code, Prism.languages.javascript);
         * tokens.forEach(token => {
         *     if (token instanceof Prism.Token && token.type === 'number') {
         *         console.log(`Found numeric literal: ${token.content}`);
         *     }
         * });
         */
        tokenize: function(text, grammar) {
          var rest = grammar.rest;
          if (rest) {
            for (var token in rest) {
              grammar[token] = rest[token];
            }
            delete grammar.rest;
          }
          var tokenList = new LinkedList();
          addAfter(tokenList, tokenList.head, text);
          matchGrammar(text, tokenList, grammar, tokenList.head, 0);
          return toArray(tokenList);
        },
        /**
         * @namespace
         * @memberof Prism
         * @public
         */
        hooks: {
          all: {},
          /**
           * Adds the given callback to the list of callbacks for the given hook.
           *
           * The callback will be invoked when the hook it is registered for is run.
           * Hooks are usually directly run by a highlight function but you can also run hooks yourself.
           *
           * One callback function can be registered to multiple hooks and the same hook multiple times.
           *
           * @param {string} name The name of the hook.
           * @param {HookCallback} callback The callback function which is given environment variables.
           * @public
           */
          add: function(name, callback) {
            var hooks = _.hooks.all;
            hooks[name] = hooks[name] || [];
            hooks[name].push(callback);
          },
          /**
           * Runs a hook invoking all registered callbacks with the given environment variables.
           *
           * Callbacks will be invoked synchronously and in the order in which they were registered.
           *
           * @param {string} name The name of the hook.
           * @param {Object<string, any>} env The environment variables of the hook passed to all callbacks registered.
           * @public
           */
          run: function(name, env) {
            var callbacks = _.hooks.all[name];
            if (!callbacks || !callbacks.length) {
              return;
            }
            for (var i = 0, callback; callback = callbacks[i++]; ) {
              callback(env);
            }
          }
        },
        Token
      };
      _self2.Prism = _;
      function Token(type, content, alias, matchedStr) {
        this.type = type;
        this.content = content;
        this.alias = alias;
        this.length = (matchedStr || "").length | 0;
      }
      Token.stringify = function stringify(o, language) {
        if (typeof o == "string") {
          return o;
        }
        if (Array.isArray(o)) {
          var s = "";
          o.forEach(function(e) {
            s += stringify(e, language);
          });
          return s;
        }
        var env = {
          type: o.type,
          content: stringify(o.content, language),
          tag: "span",
          classes: ["token", o.type],
          attributes: {},
          language
        };
        var aliases = o.alias;
        if (aliases) {
          if (Array.isArray(aliases)) {
            Array.prototype.push.apply(env.classes, aliases);
          } else {
            env.classes.push(aliases);
          }
        }
        _.hooks.run("wrap", env);
        var attributes = "";
        for (var name in env.attributes) {
          attributes += " " + name + '="' + (env.attributes[name] || "").replace(/"/g, "&quot;") + '"';
        }
        return "<" + env.tag + ' class="' + env.classes.join(" ") + '"' + attributes + ">" + env.content + "</" + env.tag + ">";
      };
      function matchPattern(pattern, pos, text, lookbehind) {
        pattern.lastIndex = pos;
        var match = pattern.exec(text);
        if (match && lookbehind && match[1]) {
          var lookbehindLength = match[1].length;
          match.index += lookbehindLength;
          match[0] = match[0].slice(lookbehindLength);
        }
        return match;
      }
      function matchGrammar(text, tokenList, grammar, startNode, startPos, rematch) {
        for (var token in grammar) {
          if (!grammar.hasOwnProperty(token) || !grammar[token]) {
            continue;
          }
          var patterns = grammar[token];
          patterns = Array.isArray(patterns) ? patterns : [patterns];
          for (var j = 0; j < patterns.length; ++j) {
            if (rematch && rematch.cause == token + "," + j) {
              return;
            }
            var patternObj = patterns[j];
            var inside = patternObj.inside;
            var lookbehind = !!patternObj.lookbehind;
            var greedy = !!patternObj.greedy;
            var alias = patternObj.alias;
            if (greedy && !patternObj.pattern.global) {
              var flags = patternObj.pattern.toString().match(/[imsuy]*$/)[0];
              patternObj.pattern = RegExp(patternObj.pattern.source, flags + "g");
            }
            var pattern = patternObj.pattern || patternObj;
            for (var currentNode = startNode.next, pos = startPos; currentNode !== tokenList.tail; pos += currentNode.value.length, currentNode = currentNode.next) {
              if (rematch && pos >= rematch.reach) {
                break;
              }
              var str = currentNode.value;
              if (tokenList.length > text.length) {
                return;
              }
              if (str instanceof Token) {
                continue;
              }
              var removeCount = 1;
              var match;
              if (greedy) {
                match = matchPattern(pattern, pos, text, lookbehind);
                if (!match || match.index >= text.length) {
                  break;
                }
                var from = match.index;
                var to = match.index + match[0].length;
                var p = pos;
                p += currentNode.value.length;
                while (from >= p) {
                  currentNode = currentNode.next;
                  p += currentNode.value.length;
                }
                p -= currentNode.value.length;
                pos = p;
                if (currentNode.value instanceof Token) {
                  continue;
                }
                for (var k = currentNode; k !== tokenList.tail && (p < to || typeof k.value === "string"); k = k.next) {
                  removeCount++;
                  p += k.value.length;
                }
                removeCount--;
                str = text.slice(pos, p);
                match.index -= pos;
              } else {
                match = matchPattern(pattern, 0, str, lookbehind);
                if (!match) {
                  continue;
                }
              }
              var from = match.index;
              var matchStr = match[0];
              var before = str.slice(0, from);
              var after = str.slice(from + matchStr.length);
              var reach = pos + str.length;
              if (rematch && reach > rematch.reach) {
                rematch.reach = reach;
              }
              var removeFrom = currentNode.prev;
              if (before) {
                removeFrom = addAfter(tokenList, removeFrom, before);
                pos += before.length;
              }
              removeRange(tokenList, removeFrom, removeCount);
              var wrapped = new Token(token, inside ? _.tokenize(matchStr, inside) : matchStr, alias, matchStr);
              currentNode = addAfter(tokenList, removeFrom, wrapped);
              if (after) {
                addAfter(tokenList, currentNode, after);
              }
              if (removeCount > 1) {
                var nestedRematch = {
                  cause: token + "," + j,
                  reach
                };
                matchGrammar(text, tokenList, grammar, currentNode.prev, pos, nestedRematch);
                if (rematch && nestedRematch.reach > rematch.reach) {
                  rematch.reach = nestedRematch.reach;
                }
              }
            }
          }
        }
      }
      function LinkedList() {
        var head = { value: null, prev: null, next: null };
        var tail = { value: null, prev: head, next: null };
        head.next = tail;
        this.head = head;
        this.tail = tail;
        this.length = 0;
      }
      function addAfter(list, node, value) {
        var next = node.next;
        var newNode = { value, prev: node, next };
        node.next = newNode;
        next.prev = newNode;
        list.length++;
        return newNode;
      }
      function removeRange(list, node, count) {
        var next = node.next;
        for (var i = 0; i < count && next !== list.tail; i++) {
          next = next.next;
        }
        node.next = next;
        next.prev = node;
        list.length -= i;
      }
      function toArray(list) {
        var array = [];
        var node = list.head.next;
        while (node !== list.tail) {
          array.push(node.value);
          node = node.next;
        }
        return array;
      }
      if (!_self2.document) {
        if (!_self2.addEventListener) {
          return _;
        }
        if (!_.disableWorkerMessageHandler) {
          _self2.addEventListener("message", function(evt) {
            var message = JSON.parse(evt.data);
            var lang2 = message.language;
            var code = message.code;
            var immediateClose = message.immediateClose;
            _self2.postMessage(_.highlight(code, _.languages[lang2], lang2));
            if (immediateClose) {
              _self2.close();
            }
          }, false);
        }
        return _;
      }
      var script = _.util.currentScript();
      if (script) {
        _.filename = script.src;
        if (script.hasAttribute("data-manual")) {
          _.manual = true;
        }
      }
      function highlightAutomaticallyCallback() {
        if (!_.manual) {
          _.highlightAll();
        }
      }
      if (!_.manual) {
        var readyState = document.readyState;
        if (readyState === "loading" || readyState === "interactive" && script && script.defer) {
          document.addEventListener("DOMContentLoaded", highlightAutomaticallyCallback);
        } else {
          if (window.requestAnimationFrame) {
            window.requestAnimationFrame(highlightAutomaticallyCallback);
          } else {
            window.setTimeout(highlightAutomaticallyCallback, 16);
          }
        }
      }
      return _;
    }(_self);
    if (typeof module !== "undefined" && module.exports) {
      module.exports = Prism2;
    }
    if (typeof global !== "undefined") {
      global.Prism = Prism2;
    }
    Prism2.languages.markup = {
      "comment": {
        pattern: /<!--(?:(?!<!--)[\s\S])*?-->/,
        greedy: true
      },
      "prolog": {
        pattern: /<\?[\s\S]+?\?>/,
        greedy: true
      },
      "doctype": {
        // https://www.w3.org/TR/xml/#NT-doctypedecl
        pattern: /<!DOCTYPE(?:[^>"'[\]]|"[^"]*"|'[^']*')+(?:\[(?:[^<"'\]]|"[^"]*"|'[^']*'|<(?!!--)|<!--(?:[^-]|-(?!->))*-->)*\]\s*)?>/i,
        greedy: true,
        inside: {
          "internal-subset": {
            pattern: /(^[^\[]*\[)[\s\S]+(?=\]>$)/,
            lookbehind: true,
            greedy: true,
            inside: null
            // see below
          },
          "string": {
            pattern: /"[^"]*"|'[^']*'/,
            greedy: true
          },
          "punctuation": /^<!|>$|[[\]]/,
          "doctype-tag": /^DOCTYPE/i,
          "name": /[^\s<>'"]+/
        }
      },
      "cdata": {
        pattern: /<!\[CDATA\[[\s\S]*?\]\]>/i,
        greedy: true
      },
      "tag": {
        pattern: /<\/?(?!\d)[^\s>\/=$<%]+(?:\s(?:\s*[^\s>\/=]+(?:\s*=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+(?=[\s>]))|(?=[\s/>])))+)?\s*\/?>/,
        greedy: true,
        inside: {
          "tag": {
            pattern: /^<\/?[^\s>\/]+/,
            inside: {
              "punctuation": /^<\/?/,
              "namespace": /^[^\s>\/:]+:/
            }
          },
          "special-attr": [],
          "attr-value": {
            pattern: /=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+)/,
            inside: {
              "punctuation": [
                {
                  pattern: /^=/,
                  alias: "attr-equals"
                },
                {
                  pattern: /^(\s*)["']|["']$/,
                  lookbehind: true
                }
              ]
            }
          },
          "punctuation": /\/?>/,
          "attr-name": {
            pattern: /[^\s>\/]+/,
            inside: {
              "namespace": /^[^\s>\/:]+:/
            }
          }
        }
      },
      "entity": [
        {
          pattern: /&[\da-z]{1,8};/i,
          alias: "named-entity"
        },
        /&#x?[\da-f]{1,8};/i
      ]
    };
    Prism2.languages.markup["tag"].inside["attr-value"].inside["entity"] = Prism2.languages.markup["entity"];
    Prism2.languages.markup["doctype"].inside["internal-subset"].inside = Prism2.languages.markup;
    Prism2.hooks.add("wrap", function(env) {
      if (env.type === "entity") {
        env.attributes["title"] = env.content.replace(/&amp;/, "&");
      }
    });
    Object.defineProperty(Prism2.languages.markup.tag, "addInlined", {
      /**
       * Adds an inlined language to markup.
       *
       * An example of an inlined language is CSS with `<style>` tags.
       *
       * @param {string} tagName The name of the tag that contains the inlined language. This name will be treated as
       * case insensitive.
       * @param {string} lang The language key.
       * @example
       * addInlined('style', 'css');
       */
      value: function addInlined2(tagName, lang) {
        var includedCdataInside = {};
        includedCdataInside["language-" + lang] = {
          pattern: /(^<!\[CDATA\[)[\s\S]+?(?=\]\]>$)/i,
          lookbehind: true,
          inside: Prism2.languages[lang]
        };
        includedCdataInside["cdata"] = /^<!\[CDATA\[|\]\]>$/i;
        var inside = {
          "included-cdata": {
            pattern: /<!\[CDATA\[[\s\S]*?\]\]>/i,
            inside: includedCdataInside
          }
        };
        inside["language-" + lang] = {
          pattern: /[\s\S]+/,
          inside: Prism2.languages[lang]
        };
        var def = {};
        def[tagName] = {
          pattern: RegExp(/(<__[^>]*>)(?:<!\[CDATA\[(?:[^\]]|\](?!\]>))*\]\]>|(?!<!\[CDATA\[)[\s\S])*?(?=<\/__>)/.source.replace(/__/g, function() {
            return tagName;
          }), "i"),
          lookbehind: true,
          greedy: true,
          inside
        };
        Prism2.languages.insertBefore("markup", "cdata", def);
      }
    });
    Object.defineProperty(Prism2.languages.markup.tag, "addAttribute", {
      /**
       * Adds an pattern to highlight languages embedded in HTML attributes.
       *
       * An example of an inlined language is CSS with `style` attributes.
       *
       * @param {string} attrName The name of the tag that contains the inlined language. This name will be treated as
       * case insensitive.
       * @param {string} lang The language key.
       * @example
       * addAttribute('style', 'css');
       */
      value: function(attrName, lang) {
        Prism2.languages.markup.tag.inside["special-attr"].push({
          pattern: RegExp(
            /(^|["'\s])/.source + "(?:" + attrName + ")" + /\s*=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+(?=[\s>]))/.source,
            "i"
          ),
          lookbehind: true,
          inside: {
            "attr-name": /^[^\s=]+/,
            "attr-value": {
              pattern: /=[\s\S]+/,
              inside: {
                "value": {
                  pattern: /(^=\s*(["']|(?!["'])))\S[\s\S]*(?=\2$)/,
                  lookbehind: true,
                  alias: [lang, "language-" + lang],
                  inside: Prism2.languages[lang]
                },
                "punctuation": [
                  {
                    pattern: /^=/,
                    alias: "attr-equals"
                  },
                  /"|'/
                ]
              }
            }
          }
        });
      }
    });
    Prism2.languages.html = Prism2.languages.markup;
    Prism2.languages.mathml = Prism2.languages.markup;
    Prism2.languages.svg = Prism2.languages.markup;
    Prism2.languages.xml = Prism2.languages.extend("markup", {});
    Prism2.languages.ssml = Prism2.languages.xml;
    Prism2.languages.atom = Prism2.languages.xml;
    Prism2.languages.rss = Prism2.languages.xml;
    (function(Prism3) {
      var string = /(?:"(?:\\(?:\r\n|[\s\S])|[^"\\\r\n])*"|'(?:\\(?:\r\n|[\s\S])|[^'\\\r\n])*')/;
      Prism3.languages.css = {
        "comment": /\/\*[\s\S]*?\*\//,
        "atrule": {
          pattern: RegExp("@[\\w-](?:" + /[^;{\s"']|\s+(?!\s)/.source + "|" + string.source + ")*?" + /(?:;|(?=\s*\{))/.source),
          inside: {
            "rule": /^@[\w-]+/,
            "selector-function-argument": {
              pattern: /(\bselector\s*\(\s*(?![\s)]))(?:[^()\s]|\s+(?![\s)])|\((?:[^()]|\([^()]*\))*\))+(?=\s*\))/,
              lookbehind: true,
              alias: "selector"
            },
            "keyword": {
              pattern: /(^|[^\w-])(?:and|not|only|or)(?![\w-])/,
              lookbehind: true
            }
            // See rest below
          }
        },
        "url": {
          // https://drafts.csswg.org/css-values-3/#urls
          pattern: RegExp("\\burl\\((?:" + string.source + "|" + /(?:[^\\\r\n()"']|\\[\s\S])*/.source + ")\\)", "i"),
          greedy: true,
          inside: {
            "function": /^url/i,
            "punctuation": /^\(|\)$/,
            "string": {
              pattern: RegExp("^" + string.source + "$"),
              alias: "url"
            }
          }
        },
        "selector": {
          pattern: RegExp(`(^|[{}\\s])[^{}\\s](?:[^{};"'\\s]|\\s+(?![\\s{])|` + string.source + ")*(?=\\s*\\{)"),
          lookbehind: true
        },
        "string": {
          pattern: string,
          greedy: true
        },
        "property": {
          pattern: /(^|[^-\w\xA0-\uFFFF])(?!\s)[-_a-z\xA0-\uFFFF](?:(?!\s)[-\w\xA0-\uFFFF])*(?=\s*:)/i,
          lookbehind: true
        },
        "important": /!important\b/i,
        "function": {
          pattern: /(^|[^-a-z0-9])[-a-z0-9]+(?=\()/i,
          lookbehind: true
        },
        "punctuation": /[(){};:,]/
      };
      Prism3.languages.css["atrule"].inside.rest = Prism3.languages.css;
      var markup = Prism3.languages.markup;
      if (markup) {
        markup.tag.addInlined("style", "css");
        markup.tag.addAttribute("style", "css");
      }
    })(Prism2);
    Prism2.languages.clike = {
      "comment": [
        {
          pattern: /(^|[^\\])\/\*[\s\S]*?(?:\*\/|$)/,
          lookbehind: true,
          greedy: true
        },
        {
          pattern: /(^|[^\\:])\/\/.*/,
          lookbehind: true,
          greedy: true
        }
      ],
      "string": {
        pattern: /(["'])(?:\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1/,
        greedy: true
      },
      "class-name": {
        pattern: /(\b(?:class|extends|implements|instanceof|interface|new|trait)\s+|\bcatch\s+\()[\w.\\]+/i,
        lookbehind: true,
        inside: {
          "punctuation": /[.\\]/
        }
      },
      "keyword": /\b(?:break|catch|continue|do|else|finally|for|function|if|in|instanceof|new|null|return|throw|try|while)\b/,
      "boolean": /\b(?:false|true)\b/,
      "function": /\b\w+(?=\()/,
      "number": /\b0x[\da-f]+\b|(?:\b\d+(?:\.\d*)?|\B\.\d+)(?:e[+-]?\d+)?/i,
      "operator": /[<>]=?|[!=]=?=?|--?|\+\+?|&&?|\|\|?|[?*/~^%]/,
      "punctuation": /[{}[\];(),.:]/
    };
    Prism2.languages.javascript = Prism2.languages.extend("clike", {
      "class-name": [
        Prism2.languages.clike["class-name"],
        {
          pattern: /(^|[^$\w\xA0-\uFFFF])(?!\s)[_$A-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\.(?:constructor|prototype))/,
          lookbehind: true
        }
      ],
      "keyword": [
        {
          pattern: /((?:^|\})\s*)catch\b/,
          lookbehind: true
        },
        {
          pattern: /(^|[^.]|\.\.\.\s*)\b(?:as|assert(?=\s*\{)|async(?=\s*(?:function\b|\(|[$\w\xA0-\uFFFF]|$))|await|break|case|class|const|continue|debugger|default|delete|do|else|enum|export|extends|finally(?=\s*(?:\{|$))|for|from(?=\s*(?:['"]|$))|function|(?:get|set)(?=\s*(?:[#\[$\w\xA0-\uFFFF]|$))|if|implements|import|in|instanceof|interface|let|new|null|of|package|private|protected|public|return|static|super|switch|this|throw|try|typeof|undefined|var|void|while|with|yield)\b/,
          lookbehind: true
        }
      ],
      // Allow for all non-ASCII characters (See http://stackoverflow.com/a/2008444)
      "function": /#?(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*(?:\.\s*(?:apply|bind|call)\s*)?\()/,
      "number": {
        pattern: RegExp(
          /(^|[^\w$])/.source + "(?:" + // constant
          (/NaN|Infinity/.source + "|" + // binary integer
          /0[bB][01]+(?:_[01]+)*n?/.source + "|" + // octal integer
          /0[oO][0-7]+(?:_[0-7]+)*n?/.source + "|" + // hexadecimal integer
          /0[xX][\dA-Fa-f]+(?:_[\dA-Fa-f]+)*n?/.source + "|" + // decimal bigint
          /\d+(?:_\d+)*n/.source + "|" + // decimal number (integer or float) but no bigint
          /(?:\d+(?:_\d+)*(?:\.(?:\d+(?:_\d+)*)?)?|\.\d+(?:_\d+)*)(?:[Ee][+-]?\d+(?:_\d+)*)?/.source) + ")" + /(?![\w$])/.source
        ),
        lookbehind: true
      },
      "operator": /--|\+\+|\*\*=?|=>|&&=?|\|\|=?|[!=]==|<<=?|>>>?=?|[-+*/%&|^!=<>]=?|\.{3}|\?\?=?|\?\.?|[~:]/
    });
    Prism2.languages.javascript["class-name"][0].pattern = /(\b(?:class|extends|implements|instanceof|interface|new)\s+)[\w.\\]+/;
    Prism2.languages.insertBefore("javascript", "keyword", {
      "regex": {
        pattern: RegExp(
          // lookbehind
          // eslint-disable-next-line regexp/no-dupe-characters-character-class
          /((?:^|[^$\w\xA0-\uFFFF."'\])\s]|\b(?:return|yield))\s*)/.source + // Regex pattern:
          // There are 2 regex patterns here. The RegExp set notation proposal added support for nested character
          // classes if the `v` flag is present. Unfortunately, nested CCs are both context-free and incompatible
          // with the only syntax, so we have to define 2 different regex patterns.
          /\//.source + "(?:" + /(?:\[(?:[^\]\\\r\n]|\\.)*\]|\\.|[^/\\\[\r\n])+\/[dgimyus]{0,7}/.source + "|" + // `v` flag syntax. This supports 3 levels of nested character classes.
          /(?:\[(?:[^[\]\\\r\n]|\\.|\[(?:[^[\]\\\r\n]|\\.|\[(?:[^[\]\\\r\n]|\\.)*\])*\])*\]|\\.|[^/\\\[\r\n])+\/[dgimyus]{0,7}v[dgimyus]{0,7}/.source + ")" + // lookahead
          /(?=(?:\s|\/\*(?:[^*]|\*(?!\/))*\*\/)*(?:$|[\r\n,.;:})\]]|\/\/))/.source
        ),
        lookbehind: true,
        greedy: true,
        inside: {
          "regex-source": {
            pattern: /^(\/)[\s\S]+(?=\/[a-z]*$)/,
            lookbehind: true,
            alias: "language-regex",
            inside: Prism2.languages.regex
          },
          "regex-delimiter": /^\/|\/$/,
          "regex-flags": /^[a-z]+$/
        }
      },
      // This must be declared before keyword because we use "function" inside the look-forward
      "function-variable": {
        pattern: /#?(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*[=:]\s*(?:async\s*)?(?:\bfunction\b|(?:\((?:[^()]|\([^()]*\))*\)|(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*)\s*=>))/,
        alias: "function"
      },
      "parameter": [
        {
          pattern: /(function(?:\s+(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*)?\s*\(\s*)(?!\s)(?:[^()\s]|\s+(?![\s)])|\([^()]*\))+(?=\s*\))/,
          lookbehind: true,
          inside: Prism2.languages.javascript
        },
        {
          pattern: /(^|[^$\w\xA0-\uFFFF])(?!\s)[_$a-z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*=>)/i,
          lookbehind: true,
          inside: Prism2.languages.javascript
        },
        {
          pattern: /(\(\s*)(?!\s)(?:[^()\s]|\s+(?![\s)])|\([^()]*\))+(?=\s*\)\s*=>)/,
          lookbehind: true,
          inside: Prism2.languages.javascript
        },
        {
          pattern: /((?:\b|\s|^)(?!(?:as|async|await|break|case|catch|class|const|continue|debugger|default|delete|do|else|enum|export|extends|finally|for|from|function|get|if|implements|import|in|instanceof|interface|let|new|null|of|package|private|protected|public|return|set|static|super|switch|this|throw|try|typeof|undefined|var|void|while|with|yield)(?![$\w\xA0-\uFFFF]))(?:(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*\s*)\(\s*|\]\s*\(\s*)(?!\s)(?:[^()\s]|\s+(?![\s)])|\([^()]*\))+(?=\s*\)\s*\{)/,
          lookbehind: true,
          inside: Prism2.languages.javascript
        }
      ],
      "constant": /\b[A-Z](?:[A-Z_]|\dx?)*\b/
    });
    Prism2.languages.insertBefore("javascript", "string", {
      "hashbang": {
        pattern: /^#!.*/,
        greedy: true,
        alias: "comment"
      },
      "template-string": {
        pattern: /`(?:\\[\s\S]|\$\{(?:[^{}]|\{(?:[^{}]|\{[^}]*\})*\})+\}|(?!\$\{)[^\\`])*`/,
        greedy: true,
        inside: {
          "template-punctuation": {
            pattern: /^`|`$/,
            alias: "string"
          },
          "interpolation": {
            pattern: /((?:^|[^\\])(?:\\{2})*)\$\{(?:[^{}]|\{(?:[^{}]|\{[^}]*\})*\})+\}/,
            lookbehind: true,
            inside: {
              "interpolation-punctuation": {
                pattern: /^\$\{|\}$/,
                alias: "punctuation"
              },
              rest: Prism2.languages.javascript
            }
          },
          "string": /[\s\S]+/
        }
      },
      "string-property": {
        pattern: /((?:^|[,{])[ \t]*)(["'])(?:\\(?:\r\n|[\s\S])|(?!\2)[^\\\r\n])*\2(?=\s*:)/m,
        lookbehind: true,
        greedy: true,
        alias: "property"
      }
    });
    Prism2.languages.insertBefore("javascript", "operator", {
      "literal-property": {
        pattern: /((?:^|[,{])[ \t]*)(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*:)/m,
        lookbehind: true,
        alias: "property"
      }
    });
    if (Prism2.languages.markup) {
      Prism2.languages.markup.tag.addInlined("script", "javascript");
      Prism2.languages.markup.tag.addAttribute(
        /on(?:abort|blur|change|click|composition(?:end|start|update)|dblclick|error|focus(?:in|out)?|key(?:down|up)|load|mouse(?:down|enter|leave|move|out|over|up)|reset|resize|scroll|select|slotchange|submit|unload|wheel)/.source,
        "javascript"
      );
    }
    Prism2.languages.js = Prism2.languages.javascript;
    (function() {
      if (typeof Prism2 === "undefined" || typeof document === "undefined") {
        return;
      }
      if (!Element.prototype.matches) {
        Element.prototype.matches = Element.prototype.msMatchesSelector || Element.prototype.webkitMatchesSelector;
      }
      var LOADING_MESSAGE = "Loading\u2026";
      var FAILURE_MESSAGE = function(status, message) {
        return "\u2716 Error " + status + " while fetching file: " + message;
      };
      var FAILURE_EMPTY_MESSAGE = "\u2716 Error: File does not exist or is empty";
      var EXTENSIONS = {
        "js": "javascript",
        "py": "python",
        "rb": "ruby",
        "ps1": "powershell",
        "psm1": "powershell",
        "sh": "bash",
        "bat": "batch",
        "h": "c",
        "tex": "latex"
      };
      var STATUS_ATTR = "data-src-status";
      var STATUS_LOADING = "loading";
      var STATUS_LOADED = "loaded";
      var STATUS_FAILED = "failed";
      var SELECTOR = "pre[data-src]:not([" + STATUS_ATTR + '="' + STATUS_LOADED + '"]):not([' + STATUS_ATTR + '="' + STATUS_LOADING + '"])';
      function loadFile(src, success, error) {
        var xhr = new XMLHttpRequest();
        xhr.open("GET", src, true);
        xhr.onreadystatechange = function() {
          if (xhr.readyState == 4) {
            if (xhr.status < 400 && xhr.responseText) {
              success(xhr.responseText);
            } else {
              if (xhr.status >= 400) {
                error(FAILURE_MESSAGE(xhr.status, xhr.statusText));
              } else {
                error(FAILURE_EMPTY_MESSAGE);
              }
            }
          }
        };
        xhr.send(null);
      }
      function parseRange(range) {
        var m = /^\s*(\d+)\s*(?:(,)\s*(?:(\d+)\s*)?)?$/.exec(range || "");
        if (m) {
          var start = Number(m[1]);
          var comma = m[2];
          var end = m[3];
          if (!comma) {
            return [start, start];
          }
          if (!end) {
            return [start, void 0];
          }
          return [start, Number(end)];
        }
        return void 0;
      }
      Prism2.hooks.add("before-highlightall", function(env) {
        env.selector += ", " + SELECTOR;
      });
      Prism2.hooks.add("before-sanity-check", function(env) {
        var pre = (
          /** @type {HTMLPreElement} */
          env.element
        );
        if (pre.matches(SELECTOR)) {
          env.code = "";
          pre.setAttribute(STATUS_ATTR, STATUS_LOADING);
          var code = pre.appendChild(document.createElement("CODE"));
          code.textContent = LOADING_MESSAGE;
          var src = pre.getAttribute("data-src");
          var language = env.language;
          if (language === "none") {
            var extension = (/\.(\w+)$/.exec(src) || [, "none"])[1];
            language = EXTENSIONS[extension] || extension;
          }
          Prism2.util.setLanguage(code, language);
          Prism2.util.setLanguage(pre, language);
          var autoloader = Prism2.plugins.autoloader;
          if (autoloader) {
            autoloader.loadLanguages(language);
          }
          loadFile(
            src,
            function(text) {
              pre.setAttribute(STATUS_ATTR, STATUS_LOADED);
              var range = parseRange(pre.getAttribute("data-range"));
              if (range) {
                var lines = text.split(/\r\n?|\n/g);
                var start = range[0];
                var end = range[1] == null ? lines.length : range[1];
                if (start < 0) {
                  start += lines.length;
                }
                start = Math.max(0, Math.min(start - 1, lines.length));
                if (end < 0) {
                  end += lines.length;
                }
                end = Math.max(0, Math.min(end, lines.length));
                text = lines.slice(start, end).join("\n");
                if (!pre.hasAttribute("data-start")) {
                  pre.setAttribute("data-start", String(start + 1));
                }
              }
              code.textContent = text;
              Prism2.highlightElement(code);
            },
            function(error) {
              pre.setAttribute(STATUS_ATTR, STATUS_FAILED);
              code.textContent = error;
            }
          );
        }
      });
      Prism2.plugins.fileHighlight = {
        /**
         * Executes the File Highlight plugin for all matching `pre` elements under the given container.
         *
         * Note: Elements which are already loaded or currently loading will not be touched by this method.
         *
         * @param {ParentNode} [container=document]
         */
        highlight: function highlight(container) {
          var elements = (container || document).querySelectorAll(SELECTOR);
          for (var i = 0, element; element = elements[i++]; ) {
            Prism2.highlightElement(element);
          }
        }
      };
      var logged = false;
      Prism2.fileHighlight = function() {
        if (!logged) {
          console.warn("Prism.fileHighlight is deprecated. Use `Prism.plugins.fileHighlight.highlight` instead.");
          logged = true;
        }
        Prism2.plugins.fileHighlight.highlight.apply(this, arguments);
      };
    })();
  }
});

// node_modules/codejar/dist/codejar.js
var globalWindow = window;
function CodeJar(editor, highlight, opt = {}) {
  const options = {
    tab: "	",
    indentOn: /[({\[]$/,
    moveToNewLine: /^[)}\]]/,
    spellcheck: false,
    catchTab: true,
    preserveIdent: true,
    addClosing: true,
    history: true,
    window: globalWindow,
    ...opt
  };
  const window2 = options.window;
  const document2 = window2.document;
  let listeners = [];
  let history = [];
  let at = -1;
  let focus = false;
  const cb = {
    update(code) {
    },
    paste(data) {
    }
  };
  let prev;
  editor.setAttribute("contenteditable", "plaintext-only");
  editor.setAttribute("spellcheck", options.spellcheck ? "true" : "false");
  editor.style.outline = "none";
  editor.style.overflowWrap = "break-word";
  editor.style.overflowY = "auto";
  editor.style.whiteSpace = "pre-wrap";
  let isLegacy = false;
  highlight(editor);
  if (editor.contentEditable !== "plaintext-only")
    isLegacy = true;
  if (isLegacy)
    editor.setAttribute("contenteditable", "true");
  const debounceHighlight = debounce2(() => {
    const pos = save();
    highlight(editor, pos);
    restore(pos);
  }, 30);
  let recording = false;
  const shouldRecord = (event) => {
    return !isUndo(event) && !isRedo(event) && event.key !== "Meta" && event.key !== "Control" && event.key !== "Alt" && !event.key.startsWith("Arrow");
  };
  const debounceRecordHistory = debounce2((event) => {
    if (shouldRecord(event)) {
      recordHistory();
      recording = false;
    }
  }, 300);
  const on = (type, fn) => {
    listeners.push([type, fn]);
    editor.addEventListener(type, fn);
  };
  on("keydown", (event) => {
    if (event.defaultPrevented)
      return;
    prev = toString();
    if (options.preserveIdent)
      handleNewLine(event);
    else
      legacyNewLineFix(event);
    if (options.catchTab)
      handleTabCharacters(event);
    if (options.addClosing)
      handleSelfClosingCharacters(event);
    if (options.history) {
      handleUndoRedo(event);
      if (shouldRecord(event) && !recording) {
        recordHistory();
        recording = true;
      }
    }
    if (isLegacy && !isCopy(event))
      restore(save());
  });
  on("keyup", (event) => {
    if (event.defaultPrevented)
      return;
    if (event.isComposing)
      return;
    if (prev !== toString())
      debounceHighlight();
    debounceRecordHistory(event);
    cb.update(toString());
  });
  on("focus", (_event) => {
    focus = true;
  });
  on("blur", (_event) => {
    focus = false;
  });
  on("paste", (event) => {
    recordHistory();
    handlePaste(event);
    recordHistory();
    cb.update(toString());
  });
  on("cut", (event) => {
    recordHistory();
    handleCut(event);
    recordHistory();
    cb.update(toString());
  });
  function save() {
    const s = getSelection();
    const pos = { start: 0, end: 0, dir: void 0 };
    let { anchorNode, anchorOffset, focusNode, focusOffset } = s;
    if (!anchorNode || !focusNode)
      throw "error1";
    if (anchorNode === editor && focusNode === editor) {
      pos.start = anchorOffset > 0 && editor.textContent ? editor.textContent.length : 0;
      pos.end = focusOffset > 0 && editor.textContent ? editor.textContent.length : 0;
      pos.dir = focusOffset >= anchorOffset ? "->" : "<-";
      return pos;
    }
    if (anchorNode.nodeType === Node.ELEMENT_NODE) {
      const node = document2.createTextNode("");
      anchorNode.insertBefore(node, anchorNode.childNodes[anchorOffset]);
      anchorNode = node;
      anchorOffset = 0;
    }
    if (focusNode.nodeType === Node.ELEMENT_NODE) {
      const node = document2.createTextNode("");
      focusNode.insertBefore(node, focusNode.childNodes[focusOffset]);
      focusNode = node;
      focusOffset = 0;
    }
    visit(editor, (el) => {
      if (el === anchorNode && el === focusNode) {
        pos.start += anchorOffset;
        pos.end += focusOffset;
        pos.dir = anchorOffset <= focusOffset ? "->" : "<-";
        return "stop";
      }
      if (el === anchorNode) {
        pos.start += anchorOffset;
        if (!pos.dir) {
          pos.dir = "->";
        } else {
          return "stop";
        }
      } else if (el === focusNode) {
        pos.end += focusOffset;
        if (!pos.dir) {
          pos.dir = "<-";
        } else {
          return "stop";
        }
      }
      if (el.nodeType === Node.TEXT_NODE) {
        if (pos.dir != "->")
          pos.start += el.nodeValue.length;
        if (pos.dir != "<-")
          pos.end += el.nodeValue.length;
      }
    });
    editor.normalize();
    return pos;
  }
  function restore(pos) {
    const s = getSelection();
    let startNode, startOffset = 0;
    let endNode, endOffset = 0;
    if (!pos.dir)
      pos.dir = "->";
    if (pos.start < 0)
      pos.start = 0;
    if (pos.end < 0)
      pos.end = 0;
    if (pos.dir == "<-") {
      const { start, end } = pos;
      pos.start = end;
      pos.end = start;
    }
    let current = 0;
    visit(editor, (el) => {
      if (el.nodeType !== Node.TEXT_NODE)
        return;
      const len = (el.nodeValue || "").length;
      if (current + len > pos.start) {
        if (!startNode) {
          startNode = el;
          startOffset = pos.start - current;
        }
        if (current + len > pos.end) {
          endNode = el;
          endOffset = pos.end - current;
          return "stop";
        }
      }
      current += len;
    });
    if (!startNode)
      startNode = editor, startOffset = editor.childNodes.length;
    if (!endNode)
      endNode = editor, endOffset = editor.childNodes.length;
    if (pos.dir == "<-") {
      [startNode, startOffset, endNode, endOffset] = [endNode, endOffset, startNode, startOffset];
    }
    s.setBaseAndExtent(startNode, startOffset, endNode, endOffset);
  }
  function beforeCursor() {
    const s = getSelection();
    const r0 = s.getRangeAt(0);
    const r = document2.createRange();
    r.selectNodeContents(editor);
    r.setEnd(r0.startContainer, r0.startOffset);
    return r.toString();
  }
  function afterCursor() {
    const s = getSelection();
    const r0 = s.getRangeAt(0);
    const r = document2.createRange();
    r.selectNodeContents(editor);
    r.setStart(r0.endContainer, r0.endOffset);
    return r.toString();
  }
  function handleNewLine(event) {
    if (event.key === "Enter") {
      const before = beforeCursor();
      const after = afterCursor();
      let [padding] = findPadding(before);
      let newLinePadding = padding;
      if (options.indentOn.test(before)) {
        newLinePadding += options.tab;
      }
      if (newLinePadding.length > 0) {
        preventDefault(event);
        event.stopPropagation();
        insert("\n" + newLinePadding);
      } else {
        legacyNewLineFix(event);
      }
      if (newLinePadding !== padding && options.moveToNewLine.test(after)) {
        const pos = save();
        insert("\n" + padding);
        restore(pos);
      }
    }
  }
  function legacyNewLineFix(event) {
    if (isLegacy && event.key === "Enter") {
      preventDefault(event);
      event.stopPropagation();
      if (afterCursor() == "") {
        insert("\n ");
        const pos = save();
        pos.start = --pos.end;
        restore(pos);
      } else {
        insert("\n");
      }
    }
  }
  function handleSelfClosingCharacters(event) {
    const open = `([{'"`;
    const close = `)]}'"`;
    if (open.includes(event.key)) {
      preventDefault(event);
      const pos = save();
      const wrapText = pos.start == pos.end ? "" : getSelection().toString();
      const text = event.key + wrapText + close[open.indexOf(event.key)];
      insert(text);
      pos.start++;
      pos.end++;
      restore(pos);
    }
  }
  function handleTabCharacters(event) {
    if (event.key === "Tab") {
      preventDefault(event);
      if (event.shiftKey) {
        const before = beforeCursor();
        let [padding, start] = findPadding(before);
        if (padding.length > 0) {
          const pos = save();
          const len = Math.min(options.tab.length, padding.length);
          restore({ start, end: start + len });
          document2.execCommand("delete");
          pos.start -= len;
          pos.end -= len;
          restore(pos);
        }
      } else {
        insert(options.tab);
      }
    }
  }
  function handleUndoRedo(event) {
    if (isUndo(event)) {
      preventDefault(event);
      at--;
      const record = history[at];
      if (record) {
        editor.innerHTML = record.html;
        restore(record.pos);
      }
      if (at < 0)
        at = 0;
    }
    if (isRedo(event)) {
      preventDefault(event);
      at++;
      const record = history[at];
      if (record) {
        editor.innerHTML = record.html;
        restore(record.pos);
      }
      if (at >= history.length)
        at--;
    }
  }
  function recordHistory() {
    if (!focus)
      return;
    const html = editor.innerHTML;
    const pos = save();
    const lastRecord = history[at];
    if (lastRecord) {
      if (lastRecord.html === html && lastRecord.pos.start === pos.start && lastRecord.pos.end === pos.end)
        return;
    }
    at++;
    history[at] = { html, pos };
    history.splice(at + 1);
    const maxHistory = 300;
    if (at > maxHistory) {
      at = maxHistory;
      history.splice(0, 1);
    }
  }
  function handlePaste(event) {
    preventDefault(event);
    const originalEvent = event.originalEvent ?? event;
    const data = {
      text: originalEvent.clipboardData.getData("text/plain").replace(/\r\n?/g, "\n")
    };
    cb.paste(data);
    const pos = save();
    insert(data.text);
    highlight(editor);
    restore({
      start: Math.min(pos.start, pos.end) + data.text.length,
      end: Math.min(pos.start, pos.end) + data.text.length,
      dir: "<-"
    });
  }
  function handleCut(event) {
    const pos = save();
    const selection = getSelection();
    const originalEvent = event.originalEvent ?? event;
    originalEvent.clipboardData.setData("text/plain", selection.toString());
    document2.execCommand("delete");
    highlight(editor);
    restore({
      start: Math.min(pos.start, pos.end),
      end: Math.min(pos.start, pos.end),
      dir: "<-"
    });
    preventDefault(event);
  }
  function visit(editor2, visitor) {
    const queue = [];
    if (editor2.firstChild)
      queue.push(editor2.firstChild);
    let el = queue.pop();
    while (el) {
      if (visitor(el) === "stop")
        break;
      if (el.nextSibling)
        queue.push(el.nextSibling);
      if (el.firstChild)
        queue.push(el.firstChild);
      el = queue.pop();
    }
  }
  function isCtrl(event) {
    return event.metaKey || event.ctrlKey;
  }
  function isUndo(event) {
    return isCtrl(event) && !event.shiftKey && getKeyCode(event) === "Z";
  }
  function isRedo(event) {
    return isCtrl(event) && event.shiftKey && getKeyCode(event) === "Z";
  }
  function isCopy(event) {
    return isCtrl(event) && getKeyCode(event) === "C";
  }
  function getKeyCode(event) {
    let key = event.key || event.keyCode || event.which;
    if (!key)
      return void 0;
    return (typeof key === "string" ? key : String.fromCharCode(key)).toUpperCase();
  }
  function insert(text) {
    text = text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#039;");
    document2.execCommand("insertHTML", false, text);
  }
  function debounce2(cb2, wait) {
    let timeout = 0;
    return (...args) => {
      clearTimeout(timeout);
      timeout = window2.setTimeout(() => cb2(...args), wait);
    };
  }
  function findPadding(text) {
    let i = text.length - 1;
    while (i >= 0 && text[i] !== "\n")
      i--;
    i++;
    let j = i;
    while (j < text.length && /[ \t]/.test(text[j]))
      j++;
    return [text.substring(i, j) || "", i, j];
  }
  function toString() {
    return editor.textContent || "";
  }
  function preventDefault(event) {
    event.preventDefault();
  }
  function getSelection() {
    if (editor.parentNode?.nodeType == Node.DOCUMENT_FRAGMENT_NODE) {
      return editor.parentNode.getSelection();
    }
    return window2.getSelection();
  }
  return {
    updateOptions(newOptions) {
      Object.assign(options, newOptions);
    },
    updateCode(code) {
      editor.textContent = code;
      highlight(editor);
      cb.update(code);
    },
    onUpdate(callback) {
      cb.update = callback;
    },
    onPaste(callback) {
      cb.paste = callback;
    },
    toString,
    save,
    restore,
    recordHistory,
    destroy() {
      for (let [type, fn] of listeners) {
        editor.removeEventListener(type, fn);
      }
    }
  };
}

// src/livecodes/editor/codejar/codejar.ts
var import_prismjs = __toESM(require_prism());

// node_modules/prismjs/components/prism-css.js
(function(Prism2) {
  var string = /(?:"(?:\\(?:\r\n|[\s\S])|[^"\\\r\n])*"|'(?:\\(?:\r\n|[\s\S])|[^'\\\r\n])*')/;
  Prism2.languages.css = {
    "comment": /\/\*[\s\S]*?\*\//,
    "atrule": {
      pattern: RegExp("@[\\w-](?:" + /[^;{\s"']|\s+(?!\s)/.source + "|" + string.source + ")*?" + /(?:;|(?=\s*\{))/.source),
      inside: {
        "rule": /^@[\w-]+/,
        "selector-function-argument": {
          pattern: /(\bselector\s*\(\s*(?![\s)]))(?:[^()\s]|\s+(?![\s)])|\((?:[^()]|\([^()]*\))*\))+(?=\s*\))/,
          lookbehind: true,
          alias: "selector"
        },
        "keyword": {
          pattern: /(^|[^\w-])(?:and|not|only|or)(?![\w-])/,
          lookbehind: true
        }
        // See rest below
      }
    },
    "url": {
      // https://drafts.csswg.org/css-values-3/#urls
      pattern: RegExp("\\burl\\((?:" + string.source + "|" + /(?:[^\\\r\n()"']|\\[\s\S])*/.source + ")\\)", "i"),
      greedy: true,
      inside: {
        "function": /^url/i,
        "punctuation": /^\(|\)$/,
        "string": {
          pattern: RegExp("^" + string.source + "$"),
          alias: "url"
        }
      }
    },
    "selector": {
      pattern: RegExp(`(^|[{}\\s])[^{}\\s](?:[^{};"'\\s]|\\s+(?![\\s{])|` + string.source + ")*(?=\\s*\\{)"),
      lookbehind: true
    },
    "string": {
      pattern: string,
      greedy: true
    },
    "property": {
      pattern: /(^|[^-\w\xA0-\uFFFF])(?!\s)[-_a-z\xA0-\uFFFF](?:(?!\s)[-\w\xA0-\uFFFF])*(?=\s*:)/i,
      lookbehind: true
    },
    "important": /!important\b/i,
    "function": {
      pattern: /(^|[^-a-z0-9])[-a-z0-9]+(?=\()/i,
      lookbehind: true
    },
    "punctuation": /[(){};:,]/
  };
  Prism2.languages.css["atrule"].inside.rest = Prism2.languages.css;
  var markup = Prism2.languages.markup;
  if (markup) {
    markup.tag.addInlined("style", "css");
    markup.tag.addAttribute("style", "css");
  }
})(Prism);

// node_modules/prismjs/components/prism-javascript.js
Prism.languages.javascript = Prism.languages.extend("clike", {
  "class-name": [
    Prism.languages.clike["class-name"],
    {
      pattern: /(^|[^$\w\xA0-\uFFFF])(?!\s)[_$A-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\.(?:constructor|prototype))/,
      lookbehind: true
    }
  ],
  "keyword": [
    {
      pattern: /((?:^|\})\s*)catch\b/,
      lookbehind: true
    },
    {
      pattern: /(^|[^.]|\.\.\.\s*)\b(?:as|assert(?=\s*\{)|async(?=\s*(?:function\b|\(|[$\w\xA0-\uFFFF]|$))|await|break|case|class|const|continue|debugger|default|delete|do|else|enum|export|extends|finally(?=\s*(?:\{|$))|for|from(?=\s*(?:['"]|$))|function|(?:get|set)(?=\s*(?:[#\[$\w\xA0-\uFFFF]|$))|if|implements|import|in|instanceof|interface|let|new|null|of|package|private|protected|public|return|static|super|switch|this|throw|try|typeof|undefined|var|void|while|with|yield)\b/,
      lookbehind: true
    }
  ],
  // Allow for all non-ASCII characters (See http://stackoverflow.com/a/2008444)
  "function": /#?(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*(?:\.\s*(?:apply|bind|call)\s*)?\()/,
  "number": {
    pattern: RegExp(
      /(^|[^\w$])/.source + "(?:" + // constant
      (/NaN|Infinity/.source + "|" + // binary integer
      /0[bB][01]+(?:_[01]+)*n?/.source + "|" + // octal integer
      /0[oO][0-7]+(?:_[0-7]+)*n?/.source + "|" + // hexadecimal integer
      /0[xX][\dA-Fa-f]+(?:_[\dA-Fa-f]+)*n?/.source + "|" + // decimal bigint
      /\d+(?:_\d+)*n/.source + "|" + // decimal number (integer or float) but no bigint
      /(?:\d+(?:_\d+)*(?:\.(?:\d+(?:_\d+)*)?)?|\.\d+(?:_\d+)*)(?:[Ee][+-]?\d+(?:_\d+)*)?/.source) + ")" + /(?![\w$])/.source
    ),
    lookbehind: true
  },
  "operator": /--|\+\+|\*\*=?|=>|&&=?|\|\|=?|[!=]==|<<=?|>>>?=?|[-+*/%&|^!=<>]=?|\.{3}|\?\?=?|\?\.?|[~:]/
});
Prism.languages.javascript["class-name"][0].pattern = /(\b(?:class|extends|implements|instanceof|interface|new)\s+)[\w.\\]+/;
Prism.languages.insertBefore("javascript", "keyword", {
  "regex": {
    pattern: RegExp(
      // lookbehind
      // eslint-disable-next-line regexp/no-dupe-characters-character-class
      /((?:^|[^$\w\xA0-\uFFFF."'\])\s]|\b(?:return|yield))\s*)/.source + // Regex pattern:
      // There are 2 regex patterns here. The RegExp set notation proposal added support for nested character
      // classes if the `v` flag is present. Unfortunately, nested CCs are both context-free and incompatible
      // with the only syntax, so we have to define 2 different regex patterns.
      /\//.source + "(?:" + /(?:\[(?:[^\]\\\r\n]|\\.)*\]|\\.|[^/\\\[\r\n])+\/[dgimyus]{0,7}/.source + "|" + // `v` flag syntax. This supports 3 levels of nested character classes.
      /(?:\[(?:[^[\]\\\r\n]|\\.|\[(?:[^[\]\\\r\n]|\\.|\[(?:[^[\]\\\r\n]|\\.)*\])*\])*\]|\\.|[^/\\\[\r\n])+\/[dgimyus]{0,7}v[dgimyus]{0,7}/.source + ")" + // lookahead
      /(?=(?:\s|\/\*(?:[^*]|\*(?!\/))*\*\/)*(?:$|[\r\n,.;:})\]]|\/\/))/.source
    ),
    lookbehind: true,
    greedy: true,
    inside: {
      "regex-source": {
        pattern: /^(\/)[\s\S]+(?=\/[a-z]*$)/,
        lookbehind: true,
        alias: "language-regex",
        inside: Prism.languages.regex
      },
      "regex-delimiter": /^\/|\/$/,
      "regex-flags": /^[a-z]+$/
    }
  },
  // This must be declared before keyword because we use "function" inside the look-forward
  "function-variable": {
    pattern: /#?(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*[=:]\s*(?:async\s*)?(?:\bfunction\b|(?:\((?:[^()]|\([^()]*\))*\)|(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*)\s*=>))/,
    alias: "function"
  },
  "parameter": [
    {
      pattern: /(function(?:\s+(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*)?\s*\(\s*)(?!\s)(?:[^()\s]|\s+(?![\s)])|\([^()]*\))+(?=\s*\))/,
      lookbehind: true,
      inside: Prism.languages.javascript
    },
    {
      pattern: /(^|[^$\w\xA0-\uFFFF])(?!\s)[_$a-z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*=>)/i,
      lookbehind: true,
      inside: Prism.languages.javascript
    },
    {
      pattern: /(\(\s*)(?!\s)(?:[^()\s]|\s+(?![\s)])|\([^()]*\))+(?=\s*\)\s*=>)/,
      lookbehind: true,
      inside: Prism.languages.javascript
    },
    {
      pattern: /((?:\b|\s|^)(?!(?:as|async|await|break|case|catch|class|const|continue|debugger|default|delete|do|else|enum|export|extends|finally|for|from|function|get|if|implements|import|in|instanceof|interface|let|new|null|of|package|private|protected|public|return|set|static|super|switch|this|throw|try|typeof|undefined|var|void|while|with|yield)(?![$\w\xA0-\uFFFF]))(?:(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*\s*)\(\s*|\]\s*\(\s*)(?!\s)(?:[^()\s]|\s+(?![\s)])|\([^()]*\))+(?=\s*\)\s*\{)/,
      lookbehind: true,
      inside: Prism.languages.javascript
    }
  ],
  "constant": /\b[A-Z](?:[A-Z_]|\dx?)*\b/
});
Prism.languages.insertBefore("javascript", "string", {
  "hashbang": {
    pattern: /^#!.*/,
    greedy: true,
    alias: "comment"
  },
  "template-string": {
    pattern: /`(?:\\[\s\S]|\$\{(?:[^{}]|\{(?:[^{}]|\{[^}]*\})*\})+\}|(?!\$\{)[^\\`])*`/,
    greedy: true,
    inside: {
      "template-punctuation": {
        pattern: /^`|`$/,
        alias: "string"
      },
      "interpolation": {
        pattern: /((?:^|[^\\])(?:\\{2})*)\$\{(?:[^{}]|\{(?:[^{}]|\{[^}]*\})*\})+\}/,
        lookbehind: true,
        inside: {
          "interpolation-punctuation": {
            pattern: /^\$\{|\}$/,
            alias: "punctuation"
          },
          rest: Prism.languages.javascript
        }
      },
      "string": /[\s\S]+/
    }
  },
  "string-property": {
    pattern: /((?:^|[,{])[ \t]*)(["'])(?:\\(?:\r\n|[\s\S])|(?!\2)[^\\\r\n])*\2(?=\s*:)/m,
    lookbehind: true,
    greedy: true,
    alias: "property"
  }
});
Prism.languages.insertBefore("javascript", "operator", {
  "literal-property": {
    pattern: /((?:^|[,{])[ \t]*)(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*:)/m,
    lookbehind: true,
    alias: "property"
  }
});
if (Prism.languages.markup) {
  Prism.languages.markup.tag.addInlined("script", "javascript");
  Prism.languages.markup.tag.addAttribute(
    /on(?:abort|blur|change|click|composition(?:end|start|update)|dblclick|error|focus(?:in|out)?|key(?:down|up)|load|mouse(?:down|enter|leave|move|out|over|up)|reset|resize|scroll|select|slotchange|submit|unload|wheel)/.source,
    "javascript"
  );
}
Prism.languages.js = Prism.languages.javascript;

// node_modules/prismjs/components/prism-json.js
Prism.languages.json = {
  "property": {
    pattern: /(^|[^\\])"(?:\\.|[^\\"\r\n])*"(?=\s*:)/,
    lookbehind: true,
    greedy: true
  },
  "string": {
    pattern: /(^|[^\\])"(?:\\.|[^\\"\r\n])*"(?!\s*:)/,
    lookbehind: true,
    greedy: true
  },
  "comment": {
    pattern: /\/\/.*|\/\*[\s\S]*?(?:\*\/|$)/,
    greedy: true
  },
  "number": /-?\b\d+(?:\.\d+)?(?:e[+-]?\d+)?\b/i,
  "punctuation": /[{}[\],]/,
  "operator": /:/,
  "boolean": /\b(?:false|true)\b/,
  "null": {
    pattern: /\bnull\b/,
    alias: "keyword"
  }
};
Prism.languages.webmanifest = Prism.languages.json;

// node_modules/prismjs/components/prism-jsx.js
(function(Prism2) {
  var javascript = Prism2.util.clone(Prism2.languages.javascript);
  var space = /(?:\s|\/\/.*(?!.)|\/\*(?:[^*]|\*(?!\/))\*\/)/.source;
  var braces = /(?:\{(?:\{(?:\{[^{}]*\}|[^{}])*\}|[^{}])*\})/.source;
  var spread = /(?:\{<S>*\.{3}(?:[^{}]|<BRACES>)*\})/.source;
  function re(source, flags) {
    source = source.replace(/<S>/g, function() {
      return space;
    }).replace(/<BRACES>/g, function() {
      return braces;
    }).replace(/<SPREAD>/g, function() {
      return spread;
    });
    return RegExp(source, flags);
  }
  spread = re(spread).source;
  Prism2.languages.jsx = Prism2.languages.extend("markup", javascript);
  Prism2.languages.jsx.tag.pattern = re(
    /<\/?(?:[\w.:-]+(?:<S>+(?:[\w.:$-]+(?:=(?:"(?:\\[\s\S]|[^\\"])*"|'(?:\\[\s\S]|[^\\'])*'|[^\s{'"/>=]+|<BRACES>))?|<SPREAD>))*<S>*\/?)?>/.source
  );
  Prism2.languages.jsx.tag.inside["tag"].pattern = /^<\/?[^\s>\/]*/;
  Prism2.languages.jsx.tag.inside["attr-value"].pattern = /=(?!\{)(?:"(?:\\[\s\S]|[^\\"])*"|'(?:\\[\s\S]|[^\\'])*'|[^\s'">]+)/;
  Prism2.languages.jsx.tag.inside["tag"].inside["class-name"] = /^[A-Z]\w*(?:\.[A-Z]\w*)*$/;
  Prism2.languages.jsx.tag.inside["comment"] = javascript["comment"];
  Prism2.languages.insertBefore("inside", "attr-name", {
    "spread": {
      pattern: re(/<SPREAD>/.source),
      inside: Prism2.languages.jsx
    }
  }, Prism2.languages.jsx.tag);
  Prism2.languages.insertBefore("inside", "special-attr", {
    "script": {
      // Allow for two levels of nesting
      pattern: re(/=<BRACES>/.source),
      alias: "language-javascript",
      inside: {
        "script-punctuation": {
          pattern: /^=(?=\{)/,
          alias: "punctuation"
        },
        rest: Prism2.languages.jsx
      }
    }
  }, Prism2.languages.jsx.tag);
  var stringifyToken = function(token) {
    if (!token) {
      return "";
    }
    if (typeof token === "string") {
      return token;
    }
    if (typeof token.content === "string") {
      return token.content;
    }
    return token.content.map(stringifyToken).join("");
  };
  var walkTokens = function(tokens) {
    var openedTags = [];
    for (var i = 0; i < tokens.length; i++) {
      var token = tokens[i];
      var notTagNorBrace = false;
      if (typeof token !== "string") {
        if (token.type === "tag" && token.content[0] && token.content[0].type === "tag") {
          if (token.content[0].content[0].content === "</") {
            if (openedTags.length > 0 && openedTags[openedTags.length - 1].tagName === stringifyToken(token.content[0].content[1])) {
              openedTags.pop();
            }
          } else {
            if (token.content[token.content.length - 1].content === "/>") {
            } else {
              openedTags.push({
                tagName: stringifyToken(token.content[0].content[1]),
                openedBraces: 0
              });
            }
          }
        } else if (openedTags.length > 0 && token.type === "punctuation" && token.content === "{") {
          openedTags[openedTags.length - 1].openedBraces++;
        } else if (openedTags.length > 0 && openedTags[openedTags.length - 1].openedBraces > 0 && token.type === "punctuation" && token.content === "}") {
          openedTags[openedTags.length - 1].openedBraces--;
        } else {
          notTagNorBrace = true;
        }
      }
      if (notTagNorBrace || typeof token === "string") {
        if (openedTags.length > 0 && openedTags[openedTags.length - 1].openedBraces === 0) {
          var plainText = stringifyToken(token);
          if (i < tokens.length - 1 && (typeof tokens[i + 1] === "string" || tokens[i + 1].type === "plain-text")) {
            plainText += stringifyToken(tokens[i + 1]);
            tokens.splice(i + 1, 1);
          }
          if (i > 0 && (typeof tokens[i - 1] === "string" || tokens[i - 1].type === "plain-text")) {
            plainText = stringifyToken(tokens[i - 1]) + plainText;
            tokens.splice(i - 1, 1);
            i--;
          }
          tokens[i] = new Prism2.Token("plain-text", plainText, null, plainText);
        }
      }
      if (token.content && typeof token.content !== "string") {
        walkTokens(token.content);
      }
    }
  };
  Prism2.hooks.add("after-tokenize", function(env) {
    if (env.language !== "jsx" && env.language !== "tsx") {
      return;
    }
    walkTokens(env.tokens);
  });
})(Prism);

// node_modules/prismjs/components/prism-markup.js
Prism.languages.markup = {
  "comment": {
    pattern: /<!--(?:(?!<!--)[\s\S])*?-->/,
    greedy: true
  },
  "prolog": {
    pattern: /<\?[\s\S]+?\?>/,
    greedy: true
  },
  "doctype": {
    // https://www.w3.org/TR/xml/#NT-doctypedecl
    pattern: /<!DOCTYPE(?:[^>"'[\]]|"[^"]*"|'[^']*')+(?:\[(?:[^<"'\]]|"[^"]*"|'[^']*'|<(?!!--)|<!--(?:[^-]|-(?!->))*-->)*\]\s*)?>/i,
    greedy: true,
    inside: {
      "internal-subset": {
        pattern: /(^[^\[]*\[)[\s\S]+(?=\]>$)/,
        lookbehind: true,
        greedy: true,
        inside: null
        // see below
      },
      "string": {
        pattern: /"[^"]*"|'[^']*'/,
        greedy: true
      },
      "punctuation": /^<!|>$|[[\]]/,
      "doctype-tag": /^DOCTYPE/i,
      "name": /[^\s<>'"]+/
    }
  },
  "cdata": {
    pattern: /<!\[CDATA\[[\s\S]*?\]\]>/i,
    greedy: true
  },
  "tag": {
    pattern: /<\/?(?!\d)[^\s>\/=$<%]+(?:\s(?:\s*[^\s>\/=]+(?:\s*=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+(?=[\s>]))|(?=[\s/>])))+)?\s*\/?>/,
    greedy: true,
    inside: {
      "tag": {
        pattern: /^<\/?[^\s>\/]+/,
        inside: {
          "punctuation": /^<\/?/,
          "namespace": /^[^\s>\/:]+:/
        }
      },
      "special-attr": [],
      "attr-value": {
        pattern: /=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+)/,
        inside: {
          "punctuation": [
            {
              pattern: /^=/,
              alias: "attr-equals"
            },
            {
              pattern: /^(\s*)["']|["']$/,
              lookbehind: true
            }
          ]
        }
      },
      "punctuation": /\/?>/,
      "attr-name": {
        pattern: /[^\s>\/]+/,
        inside: {
          "namespace": /^[^\s>\/:]+:/
        }
      }
    }
  },
  "entity": [
    {
      pattern: /&[\da-z]{1,8};/i,
      alias: "named-entity"
    },
    /&#x?[\da-f]{1,8};/i
  ]
};
Prism.languages.markup["tag"].inside["attr-value"].inside["entity"] = Prism.languages.markup["entity"];
Prism.languages.markup["doctype"].inside["internal-subset"].inside = Prism.languages.markup;
Prism.hooks.add("wrap", function(env) {
  if (env.type === "entity") {
    env.attributes["title"] = env.content.replace(/&amp;/, "&");
  }
});
Object.defineProperty(Prism.languages.markup.tag, "addInlined", {
  /**
   * Adds an inlined language to markup.
   *
   * An example of an inlined language is CSS with `<style>` tags.
   *
   * @param {string} tagName The name of the tag that contains the inlined language. This name will be treated as
   * case insensitive.
   * @param {string} lang The language key.
   * @example
   * addInlined('style', 'css');
   */
  value: function addInlined(tagName, lang) {
    var includedCdataInside = {};
    includedCdataInside["language-" + lang] = {
      pattern: /(^<!\[CDATA\[)[\s\S]+?(?=\]\]>$)/i,
      lookbehind: true,
      inside: Prism.languages[lang]
    };
    includedCdataInside["cdata"] = /^<!\[CDATA\[|\]\]>$/i;
    var inside = {
      "included-cdata": {
        pattern: /<!\[CDATA\[[\s\S]*?\]\]>/i,
        inside: includedCdataInside
      }
    };
    inside["language-" + lang] = {
      pattern: /[\s\S]+/,
      inside: Prism.languages[lang]
    };
    var def = {};
    def[tagName] = {
      pattern: RegExp(/(<__[^>]*>)(?:<!\[CDATA\[(?:[^\]]|\](?!\]>))*\]\]>|(?!<!\[CDATA\[)[\s\S])*?(?=<\/__>)/.source.replace(/__/g, function() {
        return tagName;
      }), "i"),
      lookbehind: true,
      greedy: true,
      inside
    };
    Prism.languages.insertBefore("markup", "cdata", def);
  }
});
Object.defineProperty(Prism.languages.markup.tag, "addAttribute", {
  /**
   * Adds an pattern to highlight languages embedded in HTML attributes.
   *
   * An example of an inlined language is CSS with `style` attributes.
   *
   * @param {string} attrName The name of the tag that contains the inlined language. This name will be treated as
   * case insensitive.
   * @param {string} lang The language key.
   * @example
   * addAttribute('style', 'css');
   */
  value: function(attrName, lang) {
    Prism.languages.markup.tag.inside["special-attr"].push({
      pattern: RegExp(
        /(^|["'\s])/.source + "(?:" + attrName + ")" + /\s*=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+(?=[\s>]))/.source,
        "i"
      ),
      lookbehind: true,
      inside: {
        "attr-name": /^[^\s=]+/,
        "attr-value": {
          pattern: /=[\s\S]+/,
          inside: {
            "value": {
              pattern: /(^=\s*(["']|(?!["'])))\S[\s\S]*(?=\2$)/,
              lookbehind: true,
              alias: [lang, "language-" + lang],
              inside: Prism.languages[lang]
            },
            "punctuation": [
              {
                pattern: /^=/,
                alias: "attr-equals"
              },
              /"|'/
            ]
          }
        }
      }
    });
  }
});
Prism.languages.html = Prism.languages.markup;
Prism.languages.mathml = Prism.languages.markup;
Prism.languages.svg = Prism.languages.markup;
Prism.languages.xml = Prism.languages.extend("markup", {});
Prism.languages.ssml = Prism.languages.xml;
Prism.languages.atom = Prism.languages.xml;
Prism.languages.rss = Prism.languages.xml;

// node_modules/prismjs/components/prism-tsx.js
(function(Prism2) {
  var typescript = Prism2.util.clone(Prism2.languages.typescript);
  Prism2.languages.tsx = Prism2.languages.extend("jsx", typescript);
  delete Prism2.languages.tsx["parameter"];
  delete Prism2.languages.tsx["literal-property"];
  var tag = Prism2.languages.tsx.tag;
  tag.pattern = RegExp(/(^|[^\w$]|(?=<\/))/.source + "(?:" + tag.pattern.source + ")", tag.pattern.flags);
  tag.lookbehind = true;
})(Prism);

// node_modules/prismjs/components/prism-typescript.js
(function(Prism2) {
  Prism2.languages.typescript = Prism2.languages.extend("javascript", {
    "class-name": {
      pattern: /(\b(?:class|extends|implements|instanceof|interface|new|type)\s+)(?!keyof\b)(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?:\s*<(?:[^<>]|<(?:[^<>]|<[^<>]*>)*>)*>)?/,
      lookbehind: true,
      greedy: true,
      inside: null
      // see below
    },
    "builtin": /\b(?:Array|Function|Promise|any|boolean|console|never|number|string|symbol|unknown)\b/
  });
  Prism2.languages.typescript.keyword.push(
    /\b(?:abstract|declare|is|keyof|readonly|require)\b/,
    // keywords that have to be followed by an identifier
    /\b(?:asserts|infer|interface|module|namespace|type)\b(?=\s*(?:[{_$a-zA-Z\xA0-\uFFFF]|$))/,
    // This is for `import type *, {}`
    /\btype\b(?=\s*(?:[\{*]|$))/
  );
  delete Prism2.languages.typescript["parameter"];
  delete Prism2.languages.typescript["literal-property"];
  var typeInside = Prism2.languages.extend("typescript", {});
  delete typeInside["class-name"];
  Prism2.languages.typescript["class-name"].inside = typeInside;
  Prism2.languages.insertBefore("typescript", "function", {
    "decorator": {
      pattern: /@[$\w\xA0-\uFFFF]+/,
      inside: {
        "at": {
          pattern: /^@/,
          alias: "operator"
        },
        "function": /^[\s\S]+/
      }
    },
    "generic-function": {
      // e.g. foo<T extends "bar" | "baz">( ...
      pattern: /#?(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*\s*<(?:[^<>]|<(?:[^<>]|<[^<>]*>)*>)*>(?=\s*\()/,
      greedy: true,
      inside: {
        "function": /^#?(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*/,
        "generic": {
          pattern: /<[\s\S]+/,
          // everything after the first <
          alias: "class-name",
          inside: typeInside
        }
      }
    }
  });
  Prism2.languages.ts = Prism2.languages.typescript;
})(Prism);

// node_modules/prismjs/plugins/autoloader/prism-autoloader.js
(function() {
  if (typeof Prism === "undefined" || typeof document === "undefined") {
    return;
  }
  var lang_dependencies = (
    /*dependencies_placeholder[*/
    {
      "javascript": "clike",
      "actionscript": "javascript",
      "apex": [
        "clike",
        "sql"
      ],
      "arduino": "cpp",
      "aspnet": [
        "markup",
        "csharp"
      ],
      "birb": "clike",
      "bison": "c",
      "c": "clike",
      "csharp": "clike",
      "cpp": "c",
      "cfscript": "clike",
      "chaiscript": [
        "clike",
        "cpp"
      ],
      "cilkc": "c",
      "cilkcpp": "cpp",
      "coffeescript": "javascript",
      "crystal": "ruby",
      "css-extras": "css",
      "d": "clike",
      "dart": "clike",
      "django": "markup-templating",
      "ejs": [
        "javascript",
        "markup-templating"
      ],
      "etlua": [
        "lua",
        "markup-templating"
      ],
      "erb": [
        "ruby",
        "markup-templating"
      ],
      "fsharp": "clike",
      "firestore-security-rules": "clike",
      "flow": "javascript",
      "ftl": "markup-templating",
      "gml": "clike",
      "glsl": "c",
      "go": "clike",
      "gradle": "clike",
      "groovy": "clike",
      "haml": "ruby",
      "handlebars": "markup-templating",
      "haxe": "clike",
      "hlsl": "c",
      "idris": "haskell",
      "java": "clike",
      "javadoc": [
        "markup",
        "java",
        "javadoclike"
      ],
      "jolie": "clike",
      "jsdoc": [
        "javascript",
        "javadoclike",
        "typescript"
      ],
      "js-extras": "javascript",
      "json5": "json",
      "jsonp": "json",
      "js-templates": "javascript",
      "kotlin": "clike",
      "latte": [
        "clike",
        "markup-templating",
        "php"
      ],
      "less": "css",
      "lilypond": "scheme",
      "liquid": "markup-templating",
      "markdown": "markup",
      "markup-templating": "markup",
      "mongodb": "javascript",
      "n4js": "javascript",
      "objectivec": "c",
      "opencl": "c",
      "parser": "markup",
      "php": "markup-templating",
      "phpdoc": [
        "php",
        "javadoclike"
      ],
      "php-extras": "php",
      "plsql": "sql",
      "processing": "clike",
      "protobuf": "clike",
      "pug": [
        "markup",
        "javascript"
      ],
      "purebasic": "clike",
      "purescript": "haskell",
      "qsharp": "clike",
      "qml": "javascript",
      "qore": "clike",
      "racket": "scheme",
      "cshtml": [
        "markup",
        "csharp"
      ],
      "jsx": [
        "markup",
        "javascript"
      ],
      "tsx": [
        "jsx",
        "typescript"
      ],
      "reason": "clike",
      "ruby": "clike",
      "sass": "css",
      "scss": "css",
      "scala": "java",
      "shell-session": "bash",
      "smarty": "markup-templating",
      "solidity": "clike",
      "soy": "markup-templating",
      "sparql": "turtle",
      "sqf": "clike",
      "squirrel": "clike",
      "stata": [
        "mata",
        "java",
        "python"
      ],
      "t4-cs": [
        "t4-templating",
        "csharp"
      ],
      "t4-vb": [
        "t4-templating",
        "vbnet"
      ],
      "tap": "yaml",
      "tt2": [
        "clike",
        "markup-templating"
      ],
      "textile": "markup",
      "twig": "markup-templating",
      "typescript": "javascript",
      "v": "clike",
      "vala": "clike",
      "vbnet": "basic",
      "velocity": "markup",
      "wiki": "markup",
      "xeora": "markup",
      "xml-doc": "markup",
      "xquery": "markup"
    }
  );
  var lang_aliases = (
    /*aliases_placeholder[*/
    {
      "html": "markup",
      "xml": "markup",
      "svg": "markup",
      "mathml": "markup",
      "ssml": "markup",
      "atom": "markup",
      "rss": "markup",
      "js": "javascript",
      "g4": "antlr4",
      "ino": "arduino",
      "arm-asm": "armasm",
      "art": "arturo",
      "adoc": "asciidoc",
      "avs": "avisynth",
      "avdl": "avro-idl",
      "gawk": "awk",
      "sh": "bash",
      "shell": "bash",
      "shortcode": "bbcode",
      "rbnf": "bnf",
      "oscript": "bsl",
      "cs": "csharp",
      "dotnet": "csharp",
      "cfc": "cfscript",
      "cilk-c": "cilkc",
      "cilk-cpp": "cilkcpp",
      "cilk": "cilkcpp",
      "coffee": "coffeescript",
      "conc": "concurnas",
      "jinja2": "django",
      "dns-zone": "dns-zone-file",
      "dockerfile": "docker",
      "gv": "dot",
      "eta": "ejs",
      "xlsx": "excel-formula",
      "xls": "excel-formula",
      "gamemakerlanguage": "gml",
      "po": "gettext",
      "gni": "gn",
      "ld": "linker-script",
      "go-mod": "go-module",
      "hbs": "handlebars",
      "mustache": "handlebars",
      "hs": "haskell",
      "idr": "idris",
      "gitignore": "ignore",
      "hgignore": "ignore",
      "npmignore": "ignore",
      "webmanifest": "json",
      "kt": "kotlin",
      "kts": "kotlin",
      "kum": "kumir",
      "tex": "latex",
      "context": "latex",
      "ly": "lilypond",
      "emacs": "lisp",
      "elisp": "lisp",
      "emacs-lisp": "lisp",
      "md": "markdown",
      "moon": "moonscript",
      "n4jsd": "n4js",
      "nani": "naniscript",
      "objc": "objectivec",
      "qasm": "openqasm",
      "objectpascal": "pascal",
      "px": "pcaxis",
      "pcode": "peoplecode",
      "plantuml": "plant-uml",
      "pq": "powerquery",
      "mscript": "powerquery",
      "pbfasm": "purebasic",
      "purs": "purescript",
      "py": "python",
      "qs": "qsharp",
      "rkt": "racket",
      "razor": "cshtml",
      "rpy": "renpy",
      "res": "rescript",
      "robot": "robotframework",
      "rb": "ruby",
      "sh-session": "shell-session",
      "shellsession": "shell-session",
      "smlnj": "sml",
      "sol": "solidity",
      "sln": "solution-file",
      "rq": "sparql",
      "sclang": "supercollider",
      "t4": "t4-cs",
      "trickle": "tremor",
      "troy": "tremor",
      "trig": "turtle",
      "ts": "typescript",
      "tsconfig": "typoscript",
      "uscript": "unrealscript",
      "uc": "unrealscript",
      "url": "uri",
      "vb": "visual-basic",
      "vba": "visual-basic",
      "webidl": "web-idl",
      "mathematica": "wolfram",
      "nb": "wolfram",
      "wl": "wolfram",
      "xeoracube": "xeora",
      "yml": "yaml"
    }
  );
  var lang_data = {};
  var ignored_language = "none";
  var languages_path = "components/";
  var script = Prism.util.currentScript();
  if (script) {
    var autoloaderFile = /\bplugins\/autoloader\/prism-autoloader\.(?:min\.)?js(?:\?[^\r\n/]*)?$/i;
    var prismFile = /(^|\/)[\w-]+\.(?:min\.)?js(?:\?[^\r\n/]*)?$/i;
    var autoloaderPath = script.getAttribute("data-autoloader-path");
    if (autoloaderPath != null) {
      languages_path = autoloaderPath.trim().replace(/\/?$/, "/");
    } else {
      var src = script.src;
      if (autoloaderFile.test(src)) {
        languages_path = src.replace(autoloaderFile, "components/");
      } else if (prismFile.test(src)) {
        languages_path = src.replace(prismFile, "$1components/");
      }
    }
  }
  var config = Prism.plugins.autoloader = {
    languages_path,
    use_minified: true,
    loadLanguages
  };
  function addScript(src2, success, error) {
    var s = document.createElement("script");
    s.src = src2;
    s.async = true;
    s.onload = function() {
      document.body.removeChild(s);
      success && success();
    };
    s.onerror = function() {
      document.body.removeChild(s);
      error && error();
    };
    document.body.appendChild(s);
  }
  function getDependencies(element) {
    var deps = (element.getAttribute("data-dependencies") || "").trim();
    if (!deps) {
      var parent = element.parentElement;
      if (parent && parent.tagName.toLowerCase() === "pre") {
        deps = (parent.getAttribute("data-dependencies") || "").trim();
      }
    }
    return deps ? deps.split(/\s*,\s*/g) : [];
  }
  function isLoaded(lang) {
    if (lang.indexOf("!") >= 0) {
      return false;
    }
    lang = lang_aliases[lang] || lang;
    if (lang in Prism.languages) {
      return true;
    }
    var data = lang_data[lang];
    return data && !data.error && data.loading === false;
  }
  function getLanguagePath(lang) {
    return config.languages_path + "prism-" + lang + (config.use_minified ? ".min" : "") + ".js";
  }
  function loadLanguages(languages, success, error) {
    if (typeof languages === "string") {
      languages = [languages];
    }
    var total = languages.length;
    var completed = 0;
    var failed = false;
    if (total === 0) {
      if (success) {
        setTimeout(success, 0);
      }
      return;
    }
    function successCallback() {
      if (failed) {
        return;
      }
      completed++;
      if (completed === total) {
        success && success(languages);
      }
    }
    languages.forEach(function(lang) {
      loadLanguage(lang, successCallback, function() {
        if (failed) {
          return;
        }
        failed = true;
        error && error(lang);
      });
    });
  }
  function loadLanguage(lang, success, error) {
    var force = lang.indexOf("!") >= 0;
    lang = lang.replace("!", "");
    lang = lang_aliases[lang] || lang;
    function load() {
      var data = lang_data[lang];
      if (!data) {
        data = lang_data[lang] = {
          callbacks: []
        };
      }
      data.callbacks.push({
        success,
        error
      });
      if (!force && isLoaded(lang)) {
        languageCallback(lang, "success");
      } else if (!force && data.error) {
        languageCallback(lang, "error");
      } else if (force || !data.loading) {
        data.loading = true;
        data.error = false;
        addScript(getLanguagePath(lang), function() {
          data.loading = false;
          languageCallback(lang, "success");
        }, function() {
          data.loading = false;
          data.error = true;
          languageCallback(lang, "error");
        });
      }
    }
    var dependencies = lang_dependencies[lang];
    if (dependencies && dependencies.length) {
      loadLanguages(dependencies, load, error);
    } else {
      load();
    }
  }
  function languageCallback(lang, type) {
    if (lang_data[lang]) {
      var callbacks = lang_data[lang].callbacks;
      for (var i = 0, l = callbacks.length; i < l; i++) {
        var callback = callbacks[i][type];
        if (callback) {
          setTimeout(callback, 0);
        }
      }
      callbacks.length = 0;
    }
  }
  Prism.hooks.add("complete", function(env) {
    var element = env.element;
    var language = env.language;
    if (!element || !language || language === ignored_language) {
      return;
    }
    var deps = getDependencies(element);
    if (/^diff-./i.test(language)) {
      deps.push("diff");
      deps.push(language.substr("diff-".length));
    } else {
      deps.push(language);
    }
    if (!deps.every(isLoaded)) {
      loadLanguages(deps, function() {
        Prism.highlightElement(element);
      });
    }
  });
})();

// node_modules/prismjs/plugins/line-numbers/prism-line-numbers.js
(function() {
  if (typeof Prism === "undefined" || typeof document === "undefined") {
    return;
  }
  var PLUGIN_NAME = "line-numbers";
  var NEW_LINE_EXP = /\n(?!$)/g;
  var config = Prism.plugins.lineNumbers = {
    /**
     * Get node for provided line number
     *
     * @param {Element} element pre element
     * @param {number} number line number
     * @returns {Element|undefined}
     */
    getLine: function(element, number) {
      if (element.tagName !== "PRE" || !element.classList.contains(PLUGIN_NAME)) {
        return;
      }
      var lineNumberRows = element.querySelector(".line-numbers-rows");
      if (!lineNumberRows) {
        return;
      }
      var lineNumberStart = parseInt(element.getAttribute("data-start"), 10) || 1;
      var lineNumberEnd = lineNumberStart + (lineNumberRows.children.length - 1);
      if (number < lineNumberStart) {
        number = lineNumberStart;
      }
      if (number > lineNumberEnd) {
        number = lineNumberEnd;
      }
      var lineIndex = number - lineNumberStart;
      return lineNumberRows.children[lineIndex];
    },
    /**
     * Resizes the line numbers of the given element.
     *
     * This function will not add line numbers. It will only resize existing ones.
     *
     * @param {HTMLElement} element A `<pre>` element with line numbers.
     * @returns {void}
     */
    resize: function(element) {
      resizeElements([element]);
    },
    /**
     * Whether the plugin can assume that the units font sizes and margins are not depended on the size of
     * the current viewport.
     *
     * Setting this to `true` will allow the plugin to do certain optimizations for better performance.
     *
     * Set this to `false` if you use any of the following CSS units: `vh`, `vw`, `vmin`, `vmax`.
     *
     * @type {boolean}
     */
    assumeViewportIndependence: true
  };
  function resizeElements(elements) {
    elements = elements.filter(function(e) {
      var codeStyles = getStyles(e);
      var whiteSpace = codeStyles["white-space"];
      return whiteSpace === "pre-wrap" || whiteSpace === "pre-line";
    });
    if (elements.length == 0) {
      return;
    }
    var infos = elements.map(function(element) {
      var codeElement = element.querySelector("code");
      var lineNumbersWrapper = element.querySelector(".line-numbers-rows");
      if (!codeElement || !lineNumbersWrapper) {
        return void 0;
      }
      var lineNumberSizer = element.querySelector(".line-numbers-sizer");
      var codeLines = codeElement.textContent.split(NEW_LINE_EXP);
      if (!lineNumberSizer) {
        lineNumberSizer = document.createElement("span");
        lineNumberSizer.className = "line-numbers-sizer";
        codeElement.appendChild(lineNumberSizer);
      }
      lineNumberSizer.innerHTML = "0";
      lineNumberSizer.style.display = "block";
      var oneLinerHeight = lineNumberSizer.getBoundingClientRect().height;
      lineNumberSizer.innerHTML = "";
      return {
        element,
        lines: codeLines,
        lineHeights: [],
        oneLinerHeight,
        sizer: lineNumberSizer
      };
    }).filter(Boolean);
    infos.forEach(function(info) {
      var lineNumberSizer = info.sizer;
      var lines = info.lines;
      var lineHeights = info.lineHeights;
      var oneLinerHeight = info.oneLinerHeight;
      lineHeights[lines.length - 1] = void 0;
      lines.forEach(function(line, index) {
        if (line && line.length > 1) {
          var e = lineNumberSizer.appendChild(document.createElement("span"));
          e.style.display = "block";
          e.textContent = line;
        } else {
          lineHeights[index] = oneLinerHeight;
        }
      });
    });
    infos.forEach(function(info) {
      var lineNumberSizer = info.sizer;
      var lineHeights = info.lineHeights;
      var childIndex = 0;
      for (var i = 0; i < lineHeights.length; i++) {
        if (lineHeights[i] === void 0) {
          lineHeights[i] = lineNumberSizer.children[childIndex++].getBoundingClientRect().height;
        }
      }
    });
    infos.forEach(function(info) {
      var lineNumberSizer = info.sizer;
      var wrapper = info.element.querySelector(".line-numbers-rows");
      lineNumberSizer.style.display = "none";
      lineNumberSizer.innerHTML = "";
      info.lineHeights.forEach(function(height, lineNumber) {
        wrapper.children[lineNumber].style.height = height + "px";
      });
    });
  }
  function getStyles(element) {
    if (!element) {
      return null;
    }
    return window.getComputedStyle ? getComputedStyle(element) : element.currentStyle || null;
  }
  var lastWidth = void 0;
  window.addEventListener("resize", function() {
    if (config.assumeViewportIndependence && lastWidth === window.innerWidth) {
      return;
    }
    lastWidth = window.innerWidth;
    resizeElements(Array.prototype.slice.call(document.querySelectorAll("pre." + PLUGIN_NAME)));
  });
  Prism.hooks.add("complete", function(env) {
    if (!env.code) {
      return;
    }
    var code = (
      /** @type {Element} */
      env.element
    );
    var pre = (
      /** @type {HTMLElement} */
      code.parentNode
    );
    if (!pre || !/pre/i.test(pre.nodeName)) {
      return;
    }
    if (code.querySelector(".line-numbers-rows")) {
      return;
    }
    if (!Prism.util.isActive(code, PLUGIN_NAME)) {
      return;
    }
    code.classList.remove(PLUGIN_NAME);
    pre.classList.add(PLUGIN_NAME);
    var match = env.code.match(NEW_LINE_EXP);
    var linesNum = match ? match.length + 1 : 1;
    var lineNumbersWrapper;
    var lines = new Array(linesNum + 1).join("<span></span>");
    lineNumbersWrapper = document.createElement("span");
    lineNumbersWrapper.setAttribute("aria-hidden", "true");
    lineNumbersWrapper.className = "line-numbers-rows";
    lineNumbersWrapper.innerHTML = lines;
    if (pre.hasAttribute("data-start")) {
      pre.style.counterReset = "linenumber " + (parseInt(pre.getAttribute("data-start"), 10) - 1);
    }
    env.element.appendChild(lineNumbersWrapper);
    resizeElements([pre]);
    Prism.hooks.run("line-numbers", env);
  });
  Prism.hooks.add("line-numbers", function(env) {
    env.plugins = env.plugins || {};
    env.plugins.lineNumbers = true;
  });
})();

// src/livecodes/utils/utils.ts
var debounce = (fn, delay) => {
  let timeout;
  return (...args) => {
    if (timeout)
      clearTimeout(timeout);
    timeout = setTimeout(() => fn.apply(null, args), typeof delay === "function" ? delay() : delay);
  };
};
var encodeHTML = (html) => html.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/'/g, "&#39;").replace(/"/g, "&#34;");

// src/livecodes/services/modules.ts
var moduleCDNs = [
  "esm.sh",
  "skypack",
  "esm.run",
  "jsdelivr.esm",
  "fastly.jsdelivr.esm",
  "gcore.jsdelivr.esm",
  "testingcf.jsdelivr.esm",
  "jsdelivr.b-cdn.esm",
  "jspm"
];
var npmCDNs = [
  "jsdelivr",
  "fastly.jsdelivr",
  "unpkg",
  "gcore.jsdelivr",
  "testingcf.jsdelivr",
  "jsdelivr.b-cdn",
  "npmcdn"
];
var ghCDNs = [
  "jsdelivr.gh",
  "fastly.jsdelivr.gh",
  "statically",
  "gcore.jsdelivr.gh",
  "testingcf.jsdelivr.gh",
  "jsdelivr.b-cdn.gh"
];
var modulesService = {
  getModuleUrl: (moduleName, {
    isModule = true,
    defaultCDN = "esm.sh",
    external
  } = {}) => {
    moduleName = moduleName.replace(/#nobundle/g, "");
    const addExternalParam = (url) => !external || !url.includes("https://esm.sh") ? url : url.includes("?") ? `${url}&external=${external}` : `${url}?external=${external}`;
    const moduleUrl = getCdnUrl(moduleName, isModule, defaultCDN);
    if (moduleUrl) {
      return addExternalParam(moduleUrl);
    }
    return isModule ? addExternalParam("https://esm.sh/" + moduleName) : "https://cdn.jsdelivr.net/npm/" + moduleName;
  },
  getUrl: (path, cdn) => path.startsWith("http") || path.startsWith("data:") ? path : getCdnUrl(path, false, cdn || getAppCDN()) || path,
  cdnLists: { npm: npmCDNs, module: moduleCDNs, gh: ghCDNs },
  checkCDNs: async (testModule, preferredCDN) => {
    const cdns = [preferredCDN, ...modulesService.cdnLists.npm].filter(Boolean);
    for (const cdn of cdns) {
      try {
        const res = await fetch(modulesService.getUrl(testModule, cdn), {
          method: "HEAD"
        });
        if (res.ok)
          return cdn;
      } catch {
      }
    }
    return modulesService.cdnLists.npm[0];
  }
};
var getAppCDN = () => {
  if (globalThis.appCDN)
    return globalThis.appCDN;
  try {
    const url = new URL(location.href);
    return url.searchParams.get("appCDN") || modulesService.cdnLists.npm[0];
  } catch {
    return modulesService.cdnLists.npm[0];
  }
};
var getCdnUrl = (modName, isModule, defaultCDN) => {
  const post = isModule && modName.startsWith("unpkg:") ? "?module" : "";
  if (modName.startsWith("gh:")) {
    modName = modName.replace("gh", ghCDNs[0]);
  } else if (!modName.includes(":")) {
    const prefix = defaultCDN || (isModule ? moduleCDNs[0] : npmCDNs[0]);
    modName = prefix + ":" + modName;
  }
  for (const i of TEMPLATES) {
    const [pattern, template] = i;
    if (pattern.test(modName)) {
      return modName.replace(pattern, template) + post;
    }
  }
  return null;
};
var TEMPLATES = [
  [/^(esm\.sh:)(.+)/i, "https://esm.sh/$2"],
  [/^(npm:)(.+)/i, "https://esm.sh/$2"],
  [/^(node:)(.+)/i, "https://esm.sh/$2"],
  [/^(jsr:)(.+)/i, "https://esm.sh/jsr/$2"],
  [/^(pr:)(.+)/i, "https://esm.sh/pr/$2"],
  [/^(pkg\.pr\.new:)(.+)/i, "https://esm.sh/pkg.pr.new/$2"],
  [/^(skypack:)(.+)/i, "https://cdn.skypack.dev/$2"],
  [/^(jsdelivr:)(.+)/i, "https://cdn.jsdelivr.net/npm/$2"],
  [/^(fastly\.jsdelivr:)(.+)/i, "https://fastly.jsdelivr.net/npm/$2"],
  [/^(gcore\.jsdelivr:)(.+)/i, "https://gcore.jsdelivr.net/npm/$2"],
  [/^(testingcf\.jsdelivr:)(.+)/i, "https://testingcf.jsdelivr.net/npm/$2"],
  [/^(jsdelivr\.b-cdn:)(.+)/i, "https://jsdelivr.b-cdn.net/npm/$2"],
  [/^(jsdelivr\.gh:)(.+)/i, "https://cdn.jsdelivr.net/gh/$2"],
  [/^(fastly\.jsdelivr\.gh:)(.+)/i, "https://fastly.jsdelivr.net/gh/$2"],
  [/^(gcore\.jsdelivr\.gh:)(.+)/i, "https://gcore.jsdelivr.net/gh/$2"],
  [/^(testingcf\.jsdelivr\.gh:)(.+)/i, "https://testingcf.jsdelivr.net/gh/$2"],
  [/^(jsdelivr\.b-cdn\.gh:)(.+)/i, "https://jsdelivr.b-cdn.net/gh/$2"],
  [/^(statically:)(.+)/i, "https://cdn.statically.io/gh/$2"],
  [/^(esm\.run:)(.+)/i, "https://esm.run/$2"],
  [/^(jsdelivr\.esm:)(.+)/i, "https://cdn.jsdelivr.net/npm/$2/+esm"],
  [/^(fastly\.jsdelivr\.esm:)(.+)/i, "https://fastly.jsdelivr.net/npm/$2/+esm"],
  [/^(gcore\.jsdelivr\.esm:)(.+)/i, "https://gcore.jsdelivr.net/npm/$2/+esm"],
  [/^(testingcf\.jsdelivr\.esm:)(.+)/i, "https://testingcf.jsdelivr.net/npm/$2/+esm"],
  [/^(jsdelivr\.b-cdn\.esm:)(.+)/i, "https://jsdelivr.b-cdn.net/npm/$2/+esm"],
  [/^(jspm:)(.+)/i, "https://jspm.dev/$2"],
  [/^(esbuild:)(.+)/i, "https://esbuild.vercel.app/$2"],
  [/^(bundle\.run:)(.+)/i, "https://bundle.run/$2"],
  [/^(unpkg:)(.+)/i, "https://unpkg.com/$2"],
  [/^(npmcdn:)(.+)/i, "https://npmcdn.com/$2"],
  [/^(bundlejs:)(.+)/i, "https://deno.bundlejs.com/?file&q=$2"],
  [/^(bundle:)(.+)/i, "https://deno.bundlejs.com/?file&q=$2"],
  [/^(deno:)(.+)/i, "https://deno.bundlejs.com/?file&q=https://deno.land/x/$2/mod.ts"],
  [/^(https:\/\/deno\.land\/.+)/i, "https://deno.bundlejs.com/?file&q=$1"],
  [
    /^(github:|https:\/\/github\.com\/)(.[^\/]+?)\/(.[^\/]+?)\/(?!releases\/)(?:(?:blob|raw)\/)?(.+?\/.+)/i,
    "https://deno.bundlejs.com/?file&q=https://cdn.jsdelivr.net/gh/$2/$3@$4"
  ],
  [/^(gist\.github:)(.+?\/[0-9a-f]+\/raw\/(?:[0-9a-f]+\/)?.+)$/i, "https://gist.githack.com/$2"],
  [
    /^(gitlab:|https:\/\/gitlab\.com\/)([^\/]+.*\/[^\/]+)\/(?:raw|blob)\/(.+?)(?:\?.*)?$/i,
    "https://deno.bundlejs.com/?file&q=https://gl.githack.com/$2/raw/$3"
  ],
  [
    /^(bitbucket:|https:\/\/bitbucket\.org\/)([^\/]+\/[^\/]+)\/(?:raw|src)\/(.+?)(?:\?.*)?$/i,
    "https://deno.bundlejs.com/?file&q=https://bb.githack.com/$2/raw/$3"
  ],
  // snippet file URL from web interface, with revision
  [
    /^(bitbucket:)snippets\/([^\/]+\/[^\/]+)\/revisions\/([^\/\#\?]+)(?:\?[^#]*)?(?:\#file-(.+?))$/i,
    "https://bb.githack.com/!api/2.0/snippets/$2/$3/files/$4"
  ],
  // snippet file URL from web interface, no revision
  [
    /^(bitbucket:)snippets\/([^\/]+\/[^\/\#\?]+)(?:\?[^#]*)?(?:\#file-(.+?))$/i,
    "https://bb.githack.com/!api/2.0/snippets/$2/HEAD/files/$3"
  ],
  // snippet file URLs from REST API
  [
    /^(bitbucket:)\!api\/2.0\/snippets\/([^\/]+\/[^\/]+\/[^\/]+)\/files\/(.+?)(?:\?.*)?$/i,
    "https://bb.githack.com/!api/2.0/snippets/$2/files/$3"
  ],
  [
    /^(api\.bitbucket:)2.0\/snippets\/([^\/]+\/[^\/]+\/[^\/]+)\/files\/(.+?)(?:\?.*)?$/i,
    "https://bb.githack.com/!api/2.0/snippets/$2/files/$3"
  ],
  [/^(rawgit:)(.+?\/[0-9a-f]+\/raw\/(?:[0-9a-f]+\/)?.+)$/i, "https://gist.githack.com/$2"],
  [
    /^(rawgit:|https:\/\/raw\.githubusercontent\.com)(\/[^\/]+\/[^\/]+|[0-9A-Za-z-]+\/[0-9a-f]+\/raw)\/(.+)/i,
    "https://deno.bundlejs.com/?file&q=https://raw.githack.com/$2/$3"
  ]
];

// src/livecodes/vendors.ts
var { getUrl, getModuleUrl } = modulesService;
var vendorsBaseUrl = (
  // 'http://127.0.0.1:8081/';
  /* @__PURE__ */ getUrl("@live-codes/browser-compilers@0.22.3/dist/")
);
var prismBaseUrl = /* @__PURE__ */ getUrl("prismjs@1.29.0/components/");
var prismOfficialThemesBaseUrl = /* @__PURE__ */ getUrl("prismjs@1.29.0/themes/");
var prismThemesBaseUrl = /* @__PURE__ */ getUrl("prism-themes@1.9.0/themes/");
var prismThemeNordUrl = /* @__PURE__ */ getUrl(
  "gh:GalenWong/nord-prism-js@9f085d2a64b37f72a516540ba3f87877d12d7e2d/prism-nord.css"
);
var prismThemesLaserWaveUrl = /* @__PURE__ */ getUrl(
  "gh:PrismJS/prism-themes@447479fc7b2be2051fe27e561aceed7cc87a589f/themes/prism-laserwave.css"
);

// src/livecodes/editor/themes.ts
var getEditorThemeData = (themeItem) => {
  let editorTheme = themeItem.trim();
  let editor;
  let theme;
  if (themeItem.includes(":")) {
    [editor, editorTheme] = editorTheme.split(":");
    if (editor !== "monaco" && editor !== "codemirror" && editor !== "codejar") {
      editor = void 0;
    }
  }
  if (themeItem.includes("@")) {
    [editorTheme, theme] = editorTheme.split("@");
    if (theme !== "light" && theme !== "dark") {
      theme = void 0;
    }
  }
  return { editor, editorTheme, theme };
};
var getEditorTheme = ({
  editor,
  editorTheme,
  theme,
  editorThemes
}) => {
  if (!editorTheme)
    return null;
  const themes = typeof editorTheme === "string" ? editorTheme.split(",").map((t) => t.trim()) : editorTheme;
  const editorThemeData = themes.map(getEditorThemeData);
  for (const editorThemeItem of editorThemeData) {
    if ((editorThemeItem.editor === editor || editorThemeItem.editor === void 0) && (editorThemeItem.theme === theme || editorThemeItem.theme === void 0) && editorThemes.includes(
      editorThemeItem.editorTheme
    )) {
      return editorThemeItem.editorTheme;
    }
  }
  return null;
};

// src/livecodes/editor/codejar/prism-themes.ts
var changeLineNumberColor = (color) => `.line-numbers-rows > span::before { color: ${color} !important; }`;
var prismThemes = [
  { name: "a11y-dark", title: "A11y Dark", url: prismThemesBaseUrl + "prism-a11y-dark.css" },
  { name: "atom-dark", title: "Atom Dark", url: prismThemesBaseUrl + "prism-atom-dark.css" },
  {
    name: "base16-ateliersulphurpool-light",
    title: "Base16 Ateliersulphurpool Light",
    url: prismThemesBaseUrl + "prism-base16-ateliersulphurpool.light.css"
  },
  {
    name: "catppuccin-latte",
    title: "Catppuccin Latte",
    url: vendorsBaseUrl + "catppuccin/prism/latte.css"
  },
  {
    name: "catppuccin-frappe",
    title: "Catppuccin Frappe",
    url: vendorsBaseUrl + "catppuccin/prism/frappe.css"
  },
  {
    name: "catppuccin-macchiato",
    title: "Catppuccin Macchiato",
    url: vendorsBaseUrl + "catppuccin/prism/macchiato.css"
  },
  {
    name: "catppuccin-mocha",
    title: "Catppuccin Mocha",
    url: vendorsBaseUrl + "catppuccin/prism/mocha.css"
  },
  { name: "cb", title: "CB", url: prismThemesBaseUrl + "prism-cb.css" },
  {
    name: "coldark-cold",
    title: "Coldark Cold",
    url: prismThemesBaseUrl + "prism-coldark-cold.css"
  },
  {
    name: "coldark-dark",
    title: "Coldark Dark",
    url: prismThemesBaseUrl + "prism-coldark-dark.css"
  },
  { name: "coy", title: "Coy", url: prismOfficialThemesBaseUrl + "prism-coy.css" },
  {
    name: "coy-without-shadows",
    title: "Coy Without Shadows",
    url: prismThemesBaseUrl + "prism-coy-without-shadows.css"
  },
  { name: "darcula", title: "Darcula", url: prismThemesBaseUrl + "prism-darcula.css" },
  { name: "dark", title: "Dark", url: prismOfficialThemesBaseUrl + "prism-dark.css" },
  { name: "dracula", title: "Dracula", url: prismThemesBaseUrl + "prism-dracula.css" },
  {
    name: "duotone-dark",
    title: "Duotone Dark",
    url: prismThemesBaseUrl + "prism-duotone-dark.css"
  },
  {
    name: "duotone-earth",
    title: "Duotone Earth",
    url: prismThemesBaseUrl + "prism-duotone-earth.css"
  },
  {
    name: "duotone-forest",
    title: "Duotone Forest",
    url: prismThemesBaseUrl + "prism-duotone-forest.css"
  },
  {
    name: "duotone-light",
    title: "Duotone Light",
    url: prismThemesBaseUrl + "prism-duotone-light.css"
  },
  {
    name: "duotone-sea",
    title: "Duotone Sea",
    url: prismThemesBaseUrl + "prism-duotone-sea.css"
  },
  {
    name: "duotone-space",
    title: "Duotone Space",
    url: prismThemesBaseUrl + "prism-duotone-space.css"
  },
  { name: "funky", title: "Funky", url: prismOfficialThemesBaseUrl + "prism-funky.css" },
  { name: "ghcolors", title: "GH Colors", url: prismThemesBaseUrl + "prism-ghcolors.css" },
  {
    name: "gruvbox-dark",
    title: "Gruvbox Dark",
    url: prismThemesBaseUrl + "prism-gruvbox-dark.css"
  },
  {
    name: "gruvbox-light",
    title: "Gruvbox Light",
    url: prismThemesBaseUrl + "prism-gruvbox-light.css"
  },
  { name: "holi-theme", title: "Holi Theme", url: prismThemesBaseUrl + "prism-holi-theme.css" },
  { name: "hopscotch", title: "Hopscotch", url: prismThemesBaseUrl + "prism-hopscotch.css" },
  { name: "laserwave", title: "Laserwave", url: prismThemesLaserWaveUrl },
  { name: "lucario", title: "Lucario", url: prismThemesBaseUrl + "prism-lucario.css" },
  {
    name: "material-dark",
    title: "Material Dark",
    url: prismThemesBaseUrl + "prism-material-dark.css"
  },
  {
    name: "material-light",
    title: "Material Light",
    url: prismThemesBaseUrl + "prism-material-light.css"
  },
  {
    name: "material-oceanic",
    title: "Material Oceanic",
    url: prismThemesBaseUrl + "prism-material-oceanic.css"
  },
  {
    name: "monochrome",
    title: "Monochrome",
    // code[class*="language-"],pre[class*="language-"]{color:#24292e;background-color:#fffffe;}
    url: "data:text/css;charset=UTF-8;base64,Y29kZVtjbGFzcyo9Imxhbmd1YWdlLSJdLHByZVtjbGFzcyo9Imxhbmd1YWdlLSJde2NvbG9yOiMyNDI5MmU7YmFja2dyb3VuZC1jb2xvcjojZmZmZmZlO30="
  },
  {
    name: "monochrome-dark",
    title: "Monochrome Dark",
    // code[class*="language-"],pre[class*="language-"]{color:#e2e2e3;background-color:#24292e;}
    url: "data:text/css;charset=UTF-8;base64,Y29kZVtjbGFzcyo9Imxhbmd1YWdlLSJdLHByZVtjbGFzcyo9Imxhbmd1YWdlLSJde2NvbG9yOiNlMmUyZTM7YmFja2dyb3VuZC1jb2xvcjojMjQyOTJlO30="
  },
  { name: "night-owl", title: "Night Owl", url: prismThemesBaseUrl + "prism-night-owl.css" },
  { name: "nord", title: "Nord", url: prismThemesBaseUrl + "prism-nord.css" },
  { name: "nord-2", title: "Nord 2", url: prismThemeNordUrl },
  { name: "okaidia", title: "Okaidia", url: prismOfficialThemesBaseUrl + "prism-okaidia.css" },
  { name: "one-dark", title: "One Dark", url: prismThemesBaseUrl + "prism-one-dark.css" },
  { name: "one-light", title: "One Light", url: prismThemesBaseUrl + "prism-one-light.css" },
  { name: "pojoaque", title: "Pojoaque", url: prismThemesBaseUrl + "prism-pojoaque.css" },
  {
    name: "shades-of-purple",
    title: "Shades of Purple",
    url: prismThemesBaseUrl + "prism-shades-of-purple.css"
  },
  {
    name: "solarized-dark-atom",
    title: "Solarized Dark Atom",
    url: prismThemesBaseUrl + "prism-solarized-dark-atom.css"
  },
  {
    name: "solarized-light",
    title: "Solarized Light",
    url: prismOfficialThemesBaseUrl + "prism-solarizedlight.css"
  },
  { name: "synthwave84", title: "Synthwave 84", url: prismThemesBaseUrl + "prism-synthwave84.css" },
  { name: "tomorrow", title: "Tomorrow", url: prismOfficialThemesBaseUrl + "prism-tomorrow.css" },
  { name: "twilight", title: "Twilight", url: prismOfficialThemesBaseUrl + "prism-twilight.css" },
  { name: "vs", title: "VS", url: prismThemesBaseUrl + "prism-vs.css" },
  {
    name: "vsc-dark-plus",
    title: "VSC Dark Plus",
    url: prismThemesBaseUrl + "prism-vsc-dark-plus.css"
  },
  {
    name: "xonokai",
    title: "Xonokai",
    url: prismThemesBaseUrl + "prism-xonokai.css",
    overrideCSS: changeLineNumberColor("#6f705e")
  },
  { name: "z-touchs", title: "Z-Touchs", url: prismThemesBaseUrl + "prism-z-touch.css" }
];

// src/livecodes/editor/codejar/codejar.ts
Prism.manual = true;
Prism.plugins.autoloader.languages_path = prismBaseUrl;
var createEditor = async (options) => {
  const { container, mode, editorId, readonly, isEmbed, getFormatterConfig, getFontFamily } = options;
  if (!container)
    throw new Error("editor container not found");
  let { value, language } = options;
  let currentPosition = { lineNumber: 1 };
  const mapLanguage = options.mapLanguage || ((lang) => lang);
  let mappedLanguage = language === "wat" ? "wasm" : mapLanguage(language);
  let editorOptions;
  const preElement = document.createElement("pre");
  const codeElement = document.createElement("code");
  container.appendChild(preElement);
  preElement.appendChild(codeElement);
  container.classList.add("prism");
  if (!readonly && editorId !== "codeToImage") {
    container.classList.add("codejar");
    preElement.addEventListener("click", () => {
      currentPosition = getPosition();
      focus(
        /* restorePosition = */
        false
      );
    });
    preElement.addEventListener("blur", () => {
      currentPosition = getPosition();
    });
  }
  new ResizeObserver(() => {
    if (!editorOptions.wordWrap)
      return;
    highlight();
  }).observe(preElement);
  codeElement.className = "language-" + mappedLanguage;
  codeElement.innerHTML = encodeHTML(value).trim() || "\n";
  if (options.editorId !== "console" && options.editorId !== "embed") {
    preElement.classList.add("line-numbers");
  }
  if (mode === "codeblock") {
    preElement.classList.add("codeblock");
  }
  const loadLanguage = (lang) => new Promise((res) => {
    const tempEl = document.createElement("code");
    tempEl.className = "language-" + lang;
    Prism.highlightElement(tempEl, false, res);
    tempEl.remove();
  });
  const highlight = async () => {
    const hasFocus = document.activeElement === codeElement;
    let pos;
    try {
      pos = codejar?.save();
    } catch {
    }
    if (mappedLanguage in Prism.languages) {
      Prism.highlightElement(codeElement);
      if (pos && hasFocus) {
        codejar?.restore(pos);
      }
      return;
    }
    await loadLanguage(mappedLanguage);
    const fn = debounce(() => {
      Prism.highlightElement(codeElement);
      listeners.splice(listeners.indexOf(fn), 1);
      if (pos) {
        codejar?.restore(pos);
      }
    }, 100);
    fn();
    onContentChanged(fn);
  };
  if (readonly) {
    highlight();
  }
  const codejar = readonly || options.editorId === "console" ? void 0 : CodeJar(codeElement, highlight, {});
  codejar?.recordHistory();
  const listeners = [];
  const handleUpdate = () => {
    currentPosition = getPosition();
    if (getValue() === value)
      return;
    listeners.forEach((fn) => fn());
    if (!getValue()) {
      setValue();
    }
    value = getValue();
  };
  codejar?.onUpdate(handleUpdate);
  const getEditorId = () => editorId;
  const getValue = () => codejar ? codejar.toString() : value;
  const setValue = (newValue = "\n") => {
    value = newValue;
    if (codejar) {
      codejar.updateCode(value);
      codejar.recordHistory();
    } else {
      codeElement.innerHTML = encodeHTML(value).trim();
      highlight();
    }
  };
  const focus = (restorePosition = true) => {
    codeElement.focus();
    if (restorePosition) {
      setPosition(
        currentPosition,
        /* smoothScroll = */
        false
      );
      currentPosition = getPosition();
    }
  };
  const getLanguage = () => language;
  const setLanguage = (lang, newValue) => {
    language = lang;
    mappedLanguage = mapLanguage(language);
    codeElement.className = "language-" + mappedLanguage;
    highlight();
    if (newValue != null) {
      setValue(newValue);
    }
  };
  const onContentChanged = (fn) => {
    listeners.push(fn);
  };
  const ctrl = navigator.platform.match("Mac") ? "metaKey" : "ctrlKey";
  const keyCodes = {
    CtrlEnter: {
      name: "CtrlEnter",
      code: {
        [ctrl]: true,
        key: "Enter"
      }
    },
    ShiftEnter: {
      name: "ShiftEnter",
      code: {
        shiftKey: true,
        key: "Enter"
      }
    },
    Enter: {
      name: "Enter",
      code: {
        key: "Enter"
      }
    },
    UpArrow: {
      name: "UpArrow",
      code: {
        key: "ArrowUp"
      }
    },
    DownArrow: {
      name: "DownArrow",
      code: {
        key: "ArrowDown"
      }
    },
    ShiftAltF: {
      name: "ShiftAltF",
      code: {
        altKey: true,
        shiftKey: true,
        key: "F"
      }
    }
  };
  const keyBindings = {};
  const addKeyBinding = (_label, keyCode, callback) => {
    keyBindings[keyCode.name] = callback;
  };
  container.addEventListener("keydown", (ev) => {
    let found = false;
    const keys = Object.keys(keyCodes);
    keys.forEach((key) => {
      if (found)
        return;
      const evObj = keyCodes[key].code;
      for (const k in evObj) {
        if ({}.hasOwnProperty.call(evObj, k)) {
          if (evObj[k] !== ev[k]) {
            return;
          }
        }
      }
      keyBindings[key]?.();
      found = true;
    });
  });
  let formatter;
  const registerFormatter = (formatFn) => {
    if (!formatFn)
      return;
    formatter = formatFn;
    addKeyBinding("format", keyCodes.ShiftAltF, async () => {
      await format();
      focus(
        /* restorePosition = */
        false
      );
    });
  };
  const format = async () => {
    if (!formatter)
      return;
    const position = codejar?.save();
    const offset = (position?.dir === "<-" ? position.start : position?.end) || 0;
    const oldValue = getValue();
    const newValue = await formatter(oldValue, offset, getFormatterConfig());
    setValue(newValue.formatted);
    const newOffset = newValue.cursorOffset >= 0 ? newValue.cursorOffset : 0;
    codejar?.restore({ start: newOffset, end: newOffset });
  };
  const setTheme = (theme, editorTheme) => {
    const defaultThemes = { dark: "vsc-dark-plus", light: "vs" };
    const selectedTheme = getEditorTheme({
      editor: "codejar",
      editorTheme,
      theme,
      editorThemes: prismThemes.map((t) => t.name)
    });
    const newTheme = !selectedTheme ? defaultThemes[theme] : selectedTheme;
    const themeData = prismThemes.find((t) => t.name === newTheme);
    const id = "prism-styles";
    const styles = document.head.querySelector("#" + id);
    const stylesUrl = themeData?.url;
    if (!stylesUrl || styles?.href === stylesUrl)
      return;
    styles?.remove();
    const stylesheet = document.createElement("link");
    stylesheet.rel = "stylesheet";
    stylesheet.href = stylesUrl;
    stylesheet.id = id;
    stylesheet.crossOrigin = "anonymous";
    document.head.appendChild(stylesheet);
    const id2 = "prism-styles-override";
    document.getElementById(id2)?.remove();
    if (themeData?.overrideCSS) {
      const styleEl = document.createElement("style");
      styleEl.id = id2;
      styleEl.innerHTML = themeData.overrideCSS;
      document.head.appendChild(styleEl);
    }
  };
  setTheme(options.theme, options.editorTheme);
  const convertOptions = (opt) => ({
    fontFamily: getFontFamily(opt.fontFamily),
    fontSize: (opt.fontSize || (isEmbed ? 12 : 14)) + "px",
    tab: opt.useTabs ? "	" : " ".repeat(opt.tabSize || 2),
    tabSize: String(opt.tabSize),
    lineNumbers: opt.lineNumbers,
    wordWrap: opt.wordWrap ? "pre-wrap" : "pre",
    addClosing: opt.closeBrackets
  });
  const changeSettings = (settings) => {
    editorOptions = convertOptions(settings);
    codejar?.updateOptions({
      tab: editorOptions.tab,
      addClosing: editorOptions.addClosing
    });
    const id = "codejar-styles";
    document.getElementById(id)?.remove();
    const styleEl = document.createElement("style");
    styleEl.id = id;
    styleEl.innerHTML = `
      .prism * {
        font-family: ${editorOptions.fontFamily} !important;
        font-size: ${editorOptions.fontSize} !important;
        line-height: 1.5 !important;
        tab-size: ${editorOptions.tabSize} !important;
        white-space: ${editorOptions.wordWrap} !important;
      }
    `;
    document.head.appendChild(styleEl);
    setTheme(settings.theme, settings.editorTheme);
    preElement.classList.toggle("line-numbers", Boolean(editorOptions.lineNumbers));
    highlight();
  };
  changeSettings(options);
  const undo = () => {
    codejar?.handleUndoRedo(
      new KeyboardEvent("keydown", {
        key: "Z",
        [ctrl]: true
      })
    );
  };
  const redo = () => {
    codejar?.handleUndoRedo(
      new KeyboardEvent("keydown", {
        key: "Z",
        [ctrl]: true,
        shiftKey: true
      })
    );
  };
  const getPosition = () => {
    let position;
    try {
      position = codejar?.save().start ?? 0;
    } catch (e) {
      position = 0;
    }
    const allLines = getValue().split("\n");
    let length = 0;
    let lineNumber = 1;
    let column = 0;
    for (const line of allLines) {
      if (length + line.length < position) {
        length += line.length + 1;
        lineNumber += 1;
      } else {
        column = position - length;
        break;
      }
    }
    return { lineNumber, column };
  };
  const setPosition = ({ lineNumber, column = 0 }, smoothScroll = true) => {
    const allLines = getValue().split("\n");
    const line = allLines.length > lineNumber ? lineNumber : allLines.length;
    const selectedLine = allLines[line - 1];
    const columnNumber = (selectedLine.length > column ? column : selectedLine.length) + 1;
    const previousLines = allLines.slice(0, line - 1);
    const nextLines = allLines.slice(line);
    const position = previousLines.join("\n").length + columnNumber - (previousLines.length > 0 ? 0 : 1);
    codeElement.innerHTML = encodeHTML(
      previousLines.join("\n") + (previousLines.length > 0 ? "\n" : "") + selectedLine.slice(0, columnNumber)
    ) + `<div id="scroll-target">\u200B</div>` + encodeHTML(selectedLine.slice(columnNumber) + "\n" + nextLines.join("\n"));
    const target = codeElement.querySelector("#scroll-target");
    if (target) {
      target.scrollIntoView({
        behavior: smoothScroll ? "smooth" : void 0,
        block: "center",
        inline: "center"
      });
      target.remove();
    }
    highlight();
    codejar?.restore({ start: position, end: position });
  };
  const destroy = () => {
    codejar?.destroy();
    listeners.length = 0;
    Object.keys(keyBindings).forEach((k) => delete keyBindings[k]);
    container.innerHTML = "";
  };
  return {
    getValue,
    setValue,
    getLanguage,
    setLanguage,
    getEditorId,
    focus,
    getPosition,
    setPosition: (position) => setPosition(position),
    onContentChanged,
    keyCodes,
    addKeyBinding,
    changeSettings,
    registerFormatter,
    format,
    isReadonly: readonly,
    setTheme,
    undo,
    redo,
    destroy,
    prism: Prism,
    codejar
  };
};
export {
  createEditor
};
/*! Bundled license information:

prismjs/prism.js:
  (**
   * Prism: Lightweight, robust, elegant syntax highlighting
   *
   * @license MIT <https://opensource.org/licenses/MIT>
   * @author Lea Verou <https://lea.verou.me>
   * @namespace
   * @public
   *)
*/
