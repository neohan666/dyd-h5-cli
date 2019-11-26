const chalk = require('chalk')
const fs = require('fs')
const fse = require('fs-extra')
const path = require('path')
const { getProjectName } = require('./modules/validator')
const download = require('download-git-repo')
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
      download('direct:https://github.com/neohan666/dyd-h5-template.git', downloadPath, { clone: true }, errDownload => {
        downloadSpinner.stop()
        if (errDownload) {
          chalk.red(errDownload)
        } else {
          // 复制文件
          const errCopy = fse.copySync(path.join(downloadPath, '/template'), folderPath)
          if (errCopy) {
            console.log(chalk.red(errCopy))
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
