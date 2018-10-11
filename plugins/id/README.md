# PIMD ID Plugin

Adds an HTML ID to code blocks and other elements.

## Example usage

````markdown +highlight="#my-headline","#my-code","#my-paragraph"
# Headline <?: #my-headline ?>

```html #my-code
<p>Example</p>
```

Lorem ipsum dolor sit amet. <?: #my-paragraph ?>
````

Results in:

```html +highlight="id=\"my-headline\"","id=\"my-code\"","id=\"my-paragraph\""
<h1 id="my-headline">Headline</h1>

<div id="my-code">
  ...
</div>

<p id="my-paragraph">Lorem ipsum dolor sit amet.</p>
```

## Setup

```sh
npm i pimd @pimd/id-plugin
```

```javascript +highlight=/idPlugin/g,"require(\"@pimd/id-plugin\")",/(?<!\/)config/g +showmore=1..2,9..15
const { Document } = require("pimd")
const Config = require("pimd/lib/config")
const idPlugin = require("@pimd/id-plugin")

const config = new Config()
config.use(idPlugin)

const markdown = `
# Headline <?: #my-headline ?>

\`\`\`html #my-code
<p>Example</p>
\`\`\`

Lorem ipsum dolor sit amet. <?: #my-paragraph ?>
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
