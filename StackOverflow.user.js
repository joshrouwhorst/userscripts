// ==UserScript==
// @name         StackOverflow
// @namespace    https://joshr.work/
// @homepageURL  https://joshr.work/
// @version      1.0.0
// @author       Josh
// @match        *://*.stackoverflow.com/*
// @require      https://gist.githubusercontent.com/joshrouwhorst/fb11833b2cdbb4460f9ea3ae0a1b6d06/raw/utils.js
// @require      https://code.jquery.com/jquery-3.7.1.min.js
// ==/UserScript==

//debugger

const LOOP_TIME = 500

const { RemoveAds } = Utils

$(() => {
  RemoveAds(['#mainbar iframe', '#sidebar iframe'])
})
