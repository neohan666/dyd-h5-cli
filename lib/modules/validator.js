const inquirer = require('inquirer')
const fs = require('fs')
const path = require('path')
const chalk = require('chalk')

async function getProjectName (projectName, isNeedValidateExists) {
  // 校验是否输入
  if (!projectName) {
    projectName = await inquirer.prompt([{
      type: 'Input',
      name: 'folder',
      message: '请输入子项目名'
      // default: +new Date()
    }]).then(answers => {
      return answers.folder
    })
    if (!projectName) {
      return getProjectName(projectName, isNeedValidateExists)
    }
  }
  // 校验是否存在
  if (isNeedValidateExists) {
    const folderPath = path.join(process.cwd(), 'src/projects/' + projectName)
    const isExists = fs.existsSync(folderPath)
    if (!isExists) {
      console.log(chalk.red('找不到子项目'))
      projectName = ''
      return getProjectName(projectName, isNeedValidateExists)
    }
  }
  return projectName
}

module.exports = {
  // 获取输入的子项目名
  getProjectName
}
