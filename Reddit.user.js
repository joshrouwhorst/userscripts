// ==UserScript==
// @name         Reddit
// @namespace    https://joshr.work/
// @homepageURL  https://joshr.work/
// @version      1.0.0
// @author       Josh
// @match        *://*.reddit.com/*
// @icon         https://www.redditstatic.com/shreddit/assets/favicon/192x192.png
// @require      https://gist.githubusercontent.com/joshrouwhorst/fb11833b2cdbb4460f9ea3ae0a1b6d06/raw/216858100c067c0675cfe7851fbba3dbfbffdea7/utils.js
// @require      https://code.jquery.com/jquery-3.7.1.min.js
// ==/UserScript==

//debugger

const LOOP_TIME = 500
const AD_SELECTORS = ['shreddit-ad-post', '.promotedlink']

$(() => {
  hideAds()
})

function hideAds() {
  AD_SELECTORS.forEach((selector) => {
    $(selector).hide()
  })
  setTimeout(() => hideAds(), LOOP_TIME)
}
