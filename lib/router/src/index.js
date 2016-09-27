

(function(){
    let a = Com(function(props){
        console.log(props); 
        return `<div>
            <h1>这是首页嫩</h1>
            <ul>
                <li><a href="/a/我怎么知道呢">页面一</a></li>
                <li><a href="/b">页面二</a></li>
            </ul>
        </div>`
    })

    register('/', a)
})()
