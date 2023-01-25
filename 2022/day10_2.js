

let tests =[
`noop
addx 3
addx -5`
]



let total = 0
let screen = []

function coa(inp){
    const inps = inp.split("\n")

    for(let i=0;i<6;i++){
        screen.push([])
        for(let j=0;j<40;j++){
            screen[i].push(" ")
        }
    }
    
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


    console.log("END cycles:",cycles,"regx",regX)

}

function printScreen(){
    let result = ""
    result+=screen.map(x=>x.join('')).join("\n")
    out(result)
}

function cy(cycle,regX,fun){
    
    let pixel=(cycle-1)%40
    let xdiff = pixel-regX
    console.log("cycle",cycle,"regx",regX,fun,xdiff)

    if(!(xdiff>1||xdiff<-1)){//light pixel
        screen[Math.floor((cycle-1)/40)][pixel]="#"
    }else{//dark pixel
        screen[Math.floor((cycle-1)/40)][pixel]="."
    }

    printScreen()

    // let key =[20,60,100,140,180,220]

    // if(key.includes(cycle)){
    //     let value = cycle*regX
    //     total+=value
    // }
}
