//TODO
//cls()

function appendResult(res){
    document.getElementById("result").appendChild(res)
}
function out(){
    const resultP = document.createElement("P")

    for(let i=0;i<arguments.length;i++){
        resultP.appendChild(getElementForVar(arguments[i]))
    }
    appendResult(resultP)
}

function out2D(arr,size=0,domAnimate=undefined){

    let resultP
    if(domAnimate==undefined){
        resultP = document.createElement("P")
        appendResult(resultP)
        
    }else{
        resultP=domAnimate
        resultP.innerHTML=""
    }
    const pre = document.createElement("PRE")
    resultP.appendChild(pre)


    if(size==0){
        pre.innerHTML=arr.map(y=>y.join("")).join("\n")
    }else{
        pre.innerHTML=arr.map(y=>y.map(x=>" ".repeat(Math.max(0,size-intLength(x)))+x).join("")).join("\n")

    }

    return resultP
    
}

function out2DheatMap(arr,min,max,domAnimate=undefined){

    let resultP
    if(domAnimate==undefined){
        resultP = document.createElement("P")
        resultP.classList.add("heatMap")
        appendResult(resultP)
    }else{
        resultP = domAnimate
        resultP.innerHTML=""
    }
    
    for (const line of arr) {
        const lineDom = document.createElement("P")
        for (const element of line) {
            let box = document.createElement("DIV")
            box.classList.add("box")
            box.onclick=()=>console.log(element)
            box.style.backgroundColor=hsl(map(0,255*2,min,max,element))
            lineDom.appendChild(box)
        }
        resultP.appendChild(lineDom)
    }

    return resultP

}

function outTree(value,tab=0){

    const resultP = document.createElement("P")
    
    
    if(typeof(value)!="object"){
        return getElementForVar(value)
    }

    for (const key in value) {
        if (Object.hasOwnProperty.call(value, key)) {
            const element = value[key];
            const p = document.createElement("P")                    
            const keydom = document.createElement("SPAN")
            keydom.innerHTML='"'+key+'"'
            keydom.classList.add("string")
            p.appendChild(keydom)
            p.appendChild(getElementForVar(element))
            resultP.appendChild(p)
        }
    }

    return resultP

}

function getElementForVar(arg){
    const pre = document.createElement("PRE")
    const span = document.createElement("SPAN")

    const type = typeof(arg)
    switch(type){
        case "object":
            if(!Array.isArray(arg)){//object
                pre.innerHTML=JSON.stringify(arg,undefined,4)
            }else{//array
                const start= document.createTextNode("[")
                const end= document.createTextNode("]")
                span.appendChild(start)
                for(let i=0;i<arg.length;i++){
                    
                    span.appendChild(getElementForVar(arg[i]))
                    if(i<arg.length-1){
                        const separator= document.createTextNode(",")
                        span.appendChild(separator)
                    }
                    
                }
                span.appendChild(end)
                return span
            }
        break;
        case "number":
        case "boolean":
            pre.innerHTML=arg
            pre.classList.add(type)
        break;
        case "string":
            pre.innerHTML='"'+arg+'"'
            pre.classList.add(type)
        break;
        default:
            pre.innerHTML=JSON.stringify(arg)+type
    }
    return pre
}

window.addEventListener("error",(e)=>{
    const txt = `[${e.lineno}:${e.colno}] ${e.type}: ${e.message} `
})

