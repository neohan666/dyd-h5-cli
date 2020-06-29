const build = require('./build')
const chalk = require('chalk')
const fs = require('fs')

module.exports = (envMode) => {
  const nameArr = []
  const dirPath = './src/projects'
  const files = fs.readdirSync(dirPath)
  files.forEach(name => {
    const stat = fs.lstatSync(dirPath + '/' + name)
    if (stat.isDirectory()) {
      nameArr.push(name)
    }
  })

  toBuildAll(nameArr, envMode)

  function toBuildAll (nameArr, envMode, index) {
    index = index || 0
    const projectName = nameArr[index]
    build(projectName, envMode, (code) => {
      if (index < nameArr.length - 1) {
        toBuildAll(nameArr, envMode, index + 1)
      } else {
        if (code === 0) {
          console.log(chalk.green(''))
          console.log(chalk.green('全部打包完成'))
          process.exit()
        }
      }
    })
  }
}
