// ==UserScript==
// @name         YouTube
// @namespace    https://joshr.work/
// @homepageURL  https://github.com/joshrouwhorst/userscripts/raw/main/Youtube.user.js
// @version 1.1.49
// @author       Josh
// @match        *://*.youtube.com/*
// @icon         https://www.youtube.com/s/desktop/54055272/img/favicon.ico
// @require      https://raw.githubusercontent.com/joshrouwhorst/userscripts/main/_JackKnife.js
// @downloadURL  https://raw.githubusercontent.com/joshrouwhorst/userscripts/main/Youtube.user.js
// ==/UserScript==

if (jk_DEBUG('youtube')) debugger

const {
  Log,
  Err,
  Obj,
  OnLocationChange,
  Load,
  Trigger,
  $,
  Is,
  On,
  MakeElement,
  Remove,
  CSS,
  Hide,
  Show,
  Text,
  Before,
  Memory,
} = JackKnife
const LOOP_TIME = 500
const MAX_TRIES = 10
const MAX_SECONDS = 10
const LOAD_START = new Date()

Load(() => {
  Log('YouTube User Script Running...')
  run()
  OnLocationChange(() => run())
})

function run() {
  if (!window.location.pathname.toLowerCase().includes('/watch'))
    return Log('Not on a video page')

  hideChat()
  hideComments()
  closeAds()
  autoSkip()
  showDescription()
}

function hideChat() {
  try {
    Trigger(
      $(
        '#chat-container button[aria-label="Hide chat replay"], #chat-container button[aria-label="Hide chat"]'
      ),
      'click'
    )

    if (new Date() - LOAD_START < MAX_SECONDS * 1000)
      setTimeout(() => hideChat(), LOOP_TIME)
  } catch (err) {
    Err('Error running YouTube Chat Collapse')
    Obj(err)
  }
}

function hideComments() {
  try {
    if ($('#toggleCommentsBtn').length > 0) return Log('Button already exists')

    //Log('Started hiding comments')

    const comments = $('#comments')

    if (comments.length === 0 || !comments[0].style.display === 'none') {
      //Log('Comments not found or not visible')
      return setTimeout(() => hideComments(), LOOP_TIME)
    }

    Log('Hiding Video Comments')

    const hideCommentsState = Memory('show.comments') !== 'true'
    const btnText = hideCommentsState ? 'Show Comments' : 'Hide Comments'

    const toggleCommentBtn = MakeElement(
      `<button id="toggleCommentsBtn">${btnText}</button>`
    )

    CSS(toggleCommentBtn, {
      'font-weight': 'bold',
      padding: '10px',
      'background-color': 'yellow',
      color: 'black',
      border: '2px solid black',
      'font-size': '1.5em',
    })

    On(toggleCommentBtn, 'click', () => {
      if (
        $('#comments').length > 0 &&
        $('#comments')[0].style.display !== 'none'
      ) {
        Hide($('#comments'))
        Memory('show.comments', 'false')
        Text(toggleCommentBtn, 'Show Comments')
        Log('Comment Section Hidden')
      } else {
        Show($('#comments'))
        Memory('show.comments', 'true')
        Text(toggleCommentBtn, 'Hide Comments')
        Log('Comment Section Shown')
      }
    })

    Log('Adding Show/Hide Comments Button')
    Before($('#comments'), toggleCommentBtn)

    if (
      Memory('show.comments') !== 'true' &&
      $('#comments').length > 0 &&
      $('#comments')[0].style.display !== 'none'
    ) {
      Hide($('#comments'))
      Log('Comment Section Hidden')
    } else {
      Log('Comment Section Not Hidden')
    }
  } catch (err) {
    Err('Error running YouTube Hide Comments')
    Obj(err)
  }
}

function closeAds() {
  try {
    if ($('.ytp-ad-overlay-close-container').length > 0) {
      Log('Closing video banner ad')
      Trigger($('.ytp-ad-overlay-close-container'), 'click')
    }

    if ($('.ytp-ad-overlay-close-button').length > 0) {
      Log('Closing video banner ad')
      Trigger($('.ytp-ad-overlay-close-button'), 'click')
    }

    if ($('ytd-promoted-sparkles-web-renderer').length > 0) {
      Log('Closing side ad')
      Remove($('ytd-promoted-sparkles-web-renderer'))
    }

    setTimeout(() => closeAds(), LOOP_TIME)
  } catch (err) {
    Err('Error running YouTube Close Ad')
    Obj(err)
  }
}

function autoSkip() {
  try {
    if ($('.ytp-ad-skip-button-text').length > 0) {
      Log('Auto Skipping')
      Trigger($('.ytp-ad-skip-button-text'), 'click')
    }

    if (new Date() - LOAD_START < MAX_SECONDS * 1000)
      setTimeout(() => autoSkip(), LOOP_TIME)
  } catch (err) {
    Err('Error running YouTube AutoSkip')
    Obj(err)
  }
}

function showDescription() {
  try {
    let moreBtn = $('#description tp-yt-paper-button#expand')
    if (moreBtn.length > 0) moreBtn = moreBtn[0]
    else moreBtn = null

    if (moreBtn && !moreBtn.hasAttribute('hidden')) {
      Trigger(moreBtn, 'click')
    } else if (moreBtn && moreBtn.hasAttribute('hidden')) {
      Log('Description expanded')
    } else if (new Date() - LOAD_START < MAX_SECONDS * 1000)
      setTimeout(() => showDescription(), LOOP_TIME)
  } catch (err) {
    Err('Error running YouTube Show Description')
    Obj(err)
  }
}
