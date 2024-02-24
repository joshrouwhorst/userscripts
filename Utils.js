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
    if (typeof html !== 'string' || html.indexOf('<') !== 0) return null
    const temp = document.createElement('div')
    temp.innerHTML = html
    return temp.firstChild
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
    },
    attr(name, value) {
      if (value === undefined)
        return $.length > 0 ? $[0].getAttribute(name) : ''
      $.forEach((elem) => elem.setAttribute(name, value))
    },
    text(value) {
      if (value === undefined) return $.length > 0 ? $[0].innerText : ''
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
      html = getHtmlNode(html)
      if (!html) return this

      $.forEach((elem) => {
        elem.insertAdjacentElement('afterend', html.cloneNode(true))
      })

      return this
    },
    before(html) {
      html = getHtmlNode(html)
      if (!html) return this

      $.forEach((elem) => {
        elem.insertAdjacentElement('beforebegin', html.cloneNode(true))
      })

      return this
    },
    append(html) {
      html = getHtmlNode(html)
      if (!html) return this

      $.forEach((elem) => elem.appendChild(html.cloneNode(true)))
      return this
    },
    prepend(html) {
      html = getHtmlNode(html)
      if (!html) return this

      $.forEach((elem) => elem.prepend(html.cloneNode(true)))
      return this
    },
    replaceWith(html) {
      html = getHtmlNode(html)
      if (!html) return this

      $.forEach((elem) => elem.replaceWith(html.cloneNode(true)))
      return this
    },
    replace(html) {
      html = getHtmlNode(html)
      if (!html) return this

      $.forEach((elem) => {
        html.replaceWith(elem.cloneNode(true))
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
    insertBefore(selector) {
      html = getHtmlNode(html)
      if (!html) return this

      const jk = JackKnife(html).before($[0])
      return jk
    },
    val(value) {
      if (value === undefined) return $.length > 0 ? $[0].value : ''
      $.forEach((elem) => (elem.value = value))
    },
    change(func) {
      $.forEach((elem) => elem.addEventListener('change', func))
    },
    find(selector) {
      return $.length > 0
        ? JackKnife($[0].querySelectorAll(selector))
        : JackKnife()
    },
    trigger(event) {
      $.forEach((elem) => elem.dispatchEvent(new Event(event)))
    },
    is(selector) {
      return $.length > 0 ? $[0].matches(selector) : false
    },
    on(event, func) {
      $.forEach((elem) => elem.addEventListener(event, func))
    },
    off(event, func) {
      $.forEach((elem) => elem.removeEventListener(event, func))
    },
    css(name, value) {
      if (value === undefined) return $.length > 0 ? $[0].style[name] : ''
      $.forEach((elem) => (elem.style[name] = value))
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
      return $.length > 0 ? JackKnife($[0].cloneNode(true)) : JackKnife()
    },
    html(html) {
      if (html === undefined) return $.length > 0 ? $[0].innerHTML : ''
      $.forEach((elem) => (elem.innerHTML = html))
    },
    outerHtml(html) {
      if (html === undefined) return $.length > 0 ? $[0].outerHTML : ''
      $.forEach((elem) => (elem.outerHTML = html))
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
      return $.length > 0 ? $[0].classList.contains(className) : false
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
