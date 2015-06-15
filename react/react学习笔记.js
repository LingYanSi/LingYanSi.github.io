React是Facebook出的一个前端库，主要应用于instagram
React解决的是MVC中的V，React并不在意数据的怎么获取
如果新的数据进来，React会自动刷新组件

React比较快是因为使用了virtual dom【虚拟dom】，其实也就是把dom树映射了一个js对象
当一个组件作出改变后，React会计算出最优解，然后渲染

不应该使用js来增删真实的DOM，这些工作应该交给React来处理

一般而言，一个组件可变动数据是从this.state上获取的，
如果有新的数据进来，需要设置 this.setState({}) ,然后组件就会重新渲染

如果说view层做出【增删改查】，他应该先经过model，model上监听到change后，再更新到view上
// 那么这里有一个问题是，如果我先更新到view上，同时把数据上传到服务器，然后在获取，这样子是不是更好呢？
// 但有个问题，就是如果此时网络很差，无法post到服务器，那不就坑爹了？
因此是不是说【react+backbone】大法好呢？


React创建一个组件，组件名首字母要大写
var Zu = React.createClass({}) ;

子组件通过 this.props 来和父组件通信
兄弟组件也是通过父组件来通信
