

(function(){
    let a = Com(function(props){
        console.log(props);
        return `<div>
            <a href="/b">藤王阁序</a>
            <h1>${props.params.id}是个大傻逼</h1>
        </div>`
    })

    register('/a/:id', a)
})()
