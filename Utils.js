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
  MakeElement(html) {
    // Takes string of HTML and returns a DOM element
    const temp = document.createElement('div')
    temp.innerHTML = html
    return temp.firstChild
  },
  Hide(elems) {
    if (!Array.isArray(elems)) elems = [elems]
    elems.forEach((elem) => {
      elem.style.display = 'none'
    })
  },
  Show(elems) {
    if (!Array.isArray(elems)) elems = [elems]
    elems.forEach((elem) => {
      elem.style.display = ''
    })
  },
  Remove(elems) {
    if (!Array.isArray(elems)) elems = [elems]
    elems.forEach((elem) => {
      elem.remove()
    })
  },
  Replace(oldElem, newElem) {
    oldElem.parentNode.replaceChild(newElem, oldElem)
  },
  On(elem, event, func) {
    elem.addEventListener(event, func)
  },
  Trigger(elems, event) {
    if (!Array.isArray(elems)) elems = [elems]
    elems.forEach((elem) => {
      elem.dispatchEvent(new Event(event))
    })
  },
  Is(elems, selector) {
    if (!Array.isArray(elems)) elems = [elems]
    return elems.all((elem) => elem.matches(selector))
  },
  CSS(elems, styles) {
    if (!Array.isArray(elems)) elems = [elems]
    elems.forEach((elem) => {
      for (const prop in styles) {
        elem.style[prop] = styles[prop]
      }
    })
  },
  Load(func) {
    if (document.readyState === 'complete') return func()
    document.addEventListener('DOMContentLoaded', func)
  },
  $(selector) {
    return document.querySelectorAll(selector) || []
  },
}
