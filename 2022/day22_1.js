console.log("day 3 part 1")

//try 154060 too high

const tests=[
`        ...#
        .#..
        #...
        ....
...#.......#
........#...
..#....#....
..........#.
        ...#....
        .....#..
        .#......
        ......#.

10R5L5R10L4R5L5`
]


function coa(inp){
    [board,instructions] = inp.split("\n\n")

    board = board.split("\n").map(line=>line.split(''))

    //make board square
    let maxX = board.reduce((acc,v)=>Math.max(acc,v.length),0)
    board = board.map(x=>[...x,..." ".repeat(maxX - x.length).split("")])

    instructions = instructions.replaceAll("R","_R_").replaceAll("L","_L_").split("_").map(x=>isNaN(x)?x:parseInt(x))


    let y = 0
    let x = board[y].indexOf(".")

    let me = new Me(board,x,y)

    /*
        3
        |
   2 <- ME -> 0
        |
        1
    */
    



    // printBoard(board,me)

    console.log("INP",instructions)
    // for (const inst of instructions) {
    for (let i = 0; i<500; i++){
        const inst = instructions[i]
        console.log(inst)

        if(isNaN(inst)){
            me.turn(inst)
        }else{
            me.move(inst)
            // printBoard(board,me)

        }
    }
    printBoard(board,me)


    
    out(1000*(me.y+1) + 4*(me.x+1) + me.facing)
}

class Me{
    constructor(grid,x,y,facing = 0){
        this.x=x
        this.y=y
        this.grid=grid
        this.facing = facing
        this.path = []
    }

    turn(dir){
        if(dir=="R"){
            this.facing = (this.facing+1)%4
        }else{
            this.facing = (this.facing-1+4)%4
        }
    }

    move(amount){
        let cont = true


        for(let i=0;i<amount && cont;i++){
            if(this.facing == 0){
                cont = this.moveRight();
            }else if(this.facing == 1){
                cont = this.moveDown();
            }else if(this.facing == 2){
                cont = this.moveLeft();
            }else if(this.facing == 3){
                cont = this.moveUp();
            }


        }
    }

    moveRight(){


        let nextX = this.x+1
        const line = this.grid[this.y]

        if(nextX>=line.length || line[nextX] == " "){
            for (const [i,c] of line.entries()) {
                if(c=="."){
                    nextX=i
                    break
                }else if(c=="#"){
                    return false
                }
            }

        }

        if(line[nextX]=="#") return false

        this.path.push({x:this.x,y:this.y,f:this.facing})
        this.x = nextX

        return true
    }

    moveLeft(){
        let nextX = this.x-1
        const line = this.grid[this.y]

        if(nextX<0 || line[nextX] == " "){
            const j = line.reduce((acc,v,i)=>v!=" "?i:acc)
            const c = line[j]
            if(c=="."){
                nextX=j
            }else if(c=="#"){
                return false
            }

        }


        this.path.push({x:this.x,y:this.y,f:this.facing})
        this.x = nextX

        return true
    }

    moveDown(){
        let nextY = this.y+1

        if(nextY >= this.grid.length || this.col(nextY)==" "){
            for(let i=0;i<this.grid.length;i++){
                const c = this.col(i)
                if(c == "."){
                    nextY = i
                    break
                }else if(c == "#"){
                    return false
                }
            }
        }

        if(this.col(nextY)=="#") return false

        this.path.push({x:this.x,y:this.y,f:this.facing})
        this.y = nextY

        return true
    }

    moveUp(){
        let nextY = this.y-1

        const column = this.grid.map(x=>x[this.x])
        // console.log(column)

        if(nextY <0 || column[nextY]==" "){
            const j = column.reduce((acc,v,i)=>v!=" "?i:acc)
            const c = column[j]
            if(c == "."){
                nextY = j
            }else if(c == "#"){
                return false
            }

        }


        this.path.push({x:this.x,y:this.y,f:this.facing})
        this.y = nextY

        return true

    }

    col(x){
        return this.grid[x][this.x]
    }
}


function printBoard(board,me){
    let show = JSON.parse(JSON.stringify(board))

    
    let dirChar = [">","v","<","^"]
    for (const p of me.path) {
        show[p.y][p.x]=dirChar[p.f]
        
    }

    show[me.y][me.x]="@"

    show = show.map(line=>line.join("")).join("\n")
    out("\n"+show+"\n")
}