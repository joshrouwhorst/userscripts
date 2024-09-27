// ==UserScript==
// @name         BibleHub
// @namespace    https://joshr.work/
// @homepageURL  https://github.com/joshrouwhorst/userscripts/raw/main/BibleHub.user.js
// @version 1.2.9
// @author       Josh
// @match        *://*.biblehub.com/*
// @icon         https://biblehub.com/favicon.ico
// @downloadURL  https://raw.githubusercontent.com/joshrouwhorst/userscripts/main/userscripts/BibleHub.user.js
// ==/UserScript==

if (jk_DEBUG('biblehub')) debugger

try {
  const { Log, RemoveAds, Remove, $, Load, Loop } = JackKnife

  const AD_SELECTORS = ['#amp_floatingAdDiv']
  let frameCount = 0

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
        if (f.src.indexOf(ALLOWED_IFRAMES[i]) > -1) {
          allowed = true
          break
        }
      }

      // If the iframe is internal like the freakin' entire header of the site is, then we're going to allow it.
      if (!isExternalUrl(f.src)) {
        allowed = true
      }

      if (!allowed) {
        Remove(f)
        Log(`${++frameCount} iframes removed - ${f.src}`)
      }
    })
  }

  function isExternalUrl(url) {
    try {
      const currentOrigin = window.location.origin
      const urlObj = new URL(url, currentOrigin) // Resolve relative URLs to absolute ones
      return urlObj.origin !== currentOrigin
    } catch (e) {
      console.error(`Invalid URL: ${url}`)
      return false
    }
  }
} catch (err) {
  console.error('US | Error', err)
}
