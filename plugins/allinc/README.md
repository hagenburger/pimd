# PIMD Allinc Plugin

Load all PIMD plugins at once:

- [Classes](https://github.com/hagenburger/pimd/tree/master/plugins/classes#readme)
- [ID](https://github.com/hagenburger/pimd/tree/master/plugins/id#readme)
- [Preview](https://github.com/hagenburger/pimd/tree/master/plugins/preview#readme)
- [Highlight](https://github.com/hagenburger/pimd/tree/master/plugins/highlight#readme)
- [Showmore](https://github.com/hagenburger/pimd/tree/master/plugins/showmore#readme)
- [Prism](https://github.com/hagenburger/pimd/tree/master/plugins/prism#readme)
- [HTML injector](https://github.com/hagenburger/pimd/tree/master/plugins/html-injector#readme)

## Setup

```sh
npm i pimd @pimd/allinc-plugin
```

```javascript +highlight=/allincPlugin/g,"require(\"@pimd/allinc-plugin\")",/(?<!\/)config/g +showmore=1..2,9
const { Document } = require("pimd")
const Config = require("pimd/lib/config")
const allincPlugin = require("@pimd/allinc-plugin")

const config = new Config()
config.use(allincPlugin)

const markdown = `
# Example
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
