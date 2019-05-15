import { html as _html, render as renderHtml } from "lit-html"

export const html = _html

// @todo Implement `update` and `attributeChangedCallback` as `hook` decorator mixin
export function component (target) {
  return class extends target {
    constructor () {
      super()
      this._attributeChangedCallback = this._attributeChangedCallback || []
      this._update = this._update || []
    }
    attributeChangedCallback (name, previous, value) {
      this._attributeChangedCallback.map(hook => hook(name, previous, value))
      this.update()
    }
    update () {
      this._update.map(hook => hook())
    }
  }
}

export function prop (target) {
  return class extends target {
    constructor() {
      super()
      target.props().map(prop => this[prop] = this.getAttribute(prop))
      this._attributeChangedCallback.push((name, previous, value) => this[name] = value)
    }
    static get observedAttributes () {
      const previous = target.observedAttributes ? target.observedAttributes() : []
      return [ ...previous, ...target.props() ]
    }
    props () {
      const props = {}
      target.props().map(prop => props[prop] = this[prop])
      return props
    }
  }
}

export function shadow (target) {
  return class extends target {
    constructor () {
      super()
      this.attachShadow({ mode: "open" })
    }
  }
}

export function render (target) {
  return class extends target {
    constructor () {
      super()
      this._update.push(() => {
        if (!this.shadowRoot) return
        const props = this.props ? this.props() : {}
        if (this.shadowRoot) renderHtml(this.render(props), this.shadowRoot)
      })
    }
  }
}
