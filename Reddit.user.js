// ==UserScript==
// @name         Reddit
// @namespace    https://joshr.work/
// @homepageURL  https://github.com/joshrouwhorst/userscripts/raw/main/Reddit.user.js
// @version 1.2.9
// @author       Josh
// @match        *://*.reddit.com/*
// @icon         https://www.redditstatic.com/shreddit/assets/favicon/192x192.png
// @downloadURL  https://raw.githubusercontent.com/joshrouwhorst/userscripts/main/userscripts/Reddit.user.js
// ==/UserScript==

if (jk_DEBUG('reddit')) debugger

const { RemoveAds, Load } = JackKnife

const AD_SELECTORS = ['shreddit-ad-post', '.promotedlink']

Load(() => {
  RemoveAds(AD_SELECTORS)
})
