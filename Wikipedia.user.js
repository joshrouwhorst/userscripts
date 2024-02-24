// ==UserScript==
// @name         Wikipedia
// @namespace    https://joshr.work/
// @homepageURL  https://joshr.work/
// @version      1.0.34
// @author       Josh
// @match        *://*.wikipedia.org/*
// @icon         https://www.wikipedia.org/static/favicon/wikipedia.ico
// @require      https://raw.githubusercontent.com/joshrouwhorst/userscripts/main/Utils.js
// ==/UserScript==

if (jk_DEBUG('wikipedia')) debugger

const { Load, On, Remove, Replace, MakeElement } = jk_Utils

Load(() => {
  let mode = localStorage.getItem('mode')
  const btnStyle =
    'display: inline-block; padding: 5px; border: none; background-color: transparent; color: blue; text-decoration: underline; cursor: pointer;'

  if (mode == 'strip') {
    strip()
  } else {
    $(`<button style='${btnStyle}'>Strip</button>`).forEach((item) => {
      On(item, 'click', () => {
        localStorage.setItem('mode', 'strip')
        location.reload()
      })

      item.insertBefore($('#bodyContent')[0])
    })
  }
})

function strip() {
  $(`<button style='${btnStyle}'>Original</button>`).forEach((item) => {
    On(item, 'click', () => {
      localStorage.setItem('mode', 'default')
      location.reload()
    })

    item.insertBefore($('#bodyContent')[0])
  })

  Remove($('#bodyContent sup'))

  $('#bodyContent a').forEach((item) => {
    const $item = $(item)
    $item.replaceWith(`<span>${$item.html()}</span>`)

    Replace(item, MakeElement(`<span>${$item.html()}</span>`))
  })

  $('#right-navigation .vector-menu-content-list').forEach((item) => {
    item.prepend(
      MakeElement(
        `<li class="mw-list-item collapsible"><a href="${normalUrl}"><span>Normal</span></a></li>`
      )
    )
  })

  $('#right-navigation .vector-menu-content-list').forEach((item) => {
    item.prepend(
      MakeElement(
        `<li class="mw-list-item collapsible"><a href="${stripUrl}"><span>Strip</span></a></li>`
      )
    )
  })

  if (HasParam('osh.strip')) {
    Remove($('#bodyContent sup'))

    $('#bodyContent a').forEach((item) => {
      Replace(item, MakeElement(`<span>${item.innerHTML}</span>`))
    })
  }
}
