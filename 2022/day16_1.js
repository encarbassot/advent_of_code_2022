console.log("day 16 part 1")

//try 1522 too low
//try 1796 too low
//try 1841 too low

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
let totalResult = 0
let totalCounter = 0

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

    let minutes = 30
    
    const [names,flows,conns] = readInp(inp)
    
    const fw = floydWarshall(conns)

    const start = 0
    const visited = [...Array(fw.length)].map(x=>false)

    dfs(fw,start,minutes,flows,visited,[])
    out("TOTAL",totalResult)
    
    out2D(fw)
    out(inp)
    
}


function dfs(fw,me,minutes,flows,visited,path,total=0){
    // console.log("PATH",me,">",path.join(","))
    visited[me]=true
    path.push(me)
    if(minutes<=0){
        totalCounter++
        if(total>totalResult){
            totalResult=total
            console.log("RESULT ",total,totalResult)
        }

        if(totalCounter%1000000==0){
            console.log(totalCounter,"iterations")
        }
        return
    }
    // console.log("MINUTES",minutes)
    
    const neighbours= getNext(fw,me,minutes,flows)
    // console.log("NEI",neighbours,dists)

    const n1 = Math.floor(neighbours.length/2)
    const n2 = neighbours.length-n1

    for(let i=0;i<n1;i++){
        const n = neighbours[i]
        if(n!=me && !visited[n]){
            const d = fw[me][n]
            // console.log("DIST",d)
            //walk
            let nMins = minutes - d
            //open the gate
            nMins--
            // console.log("NMINS",nMins)
            const nTotal = total + flows[n]*nMins

            //next
            dfs(fw,n,nMins,flows,cp(visited),cp(path),nTotal)
        }
    }

    

    for(let i=n1;i<n2;i++){
        const n = neighbours[i]
        if(n!=me && !visited[n]){
            const d = fw[me][n]
            // console.log("DIST",d)
            //walk
            let nMins = minutes - d
            //open the gate
            nMins--
            // console.log("NMINS",nMins)
            const nTotal = total + flows[n]*nMins

            //next
            dfs(fw,n,nMins,flows,cp(visited),cp(path),nTotal)
        }
    }

}

function cp(arr){
    return arr.map(x=>x)
}


function getNext(fw,me,minutes,flows){

    const result = [...Array(fw.length)].map((x,i)=>i)
    result.sort((a,b)=>{
        let distA = fw[a][me]
        let distB = fw[b][me]

        let ptA = flows[a] * (minutes-distA-1)
        let ptB = flows[b] * (minutes-distB-1)

        return ptB - ptA
    })

    return result
}


function readInp(inp){
    
    const res =  inp.split("\n").map(line=>line.split(" ")).map((line,i)=>{
        let result = {
            id:line[1],
            i:i,
            flow:Number(line[4].split("=")[1].split(";")[0]),
            con:[]
        }
        for(let i=9;i<line.length;i++){
            result.con.push(line[i].split(",")[0])
        }
        return result
    })

    // return res
    const names =[]
    const flows=[]
    let conns=[]

    for (const {id,flow,con} of res) {
        names.push(id)
        flows.push(flow)
        conns.push(con)
    }

    conns = conns.map(c=>c.map(x=>names.indexOf(x)))

    return [names,flows,conns]

}



function floydWarshall(conns){
    const INF = 99999


    let dist = []
    // let rec = []
    
    for (const [i,con] of conns.entries()) {
        dist.push([])
        // rec.push([])
        for (const [j,conb] of conns.entries()) {
            let line = dist[dist.length-1]
            // let recLine = rec[rec.length-1]
            if(i==j){
                line.push(0)
                // recLine.push("--")
            }else{
                line.push(con.includes(j)?1:INF)
                // recLine.push(b)
            }
        }
    }

    out2D(dist.map(line=>line.map(x=>x==INF?"INF":x)),3)
    
    for(let k=0;k<conns.length;k++){
        for(let j=0;j<conns.length;j++){
            for(let i=0;i<conns.length;i++){
                if(dist[i][j] > dist[i][k] + dist[k][j]){
                    dist[i][j] = dist[i][k] + dist[k][j]
                }
            }
        }
    }

    // out2D(dist)
    // out2D(rec)
    return dist
}