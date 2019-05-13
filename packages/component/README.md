# core-modules/component

Component layer for building user interface.

Provides a native modular component layer by leveraging 
[Web Components](https://developer.mozilla.org/en-US/docs/Web/Web_Components)
and [decorators](https://github.com/tc39/proposal-decorators).

Decorators allow you to compose component patterns, such as data
synchronisation, rendering, etc.

## Decorators

- `@render`: Implements a render layer ([`lit-html`](https://github.com/Polymer/lit-html))
- `@prop`: Implements a prop layer
- `@shadow`: Implements shadow DOM
- `@component`: Implements base component

## `html`

Exposes a [template literal](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals)
API which can be passed to `@render` decorator. See [`docs`](https://lit-html.polymer-project.org/guide/writing-templates#render-dynamic-text-content)

## Examples

### Compose Component

```javascript
import {
  html,
  render,
  prop,
  shadow,
  component
} from "@core-modules/component"

@render
@prop
@shadow
@component
class Message extends HTMLElement {

  static props () {
    return ["message"]
  }

  render ({ message }) {
    return html`
      <style>
        span {
          font-weight: bold;
        }
      </style>
      <span>${message}</span>
    `
  }

}

customElements.define("cm-message", Message)
```
