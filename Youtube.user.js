// ==UserScript==
// @name         Youtube
// @namespace    https://joshr.work/
// @homepageURL  https://joshr.work/
// @version      1.0.12
// @author       Josh
// @match        *://*.youtube.com/*
// @icon         https://www.youtube.com/s/desktop/54055272/img/favicon.ico
// @require      https://raw.githubusercontent.com/joshrouwhorst/userscripts/main/Utils.js
// ==/UserScript==

if (jk_DEBUG('youtube')) debugger

const $ = JackKnife

const { Log, Err, Obj, OnLocationChange } = Utils
const LOOP_TIME = 500
const MAX_TRIES = 10
const MAX_SECONDS = 10
const LOAD_START = new Date()

$(() => {
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
    $(
      '#chat-container button[aria-label="Hide chat replay"], #chat-container button[aria-label="Hide chat"]'
    ).trigger('click')

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

    if ($('#comments').length === 0 || !$('#comments').is(':visible')) {
      //Log('Comments not found or not visible')
      return setTimeout(() => hideComments(), LOOP_TIME)
    }

    Log('Hiding Video Comments')

    const hideCommentsState = localStorage.getItem('show.comments') !== 'true'
    const btnText = hideCommentsState ? 'Show Comments' : 'Hide Comments'

    const toggleCommentBtn = $(
      `<button id="toggleCommentsBtn">${btnText}</button>`
    ).css({
      'font-weight': 'bold',
      padding: '10px',
      'background-color': 'yellow',
      color: 'black',
      border: '2px solid black',
      'font-size': '1.5em',
    })

    toggleCommentBtn.click(() => {
      if ($('#comments').is(':visible')) {
        $('#comments').hide()
        localStorage.setItem('show.comments', 'false')
        toggleCommentBtn.text('Show Comments')
        Log('Comment Section Hidden')
      } else {
        $('#comments').show()
        localStorage.setItem('show.comments', 'true')
        toggleCommentBtn.text('Hide Comments')
        Log('Comment Section Shown')
      }
    })

    Log('Adding Show/Hide Comments Button')
    $('#comments').before(toggleCommentBtn)

    if (
      localStorage.getItem('show.comments') !== 'true' &&
      $('#comments').is(':visible')
    ) {
      $('#comments').hide()
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
      $('.ytp-ad-overlay-close-container').trigger('click')
    }

    if ($('.ytp-ad-overlay-close-button').length > 0) {
      Log('Closing video banner ad')
      $('.ytp-ad-overlay-close-button').trigger('click')
    }

    if ($('ytd-promoted-sparkles-web-renderer').length > 0) {
      Log('Closing side ad')
      $('ytd-promoted-sparkles-web-renderer').remove()
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
      $('.ytp-ad-skip-button-text').trigger('click')
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
    // Before I put in the if statement here the script was causing
    // the video settings to close every time it triggered
    if (
      $('#description tp-yt-paper-button#expand').length > 0 &&
      $('#description-inline-expander[is-expanded]').length === 0
    ) {
      $('#description tp-yt-paper-button#expand').trigger('click')
    }

    if (new Date() - LOAD_START < MAX_SECONDS * 1000)
      setTimeout(() => showDescription(), LOOP_TIME)
  } catch (err) {
    Err('Error running YouTube Show Description')
    Obj(err)
  }
}
