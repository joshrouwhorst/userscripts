// ==UserScript==
// @name         BibleHub
// @namespace    https://joshr.work/
// @homepageURL  https://github.com/joshrouwhorst/userscripts/raw/main/BibleHub.user.js
// @version 1.2.1
// @author       Josh
// @match        *://*.biblehub.com/*
// @icon         https://biblehub.com/favicon.ico
// @downloadURL  https://raw.githubusercontent.com/joshrouwhorst/userscripts/main/BibleHub.user.js
// ==/UserScript==

// ==InjectedScriptStart==
function jk_DEBUG(e){return-1<window.location.href.indexOf("debug="+e)}function jk_StandardizeElems(e){return e instanceof NodeList?e=Array.from(e):Array.isArray(e)||(e=[e]),e}let JackKnife=new JackKnifeInstance;class JackKnifeInstance{Log(e){console.log("%cUS | "+e,"font-weight: bold;")}Err(e){console.error("%cUS | "+e,"font-weight: bold; background-color: red; color: white;")}Loop(e,t){!t()&&0||setTimeout(()=>this.Loop(e,t),e)}Memory(e,t){return t&&localStorage.setItem(e,t),localStorage.getItem(e)}Obj(e){console.log(e)}GetQueryVariable(t){try{let e=null;if(window.location.search)e=window.location.search.substring(1);else if(window.location.hash){if(-1===(e=window.location.hash).indexOf("?"))return null;e=e.split("?")[1]}if(!e)return null;var n=e.split("&");for(let e=0;e<n.length;e++){var r=n[e].split("=");if(1!==r.length&&decodeURIComponent(r[0])===t)return decodeURIComponent(r[1])}}catch(e){console.error(e)}return null}GetAriaLabel(e){var t=e.getAttribute("aria-label");return t||((t=e.getAttribute("aria-labelledby"))?document.getElementById(t).textContent:null)}HasParam(e){return-1<window.location.search.indexOf(e)||-1<window.location.hash.indexOf(e)}OnLocationChange(n){try{window.onload=()=>{let t=document.location.href;var e=document.querySelector("body");new MutationObserver(e=>{t!==document.location.href&&(JackKnife.Log("Location Change: "+document.location.href),t=document.location.href,n(document.location.href))}).observe(e,{childList:!0,subtree:!0})}}catch(e){JackKnife.Err("Error observing location change"),JackKnife.Obj(e)}n(document.location.href)}HandleAds(e,t,n){t=t||500,e.forEach(e=>{"function"==typeof e?e():document.querySelectorAll(e).forEach(n)}),setTimeout(()=>JackKnife.RemoveAds(e,t),t)}RemoveAds(e,t){return JackKnife.HandleAds(e,t,e=>{e.remove()})}HideAds(e,t){return JackKnife.HandleAds(e,t,e=>{e.style.visibility="hidden"})}MakeElement(e){var t=document.createElement("div");return t.innerHTML=e,t.firstChild}Text(e,t){if(e=jk_StandardizeElems(e),!t)return t="",e[0].textContent;e.forEach(e=>{e.textContent=t})}Hide(e){(e=jk_StandardizeElems(e)).forEach(e=>{e.style.display="none"})}Show(e){(e=jk_StandardizeElems(e)).forEach(e=>{e.style.display=""})}Remove(e){(e=jk_StandardizeElems(e)).forEach(e=>{e.remove()})}Replace(e,t){e.parentNode.replaceChild(t,e)}Before(e,t){(e=jk_StandardizeElems(e)).forEach(e=>{e.parentNode.insertBefore(t,e)})}After(e,t){(e=jk_StandardizeElems(e)).forEach(e=>{e.nextSibling?e.parentNode.insertBefore(t,e.nextSibling):e.parentNode.appendChild(t)})}On(e,t,n){e.addEventListener(t,n)}Trigger(e,t){(e=jk_StandardizeElems(e)).forEach(e=>{e.dispatchEvent(new Event(t))})}Is(e,t){return(e=jk_StandardizeElems(e)).every(e=>e.matches(t))}CSS(e,n){(e=jk_StandardizeElems(e)).forEach(e=>{for(var t in n)e.style[t]=n[t]})}Load(e){if("loading"!==document.readyState)return e();document.addEventListener("DOMContentLoaded",e)}Select(e,t){return t?t.querySelectorAll(e)||[]:document.querySelectorAll(e)||[]}$(e,t){return t?t.querySelectorAll(e)||[]:document.querySelectorAll(e)||[]}}
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





if (jk_DEBUG('biblehub')) debugger

try {
  const { Log, RemoveAds, Remove, $, Load, Loop } = JackKnife

  const AD_SELECTORS = []
  let frameCount = 0

  // Checks the src attribute of the iframe to see if it contains a string from the ALLOWED_IFRAMES array
  const ALLOWED_IFRAMES = ['google.com/recaptcha']

  Load(() => {
    Log('BibleHub User Script Running...')
    Loop(1000, () => removeIframes())
    RemoveAds(AD_SELECTORS)
  })

  // Delete all iframes that are not allowed
  function removeIframes() {
    $('iframe').forEach((f) => {
      var allowed = false

      for (var i = 0; i < ALLOWED_IFRAMES.length; i++) {
        if (f.src.indexOf(ALLOWED_IFRAMES[i])) {
          allowed = true
          break
        }
      }

      if (!allowed) {
        Remove(f)
        Log(`${++frameCount} iframes removed - ${f.src}`)
      }
    })
  }
} catch (err) {
  console.error('US | Error', err)
}

