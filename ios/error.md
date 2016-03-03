## 常见错误
- ```Expression resolves to an unused function```  
#### 代码复现
```swift
alert.addAction(UIAlertAction(title: "确认", style: UIAlertActionStyle.Default, handler: {(alert: UIAlertAction!) in self.alertDeafault } )) 
```
#### 解决
此时说明 ```self.alertDeafault``` 是一个函数，但这里函数应该被执行，即: ```self.alertDeafault()```   
[stackoverflow](http://stackoverflow.com/questions/29548378/expression-resolves-to-an-unused-function)
