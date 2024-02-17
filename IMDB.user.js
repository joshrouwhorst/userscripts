// ==UserScript==
// @name         IMDB
// @namespace    https://joshr.work/
// @version      1.0.4
// @author       Josh Rouwhorst
// @match        *://*.imdb.com/*
// @icon         https://m.media-amazon.com/images/G/01/imdb/images-ANDW73HA/favicon_iPhone_retina_180x180._CB1582158069_.png
// @require      https://raw.githubusercontent.com/joshrouwhorst/userscripts/main/Utils.js
// @require      https://code.jquery.com/jquery-3.7.1.min.js
// @grant        none
// ==/UserScript==

const { Log, Obj, OnLocationChange, RemoveAds } = Utils
const LOOP_TIME = 500

$(() => {
  OnLocationChange(() => run())
})

function run() {
  Log('IMDB User Script Running...')
  RemoveAds([
    '[aria-label="Sponsored Content"]',
    '.nas-slot',
    '[data-testid="episodes-cards-container"]',
  ])
}
