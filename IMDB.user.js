// ==UserScript==
// @name         IMDB
// @namespace    https://joshr.work/
// @version      1.0.0
// @author       Josh Rouwhorst
// @match        *://*.imdb.com/*
// @require      https://gist.githubusercontent.com/joshrouwhorst/fb11833b2cdbb4460f9ea3ae0a1b6d06/raw/utils.js
// @require      https://code.jquery.com/jquery-3.7.1.min.js
// @grant        none
// ==/UserScript==

const { Log, Obj, OnLocationChange, RemoveAds } = Utils
const LOOP_TIME = 500

$(() => {
  Log('IMDB User Script Running...')
  run()
  OnLocationChange(() => run())
})

function run() {
  RemoveAds(['[aria-label="Sponsored Content"]'])
}
