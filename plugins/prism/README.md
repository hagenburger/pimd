# PIMD Prism Plugin

Uses [Prism](https://prismjs.com) to highlight code blocks.

## Example usage

````markdown +highlight=/javascript|html/g
# Example usage

Add the language to a code block:

```html
<p>Example</p>
```

Or for JavaScript:

```javascript
alert("Hello world!")
```

Alternatively a file name with suffix can be used:

```index.html
<p>Example</p>
```
````

## Setup

```sh
npm i pimd @pimd/prism-plugin
```

```javascript +highlight=/prismPlugin/g,"require(\"@pimd/prism-plugin\")",/(?<!\/)config/g+showmore=1..2,9..11
const { Document } = require("pimd")
const Config = require("pimd/lib/config")
const prismPlugin = require("@pimd/prism-plugin")

const config = new Config()
config.use(prismPlugin)

const markdown = `
\`\`\`html
<p>Example</p>
\`\`\`
`
const doc = new Document(markdown, config)
console.log(doc.render())
```

---

## Copyright

Copyright 2018++ [Nico Hagenburger](https://www.hagenburger.net). See
[MIT-LICENSE](MIT-LICENSE) for details. Get in touch with
[@hagenburger](https://twitter.com/hagenburger) on Twitter or
[open an issue](https://github.com/hagenburger/pimd/issues/new).
