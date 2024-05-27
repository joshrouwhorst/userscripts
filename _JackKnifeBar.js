const _JackKnifeBar = {
  _config: {
    barId: 'jackKnifeBar',
    barStyles: {
      backgroundColor: 'black',
      padding: '5px',
      borderTop: '2px solid yellow',
      fontWeight: 'bold',
      color: 'yellow',
      filter: 'none',
      position: 'fixed',
      bottom: '0',
    },
    buttonStyles: {
      backgroundColor: 'yellow',
      padding: '5px',
      border: '2px solid black',
      fontWeight: 'bold',
      color: 'black',
      marginRight: '5px',
    },
  },
  _buttons: [],
  AddButton(name, func) {
    this._buttons.push({ name, func })
    this.CreateBar()
  },
  RemoveButton(name) {
    this._buttons = this._buttons.filter((button) => button.name !== name)
    this.CreateBar()
  },
  ReplaceButton(oldName, name, func) {
    const idx = this._buttons.indexOf((b) => b.name === oldName)
    this._buttons[idx] = { name, func }
    this.CreateBar()
  },
  ShouldBarBeOpened() {
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
  },
  CloseBar() {
    const bar = document.getElementById('jackKnifeBar')
    if (bar) bar.remove()
    localStorage.setItem('jkbar', 'false')
    const urlParams = new URLSearchParams(window.location.search)
    urlParams.get('jkbar') ? urlParams.delete('jkbar') : null
    history.replaceState({}, '', `${location.pathname}?${urlParams}`)
  },
  CreateBar() {
    if (!this.ShouldBarBeOpened()) return

    const existingBar = document.getElementById('jackKnifeBar') || null
    const bar = document.createElement('div')
    const styles = this._config.barStyles
    Object.assign(bar.style, styles)

    bar.id = 'jackKnifeBar'

    const makeBtn = (button) => {
      const btn = document.createElement('button')
      btn.textContent = button.name
      btn.addEventListener('click', button.func)
      const btnStyles = this._config.buttonStyles
      Object.assign(btn.style, btnStyles)
      bar.appendChild(btn)
    }

    this._buttons.forEach((btn) => makeBtn(btn))

    makeBtn({ name: 'Close', func: () => this.CloseBar() })

    if (existingBar) {
      existingBar.replaceWith(bar)
    } else {
      document.body.appendChild(bar)
    }

    return bar
  },
}
