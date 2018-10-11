# PIMD Preview Plugin

Adds a preview (live HTML) to code blocks.

## Example usage

````markdown +highlight="+preview"
```html +preview
<p>Example</p>
```
````

## Setup

```sh
npm i pimd @pimd/preview-plugin
```

```javascript +highlight=/previewPlugin/g,"require(\"@pimd/preview-plugin\")",/(?<!\/)config/g+showmore=1..2,9..11
const { Document } = require("pimd")
const Config = require("pimd/lib/config")
const previewPlugin = require("@pimd/preview-plugin")

const config = new Config()
config.use(previewPlugin)

const markdown = `
\`\`\`html +preview
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
