module.exports = class InfoString {
  constructor(infoString) {
    this.lang = null
    this.filename = null
    this.infos = []
    this.additionalInfo = ""
    if (typeof infoString === "undefined") return

    infoString = infoString.replace(
      /^([\w~./_-]*?\.)?(\w+)(?=\s|$)/u,
      (all, basename, suffix) => {
        if (basename) this.filename = all
        this.lang = suffix.toLowerCase()
        return ""
      }
    )

    infoString = infoString.trim()
    if (infoString !== "") {
      this.infos = infoString.split(/ +/)
      this.additionalInfo = infoString
    }
  }
}
