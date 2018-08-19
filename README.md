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

#### Documentation

It’s part of the RailsGirls Summer of Code to
[extend this Readme file](https://github.com/hagenburger/pimd/issues/12). This
will be done when PIMD officially gets released. For now: **All functionality is
documented in the tests** which you can find in the `tests` folder and `test.js`
of each plugin found in `plugins/*`.

---

## Setup

```bash
npm install --save pimd
```

## Usage

### Render inline

```javascript
const { Document } = require("pimd")
const markdown = "# Headline"
const doc = new Document(markdown)
console.log(doc.render())
```

Result:

```html
<h1>Headline</h1>
```

### Render document

```javascript
const { Document } = require("pimd")
const markdown = "# Headline"
const doc = new Document(markdown)
doc.renderDocument().then(html => {
  console.log(html)
})
```

Result:

```html
<html>
  <head>
    <title>Headline</title>
  </head>
  <body>
    <h1>Headline</h1>
  </body>
</html>
```

## Plugins

- [Add classes to code blocks or other elements](https://github.com/hagenburger/pimd/tree/master/plugins/classes#readme)
- [Add an ID to code blocks or other elements](https://github.com/hagenburger/pimd/tree/master/plugins/ids#readme)
- [Add an HTML preview to code blocks](https://github.com/hagenburger/pimd/tree/master/plugins/preview#readme)

## Extending

### Output generated data with JavaScript

PIMD extends Markdown with Processing Instructions known from XML. This is
complient with the [CommonMark specs].

```javascript
const { Document } = require("pimd")
const Config = require("pimd/lib/config")
const markdown = "# Year <?year?>"

const config = new Config()
config.commands["year"] = () => new Date().getFullYear()

const doc = new Document(markdown, config)
console.log(doc.render())
```

Result:

```html
<h1>Year 2018</h1>
```

### Accessing the DOM

PIMD uses the [DOM] internally to provide a well-known API to its users.

```javascript
const { Document } = require("pimd")
const Config = require("pimd/lib/config")
const markdown = "# Headline <?important?>"

const config = new Config()
config.commands["date"] = context => {
  context.element.style.background = "yellow"
}

const doc = new Document(markdown, config)
console.log(doc.render())
```

Result:

```html
<h1 style="background: yellow">Headline</h1>
```

[dom]: https://developer.mozilla.org/en-US/docs/Glossary/DOM

### Writing plugins

```javascript
const { Document } = require("pimd")
const Config = require("pimd/lib/config")

const markdown = `
~~~ html info="Hello world!"
<p>Test</p>
~~~
`

const myPlugin = function(config) {
  config.addInfoStringParser(/info="(.+?)"/, function(match, string) {
    const element = this.renderer.dom.window.document.createElement("div")
    element.textContent = string
    this.element.appendChild(element)
  })
}

const config = new Config()
config.use(myPlugin)

const doc = new Document(markdown, config)
console.log(doc.render())
```

Result:

```html
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
