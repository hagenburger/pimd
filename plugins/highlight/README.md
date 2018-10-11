# PIMD Highlight plugin

Highlights important parts of a code example.

## Example usage

````markdown +highlight="important-class",/\+highlight.+/
```html +highlight="important-class"
<div class="important-class other-class">
  Lorem ipsum.
</div>
```
````

Result:

![preview](https://user-images.githubusercontent.com/103399/44298223-763e4800-a2df-11e8-83af-32fc8637a760.png)

## Setup

```
npm i @pimd/html-injector-plugin @pimd/highlight-plugin
```

This requires the _HTML injector_ plugin to be loaded first:

```javascript
// ...
const htmlInjectorPlugin = require("@pimd/html-injector-plugin")
const highlightPlugin = require("@pimd/highlight-plugin")

config.use(htmlInjectorPlugin)
config.use(highlightPlugin)
```

---

## Using Regular Expressions

Instead of strings, Regular Expressions can be used:

````markdown +highlight=/important-class/,/\+highlight.+/
```html +highlight=/important-class/
<div class="important-class other-class">
  Lorem ipsum.
</div>
```
````

All Regular Expressions supported by JavaScript can be used in PIMD. The example
above could also highlight all classes ending with `-class`:

````markdown +highlight=/(\w+|\w+)-class/,/\+highlight.+/
```html +highlight=/\w+-class/
<div class="important-class other-class">
  Lorem ipsum.
</div>
```
````

## Highlight all occourances

To highlight all occourances, Regular Expressions must be used with the `g`
modifier. Strings in quotation marks will always highlight the first occourance
only.

````markdown +highlight=/my-list-item/g,/\+highlight.+/
```html +highlight=/my-list-item/g
<ul>
  <li class="my-list-item">
    Item 1
  </li>
  <li class="my-list-item">
    Item 2
  </li>
  <li class="my-list-item">
    Item 3
  </li>
</ul>
```
````

## Highlight in different colors

For some examples it is useful to use different colors to help the reader
understanding the code. Multiple highlights can be added comma-separated. Each
highlight will be highlighted in a differen color (depending on the theme).

A JavaScript example with a use case for multiple (multi color) highlights:

```html +preview +highlight=/\[?name="number"\]?/g,/value/g,/id="increase"|#increase/g
<input name="number" value="1" type="number">
<button id="increase" type="button">Increase</button>
<script>
  const input = document.querySelector('[name="number"]')
  const button = document.querySelector("#increase")
  button.addEventListener("click", function() {
    input.value = Number.parseInt(input.value) + 1
  })
</script>
```

The example above would be highlighted with:

````markdown +highlight=/\/\\\[\?name.+?g/,/\/value.+?g/,/\/id.+?g/ +showmore=2..11
```html +highlight=/\[?name="number"\]?/g,/value/g,/id="increase"|#increase/g
<input name="number" value="1" type="number">
<button id="increase" type="button">Increase</button>
<script>
  const input = document.querySelector("[name=number]")
  const button = document.querySelector("#increase")
  button.addEventListener("click", function() {
    input.value = Number.parseInt(input.value) + 1
  })
</script>
```
````

---

## Copyright

Copyright 2018++ [Nico Hagenburger](https://www.hagenburger.net). See
[MIT-LICENSE](MIT-LICENSE) for details. Get in touch with
[@hagenburger](https://twitter.com/hagenburger) on Twitter or
[open an issue](https://github.com/hagenburger/pimd/issues/new).
