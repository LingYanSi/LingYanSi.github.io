
function vd(htmlObj, data){
    // 将所有变量，转换成数据
    if(vd.nodeType==1){
        // htmlObj.properties.forEach()
    }else if(vd.nodeType == 3){
        htmlObj.text = operation(htmlObj.text, data)
    }
    return htmlObj
}
