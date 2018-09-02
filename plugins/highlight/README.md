# PIMD Highlight plugin

Highlights important parts of a code example.

## Example usage

````markdown
```html highlight=/important-class/
<div class="important-class other-class">
  Lorem ipsum.
</div>
```
````

Result:

![preview](https://user-images.githubusercontent.com/103399/44298223-763e4800-a2df-11e8-83af-32fc8637a760.png)

## Setup

This requires the _HTML injector_ plugin to be loaded first:

```javascript
// ...
const htmlInjectorPlugin = require("@pimd/html-injector-plugin")
const highlightPlugin = require("@pimd/highlight-plugin")

config.use(htmlInjectorPlugin)
config.use(highlightPlugin)
```

---

## Copyright

Copyright 2018++ [Nico Hagenburger](https://www.hagenburger.net). See
[MIT-LICENSE](MIT-LICENSE) for details. Get in touch with
[@hagenburger](https://twitter.com/hagenburger) on Twitter or
[open an issue](https://github.com/hagenburger/pimd/issues/new).
