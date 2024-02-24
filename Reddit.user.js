// ==UserScript==
// @name         Reddit
// @namespace    https://joshr.work/
// @homepageURL  https://joshr.work/
// @version      1.0.6
// @author       Josh
// @match        *://*.reddit.com/*
// @icon         https://www.redditstatic.com/shreddit/assets/favicon/192x192.png
// @require      https://raw.githubusercontent.com/joshrouwhorst/userscripts/main/Utils.js
// ==/UserScript==

const $ = JackKnife

const { RemoveAds } = Utils

const AD_SELECTORS = ['shreddit-ad-post', '.promotedlink']

$(() => {
  RemoveAds(AD_SELECTORS)
})
