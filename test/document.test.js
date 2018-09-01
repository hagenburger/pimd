const Document = require("../lib/document")
const Config = require("../lib/config")

describe("Rendering documents", () => {
  it("should render HTML out of Markdown", () => {
    const input = unindent`
      # Test
    `
    const doc = new Document(input)
    const html = doc.render()
    expect(html)
      .to.have.selector("h1")
      .with.text.to.equal("Test")
  })
})

describe("Meta information", () => {
  it("should use the first headline as the title", () => {
    const input = unindent`
      # Hello

      # World
    `
    const doc = new Document(input)
    expect(doc.title).to.equal("Hello")
  })

  it("should not have a title when no headline is used", () => {
    const input = unindent`
      Hello

      World
    `
    const doc = new Document(input)
    expect(doc.title).to.be.null
  })
})

describe("Content", () => {
  it("should add CSS and JavaScript", done => {
    const input = unindent`
      # Test
    `
    const doc = new Document(input)
    doc.contents.add("css", "a { text-decoration: none; }")
    doc.contents.add("css", "p { color: blue; }")
    doc.contents.add("javascript", 'alert("Hello world!")')
    doc.renderDocument().then(html => {
      expect(html)
        .to.have.selector("html > head > style")
        .with.text.to.include("a { text-decoration: none; }")
      expect(html)
        .to.have.selector("html > head > style")
        .with.text.to.include("p { color: blue; }")
      expect(html)
        .to.have.selector("html > head > script")
        .with.text.to.include('alert("Hello world!")')
      done()
    })
  })
})

describe("Code blocks", () => {
  const testBothCodeBlockTypes = (input, callback) => {
    callback(input)
    callback(input.replace(/~~~/g, "```"))
  }

  it("should render a code block", () => {
    const input = unindent`
      ~~~
      My code
      ~~~
    `
    testBothCodeBlockTypes(input, input => {
      const doc = new Document(input)
      const html = doc.render()
      expect(html)
        .to.have.selector("pre > code")
        .with.text.to.equal("My code")
    })
  })

  it("should render a code block with language", () => {
    const input = unindent`
      ~~~ html
      <p>My code</p>
      ~~~
    `
    testBothCodeBlockTypes(input, input => {
      const doc = new Document(input)
      const html = doc.render()
      expect(html)
        .to.have.selector("pre > code.lang-html")
        .with.text.to.match(/<p>My code<\/p>/)
    })
  })

  it("should render a code block with language as file extension", () => {
    const input = unindent`
      ~~~ my-File_name.html
      <p>My code</p>
      ~~~
    `
    testBothCodeBlockTypes(input, input => {
      const doc = new Document(input)
      const html = doc.render()
      expect(html)
        .to.have.selector("pre > code.lang-html")
        .with.text.to.match(/<p>My code<\/p>/)
    })
  })

  it("should render a code block with language and additional info string without issues", () => {
    const input = unindent`
      ~~~ html info string
      <p>My code</p>
      ~~~
    `
    testBothCodeBlockTypes(input, input => {
      const doc = new Document(input)
      const html = doc.render()
      expect(html)
        .to.have.selector("pre > code.lang-html")
        .with.text.to.match(/<p>My code<\/p>/)
    })
  })
})

describe("Info strings on non-code elements", () => {
  const config = new Config()
  const foo = sinon.spy()
  config.addInfoStringParser(/foo/, foo)
  const input = unindent`
    # Hello world <?: foo ?>
  `
  const doc = new Document(input, config)
  doc.render()
  expect(foo).to.have.been.called
})

describe("Options", () => {
  it("should respect options", () => {
    const input = "<hr>"

    const config1 = new Config()
    config1.markdown.html = true
    let doc1 = new Document(input, config1)
    let html1 = doc1.render()
    expect(html1).to.have.selector("hr")

    const config2 = new Config()
    config1.markdown.html = false
    const doc2 = new Document(input, config2)
    const html2 = doc2.render()
    expect(html2).not.have.selector("hr")
  })
})

describe("Hooks", () => {
  it("should run hooks", () => {
    const input = unindent`
      ~~~
      test
      ~~~
    `
    let doc = new Document(input)
    doc.hooks.add("example:beforeRender", "replace-with-h1", function(example) {
      example.dom.innerHTML = "<h1>"
    })

    let html = doc.render()
    expect(html).to.have.selector("h1")
  })

  it("should run hooks defined in Config", () => {
    const input = unindent`
      ~~~
      test
      ~~~
    `
    const config = new Config()
    config.hooks.add("example:beforeRender", "replace-with-h1", function(
      example
    ) {
      example.dom.innerHTML = "<h1>"
    })
    let doc = new Document(input, config)

    let html = doc.render()
    expect(html).to.have.selector("h1")
  })
})

describe("Processing instructions", () => {
  it("should not output anything for empty processing instructions", () => {
    const input = unindent`
      Line 1

      <? ?>

      Line 2
    `

    let doc = new Document(input)
    let html = doc.render()
    expect(html).to.match(/<\/p><p>/)
    expect(html)
      .to.have.selector("p + p")
      .with.text.to.equal("Line 2")
  })

  it("should call defined processing instructions", () => {
    const input = unindent`
      Line 1

      <?pi1?>

      <?pi2?>

      Line 2
    `
    const config = new Config()
    config.commands["pi1"] = () => "<h1>PI1</h1>"
    config.commands["pi2"] = () => "<h2>PI2</h2>"

    let doc = new Document(input, config)
    let html = doc.render()
    expect(html)
      .to.have.selector("h1")
      .with.text.to.equal("PI1")
    expect(html)
      .to.have.selector("h2")
      .with.text.to.equal("PI2")
  })

  it("should call defined processing instructions", () => {
    const input = unindent`
      Line 1

      <?up test?>

      Line 2
    `
    const config = new Config()
    config.commands["up"] = pi => "<h1>" + pi.content.toUpperCase() + "</h1>"

    let doc = new Document(input, config)
    let html = doc.render()
    expect(html)
      .to.have.selector("h1")
      .with.text.to.equal("TEST")
  })

  it("should call defined processing instructions and create DOM", () => {
    const input = unindent`
      Line 1

      <?up3 lorem?>

      Line 2
    `
    const config = new Config()
    config.commands["up3"] = pi => {
      const el = pi.renderer.dom.window.document.createElement("h3")
      el.textContent = pi.content
      pi.dom.appendChild(el)
    }

    let doc = new Document(input, config)
    let html = doc.render()
    expect(html)
      .to.have.selector("h3")
      .with.text.to.equal("lorem")
  })

  it("should call defined processing instructions inline and create DOM", () => {
    const input = unindent`
      Line 1 <?strongandup lorem?>.
    `
    const config = new Config()
    config.commands["strongandup"] = pi => {
      const el = pi.renderer.dom.window.document.createElement("strong")
      el.textContent = pi.content.toUpperCase()
      pi.dom.appendChild(el)
    }

    let doc = new Document(input, config)
    let html = doc.render()
    expect(html)
      .to.have.selector("p strong")
      .with.text.to.equal("LOREM")
  })
})
