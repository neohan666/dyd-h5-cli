const Build = require('./build')
const chalk = require('chalk')

module.exports = async (envMode) => {
  const nameArr = ['common', 'consume']

  toBuildAll(nameArr, envMode)

  function toBuildAll (nameArr, envMode, index) {
    index = index || 0
    const projectName = nameArr[index]
    Build(projectName, envMode, (code) => {
      if (index < nameArr.length - 1) {
        toBuildAll(nameArr, envMode, index + 1)
      } else {
        if (code === 0) {
          console.log(chalk.green(''))
          console.log(chalk.green('-----全部打包完成'))
        }
      }
    })
  }
}
