


let tests =[
`noop
addx 3
addx -5`
]


let total = 0

function coa(inp){
    const inps = inp.split("\n")
    
    console.log("TOTAL",total)

    let cycles = 0
    let regX = 1

    for (const line of inps) {
        const command = line.split(" ")
        if(command[0]=="noop"){
            cycles++
            // console.log("cycle",cycles,"noop")
            cy(cycles,regX,"noop")
        }else if(command[0]=="addx"){
            cycles++
            // console.log("cycle",cycles,"waiting addx")
            cy(cycles,regX,"addx1 "+command[1])
            
            cycles++
            // console.log("cycle",cycles,"addx",regX)
            cy(cycles,regX,"addx2 "+command[1])
            regX+=Number(command[1])
        }
    }


    out("END cycles:",cycles,"regx",regX)
    out("TOTAL", total)
}

function cy(cycle,regX,fun){
    console.log("cycle",cycle,"regx",regX,fun,total)

    let key =[20,60,100,140,180,220]

    if(key.includes(cycle)){
        let value = cycle*regX
        total+=value
    }
}
