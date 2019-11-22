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
默认环境(dev)运行:
```
dyd run 子项目名
```

指定环境运行:
```
dyd run 子项目名 环境模式
```
目前环境有dev、test、beta、prod，具体以dyd-h5项目的.env相关文件为准。

### 6、打包子项目
默认环境(prod)打包:
```
dyd build 子项目名
```

指定环境打包:
```
dyd build 子项目名 环境模式
```
目前环境有dev、test、beta、prod，具体以dyd-h5项目的.env相关文件为准。
