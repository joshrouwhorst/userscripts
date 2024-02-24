function JackKnife(selector) {
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
  } else if (selector instanceof Object && selector._meta?.isJackKnife) {
    return selector
  } else if (typeof selector === 'function') {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', selector)
    } else {
      selector()
    }
  }

  if ($ === undefined) $ = []

  function getHtmlNode(html) {
    if (html instanceof HTMLElement) return html
    if (html instanceof Object && html._meta?.isJackKnife) return html.get(0)
    if (typeof html !== 'string' || html.indexOf('<') !== 0) return null
    const temp = document.createElement('div')
    temp.innerHTML = html
    return temp.firstChild
  }

  function cloneElement(element) {
    const clone = element.cloneNode(true)

    return clone
  }

  return {
    length: $.length,
    _meta: {
      isJackKnife: true,
      selections: $,
    },
    first() {
      return $.length > 0 ? JackKnife($[0]) : JackKnife()
    },
    last() {
      return $.length > 0 ? JackKnife($[$.length - 1]) : JackKnife()
    },
    nth(index) {
      return $.length > 0 ? JackKnife($[index]) : JackKnife()
    },
    get(index) {
      if (index === undefined) return $.length > 0 ? $[0] : null
      return $[index]
    },
    remove() {
      $.forEach((elem) => elem.remove())
      return this
    },
    attr(name, value) {
      if (value === undefined)
        return $.length > 0 ? $[0].getAttribute(name) : ''
      $.forEach((elem) => elem.setAttribute(name, value))
      return this
    },
    text(value) {
      if (value === undefined) return $.length > 0 ? $[0].innerText : ''
      $.forEach((elem) => (elem.innerText = value))
      return this
    },
    hide() {
      $.forEach((elem) => (elem.style.display = 'none'))
      return this
    },
    show() {
      $.forEach((elem) => (elem.style.display = 'block'))
      return this
    },
    each(func) {
      $.forEach(func)
      return this
    },
    after(html) {
      html = getHtmlNode(html)
      if (!html) return this

      $.forEach((elem) => {
        elem.insertAdjacentElement('afterend', html)
      })

      return this
    },
    before(html) {
      html = getHtmlNode(html)
      if (!html) return this

      $.forEach((elem) => {
        elem.insertAdjacentElement('beforebegin', html)
      })

      return this
    },
    append(html) {
      html = getHtmlNode(html)
      if (!html) return this

      $.forEach((elem) => elem.append(html))
      return this
    },
    prepend(html) {
      html = getHtmlNode(html)
      if (!html) return this

      $.forEach((elem) => elem.prepend(html))
      return this
    },
    replaceWith(html) {
      html = getHtmlNode(html)
      if (!html) return this

      $.forEach((elem) => elem.replaceWith(html))
      return this
    },
    replace(html) {
      html = getHtmlNode(html)
      if (!html) return this

      $.forEach((elem) => {
        html.replaceWith(html)
      })

      return this
    },
    appendTo(html) {
      html = getHtmlNode(html)
      if (!html) return this

      const jk = JackKnife(html).append($[0])

      return jk
    },
    prependTo(html) {
      html = getHtmlNode(html)
      if (!html) return this

      const jk = JackKnife(html).prepend($[0])

      return jk
    },
    insertAfter(html) {
      html = getHtmlNode(html)
      if (!html) return this

      const jk = JackKnife(html).after($[0])
      return jk
    },
    insertBefore(html) {
      html = getHtmlNode(html)
      if (!html) return this

      const jk = JackKnife(html).before($[0])
      return jk
    },
    val(value) {
      if (value === undefined) return $.length > 0 ? $[0].value : ''
      $.forEach((elem) => (elem.value = value))
      return this
    },
    change(func) {
      $.forEach((elem) => elem.addEventListener('change', func))
      return this
    },
    find(selector) {
      return $.length > 0
        ? JackKnife($[0].querySelectorAll(selector))
        : JackKnife()
    },
    trigger(event) {
      $.forEach((elem) => elem.dispatchEvent(new Event(event)))
      return this
    },
    is(selector) {
      return $.length > 0 ? $[0].matches(selector) : false
    },
    on(event, func) {
      $.forEach((elem) => elem.addEventListener(event, func))
      return this
    },
    off(event, func) {
      $.forEach((elem) => elem.removeEventListener(event, func))
      return this
    },
    css(name, value) {
      if (value === undefined) return $.length > 0 ? $[0].style[name] : ''
      $.forEach((elem) => (elem.style[name] = value))
      return this
    },
    parent() {
      return $.length > 0 ? JackKnife($[0].parentNode) : JackKnife()
    },
    children() {
      return $.length > 0 ? JackKnife($[0].children) : JackKnife()
    },
    next() {
      return $.length > 0 ? JackKnife($[0].nextElementSibling) : JackKnife()
    },
    prev() {
      return $.length > 0 ? JackKnife($[0].previousElementSibling) : JackKnife()
    },
    closest(selector) {
      return $.length > 0 ? JackKnife($[0].closest(selector)) : JackKnife()
    },
    clone() {
      return $.length > 0 ? JackKnife(cloneElement($[0])) : JackKnife()
    },
    html(html) {
      if (html === undefined) return $.length > 0 ? $[0].innerHTML : ''
      $.forEach((elem) => (elem.innerHTML = html))
      return this
    },
    outerHtml(html) {
      if (html === undefined) return $.length > 0 ? $[0].outerHTML : ''
      $.forEach((elem) => (elem.outerHTML = html))
      return this
    },
    addClass(className) {
      $.forEach((elem) => elem.classList.add(className))
      return this
    },
    removeClass(className) {
      $.forEach((elem) => elem.classList.remove(className))
      return this
    },
    toggleClass(className) {
      $.forEach((elem) => elem.classList.toggle(className))
      return this
    },
    hasClass(className) {
      return $.length > 0 ? $[0].classList.contains(className) : false
    },
    click(func) {
      return this.on('click', func)
    },
    focus(func) {
      return this.on('focus', func)
    },
    blur(func) {
      return this.on('blur', func)
    },
    submit(func) {
      return this.on('submit', func)
    },
    keyup(func) {
      return this.on('keyup', func)
    },
    keydown(func) {
      return this.on('keydown', func)
    },
    keypress(func) {
      return this.on('keypress', func)
    },
    mouseover(func) {
      return this.on('mouseover', func)
    },
    mouseout(func) {
      return this.on('mouseout', func)
    },
    mouseenter(func) {
      return this.on('mouseenter', func)
    },
    mouseleave(func) {
      return this.on('mouseleave', func)
    },
    mousemove(func) {
      return this.on('mousemove', func)
    },
    mousedown(func) {
      return this.on('mousedown', func)
    },
    mouseup(func) {
      return this.on('mouseup', func)
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
    const $ = JackKnife
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
            jk_Utils.Log(`Location Change: ${document.location.href}`)
            oldHref = document.location.href
            func(document.location.href)
          }
        })
        observer.observe(body, { childList: true, subtree: true })
      }

      window.onload = observeUrlChange
    } catch (err) {
      jk_Utils.Err('Error observing location change')
      jk_Utils.Obj(err)
    }

    func(document.location.href)
  },
  RemoveAds(selectors, loopTime) {
    const $ = JackKnife
    if (!loopTime) loopTime = 500
    selectors.forEach((selector) => {
      if (typeof selector === 'function') selector()
      else if ($(selector).length > 0) $(selector).remove()
    })

    setTimeout(() => jk_Utils.RemoveAds(selectors, loopTime), loopTime)
  },
}
