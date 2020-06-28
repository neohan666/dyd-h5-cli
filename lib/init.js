const chalk = require('chalk')
const fs = require('fs')
const fse = require('fs-extra')
const path = require('path')
const { getProjectName } = require('./modules/validator')
const onDownload = require('./modules/download')
const ora = require('ora')

module.exports = async projectName => {
  projectName = await getProjectName(projectName)

  const folderPath = path.join(process.cwd(), 'src/projects/' + projectName)
  const downloadPath = path.join(__dirname, '../src/temp')
  fs.stat(folderPath, (err, stats) => {
    if (!err) {
      console.log(chalk.red('子项目已存在'))
      process.exit()
    } else {
      // 下载模板
      const downloadSpinner = ora('downloading template...').start()
      onDownload(downloadPath, errDownload => {
        downloadSpinner.stop()
        if (errDownload) {
          console.log(errDownload)
          console.log(chalk.red('用户名或密码错误，请删除windows凭据里的相应凭据后重试，或配置SSH后尝试'))
        } else {
          // 复制文件
          const errCopy = fse.copySync(path.join(downloadPath, '/template'), folderPath)
          if (errCopy) {
            console.log(errCopy)
          } else {
            console.log(chalk.green('子项目创建成功'))
          }
          // 删除下载文件
          fse.removeSync(downloadPath)
        }

        process.exit()
      })
    }
  })
}
