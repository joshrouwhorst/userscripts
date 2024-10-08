// ==UserScript==
// @name         All Sites
// @namespace    https://joshr.work/
// @homepageURL  https://github.com/joshrouwhorst/userscripts/raw/main/All%20Sites.user.js
// @version 1.2.9
// @author       Josh
// @match        *://*/*
// @downloadURL  https://raw.githubusercontent.com/joshrouwhorst/userscripts/main/userscripts/All%20Sites.user.js
// ==/UserScript==

if (jk_DEBUG('all.sites')) debugger

// To get rid of cookie banners, add selector here
const COOKIE_BANNER_SELECTORS = [
  '#CybotCookiebotDialog',
  '#onetrust-consent-sdk',
  '.c-cookie-banner',
  '.js-consent-banner',
]

const MAX_LOOPS = 10
const LOOP_TIME = 500

const { Log, HasParam, $, Remove, Load } = JackKnife
const { AddButton } = JackKnifeBar

Load(() => {
  handleAutoReload()
  addBar()
  removeCookieBanners()
  siteInfo()
  reminders()
})

function reminders() {
  Log('REMINDERS:')
  Log('- Add `site.info` to the URL to display site info')
  Log(
    '- Add `jkbar=true` to the URL to show the JackKnife bar or `jkbar=false` to hide'
  )
  Log('- Add `show.banners=true` to the URL to show cookie banners')
}

function addBar() {
  AddButton('Stop Reload', () => {
    localStorage.removeItem('autoReload')
    location.reload()
  })

  AddButton('Auto Reload (30s)', () => {
    localStorage.setItem('autoReload', '30')
    location.reload()
  })

  AddButton('Auto Reload (10s)', () => {
    localStorage.setItem('autoReload', '10')
    location.reload()
  })
}

function handleAutoReload() {
  const autoReload = localStorage.getItem('autoReload')

  if (autoReload) {
    const seconds = parseInt(autoReload)
    setTimeout(() => location.reload(), seconds * 1000)
  }
}

function removeCookieBanners(loop) {
  if (HasParam('show.banners')) return
  if (!loop) loop = 1

  COOKIE_BANNER_SELECTORS.forEach((selector) => {
    if ($(selector).length > 0) {
      Log(`Removing cookie banner with selector ${selector}`)
      Remove($(selector))
    }
  })

  if (loop < MAX_LOOPS)
    setTimeout(() => removeCookieBanners(loop + 1), LOOP_TIME)
}

function siteInfo() {
  const metas = []
  const openGraph = []
  const twitter = []
  let charset = null

  const metaTags = document.getElementsByTagName('meta')
  const links = document.getElementsByTagName('link')

  const output = {
    _title: document.title,
    _url: window.location.href,
    charset: null,
    links: {},
    scripts: {
      head: Array.from(document.head.getElementsByTagName('script')),
      body: Array.from(document.body.getElementsByTagName('script')),
    },
    styles: Array.from(document.getElementsByTagName('style')),
    meta: {},
    openGraph: {},
    twitter: {},
  }

  for (let i = 0; i < links.length; i++) {
    const link = links[i]
    const { rel, href } = link.attributes

    if (rel && href) output.links[rel.value] = href.value
  }

  for (let i = 0; i < metaTags.length; i++) {
    const tag = metaTags[i]
    const { name, content, property, charset: char } = tag.attributes
    const isTwitter = name ? name.value.includes('twitter:') : false
    const isOg = property ? property.value.includes('og:') : false

    if (isTwitter && name && content)
      twitter.push({ name: name.value, content: content.value })
    else if (isOg && property && content)
      openGraph.push({ property: property.value, content: content.value })
    else if (name && content)
      metas.push({ name: name.value, content: content.value })

    if (char) charset = char.value
  }

  if (charset) output.charset = charset

  for (let i = 0; i < metas.length; i++) {
    const { name, content } = metas[i]
    output.meta[name] = content
  }

  for (let i = 0; i < openGraph.length; i++) {
    const { property, content } = openGraph[i]
    output.openGraph[property] = content
  }

  for (let i = 0; i < twitter.length; i++) {
    const { name, content } = twitter[i]
    output.twitter[name] = content
  }

  console.log(
    `%c*** Site Info - ${output._url}***`,
    'font-size: 1.2em; font-weight: bold;',
    output
  )
}
