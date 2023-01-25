console.log("day 3 part 1")

//try 3196 not 
//try -9051 not

const tests=[
`1
2
-3
3
-2
0
4`,
`4
5
6
1
7
8
9`,
`1
2
3
-1
0
0
0
0
0`
]

function coa(inp){
    inp = inp.split("\n").map(x=>({n:Number(x),moved:false}))
    out("LENGTH", inp.length)

    out(inp.map(x=>x.n))

    for(let i=0;i<inp.length;i++){
        mix(inp)
        out(inp.map(x=>x.n))
    
    }


    out("RESULT")

}


function mix(arr){
    const i = arr.findIndex(x=>!x.moved)
    const p = arr[i]
    p.moved = true
    
    let newI = i + p.n

    if(newI<0){
        newI--
    }

    while(newI<0){
        newI += arr.length
    }


    console.log(p,i,newI)

    arr.splice(i,1)

    arr.splice(newI,0,p)


}


