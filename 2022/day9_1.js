let tests =[
`R 4
U 4
L 3
D 1
R 4
D 1
L 5
R 2`
]



function coa(inp){
    const inps = inp.split('\n')
   
    let total = 0

    let board = new Board()

    // board.move("U",5)
    // board.move("R",4)
    // board.move("D",4)
    // board.move("L",7)
    // board.move("U",4)
    
    // board.print()


    


    for (const op of inps) {
        let operation = op.split(' ')
        let direction = operation[0]
        let amount = Number(operation[1])
        //console.log(direction,amount)
        board.move(direction,amount)
    }


    board.print()


}

class Board{
    constructor(){
        this.h = new Head()
        this.t = new Tail()
        this.grid = []

        const n = 1000

        this.xoff=n/2
        this.yoff=n/2

        this.width=n
        this.heigt=n

        for(let i=0;i<this.heigt;i++){
            this.grid.push([])
            for(let j=0;j<this.width;j++){
                this.grid[this.grid.length-1].push('.')
            }
        }




    }

    move(x,amount){
        switch(x){
            case "U":
                for(let i=0;i<amount;i++){
                    this.mv(0,-1)
                }
                break;
            case "D":
                for(let i=0;i<amount;i++){
                    this.mv(0,1)
                }
                break;
            case "L":
                for(let i=0;i<amount;i++){
                    this.mv(-1,0)
                }
                break;
            case "R":
                for(let i=0;i<amount;i++){
                    this.mv(1,0)
                }
                break;
        }
    }

    mv(x,y){
        this.h.x+=x
        this.h.y+=y
        this.makeSafe()

        this.tailMove()
        // this.print()
    }

    tailMove(){

        let xDiff = this.h.x - this.t.x
        let yDiff = this.h.y - this.t.y
        // console.log(xDiff,yDiff)
        //tail can move 8 directions

        if(xDiff==0&&yDiff==0) return //same spot

        if(xDiff==0){//upp or down
            if(yDiff>1){//down
                this.t.y++
            }else if(yDiff<-1){//up
                this.t.y--
            }
        }

        if(yDiff==0){//left or right
            if(xDiff>1){//move right
                this.t.x++
            }else if(xDiff<-1){//move left
                this.t.x--
            }
        }

        //diagonals
        if(xDiff==2&&yDiff==1  ||  xDiff==1&&yDiff==2){ //right down
            this.t.x++
            this.t.y++
        }

        if(xDiff==1&&yDiff==-2  ||  xDiff==2&&yDiff==-1){ //right up
            this.t.x++
            this.t.y--
        }

        if(xDiff==-2&&yDiff==-1  ||  xDiff==-1&&yDiff==-2){ //left up
            this.t.x--
            this.t.y--
        }

        if(xDiff==-1&&yDiff==2  ||  xDiff==-2&&yDiff==1){ //left down
            this.t.x--
            this.t.y++
        }

        this.grid[this.t.y+this.yoff][this.t.x+this.xoff]="#"

    }

    makeSafe(){
        while(this.h.y>=this.heigt){
            this.heigt++
            this.grid.push(".".repeat(this.width).split(""))
        }
        
        while(this.h.y+this.yoff<0){
            this.heigt++
            this.yoff++
            this.grid.unshift(".".repeat(this.width).split(""))
        }

        while(this.h.x>=this.width){
            this.width++
            for (const line of this.grid) {
                line.push('.')
            }
        }

        while(this.h.x+this.xoff<0){
            this.width++
            this.xoff++
            for (const line of this.grid) {
                line.unshift('.')
            }
        }


    }

    print(){
        
        let total = this.grid.map(x=>x.join("")).join("").split("").filter(x=>x=="#").length

        let result=""

        let grid = JSON.parse(JSON.stringify(this.grid));

        grid[this.yoff][this.xoff]='s'
        grid[this.t.y+this.yoff][this.t.x+this.xoff]="T"
        grid[this.h.y+this.yoff][this.h.x+this.xoff]="H"

        for (const line of grid) {
            result+=line.join("")+"\n"
        }

        
        
        out(result)
        out(`TOTAL`,total)
    }
}

class Head{

    constructor(){
        this.x=0
        this.y=0
    }
}

class Tail{
    constructor(){
        this.x=0
        this.y=0
    }
}
