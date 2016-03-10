## http请求
用到两个包
```
pod 'Alamofire', '~> 3.2.1'
pod 'SwiftyJSON', '~> 2.3.2'
```
*Alamofire* 用来处理http请求
*SwiftyJSON* 用来处理JSON数据

### 实例
```
import Alamofire
import SwiftJSON

Alamofire.request(.GET, "http://localhost:3000/api", parameters: ["foo": "bar"])
   .responseJSON { response in
       print(response.request)  // original URL request
       print(response.response) // URL response
       print(response.data)     // server data
       print(response.result)   // result of response serialization

       switch response.result {
           case .Success :
               if let json = response.result.value {
                   print("JSON: \(json)")
                   print( JSON(json)["cunt"] )
               }
           case .Failure(let error ) :
                   print(error )
       }

}
```

### 基础相关
