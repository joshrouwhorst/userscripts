let _jackKnifeBarStyling = `
#jkbar {
  transition: 0.2s;
}

#jkbar.bar {
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

#jkbar input, #jkbar select, #jkbar button {
  padding: 5px 10px;
  background-color: yellow;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-weight: bold;
  filter: transparency(0.1);
}

#jkbar input:hover, #jkbar select:hover, #jkbar button:hover {
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
    const currentValue = localStorage.getItem(name) || options[0]
    // Provide the current value immediately, for onload purposes.
    func(currentValue)
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

    // Remove old bar if it exists
    let container = document.getElementById('jackKnifeBar') || null
    if (container) container.remove()

    // Create the container and shadow dom
    container = document.createElement('div')
    container.id = 'jackKnifeBar'
    container.appendChild(MakeElement(_jackKnifeBarStyling))
    document.body.appendChild(container)
    const shadowRoot = container.attachShadow({ mode: 'open' })

    // Create the bar
    const bar = document.createElement('div')
    bar.id = 'jkbar'
    bar.className = 'bar'
    shadowRoot.appendChild(bar)

    // Widget setup
    const makeBtn = (button, style) => {
      const btn = document.createElement('button')
      btn.textContent = button.name
      btn.addEventListener('click', button.func)
      bar.appendChild(btn)
    }

    const makeDropdown = (dropdown, style) => {
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
    makeWidget(
      {
        name: 'X',
        func: () => {
          if (confirm('Are you sure you want to close?'))
            JackKnifeBar.CloseBar()
        },
        type: 'button',
      },
      {
        backgroundColor: 'black',
        color: 'yellow',
        border: '2px solid yellow',
        fontWeight: 'bold',
      }
    )

    JackKnifeBar.widgets.forEach((btn) => makeWidget(btn))

    return bar
  }
}
