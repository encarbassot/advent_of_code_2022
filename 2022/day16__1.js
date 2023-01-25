console.log("day 3 part 1")

let tests=[
`Valve AA has flow rate=0; tunnels lead to valves DD, II, BB
Valve BB has flow rate=13; tunnels lead to valves CC, AA
Valve CC has flow rate=2; tunnels lead to valves DD, BB
Valve DD has flow rate=20; tunnels lead to valves CC, AA, EE
Valve EE has flow rate=3; tunnels lead to valves FF, DD
Valve FF has flow rate=0; tunnels lead to valves EE, GG
Valve GG has flow rate=0; tunnels lead to valves FF, HH
Valve HH has flow rate=22; tunnel leads to valve GG
Valve II has flow rate=0; tunnels lead to valves AA, JJ
Valve JJ has flow rate=21; tunnel leads to valve II`,
`Valve AA has flow rate=30; tunnels lead to valves DD, II, BB
Valve BB has flow rate=13; tunnels lead to valves CC, AA
Valve CC has flow rate=2; tunnels lead to valves DD, BB
Valve DD has flow rate=20; tunnels lead to valves CC, AA, EE
Valve EE has flow rate=3; tunnels lead to valves FF, DD
Valve FF has flow rate=0; tunnels lead to valves EE, GG
Valve GG has flow rate=0; tunnels lead to valves FF, HH
Valve HH has flow rate=22; tunnel leads to valve GG
Valve II has flow rate=0; tunnels lead to valves AA, JJ
Valve JJ has flow rate=21; tunnel leads to valve II`,
`Valve AA has flow rate=0; tunnels lead to valves DD, II, BB
Valve BB has flow rate=13; tunnels lead to valves CC, AA
Valve CC has flow rate=2; tunnels lead to valves DD, BB
Valve DD has flow rate=20; tunnels lead to valves CC, AA, EE
Valve EE has flow rate=3; tunnels lead to valves DD
Valve II has flow rate=0; tunnels lead to valves AA, JJ
Valve JJ has flow rate=21; tunnel leads to valve II`
]


/*
        JJ21
        |
        II0
        |
        AA0 -- DD20 -- EE3 -- FF0 -- GG0 -- HH22
        |      |
        BB13-- CC2


        AA -- BB
        |
        CC

*/  

let valves = {}

function coa(inp){
    out(`  JJ21
    |
   II0
    |
   AA0 -- DD20 -- EE3
    |      |       |
   BB13-- CC2     FF0
                   |
                  GG0
                   |
                  HH22`)



    inp = inp.split("\n").map(line=>line.split(" ")).map(line=>{
        let result = {
            id:line[1],
            flow:Number(line[4].split("=")[1].split(";")[0]),
            nei:[],
            open:false,
            openMinute:-1
        }
        for(let i=9;i<line.length;i++){
            result.nei.push(line[i].split(",")[0])
        }
        return result
    })

    // let valves = {}
    for (const [i,v] of inp.entries()) {
        valves[v.id] = v
        valves[v.id].i = i
    }

    let minutes = 30
    let start = valves[inp[0].id]

    
    // let c = cost(valves,valves["AA"],valves["CC"])
    // console.log("cost is ",c)
    
    // let s = sortValves(valves,start,minutes)
    // console.log(s)

    move(valves,start,minutes)
}




function move(valves,me,minutes,prev=[]){
    // console.log(me.id,me.openMinute,minutes)
    prev.push(me.id)
    
    let nei = sortValves(valves,me,minutes,true)
    // console.log("NEI",nei)
    
    
    if(minutes<=0||nei.length==0){
        console.log(
            // "RESULT",valves,
        Object.values(valves).reduce((acc,v)=>{
            return acc+(v.open?(v.openMinute*v.flow):0)
        },0))
        return
    }

    for (const next of nei) {
        const valvesCP = copy(valves)        
        if(next.id == me .id){
            //itsme
            console.log("ITSME")
    
        }else{
            let path = valvePath(valvesCP,me,next)
            //move
            // console.log("moving to ",next.id,"length of",path.length)
            minutes-= path.length
            //open the gate
            valvesCP[next.id].open=true
            valvesCP[next.id].openMinute=minutes
            minutes--
            console.log(next.id,"<",prev.join(),">",nei.map(x=>x.id).join(","))
    
            // console.log("NOTME",minutes,path,next)
            move(valvesCP,next,minutes,copy(prev))
        }
    }    
    


}


function sortValves(valves,start,minutes,self=false){
    let result = []
    
    for (const key in valves) {
        let v = valves[key]
        if(!v.open && v.flow>0){
            let path = valvePath(valves,start,v)

            // if(path.length<minutes+1){
                result.push(v)
            // }
        }
    }



    // result = result.filter(x=>valveDistance(valves,start,x)<minutes)

    return result.sort((a,b)=>{
        let minA = minutes - (valveDistance(valves,start,a)+1)
        let minB = minutes - (valveDistance(valves,start,b)+1)
        // return minA*a.flow-minB*b.flow
        // return (minB*b.flow)-(minA*a.flow)
        return minB*b.flow - a.flow*minA
    })

}



function copy(obj){
    return JSON.parse(JSON.stringify(obj))
}

function valveDistance(valves,from,to){
    return valvePath(valves,from,to).length
    
}

function valvePath(valves,from,to){
    //find the path
    const visited = {}
    for (const key in valves) {
        visited[key]=false
    }
    
    let path = valveDist_req(valves,from,to,[],visited)
    return path
    
}

function valveDist_req(valves,me,to,path,visited){
    path.push(me)
    visited[me.id]=true
    let nei = getNei(valves,me)
    if(nei.some(x=>x.id==to.id)){
        return path
    }
    
    let c
    for (const n of nei) {
        if(!visited[n.id]){
            c = valveDist_req(valves,n,to,path,visited)
            if(c.length>0)return c
        }
    }

    return []

}

function getNei(valves,val){
    return val.nei.map(n=>valves[n]).sort((a,b)=>b.flow-a.flow)
}