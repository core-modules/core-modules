// https://github.com/Polymer/lit-html/blob/master/src/lib/template-result.ts
// https://github.com/Polymer/lit-html/blob/master/src/lib/template.ts
// https://github.com/Polymer/lit-html/blob/master/src/lib/template-processor.ts
// https://github.com/Polymer/lit-html/blob/master/src/lib/render.ts

const MARKER = `__MARK__`

const html = (strings, ...values) => new Template({ strings, values })

class Template {

  constructor ({ strings, values }) {
    this.strings = strings
    this.values = values
  }

  getHtml () {
    let template = ""
    const len = this.strings.length - 1
    for (let i = 0; i < len; i++) template += this.strings[i] + MARKER
    template += this.strings[len]
    return template
  }

  getTemplate () {
    const template = document.createElement("template")
    template.innerHTML = this.getHtml()
    return template
  }

}

const template = html`
  <div>
    <span>${"a"}</span>
    <span>${"b"}</span>
  </div>
`

// <div>
//   <span>__MARK__</span>
//   <span>__MARK__</span>
// </div>
