let _jackKnifeBarStyling = `
:root {
  transition: 0.2s;
}

.bar {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  background-color: black;
  display: flex;
  gap: 10px;
  padding: 10px;
  z-index: 9999;
}

input, select, button {
  padding: 5px 10px;
  background-color: yellow;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-weight: bold;
  filter: transparency(0.1);
}

input:hover, select:hover, button:hover {
  filter: transparency(0);
}
`

_jackKnifeBarStyling = `<style>${_jackKnifeBarStyling}</style>`

class JackKnifeBar {
  static shadowRoot = null
  static widgets = []

  static AddButton(name, func) {
    JackKnifeBar.widgets.push({ name, func, type: 'button' })
    JackKnifeBar.CreateBar()
  }

  static RemoveButton(name) {
    JackKnifeBar.widgets = JackKnifeBar.widgets.filter(
      (button) => button.name !== name
    )
    JackKnifeBar.CreateBar()
  }

  static ReplaceButton(oldName, name, func) {
    const idx = JackKnifeBar.widgets.findIndex((b) => b.name === oldName)
    JackKnifeBar.widgets[idx] = { name, func, type: 'button' }
    JackKnifeBar.CreateBar()
  }

  static AddDropdown(name, options, func) {
    JackKnifeBar.widgets.push({ name, options, func, type: 'dropdown' })
    JackKnifeBar.CreateBar()

    // Provide the current value immediately, for onload purposes.
    const value = localStorage.getItem(name) || options[0]
    func(value)
  }

  static RemoveDropdown(name) {
    JackKnifeBar.widgets = JackKnifeBar.widgets.filter(
      (wid) => wid.name !== name
    )
    JackKnifeBar.CreateBar()
  }

  static ReplaceDropdown(oldName, name, options, func) {
    const idx = JackKnifeBar.widgets.findIndex((b) => b.name === oldName)
    JackKnifeBar.widgets[idx] = { name, options, func, type: 'dropdown' }
    JackKnifeBar.CreateBar()
  }

  static OpenBar() {
    localStorage.setItem('jkbar', 'true')
    JackKnifeBar.CreateBar()
  }

  static ShouldBarBeOpened() {
    const urlParams = new URLSearchParams(window.location.search)
    if (urlParams.get('jkbar') === 'true') {
      localStorage.setItem('jkbar', 'true')
      return true
    } else if (urlParams.get('jkbar') === 'false') {
      localStorage.setItem('jkbar', 'false')
      return false
    } else if (localStorage.getItem('jkbar') === 'true') {
      return true
    } else if (localStorage.getItem('jkbar') === 'false') {
      return false
    } else {
      return false
    }
  }

  static CloseBar() {
    const bar = document.getElementById('jackKnifeBar')
    if (bar) bar.remove()
    localStorage.setItem('jkbar', 'false')
    const urlParams = new URLSearchParams(window.location.search)
    urlParams.get('jkbar') ? urlParams.delete('jkbar') : null
    history.replaceState({}, '', `${location.pathname}?${urlParams}`)
  }

  static CreateBar() {
    if (!JackKnifeBar.ShouldBarBeOpened()) return

    const makeElement = (html) => {
      // Takes string of HTML and returns a DOM element
      const temp = document.createElement('div')
      temp.innerHTML = html
      return temp.firstChild
    }

    // Remove old bar if it exists
    let container = document.getElementById('jackKnifeBar')
    let shadowRoot = container?.shadowRoot

    //if (container) container.remove()
    if (!container) {
      // Create the container and shadow dom
      container = document.createElement('div')
      container.id = 'jackKnifeBar'
      document.body.appendChild(container)
      shadowRoot = container.attachShadow({ mode: 'open' })
      shadowRoot.appendChild(makeElement(_jackKnifeBarStyling))
    }

    if (!container.widgets) container.widgets = []

    JackKnifeBar.widgets.forEach((widget) => {
      if (!container.widgets.filter((w) => w.name === widget.name).length) {
        container.widgets.push(widget)
      }
    })

    // Create the bar
    const bar = document.createElement('div')
    bar.id = 'jkbar'
    bar.className = 'bar'
    shadowRoot.appendChild(bar)

    // Widget setup
    const makeBtn = (button) => {
      const btn = document.createElement('button')
      btn.textContent = button.name
      btn.addEventListener('click', button.func)
      bar.appendChild(btn)
    }

    const makeDropdown = (dropdown) => {
      const select = document.createElement('select')
      const currentValue =
        localStorage.getItem(dropdown.name) || dropdown.options[0]

      select.addEventListener('change', (event) => {
        localStorage.setItem(dropdown.name, select.value)
        dropdown.func(select.value, event)
      })

      dropdown.options.forEach((option) => {
        const opt = document.createElement('option')
        opt.textContent = option
        select.appendChild(opt)
        if (option === currentValue) select.value = option
      })

      bar.appendChild(select)
    }

    const makeWidget = (widget, style) => {
      switch (widget.type) {
        case 'button':
          makeBtn(widget, style)
          break
        case 'dropdown':
          makeDropdown(widget, style)
          break
      }
    }

    // Close button
    makeWidget({
      name: 'X',
      func: () => {
        if (confirm('Are you sure you want to close?')) JackKnifeBar.CloseBar()
      },
      type: 'button',
    })

    container.widgets.forEach((btn) => makeWidget(btn))

    return bar
  }
}

class JackKnifePopup {
  Open(body) {
    const shadowRoot = this.shadowRoot
    const popup = document.createElement('div')
    popup.id = 'jackKnifePopup'
    popup.className = 'popup'
    shadowRoot.appendChild(popup)

    const closeBtn = document.createElement('button')
    closeBtn.textContent = 'X'
    closeBtn.addEventListener('click', () => {
      popup.remove()
    })
    popup.appendChild(closeBtn)

    const content = document.createElement('div')
    content.className = 'content'
    content.innerHTML = body
    popup.appendChild(content)

    return popup
  }

  // Function that takes an object and outputs its attributes as html.
}
