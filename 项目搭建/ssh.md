# SSH
简单说，SSH是一种网络协议，用于计算机之间的加密登录。
如果一个用户从本地计算机，使用SSH协议登录另一台远程计算机，我们就可以认为，这种登录是安全的，即使被中途截获，密码也不会泄露。

## 登录
```
ssh -p 端口号 username@127.0.0.1
```
然后会提示输入密码，然而每次都输入密码是坑爹的

## 免密码登录
```
ssh-keygen
```
一路回车，直到结束
```
ssh-copy-id user@host
```

## 高级功能

## 添加到git账户中
```
cat /Users/wangyong/.ssh/id_rsa.pub

ssh-rsa axxbbxxxcvfgfgdfgdfgdfgdfg/qM754YYRd4w1s/sasddsfsdfsdfsdf/zZoueuWGIc6YMNtEyBDgdngkfD8IpNhSsZXQEoO1tfZ+2/TRNGdh6P8btb9ZZ3cr5Unrs3HNbhGoZYCcM17UTMqODy50ujreg7XtaQtbIYtl0X+ifQyo5IhcuU4W0xFIcUyf23g2F9ga4Dk8RBPTBVDHVo3TIRhe7p9km5J3BtdamfTJFdk/+3Jk099Ant8r671bRGshZ7yX/cFoGJfRPVKt/2fUm4yaaV+LyOjpbt wangyong@wangyongdeMacBook-Pro.local
```
把id_rsa.pub添加到秘钥里

### notice
在github上，似乎不用添加后面的 ** wangyong@wangyongdeMacBook-Pro.local ** , 而在gitlab上则必须要添加上，不然会导致git操作频繁失败 😁🐶
