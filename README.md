simple-md-note-book ： a demo for learning node.js ：）
===================

markdown很适合用来记笔记，轻便高效，鉴于初学node.js，而且在linux下没发现啥好用的markdown编辑器
（注：离线仍然可以使用），所以自己写了一个，功能和界面都是非常简单的：

posts目录下存放markdown文件，需要按照统一格式（详情参照内置的例子）来书写。

tips：
1. 应用启动时把所有文件放入内存中，避免每次请求都读取文件
2. 兼容github风格的markdown格式
3. 可以重新加载所有文件，也可以重新加载单个文件（忽视缓存）

install：
1. npm install
2. node app.js