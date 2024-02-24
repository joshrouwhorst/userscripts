// ==UserScript==
// @name         All Sites
// @namespace    https://joshr.work/
// @homepageURL  https://joshr.work/
// @version      1.0.25
// @author       Josh
// @match        *://*/*
// @require      https://raw.githubusercontent.com/joshrouwhorst/userscripts/main/Utils.js
// ==/UserScript==

if (jk_DEBUG('all.sites')) debugger
const $ = JackKnife

// To get rid of cookie banners, add selector here
const COOKIE_BANNER_SELECTORS = [
  '#CybotCookiebotDialog',
  '#onetrust-consent-sdk',
  '.c-cookie-banner',
  '.js-consent-banner',
]

const MAX_LOOPS = 10
const LOOP_TIME = 500

const { Log, HasParam } = jk_Utils

$(() => {
  removeCookieBanners()
  siteInfo()
})

function removeCookieBanners(loop) {
  if (HasParam('show.banners')) return
  if (!loop) loop = 1

  COOKIE_BANNER_SELECTORS.forEach((selector) => {
    if ($(selector).length > 0) {
      Log(`Removing cookie banner with selector ${selector}`)
      $(selector).remove()
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
      head: $('head script').get(),
      body: $('body script').get(),
    },
    styles: $('style').get(),
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
