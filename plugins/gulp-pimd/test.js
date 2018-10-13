const assert = require("assert")
const File = require("vinyl")
var gulpPimdPlugin = require(".")
const eventStream = require("event-stream")

const createFile = contents => {
  return new File({
    path: "test",
    contents: contents
  })
}

describe("gulp-pimd", () => {
  it("should render markdown if a buffer is provided.", function(done) {
    const task = gulpPimdPlugin()
    task.write(createFile(Buffer.from("# Heading")))
    task.once("data", function(file) {
      assert(file.isBuffer())
      assert.equal(file.contents.toString(), "<h1>Heading</h1>")
      done()
    })
  })
  it("should pass over an empty file.", function(done) {
    const task = gulpPimdPlugin()
    task.write(createFile(null))
    task.once("data", function(file) {
      assert.equal(file.contents, null)
      done()
    })
  })
  it("should error when a stream is provided", done => {
    const task = gulpPimdPlugin()
    assert.throws(() => {
      task.write(createFile(eventStream.readArray(["# Heading"])))
    })
    done()
  })
})
