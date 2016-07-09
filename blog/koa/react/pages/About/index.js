import React,{Component} from 'react'
import { Router, Route, Link } from 'module/router/index.js'

require('./index.scss')

/*
router:
    父组件：获取到子组件，子组件拥有一些属性，比如to component等，这些属性
*/

class List extends Component{
    render(){
        return <div>
            <Link to="/anxiang" className="btn">暗香</Link>
            <Link to="/shuying" className="btn">疏影</Link>
        </div>
    }
}

class Step1 extends Component{

    render(){
        const params = this.props.params

        if(params.id == 'anxiang'){
            return <div>
                暗香<br/>
                旧时月色，算几番照我，梅边吹笛。 <br/>
                唤起玉人，不管清寒与攀摘。 <br/>
                何逊而今渐老，都忘却，春风词笔。 <br/>
                但怪得竹外疏花，香冷入瑶席。 <br/>
                <br/>
                江国，正寂寂。 <br/>
                叹寄与路遥，夜雪初积。 <br/>
                翠尊易泣，红萼无言耿相忆。 <br/>
                长记曾携手处，千树压，西湖寒碧。 <br/>
                又片片吹尽也，几时见得？
            </div>
        }

        return <div>疏影</div>
    }
}

class Step2 extends Component{
    render(){
        return <div>
            哈哈哈哈哈
            <Link to="/step/第三部">下一步</Link>
            {this.props.children}
        </div>
    }
}

class Step3 extends Component{
    render(){
        return <div>
            我是地方但不
        </div>
    }
}

class Home extends Component{
    render(){
        return <div id="about">
            <Router>
                <Route path="/" component={List}></Route>
                <Route path="/:id" component={Step1} />
            </Router>
        </div>
    }
}

export default Home
