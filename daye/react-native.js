/*
* @Author: zikong
* @Date:   2015-12-10 09:55:51
* @Last Modified by:   zikong
* @Last Modified time: 2015-12-13 17:37:42
*/

'use strict';


著作权归作者所有。
商业转载请联系作者获得授权，非商业转载请注明出处。
作者：kmokidd
链接：http://zhuanlan.zhihu.com/FrontendMagazine/19996445
来源：知乎

1. react-native 需要

1. 安装 node 4.0 以上
    通过brew安装最新版即可 （当然你的电脑首先要有brew）
    brew install node

2. npm install react-native-cli -g
    // 暗转react-native-cli 工具

3. brew install watchman
    // 通过配置 watchman，React 实现了在代码发生变化时，完成相关的重建的功能
    // 保存js代码后，ctrl+r 模拟器即可

4. react-native init buildname
    // 项目初始化


如果仔细观察了创建的文件夹和文件，你会发现一个 node_modules 文件夹，包含了 React Native 框架。你也会发现一个 index.ios.js 文件，这是 CLI 工具创建的一个空壳应用。最后，会出现一个 Xcode 项目文件和一个 iOS 文件夹，包含了少量的代码用来引入 bootstrap 到你的项目中。

5. 启动node服务

    /Users/zikong/LingYanSi.github.io/react-native/Dont/node_modules/react-native/packager/launchPackager.command ; exit;

    初步观察，react-native的运行方式，是通过本地服务器是是变异代码，然后通过xcode运行的






