### 介绍
windows 系统下, 利用 powershell 调用系统 mediaplay 随机播放音乐.  

使用的随机方法 ``` get-random ```

### 使用方法

- 修改 index.js 文件中的第五行, 配置本地歌曲目录
  - 仅支持单个目录

- 用 powershell 打开项目

- 输入 ``` yarn start ```, 生成 powershell 脚本

- 输入 ``` ./src/random-player.ps1 ```, 执行脚本

- 可以使用 ```play```, ```pause```, ```stop``` 命令

- play 执行后如果需要输入命令, ``` crtl + c ``` 即可

### 后记

最初的想法是想随机听本地音乐, 找了一圈发现调用 windows 自带的播放器最简单, 然后稍微了解了下 powershell 语法, 几十年前的东西了，于个人大概是发现了宝箱那种感觉吧。

我是虚玩玩, 与君共勉~
