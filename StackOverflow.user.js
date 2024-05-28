// ==UserScript==
// @name         StackOverflow
// @namespace    https://joshr.work/
// @homepageURL  https://joshr.work/
// @version 1.1.23
// @author       Josh
// @match        *://*.stackoverflow.com/*
// @require      https://raw.githubusercontent.com/joshrouwhorst/userscripts/main/_JackKnife.js
// @icon         https://cdn2.iconfinder.com/data/icons/social-icons-color/512/stackoverflow-1024.png
// @downloadURL  https://raw.githubusercontent.com/joshrouwhorst/userscripts/main/StackOverflow.user.js
// ==/UserScript==

if (jk_DEBUG('stack.overflow')) debugger

const LOOP_TIME = 500

const { RemoveAds, Load } = JackKnife

Load(() => {
  RemoveAds(['#mainbar iframe', '#sidebar iframe'])
})
