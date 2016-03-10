## 如何给一个图片添加事件
[链接](http://www.cocoachina.com/bbs/read.php?tid-296080.html)

```swift
let image:UIImage? = UIImage(named: "test.png")
let imageView: UIImageView = UIImageView()
imageView.image = image!
/////设置允许交互属性
imageView.userInteractionEnabled = true

/////添加tapGuestureRecognizer手势  
let tapGR = UITapGestureRecognizer(target: self, action: "tapHandler:")
imageView.addGestureRecognizer(tapGR)

//////手势处理函数
func tapHandler(sender:UITapGestureRecognizer) {
        ///////todo....
}
```

## 滚动中
```
func scrollViewDidScroll(){
    // self.scrollview.contentOffset.y
}
```
