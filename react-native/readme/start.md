## 教程

- npm install react-native-cli -g
- react-native init demo
- cd demo
- react-native run-ios
- npm run start

此时不出所料，就会看到初始界面了
Press Cmd+R to reload
Cmd+D or shake for dev menu

Cmd+D 会显示菜单，比如hot reload等选项

打开
http://localhost:8081/debugger-ui
调试程序

在mac上调试时，并不需要打开xcode，一般而言xcode的用处在于更改 jsCodeLocation
```
jsCodeLocation = [NSURL URLWithString:@"http://192.168.1.14:8081/index.ios.bundle?platform=ios&dev=true"];
```
