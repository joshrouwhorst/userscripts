// ==UserScript==
// @name         IMDB
// @namespace    https://joshr.work/
// @version      1.0.45
// @author       Josh
// @match        *://*.imdb.com/*
// @icon         https://m.media-amazon.com/images/G/01/imdb/images-ANDW73HA/favicon_iPhone_retina_180x180._CB1582158069_.png
// @require      https://raw.githubusercontent.com/joshrouwhorst/userscripts/main/_JackKnife.js
// @grant        none
// ==/UserScript==

if (jk_DEBUG('imdb')) debugger

const { Log, Obj, OnLocationChange, RemoveAds, Load } = JackKnife
const LOOP_TIME = 500

Load(() => {
  OnLocationChange(() => run())
})

function run() {
  Log('IMDB User Script Running...')

  RemoveAds(['.ipc-promptable-dialog'])

  removeAds([
    '[aria-label="Sponsored Content"]',
    '.nas-slot',
    '[data-testid="episodes-cards-container"]',
  ])
}

function removeAds(selectors, loopTime) {
  if (!loopTime) loopTime = 500
  selectors.forEach((selector) => {
    if (typeof selector === 'function') selector()
    else {
      const elements = document.querySelectorAll(selector)
      elements.forEach((element) => {
        // Set element visibility to invisible
        element.style.visibility = 'hidden'
      })
    }
  })

  setTimeout(() => removeAds(selectors, loopTime), loopTime)
}
