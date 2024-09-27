const fs = require('fs')
const path = require('path')

function copyUserScripts() {
  try {
    // Define the working directory (one level above the script's directory)
    const workingDir = path.resolve(__dirname, '..')

    // Define the destination directory
    const destinationDir = path.join(workingDir, 'userscripts')

    // Create the destination directory if it doesn't exist
    if (!fs.existsSync(destinationDir)) {
      fs.mkdirSync(destinationDir, { recursive: true })
    }

    // Read all files from the working directory
    const files = fs.readdirSync(workingDir)

    // Filter for files that end with .user.js
    const userScriptFiles = files.filter((file) => file.endsWith('.user.js'))

    // Copy each .user.js file to the destination directory
    for (const file of userScriptFiles) {
      const srcFilePath = path.join(workingDir, file)
      const destFilePath = path.join(destinationDir, file)
      fs.copyFileSync(srcFilePath, destFilePath)
      console.log(`Copied ${file} to userscripts/`)
    }

    console.log('All .user.js files have been copied.')
  } catch (err) {
    console.error('Error copying user script files:', err)
  }
}

// Execute the function
copyUserScripts()
