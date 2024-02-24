function JackKnife(selector) {
  if (!selector) return

  let $

  if (selector instanceof HTMLElement) {
    $ = [selector]
  } else if (typeof selector === 'string') {
    if (selector.indexOf('<') === 0) {
      // HTML string
      const temp = document.createElement('div')
      temp.innerHTML = selector
      $ = [temp.firstChild]
    } else {
      // Actual Selector
      $ = document.querySelectorAll(selector)
    }
  } else if (selector instanceof NodeList) {
    $ = Array.from(selector)
  } else if (selector instanceof Array) {
    $ = selector
  } else if (selector instanceof JackKnife) {
    return selector
  } else if (typeof selector === 'function') {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', selector)
    } else {
      selector()
    }
  }

  return {
    length: $.length,
    _meta: {
      selectors: $,
    },
    first() {
      return JackKnife($[0])
    },
    last() {
      return JackKnife($[$.length - 1])
    },
    nth(index) {
      return JackKnife($[index])
    },
    get(index) {
      if (index === undefined) return $[0]
      return $[index]
    },
    remove() {
      $.forEach((elem) => elem.remove())
    },
    attr(name, value) {
      if (value === undefined) return $[0].getAttribute(name)
      $.forEach((elem) => elem.setAttribute(name, value))
    },
    text(value) {
      if (value === undefined) return $[0].innerText
      $.forEach((elem) => (elem.innerText = value))
    },
    hide() {
      $.forEach((elem) => (elem.style.display = 'none'))
    },
    show() {
      $.forEach((elem) => (elem.style.display = 'block'))
    },
    each(func) {
      $.forEach(func)
    },
    after(html) {
      $.forEach((elem) => (elem.outerHTML += html))
    },
    before(html) {
      $.forEach((elem) => (elem.outerHTML = html + elem.outerHTML))
    },
    append(html) {
      $.forEach((elem) => (elem.innerHTML += html))
    },
    prepend(html) {
      $.forEach((elem) => (elem.innerHTML = html + elem.innerHTML))
    },
    replaceWith(selector) {
      const jk = JackKnife(selector)
      $.forEach((elem) => (elem.outerHTML = jk._meta.selectors[0].outerHTML))
    },
    replace(selector) {
      const jk = JackKnife(selector)
      jk.replaceWith($[0].outerHTML)
    },

    appendTo(selector) {
      const jk = JackKnife(selector)
      jk.append($[0].outerHTML)
    },
    prependTo(selector) {
      const jk = JackKnife(selector)
      jk.prepend($[0].outerHTML)
    },
    insertAfter(selector) {
      const jk = JackKnife(selector)
      jk.after($[0].outerHTML)
    },
    insertBefore(selector) {
      const jk = JackKnife(selector)
      jk.before($[0].outerHTML)
    },
    val(value) {
      if (value === undefined) return $[0].value
      $.forEach((elem) => (elem.value = value))
    },
    change(func) {
      $.forEach((elem) => elem.addEventListener('change', func))
    },
    find(selector) {
      return JackKnife($[0].querySelectorAll(selector))
    },
    trigger(event) {
      $.forEach((elem) => elem.dispatchEvent(new Event(event)))
    },
    is(selector) {
      return $[0].matches(selector)
    },
    on(event, func) {
      $.forEach((elem) => elem.addEventListener(event, func))
    },
    off(event, func) {
      $.forEach((elem) => elem.removeEventListener(event, func))
    },
    css(name, value) {
      if (value === undefined) return $[0].style[name]
      $.forEach((elem) => (elem.style[name] = value))
    },
    parent() {
      return JackKnife($[0].parentNode)
    },
    children() {
      return JackKnife($[0].children)
    },
    next() {
      return JackKnife($[0].nextElementSibling)
    },
    prev() {
      return JackKnife($[0].previousElementSibling)
    },
    closest(selector) {
      return JackKnife($[0].closest(selector))
    },
    clone() {
      return JackKnife($[0].cloneNode(true))
    },
    html(html) {
      if (html === undefined) return $[0].innerHTML
      $.forEach((elem) => (elem.innerHTML = html))
    },
    addClass(className) {
      $.forEach((elem) => elem.classList.add(className))
    },
    removeClass(className) {
      $.forEach((elem) => elem.classList.remove(className))
    },
    toggleClass(className) {
      $.forEach((elem) => elem.classList.toggle(className))
    },
    hasClass(className) {
      return $[0].classList.contains(className)
    },
    click(func) {
      $.forEach((elem) => elem.addEventListener('click', func))
    },
    focus(func) {
      $.forEach((elem) => elem.addEventListener('focus', func))
    },
    blur(func) {
      $.forEach((elem) => elem.addEventListener('blur', func))
    },
    submit(func) {
      $.forEach((elem) => elem.addEventListener('submit', func))
    },
    keyup(func) {
      $.forEach((elem) => elem.addEventListener('keyup', func))
    },
    keydown(func) {
      $.forEach((elem) => elem.addEventListener('keydown', func))
    },
    keypress(func) {
      $.forEach((elem) => elem.addEventListener('keypress', func))
    },
    mouseover(func) {
      $.forEach((elem) => elem.addEventListener('mouseover', func))
    },
    mouseout(func) {
      $.forEach((elem) => elem.addEventListener('mouseout', func))
    },
    mouseenter(func) {
      $.forEach((elem) => elem.addEventListener('mouseenter', func))
    },
    mouseleave(func) {
      $.forEach((elem) => elem.addEventListener('mouseleave', func))
    },
    mousemove(func) {
      $.forEach((elem) => elem.addEventListener('mousemove', func))
    },
    mousedown(func) {
      $.forEach((elem) => elem.addEventListener('mousedown', func))
    },
    mouseup(func) {
      $.forEach((elem) => elem.addEventListener('mouseup', func))
    },
  }
}

function jk_DEBUG(name) {
  return window.location.href.indexOf(`debug=${name}`) > -1
}

const jk_Utils = {
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
