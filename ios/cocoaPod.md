
### PodFile文件
```
use_frameworks!
platform :ios, '9.0'
pod 'SwiftHTTP', '~> 1.0.3'
pod 'Classy', '~> 0.2.4'
pod 'ClassyLiveLayout', '~> 0.6.0'

```
使用步骤
- pod search xxx
找到相关代码，如：``` pod 'SwiftHTTP', '~> 1.0.3' ```
- vim PodFile
在PodFile文件中添加相关依赖
- pod install
安装依赖

- pod update
更新依赖

还需要注意的是，pod会为项目新增一个 ***todo.xcworkspace*** 的文件
在pod初始完成后，使用 ***.xcworkspace*** 重新打开工程，而不是通过默认方式或者 ***.xcodeproj*** 打开


import SwiftJSON 报错提示：Cannot load underlying module for 'x'
回答
This seems to be a bug in XCode. I had the same problem, and as described in the comments of another answer to this question, building the project made the error go away.
