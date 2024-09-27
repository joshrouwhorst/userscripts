const fs = require('fs').promises
const path = require('path')
const UglifyJS = require('uglify-js')

const INJECTION_SCRIPTS = [
  // SET THE FILENAMES TO MINIFY AND CONCATENATE
  '_JackKnife.js',
  '_JackKnifeBar.js',
]

// Define the markers for injected content
const START_MARKER = '// ==InjectedScriptStart=='
const END_MARKER = '// ==InjectedScriptEnd=='
const USERSCRIPT_END_MARKER = '// ==/UserScript=='

// Get the parent directory of the script
const WORKING_DIR = path.resolve(__dirname, '..')

// Helper function to minify and concatenate files
async function getMinifiedContent(files) {
  let combinedContent = ''

  for (const file of files) {
    const filePath = path.resolve(WORKING_DIR, file)
    try {
      const content = await fs.readFile(filePath, 'utf-8')
      const minified = UglifyJS.minify(content)

      if (minified.error) {
        console.error(`Error minifying file: ${file}`, minified.error)
        continue
      }

      combinedContent += minified.code + '\n'
    } catch (err) {
      console.error(`Error reading file: ${file}`, err)
    }
  }

  return combinedContent
}

// Inject minified content into .user.js files in the working directory
async function injectIntoUserScripts(minifiedContent) {
  try {
    const files = await fs.readdir(WORKING_DIR)

    // Filter for .user.js files
    const userScriptFiles = files.filter((file) => file.endsWith('.user.js'))

    for (const userScript of userScriptFiles) {
      const userScriptPath = path.resolve(WORKING_DIR, userScript)
      let scriptContent = await fs.readFile(userScriptPath, 'utf-8')

      // Check if the injected block already exists
      const startMarkerIndex = scriptContent.indexOf(START_MARKER)
      const endMarkerIndex = scriptContent.indexOf(END_MARKER)
      let newContent = scriptContent

      // If markers exist, replace the content between them
      if (startMarkerIndex !== -1 && endMarkerIndex !== -1) {
        newContent = updateInjection(
          scriptContent,
          minifiedContent,
          startMarkerIndex,
          endMarkerIndex
        )
      } else {
        newContent = addInjection(scriptContent, minifiedContent)
      }

      await fs.writeFile(userScriptPath, newContent, 'utf-8')
      console.log(`Injected content in ${userScript}`)
    }
  } catch (err) {
    console.error('Error injecting into .user.js files:', err)
  }
}

function updateInjection(
  scriptContent,
  minifiedContent,
  startMarkerIndex,
  endMarkerIndex
) {
  const beforeBlock = scriptContent.slice(0, startMarkerIndex)
  const afterBlock = scriptContent.slice(endMarkerIndex + END_MARKER.length)
  const newContent = `${beforeBlock}${START_MARKER}\n${minifiedContent}\n${END_MARKER}${afterBlock}`
  return newContent
}

function addInjection(scriptContent, minifiedContent) {
  // Look for the // ==/UserScript== line
  const userScriptEndIndex = scriptContent.indexOf(USERSCRIPT_END_MARKER)

  if (userScriptEndIndex === -1) return null

  const beforeMarker = scriptContent.slice(
    0,
    userScriptEndIndex + USERSCRIPT_END_MARKER.length
  )
  const afterMarker = scriptContent.slice(
    userScriptEndIndex + USERSCRIPT_END_MARKER.length
  )

  // Inject the minified content with markers
  const newContent = `${beforeMarker}\n\n${START_MARKER}\n${minifiedContent}\n${END_MARKER}\n${afterMarker}`
  return newContent
}

// Main function to execute the process
async function main() {
  const minifiedContent = await getMinifiedContent(INJECTION_SCRIPTS)

  if (minifiedContent) {
    await injectIntoUserScripts(minifiedContent)
  } else {
    console.error('No minified content to inject.')
  }
}

// Run the main function
main().catch((err) => console.error(err))
