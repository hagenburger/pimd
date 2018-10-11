# PIMD Classes Plugin

Adds HTML classes to code blocks and other elements.

## Example usage

````markdown +highlight=".my-headline",".my-code",".my-paragraph"
# Headline <?: .my-headline ?>

```html .my-code
<p>Example</p>
```

Lorem ipsum dolor sit amet. <?: .my-paragraph ?>
````

Results in:

```html +highlight="class=\"my-headline\"","my-code","class=\"my-paragraph\""
<h1 class="my-headline">Headline</h1>

<div class="pimd-example my-code">
  ...
</div>

<p class="my-paragraph">Lorem ipsum dolor sit amet.</p>
```

## Setup

```sh
npm i pimd @pimd/classes-plugin
```

```javascript +highlight=/classesPlugin/g,"require(\"@pimd/classes-plugin\")",/(?<!\/)config/g +showmore=1..2,9..15
const { Document } = require("pimd")
const Config = require("pimd/lib/config")
const classesPlugin = require("@pimd/classes-plugin")

const config = new Config()
config.use(classesPlugin)

const markdown = `
# Headline <?: .my-headline ?>

\`\`\`html .my-code
<p>Example</p>
\`\`\`

Lorem ipsum dolor sit amet. <?: .my-paragraph ?>
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
