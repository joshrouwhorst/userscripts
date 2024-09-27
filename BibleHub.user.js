// ==UserScript==
// @name         BibleHub
// @namespace    https://joshr.work/
// @homepageURL  https://github.com/joshrouwhorst/userscripts/raw/main/BibleHub.user.js
// @version 1.1.47
// @author       Josh
// @match        *://*.biblehub.com/*
// @icon         https://biblehub.com/favicon.ico
// @require      https://raw.githubusercontent.com/joshrouwhorst/userscripts/main/_JackKnife.js
// @require      https://raw.githubusercontent.com/joshrouwhorst/userscripts/main/_JackKnifeBar.js
// @downloadURL  https://raw.githubusercontent.com/joshrouwhorst/userscripts/main/BibleHub.user.js
// ==/UserScript==

if (jk_DEBUG('biblehub')) debugger

try {
  const { Log, RemoveAds, Remove, $, Load, Loop } = JackKnife

  const AD_SELECTORS = []

  // Checks the src attribute of the iframe to see if it contains a string from the ALLOWED_IFRAMES array
  const ALLOWED_IFRAMES = ['google.com/recaptcha']

  Load(() => {
    Log('BibleHub User Script Running...')
    Loop(1000, () => removeIframes())
    RemoveAds(AD_SELECTORS)
  })

  // Delete all iframes that are not allowed
  function removeIframes() {
    $('iframe').forEach((f) => {
      var allowed = false

      for (var i = 0; i < ALLOWED_IFRAMES.length; i++) {
        if (f.src.indexOf(ALLOWED_IFRAMES[i])) {
          allowed = true
          break
        }
      }

      if (!allowed) Remove(f)
    })
  }
} catch (err) {
  console.error('US | Error', err)
}
