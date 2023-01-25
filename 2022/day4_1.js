console.log("day 4 part 1")

let tests=[
`2-4,6-8
2-3,4-5
5-7,7-9
2-8,3-7
6-6,4-6
2-6,4-8`,
`2-4,6-8
2-3,4-5
5-7,7-9
2-8,3-7
6-6,4-6
2-6,4-8
12-37,37-37
1-2,3-4
1-3,2-4
1-3,1-2
1-3,1-3
2-3,1-3`,
`1-2,3-4
4-3,2-1
9-5,8-3
2-7,5-9`
]

function coa(inp){
    inp = inp.split("\n")
    
    let total=0
    for(line of inp){
        const[[a,b],[c,d]] = line.split(",").map(x=>x.split("-").map(y=>Number(y)).sort((a,b)=>a-b))

        if(a>=c && b<=d || c>=a && d<=b){
            total++
        }
    }
    
    out("TOTAL:",total)
}



