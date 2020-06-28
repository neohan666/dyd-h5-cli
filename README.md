# dyd-h5-cli

### 1、简介
点一点h5脚手架，配合dyd-h5项目使用，便于命令行操作及自动化部署。

+ 使用方式：全局安装，在dyd-h5项目根目录下运行命令。
+ 目前环境模式有dev、test、beta、prod，具体以dyd-h5项目的.env相关文件为准。

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
+ 默认以dev环境运行：
```
dyd start 子项目名
```
+ 以指定环境运行：
```
dyd start 子项目名 环境模式
```

### 6、打包子项目
+ 默认以prod环境运行：
```
dyd build 子项目名
```
+ 以指定环境运行：
```
dyd build 子项目名 环境模式
```

### 7、运行打包后的子项目
+ 开启一个本地http服务器，运行打包后的子项目
```
dyd server 子项目名
```

### 8、打包所有子项目
+ 默认以prod环境运行：
```
dyd buildAll
```
+ 以指定环境运行：
```
dyd buildAll 环境模式
```
