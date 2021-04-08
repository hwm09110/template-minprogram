const fs = require('fs')
const getConfig = require('../config/index')
const path = require('path')

module.exports = function getDllManifests (isProduction) {
  const config = getConfig(isProduction)
  const supportedModes = config.supportedModes
  const result = []
  if (fs.existsSync(config.dllPath)) {
    const files = fs.readdirSync(config.dllPath)
    files.forEach((file) => {
      if (/\.manifest\.json$/.test(file)) {
        const content = JSON.parse(fs.readFileSync(path.join(config.dllPath, file), 'utf8'))
        const filename = path.basename(content.name)
        const modeReg = new RegExp(`^(${supportedModes.join('|')})\\.`)
        let mode = ''
        if (modeReg.test(filename)) {
          mode = modeReg.exec(filename)[1]
        }
        result.push({
          mode,
          content
        })
      }
    })
  }
  return result
}
