## 下拉刷新

let refresh = UIRefreshView() // 新建一个下拉刷新

override func viewDidLoaded(){
    super.viewDidLoaded()

    refresh.addTarget(self, selector: "refFuc", )
    view.addSubs(refresh) // 添加到view
}

// 刷新动作
func refFuc(){

}
