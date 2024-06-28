// ==UserScript==
// @name         Bible Gateway
// @namespace    https://joshr.work/
// @homepageURL  https://github.com/joshrouwhorst/userscripts/raw/main/Bible%20Gateway.user.js
// @version 1.1.38
// @author       Josh
// @match        *://*.biblegateway.com/passage/*
// @icon         https://biblegateway.com/favicon.ico
// @require      https://raw.githubusercontent.com/joshrouwhorst/userscripts/main/_JackKnife.js
// @require      https://raw.githubusercontent.com/joshrouwhorst/userscripts/main/_JackKnifeBar.js
// @downloadURL  https://raw.githubusercontent.com/joshrouwhorst/userscripts/main/Bible%20Gateway.user.js
// ==/UserScript==

if (jk_DEBUG('bible.gateway')) debugger

try {
  const { Log, RemoveAds, Hide, Remove, $, MakeElement, On, Load } = JackKnife
  const { AddButton, AddDropdown, OpenBar } = JackKnifeBar

  const views = [
    {
      name: 'Regular',
      func: (elem) => {},
    },
    {
      name: 'Strip',
      func: (elem) => {
        Remove($('sup.footnote', elem))
        Remove($('sup.versenum', elem))
        Remove($('span.chapternum', elem))
      },
    },
    {
      name: 'Quote',
      func: (elem) => {
        Remove($('sup.footnote', elem))
        Remove($('sup.versenum', elem))
        Remove($('span.chapternum', elem))

        $('.passage-text p:not(.spacer)', elem).forEach((paragraph) => {
          const spacer = document.createElement('p')
          paragraph.after(spacer)
          paragraph.prepend('> ')
        })
      },
    },
  ]

  const quickTranslations = ['NRSVUE', 'NIV', 'ESV', 'KJV', 'NKJV', 'NLT']

  const AD_SELECTORS = [
    '.sys-announce-content',
    '.sys-announce',
    '.bg-slider',
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

    setupViews()
    addBar()
    RemoveAds(AD_SELECTORS)
  })

  // Setup the different views on load then choose which one to show at a given time.
  function setupViews() {
    const main = $('.passage-text')

    views.forEach((view) => {
      main.forEach((elem) => {
        const clone = elem.cloneNode(true)
        clone.id = `${view.name.toLowerCase()}-view`
        clone.style.display = 'none'
        view.func(clone)
        elem.after(clone)
      })
    })

    main.forEach((elem) => elem.remove())
  }

  function addBar() {
    const mode = localStorage.getItem('mode')

    AddDropdown(
      'Mode',
      views.map((view) => view.name),
      (value) => {
        views.forEach((view) => {
          const elem = $(`#${view.name.toLowerCase()}-view`)[0]
          if (view.name === value) elem.style.display = 'block'
          else elem.style.display = 'none'
        })
      }
    )

    quickTranslations.forEach((translation) => {
      AddButton(translation, () => {
        const url = getCurrentUrlWithTranslation(translation)
        window.location.href = url
      })
    })

    const getCurrentUrlWithTranslation = (translation) => {
      const url = window.location.href
      const urlObj = new URL(url)
      urlObj.searchParams.set('version', translation)
      return urlObj.href
    }

    // Make sure the bar is open by default
    OpenBar()
  }
} catch (err) {
  console.error('US | Error', err)
}
