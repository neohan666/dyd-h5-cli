#! /usr/bin/env node

const commander = require('commander')

commander
  .version(require('../package.json').version, '-V, --version')
  .description('点一点h5脚手架')

commander
  .command('start [projectName] [envMode]')
  .description('启动本地服务')
  .action(require('../lib/start'))

commander
  .command('build [projectName] [envMode]')
  .description('打包项目文件')
  .action(require('../lib/build'))

commander
  .command('init [option]')
  .description('创建一个新的子项目')
  .action(require('../lib/init'))

commander.parse(process.argv)
