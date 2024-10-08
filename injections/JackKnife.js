const THIS_IS_AN_IFRAME = (function () {
  try {
    // Check if the current window is not the top-level window
    return window.self !== window.top
  } catch (e) {
    // If access to `window.top` is denied due to cross-origin restrictions, it's in an iframe
    return true
  }
})()

function jk_DEBUG(name) {
  return window.location.href.indexOf(`debug=${name}`) > -1
}

function jk_StandardizeElems(elems) {
  if (elems instanceof NodeList) elems = Array.from(elems)
  else if (!Array.isArray(elems)) elems = [elems]
  return elems
}

class JackKnifeInstance {
  Log(text) {
    console.log(`%cUS | ${text}`, 'font-weight: bold;')
  }

  Err(text) {
    console.error(
      `%cUS | ${text}`,
      'font-weight: bold; background-color: red; color: white;'
    )
  }

  Loop(interval, func) {
    // Return false to stop the loop
    var keepGoing = func() || true // Default to true
    if (keepGoing) setTimeout(() => JackKnife.Loop(interval, func), interval)
  }

  Memory(key, value) {
    if (value) localStorage.setItem(key, value)
    return localStorage.getItem(key)
  }

  Obj(object) {
    console.log(object)
  }

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
  }

  GetAriaLabel(elem) {
    const label = elem.getAttribute('aria-label')
    if (label) return label

    const id = elem.getAttribute('aria-labelledby')
    if (id) return document.getElementById(id).textContent

    return null
  }

  HasParam(name) {
    return (
      window.location.search.indexOf(name) > -1 ||
      window.location.hash.indexOf(name) > -1
    )
  }

  OnLocationChange(func) {
    try {
      const observeUrlChange = () => {
        let oldHref = document.location.href
        const body = document.querySelector('body')
        const observer = new MutationObserver((mutations) => {
          if (oldHref !== document.location.href) {
            JackKnife.Log(`Location Change: ${document.location.href}`)
            oldHref = document.location.href
            func(document.location.href)
          }
        })
        observer.observe(body, { childList: true, subtree: true })
      }

      window.onload = observeUrlChange
    } catch (err) {
      JackKnife.Err('Error observing location change')
      JackKnife.Obj(err)
    }

    func(document.location.href)
  }

  HandleAds(selectors, loopTime, each) {
    if (!loopTime) loopTime = 500
    selectors.forEach((selector) => {
      if (typeof selector === 'function') selector()
      else {
        const elements = document.querySelectorAll(selector)
        elements.forEach(each)
      }
    })

    setTimeout(() => JackKnife.RemoveAds(selectors, loopTime), loopTime)
  }

  RemoveAds(selectors, loopTime) {
    return JackKnife.HandleAds(selectors, loopTime, (element) => {
      element.remove()
    })
  }

  HideAds(selectors, loopTime) {
    return JackKnife.HandleAds(selectors, loopTime, (element) => {
      element.style.visibility = 'hidden'
    })
  }

  Censor(selectors) {
    selectors.forEach((selector) => {
      const elements = document.querySelectorAll(selector)

      elements.forEach((element) => {
        // Check if the element already has a black box (using a unique marker class)
        if (!element.querySelector('.black-box-overlay')) {
          // Create a black box div
          const blackBox = document.createElement('div')

          // Set the black box styles
          blackBox.style.position = 'absolute'
          blackBox.style.top = 0
          blackBox.style.left = 0
          blackBox.style.width = '100%'
          blackBox.style.height = '100%'
          blackBox.style.backgroundColor = 'black'
          blackBox.style.zIndex = 9999
          blackBox.style.pointerEvents = 'none' // Allow click-through

          // Add a unique marker class to track the black box
          blackBox.classList.add('black-box-overlay')

          // Make sure the parent element has position relative for overlay
          const computedStyle = window.getComputedStyle(element)
          if (computedStyle.position === 'static') {
            element.style.position = 'relative'
          }

          // Append the black box to the element
          element.appendChild(blackBox)
        }
      })
    })
  }

  MakeElement(html) {
    // Takes string of HTML and returns a DOM element
    const temp = document.createElement('div')
    temp.innerHTML = html
    return temp.firstChild
  }

  Text(elems, text) {
    elems = jk_StandardizeElems(elems)
    if (!text) {
      text = ''
      return elems[0].textContent
    } else {
      elems.forEach((elem) => {
        elem.textContent = text
      })
    }
  }

  Hide(elems) {
    elems = jk_StandardizeElems(elems)
    elems.forEach((elem) => {
      elem.style.display = 'none'
    })
  }

  Show(elems) {
    elems = jk_StandardizeElems(elems)
    elems.forEach((elem) => {
      elem.style.display = ''
    })
  }

  Remove(elems) {
    elems = jk_StandardizeElems(elems)
    elems.forEach((elem) => {
      elem.remove()
    })
  }

  Replace(oldElem, newElem) {
    oldElem.parentNode.replaceChild(newElem, oldElem)
  }

  Before(reference, newItem) {
    reference = jk_StandardizeElems(reference)
    reference.forEach((ref) => {
      ref.parentNode.insertBefore(newItem, ref)
    })
  }

  After(reference, newItem) {
    reference = jk_StandardizeElems(reference)
    reference.forEach((ref) => {
      if (ref.nextSibling) ref.parentNode.insertBefore(newItem, ref.nextSibling)
      else ref.parentNode.appendChild(newItem)
    })
  }

  On(elem, event, func) {
    elem.addEventListener(event, func)
  }

  Trigger(elems, event) {
    elems = jk_StandardizeElems(elems)
    elems.forEach((elem) => {
      elem.dispatchEvent(new Event(event))
    })
  }

  Is(elems, selector) {
    elems = jk_StandardizeElems(elems)
    return elems.every((elem) => elem.matches(selector))
  }

  CSS(elems, styles) {
    elems = jk_StandardizeElems(elems)
    elems.forEach((elem) => {
      for (const prop in styles) {
        elem.style[prop] = styles[prop]
      }
    })
  }

  Load(func, includeIframes) {
    if (!includeIframes && THIS_IS_AN_IFRAME) return // Block iframes by default
    if (document.readyState !== 'loading') return func()
    document.addEventListener('DOMContentLoaded', func)
  }

  Select(selector, parent) {
    if (parent) {
      return parent.querySelectorAll(selector) || []
    } else {
      return document.querySelectorAll(selector) || []
    }
  }

  $(selector, parent) {
    if (parent) {
      return parent.querySelectorAll(selector) || []
    } else {
      return document.querySelectorAll(selector) || []
    }
  }
}

// Effectively make JackKnife a singleton
const JackKnife = new JackKnifeInstance()
