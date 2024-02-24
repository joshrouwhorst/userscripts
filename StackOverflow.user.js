// ==UserScript==
// @name         StackOverflow
// @namespace    https://joshr.work/
// @homepageURL  https://joshr.work/
// @version      1.0.13
// @author       Josh
// @match        *://*.stackoverflow.com/*
// @require      https://raw.githubusercontent.com/joshrouwhorst/userscripts/main/Utils.js
// ==/UserScript==

if (jk_DEBUG('stack.overflow')) debugger

const $ = JackKnife

const LOOP_TIME = 500

const { RemoveAds } = Utils

$(() => {
  RemoveAds(['#mainbar iframe', '#sidebar iframe'])
})
