// ==UserScript==
// @name         NYT Crossword
// @namespace    https://joshr.work/
// @homepageURL  https://github.com/joshrouwhorst/userscripts/raw/main/NYT%20Crossword.user.js
// @version 1.2.9
// @author       Josh
// @match        *://*.nytcrosswordanswers.org/*
// @icon         https://nytcrosswordanswers.org/wp-content/uploads/2023/05/cropped-nyt-logo-192x192.jpg
// @downloadURL  https://raw.githubusercontent.com/joshrouwhorst/userscripts/main/userscripts/NYT%20Crossword.user.js
// ==/UserScript==

if (jk_DEBUG('nyt.crossword')) debugger

const { Log, OnLocationChange, RemoveAds, Load } = JackKnife

Load(() => {
  OnLocationChange(() => run())
})

function run() {
  Log('NYT Crossword User Script Running...')
  RemoveAds(['.adsbygoogle'])

  const elements = document.querySelectorAll('.entry-content > :not(.answ)')
  elements.forEach((element) => element.remove())
}
