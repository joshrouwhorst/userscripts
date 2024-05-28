// ==UserScript==
// @name         Reddit
// @namespace    https://joshr.work/
// @homepageURL  https://joshr.work/
// @version      1.1.17
// @author       Josh
// @match        *://*.reddit.com/*
// @icon         https://www.redditstatic.com/shreddit/assets/favicon/192x192.png
// @require      https://raw.githubusercontent.com/joshrouwhorst/userscripts/main/_JackKnife.js
// @downloadURL  https://raw.githubusercontent.com/joshrouwhorst/userscripts/main/Reddit.user.js
// ==/UserScript==

if (jk_DEBUG('reddit')) debugger

const { RemoveAds, Load } = JackKnife

const AD_SELECTORS = ['shreddit-ad-post', '.promotedlink']

Load(() => {
  RemoveAds(AD_SELECTORS)
})
