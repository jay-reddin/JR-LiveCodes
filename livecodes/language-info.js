// src/livecodes/utils/utils.ts
var predefinedValues = {
  APP_VERSION: "47",
  SDK_VERSION: "0.12.0",
  COMMIT_SHA: "7b4906d",
  REPO_URL: "https://github.com/live-codes/livecodes",
  DOCS_BASE_URL: "http://localhost:3000/docs/"
};

// src/livecodes/html/language-info.html?raw
var language_info_default = `<section data-lang="art-template">\r
  <h3 data-i18n="language-info:artTemplate.name">art-template</h3>\r
  <div data-i18n="language-info:artTemplate.desc">\r
    High performance JavaScript templating engine.\r
  </div>\r
  <ul data-i18n="language-info:artTemplate.link" data-i18n-prop="innerHTML">\r
    <li>\r
      <a href="https://aui.github.io/art-template/" target="_blank" rel="noopener"\r
        >art-template official website</a\r
      >\r
    </li>\r
    <li>\r
      <a href="https://aui.github.io/art-template/docs/" target="_blank" rel="noopener"\r
        >art-template documentation</a\r
      >\r
    </li>\r
  </ul>\r
</section>\r
<section data-lang="asciidoc">\r
  <h3 data-i18n="language-info:asciidoc.name">AsciiDoc</h3>\r
  <div data-i18n="language-info:asciidoc.desc">AsciiDoc compiled to HTML using Asciidoctor.</div>\r
  <ul data-i18n="language-info:asciidoc.link" data-i18n-prop="innerHTML">\r
    <li>\r
      <a href="https://asciidoc.org/" target="_blank" rel="noopener">AsciiDoc official website</a>\r
    </li>\r
    <li>\r
      <a href="https://asciidoctor.org/" target="_blank" rel="noopener"\r
        >Asciidoctor official website</a\r
      >\r
    </li>\r
    <li>\r
      <a href="https://asciidoctor.org/docs/" target="_blank" rel="noopener"\r
        >Asciidoctor documentation</a\r
      >\r
    </li>\r
    <li>\r
      <a href="https://learnxinyminutes.com/docs/asciidoc/" target="_blank" rel="noopener"\r
        >Learn X in Y minutes, where X=asciidoc</a\r
      >\r
    </li>\r
  </ul>\r
</section>\r
<section data-lang="assemblyscript">\r
  <h3 data-i18n="language-info:assemblyscript.name">AssemblyScript</h3>\r
  <div data-i18n="language-info:assemblyscript.desc">\r
    A TypeScript-like language for WebAssembly.\r
  </div>\r
  <ul data-i18n="language-info:assemblyscript.link" data-i18n-prop="innerHTML">\r
    <li>\r
      <a href="https://www.assemblyscript.org/" target="_blank" rel="noopener"\r
        >AssemblyScript official website</a\r
      >\r
    </li>\r
    <li>\r
      <a href="https://www.assemblyscript.org/introduction.html" target="_blank" rel="noopener"\r
        >AssemblyScript documentation</a\r
      >\r
    </li>\r
    <li>\r
      <a\r
        href="?template=assemblyscript"\r
        class="button"\r
        target="_parent"\r
        data-template="assemblyscript"\r
        >Load starter template</a\r
      >\r
    </li>\r
  </ul>\r
</section>\r
<section data-lang="astro">\r
  <h3 data-i18n="language-info:astro.name">Astro</h3>\r
  <div data-i18n="language-info:astro.desc">\r
    Build faster websites with less client-side Javascript. (Still in Beta)\r
  </div>\r
  <ul data-i18n="language-info:astro.link" data-i18n-prop="innerHTML">\r
    <li>\r
      <a href="https://astro.build/" target="_blank" rel="noopener">Astro official website</a>\r
    </li>\r
    <li>\r
      <a href="https://docs.astro.build/" target="_blank" rel="noopener">Astro documentation</a>\r
    </li>\r
    <li>\r
      <a href="?template=astro" class="button" target="_parent" data-template="astro"\r
        >Load starter template</a\r
      >\r
    </li>\r
  </ul>\r
</section>\r
<section data-lang="babel">\r
  <h3 data-i18n="language-info:babel.name">Babel</h3>\r
  <div data-i18n="language-info:babel.desc">The JavaScript compiler</div>\r
  <ul data-i18n="language-info:babel.link" data-i18n-prop="innerHTML">\r
    <li><a href="https://babeljs.io/" target="_blank" rel="noopener">Official website</a></li>\r
    <li>\r
      <a href="https://babeljs.io/docs/" target="_blank" rel="noopener">Babel documentation</a>\r
    </li>\r
  </ul>\r
</section>\r
<section data-lang="bbcode">\r
  <h3 data-i18n="language-info:bbcode.name">BBCode</h3>\r
  <div data-i18n="language-info:bbcode.desc">\r
    BBCode ("Bulletin Board Code") is a lightweight markup language used to format messages in many\r
    Internet forum software.\r
  </div>\r
  <ul data-i18n="language-info:bbcode.link" data-i18n-prop="innerHTML">\r
    <li><a href="https://www.bbcode.org/" target="_blank" rel="noopener">bbcode.org</a></li>\r
    <li>\r
      <a href="https://www.phpbb.com/community/help/bbcode" target="_blank" rel="noopener"\r
        >BBCode guide</a\r
      >\r
    </li>\r
    <li>\r
      <a href="https://en.wikipedia.org/wiki/BBCode" target="_blank" rel="noopener"\r
        >BBCode on Wikipedia</a\r
      >\r
    </li>\r
  </ul>\r
</section>\r
<section data-lang="civet">\r
  <h3 data-i18n="language-info:civet.name">Civet</h3>\r
  <div data-i18n="language-info:civet.desc">\r
    Civet is a programming language that compiles to TypeScript or JavaScript, so you can use\r
    existing tooling but enable concise and powerful syntax.\r
  </div>\r
  <ul data-i18n="language-info:civet.link" data-i18n-prop="innerHTML">\r
    <li>\r
      <a href="https://civet.dev/" target="_blank" rel="noopener">Civet official website</a>\r
    </li>\r
    <li>\r
      <a href="https://civet.dev/cheatsheet/" target="_blank" rel="noopener">Civet cheatsheet</a>\r
    </li>\r
    <li>\r
      <a href="?template=civet" class="button" target="_parent" data-template="civet"\r
        >Load starter template</a\r
      >\r
    </li>\r
  </ul>\r
</section>\r
<section data-lang="clio">\r
  <h3 data-i18n="language-info:clio.name">Clio</h3>\r
  <div data-i18n="language-info:clio.desc">\r
    Clio is a fast, distributed, functional programming language that compiles to JavaScript.\r
  </div>\r
  <ul data-i18n="language-info:clio.link" data-i18n-prop="innerHTML">\r
    <li>\r
      <a href="https://clio-lang.org/" target="_blank" rel="noopener">Clio official website</a>\r
    </li>\r
    <li>\r
      <a href="https://docs.clio-lang.org/" target="_blank" rel="noopener">Clio documentation</a>\r
    </li>\r
    <li>\r
      <a href="?template=clio" class="button" target="_parent" data-template="clio"\r
        >Load starter template</a\r
      >\r
    </li>\r
  </ul>\r
</section>\r
<section data-lang="cpp">\r
  <h3 data-i18n="language-info:cpp.name">C++</h3>\r
  <div data-i18n="language-info:cpp.desc1">\r
    C++ support using JSCPP (a simple C++ interpreter written in JavaScript).\r
  </div>\r
  <div data-i18n="language-info:cpp.desc2" data-i18n-prop="innerHTML">\r
    It is not a complete implementation of C++. Please refer to\r
    <a href="https://github.com/felixhao28/JSCPP" target="_blank" rel="noopener"\r
      >JSCPP documentation</a\r
    >\r
    for details.\r
  </div>\r
  <ul data-i18n="language-info:cpp.link" data-i18n-prop="innerHTML">\r
    <li>\r
      <a href="https://isocpp.org/" target="_blank" rel="noopener">Standard C++ Foundation</a>\r
    </li>\r
    <li>\r
      <a href="https://github.com/felixhao28/JSCPP" target="_blank" rel="noopener">JSCPP</a>\r
    </li>\r
    <li>\r
      <a href="https://learnxinyminutes.com/docs/c++/" target="_blank" rel="noopener"\r
        >Learn X in Y minutes, where X=C++</a\r
      >\r
    </li>\r
    <li>\r
      <a href="?template=cpp" class="button" target="_parent" data-template="cpp"\r
        >Load starter template</a\r
      >\r
    </li>\r
  </ul>\r
</section>\r
<section data-lang="cpp-wasm">\r
  <h3 data-i18n="language-info:cppWasm.name">C/C++ (Wasm)</h3>\r
  <div data-i18n="language-info:cppWasm.desc" data-i18n-prop="innerHTML">\r
    Clang C/C++ compiler running on WebAssembly, using\r
    <a href="https://github.com/binji/wasm-clang" target="_blank" rel="noopener">wasm-clang</a>\r
    adapted by\r
    <a href="https://github.com/chris-koch-penn/polylang.io" target="_blank" rel="noopener"\r
      >polylang.io</a\r
    >\r
  </div>\r
  <ul data-i18n="language-info:cppWasm.link" data-i18n-prop="innerHTML">\r
    <li>\r
      <a href="https://isoclang.org/" target="_blank" rel="noopener">Standard C++ Foundation</a>\r
    </li>\r
    <li>\r
      <a href="https://clang.llvm.org/" target="_blank" rel="noopener">Clang official website</a>\r
    </li>\r
    <li>\r
      <a href="https://learnxinyminutes.com/docs/c++/" target="_blank" rel="noopener"\r
        >Learn X in Y minutes, where X=C++</a\r
      >\r
    </li>\r
    <li>\r
      <a href="?template=cpp-wasm" class="button" target="_parent" data-template="cpp-wasm"\r
        >Load starter template</a\r
      >\r
    </li>\r
  </ul>\r
</section>\r
<section data-lang="clojurescript">\r
  <h3 data-i18n="language-info:clojurescript.name">ClojureScript (CLJS)</h3>\r
  <div data-i18n="language-info:clojurescript.desc" data-i18n-prop="innerHTML">\r
    ClojureScript is a compiler for\r
    <a href="https://clojure.org/" target="_blank" rel="noopener">Clojure</a> that targets\r
    JavaScript. <br />In LiveCodes, it runs in the browser using\r
    <a href="https://github.com/squint-cljs/cherry" target="_blank" rel="noopener">Cherry</a>\r
  </div>\r
  <ul data-i18n="language-info:clojurescript.link" data-i18n-prop="innerHTML">\r
    <li>\r
      <a href="https://clojurescript.org/" target="_blank" rel="noopener"\r
        >ClojureScript official website</a\r
      >\r
    </li>\r
    <li>\r
      <a href="https://clojure.org/" target="_blank" rel="noopener">Clojure official website</a>\r
    </li>\r
    <li>\r
      <a href="https://github.com/squint-cljs/cherry" target="_blank" rel="noopener">Cherry repo</a>\r
    </li>\r
    <li>\r
      <a href="https://learnxinyminutes.com/docs/clojure/" target="_blank" rel="noopener"\r
        >Learn X in Y minutes, where X=clojure</a\r
      >\r
    </li>\r
    <li>\r
      <a href="{{DOCS_BASE_URL}}languages/clojurescript" target="_blank" rel="noopener"\r
        >LiveCodes Documentations</a\r
      >\r
    </li>\r
    <li>\r
      <a\r
        href="?template=clojurescript"\r
        class="button"\r
        target="_parent"\r
        data-template="clojurescript"\r
        >Load starter template</a\r
      >\r
    </li>\r
  </ul>\r
</section>\r
<section data-lang="coffeescript">\r
  <h3 data-i18n="language-info:coffeescript.name">CoffeeScript</h3>\r
  <div data-i18n="language-info:coffeescript.desc">Unfancy JavaScript.</div>\r
  <ul data-i18n="language-info:coffeescript.link" data-i18n-prop="innerHTML">\r
    <li>\r
      <a href="https://coffeescript.org/" target="_blank" rel="noopener"\r
        >CoffeeScript official website</a\r
      >\r
    </li>\r
    <li>\r
      <a href="https://learnxinyminutes.com/docs/coffeescript/" target="_blank" rel="noopener"\r
        >Learn X in Y minutes, where X=coffeescript</a\r
      >\r
    </li>\r
    <li>\r
      <a href="?template=coffeescript" class="button" target="_parent" data-template="coffeescript"\r
        >Load starter template</a\r
      >\r
    </li>\r
  </ul>\r
</section>\r
<section data-lang="commonlisp">\r
  <h3 data-i18n="language-info:commonlisp.name">Common Lisp</h3>\r
  <div data-i18n="language-info:commonlisp.desc">\r
    A Common Lisp implementation on Javascript using JSCL (a Lisp-to-Javascript compiler\r
    bootstrapped from Common Lisp).\r
  </div>\r
  <ul data-i18n="language-info:commonlisp.link" data-i18n-prop="innerHTML">\r
    <li>\r
      <a href="https://common-lisp.net/" target="_blank" rel="noopener">Common-Lisp.net</a>\r
    </li>\r
    <li>\r
      <a href="https://github.com/jscl-project/jscl" target="_blank" rel="noopener">JSCL Project</a>\r
    </li>\r
    <li>\r
      <a href="https://common-lisp.net/documentation" target="_blank" rel="noopener"\r
        >Common Lisp Resources</a\r
      >\r
    </li>\r
    <li>\r
      <a href="https://learnxinyminutes.com/docs/common-lisp/" target="_blank" rel="noopener"\r
        >Learn X in Y minutes, where X=Common Lisp</a\r
      >\r
    </li>\r
    <li>\r
      <a href="?template=commonlisp" class="button" target="_parent" data-template="commonlisp"\r
        >Load starter template</a\r
      >\r
    </li>\r
  </ul>\r
</section>\r
<section data-lang="csharp-wasm">\r
  <h3 data-i18n="language-info:csharpWasm.name">C# (Wasm)</h3>\r
  <div data-i18n="language-info:csharpWasm.desc" data-i18n-prop="innerHTML">\r
    C# compiler running on WebAssembly, using\r
    <a\r
      href="https://dotnet.microsoft.com/en-us/apps/aspnet/web-apps/blazor"\r
      target="_blank"\r
      rel="noopener"\r
      >Blazor</a\r
    >\r
  </div>\r
  <ul data-i18n="language-info:csharpWasm.link" data-i18n-prop="innerHTML">\r
    <li>\r
      <a href="https://learn.microsoft.com/en-us/dotnet/csharp/" target="_blank" rel="noopener"\r
        >C# language documentation</a\r
      >\r
    </li>\r
    <li>\r
      <a href="https://learnxinyminutes.com/docs/csharp/" target="_blank" rel="noopener"\r
        >Learn X in Y minutes, where X=C#</a\r
      >\r
    </li>\r
    <li>\r
      <a href="{{DOCS_BASE_URL}}languages/csharp-wasm" target="_blank" rel="noopener"\r
        >LiveCodes Documentation</a\r
      >\r
    </li>\r
    <li>\r
      <a href="?template=csharp-wasm" class="button" target="_parent" data-template="csharp-wasm"\r
        >Load starter template</a\r
      >\r
    </li>\r
  </ul>\r
</section>\r
<section data-lang="diagrams">\r
  <h3 data-i18n="language-info:diagrams.name">Diagrams</h3>\r
  <div data-i18n="language-info:diagrams.desc1" class="description warn">(Experimental)</div>\r
  <div data-i18n="language-info:diagrams.desc2">Diagrams-as-code. Supports:</div>\r
  <ol data-i18n="language-info:diagrams.desc3" data-i18n-prop="innerHTML">\r
    <li>\r
      <a href="https://js.cytoscape.org/" target="_blank" rel="noopener">Cytoscape</a>\r
    </li>\r
    <li>\r
      <a href="https://www.eclipse.org/elk/" target="_blank" rel="noopener">ELK</a>\r
      (using <a href="https://github.com/kieler/elkjs" target="_blank" rel="noopener">elkjs</a>)\r
    </li>\r
    <li>\r
      <a href="http://www.gnuplot.info/" target="_blank" rel="noopener">Gnuplot</a>\r
      (using\r
      <a href="https://github.com/chhu/gnuplot-JS" target="_blank" rel="noopener">gnuplot-JS</a>)\r
    </li>\r
    <li>\r
      <a href="https://graphviz.org/" target="_blank" rel="noopener">Graphviz</a>\r
      (using\r
      <a href="https://github.com/hpcc-systems/hpcc-js-wasm" target="_blank" rel="noopener"\r
        >@hpcc-js/wasm</a\r
      >)\r
    </li>\r
    <li>\r
      <a href="https://mermaid-js.github.io/mermaid/" target="_blank" rel="noopener">Mermaid</a>\r
    </li>\r
    <li>\r
      <a href="https://nomnoml.com/" target="_blank" rel="noopener">Nomnoml</a>\r
    </li>\r
    <li>\r
      <a href="https://pintorajs.vercel.app/" target="_blank" rel="noopener">Pintora</a>\r
    </li>\r
    <li>\r
      <a href="https://plotly.com/graphing-libraries/" target="_blank" rel="noopener">Plotly</a>\r
    </li>\r
    <li>\r
      <a href="https://github.com/ivanceras/svgbob" target="_blank" rel="noopener">Svgbob</a>\r
    </li>\r
    <li>\r
      <a href="https://vega.github.io/vega/" target="_blank" rel="noopener">Vega</a>\r
    </li>\r
    <li>\r
      <a href="https://vega.github.io/vega-lite/" target="_blank" rel="noopener">VegaLite</a>\r
    </li>\r
    <li>\r
      <a href="https://wavedrom.com/" target="_blank" rel="noopener">WaveDrom</a>\r
    </li>\r
  </ol>\r
  <ul data-i18n="language-info:diagrams.link" data-i18n-prop="innerHTML">\r
    <li>\r
      <a href="?template=diagrams" class="button" target="_parent" data-template="diagrams"\r
        >Load starter template</a\r
      >\r
    </li>\r
    <li>\r
      <a href="{{DOCS_BASE_URL}}languages/diagrams" target="_blank" rel="noopener"\r
        >LiveCodes Documentation</a\r
      >\r
    </li>\r
  </ul>\r
</section>\r
<section data-lang="dot">\r
  <h3 data-i18n="language-info:dot.name">doT.js</h3>\r
  <div data-i18n="language-info:dot.desc">\r
    The fastest + concise javascript template engine for Node.js and browsers.\r
  </div>\r
  <ul data-i18n="language-info:dot.link" data-i18n-prop="innerHTML">\r
    <li>\r
      <a href="https://olado.github.io/doT/" target="_blank" rel="noopener">Official website</a>\r
    </li>\r
    <li>\r
      <a href="{{DOCS_BASE_URL}}languages/dot" target="_blank" rel="noopener"\r
        >LiveCodes Documentations</a\r
      >\r
    </li>\r
  </ul>\r
</section>\r
<section data-lang="ejs">\r
  <h3 data-i18n="language-info:ejs.name">EJS</h3>\r
  <div data-i18n="language-info:ejs.desc">Embedded JavaScript templating.</div>\r
  <ul data-i18n="language-info:ejs.link" data-i18n-prop="innerHTML">\r
    <li><a href="https://ejs.co/" target="_blank" rel="noopener">Official website</a></li>\r
    <li>\r
      <a href="{{DOCS_BASE_URL}}languages/ejs" target="_blank" rel="noopener"\r
        >LiveCodes Documentations</a\r
      >\r
    </li>\r
  </ul>\r
</section>\r
<section data-lang="eta">\r
  <h3 data-i18n="language-info:eta.name">Eta</h3>\r
  <div data-i18n="language-info:eta.desc">\r
    Embedded JS template engine for Node, Deno, and the browser. Lightweight, fast, and pluggable.\r
    Written in TypeScript.\r
  </div>\r
  <ul data-i18n="language-info:eta.link" data-i18n-prop="innerHTML">\r
    <li><a href="https://eta.js.org/" target="_blank" rel="noopener">Official website</a></li>\r
    <li>\r
      <a href="https://eta.js.org/docs/learn" target="_blank" rel="noopener">Documentation</a>\r
    </li>\r
    <li>\r
      <a href="{{DOCS_BASE_URL}}languages/eta" target="_blank" rel="noopener"\r
        >LiveCodes Documentations</a\r
      >\r
    </li>\r
  </ul>\r
</section>\r
<section data-lang="fennel">\r
  <h3 data-i18n="language-info:fennel.name">Fennel</h3>\r
  <div data-i18n="language-info:fennel.desc">\r
    Fennel is a programming language that brings together the speed, simplicity, and reach of Lua\r
    with the flexibility of a lisp syntax and macro system.\r
  </div>\r
  <ul data-i18n="language-info:fennel.link" data-i18n-prop="innerHTML">\r
    <li>\r
      <a href="https://fennel-lang.org/" target="_blank" rel="noopener">Fennel official website</a>\r
    </li>\r
    <li>\r
      <a href="https://fennel-lang.org/tutorial" target="_blank" rel="noopener"\r
        >Getting Started with Fennel</a\r
      >\r
    </li>\r
    <li>\r
      <a href="{{DOCS_BASE_URL}}languages/fennel" target="_blank" rel="noopener"\r
        >LiveCodes Documentations</a\r
      >\r
    </li>\r
    <li>\r
      <a href="?template=fennel" class="button" target="_parent" data-template="fennel"\r
        >Load starter template</a\r
      >\r
    </li>\r
  </ul>\r
</section>\r
<section data-lang="flow">\r
  <h3 data-i18n="language-info:flow.name">Flow</h3>\r
  <div data-i18n="language-info:flow.desc">Flow is a static type checker for JavaScript.</div>\r
  <ul data-i18n="language-info:flow.link" data-i18n-prop="innerHTML">\r
    <li>\r
      <a href="https://flow.org/" target="_blank" rel="noopener">Flow official website</a>\r
    </li>\r
    <li>\r
      <a href="https://flow.org/en/docs/" target="_blank" rel="noopener">Flow documentation</a>\r
    </li>\r
  </ul>\r
</section>\r
<section data-lang="gleam">\r
  <h3 data-i18n="language-info:gleam.name">Gleam</h3>\r
  <div data-i18n="language-info:gleam.desc1">\r
    Gleam is a friendly language for building type-safe systems that scale!\r
  </div>\r
  <div data-i18n="language-info:gleam.desc2">\r
    Gleam is a statically-typed functional programming language, which compiles to Erlang or\r
    JavaScript.\r
  </div>\r
  <ul data-i18n="language-info:gleam.link" data-i18n-prop="innerHTML">\r
    <li><a href="https://gleam.run/" target="_blank" rel="noopener">Gleam website</a></li>\r
    <li>\r
      <a href="https://gleam.run/documentation/" target="_blank" rel="noopener"\r
        >Gleam documentation</a\r
      >\r
    </li>\r
    <li>\r
      <a href="https://tour.gleam.run/" target="_blank" rel="noopener">Gleam language tour</a>\r
    </li>\r
    <li>\r
      <a href="?template=gleam" class="button" target="_parent" data-template="gleam"\r
        >Load starter template</a\r
      >\r
    </li>\r
  </ul>\r
</section>\r
<section data-lang="go">\r
  <h3 data-i18n="language-info:go.name">Go</h3>\r
  <div data-i18n="language-info:go.desc1">\r
    Go (Golang) is an open source programming language that makes it easy to build simple, reliable,\r
    and efficient software.\r
  </div>\r
  <div data-i18n="language-info:go.desc2">Here, it is compiled to JavaScript using GopherJS.</div>\r
  <ul data-i18n="language-info:go.link" data-i18n-prop="innerHTML">\r
    <li><a href="https://golang.org/" target="_blank" rel="noopener">Go website</a></li>\r
    <li><a href="https://golang.org/doc/" target="_blank" rel="noopener">Go documentation</a></li>\r
    <li>\r
      <a href="https://github.com/gopherjs/gopherjs" target="_blank" rel="noopener"\r
        >GopherJS repo</a\r
      >\r
    </li>\r
    <li>\r
      <a href="https://learnxinyminutes.com/docs/go/" target="_blank" rel="noopener"\r
        >Learn X in Y minutes, where X=Go</a\r
      >\r
    </li>\r
    <li>\r
      <a href="{{DOCS_BASE_URL}}languages/go" target="_blank" rel="noopener"\r
        >LiveCodes Documentations</a\r
      >\r
    </li>\r
    <li>\r
      <a href="?template=go" class="button" target="_parent" data-template="go"\r
        >Load starter template</a\r
      >\r
    </li>\r
  </ul>\r
</section>\r
<section data-lang="go-wasm">\r
  <h3 data-i18n="language-info:goWasm.name">Go (Wasm)</h3>\r
  <div data-i18n="language-info:goWasm.desc">\r
    Go interpreter running on WebAssembly, using Yaegi\r
  </div>\r
  <ul data-i18n="language-info:goWasm.link" data-i18n-prop="innerHTML">\r
    <li><a href="https://golang.org/" target="_blank" rel="noopener">Go official website</a></li>\r
    <li><a href="https://yaegi.org/" target="_blank" rel="noopener">Yaegi</a></li>\r
    <li>\r
      <a href="https://learnxinyminutes.com/docs/go/" target="_blank" rel="noopener"\r
        >Learn X in Y minutes, where X=Go</a\r
      >\r
    </li>\r
    <li>\r
      <a href="{{DOCS_BASE_URL}}languages/go-wasm" target="_blank" rel="noopener"\r
        >LiveCodes Documentations</a\r
      >\r
    </li>\r
    <li>\r
      <a href="?template=go-wasm" class="button" target="_parent" data-template="go-wasm"\r
        >Load starter template</a\r
      >\r
    </li>\r
  </ul>\r
</section>\r
<section data-lang="haml">\r
  <h3 data-i18n="language-info:haml.name">Haml</h3>\r
  <div data-i18n="language-info:haml.desc">\r
    Haml compiler for client side javascript view templates using clientside-haml-js.\r
  </div>\r
  <ul data-i18n="language-info:haml.link" data-i18n-prop="innerHTML">\r
    <li><a href="https://haml.info/" target="_blank" rel="noopener">Haml official website</a></li>\r
    <li>\r
      <a href="https://haml.info/docs.html" target="_blank" rel="noopener">Haml documentation</a>\r
    </li>\r
    <li>\r
      <a href="https://github.com/uglyog/clientside-haml-js" target="_blank" rel="noopener"\r
        >clientside-haml-js GitHub repo</a\r
      >\r
    </li>\r
    <li>\r
      <a href="https://learnxinyminutes.com/docs/haml/" target="_blank" rel="noopener"\r
        >Learn X in Y minutes, where X=haml</a\r
      >\r
    </li>\r
    <li>\r
      <a href="{{DOCS_BASE_URL}}languages/haml" target="_blank" rel="noopener"\r
        >LiveCodes Documentations</a\r
      >\r
    </li>\r
  </ul>\r
</section>\r
<section data-lang="handlebars">\r
  <h3 data-i18n="language-info:handlebars.name">Handlebars</h3>\r
  <div data-i18n="language-info:handlebars.desc">Minimal templating on steroids.</div>\r
  <ul data-i18n="language-info:handlebars.link" data-i18n-prop="innerHTML">\r
    <li><a href="https://handlebarsjs.com/" target="_blank" rel="noopener">Official website</a></li>\r
    <li>\r
      <a href="{{DOCS_BASE_URL}}languages/handlebars" target="_blank" rel="noopener"\r
        >LiveCodes Documentations</a\r
      >\r
    </li>\r
  </ul>\r
</section>\r
<section data-lang="imba">\r
  <h3 data-i18n="language-info:imba.name">Imba</h3>\r
  <div data-i18n="language-info:imba.desc">The friendly full-stack language.</div>\r
  <ul data-i18n="language-info:imba.link" data-i18n-prop="innerHTML">\r
    <li><a href="https://imba.io/" target="_blank" rel="noopener">Official website</a></li>\r
  </ul>\r
</section>\r
<section data-lang="java">\r
  <h3 data-i18n="language-info:java.name">Java</h3>\r
  <div data-i18n="language-info:java.desc" data-i18n-prop="innerHTML">\r
    JVM running in the browser using DoppioJVM.\r
  </div>\r
  <ul data-i18n="language-info:java.link" data-i18n-prop="innerHTML">\r
    <li>\r
      <a href="https://www.java.com/" target="_blank" rel="noopener">Java official website</a>\r
    </li>\r
    <li>\r
      <a href="https://github.com/plasma-umass/doppio" target="_blank" rel="noopener">DoppioJVM</a>\r
    </li>\r
    <li>\r
      <a href="https://learnxinyminutes.com/docs/java/" target="_blank" rel="noopener"\r
        >Learn X in Y minutes, where X=java</a\r
      >\r
    </li>\r
    <li>\r
      <a href="{{DOCS_BASE_URL}}languages/java" target="_blank" rel="noopener"\r
        >LiveCodes Documentation</a\r
      >\r
    </li>\r
    <li>\r
      <a href="?template=java" class="button" target="_parent" data-template="java"\r
        >Load starter template</a\r
      >\r
    </li>\r
  </ul>\r
</section>\r
<section data-lang="jinja">\r
  <h3 data-i18n="language-info:jinja.name">Jinja</h3>\r
  <div data-i18n="language-info:jinja.desc">\r
    Jinja is a fast, expressive, extensible templating engine.\r
  </div>\r
  <ul data-i18n="language-info:jinja.link" data-i18n-prop="innerHTML">\r
    <li>\r
      <a href="https://jinja.palletsprojects.com/" target="_blank" rel="noopener"\r
        >Official website</a\r
      >\r
    </li>\r
    <li>\r
      <a\r
        href="https://jinja.palletsprojects.com/en/stable/templates/"\r
        target="_blank"\r
        rel="noopener"\r
        >Template documentation</a\r
      >\r
    </li>\r
    <li>\r
      <a\r
        href="https://github.com/huggingface/huggingface.js/tree/main/packages/jinja"\r
        target="_blank"\r
        rel="noopener"\r
        >JavaScript implementation</a\r
      >\r
    </li>\r
    <li>\r
      <a href="{{DOCS_BASE_URL}}languages/jinja" target="_blank" rel="noopener"\r
        >LiveCodes Documentations</a\r
      >\r
    </li>\r
  </ul>\r
</section>\r
<section data-lang="jsx">\r
  <h3 data-i18n="language-info:jsx.name">JSX</h3>\r
  <div data-i18n="language-info:jsx.desc">\r
    JSX is compiled to JavaScript in LiveCodes using the TypeScript Compiler. <br />\r
    By default it uses React as the JSX runtime.\r
  </div>\r
  <ul data-i18n="language-info:jsx.link" data-i18n-prop="innerHTML">\r
    <li>\r
      <a href="https://react.dev/" target="_blank" rel="noopener">React official website</a>\r
    </li>\r
    <li>\r
      <a href="https://react.dev/learn/writing-markup-with-jsx" target="_blank" rel="noopener"\r
        >JSX in React documentation</a\r
      >\r
    </li>\r
    <li>\r
      <a href="{{DOCS_BASE_URL}}languages/jsx" target="_blank" rel="noopener"\r
        >LiveCodes Documentations</a\r
      >\r
    </li>\r
  </ul>\r
</section>\r
<section data-lang="julia">\r
  <h3 data-i18n="language-info:julia.name">Julia</h3>\r
  <div data-i18n="language-info:julia.desc1" class="description warn">\r
    Julia language support in LiveCodes is still experimental\r
  </div>\r
  <div data-i18n="language-info:julia.desc2" data-i18n-prop="innerHTML">\r
    Julia compiler and Julia Base running on WASM, using\r
    <a href="https://github.com/Keno/julia-wasm" target="_blank" rel="noopener">julia-wasm</a>\r
    adapted by\r
    <a href="https://github.com/chris-koch-penn/polylang.io" target="_blank" rel="noopener"\r
      >polylang.io</a\r
    >\r
  </div>\r
  <ul data-i18n="language-info:julia.link" data-i18n-prop="innerHTML">\r
    <li>\r
      <a href="https://julialang.org/" target="_blank" rel="noopener">Julia official website</a>\r
    </li>\r
    <li>\r
      <a href="https://docs.julialang.org/en/v1/" target="_blank" rel="noopener"\r
        >Julia documentation</a\r
      >\r
    </li>\r
    <li>\r
      <a href="https://learnxinyminutes.com/docs/julia/" target="_blank" rel="noopener"\r
        >Learn X in Y minutes, where X=Julia</a\r
      >\r
    </li>\r
    <li>\r
      <a href="?template=julia" class="button" target="_parent" data-template="julia"\r
        >Load starter template</a\r
      >\r
    </li>\r
  </ul>\r
</section>\r
<section data-lang="less">\r
  <h3 data-i18n="language-info:less.name">Less</h3>\r
  <div data-i18n="language-info:less.desc">It's CSS, with just a little more.</div>\r
  <ul data-i18n="language-info:less.link" data-i18n-prop="innerHTML">\r
    <li><a href="https://lesscss.org/" target="_blank" rel="noopener">Less official website</a></li>\r
    <li>\r
      <a href="https://learnxinyminutes.com/docs/less/" target="_blank" rel="noopener"\r
        >Learn X in Y minutes, where X=less</a\r
      >\r
    </li>\r
  </ul>\r
</section>\r
<section data-lang="liquid">\r
  <h3 data-i18n="language-info:liquid.name">LiquidJS</h3>\r
  <div data-i18n="language-info:liquid.desc">A simple, expressive and safe template engine.</div>\r
  <ul data-i18n="language-info:liquid.link" data-i18n-prop="innerHTML">\r
    <li>\r
      <a href="https://liquidjs.com" target="_blank" rel="noopener">LiquidJS official website</a>\r
    </li>\r
    <li>\r
      <a href="https://liquidjs.com/tutorials/intro-to-liquid.html" target="_blank" rel="noopener"\r
        >LiquidJS documentation</a\r
      >\r
    </li>\r
    <li>\r
      <a href="{{DOCS_BASE_URL}}languages/liquid" target="_blank" rel="noopener"\r
        >LiveCodes Documentations</a\r
      >\r
    </li>\r
  </ul>\r
</section>\r
<section data-lang="livescript">\r
  <h3 data-i18n="language-info:livescript.name">LiveScript</h3>\r
  <div data-i18n="language-info:livescript.desc">A language which compiles to JavaScript.</div>\r
  <ul data-i18n="language-info:livescript.link" data-i18n-prop="innerHTML">\r
    <li>\r
      <a href="https://livescript.net/" target="_blank" rel="noopener"\r
        >LiveScript official website</a\r
      >\r
    </li>\r
    <li>\r
      <a href="https://learnxinyminutes.com/docs/livescript/" target="_blank" rel="noopener"\r
        >Learn X in Y minutes, where X=LiveScript</a\r
      >\r
    </li>\r
    <li>\r
      <a href="?template=livescript" class="button" target="_parent" data-template="livescript"\r
        >Load starter template</a\r
      >\r
    </li>\r
  </ul>\r
</section>\r
<section data-lang="lua">\r
  <h3 data-i18n="language-info:lua.name">Lua</h3>\r
  <div data-i18n="language-info:lua.desc">Lua running in the browser using fengari-web.</div>\r
  <ul data-i18n="language-info:lua.link" data-i18n-prop="innerHTML">\r
    <li><a href="https://www.lua.org/" target="_blank" rel="noopener">Lua official website</a></li>\r
    <li>\r
      <a href="https://www.lua.org/manual/5.4/manual.html" target="_blank" rel="noopener"\r
        >Lua documentation</a\r
      >\r
    </li>\r
    <li>\r
      <a href="https://fengari.io/" target="_blank" rel="noopener">Fengari official website</a>\r
    </li>\r
    <li>\r
      <a href="https://github.com/fengari-lua/fengari-web" target="_blank" rel="noopener"\r
        >fengari-web GitHub repo</a\r
      >\r
    </li>\r
    <li>\r
      <a href="https://learnxinyminutes.com/docs/lua/" target="_blank" rel="noopener"\r
        >Learn X in Y minutes, where X=Lua</a\r
      >\r
    </li>\r
    <li>\r
      <a href="{{DOCS_BASE_URL}}languages/lua" target="_blank" rel="noopener"\r
        >LiveCodes Documentations</a\r
      >\r
    </li>\r
    <li>\r
      <a href="?template=lua" class="button" target="_parent" data-template="lua"\r
        >Load starter template</a\r
      >\r
    </li>\r
  </ul>\r
</section>\r
<section data-lang="lua-wasm">\r
  <h3 data-i18n="language-info:luaWasm.name">Lua (Wasm)</h3>\r
  <div data-i18n="language-info:luaWasm.desc">\r
    Lua running in the browser using Wasmoon, a real lua 5.4 VM with JS bindings made with\r
    WebAssembly.\r
  </div>\r
  <ul data-i18n="language-info:luaWasm.link" data-i18n-prop="innerHTML">\r
    <li><a href="https://www.lua.org/" target="_blank" rel="noopener">Lua official website</a></li>\r
    <li>\r
      <a href="https://www.lua.org/manual/5.4/manual.html" target="_blank" rel="noopener"\r
        >Lua documentation</a\r
      >\r
    </li>\r
    <li>\r
      <a href="https://github.com/ceifa/wasmoon" target="_blank" rel="noopener"\r
        >Wasmoon GitHub repo</a\r
      >\r
    </li>\r
    <li>\r
      <a href="https://learnxinyminutes.com/docs/lua/" target="_blank" rel="noopener"\r
        >Learn X in Y minutes, where X=Lua</a\r
      >\r
    </li>\r
    <li>\r
      <a href="{{DOCS_BASE_URL}}languages/lua-wasm" target="_blank" rel="noopener"\r
        >LiveCodes Documentations</a\r
      >\r
    </li>\r
    <li>\r
      <a href="?template=lua-wasm" class="button" target="_parent" data-template="lua-wasm"\r
        >Load starter template</a\r
      >\r
    </li>\r
  </ul>\r
</section>\r
<section data-lang="malina">\r
  <h3 data-i18n="language-info:malina.name">Malina.js</h3>\r
  <div data-i18n="language-info:malina.desc">Frontend compiler, inspired by Svelte.</div>\r
  <ul data-i18n="language-info:malina.link" data-i18n-prop="innerHTML">\r
    <li>\r
      <a href="https://github.com/malinajs/malinajs" target="_blank" rel="noopener"\r
        >Malina.js repo</a\r
      >\r
    </li>\r
    <li>\r
      <a href="https://malinajs.github.io/docs/" target="_blank" rel="noopener"\r
        >Malina.js documentation</a\r
      >\r
    </li>\r
    <li>\r
      <a href="?template=malina" class="button" target="_parent" data-template="malina"\r
        >Load starter template</a\r
      >\r
    </li>\r
  </ul>\r
</section>\r
<section data-lang="markdown">\r
  <h3 data-i18n="language-info:markdown.name">Markdown</h3>\r
  <div data-i18n="language-info:markdown.desc">Markdown compiled to HTML using Marked.</div>\r
  <ul data-i18n="language-info:markdown.link" data-i18n-prop="innerHTML">\r
    <li>\r
      <a href="https://daringfireball.net/projects/markdown/" target="_blank" rel="noopener"\r
        >Markdown official website</a\r
      >\r
    </li>\r
    <li>\r
      <a href="https://marked.js.org/" target="_blank" rel="noopener">Marked documentation</a>\r
    </li>\r
    <li>\r
      <a href="https://learnxinyminutes.com/docs/markdown/" target="_blank" rel="noopener"\r
        >Learn X in Y minutes, where X=markdown</a\r
      >\r
    </li>\r
    <li>\r
      <a href="?template=markdown" class="button" target="_parent" data-template="markdown"\r
        >Load starter template</a\r
      >\r
    </li>\r
  </ul>\r
</section>\r
<section data-lang="mdx">\r
  <h3 data-i18n="language-info:mdx.name">MDX</h3>\r
  <div data-i18n="language-info:mdx.desc" data-i18n-prop="innerHTML">\r
    Markdown for the component era. <br />MDX lets you seamlessly write JSX in your Markdown\r
    documents.\r
  </div>\r
  <ul data-i18n="language-info:mdx.link" data-i18n-prop="innerHTML">\r
    <li><a href="https://mdxjs.com/" target="_blank" rel="noopener">MDX documentation</a></li>\r
    <li>\r
      <a href="?template=mdx" class="button" target="_parent" data-template="mdx"\r
        >Load starter template</a\r
      >\r
    </li>\r
  </ul>\r
</section>\r
<section data-lang="mjml">\r
  <h3 data-i18n="language-info:mjml.name">MJML</h3>\r
  <div data-i18n="language-info:mjml.desc">\r
    MJML is a markup language designed to reduce the pain of coding a responsive email.\r
  </div>\r
  <ul data-i18n="language-info:mjml.link" data-i18n-prop="innerHTML">\r
    <li><a href="https://mjml.io/" target="_blank" rel="noopener">MJML official website</a></li>\r
    <li>\r
      <a href="https://documentation.mjml.io/" target="_blank" rel="noopener">MJML documentation</a>\r
    </li>\r
    <li>\r
      <a href="https://mjml.io/templates" target="_blank" rel="noopener">MJML official templates</a>\r
    </li>\r
    <li>\r
      <a href="{{DOCS_BASE_URL}}languages/mjml" target="_blank" rel="noopener"\r
        >LiveCodes Documentations</a\r
      >\r
    </li>\r
  </ul>\r
</section>\r
<section data-lang="mustache">\r
  <h3 data-i18n="language-info:mustache.name">Mustache</h3>\r
  <div data-i18n="language-info:mustache.desc">Logic-less templates.</div>\r
  <ul data-i18n="language-info:mustache.link" data-i18n-prop="innerHTML">\r
    <li>\r
      <a href="https://mustache.github.io/" target="_blank" rel="noopener">Official website</a>\r
    </li>\r
    <li>\r
      <a href="https://mustache.github.io/mustache.5.html" target="_blank" rel="noopener"\r
        >mustache(5) manual</a\r
      >\r
    </li>\r
    <li>\r
      <a href="https://github.com/janl/mustache.js" target="_blank" rel="noopener"\r
        >JavaScript implementation</a\r
      >\r
    </li>\r
    <li>\r
      <a href="{{DOCS_BASE_URL}}languages/mustache" target="_blank" rel="noopener"\r
        >LiveCodes Documentations</a\r
      >\r
    </li>\r
  </ul>\r
</section>\r
<section data-lang="nunjucks">\r
  <h3 data-i18n="language-info:nunjucks.name">Nunjucks</h3>\r
  <div data-i18n="language-info:nunjucks.desc" data-i18n-prop="innerHTML">\r
    A rich and powerful templating language for JavaScript. Nunjucks is essentially a port of\r
    <a href="http://jinja.pocoo.org/docs/" target="_blank" rel="noopener">jinja2</a>\r
  </div>\r
  <ul data-i18n="language-info:nunjucks.link" data-i18n-prop="innerHTML">\r
    <li>\r
      <a href="https://mozilla.github.io/nunjucks/" target="_blank" rel="noopener"\r
        >Official website</a\r
      >\r
    </li>\r
    <li>\r
      <a href="{{DOCS_BASE_URL}}languages/nunjucks" target="_blank" rel="noopener"\r
        >LiveCodes Documentations</a\r
      >\r
    </li>\r
  </ul>\r
</section>\r
<section data-lang="twig">\r
  <h3 data-i18n="language-info:twig.name">Twig</h3>\r
  <div data-i18n="language-info:twig.desc" data-i18n-prop="innerHTML">\r
    A JavaScript implementation of the\r
    <a href="https://twig.symfony.com/" target="_blank" rel="noopener">Twig</a>\r
    PHP templating language by\r
    <a href="https://github.com/twigjs/twig.js" target="_blank" rel="noopener">Twig.js</a>\r
  </div>\r
  <ul data-i18n="language-info:twig.link" data-i18n-prop="innerHTML">\r
    <li>\r
      <a href="https://twig.symfony.com/" target="_blank" rel="noopener">Twig official website</a>\r
    </li>\r
    <li>\r
      <a href="https://twig.symfony.com/doc/3.x/" target="_blank" rel="noopener"\r
        >Twig Documentation</a\r
      >\r
    </li>\r
    <li>\r
      <a href="https://github.com/twigjs/twig.js" target="_blank" rel="noopener">Twig.js Repo</a>\r
    </li>\r
    <li>\r
      <a href="https://github.com/twigjs/twig.js/wiki" target="_blank" rel="noopener"\r
        >Twig.js Documentation</a\r
      >\r
    </li>\r
    <li>\r
      <a href="{{DOCS_BASE_URL}}languages/twig" target="_blank" rel="noopener"\r
        >LiveCodes Documentations</a\r
      >\r
    </li>\r
  </ul>\r
</section>\r
<section data-lang="ocaml">\r
  <h3 data-i18n="language-info:ocaml.name">OCaml</h3>\r
  <div data-i18n="language-info:ocaml.desc1">\r
    OCaml is an industrial-strength programming language supporting functional, imperative and\r
    object-oriented styles.\r
  </div>\r
  <div data-i18n="language-info:ocaml.desc2">\r
    ReScript compiler is used here to compile OCaml to JavaScript.\r
  </div>\r
  <ul data-i18n="language-info:ocaml.link" data-i18n-prop="innerHTML">\r
    <li><a href="https://ocaml.org/" target="_blank" rel="noopener">OCaml website</a></li>\r
    <li>\r
      <a href="https://ocaml.org/docs/" target="_blank" rel="noopener">OCaml documentation</a>\r
    </li>\r
    <li>\r
      <a href="https://rescript-lang.org/" target="_blank" rel="noopener">ReScript website</a>\r
    </li>\r
    <li>\r
      <a href="https://learnxinyminutes.com/docs/ocaml/" target="_blank" rel="noopener"\r
        >Learn X in Y minutes, where X=OCaml</a\r
      >\r
    </li>\r
    <li>\r
      <a href="?template=ocaml" class="button" target="_parent" data-template="ocaml"\r
        >Load starter template</a\r
      >\r
    </li>\r
  </ul>\r
</section>\r
<section data-lang="perl">\r
  <h3 data-i18n="language-info:perl.name">Perl</h3>\r
  <div data-i18n="language-info:perl.desc">Perl running in the browser using Perlito.</div>\r
  <ul data-i18n="language-info:perl.link" data-i18n-prop="innerHTML">\r
    <li>\r
      <a href="https://www.perl.org/" target="_blank" rel="noopener">Perl official website</a>\r
    </li>\r
    <li>\r
      <a href="https://perldoc.perl.org/" target="_blank" rel="noopener">Perl documentation</a>\r
    </li>\r
    <li>\r
      <a\r
        href="https://github.com/fglock/Perlito/blob/master/README-perlito5.md"\r
        target="_blank"\r
        rel="noopener"\r
        >Perlito5 Readme</a\r
      >\r
    </li>\r
    <li>\r
      <a href="https://learnxinyminutes.com/docs/perl/" target="_blank" rel="noopener"\r
        >Learn X in Y minutes, where X=perl</a\r
      >\r
    </li>\r
    <li>\r
      <a href="?template=perl" class="button" target="_parent" data-template="perl"\r
        >Load starter template</a\r
      >\r
    </li>\r
  </ul>\r
</section>\r
<section data-lang="postgresql">\r
  <h3 data-i18n="language-info:postgresql.name">PostgreSQL</h3>\r
  <div data-i18n="language-info:postgresql.desc">PostgreSQL packaged as WASM using PGlite</div>\r
  <ul data-i18n="language-info:postgresql.link" data-i18n-prop="innerHTML">\r
    <li>\r
      <a href="https://www.postgresql.org/" target="_blank" rel="noopener"\r
        >PostgreSQL official website</a\r
      >\r
    </li>\r
    <li>\r
      <a href="https://www.postgresql.org/docs/" target="_blank" rel="noopener"\r
        >PostgreSQL documentation</a\r
      >\r
    </li>\r
    <li>\r
      <a href="https://github.com/electric-sql/pglite" target="_blank" rel="noopener"\r
        >PGlite GitHub repo</a\r
      >\r
    </li>\r
    <li>\r
      <a href="https://learnxinyminutes.com/docs/sql/" target="_blank" rel="noopener"\r
        >Learn X in Y minutes, where X=SQL</a\r
      >\r
    </li>\r
    <li>\r
      <a href="?template=postgresql" class="button" target="_parent" data-template="postgresql"\r
        >Load starter template</a\r
      >\r
    </li>\r
  </ul>\r
</section>\r
<section data-lang="php">\r
  <h3 data-i18n="language-info:php.name">PHP</h3>\r
  <div data-i18n="language-info:php.desc">PHP running in the browser using Uniter.</div>\r
  <ul data-i18n="language-info:php.link" data-i18n-prop="innerHTML">\r
    <li><a href="https://www.php.net/" target="_blank" rel="noopener">PHP official website</a></li>\r
    <li>\r
      <a href="https://www.php.net/manual/en/" target="_blank" rel="noopener">PHP documentation</a>\r
    </li>\r
    <li>\r
      <a href="https://github.com/asmblah/uniter" target="_blank" rel="noopener"\r
        >Uniter GitHub repo</a\r
      >\r
    </li>\r
    <li>\r
      <a href="https://learnxinyminutes.com/docs/php/" target="_blank" rel="noopener"\r
        >Learn X in Y minutes, where X=PHP</a\r
      >\r
    </li>\r
    <li>\r
      <a href="{{DOCS_BASE_URL}}languages/php" target="_blank" rel="noopener"\r
        >LiveCodes Documentations</a\r
      >\r
    </li>\r
    <li>\r
      <a href="?template=php" class="button" target="_parent" data-template="php"\r
        >Load starter template</a\r
      >\r
    </li>\r
  </ul>\r
</section>\r
<section data-lang="php-wasm">\r
  <h3 data-i18n="language-info:phpWasm.name">PHP (Wasm)</h3>\r
  <div data-i18n="language-info:phpWasm.desc">\r
    PHP in Browser, powered by WebAssembly, using php-wasm.\r
  </div>\r
  <ul data-i18n="language-info:phpWasm.link" data-i18n-prop="innerHTML">\r
    <li><a href="https://www.php.net/" target="_blank" rel="noopener">PHP official website</a></li>\r
    <li>\r
      <a href="https://www.php.net/manual/en/" target="_blank" rel="noopener">PHP documentation</a>\r
    </li>\r
    <li>\r
      <a href="https://github.com/seanmorris/php-wasm" target="_blank" rel="noopener"\r
        >php-wasm GitHub repo</a\r
      >\r
    </li>\r
    <li>\r
      <a href="https://learnxinyminutes.com/docs/php/" target="_blank" rel="noopener"\r
        >Learn X in Y minutes, where X=PHP</a\r
      >\r
    </li>\r
    <li>\r
      <a href="{{DOCS_BASE_URL}}languages/php-wasm" target="_blank" rel="noopener"\r
        >LiveCodes Documentations</a\r
      >\r
    </li>\r
    <li>\r
      <a href="?template=php-wasm" class="button" target="_parent" data-template="php-wasm"\r
        >Load starter template</a\r
      >\r
    </li>\r
  </ul>\r
</section>\r
<section data-lang="prolog">\r
  <h3 data-i18n="language-info:prolog.name">Tau Prolog</h3>\r
  <div data-i18n="language-info:prolog.desc">An open source Prolog interpreter in JavaScript.</div>\r
  <ul data-i18n="language-info:prolog.link" data-i18n-prop="innerHTML">\r
    <li>\r
      <a href="http://tau-prolog.org/" target="_blank" rel="noopener"\r
        >Tau Prolog official website</a\r
      >\r
    </li>\r
    <li>\r
      <a href="http://tau-prolog.org/documentation" target="_blank" rel="noopener"\r
        >Tau Prolog documentation</a\r
      >\r
    </li>\r
    <li>\r
      <a href="https://www.swi-prolog.org/" target="_blank" rel="noopener">SWI-Prolog</a>\r
    </li>\r
    <li>\r
      <a href="https://learnxinyminutes.com/docs/prolog/" target="_blank" rel="noopener"\r
        >Learn X in Y minutes, where X=Prolog</a\r
      >\r
    </li>\r
    <li>\r
      <a href="?template=prolog" class="button" target="_parent" data-template="prolog"\r
        >Load starter template</a\r
      >\r
    </li>\r
  </ul>\r
</section>\r
<section data-lang="pug">\r
  <h3 data-i18n="language-info:pug.name">Pug</h3>\r
  <div data-i18n="language-info:pug.desc">Robust, elegant, feature rich template engine.</div>\r
  <ul data-i18n="language-info:pug.link" data-i18n-prop="innerHTML">\r
    <li>\r
      <a href="https://pugjs.org/api/getting-started.html" target="_blank" rel="noopener"\r
        >Pug documentation</a\r
      >\r
    </li>\r
    <li>\r
      <a href="https://learnxinyminutes.com/docs/pug/" target="_blank" rel="noopener"\r
        >Learn X in Y minutes, where X=Pug</a\r
      >\r
    </li>\r
    <li>\r
      <a href="{{DOCS_BASE_URL}}languages/pug" target="_blank" rel="noopener"\r
        >LiveCodes Documentations</a\r
      >\r
    </li>\r
  </ul>\r
</section>\r
<section data-lang="python-wasm">\r
  <h3 data-i18n="language-info:pythonWasm.name">Python (Wasm)</h3>\r
  <div data-i18n="language-info:pythonWasm.desc1">\r
    Python with the scientific stack, compiled to WebAssembly using Pyodide.\r
  </div>\r
  <div data-i18n="language-info:pythonWasm.desc2" class="description help">\r
    Pyodide allows using Python scientific stack including NumPy, Pandas, Matplotlib, SciPy,\r
    scikit-learn and many more. In addition it\u2019s possible to install pure Python wheels from PyPi.\r
  </div>\r
  <ul data-i18n="language-info:pythonWasm.link" data-i18n-prop="innerHTML">\r
    <li>\r
      <a href="https://www.python.org/" target="_blank" rel="noopener">Python official website</a>\r
    </li>\r
    <li>\r
      <a href="https://www.python.org/doc/" target="_blank" rel="noopener">Python documentation</a>\r
    </li>\r
    <li><a href="https://pyodide.org/" target="_blank" rel="noopener">Pyodide documentation</a></li>\r
    <li>\r
      <a href="https://learnxinyminutes.com/docs/python/" target="_blank" rel="noopener"\r
        >Learn X in Y minutes, where X=Python</a\r
      >\r
    </li>\r
    <li>\r
      <a href="{{DOCS_BASE_URL}}languages/python-wasm" target="_blank" rel="noopener"\r
        >LiveCodes Documentations</a\r
      >\r
    </li>\r
    <li>\r
      <a href="?template=python-wasm" class="button" target="_parent" data-template="python-wasm"\r
        >Load starter template</a\r
      >\r
    </li>\r
  </ul>\r
</section>\r
<section data-lang="python">\r
  <h3 data-i18n="language-info:python.name">Python</h3>\r
  <div data-i18n="language-info:python.desc">Python running in the browser using Brython.</div>\r
  <ul data-i18n="language-info:python.link" data-i18n-prop="innerHTML">\r
    <li>\r
      <a href="https://www.python.org/" target="_blank" rel="noopener">Python official website</a>\r
    </li>\r
    <li>\r
      <a href="https://www.python.org/doc/" target="_blank" rel="noopener">Python documentation</a>\r
    </li>\r
    <li>\r
      <a href="https://brython.info/" target="_blank" rel="noopener">Brython documentation</a>\r
    </li>\r
    <li>\r
      <a href="https://learnxinyminutes.com/docs/python/" target="_blank" rel="noopener"\r
        >Learn X in Y minutes, where X=Python</a\r
      >\r
    </li>\r
    <li>\r
      <a href="{{DOCS_BASE_URL}}languages/python" target="_blank" rel="noopener"\r
        >LiveCodes Documentations</a\r
      >\r
    </li>\r
    <li>\r
      <a href="?template=python" class="button" target="_parent" data-template="python"\r
        >Load starter template</a\r
      >\r
    </li>\r
  </ul>\r
</section>\r
<section data-lang="r">\r
  <h3 data-i18n="language-info:r.name">R</h3>\r
  <div data-i18n="language-info:r.desc">R running in the browser using WebR.</div>\r
  <ul data-i18n="language-info:r.link" data-i18n-prop="innerHTML">\r
    <li>\r
      <a href="https://www.r-project.org/" target="_blank" rel="noopener"\r
        >R project official website</a\r
      >\r
    </li>\r
    <li>\r
      <a href="https://cran.r-project.org/manuals.html" target="_blank" rel="noopener"\r
        >The R Manuals</a\r
      >\r
    </li>\r
    <li>\r
      <a href="https://r4ds.hadley.nz/" target="_blank" rel="noopener">R for Data Science (2e)</a>\r
    </li>\r
    <li>\r
      <a href="https://docs.r-wasm.org/webr/latest/" target="_blank" rel="noopener"\r
        >WebR documentation</a\r
      >\r
    </li>\r
    <li>\r
      <a href="https://learnxinyminutes.com/docs/r/" target="_blank" rel="noopener"\r
        >Learn X in Y minutes, where X=R</a\r
      >\r
    </li>\r
    <li>\r
      <a href="{{DOCS_BASE_URL}}languages/r" target="_blank" rel="noopener"\r
        >LiveCodes Documentations</a\r
      >\r
    </li>\r
    <li>\r
      <a href="?template=r" class="button" target="_parent" data-template="r"\r
        >Load starter template</a\r
      >\r
    </li>\r
  </ul>\r
</section>\r
<section data-lang="react-tsx">\r
  <h3 data-i18n="language-info:reactTsx.name">React Compiler (with TypeScript)</h3>\r
  <div data-i18n="language-info:reactTsx.desc">\r
    React Compiler is a build-time only tool that automatically optimizes React apps.\r
  </div>\r
  <ul data-i18n="language-info:reactTsx.link" data-i18n-prop="innerHTML">\r
    <li>\r
      <a href="https://react.dev/" target="_blank" rel="noopener">React official website</a>\r
    </li>\r
    <li>\r
      <a href="https://react.dev/learn/react-compiler" target="_blank" rel="noopener"\r
        >React Compiler</a\r
      >\r
    </li>\r
    <li>\r
      <a href="https://www.typescriptlang.org/" target="_blank" rel="noopener"\r
        >TypeScript website</a\r
      >\r
    </li>\r
    <li>\r
      <a href="https://www.typescriptlang.org/docs/" target="_blank" rel="noopener"\r
        >TypeScript documentation</a\r
      >\r
    </li>\r
    <li>\r
      <a href="{{DOCS_BASE_URL}}languages/react-tsx" target="_blank" rel="noopener"\r
        >LiveCodes Documentations</a\r
      >\r
    </li>\r
    <li>\r
      <a href="?template=react" class="button" target="_parent" data-template="react-tsx"\r
        >Load starter template (JSX)</a\r
      >\r
    </li>\r
  </ul>\r
</section>\r
<section data-lang="react">\r
  <h3 data-i18n="language-info:react.name">React Compiler</h3>\r
  <div data-i18n="language-info:react.desc">\r
    React Compiler is a build-time only tool that automatically optimizes React apps.\r
  </div>\r
  <ul data-i18n="language-info:react.link" data-i18n-prop="innerHTML">\r
    <li>\r
      <a href="https://react.dev/" target="_blank" rel="noopener">React official website</a>\r
    </li>\r
    <li>\r
      <a href="https://react.dev/learn/react-compiler" target="_blank" rel="noopener"\r
        >React Compiler</a\r
      >\r
    </li>\r
    <li>\r
      <a href="{{DOCS_BASE_URL}}languages/react" target="_blank" rel="noopener"\r
        >LiveCodes Documentations</a\r
      >\r
    </li>\r
    <li>\r
      <a href="?template=react" class="button" target="_parent" data-template="react"\r
        >Load starter template</a\r
      >\r
    </li>\r
  </ul>\r
</section>\r
<section data-lang="react-native-tsx">\r
  <h3 data-i18n="language-info:reactNativeTsx.name">React Native for Web (with TypeScript)</h3>\r
  <div data-i18n="language-info:reactNativeTsx.desc">\r
    React Native for Web is an accessible implementation of React Native's Components and APIs that\r
    is interoperable with React DOM.\r
  </div>\r
  <ul data-i18n="language-info:reactNativeTsx.link" data-i18n-prop="innerHTML">\r
    <li>\r
      <a href="https://react.dev/" target="_blank" rel="noopener">React official website</a>\r
    </li>\r
    <li>\r
      <a href="https://reactnative.dev/" target="_blank" rel="noopener">React Native website</a>\r
    </li>\r
    <li>\r
      <a href="https://necolas.github.io/react-native-web/" target="_blank" rel="noopener"\r
        >React Native for Web website</a\r
      >\r
    </li>\r
    <li>\r
      <a href="https://reactnative.dev/docs/getting-started" target="_blank" rel="noopener"\r
        >React Native documentation</a\r
      >\r
    </li>\r
    <li>\r
      <a href="https://www.typescriptlang.org/" target="_blank" rel="noopener"\r
        >TypeScript website</a\r
      >\r
    </li>\r
    <li>\r
      <a href="https://www.typescriptlang.org/docs/" target="_blank" rel="noopener"\r
        >TypeScript documentation</a\r
      >\r
    </li>\r
    <li>\r
      <a href="{{DOCS_BASE_URL}}languages/react-native-tsx" target="_blank" rel="noopener"\r
        >LiveCodes Documentations</a\r
      >\r
    </li>\r
    <li>\r
      <a href="?template=react-native" class="button" target="_parent" data-template="react-native"\r
        >Load starter template (JSX)</a\r
      >\r
    </li>\r
  </ul>\r
</section>\r
<section data-lang="react-native">\r
  <h3 data-i18n="language-info:reactNative.name">React Native for Web</h3>\r
  <div data-i18n="language-info:reactNative.desc">\r
    React Native for Web is an accessible implementation of React Native's Components and APIs that\r
    is interoperable with React DOM.\r
  </div>\r
  <ul data-i18n="language-info:reactNative.link" data-i18n-prop="innerHTML">\r
    <li>\r
      <a href="https://react.dev/" target="_blank" rel="noopener">React official website</a>\r
    </li>\r
    <li>\r
      <a href="https://reactnative.dev/" target="_blank" rel="noopener">React Native website</a>\r
    </li>\r
    <li>\r
      <a href="https://necolas.github.io/react-native-web/" target="_blank" rel="noopener"\r
        >React Native for Web website</a\r
      >\r
    </li>\r
    <li>\r
      <a href="https://reactnative.dev/docs/getting-started" target="_blank" rel="noopener"\r
        >React Native documentation</a\r
      >\r
    </li>\r
    <li>\r
      <a href="{{DOCS_BASE_URL}}languages/react-native" target="_blank" rel="noopener"\r
        >LiveCodes Documentations</a\r
      >\r
    </li>\r
    <li>\r
      <a href="?template=react-native" class="button" target="_parent" data-template="react-native"\r
        >Load starter template</a\r
      >\r
    </li>\r
  </ul>\r
</section>\r
<section data-lang="reason">\r
  <h3 data-i18n="language-info:reason.name">Reason</h3>\r
  <div data-i18n="language-info:reason.desc1">\r
    Reason lets you write simple, fast and quality type safe code while leveraging both the\r
    JavaScript & OCaml ecosystems.\r
  </div>\r
  <div data-i18n="language-info:reason.desc2">\r
    ReScript compiler is used here to compile Reason to JavaScript.\r
  </div>\r
  <ul data-i18n="language-info:reason.link" data-i18n-prop="innerHTML">\r
    <li><a href="https://reasonml.github.io/" target="_blank" rel="noopener">Reason website</a></li>\r
    <li>\r
      <a href="https://reasonml.github.io/docs/en/what-and-why" target="_blank" rel="noopener"\r
        >Reason documentation</a\r
      >\r
    </li>\r
    <li>\r
      <a href="https://reasonml.github.io/reason-react/en/" target="_blank" rel="noopener"\r
        >ReasonReact</a\r
      >\r
    </li>\r
    <li>\r
      <a href="https://rescript-lang.org/" target="_blank" rel="noopener">ReScript website</a>\r
    </li>\r
    <li>\r
      <a href="https://learnxinyminutes.com/docs/reason/" target="_blank" rel="noopener"\r
        >Learn X in Y minutes, where X=reason</a\r
      >\r
    </li>\r
    <li>\r
      <a href="?template=reason" class="button" target="_parent" data-template="reason"\r
        >Load starter template</a\r
      >\r
    </li>\r
  </ul>\r
</section>\r
<section data-lang="rescript">\r
  <h3 data-i18n="language-info:rescript.name">ReScript</h3>\r
  <div data-i18n="language-info:rescript.desc">\r
    ReScript is a robustly typed language that compiles to efficient and human-readable JavaScript.\r
  </div>\r
  <ul data-i18n="language-info:rescript.link" data-i18n-prop="innerHTML">\r
    <li>\r
      <a href="https://rescript-lang.org/" target="_blank" rel="noopener">ReScript website</a>\r
    </li>\r
    <li>\r
      <a\r
        href="https://rescript-lang.org/docs/react/latest/introduction"\r
        target="_blank"\r
        rel="noopener"\r
        >ReScript / React</a\r
      >\r
    </li>\r
    <li>\r
      <a href="?template=rescript" class="button" target="_parent" data-template="rescript"\r
        >Load starter template</a\r
      >\r
    </li>\r
  </ul>\r
</section>\r
<section data-lang="richtext">\r
  <h3 data-i18n="language-info:richtext.name">Rich Text Editor</h3>\r
  <div data-i18n="language-info:richtext.desc1">Using Quill:</div>\r
  <div data-i18n="language-info:richtext.desc2">Your powerful rich text editor.</div>\r
  <ul data-i18n="language-info:richtext.link" data-i18n-prop="innerHTML">\r
    <li>\r
      <a href="https://quilljs.com/" target="_blank" rel="noopener">Quill official website</a>\r
    </li>\r
  </ul>\r
</section>\r
<section data-lang="riot">\r
  <h3 data-i18n="language-info:riot.name">Riot.js</h3>\r
  <div data-i18n="language-info:riot.desc">Simple and elegant component-based UI library.</div>\r
  <ul data-i18n="language-info:riot.link" data-i18n-prop="innerHTML">\r
    <li>\r
      <a href="https://riot.js.org/" target="_blank" rel="noopener">Riot.js official website</a>\r
    </li>\r
    <li>\r
      <a href="https://riot.js.org/documentation/" target="_blank" rel="noopener"\r
        >Riot.js documentation</a\r
      >\r
    </li>\r
    <li>\r
      <a href="?template=riot" class="button" target="_parent" data-template="riot"\r
        >Load starter template</a\r
      >\r
    </li>\r
  </ul>\r
</section>\r
<section data-lang="ruby">\r
  <h3 data-i18n="language-info:ruby.name">Ruby</h3>\r
  <div data-i18n="language-info:ruby.desc">Ruby running in the browser using Opal.</div>\r
  <ul data-i18n="language-info:ruby.link" data-i18n-prop="innerHTML">\r
    <li>\r
      <a href="https://www.ruby-lang.org/en/" target="_blank" rel="noopener"\r
        >Ruby official website</a\r
      >\r
    </li>\r
    <li>\r
      <a href="https://www.ruby-lang.org/en/documentation/" target="_blank" rel="noopener"\r
        >Ruby documentation</a\r
      >\r
    </li>\r
    <li><a href="https://opalrb.com/" target="_blank" rel="noopener">Opal official website</a></li>\r
    <li>\r
      <a href="https://cdn.opalrb.com/opal/1.0.0/index.html" target="_blank" rel="noopener"\r
        >Opal standard library CDN</a\r
      >\r
    </li>\r
    <li>\r
      <a href="https://learnxinyminutes.com/docs/ruby/" target="_blank" rel="noopener"\r
        >Learn X in Y minutes, where X=ruby</a\r
      >\r
    </li>\r
    <li>\r
      <a href="{{DOCS_BASE_URL}}languages/ruby" target="_blank" rel="noopener"\r
        >LiveCodes Documentations</a\r
      >\r
    </li>\r
    <li>\r
      <a href="?template=ruby" class="button" target="_parent" data-template="ruby"\r
        >Load starter template</a\r
      >\r
    </li>\r
  </ul>\r
</section>\r
<section data-lang="ruby-wasm">\r
  <h3 data-i18n="language-info:rubyWasm.name">Ruby (WASM)</h3>\r
  <div data-i18n="language-info:rubyWasm.desc">\r
    Ruby running in the browser using ruby-wasm (a collection of WebAssembly ports of the CRuby).\r
  </div>\r
  <ul data-i18n="language-info:rubyWasm.link" data-i18n-prop="innerHTML">\r
    <li>\r
      <a href="https://www.ruby-lang.org/en/" target="_blank" rel="noopener"\r
        >Ruby official website</a\r
      >\r
    </li>\r
    <li>\r
      <a href="https://www.ruby-lang.org/en/documentation/" target="_blank" rel="noopener"\r
        >Ruby documentation</a\r
      >\r
    </li>\r
    <li>\r
      <a href="https://ruby.github.io/ruby.wasm/" target="_blank" rel="noopener"\r
        >ruby.wasm website</a\r
      >\r
    </li>\r
    <li><a href="https://github.com/ruby/ruby" target="_blank" rel="noopener">CRuby</a></li>\r
    <li>\r
      <a href="https://learnxinyminutes.com/docs/ruby/" target="_blank" rel="noopener"\r
        >Learn X in Y minutes, where X=ruby</a\r
      >\r
    </li>\r
    <li>\r
      <a href="{{DOCS_BASE_URL}}languages/ruby-wasm" target="_blank" rel="noopener"\r
        >LiveCodes Documentations</a\r
      >\r
    </li>\r
    <li>\r
      <a href="?template=ruby-wasm" class="button" target="_parent" data-template="ruby-wasm"\r
        >Load starter template</a\r
      >\r
    </li>\r
  </ul>\r
</section>\r
<section data-lang="sass">\r
  <h3 data-i18n="language-info:sass.name">Sass</h3>\r
  <div data-i18n="language-info:sass.desc">Syntactically Awesome Style Sheets.</div>\r
  <ul data-i18n="language-info:sass.link" data-i18n-prop="innerHTML">\r
    <li>\r
      <a href="https://sass-lang.com/" target="_blank" rel="noopener">Sass official website</a>\r
    </li>\r
    <li>\r
      <a href="https://sass-lang.com/documentation" target="_blank" rel="noopener"\r
        >Sass documentation</a\r
      >\r
    </li>\r
    <li>\r
      <a\r
        href="https://sass-lang.com/documentation/syntax#the-indented-syntax"\r
        target="_blank"\r
        rel="noopener"\r
        >Sass (the indented) syntax</a\r
      >\r
    </li>\r
    <li>\r
      <a href="https://learnxinyminutes.com/docs/sass/" target="_blank" rel="noopener"\r
        >Learn X in Y minutes, where X=sass</a\r
      >\r
    </li>\r
  </ul>\r
</section>\r
<section data-lang="scheme">\r
  <h3 data-i18n="language-info:scheme.name">Scheme</h3>\r
  <div data-i18n="language-info:scheme.desc">Scheme running in the browser using biwascheme.</div>\r
  <ul data-i18n="language-info:scheme.link" data-i18n-prop="innerHTML">\r
    <li>\r
      <a href="https://www.scheme.com/tspl4/" target="_blank" rel="noopener"\r
        >The Scheme Programming Language</a\r
      >\r
    </li>\r
    <li>\r
      <a href="https://www.biwascheme.org/" target="_blank" rel="noopener"\r
        >BiwaScheme official website</a\r
      >\r
    </li>\r
    <li>\r
      <a href="https://www.biwascheme.org/doc/reference.html" target="_blank" rel="noopener"\r
        >BiwaScheme reference</a\r
      >\r
    </li>\r
    <li>\r
      <a href="?template=scheme" class="button" target="_parent" data-template="scheme"\r
        >Load starter template</a\r
      >\r
    </li>\r
  </ul>\r
</section>\r
<section data-lang="scss">\r
  <h3 data-i18n="language-info:scss.name">SCSS</h3>\r
  <div data-i18n="language-info:scss.desc">Syntactically Awesome Style Sheets.</div>\r
  <ul data-i18n="language-info:scss.link" data-i18n-prop="innerHTML">\r
    <li>\r
      <a href="https://sass-lang.com/" target="_blank" rel="noopener">Sass official website</a>\r
    </li>\r
    <li>\r
      <a href="https://sass-lang.com/documentation" target="_blank" rel="noopener"\r
        >Sass documentation</a\r
      >\r
    </li>\r
    <li>\r
      <a href="https://sass-lang.com/documentation/syntax#scss" target="_blank" rel="noopener"\r
        >SCSS syntax</a\r
      >\r
    </li>\r
    <li>\r
      <a href="https://learnxinyminutes.com/docs/sass/" target="_blank" rel="noopener"\r
        >Learn X in Y minutes, where X=sass</a\r
      >\r
    </li>\r
  </ul>\r
</section>\r
<section data-lang="solid.tsx">\r
  <h3 data-i18n="language-info:solid.tsx.name">Solid (with TypeScript)</h3>\r
  <div data-i18n="language-info:solid.tsx.desc">\r
    A declarative, efficient and flexible JavaScript library for building user interfaces.\r
  </div>\r
  <ul data-i18n="language-info:solid.tsx.link" data-i18n-prop="innerHTML">\r
    <li><a href="https://www.solidjs.com/" target="_blank" rel="noopener">Official website</a></li>\r
    <li>\r
      <a href="https://www.solidjs.com/docs" target="_blank" rel="noopener">Solid documentation</a>\r
    </li>\r
    <li>\r
      <a href="https://www.typescriptlang.org/" target="_blank" rel="noopener"\r
        >TypeScript website</a\r
      >\r
    </li>\r
    <li>\r
      <a href="https://www.typescriptlang.org/docs/" target="_blank" rel="noopener"\r
        >TypeScript documentation</a\r
      >\r
    </li>\r
    <li>\r
      <a href="{{DOCS_BASE_URL}}languages/solid.tsx" target="_blank" rel="noopener"\r
        >LiveCodes Documentations</a\r
      >\r
    </li>\r
    <li>\r
      <a href="?template=solid" class="button" target="_parent" data-template="solid"\r
        >Load starter template</a\r
      >\r
    </li>\r
  </ul>\r
</section>\r
<section data-lang="solid">\r
  <h3 data-i18n="language-info:solid.name">Solid</h3>\r
  <div data-i18n="language-info:solid.desc">\r
    A declarative, efficient and flexible JavaScript library for building user interfaces.\r
  </div>\r
  <ul data-i18n="language-info:solid.link" data-i18n-prop="innerHTML">\r
    <li><a href="https://www.solidjs.com/" target="_blank" rel="noopener">Official website</a></li>\r
    <li><a href="https://www.solidjs.com/docs" target="_blank" rel="noopener">Documentation</a></li>\r
    <li>\r
      <a href="{{DOCS_BASE_URL}}languages/solid" target="_blank" rel="noopener"\r
        >LiveCodes Documentations</a\r
      >\r
    </li>\r
    <li>\r
      <a href="?template=solid" class="button" target="_parent" data-template="solid"\r
        >Load starter template (TSX)</a\r
      >\r
    </li>\r
  </ul>\r
</section>\r
<section data-lang="sql">\r
  <h3 data-i18n="language-info:sql.name">SQLite</h3>\r
  <div data-i18n="language-info:sql.desc">SQLite compiled to JavaScript using SQL.js</div>\r
  <ul data-i18n="language-info:sql.link" data-i18n-prop="innerHTML">\r
    <li>\r
      <a href="https://www.sqlite.org/" target="_blank" rel="noopener">SQLite official website</a>\r
    </li>\r
    <li>\r
      <a href="https://www.sqlite.org/lang.html" target="_blank" rel="noopener"\r
        >SQLite syntax documentation</a\r
      >\r
    </li>\r
    <li>\r
      <a href="https://sql.js.org/" target="_blank" rel="noopener">SQL.js official website</a>\r
    </li>\r
    <li>\r
      <a href="https://learnxinyminutes.com/docs/sql/" target="_blank" rel="noopener"\r
        >Learn X in Y minutes, where X=SQL</a\r
      >\r
    </li>\r
    <li>\r
      <a href="?template=sql" class="button" target="_parent" data-template="sql"\r
        >Load starter template</a\r
      >\r
    </li>\r
  </ul>\r
</section>\r
<section data-lang="stencil">\r
  <h3 data-i18n="language-info:stencil.name">Stencil</h3>\r
  <div data-i18n="language-info:stencil.desc">\r
    A Compiler for Web Components and High Performance Web Apps.\r
  </div>\r
  <ul data-i18n="language-info:stencil.link" data-i18n-prop="innerHTML">\r
    <li>\r
      <a href="https://stenciljs.com/" target="_blank" rel="noopener">Stencil official website</a>\r
    </li>\r
    <li>\r
      <a href="https://stenciljs.com/docs/introduction" target="_blank" rel="noopener"\r
        >Stencil documentation</a\r
      >\r
    </li>\r
    <li>\r
      <a href="?template=stencil" class="button" target="_parent" data-template="stencil"\r
        >Load starter template</a\r
      >\r
    </li>\r
  </ul>\r
</section>\r
<section data-lang="stylis">\r
  <h3 data-i18n="language-info:stylis.name">Stylis</h3>\r
  <div data-i18n="language-info:stylis.desc">Light-weight css preprocessor.</div>\r
  <ul data-i18n="language-info:stylis.link" data-i18n-prop="innerHTML">\r
    <li>\r
      <a href="https://stylis.js.org/" target="_blank" rel="noopener">Stylis official website</a>\r
    </li>\r
  </ul>\r
  <ul>\r
    <li>\r
      <a href="https://github.com/thysultan/stylis" target="_blank" rel="noopener"\r
        >Stylis GitHub repo</a\r
      >\r
    </li>\r
  </ul>\r
</section>\r
<section data-lang="stylus">\r
  <h3 data-i18n="language-info:stylus.name">Stylus</h3>\r
  <div data-i18n="language-info:stylus.desc">Expressive, Dynamic, Robust CSS.</div>\r
  <ul data-i18n="language-info:stylus.link" data-i18n-prop="innerHTML">\r
    <li>\r
      <a href="https://stylus-lang.com/" target="_blank" rel="noopener">Stylus official website</a>\r
    </li>\r
    <li>\r
      <a href="https://learnxinyminutes.com/docs/stylus/" target="_blank" rel="noopener"\r
        >Learn X in Y minutes, where X=stylus</a\r
      >\r
    </li>\r
  </ul>\r
</section>\r
<section data-lang="sucrase">\r
  <h3 data-i18n="language-info:sucrase.name">Sucrase</h3>\r
  <div data-i18n="language-info:sucrase.desc">\r
    Super-fast alternative to Babel for when you can target modern JS runtimes.\r
  </div>\r
  <ul data-i18n="language-info:sucrase.link" data-i18n-prop="innerHTML">\r
    <li>\r
      <a href="https://sucrase.io/" target="_blank" rel="noopener">Sucrase official website</a>\r
    </li>\r
    <li>\r
      <a href="https://github.com/alangpierce/sucrase" target="_blank" rel="noopener"\r
        >Sucrase GitHub Repo</a\r
      >\r
    </li>\r
    <li>\r
      <a href="{{DOCS_BASE_URL}}languages/sucrase" target="_blank" rel="noopener"\r
        >LiveCodes Documentations</a\r
      >\r
    </li>\r
  </ul>\r
</section>\r
<section data-lang="svelte">\r
  <h3 data-i18n="language-info:svelte.name">Svelte</h3>\r
  <div data-i18n="language-info:svelte.desc">Cybernetically enhanced web apps.</div>\r
  <ul data-i18n="language-info:svelte.link" data-i18n-prop="innerHTML">\r
    <li>\r
      <a href="https://svelte.dev/" target="_blank" rel="noopener">Svelte official website</a>\r
    </li>\r
    <li>\r
      <a href="https://svelte.dev/docs" target="_blank" rel="noopener">Svelte documentation</a>\r
    </li>\r
    <li>\r
      <a href="?template=svelte" class="button" target="_parent" data-template="svelte"\r
        >Load starter template</a\r
      >\r
    </li>\r
  </ul>\r
</section>\r
<section data-lang="tcl">\r
  <h3 data-i18n="language-info:tcl.name">Tcl (Tool Command Language)</h3>\r
  <div data-i18n="language-info:tcl.desc" data-i18n-prop="innerHTML">\r
    Tcl running in the browser, using\r
    <a href="https://github.com/ecky-l/wacl/" target="_blank" rel="noopener">wacl</a>.\r
  </div>\r
  <ul data-i18n="language-info:tcl.link" data-i18n-prop="innerHTML">\r
    <li>\r
      <a href="https://www.tcl.tk/" target="_blank" rel="noopener">Tcl official website</a>\r
    </li>\r
    <li>\r
      <a href="https://github.com/ecky-l/wacl/" target="_blank" rel="noopener">wacl repo</a>\r
    </li>\r
    <li>\r
      <a href="https://learnxinyminutes.com/docs/tcl/" target="_blank" rel="noopener"\r
        >Learn X in Y minutes, where X=Tcl</a\r
      >\r
    </li>\r
    <li>\r
      <a href="?template=tcl" class="button" target="_parent" data-template="tcl"\r
        >Load starter template</a\r
      >\r
    </li>\r
  </ul>\r
</section>\r
<section data-lang="teal">\r
  <h3 data-i18n="language-info:teal.name">Teal</h3>\r
  <div data-i18n="language-info:teal.desc">A typed dialect of Lua.</div>\r
  <ul data-i18n="language-info:teal.link" data-i18n-prop="innerHTML">\r
    <li>\r
      <a href="https://github.com/teal-language/tl" target="_blank" rel="noopener"\r
        >Teal GitHub repo</a\r
      >\r
    </li>\r
    <li>\r
      <a href="https://github.com/teal-language/tl/tree/master/docs" target="_blank" rel="noopener"\r
        >Teal docs</a\r
      >\r
    </li>\r
    <li>\r
      <a\r
        href="https://github.com/teal-language/tl/blob/master/docs/tutorial.md"\r
        target="_blank"\r
        rel="noopener"\r
        >Teal tutorial</a\r
      >\r
    </li>\r
    <li>\r
      <a href="{{DOCS_BASE_URL}}languages/teal" target="_blank" rel="noopener"\r
        >LiveCodes Documentations</a\r
      >\r
    </li>\r
    <li>\r
      <a href="?template=teal" class="button" target="_parent" data-template="teal"\r
        >Load starter template</a\r
      >\r
    </li>\r
  </ul>\r
</section>\r
<section data-lang="tsx">\r
  <h3 data-i18n="language-info:tsx.name">TSX</h3>\r
  <div data-i18n="language-info:tsx.desc">\r
    TypeScript in JSX. TSX is compiled to JavaScript in LiveCodes using the TypeScript Compiler.<br />\r
    By default it uses React as the JSX runtime.\r
  </div>\r
  <ul data-i18n="language-info:tsx.link" data-i18n-prop="innerHTML">\r
    <li>\r
      <a href="https://react.dev/" target="_blank" rel="noopener">React official website</a>\r
    </li>\r
    <li>\r
      <a href="https://react.dev/learn/writing-markup-with-jsx" target="_blank" rel="noopener"\r
        >JSX in React documentation</a\r
      >\r
    </li>\r
    <li>\r
      <a href="https://www.typescriptlang.org/docs/" target="_blank" rel="noopener"\r
        >Typescript documentation</a\r
      >\r
    </li>\r
    <li>\r
      <a href="{{DOCS_BASE_URL}}languages/tsx" target="_blank" rel="noopener"\r
        >LiveCodes Documentations</a\r
      >\r
    </li>\r
  </ul>\r
</section>\r
<section data-lang="typescript">\r
  <h3 data-i18n="language-info:typescript.name">TypeScript</h3>\r
  <div data-i18n="language-info:typescript.desc">A Typed Superset of JavaScript.</div>\r
  <ul data-i18n="language-info:typescript.link" data-i18n-prop="innerHTML">\r
    <li>\r
      <a href="https://www.typescriptlang.org/" target="_blank" rel="noopener">Official website</a>\r
    </li>\r
    <li>\r
      <a href="https://www.typescriptlang.org/docs/" target="_blank" rel="noopener"\r
        >TypeScript documentation</a\r
      >\r
    </li>\r
    <li>\r
      <a href="https://learnxinyminutes.com/docs/typescript/" target="_blank" rel="noopener"\r
        >Learn X in Y minutes, where X=TypeScript</a\r
      >\r
    </li>\r
    <li>\r
      <a href="?template=typescript" class="button" target="_parent" data-template="typescript"\r
        >Load starter template</a\r
      >\r
    </li>\r
  </ul>\r
</section>\r
<section data-lang="vento">\r
  <h3>Vento</h3>\r
  <div>\r
    Vento is a template engine for Deno. It's inspired by other engines, such as Nunjucks, Liquid,\r
    Eta, and Mustache.\r
  </div>\r
  <ul>\r
    <li>\r
      <a href="https://vento.js.org/" target="_blank" rel="noopener">Vento official website</a>\r
    </li>\r
    <li>\r
      <a href="{{DOCS_BASE_URL}}languages/vento" target="_blank" rel="noopener"\r
        >LiveCodes Documentations</a\r
      >\r
    </li>\r
  </ul>\r
</section>\r
<section data-lang="vue">\r
  <h3 data-i18n="language-info:vue.name">Vue3 Single File Components</h3>\r
  <ul data-i18n="language-info:vue.link" data-i18n-prop="innerHTML">\r
    <li>\r
      <a href="https://vuejs.org/" target="_blank" rel="noopener">Vue.js v3 official website</a>\r
    </li>\r
    <li>\r
      <a href="https://vuejs.org/guide/introduction.html" target="_blank" rel="noopener"\r
        >Vue3 documentation</a\r
      >\r
    </li>\r
    <li>\r
      <a href="https://vuejs.org/api/sfc-spec.html" target="_blank" rel="noopener"\r
        >Vue3 single file components</a\r
      >\r
    </li>\r
    <li>\r
      <a href="{{DOCS_BASE_URL}}languages/vue" target="_blank" rel="noopener"\r
        >LiveCodes Documentations</a\r
      >\r
    </li>\r
    <li>\r
      <a href="?template=vue" class="button" target="_parent" data-template="vue"\r
        >Load starter template</a\r
      >\r
    </li>\r
  </ul>\r
</section>\r
<section data-lang="vue2">\r
  <h3 data-i18n="language-info:vue2.name">Vue2 Single File Components</h3>\r
  <div data-i18n="language-info:vue2.desc">Loaded using vue3-sfc-loader.</div>\r
  <ul data-i18n="language-info:vue2.link" data-i18n-prop="innerHTML">\r
    <li><a href="https://vuejs.org/" target="_blank" rel="noopener">Vue.js official website</a></li>\r
    <li>\r
      <a href="https://v2.vuejs.org/v2/guide/" target="_blank" rel="noopener">Vue2 documentation</a>\r
    </li>\r
    <li>\r
      <a\r
        href="https://v2.vuejs.org/v2/guide/single-file-components.html"\r
        target="_blank"\r
        rel="noopener"\r
        >Vue2 single file components</a\r
      >\r
    </li>\r
    <li>\r
      <a href="https://github.com/FranckFreiburger/vue3-sfc-loader" target="_blank" rel="noopener"\r
        >vue3-sfc-loader GitHub repo</a\r
      >\r
    </li>\r
    <li>\r
      <a href="{{DOCS_BASE_URL}}languages/vue2" target="_blank" rel="noopener"\r
        >LiveCodes Documentations</a\r
      >\r
    </li>\r
  </ul>\r
</section>\r
<section data-lang="wat">\r
  <h3 data-i18n="language-info:wat.name">WebAssembly Text Format</h3>\r
  <div data-i18n="language-info:wat.desc1">\r
    Low-level textual representation of the WebAssembly (wasm) binary format.\r
  </div>\r
  <div data-i18n="language-info:wat.desc2">It is converted to wasm using wabt.js.</div>\r
  <ul data-i18n="language-info:wat.link" data-i18n-prop="innerHTML">\r
    <li><a href="https://webassembly.org/" target="_blank" rel="noopener">WebAssembly.org</a></li>\r
    <li>\r
      <a\r
        href="https://webassembly.github.io/spec/core/text/index.html"\r
        target="_blank"\r
        rel="noopener"\r
        >WebAssembly Text Specs</a\r
      >\r
    </li>\r
    <li>\r
      <a href="https://developer.mozilla.org/en-US/docs/WebAssembly" target="_blank" rel="noopener"\r
        >WebAssembly on MDN</a\r
      >\r
    </li>\r
    <li>\r
      <a\r
        href="https://developer.mozilla.org/en-US/docs/WebAssembly/Understanding_the_text_format"\r
        target="_blank"\r
        rel="noopener"\r
        >Understanding WebAssembly text format</a\r
      >\r
    </li>\r
    <li>\r
      <a href="https://github.com/AssemblyScript/wabt.js" target="_blank" rel="noopener"\r
        >wabt.js documentation</a\r
      >\r
    </li>\r
    <li>\r
      <a href="https://learnxinyminutes.com/docs/wasm/" target="_blank" rel="noopener"\r
        >Learn X in Y minutes, where X=WebAssembly</a\r
      >\r
    </li>\r
    <li>\r
      <a href="?template=wat" class="button" target="_parent" data-template="wat"\r
        >Load starter template</a\r
      >\r
    </li>\r
  </ul>\r
</section>\r
<section data-lang="blockly">\r
  <h3 data-i18n="language-info:blockly.name">Blockly</h3>\r
  <div data-i18n="language-info:blockly.desc">\r
    A JavaScript library for building visual programming editors.\r
  </div>\r
  <ul data-i18n="language-info:blockly.link" data-i18n-prop="innerHTML">\r
    <li>\r
      <a href="https://developers.google.com/blockly" target="_blank" rel="noopener"\r
        >Official website</a\r
      >\r
    </li>\r
    <li>\r
      <a href="https://developers.google.com/blockly/guides/overview" target="_blank" rel="noopener"\r
        >Guides</a\r
      >\r
    </li>\r
    <li>\r
      <a\r
        href="https://developers.google.com/blockly/reference/overview"\r
        target="_blank"\r
        rel="noopener"\r
        >Reference</a\r
      >\r
    </li>\r
    <li>\r
      <a href="https://google.github.io/blockly-samples/" target="_blank" rel="noopener">Samples</a>\r
    </li>\r
    <li>\r
      <a href="?template=blockly" class="button" target="_parent" data-template="blockly"\r
        >Load starter template</a\r
      >\r
    </li>\r
  </ul>\r
</section>\r
<section data-lang="style-processors">\r
  <h3 data-i18n="language-info:styleProcessors.name">CSS Frameworks and Processors</h3>\r
  <ul data-i18n="language-info:styleProcessors.link" data-i18n-prop="innerHTML">\r
    <li>\r
      <a href="https://tailwindcss.com/" target="_blank" rel="noopener">Tailwind CSS</a>\r
    </li>\r
    <li>\r
      <a href="https://windicss.org/" target="_blank" rel="noopener">Windi CSS</a>\r
    </li>\r
    <li>\r
      <a href="https://uno.antfu.me/" target="_blank" rel="noopener">UnoCSS</a>\r
    </li>\r
    <li>\r
      <a href="https://lightningcss.dev/" target="_blank" rel="noopener">Lightning CSS</a>\r
    </li>\r
    <li>\r
      <a href="https://postcss.org/" target="_blank" rel="noopener">PostCSS</a>\r
      Plugins:\r
      <ul>\r
        <li>\r
          <a href="https://github.com/postcss/autoprefixer" target="_blank" rel="noopener"\r
            >Autoprefixer</a\r
          >\r
        </li>\r
        <li>\r
          <a href="https://preset-env.cssdb.org/" target="_blank" rel="noopener"\r
            >postcss-preset-env</a\r
          >\r
        </li>\r
        <li>\r
          <a href="https://github.com/unlight/postcss-import-url" target="_blank" rel="noopener"\r
            >postcss-import-url</a\r
          >\r
        </li>\r
        <li>\r
          <a href="https://github.com/madyankin/postcss-modules" target="_blank" rel="noopener"\r
            >postcss-modules</a\r
          >\r
        </li>\r
      </ul>\r
    </li>\r
  </ul>\r
</section>\r
`;

// src/livecodes/html/index.ts
var replaceValues = (str) => Object.entries(predefinedValues).reduce(
  (str2, [key, value]) => str2.replace(new RegExp(`{{${key}}}`, "g"), value),
  str
);
var languageInfo = /* @__PURE__ */ replaceValues(language_info_default);
export {
  languageInfo
};
