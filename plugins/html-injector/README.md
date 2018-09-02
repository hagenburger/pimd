# PIMD HTML injector plugin

A base for other plugins to insert functionality into code examples.

## Basic idea

It is easy to find out in a source code where to insert HTML – for example
highlight a word, add a tooltip, etc. After the source code got HTML-escaped and
syntax highlighted, it is hard to find the right offsets.

This plugin translates offsets from before to after syntax highlighting.

## Example

Imagine you want to format the `x` in the following example in italics:

```html
<p>Example</p>
```

First the code gets HTML escaped:

```html
&lt;p&gt;Example&lt;/p&gt;
```

Then you can insert the `<i>` and `</i>`:

```html
&lt;p&gt;E<i>x</i>ample&lt;/p&gt;
```

With syntax highlighting enabled, this simple example already gets quite
complex:

```html
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>p</span><span class="token punctuation">&gt;</span></span>E<i>x</i>ample<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>p</span><span class="token punctuation">&gt;</span></span>
```

## Usage

With this plugin enabled, you only need to know the offset and what to insert:

```javascript
// Offsets before highlighting:
// <p>Example</p>
// 01234567890123
example.insertAt(4, "<i>") // Before the `x`
example.insertAt(5, "</i>") // After the `x`
```

This is best put into a `example:beforeRender` hook:

```javascript
const myPlugin = function(config) {
  config.hooks.add("example:beforeRender", "my-plugin", function(example) {
    example.insertAt(4, "<i>") // Before the `x`
    example.insertAt(5, "</i>") // After the `x`
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

---

## Copyright

Copyright 2018++ [Nico Hagenburger](https://www.hagenburger.net). See
[MIT-LICENSE](MIT-LICENSE) for details. Get in touch with
[@hagenburger](https://twitter.com/hagenburger) on Twitter or
[open an issue](https://github.com/hagenburger/pimd/issues/new).
