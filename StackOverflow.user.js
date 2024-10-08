// ==UserScript==
// @name         StackOverflow
// @namespace    https://joshr.work/
// @homepageURL  https://github.com/joshrouwhorst/userscripts/raw/main/StackOverflow.user.js
// @version 1.2.9
// @author       Josh
// @match        *://*.stackoverflow.com/*
// @icon         https://cdn2.iconfinder.com/data/icons/social-icons-color/512/stackoverflow-1024.png
// @downloadURL  https://raw.githubusercontent.com/joshrouwhorst/userscripts/main/userscripts/StackOverflow.user.js
// ==/UserScript==

if (jk_DEBUG('stack.overflow')) debugger

const LOOP_TIME = 500

const { RemoveAds, Load } = JackKnife

Load(() => {
  RemoveAds(['#mainbar iframe', '#sidebar iframe'])
})
