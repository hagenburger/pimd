const classesPlugin = require("@pimd/classes-plugin")
const highlightPlugin = require("@pimd/highlight-plugin")
const htmlInjectorPlugin = require("@pimd/html-injector-plugin")
const idPlugin = require("@pimd/id-plugin")
const previewPlugin = require("@pimd/preview-plugin")
const prismPlugin = require("@pimd/prism-plugin")
const showmorePlugin = require("@pimd/showmore-plugin")

module.exports = function(config) {
  // Order does matter:
  config.use(htmlInjectorPlugin)
  // Order does not matter:
  config.use(classesPlugin)
  config.use(highlightPlugin)
  config.use(idPlugin)
  config.use(previewPlugin)
  config.use(prismPlugin)
  config.use(showmorePlugin)
}
