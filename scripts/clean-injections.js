const fs = require('fs').promises
const path = require('path')

// Get the parent directory of the script
const workingDir = path.resolve(__dirname, '..')

// Define the markers for injected content
const startMarker = '// ==InjectedScriptStart=='
const endMarker = '// ==InjectedScriptEnd=='

async function removeInjectedScripts() {
  try {
    const files = await fs.readdir(workingDir)

    // Filter for .user.js files
    const userScriptFiles = files.filter((file) => file.endsWith('.user.js'))

    for (const userScript of userScriptFiles) {
      const userScriptPath = path.resolve(workingDir, userScript)
      let scriptContent = await fs.readFile(userScriptPath, 'utf-8')

      // Check if the injected block exists
      const startMarkerIndex = scriptContent.indexOf(startMarker)
      const endMarkerIndex = scriptContent.indexOf(endMarker)

      if (startMarkerIndex !== -1 && endMarkerIndex !== -1) {
        // Remove the content between the markers (including the markers)
        const beforeBlock = scriptContent.slice(0, startMarkerIndex)
        const afterBlock = scriptContent.slice(
          endMarkerIndex + endMarker.length
        )
        const newContent = beforeBlock + afterBlock

        await fs.writeFile(userScriptPath, newContent, 'utf-8')
        console.log(`Removed injected script from ${userScript}`)
      } else {
        console.log(`No injected script found in ${userScript}`)
      }
    }
  } catch (err) {
    console.error('Error processing files:', err)
  }
}

// Run the function
removeInjectedScripts().catch((err) => console.error(err))
