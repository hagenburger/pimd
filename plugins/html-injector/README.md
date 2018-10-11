# PIMD HTML injector plugin

A base for other plugins to insert functionality into code examples.

## Basic idea

It is easy to find out in a source code where to insert HTML – for example
highlight a word, add a tooltip, etc. After the source code got HTML-escaped and
syntax highlighted, it is hard to find the right offsets.

This plugin translates offsets from before to after syntax highlighting.

## Manual example without this plugin

Imagine you want to format the `x` in the following example in italics:

```html +highlight=/x/g
<p>Example</p>
```

When you want to display HTML in HTML, `<` and `>` need to be escaped with
`&lt;` and `&gt;` first and put into a `<pre>` and `<code>` block:

```html +highlight=/x/g
<pre>
  <code>
    &lt;p&gt;Example&lt;/p&gt;
  </code>
</pre>
```

Afterwards you can insert the `<i>` and `</i>`:

```html +highlight=/x/g
<pre>
  <code>
    &lt;p&gt;E<i>x</i>ample&lt;/p&gt;
  </code>
</pre>
```

With syntax highlighting (for example with PrismJS) enabled, this simple right
aboce example already gets quite complex:

```html +highlight=/x/g
<pre>
  <code class="language-html">
    <span class="token tag">
      <span class="token tag">
        <span class="token punctuation">&lt;</span>
        p</span>
      <span class="token punctuation">&gt;</span>
    </span>
    E<i>x</i>ample
    <span class="token tag">
      <span class="token tag">
        <span class="token punctuation">&lt;/</span>
        p
      </span>
      <span class="token punctuation">&gt;</span>
    </span>
  </code>
</pre>
```

For readability issues, all examples above got formatted and indented. In real
life, this would be one line without whitespace.

## Usage

With this plugin enabled, you only need to know the offset and what to insert:

```javascript +highlight=/(?<!e)x/g,/4/g
// Offsets before highlighting:
// <p>Example</p>
// 01234567890123
example.insertAt(4, "<i>") // Before the `x`
example.insertAt(4 + 1, "</i>") // After the `x`
```

This is best put into a `example:beforeRender` hook:

```javascript +highlight="example:beforeRender"
const myPlugin = function(config) {
  config.hooks.add("example:beforeRender", "my-plugin", function(example) {
    example.insertAt(4, "<i>") // Before the `x`
    example.insertAt(4 + 1, "</i>") // After the `x`
  })
}
```

This of course would format every 4th character of every code example in italic.
A real live example would make use of more dynamic code:

```javascript
const myPlugin = function(config) {
  config.hooks.add("example:beforeRender", "my-plugin", function(example) {
    const offset = example.content.indexOf("x")
    example.insertAt(offset, "<i>") // Before the `x`
    example.insertAt(offset + 1, "</i>") // After the `x`
  })
}
```

To add this to specific examples only, use a _InfoStringParser:_

```javascript
const myPlugin = function(config) {
  config.addInfoStringParser(/italicx/, function(match, rules) {
    this.hooks.add("example:beforeRender", "my-plugin", function(example) {
      const offset = example.content.indexOf("x")
      example.insertAt(offset, "<i>") // Before the `x`
      example.insertAt(offset + 1, "</i>") // After the `x`
    })
  })
}
```

Back to Markdown, the plugin can be used as simple as:

````markdown
```html italicx
<p>Example</p>
```
````

## Setup

To render the Markdown example right above, install this plugin:

```sh
npm i @pimd/html-injector-plugin
```

This requires the _HTML injector_ plugin to be loaded first:

```javascript +highlight=/htmlInjectorPlugin/g,"require(\"@pimd/htmlInjector-plugin\")",/(?<!\/)config/g +showmore=1..2,10..12
const { Document } = require("pimd")
const Config = require("pimd/lib/config")
const htmlInjectorPlugin = require("@pimd/html-injector-plugin")

const config = new Config()
config.use(htmlInjectorPlugin)
config.use(myPlugin) // `myPlugin` as defined further up this page

const markdown = `
\`\`\`html italicx
<p>Example</p>
\`\`\`
`
const doc = new Document(markdown, config)
const html = doc.render()
console.log(html)
```

---

## Copyright

Copyright 2018++ [Nico Hagenburger](https://www.hagenburger.net). See
[MIT-LICENSE](MIT-LICENSE) for details. Get in touch with
[@hagenburger](https://twitter.com/hagenburger) on Twitter or
[open an issue](https://github.com/hagenburger/pimd/issues/new).
