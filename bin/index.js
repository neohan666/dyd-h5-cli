#! /usr/bin/env node

const program = require('commander')

program
  .version(require('../package.json').version, '-v, --version')
  .description('点一点h5脚手架')

// --help

// 启动
program
  .command('run [folder-name]')
  .alias('r')
  .description('启动本地服务')
  .action(require('./run'))

// 打包
program
  .command('build [folder-name]')
  .alias('b')
  .description('打包项目文件')
  .action(require('./build'))

// 生成模板
program
  .command('init [folder-name]')
  .alias('i')
  .description('创建一个新的子项目')
  .action(require('./init'))

program.parse(process.argv)
