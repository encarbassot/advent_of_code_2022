console.log("day 19 part 1")

const tests=[
`Blueprint 1: Each ore robot costs 4 ore. Each clay robot costs 2 ore. Each obsidian robot costs 3 ore and 14 clay. Each geode robot costs 2 ore and 7 obsidian.
Blueprint 2: Each ore robot costs 2 ore. Each clay robot costs 3 ore. Each obsidian robot costs 3 ore and 8 clay. Each geode robot costs 3 ore and 12 obsidian.`
]


function readInp(inp){
    return inp.split("\n").map(line=>line.split(" ")).map(line=>({

        id:Number(line[1].split(":")[0]),
        oreCost:Number(line[6]),//ore
        clayCost:Number(line[12]),//ore
        obsCost:[Number(line[18]),Number(line[21])],//ore,clay
        geodeCost:[Number(line[27]),Number(line[30])],//ore,clay


    }))
}

function coa(inp){
    inp = readInp(inp)

    let bluePrint=0
    let minutes = 24

    //ORE CLAY OBSIDIAN GEODE
    let robots=[1,0,0,0]
    let material=[0,0,0,0]



    for(let i=1;i<=minutes;i++){
        material = material.map((x,i)=>x+robots[i])
        print(i,robots,material)
    }
    out(inp)
}

function print(i,robots,material){
    let text = "minute "+i+"\n"
    const names=["ORE ","CLAY","OBSI","GEOD"]
    for(let i=0;i<robots.length;i++){
        text+=robots[i]+" "+names[i]+" robot collects, you now have "+material[i]+" "+names[i]+"\n"
    }

    console.log(text)
}
