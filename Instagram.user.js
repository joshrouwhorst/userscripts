// ==UserScript==
// @name         Instagram
// @namespace    https://joshr.work/
// @homepageURL  https://github.com/joshrouwhorst/userscripts/raw/main/Instagram.user.js
// @version 1.1.41
// @author       Josh
// @match        *://*.instagram.com/*
// @icon         https://logos-world.net/wp-content/uploads/2020/06/Instagram-Logo.png
// @require      https://raw.githubusercontent.com/joshrouwhorst/userscripts/main/_JackKnife.js
// @downloadURL  https://raw.githubusercontent.com/joshrouwhorst/userscripts/main/Instagram.user.js
// @grant        none
// ==/UserScript==

if (jk_DEBUG('instagram')) debugger

const { Log, OnLocationChange, Load, Select } = JackKnife

const LOOP_TIME = 500

Load(() => {
  OnLocationChange(() => run())
})

function run() {
  getRidOfAds()
}

function getRidOfAds() {
  Select('article:not([x-data-checked="true"])').forEach((article) => {
    const spans = article.querySelector('span')
    let isSponsored = false

    for (let i = 0; i < spans.length; i++) {
      const span = spans[i]
      if (span.innerText.toLowerCase().trim() === 'sponsored') {
        Log('Ad removed')
        article.remove()
        isSponsored = true
        break
      }
    }

    if (!isSponsored) article.setAttribute('x-data-checked', 'true')
  })

  setTimeout(() => getRidOfAds(), LOOP_TIME)
}
