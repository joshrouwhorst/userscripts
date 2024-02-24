class JackKnife {
  constructor(selector) {
    if (!selector) return

    let $

    if (selector instanceof HTMLElement) {
      $ = [selector]
    } else if (typeof selector === 'string') {
      $ = document.querySelectorAll(selector)
    } else if (selector instanceof NodeList) {
      $ = Array.from(selector)
    } else if (selector instanceof Array) {
      $ = selector
    } else if (selector instanceof JackKnife) {
      return selector
    } else if (typeof selector === 'function') {
      return document.addEventListener('DOMContentLoaded', selector)
    }

    if ($.length < 1) return

    this._meta = {
      selectors: $,
    }
  }

  get length() {
    return this._meta.selectors.length
  }

  first() {
    return new JackKnife(this._meta.selectors[0])
  }

  last() {
    return new JackKnife(this._meta.selectors[this.length - 1])
  }

  get(index) {
    if (index === undefined) return this._meta.selectors[0]
    return this._meta.selectors[index]
  }

  remove() {
    this._meta.selectors.forEach((elem) => elem.remove())
  }

  attr(name, value) {
    if (value === undefined) return this._meta.selectors[0].getAttribute(name)
    this._meta.selectors.forEach((elem) => elem.setAttribute(name, value))
  }

  text(value) {
    if (value === undefined) return this._meta.selectors[0].innerText
    this._meta.selectors.forEach((elem) => (elem.innerText = value))
  }
  hide() {
    this._meta.selectors.forEach((elem) => (elem.style.display = 'none'))
  }
  show() {
    this._meta.selectors.forEach((elem) => (elem.style.display = 'block'))
  }
  each(func) {
    this._meta.selectors.forEach(func)
  }
  after(html) {
    this._meta.selectors.forEach((elem) => (elem.outerHTML += html))
  }
  before(html) {
    this._meta.selectors.forEach(
      (elem) => (elem.outerHTML = html + elem.outerHTML)
    )
  }
  append(html) {
    this._meta.selectors.forEach((elem) => (elem.innerHTML += html))
  }
  prepend(html) {
    this._meta.selectors.forEach(
      (elem) => (elem.innerHTML = html + elem.innerHTML)
    )
  }
  replaceWith(selector) {
    const jk = JackKnife(selector)
    this._meta.selectors.forEach(
      (elem) => (elem.outerHTML = jk._meta.selectors[0].outerHTML)
    )
  }
  replace(selector) {
    const jk = JackKnife(selector)
    jk.replaceWith(this._meta.selectors[0].outerHTML)
  }

  appendTo(selector) {
    const jk = JackKnife(selector)
    jk.append(this._meta.selectors[0].outerHTML)
  }

  prependTo(selector) {
    const jk = JackKnife(selector)
    jk.prepend(this._meta.selectors[0].outerHTML)
  }

  insertAfter(selector) {
    const jk = JackKnife(selector)
    jk.after(this._meta.selectors[0].outerHTML)
  }

  insertBefore(selector) {
    const jk = JackKnife(selector)
    jk.before(this._meta.selectors[0].outerHTML)
  }

  val(value) {
    if (value === undefined) return this._meta.selectors[0].value
    this._meta.selectors.forEach((elem) => (elem.value = value))
  }

  change(func) {
    this._meta.selectors.forEach((elem) =>
      elem.addEventListener('change', func)
    )
  }

  find(selector) {
    return JackKnife(this._meta.selectors[0].querySelectorAll(selector))
  }

  trigger(event) {
    this._meta.selectors.forEach((elem) => elem.dispatchEvent(new Event(event)))
  }

  is(selector) {
    return this._meta.selectors[0].matches(selector)
  }

  on(event, func) {
    this._meta.selectors.forEach((elem) => elem.addEventListener(event, func))
  }

  off(event, func) {
    this._meta.selectors.forEach((elem) =>
      elem.removeEventListener(event, func)
    )
  }

  css(name, value) {
    if (value === undefined) return this._meta.selectors[0].style[name]
    this._meta.selectors.forEach((elem) => (elem.style[name] = value))
  }

  parent() {
    return JackKnife(this._meta.selectors[0].parentNode)
  }

  children() {
    return JackKnife(this._meta.selectors[0].children)
  }

  next() {
    return JackKnife(this._meta.selectors[0].nextElementSibling)
  }

  prev() {
    return JackKnife(this._meta.selectors[0].previousElementSibling)
  }

  closest(selector) {
    return JackKnife(this._meta.selectors[0].closest(selector))
  }

  clone() {
    return JackKnife(this._meta.selectors[0].cloneNode(true))
  }

  html(html) {
    if (html === undefined) return this._meta.selectors[0].innerHTML
    this._meta.selectors.forEach((elem) => (elem.innerHTML = html))
  }

  addClass(className) {
    this._meta.selectors.forEach((elem) => elem.classList.add(className))
  }

  removeClass(className) {
    this._meta.selectors.forEach((elem) => elem.classList.remove(className))
  }

  toggleClass(className) {
    this._meta.selectors.forEach((elem) => elem.classList.toggle(className))
  }

  hasClass(className) {
    return this._meta.selectors[0].classList.contains(className)
  }

  click(func) {
    this._meta.selectors.forEach((elem) => elem.addEventListener('click', func))
  }

  focus(func) {
    this._meta.selectors.forEach((elem) => elem.addEventListener('focus', func))
  }

  blur(func) {
    this._meta.selectors.forEach((elem) => elem.addEventListener('blur', func))
  }

  submit(func) {
    this._meta.selectors.forEach((elem) =>
      elem.addEventListener('submit', func)
    )
  }

  keyup(func) {
    this._meta.selectors.forEach((elem) => elem.addEventListener('keyup', func))
  }

  keydown(func) {
    this._meta.selectors.forEach((elem) =>
      elem.addEventListener('keydown', func)
    )
  }

  keypress(func) {
    this._meta.selectors.forEach((elem) =>
      elem.addEventListener('keypress', func)
    )
  }

  mouseover(func) {
    this._meta.selectors.forEach((elem) =>
      elem.addEventListener('mouseover', func)
    )
  }

  mouseout(func) {
    this._meta.selectors.forEach((elem) =>
      elem.addEventListener('mouseout', func)
    )
  }

  mouseenter(func) {
    this._meta.selectors.forEach((elem) =>
      elem.addEventListener('mouseenter', func)
    )
  }

  mouseleave(func) {
    this._meta.selectors.forEach((elem) =>
      elem.addEventListener('mouseleave', func)
    )
  }

  mousemove(func) {
    this._meta.selectors.forEach((elem) =>
      elem.addEventListener('mousemove', func)
    )
  }

  mousedown(func) {
    this._meta.selectors.forEach((elem) =>
      elem.addEventListener('mousedown', func)
    )
  }

  mouseup(func) {
    this._meta.selectors.forEach((elem) =>
      elem.addEventListener('mouseup', func)
    )
  }
}

const Utils = {
  Log(text) {
    console.log(`%cUS | ${text}`, 'font-weight: bold;')
  },
  Err(text) {
    console.error(
      `%cUS | ${text}`,
      'font-weight: bold; background-color: red; color: white;'
    )
  },
  Obj(object) {
    console.log(object)
  },
  GetQueryVariable(variable) {
    try {
      let query = null

      if (window.location.search) {
        query = window.location.search.substring(1)
      } else if (window.location.hash) {
        query = window.location.hash
        if (query.indexOf('?') === -1) return null
        query = query.split('?')[1]
      }

      if (!query) return null

      let vars = query.split('&')
      for (let i = 0; i < vars.length; i++) {
        const pair = vars[i].split('=')
        if (pair.length === 1) continue
        if (decodeURIComponent(pair[0]) === variable) {
          return decodeURIComponent(pair[1])
        }
      }
    } catch (err) {
      console.error(err)
    }

    return null
  },
  GetAriaLabel(elem) {
    const $elem = $(elem)
    const label = $elem.attr('aria-label')
    if (label) return label

    const id = $elem.attr('aria-labelledby')
    if (id) return $(`#${id}`).text()
  },
  HasParam(name) {
    return (
      window.location.search.indexOf(name) > -1 ||
      window.location.hash.indexOf(name) > -1
    )
  },
  OnLocationChange(func) {
    try {
      const observeUrlChange = () => {
        let oldHref = document.location.href
        const body = document.querySelector('body')
        const observer = new MutationObserver((mutations) => {
          if (oldHref !== document.location.href) {
            Utils.Log(`Location Change: ${document.location.href}`)
            oldHref = document.location.href
            func(document.location.href)
          }
        })
        observer.observe(body, { childList: true, subtree: true })
      }

      window.onload = observeUrlChange
    } catch (err) {
      Utils.Err('Error observing location change')
      Utils.Obj(err)
    }

    func(document.location.href)
  },
  RemoveAds(selectors, loopTime) {
    if (!loopTime) loopTime = 500
    selectors.forEach((selector) => {
      if (typeof selector === 'function') selector()
      else if ($(selector).length > 0) $(selector).remove()
    })

    setTimeout(() => Utils.RemoveAds(selectors, loopTime), loopTime)
  },
}
