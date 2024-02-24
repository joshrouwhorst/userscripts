// ==UserScript==
// @name         IMDB
// @namespace    https://joshr.work/
// @version      1.0.18
// @author       Josh
// @match        *://*.imdb.com/*
// @icon         https://m.media-amazon.com/images/G/01/imdb/images-ANDW73HA/favicon_iPhone_retina_180x180._CB1582158069_.png
// @require      https://raw.githubusercontent.com/joshrouwhorst/userscripts/main/Utils.js
// @grant        none
// ==/UserScript==

if (jk_DEBUG('imdb')) debugger

const $ = JackKnife

const { Log, Obj, OnLocationChange, RemoveAds } = jk_Utils
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
