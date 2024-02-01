// ==UserScript==
// @name         Youtube
// @namespace    https://joshr.work/
// @homepageURL  https://joshr.work/
// @version      1.0.0
// @author       Josh
// @match        *://*.youtube.com/*
// @icon         https://www.youtube.com/s/desktop/54055272/img/favicon.ico
// @require      https://gist.githubusercontent.com/joshrouwhorst/fb11833b2cdbb4460f9ea3ae0a1b6d06/raw/utils.js
// @require      https://code.jquery.com/jquery-3.7.1.min.js
// ==/UserScript==

//debugger

const { Log, Err, Obj, OnLocationChange } = Utils
const LOOP_TIME = 500
const MAX_TRIES = 10

$(() => {
  OnLocationChange(() => {
    if (!window.location.pathname.toLowerCase().includes('/watch')) return
    hideChat()
    hideComments()
    closeAds()
    autoSkip()
    showDescription()
  })
})

function hideChat() {
  try {
    $(
      '#chat-container button[aria-label="Hide chat replay"], #chat-container button[aria-label="Hide chat"]'
    ).trigger('click')
    setTimeout(() => hideChat(), LOOP_TIME)
  } catch (err) {
    Err('Error running YouTube Chat Collapse')
    Obj(err)
  }
}

function hideComments() {
  try {
    if ($('#comments').length === 0 || !$('#comments').is(':visible')) {
      return setTimeout(() => hideComments(), LOOP_TIME)
    }

    Log('Hiding Video Comments')

    const hideCommentsState = localStorage.getItem('show.comments') !== 'true'
    const btnText = hideCommentsState ? 'Show Comments' : 'Hide Comments'

    const toggleCommentBtn = $(`<button>${btnText}</button>`).css({
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
    setTimeout(() => autoSkip(), LOOP_TIME)
  } catch (err) {
    Err('Error running YouTube AutoSkip')
    Obj(err)
  }
}

function showDescription() {
  try {
    $('#description tp-yt-paper-button#expand').trigger('click')
    setTimeout(() => showDescription(), LOOP_TIME)
  } catch (err) {
    Err('Error running YouTube Show Description')
    Obj(err)
  }
}
