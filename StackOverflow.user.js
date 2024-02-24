// ==UserScript==
// @name         StackOverflow
// @namespace    https://joshr.work/
// @homepageURL  https://joshr.work/
// @version      1.0.39
// @author       Josh
// @match        *://*.stackoverflow.com/*
// @require      https://raw.githubusercontent.com/joshrouwhorst/userscripts/main/Utils.js
// @icon         https://cdn2.iconfinder.com/data/icons/social-icons-color/512/stackoverflow-1024.png
// ==/UserScript==

if (jk_DEBUG('stack.overflow')) debugger

const LOOP_TIME = 500

const { RemoveAds, Load } = jk_Utils

Load(() => {
  RemoveAds(['#mainbar iframe', '#sidebar iframe'])
})
