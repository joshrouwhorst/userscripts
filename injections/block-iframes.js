let isIframe = false

try {
  // Check if the current window is not the top-level window
  if (window.self !== window.top) {
    isIframe = true
  }
} catch (e) {
  // If access to `window.top` is denied due to cross-origin restrictions, it's in an iframe
  isIframe = true
}

if (isIframe) {
  // If the current window is an iframe, stop the script
  return
}
