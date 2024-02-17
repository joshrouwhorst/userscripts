const fs = require('fs')
const path = require('path')
const packageJson = require('../package.json')

const DIRECTORY = process.cwd()
const VERSION = packageJson.version

fs.readdir(DIRECTORY, (err, files) => {
  if (err) {
    console.error('Error reading directory:', err)
    return
  }

  files.forEach((file) => {
    if (file.endsWith('.user.js')) {
      const filePath = path.join(DIRECTORY, file)
      fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
          console.error('Error reading file:', err)
          return
        }

        const updatedData = data.replace(
          /@version\s+\d+\.\d+\.\d+/,
          `@version      ${VERSION}`
        )
        fs.writeFile(filePath, updatedData, 'utf8', (err) => {
          if (err) {
            console.error('Error writing file:', err)
            return
          }
          console.log(`Version updated in ${file}`)
        })
      })
    }
  })
})
