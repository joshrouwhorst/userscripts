// ==UserScript==
// @name         Wikipedia
// @namespace    https://joshr.work/
// @homepageURL  https://joshr.work/
// @version      1.0.15
// @author       Josh
// @match        *://*.wikipedia.org/*
// @icon         https://www.wikipedia.org/static/favicon/wikipedia.ico
// @require      https://raw.githubusercontent.com/joshrouwhorst/userscripts/main/Utils.js
// ==/UserScript==

if (jk_DEBUG('wikipedia')) debugger

const $ = JackKnife

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

  $('#bodyContent a').each((item) => {
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

    $('#bodyContent a').each((item) => {
      const $item = $(item)
      $item.replaceWith(`<span>${$item.html()}</span>`)
    })
  }
}
