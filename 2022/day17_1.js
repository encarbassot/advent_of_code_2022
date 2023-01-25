console.log("day 17 part 1")

//try 1846 to low


const tests=[
`>>><<><>><<<>><>>><<<>>><<<><<<>><>><<>>`
]

const rocks = [
    [
        [1,1,1,1]
    ],[
        [0,1,0],
        [1,1,1],
        [0,1,0]
    ],[
        [0,0,1],
        [0,0,1],
        [1,1,1]
    ],[
        [1],
        [1],
        [1],
        [1]
    ],[
        [1,1],
        [1,1]
    ]
]


function coa(inp){
    console.log("BEGIN")
    inp=inp.split("").map(x=>x=="<"?-1:1)
    const w = 7

    const grid = []

    let rockIndex = 0
    let shiftIndex = 0


    
    for(let i=0;i<2022;i++){
        [rockIndex,shiftIndex]=nextDrop(grid,inp,rockIndex,shiftIndex)

        // out(grid.length)
        // printGrid(grid)
    }


    while(grid.length>0 && !grid[grid.length-1].some(x=>x!=0)){
        grid.pop()
    }

    out(grid.length)
    printGrid(grid)

    
}

let shiftHistory = ""

function nextDrop(grid,inp,rockIndex,shiftIndex,print=false){
    
    if(print) out(grid.length)

    pushRock(grid,rocks[rockIndex])
    rockIndex=(rockIndex+1)%rocks.length
    if(print) printGrid(grid,"A new rock begins falling")
    let cont = true
    while(cont){
        let shif = rockShift(grid,inp[shiftIndex])
        if(print) printGrid(grid,"Jet of gas pushes rock "+(inp[shiftIndex]==1?"right":"left")+(shif?"":" but nothing happens"))

        // if(inp[shiftIndex]==1){
        //     shiftHistory+=">"
        // }else{
        //     shiftHistory+="<"

        // }

        shiftIndex=(shiftIndex+1)%inp.length
        cont = rockFall(grid,print)  
        if(print) printGrid(grid,"Rock falls  1 unit"+(cont?"":", causing it to come to rest"))
    }

    return [rockIndex,shiftIndex]
}

function rockFall(grid,print=false){
    let fallingHeight = 0
    let fallingWidth= 0
    let fallingX = grid[0].length
    let fallingY = grid.length
    let foundRock = false

    //calculate coordinates of falling rock
    for(let i=grid.length-1;i>=0;i--){
        const line = grid[i]
        let counter2 = 0
        for (const [j,c] of line.entries()) {
            if(c==2){
                if(!foundRock){
                    fallingY=i
                }
                foundRock=true
                counter2++
                if(j<fallingX){
                    fallingX=j
                }

            }
        }

        fallingWidth = Math.max(fallingWidth,counter2)

        if(counter2==0 && foundRock){
            break
        }
        fallingHeight++
    }

    if(print) console.log("ANALISIS",fallingHeight,fallingY)

    //analyze if it can fall
    let correct = true
    for(let i=fallingX;i<fallingX+fallingWidth && correct;i++){
        if(grid.length-fallingHeight <=0 ){
            //its on the floor
            if(print) console.log("FLOOR")
            correct=false
        }else{
            if(print) console.log(fallingHeight,fallingY,grid.length,correct)
            for(let j=grid.length-fallingHeight;j<=fallingY && correct;j++){
                let p = grid[j][i]
                let f = grid[j-1][i]
                
                if(print) console.log("TEST",p,f)
                if(p==2){
                    if(f==1){
                        correct = false
                    }
                    break
                }
                if(print) console.log(f,p,correct)

            }
        }

        // if(grid.length-fallingHeight <=0 ){
        //     correct=false
        // }else{
        //     const v = grid[grid.length-fallingHeight][i]
        //     if(v==2){
        //         if(grid[grid.length-fallingHeight-1][i]!=0){
        //             //elemento inferior no es 0
        //             correct=false
        //         }else{

        //         }
        //     }
        // } 
    }


    for(let i=fallingX;i<fallingX+fallingWidth;i++){ //each column left to right
        for(let j=grid.length-fallingHeight;j<grid.length;j++){ //each row bottom to top
            const v = grid[j][i]
            if(correct){
                if(v==2){
                    if(print) console.log("FALL")
                    grid[j-1][i]=2
                    grid[j][i]=0
                }
            }else{
                if(v==2){
                    if(print) console.log("STAY")
                    grid[j][i]=1
                }
            }
        }
    }

    // if(correct){
    //     if(!grid[grid.length-1].some(x=>x!=0)){
    //         //if top line is empty
    //         grid.pop()
    //     }
    // }

    return correct
}

function rockShift(grid,shift){
    let correct = true
    let foundRock = false


    for(let i=grid.length-1;i>=0 && correct;i--){
        const line = grid[i]
        
        

        
        //check if shift is NOT possible
        let prev
        if(shift==1){//to the right

            for(let j=line.length-1;j>=0;j--){
                let v = line[j]
                if(v==2){
                    foundRock=true
                    if(j==line.length-1){
                        correct=false
                    }else if(prev!=0){
                        correct=false
                    }
                                        
                    break
                }
                prev = v
            }
        }else{//to the left
            for(let j=0;j<line.length;j++){
                let v = line[j]
                if(v==2){
                    foundRock=true
                    if(j==0){// 2 ya esta en el margen
                        correct=false
                    }else if(prev!=0){
                        //algo le inpide
                        correct=false
                    }
                    break//solo comprueba las del margen
                }
                prev = v
            }
        }

        if(!line.some(x=>x==2) && foundRock){
            break
        }
    }


    if(!correct) return false
    foundRock=false

    for(let i=grid.length-1;i>=0 && correct;i--){
        const line = grid[i]
        if(!line.some(x=>x==2)&&foundRock){
            break
        }
        
        
        //proceed to shift
        if(shift==1){//to the right

            for(let j=line.length-1;j>=0;j--){
                let v = line[j]
                if(v==2){
                    foundRock=true
                    line[j+1] = 2
                    line[j]=0
                    
                }
            }
        }else{//to the left
            for(let j=0;j<line.length;j++){
                let v = line[j]
                if(v==2){
                    foundRock=true
                    line[j-1] = 2
                    line[j]=0
                }
            }
        }
    }
    //shift the piece

    return true
}



function pushRock(grid,rock){
    //TODO make sure there are 3 gaps since last rock/floor

    while(grid.length>0 && !grid[grid.length-1].some(x=>x!=0)){
        grid.pop()
    }

    for(let i=0;i<3;i++){
        grid.push([0,0,0,0,0,0,0])
    }

    for(let i=0;i<rock.length;i++){//height of rock
        const line = []
        line.push(0,0) //two gaps on the left
        line.push(...rock[rock.length-1-i].map(x=>x*2))
        while(line.length<grid[0].length){
            line.push(0)
        }
        grid.push(line)
    }
}

function printGrid(grid,text=""){
    let result ="+-------+"

    let disp = ['.','#','@']
    for (const line of grid) {
        result="|"+line.map(x=>disp[x]).join("")+"|\n"+result
    }

    out(text+"\n"+result)
}
