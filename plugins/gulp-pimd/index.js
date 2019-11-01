const through = require("through2")
const PluginError = require("plugin-error")
const { Document } = require("pimd")

module.exports = options => {
  return through.obj(function(file, enc, callback) {
    if (file.isNull()) {
      callback(null, file)
      return
    }

    if (file.isStream()) {
      callback(new PluginError("gulp-pimd", "Streaming not supported"))
      return
    }

    try {
      const doc = new Document(file.contents.toString(), options)
      const renderedHtml = doc.render()
      file.contents = Buffer.from(renderedHtml)
      this.push(file)
    } catch (err) {
      this.emit("error", new PluginError("gulp-pimd", err))
    }

    callback()
  })
}
