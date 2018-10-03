var { Document } = require("pimd")
const allincPlugin = require("@pimd/allinc-plugin")

const userInput = document.getElementById("my-input")

const defaultMarkdownSource = `# Headline

## Preview plugin

\`\`\`html +preview
<button class="my-button">Button</button>
\`\`\`

## Highlight plugin

\`\`\`html +highlight="my-button"
<button class="my-button">Button</button>
\`\`\`

\`\`\`html +highlight=/<.+?>/g
<button class="my-button">Button</button>
\`\`\`

## Showmore plugin

\`\`\`html +showmore=3..5
<ul>
  <li class="my-list-item">Item 1</li>
  <li class="my-list-item">Item 2 (hidden)</li>
  <li class="my-list-item">Item 3 (hidden)</li>
  <li class="my-list-item">Item 4 (hidden)</li>
</ul>
\`\`\`

## ID plugin

This paragraph has an ID when you inspect it. <?: #my-id ?>


## Classes plugin

This paragraph has a class when you inspect it. <?: .bordered ?>

## Tables

| Column 1 | Column 2                     |
| -------- | ---------------------------- |
| Lorem    | 1             <?: .number ?> |
| Ipsum    | -23 <?: .number .negative ?> |
| Dolor    | 45            <?: .number ?> |


<style>
  .bordered {
    border: 1px gray solid;
    padding: 0.25em;
  }
  .number {
    text-align: right;
  }
  .negative {
    color: red;
  }
</style>`
userInput.value = defaultMarkdownSource

userInput.addEventListener("input", function(e) {
  e.preventDefault()
  const contentString = userInput.value
  convertWithPimd(contentString)
})

function convertWithPimd(contentString) {
  const pimd = new Document(contentString)
  pimd.config.use(allincPlugin)
  const renderedString = pimd.render()
  let placer = document.getElementById("input-parsed")
  placer.innerHTML = renderedString
}

convertWithPimd(defaultMarkdownSource)
