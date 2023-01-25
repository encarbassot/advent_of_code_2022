
let tests =[
`R 4
U 4
L 3
D 1
R 4
D 1
L 5
R 2`,
`R 5
U 8
L 8
D 3
R 17
D 10
L 25
U 20`
]



let board
function coa(inp,n=1000){
    const inps=inp.split("\n")
    let total = 0
    board = new Board(n)


    // board.move("U",5)
    // board.move("R",5)
    // board.move("U",8)
    // board.move("L",7)
    // board.move("U",4)
    


    


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
    constructor(n=100){
        this.grid = []
        
        
        
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
        
        this.h = new Head(this,8,n)



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
        this.h.move(x,y)
        
        //this.makeSafe() // if its 1000x1000 not needed

        

        // this.print()
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

        let grid = this.h.print()//JSON.parse(JSON.stringify(this.grid));

        // grid[this.yoff][this.xoff]='s'
        // grid[this.t.y+this.yoff][this.t.x+this.xoff]="T"
        // grid[this.h.y+this.yoff][this.h.x+this.xoff]="H"

        for (const line of grid) {
            result+=line.join("")+"\n"
        }

        
        
        out(result)
        out(`TOTAL`,total)
    }
}

class Head{

    constructor(parent,n=0){
        this.board=parent

        this.x=0
        this.y=0
        this.n=n

        
        if(n==0){
            this.t = new Tail(this.board,n)
        }else{
            this.t=new Head(this.board,n-1)
        }

    }

    move(x,y){
        this.x+=x
        this.y+=y

        this.tailMove()
    }

    print(){
        if(this.n==0){
            let grid = JSON.parse(JSON.stringify(this.board.grid));

            grid[this.board.yoff][this.board.xoff]='s'
            grid[this.t.y+this.board.yoff][this.t.x+this.board.xoff]="T"
            grid[this.y+this.board.yoff][this.x+this.board.xoff]="H"

            return grid
        }else{
            let grid = this.t.print()
            grid[this.y+this.board.yoff][this.x+this.board.xoff]=this.n+""
            return grid
            
        }
    }


    tailMove(){

        let xDiff = this.x - this.t.x
        let yDiff = this.y - this.t.y

        if(this.n==4)
        console.log(xDiff,yDiff,this.n)
        //tail can move 8 directions

        if(xDiff==0&&yDiff==0) return //same spot

        if(xDiff==0){//upp or down
            if(yDiff>1){//down
                this.t.move(0,1)
            }else if(yDiff<-1){//up
                this.t.move(0,-1)
            }
        }

        if(yDiff==0){//left or right
            if(xDiff>1){//move right
                this.t.move(1,0)
            }else if(xDiff<-1){//move left
                this.t.move(-1,0)
            }
        }

        //diagonals
        if(xDiff==2&&yDiff==1  ||  xDiff==1&&yDiff==2 || xDiff==2&&yDiff==2){ //right down
            this.t.move(1,1)
        }

        if(xDiff==1&&yDiff==-2  ||  xDiff==2&&yDiff==-1  || xDiff==2&&yDiff==-2){ //right up
            this.t.move(1,-1)
        }

        if(xDiff==-2&&yDiff==-1  ||  xDiff==-1&&yDiff==-2  || xDiff==-2&&yDiff==-2){ //left up
            this.t.move(-1,-1)
        }

        if(xDiff==-1&&yDiff==2  ||  xDiff==-2&&yDiff==1  || xDiff==-2&&yDiff==2){ //left down
            this.t.move(-1,1)
        }

        //this.t.mark()
        // if(this.n==0){
             //this.board.grid[this.t.y+this.board.yoff][this.t.x+this.board.xoff]="#"
            // }
            this.t.mark()

    }

    mark(){
        this.t.mark()
    }
}

class Tail{
    constructor(parent,n=1000){


        this.board=parent
        this.x=0
        this.y=0

        

    }

    move(x,y){
        this.x+=x
        this.y+=y

        
    }
    
    mark(){
        this.board.grid[this.y+this.board.yoff][this.x+this.board.xoff]="#"
    }

    
}
