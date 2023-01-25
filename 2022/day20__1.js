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
    // out(inp.map(x=>x.n))
        
    }
    out(inp.map(x=>x.n))

    const v = getValues(inp)

    out("RESULT",v)

}

function getValues(inp){
    const i = inp.indexOf(0)
    const a = inp[(i+1000-2)%inp.length].n
    const b = inp[(i+2000-2)%inp.length].n
    const c = inp[(i+3000-2)%inp.length].n
    return a+b+c
}

function mix(inp){

    const i = inp.findIndex(x=>!x.moved)
    const e = inp[i]
    e.moved=true
    // console.log(e.n,inp.map(x=>x.n))

    if(e.n==0)return

    //take out the value
    inp.splice(i,1)[0]

    const n = e.n>=0?i+e.n:i+e.n

    if(n==0){
        inp.push(e)
        return
    }

    //reinsert the value
    inp.splice(n%inp.length,0,e)
    // console.log(e.n,inp.map(x=>x.n))
    return e

}
