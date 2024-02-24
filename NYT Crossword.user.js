// ==UserScript==
// @name         NYT Crossword
// @namespace    https://joshr.work/
// @homepageURL  https://joshr.work/
// @version      1.0.8
// @author       Josh
// @match        *://*.nytcrosswordanswers.org/*
// @icon         https://nytcrosswordanswers.org/wp-content/uploads/2023/05/cropped-nyt-logo-192x192.jpg
// @require      https://raw.githubusercontent.com/joshrouwhorst/userscripts/main/Utils.js
// ==/UserScript==

const $ = JackKnife

const { Log, OnLocationChange, RemoveAds } = Utils

$(() => {
  OnLocationChange(() => run())
})

function run() {
  Log('NYT Crossword User Script Running...')
  RemoveAds(['.adsbygoogle'])

  $('.entry-content').children(':not(.answ)').remove()
}
