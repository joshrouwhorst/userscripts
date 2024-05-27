class JackKnifeBar {
  static buttons = []
  static config = {
    barStyles: {
      position: 'fixed',
      bottom: '0',
      left: '0',
      width: '100%',
      backgroundColor: 'black',
      display: 'flex',
      justifyContent: 'center',
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
  }

  static AddButton(name, func) {
    JackKnifeBar.buttons.push({ name, func })
    JackKnifeBar.CreateBar()
  }

  static RemoveButton(name) {
    JackKnifeBar.buttons = JackKnifeBar.buttons.filter(
      (button) => button.name !== name
    )
    JackKnifeBar.CreateBar()
  }

  static ReplaceButton(oldName, name, func) {
    const idx = JackKnifeBar.buttons.findIndex((b) => b.name === oldName)
    JackKnifeBar.buttons[idx] = { name, func }
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

    const makeBtn = (button) => {
      const btn = document.createElement('button')
      btn.textContent = button.name
      btn.addEventListener('click', button.func)
      const btnStyles = JackKnifeBar.config.buttonStyles
      Object.assign(btn.style, btnStyles)
      bar.appendChild(btn)
    }

    JackKnifeBar.buttons.forEach((btn) => makeBtn(btn))

    makeBtn({
      name: '✖️',
      func: () => {
        if (confirm('Are you sure you want to close?')) JackKnifeBar.CloseBar()
      },
    })

    if (existingBar) {
      existingBar.replaceWith(bar)
    } else {
      document.body.appendChild(bar)
    }

    return bar
  }
}
