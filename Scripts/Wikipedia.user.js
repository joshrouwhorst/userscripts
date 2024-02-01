// ==UserScript==
// @name         Wikipedia
// @namespace    https://joshr.work/
// @homepageURL  https://joshr.work/
// @version      1.0.0
// @author       Josh
// @match        *://*.wikipedia.org/*
// @icon         https://www.wikipedia.org/static/favicon/wikipedia.ico
// @require      https://gist.githubusercontent.com/joshrouwhorst/fb11833b2cdbb4460f9ea3ae0a1b6d06/raw/utils.js
// @require      https://code.jquery.com/jquery-3.7.1.min.js
// ==/UserScript==

//debugger

let mode = localStorage.getItem('mode')
const btnStyle =
  'display: inline-block; padding: 5px; border: none; background-color: transparent; color: blue; text-decoration: underline; cursor: pointer;'

if (mode == 'strip') {
  strip()
} else {
  $(`<button style='${btnStyle}'>Strip</button>`)
    .click(() => {
      localStorage.setItem('mode', 'strip')
      location.reload()
    })
    .insertBefore('#bodyContent')
}

function strip() {
  $(`<button style='${btnStyle}'>Original</button>`)
    .click(() => {
      localStorage.setItem('mode', 'default')
      location.reload()
    })
    .insertBefore('#bodyContent')

  $('#bodyContent sup').remove()

  $('#bodyContent a').each((idx, item) => {
    const $item = $(item)
    $item.replaceWith(`<span>${$item.html()}</span>`)
  })

  $('#right-navigation .vector-menu-content-list').prepend(
    `<li class="mw-list-item collapsible"><a href="${normalUrl}"><span>Normal</span></a></li>`
  )
  $('#right-navigation .vector-menu-content-list').prepend(
    `<li class="mw-list-item collapsible"><a href="${stripUrl}"><span>Strip</span></a></li>`
  )

  if (HasParam('osh.strip')) {
    $('#bodyContent sup').remove()

    $('#bodyContent a').each((idx, item) => {
      const $item = $(item)
      $item.replaceWith(`<span>${$item.html()}</span>`)
    })
  }
}
