const fs = require('fs')
const path = require('path')

const WORKING_DIR = path.resolve(__dirname, '../userscripts')

// Read package.json
const packageJson = JSON.parse(fs.readFileSync('package.json'))

// Get the current version number
const currentVersion = packageJson.version

// Increment the last number
const versionParts = currentVersion.split('.')
versionParts[versionParts.length - 1] = String(
  Number(versionParts[versionParts.length - 1]) + 1
)
const newVersion = versionParts.join('.')

// Update package.json with the new version
packageJson.version = newVersion
fs.writeFileSync('package.json', JSON.stringify(packageJson, null, 2))

// Update each .user.js file with the new version in the header
const files = fs.readdirSync(WORKING_DIR)
files.forEach((file) => {
  if (file.endsWith('.user.js')) {
    const content = fs.readFileSync(file, 'utf8')
    const updatedContent = content.replace(
      /@version\s+\d+(\.\d+)+/,
      `@version ${newVersion}`
    )
    fs.writeFileSync(path.resolve(WORKING_DIR, file), updatedContent)
    console.log(`Version updated in ${file} to ${newVersion}`)
  }
})
