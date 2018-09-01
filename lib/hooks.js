module.exports = class Hooks {
  constructor(parentHooks) {
    this._hooks = {}
    this._parentHooks = parentHooks
  }

  add(what, id, func) {
    this._hooks[what] = this._hooks[what] || []
    this._hooks[what].push({ id: id, func: func })
  }

  run(what, context, value, args) {
    if (this._parentHooks) {
      value = this._parentHooks.run(...arguments)
    }
    const hooks = this._hooks[what]
    if (!hooks) return value
    hooks.forEach(hook => {
      value = hook.func.call(null, context, value, args)
    })
    return value
  }
}
