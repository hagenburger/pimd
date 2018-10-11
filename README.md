# PIMD

![Build status (Travis CI)](https://travis-ci.org/hagenburger/pimd.svg?branch=master)
![Dependency status (Greenkeeper)](https://badges.greenkeeper.io/hagenburger/pimd.svg)
[![JavaScript Style Guide](https://img.shields.io/badge/code_style-prettier-brightgreen.svg)](https://prettier.io)

**P**rocessing **I**nstructions for **M**ark**D**own.

PIMD will be the base for the JavaScript version of [LivingStyleGuide] – an API
to extend Markdown by DOM manipulations as known from the browsers.

#### Main targets

- Easy to use in JavaScript projects – in build tools and within the browser
- Focus on extendibility: The [DOM] tree known from the browser will be the main
  API
- Compliance with the [CommonMark specs] – Markdown files will render perfectly
  on GitHub; all additional commands will be CommanMark compliant and won’t
  leave ugly artifacts when used in `README.md` files on GitHub

[livingstyleguide]: https://github.com/livingstyleguide/livingstyleguide
[dom]: https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model
[commonmark specs]: https://commonmark.org

#### RailsGirls Summer of Code

This project is as part of [LivingStyleGuide] chosen for the [RailsGirls Summer
of Code 2018]: Our team is @artnerdnet and @dianavile

[railsgirls summer of code 2018]: https://railsgirlssummerofcode.org

---

## Setup

```sh
npm install --save pimd
```

## Usage

### Render inline

```javascript +highlight=/#/,/Headline/
const { Document } = require("pimd")
const markdown = `
# Headline
`
const doc = new Document(markdown)
console.log(doc.render())
```

Result:

```html +highlight=/<\/?h1>/g,/Headline/
<h1>
  Headline
</h1>
```

### Render document

```javascript +highlight=/#/,/Headline/
const { Document } = require("pimd")
const markdown = `
# Headline
`
const doc = new Document(markdown)
doc.renderDocument().then(html => {
  console.log(html)
})
```

Result:

```html +highlight=/<\/?h1>/g,/Headline/
<html>
  <head>
    <title>Headline</title>
  </head>
  <body>
    <h1>
      Headline
    </h1>
  </body>
</html>
```

## Plugins

Plugins unleash the full power of PIMD. The official plugins offer functionality
to create living style guides and to improve code documentation in general.

- [Classes](https://github.com/hagenburger/pimd/tree/master/plugins/classes#readme):
  Add classes to code blocks or other elements for easy additional styling
- [ID](https://github.com/hagenburger/pimd/tree/master/plugins/id#readme): Add
  an ID to code blocks or other elements for easily accessing elements in the
  HTML preview via JavaScript to bring code examples to live
- [Preview](https://github.com/hagenburger/pimd/tree/master/plugins/preview#readme):
  Add an HTML preview to code blocks for pattern libraries/living style guides
- [Highlight](https://github.com/hagenburger/pimd/tree/master/plugins/highlight#readme):
  Visually highlight important parts of code blocks in different background
  colors
- [Showmore](https://github.com/hagenburger/pimd/tree/master/plugins/showmore#readme):
  Hide less important parts of code blocks
- [Prism](https://github.com/hagenburger/pimd/tree/master/plugins/prism#readme):
  Syntax highlighting with PrismJS
- [HTML injector](https://github.com/hagenburger/pimd/tree/master/plugins/html-injector#readme):
  a plugin to create new plugins that manipulate the code blocks (already used
  by Highlight and Showmore)

## Extending

### Output generated data with JavaScript

PIMD extends Markdown with Processing Instructions known from XML. This is
compliant with the [CommonMark specs].

```javascript +highlight=/year/g,/new Date\(\).getFullYear\(\)/
const { Document } = require("pimd")
const Config = require("pimd/lib/config")

const config = new Config()
config.commands["year"] = () => new Date().getFullYear()

const markdown = `
# Year <?year?>
`
const doc = new Document(markdown, config)
console.log(doc.render())
```

Result:

```html +highlight="_",/2018/
<h1>Year 2018</h1>
```

### Accessing the DOM

PIMD uses the [DOM] internally to provide a well-known API to its users.

```javascript +highlight=/important/g,/background = "yellow"/,/style/,/element/g
const { Document } = require("pimd")
const Config = require("pimd/lib/config")

const config = new Config()
config.commands["important"] = context => {
  context.element.style.background = "yellow"
}

const markdown = `
# Headline <?important?>
`
const doc = new Document(markdown, config)
console.log(doc.render())
```

Result:

```html +highlight="_",/background: yellow/,/style/,/<h1|<\/h1>|>/g
<h1 style="background: yellow">Headline</h1>
```

[dom]: https://developer.mozilla.org/en-US/docs/Glossary/DOM

### Writing plugins

```javascript +highlight=/info/g,/"Hello world!"|(?<!\.)text/g,/div/g,/element/g
const { Document } = require("pimd")
const Config = require("pimd/lib/config")

const myPlugin = function(config) {
  config.addInfoStringCommand("info", { types: ["string"] }, function(text) {
    const div = this.renderer.dom.window.document.createElement("div")
    div.textContent = text
    this.element.appendChild(div)
  })
}

const config = new Config()
config.use(myPlugin)

const markdown = `
~~~html +info="Hello world!"
<p>Test</p>
~~~
`
const doc = new Document(markdown, config)
console.log(doc.render())
```

Result:

```html +highlight="_",/Hello world!/g,/<div>.+?<\/div>/g,/<div class="pimd-example">|^<\/div>/g
<div class="pimd-example">
  <div class="pimd-code">
    <pre>
      <code class="lang-html">
        &lt;p&gt;Test&lt;/p&gt;
      </code>
    </pre>
  </div>
  <div>Hello world!</div>
</div>
```

Tip: Check out the source code of [PIMD’s official plugins](#plugins) for
further inspiration.

---

## Coding style

PIMD uses the [Prettier] style for all supported documents. To save the
environment, semicolons are not required.

---

## Copyright

Copyright 2018++ [Nico Hagenburger](https://www.hagenburger.net). See
[MIT-LICENSE](MIT-LICENSE) for details. Get in touch with
[@hagenburger](https://twitter.com/hagenburger) on Twitter or
[open an issue](https://github.com/hagenburger/pimd/issues/new).

[prettier]: https://prettier.io
