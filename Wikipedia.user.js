// ==UserScript==
// @name         Wikipedia
// @namespace    https://joshr.work/
// @homepageURL  https://github.com/joshrouwhorst/userscripts/raw/main/Wikipedia.user.js
// @version 1.2.9
// @author       Josh
// @match        *://*.wikipedia.org/*
// @icon         https://www.wikipedia.org/static/favicon/wikipedia.ico
// @downloadURL  https://raw.githubusercontent.com/joshrouwhorst/userscripts/main/userscripts/Wikipedia.user.js
// ==/UserScript==

if (jk_DEBUG('wikipedia')) debugger

const { Load, On, Remove, Replace, MakeElement, Select } = JackKnife
const { AddButton } = JackKnifeBar

Load(() => {
  let mode = localStorage.getItem('mode')

  if (mode == 'strip') {
    strip()
    AddButton('View Regular', () => {
      localStorage.setItem('mode', 'regular')
      location.reload()
    })
  } else {
    AddButton('Strip Text', () => {
      localStorage.setItem('mode', 'strip')
      location.reload()
    })
  }
})

function strip() {
  Remove(Select('#bodyContent sup'))

  Select('#bodyContent a').forEach((item) => {
    Replace(item, MakeElement(`<span>${item.textContent}</span>`))
  })
}
