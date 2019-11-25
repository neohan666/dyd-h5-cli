# dyd-h5-cli

### 1、简介
点一点h5脚手架，配合dyd-h5项目使用，便于命令行操作及自动化部署。

+ 使用方式：全局安装，在dyd-h5项目根目录下运行命令。

### 2、安装
```
npm i dyd-h5-cli -g
```

### 3、查看当前cli版本
```
dyd -V 或 dyd --version
```

### 4、创建子项目
```
dyd init 子项目名
```

### 5、启动子项目
```
dyd start 子项目名
```
以上命令默认是以dev环境运行。
+ 如果要以指定环境运行，使用以下命令：
```
dyd start 子项目名 环境模式
```
+ 目前环境有dev、test、beta、prod，具体以dyd-h5项目的.env相关文件为准。

### 6、打包子项目
```
dyd build 子项目名
```
以上命令默认是以prod环境打包。
+ 如果要以指定环境打包，使用以下命令：
```
dyd build 子项目名 环境模式
```
+ 目前环境有dev、test、beta、prod，具体以dyd-h5项目的.env相关文件为准。
