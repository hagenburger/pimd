# PIMD Showmore Plugin

Hides non-relevant parts of code examples.

Very often code examples require more code to be rendered as preview than to be
understood by a human. Those extra code is noise and should be hidden.

This plugin shows `···` instead of the noise and reveals the code on click.

![Video preview of Showmore plugin](https://user-images.githubusercontent.com/103399/46336396-f7049980-c62a-11e8-94ec-9acdee8e858f.gif)

## Example usage

````markdown +highlight=/\+showmore=[^\s]+/
```html +showmore=5..13
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
  <li class="my-list-item">
    Item 4
  </li>
</ul>
```
````

Result:

![preview](https://user-images.githubusercontent.com/103399/44298456-b4d60180-a2e3-11e8-96f7-5740028c564c.png)

## Setup

This requires the _HTML injector_ plugin to be loaded first:

```javascript +highlight=/showmorePlugin/g,"require(\"@pimd/showmore-plugin\")",/(?<!\/)config/g +showmore=1..2,11..26
const { Document } = require("pimd")
const Config = require("pimd/lib/config")
const htmlInjector = require("@pimd/html-injector-plugin")
const showmorePlugin = require("@pimd/showmore-plugin")

const config = new Config()
config.use(htmlInjector)
config.use(showmorePlugin)

const markdown = `
\`\`\`html +showmore=5..13
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
  <li class="my-list-item">
    Item 4
  </li>
</ul>
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
