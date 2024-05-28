class JackKnifeBar {
  static widgets = []
  static config = {
    barStyles: {
      position: 'fixed',
      bottom: '0',
      left: '0',
      width: '100%',
      backgroundColor: 'black',
      display: 'flex',
      gap: '10px',
      padding: '10px',
      zIndex: '9999',
    },
    buttonStyles: {
      padding: '5px 10px',
      backgroundColor: 'yellow',
      border: 'none',
      borderRadius: '5px',
      cursor: 'pointer',
      fontWeight: 'bold',
    },
    dropdownStyles: {
      padding: '5px 10px',
      backgroundColor: 'yellow',
      border: 'none',
      borderRadius: '5px',
      cursor: 'pointer',
      fontWeight: 'bold',
    },
  }

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
    const currentValue =
      localStorage.getItem(dropdown.name) || dropdown.options[0]
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

    const existingBar = document.getElementById('jackKnifeBar') || null
    const bar = document.createElement('div')
    const styles = JackKnifeBar.config.barStyles
    Object.assign(bar.style, styles)

    bar.id = 'jackKnifeBar'

    const makeBtn = (button, style) => {
      const btn = document.createElement('button')
      btn.textContent = button.name
      btn.addEventListener('click', button.func)
      const btnStyles = style || JackKnifeBar.config.buttonStyles
      Object.assign(btn.style, btnStyles)
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

      const selectStyles = style || JackKnifeBar.config.dropdownStyles
      Object.assign(select.style, selectStyles)
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

    makeWidget(
      {
        name: '✖️',
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

    if (existingBar) {
      existingBar.replaceWith(bar)
    } else {
      document.body.appendChild(bar)
    }

    return bar
  }
}
