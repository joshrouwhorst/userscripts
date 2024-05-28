// ==UserScript==
// @name         Bible Gateway
// @namespace    https://joshr.work/
// @homepageURL  https://joshr.work/
// @version 1.1.21
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
  const { AddButton, AddDropdown } = JackKnifeBar

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

  const LOOP_TIME = 500
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

    const mode = localStorage.getItem('mode')

    if (mode === 'Strip') stripText()
    else if (mode === 'Markup') addMarkup()
    else if (mode === 'Quote') convertToQuote()

    setupViews()
    addBar()
    RemoveAds(AD_SELECTORS)
    //addTranslationSearch()
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

  // Not currently being used. Might use it again later.
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

  function addBar() {
    Log('Adding Bar')
    AddDropdown(
      'Mode',
      views.map((view) => view.name),
      (value) => {
        Log('Mode', value)
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
  }

  // Not currently using this. Might use it again later.
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

    const quickTranslationButtons = MakeElement(
      '<div style="margin: 10px 0;"></div>'
    )

    const getCurrentUrlWithTranslation = (translation) => {
      const url = window.location.href
      const urlObj = new URL(url)
      urlObj.searchParams.set('version', translation)
      return urlObj.href
    }

    const getValueOfUrlParameter = (param) => {
      const url = window.location.href
      const urlObj = new URL(url)
      return urlObj.searchParams.get(param)
    }

    quickTranslations.forEach((translation) => {
      const url = getCurrentUrlWithTranslation(translation)
      const isCurrentTranslation =
        getValueOfUrlParameter('version').toLowerCase() ===
        translation.toLowerCase()

      const mainStyle =
        'background-color: yellow; padding: 5px; border: 2px solid black; font-weight: bold; color: black; margin-right: 5px;'
      const currentStyle =
        'background-color: black; padding: 5px; border: 2px solid yellow; font-weight: bold; color: black; margin-right: 5px;'
      const style = isCurrentTranslation ? currentStyle : mainStyle
      const button = MakeElement(
        `<a href="${url}" style="${style}">${translation}</a>`
      )

      quickTranslationButtons.appendChild(button)
    })

    passageText.insertBefore(quickTranslationButtons, passageText.firstChild)
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
