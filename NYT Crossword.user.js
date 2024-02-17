// ==UserScript==
// @name         NYT Crossword
// @namespace    https://joshr.work/
// @homepageURL  https://joshr.work/
// @version      1.0.4
// @author       Josh
// @match        *://*.nytcrosswordanswers.org/*
// @icon         https://www.youtube.com/s/desktop/54055272/img/favicon.ico
// @require      https://raw.githubusercontent.com/joshrouwhorst/userscripts/main/Utils.js
// @require      https://code.jquery.com/jquery-3.7.1.min.js
// ==/UserScript==

const { Log, OnLocationChange, RemoveAds } = Utils

$(() => {
  OnLocationChange(() => run())
})

function run() {
  Log('NYT Crossword User Script Running...')
  RemoveAds(['.adsbygoogle'])

  $('.entry-content').remove(':not(.answ)')
}
