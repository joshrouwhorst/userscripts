// ==UserScript==
// @name         Bible Gateway
// @namespace    https://joshr.work/
// @homepageURL  https://joshr.work/
// @version      1.0.16
// @author       Josh
// @match        *://*.biblegateway.com/passage/*
// @icon         https://biblegateway.com/favicon.ico
// @require      https://raw.githubusercontent.com/joshrouwhorst/userscripts/main/Utils.js
// ==/UserScript==

if (jk_DEBUG('bible.gateway')) debugger

const $ = JackKnife

try {
  const { Log, Obj, RemoveAds } = jk_Utils

  const LOOP_TIME = 500
  const AD_SELECTORS = [
    '.sys-announce-content',
    '.sys-announce',
    '.bg-popup-root',
    '.passage-bottom-ad',
    '.sponsor-ad',
    '.bottom-ad',
    '[aria-label="advertisement"]',
    '.top-wrapper',
    '.fs-sticky-footer',
    '.sidebar-tall-ad > div',
  ]

  $(() => {
    Log('Bible Gateway User Script Running...')
    $('.resources').hide()
    const mode = localStorage.getItem('mode')

    if (mode === 'Strip') stripText()
    else if (mode === 'Markup') addMarkup()
    else if (mode === 'Quote') convertToQuote()

    addHeader()
    RemoveAds(AD_SELECTORS)
    addTranslationSearch()
  })

  function stripText() {
    $('sup.footnote').each((item) => {
      $(item).remove()
    })

    $('sup.versenum').each((item) => {
      $(item).remove()
    })

    $('span.chapternum').each((item) => {
      $(item).remove()
    })
  }

  function convertToQuote() {
    $('sup.footnote').each((item) => {
      $(item).remove()
    })

    $('sup.versenum').each((item) => {
      $(item).remove()
    })

    $('span.chapternum').each((item) => {
      $(item).remove()
    })

    $('.passage-text p:not(.spacer)').after('<p class="spacer"></p>')
    $('.passage-text p').prepend('> ')
  }

  function addMarkup() {
    const now = new Date()
    $('.std-text').prepend(
      `<br /><div># ${$(
        '.quick-search'
      ).val()}</div><div>Added: ${now.toUTCString()}</div><div>Tags: [[Bible Chapter]] [[Bible]]</div><br /><div>[Web](${
        window.location.href
      })</div>`
    )

    $('sup.footnote').each((item) => {
      const text = $(item).text().trim()
      $(item).replaceWith('**^** ')
    })

    $('sup.versenum').each((item) => {
      const text = $(item).text().trim()
      $(item).replaceWith(`*${text}* `)
    })

    $('span.chapternum').each((item) => {
      const text = $(item).text().trim()
      $(item).replaceWith(`**${text}** `)
    })
  }

  function addHeader() {
    const drop = $(
      '<select style="background-color: yellow; padding: 5px; border: 2px solid black; font-weight: bold; color: black; filter: none;"><option>Regular</option><option>Strip</option><option>Quote</option><option>Markdown</option></select>'
    )

    drop.val(localStorage.getItem('mode') || 'Regular')

    drop.change(() => {
      localStorage.setItem('mode', drop.val())
      location.reload()
    })

    $('.passage-text').prepend(
      $(
        '<div><label style="font-weight: bold; padding-right: 5px;">Mode:</label></div>'
      ).append(drop)
    )
  }

  function addTranslationSearch() {
    const $transLink = $('.translation[role="button"]')
    const $search = $('#translation-search')
    // Check if the dropdown exists and has not been fixed
    if ($transLink.length > 0 && $search.length <= 0) {
      // Create the search text box
      const box = $(
        `<div><input type="text" id="translation-search" placeholder="Translation Search" style="width: 100%; padding: 5px; border: 2px solid black; background-color: yellow; font-weight: bold; color: black;" /></div>`
      )
      // Add text box
      $transLink.after(box)
    }

    // Check if the dropdown is showing
    if ($transLink.find('.r-dropdown').length > 0) {
      // Filter the dropdown
      const val = $('#translation-search').val().toLowerCase()
      if (val === '') $('.translation .r-dropdown ul li').show()
      else {
        $('.translation .r-dropdown ul li').each((item) => {
          const text = $(item).text().toLowerCase()
          if (text.includes(val)) {
            $(item).show()
          } else {
            $(item).hide()
          }
        })
      }
    }

    setTimeout(() => addTranslationSearch(), LOOP_TIME)
  }
} catch (err) {
  console.error('US | Error', err)
}
