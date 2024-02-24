// ==UserScript==
// @name         Bible Gateway
// @namespace    https://joshr.work/
// @homepageURL  https://joshr.work/
// @version      1.0.39
// @author       Josh
// @match        *://*.biblegateway.com/passage/*
// @icon         https://biblegateway.com/favicon.ico
// @require      https://raw.githubusercontent.com/joshrouwhorst/userscripts/main/Utils.js
// ==/UserScript==

if (jk_DEBUG('bible.gateway')) debugger

try {
  const { Log, RemoveAds, Hide, Remove, $, MakeElement, On, Load } = jk_Utils

  const LOOP_TIME = 500
  const AD_SELECTORS = [
    '.sys-announce-content',
    '.sys-announce',
    //'.bg-popup-root',
    '.passage-bottom-ad',
    '.sponsor-ad',
    '.bottom-ad',
    '[aria-label="advertisement"]',
    '.top-wrapper',
    '.fs-sticky-footer',
    '.sidebar-tall-ad > div',
  ]

  Load(() => {
    Log('Bible Gateway User Script Running...')

    Hide($('.resources'))

    const mode = localStorage.getItem('mode')

    if (mode === 'Strip') stripText()
    else if (mode === 'Markup') addMarkup()
    else if (mode === 'Quote') convertToQuote()

    addHeader()
    RemoveAds(AD_SELECTORS)
    //addTranslationSearch()
  })

  function stripText() {
    Remove($('sup.footnote'))

    Remove($('sup.versenum'))

    Remove($('span.chapternum'))
  }

  function convertToQuote() {
    Remove($('sup.footnote'))

    Remove($('sup.versenum'))

    Remove($('span.chapternum'))

    $('.passage-text p:not(.spacer)').forEach((paragraph) => {
      const spacer = document.createElement('p')
      paragraph.after(spacer)
      paragraph.prepend('> ')
    })
  }

  function addMarkup() {
    const now = new Date()
    const quickSearchValue = $('.quick-search')[0]?.value
    const stdText = $('.std-text')[0]

    const div1 = document.createElement('div')
    div1.innerHTML = `# ${quickSearchValue}`
    stdText.insertBefore(div1, stdText.firstChild)

    const div2 = document.createElement('div')
    div2.innerHTML = `Added: ${now.toUTCString()}`
    stdText.insertBefore(div2, stdText.firstChild)

    const div3 = document.createElement('div')
    div3.innerHTML = 'Tags: [[Bible Chapter]] [[Bible]]'
    stdText.insertBefore(div3, stdText.firstChild)

    const div4 = document.createElement('div')
    div4.innerHTML = `[Web](${window.location.href})`
    stdText.insertBefore(div4, stdText.firstChild)

    document.querySelectorAll('sup.footnote').forEach((item) => {
      const text = item.textContent.trim()
      item.outerHTML = '**^** '
    })

    document.querySelectorAll('sup.versenum').forEach((item) => {
      const text = item.textContent.trim()
      item.outerHTML = `*${text}* `
    })

    document.querySelectorAll('span.chapternum').forEach((item) => {
      const text = item.textContent.trim()
      item.outerHTML = `**${text}** `
    })
  }

  function addHeader() {
    const drop = MakeElement(
      '<select style="background-color: yellow; padding: 5px; border: 2px solid black; font-weight: bold; color: black; filter: none;"><option>Regular</option><option>Strip</option><option>Quote</option><option>Markdown</option></select>'
    )

    drop.value = localStorage.getItem('mode') || 'Regular'

    On(drop, 'change', () => {
      localStorage.setItem('mode', drop.value)
      location.reload()
    })

    const headerElem = MakeElement(
      '<div><label style="font-weight: bold; padding-right: 5px;">Mode:</label></div>'
    )
    headerElem.appendChild(drop)

    const passageText = document.querySelector('.passage-text')
    passageText.insertBefore(headerElem, passageText.firstChild)
  }

  function addTranslationSearch() {
    const transLink = document.querySelector('.translation[role="button"]')
    const search = document.getElementById('translation-search')

    // Check if the dropdown exists and has not been fixed
    if (transLink && !search) {
      // Create the search text box
      const box = MakeElement(
        `<div><input type="text" id="translation-search" placeholder="Translation Search" style="width: 100%; padding: 5px; border: 2px solid black; background-color: yellow; font-weight: bold; color: black;" /></div>`
      )
      // Add text box
      transLink.after(box)
    }

    // Check if the dropdown is showing
    const dropdown = transLink.querySelector('.r-dropdown')
    if (dropdown) {
      // Filter the dropdown
      const val = document
        .getElementById('translation-search')
        .value.toLowerCase()
      const dropdownItems = dropdown.querySelectorAll('ul li')
      if (val === '') {
        dropdownItems.forEach((item) => (item.style.display = 'block'))
      } else {
        dropdownItems.forEach((item) => {
          const text = item.textContent.toLowerCase()
          if (text.includes(val)) {
            item.style.display = 'block'
          } else {
            item.style.display = 'none'
          }
        })
      }
    }

    setTimeout(addTranslationSearch, LOOP_TIME)
  }
} catch (err) {
  console.error('US | Error', err)
}
