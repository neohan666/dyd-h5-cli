#! /usr/bin/env node

const program = require('commander')

program
  .version(require('../package.json').version, '-V, --version')
  .description('点一点h5脚手架')

program
  .command('run [projectName] [envMode]')
  .alias('s')
  .description('启动本地服务')
  .action(require('../lib/run'))

program
  .command('build [projectName] [envMode]')
  .alias('b')
  .description('打包项目文件')
  .action(require('../lib/build'))

program
  .command('init [option]')
  .alias('i')
  .description('创建一个新的子项目')
  .action(require('../lib/init'))

program.parse(process.argv)
