// ==UserScript==
// @name         YouTube
// @namespace    https://joshr.work/
// @homepageURL  https://github.com/joshrouwhorst/userscripts/raw/main/Youtube.user.js
// @version 1.2.20
// @author       Josh
// @match        *://*.youtube.com/*
// @icon         https://www.youtube.com/s/desktop/54055272/img/favicon.ico
// @downloadURL  https://raw.githubusercontent.com/joshrouwhorst/userscripts/main/userscripts/Youtube.user.js
// ==/UserScript==

// ==InjectedScriptStart==
let THIS_IS_AN_IFRAME=(()=>{try{return window.self!==window.top}catch(e){return!0}})();function jk_DEBUG(e){return-1<window.location.href.indexOf("debug="+e)}function jk_StandardizeElems(e){return e instanceof NodeList?e=Array.from(e):Array.isArray(e)||(e=[e]),e}class JackKnifeInstance{Log(e){console.log("%cUS | "+e,"font-weight: bold;")}Err(e){console.error("%cUS | "+e,"font-weight: bold; background-color: red; color: white;")}Loop(e,t){!t()&&0||setTimeout(()=>JackKnife.Loop(e,t),e)}Memory(e,t){return t&&localStorage.setItem(e,t),localStorage.getItem(e)}Obj(e){console.log(e)}GetQueryVariable(t){try{let e=null;if(window.location.search)e=window.location.search.substring(1);else if(window.location.hash){if(-1===(e=window.location.hash).indexOf("?"))return null;e=e.split("?")[1]}if(!e)return null;var n=e.split("&");for(let e=0;e<n.length;e++){var o=n[e].split("=");if(1!==o.length&&decodeURIComponent(o[0])===t)return decodeURIComponent(o[1])}}catch(e){console.error(e)}return null}GetAriaLabel(e){var t=e.getAttribute("aria-label");return t||((t=e.getAttribute("aria-labelledby"))?document.getElementById(t).textContent:null)}HasParam(e){return-1<window.location.search.indexOf(e)||-1<window.location.hash.indexOf(e)}OnLocationChange(n){try{window.onload=()=>{let t=document.location.href;var e=document.querySelector("body");new MutationObserver(e=>{t!==document.location.href&&(JackKnife.Log("Location Change: "+document.location.href),t=document.location.href,n(document.location.href))}).observe(e,{childList:!0,subtree:!0})}}catch(e){JackKnife.Err("Error observing location change"),JackKnife.Obj(e)}n(document.location.href)}HandleAds(e,t,n){t=t||500,e.forEach(e=>{"function"==typeof e?e():document.querySelectorAll(e).forEach(n)}),setTimeout(()=>JackKnife.RemoveAds(e,t),t)}RemoveAds(e,t){return JackKnife.HandleAds(e,t,e=>{e.remove()})}HideAds(e,t){return JackKnife.HandleAds(e,t,e=>{e.style.visibility="hidden"})}Censor(e){e.forEach(e=>{document.querySelectorAll(e).forEach(e=>{var t;e.querySelector(".black-box-overlay")||((t=document.createElement("div")).style.position="absolute",t.style.top=0,t.style.left=0,t.style.width="100%",t.style.height="100%",t.style.backgroundColor="black",t.style.zIndex=9999,t.style.pointerEvents="none",t.classList.add("black-box-overlay"),"static"===window.getComputedStyle(e).position&&(e.style.position="relative"),e.appendChild(t))})})}MakeElement(e){var t=document.createElement("div");return t.innerHTML=e,t.firstChild}Text(e,t){if(e=jk_StandardizeElems(e),!t)return t="",e[0].textContent;e.forEach(e=>{e.textContent=t})}Hide(e){(e=jk_StandardizeElems(e)).forEach(e=>{e.style.display="none"})}Show(e){(e=jk_StandardizeElems(e)).forEach(e=>{e.style.display=""})}Remove(e){(e=jk_StandardizeElems(e)).forEach(e=>{e.remove()})}Replace(e,t){e.parentNode.replaceChild(t,e)}Before(e,t){(e=jk_StandardizeElems(e)).forEach(e=>{e.parentNode.insertBefore(t,e)})}After(e,t){(e=jk_StandardizeElems(e)).forEach(e=>{e.nextSibling?e.parentNode.insertBefore(t,e.nextSibling):e.parentNode.appendChild(t)})}On(e,t,n){e.addEventListener(t,n)}Trigger(e,t){(e=jk_StandardizeElems(e)).forEach(e=>{e.dispatchEvent(new Event(t))})}Is(e,t){return(e=jk_StandardizeElems(e)).every(e=>e.matches(t))}CSS(e,n){(e=jk_StandardizeElems(e)).forEach(e=>{for(var t in n)e.style[t]=n[t]})}Load(e,t){if(t||!THIS_IS_AN_IFRAME)return"loading"!==document.readyState?e():void document.addEventListener("DOMContentLoaded",e)}Select(e,t){return t?t.querySelectorAll(e)||[]:document.querySelectorAll(e)||[]}$(e,t){return t?t.querySelectorAll(e)||[]:document.querySelectorAll(e)||[]}}let JackKnife=new JackKnifeInstance;
let _jackKnifeBarStyling=`
:root {
  transition: 0.2s;
}

.bar {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  background-color: black;
  display: flex;
  gap: 10px;
  padding: 10px;
  z-index: 9999;
}

input, select, button {
  padding: 5px 10px;
  background-color: yellow;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-weight: bold;
  filter: transparency(0.1);
}

input:hover, select:hover, button:hover {
  filter: transparency(0);
}
`;_jackKnifeBarStyling=`<style>${_jackKnifeBarStyling}</style>`;class JackKnifeBar{static shadowRoot=null;static widgets=[];static AddButton(e,t){JackKnifeBar.widgets.push({name:e,func:t,type:"button"}),JackKnifeBar.CreateBar()}static RemoveButton(t){JackKnifeBar.widgets=JackKnifeBar.widgets.filter(e=>e.name!==t),JackKnifeBar.CreateBar()}static ReplaceButton(t,e,a){var n=JackKnifeBar.widgets.findIndex(e=>e.name===t);JackKnifeBar.widgets[n]={name:e,func:a,type:"button"},JackKnifeBar.CreateBar()}static AddDropdown(e,t,a){JackKnifeBar.widgets.push({name:e,options:t,func:a,type:"dropdown"}),JackKnifeBar.CreateBar(),a(localStorage.getItem(e)||t[0])}static RemoveDropdown(t){JackKnifeBar.widgets=JackKnifeBar.widgets.filter(e=>e.name!==t),JackKnifeBar.CreateBar()}static ReplaceDropdown(t,e,a,n){var o=JackKnifeBar.widgets.findIndex(e=>e.name===t);JackKnifeBar.widgets[o]={name:e,options:a,func:n,type:"dropdown"},JackKnifeBar.CreateBar()}static OpenBar(){localStorage.setItem("jkbar","true"),JackKnifeBar.CreateBar()}static ShouldBarBeOpened(){var e=new URLSearchParams(window.location.search);return"true"===e.get("jkbar")?(localStorage.setItem("jkbar","true"),!0):"false"===e.get("jkbar")?(localStorage.setItem("jkbar","false"),!1):"true"===localStorage.getItem("jkbar")||(localStorage.getItem("jkbar"),!1)}static CloseBar(){var e=document.getElementById("jackKnifeBar"),e=(e&&e.remove(),localStorage.setItem("jkbar","false"),new URLSearchParams(window.location.search));e.get("jkbar")&&e.delete("jkbar"),history.replaceState({},"",location.pathname+"?"+e)}static CreateBar(){if(JackKnifeBar.ShouldBarBeOpened()){var n,r;let e=document.getElementById("jackKnifeBar"),t=e?.shadowRoot,o=(e||((e=document.createElement("div")).id="jackKnifeBar",document.body.appendChild(e),(t=e.attachShadow({mode:"open"})).appendChild((n=_jackKnifeBarStyling,(r=document.createElement("div")).innerHTML=n,r.firstChild))),e.widgets||(e.widgets=[]),JackKnifeBar.widgets.forEach(t=>{e.widgets.filter(e=>e.name===t.name).length||e.widgets.push(t)}),document.createElement("div")),a=(o.id="jkbar",o.className="bar",t.appendChild(o),(e,t)=>{switch(e.type){case"button":a=e,(n=document.createElement("button")).textContent=a.name,n.addEventListener("click",a.func),o.appendChild(n);break;case"dropdown":(t=>{let a=document.createElement("select"),n=localStorage.getItem(t.name)||t.options[0];a.addEventListener("change",e=>{localStorage.setItem(t.name,a.value),t.func(a.value,e)}),t.options.forEach(e=>{var t=document.createElement("option");t.textContent=e,a.appendChild(t),e===n&&(a.value=e)}),o.appendChild(a)})(e)}var a,n});return a({name:"X",func:()=>{confirm("Are you sure you want to close?")&&JackKnifeBar.CloseBar()},type:"button"}),e.widgets.forEach(e=>a(e)),o}}}class JackKnifePopup{Open({title:e,body:t}){var a=this.shadowRoot;let n=document.createElement("div");return n.id="jackKnifePopup",n.className="popup",a.appendChild(n),n.innerHTML=""`
      <style>
        .popup-ui {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-color: rgba(0, 0, 0, 0.5);
          z-index: 9999;
        }

        header {
          display: flex;
          justify-content: space-between;
          padding: 10px;
          background-color: black;
          color: white;
        }

        .content {
          padding: 20px;
          background-color: white;
          color: black;
        }

        button {
          background-color: transparent;
          border: none;
          color: white;
          font-weight: bold;
          cursor: pointer;
        }

        button:hover {
          color: yellow;
        }

        button:active {
          transform: scale(0.9);
        }

        button:focus {
          outline: none;
        }
      </style>
      <div class="popup-ui">
        <header>
          <h2>${e}</h2>
          <button id="closeBtn">X</button>
        </header>
        
        <div class="content">
          ${t}
        </div>

      </div>
    ```,document.getElementById("closeBtn").addEventListener("click",()=>{n.remove()}),n}}

// ==InjectedScriptEnd==


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
