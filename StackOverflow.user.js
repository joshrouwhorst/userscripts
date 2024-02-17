// ==UserScript==
// @name         StackOverflow
// @namespace    https://joshr.work/
// @homepageURL  https://joshr.work/
// @version      1.0.4
// @author       Josh
// @match        *://*.stackoverflow.com/*
// @require      https://raw.githubusercontent.com/joshrouwhorst/userscripts/main/Utils.js
// @require      https://code.jquery.com/jquery-3.7.1.min.js
// ==/UserScript==

const LOOP_TIME = 500

const { RemoveAds } = Utils

$(() => {
  RemoveAds(['#mainbar iframe', '#sidebar iframe'])
})
