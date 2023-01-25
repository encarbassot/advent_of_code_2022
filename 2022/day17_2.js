console.log("day 17 part 1")

//try 1846 to low


const tests=[
`>>><<><>><<<>><>>><<<>>><<<><<<>><>><<>>`
]

const rocks = [
    [
        0b0,
        0b0,
        0b0,
        0b1111
    ],[
        0b0,
        0b010,
        0b111,
        0b010
    ],[
        0b0,
        0b111,
        0b001,
        0b001
    ],[
        0b1,
        0b1,
        0b1,
        0b1,
    ],[
        0b0,
        0b0,
        0b11,
        0b11
    ]
]
const rocksW=[4,3,3,1,2]
const rocksH=[1,3,3,4,2]

let plugs = [0,0,0,0,0,0,0]


class Rock{
    constructor(grid,w,rocks,rocksW,rocksH,i){
        this.grid = grid
        this.gridW = w
        this.w=rocksW[i]
        this.h=rocksH[i]
        this.rock = rocks[i]
        this.placed = false

        this.x = 2
        this.y = -3
    }

    fall(grid){
        if(this.intersectsFall(grid)){
            this.placeRock(grid)
            this.placed=true

            return false
        }

        this.y++
        return true
    }

    shift(grid,sh){
        if(this.intersectsX(grid,sh)){
            return false
        }

        this.x+=sh
        return true
    }

    intersectsX(grid,shift){
        if((shift == 1 && this.gridw<=this.w+this.x) // right
        ||(shift==-1 && this.x==0)){                 // left
            return true
        }else{//can shift
            for(let i=0;i<this.h;i++){
                const j = this.y-i-1
                if(j>=0&&j<grid.length){
                    const line = grid[j]
                    const r = this.rock[this.rock.length-1-i] << (this.gridW-this.w-this.x-shift)
                    if(r&line){
                        return true
                    }
                }
                // console.log(this.rock[this.rock.length-1-i])
            }
        }

        return false
    }

    intersectsFall(grid){
        if(grid.length-this.y-1<0){
            return true
        }
        
        //check colisions
        if(grid.length>0){
            
            for(let i=0;i<this.h;i++){
                const j = this.y-i-1
                if(j>=0&&j<grid.length){
                    const line = grid[grid.length-1-j]
                    const r = this.rock[this.rock.length-1-i] << (this.gridW-this.w-this.x)
                    console.log("FALL",j,line.toString(2),r.toString(2))
                    if(r&line){
                        return true
                    }
                    // else{
                        // console.log(
                        // line.toString(2)
                        // ,r.toString(2)
                        // ,(line&r).toString(2)
                        // ,(line|r).toString(2))

                    // }
                }
                // console.log(this.rock[this.rock.length-1-i])
            }
        }

        return false
    }





    placeRock(grid){

        let rowsToPlace = this.h - this.y

        for(let i=0;i<rowsToPlace;i++){
            grid.push(0)
        }


        for(let i=0;i<this.h;i++){
            // out(grid.length-1-i-(this.y-3),this.y-this.h)
            if(this.y-this.h>0){
                console.log("A")
                const gridI = grid.length-1-i-(this.y-3)-1
                grid[gridI]=grid[gridI]|(this.rock[this.rock.length-1-i]<<(this.gridW-this.w-this.x))
            }else{
                console.log("B")
                grid[grid.length-1-i]=grid[grid.length-1-i]|(this.rock[this.rock.length-1-i]<<(this.gridW-this.w-this.x))
            }
        }

        return grid
    }
}

////////////////////////////////////////////////////////////////
function coa(inp){
    console.log("BEGIN")
    inp=inp.split("").map(x=>x=="<"?-1:1)
    const w = 7
    
    let grid = []
    let rockIndex = 0
    
    let fallingRock = new Rock(grid,w,rocks,rocksW,rocksH,rockIndex)
    rockIndex = (rockIndex+1)%rocks.length
    // printGrid(grid,fallingRock)

    // fallingRock.shift(grid,1)
    // printGrid(grid,fallingRock)

    fallingRock.fall(grid)
    fallingRock.fall(grid)
    fallingRock.fall(grid)
    fallingRock.fall(grid)//placed
    // printGrid(grid,fallingRock)


    fallingRock = new Rock(grid,w,rocks,rocksW,rocksH,rockIndex)
    rockIndex = (rockIndex+1)%rocks.length
    fallingRock.fall(grid)
    fallingRock.fall(grid)
    fallingRock.fall(grid)
    fallingRock.shift(grid,-1)
    fallingRock.shift(grid,-1)
    fallingRock.fall(grid)
    fallingRock.fall(grid)

    fallingRock = new Rock(grid,w,rocks,rocksW,rocksH,3)
    fallingRock.fall(grid)
    fallingRock.shift(grid,-1)
    // fallingRock.shift(grid,-1)
    fallingRock.fall(grid)
    fallingRock.fall(grid)
    // fallingRock.fall(grid)
    // fallingRock.fall(grid)
    fallingRock.fall(grid)
    fallingRock.fall(grid)
    fallingRock = new Rock(grid,w,rocks,rocksW,rocksH,4)
    fallingRock.shift(grid,1)
    fallingRock.shift(grid,1)
    fallingRock.fall(grid)
    fallingRock.fall(grid)
    fallingRock.fall(grid)
    printGrid(grid,fallingRock)

    fallingRock.fall(grid)


    fallingRock.fall(grid)
    printGrid(grid,fallingRock)
    fallingRock.fall(grid)


    printGrid(grid,fallingRock)
    fallingRock.fall(grid)


    printGrid(grid,fallingRock)
    fallingRock.fall(grid)


    printGrid(grid,fallingRock)
    fallingRock.fall(grid)


 

    // printGrid(grid,fallingRock)
    
    // printGrid(grid,fallingRock)
    
    
    
    // fallingRock.fall(grid)
    // // printGrid(grid,fallingRock)
    
    // fallingRock.fall(grid)
    // fallingRock.fall(grid)
    // printGrid(grid,fallingRock)
    // console.clear()
    // fallingRock.fall(grid)




    printGrid(grid,fallingRock)


}


function printGrid(grid,falling,w=7){
    let nGrid = grid.map(x=>x)

    if(!falling.placed){
        falling.placeRock(nGrid)
    }

    // console.log(grid.map(x=>x.toString(2))
    //     ,nGrid.map(x=>x.toString(2))
    //     )

    let result = ""

    for(let i=grid.length-1;i>=0;i--){
        let line = "|"
        for(let j=0;j<w;j++){
            const g = grid[i] & 1<<j
            const h = nGrid[i] & 1<<j
            if(h){
                line = (g&h?'#':'@') + line
            }else{
                line = '.'+line
            }
        }
        result = result +"\n"+ "|"+line 
    }

    for(let i=grid.length;i<nGrid.length;i++){
        let line = "|"
        for(let j=0;j<w;j++){
            const h = nGrid[i] & 1<<j
            line = (h?'@':'.') + line
        }
        result = "\n"+ "|"+line+result
    }

    out(result+"\n+"+"-".repeat(w)+"+\n")
}

