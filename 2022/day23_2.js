console.log("day 23 part 1")

//try 953 too high
//try 952 too high

//try 876 not

//try 800 too low

const tests=[
`....#..
..###.#
#...#.#
.#...##
#.###..
##.#.##
.#..#..`,
`.....
..##.
..#..
.....
..##.
.....`,
`..............
..............
.......#......
.....###.#....
...#...#.#....
....#...##....
...#.###......
...##.#.##....
....#..#......
..............
..............
..............`
]

let elfs = []
function coa(inp){
    inp = inp.split("\n")

    elfs = readInput(inp)
    // console.log(elfs)


    printElfs(elfs)
    let cont = true
    let i = 0
    while(cont){
        cont = move(elfs)

        if(i%10==0){
            // out(`== end of round ${i+1} ==`)
            // printElfs(elfs)
            console.log(`== end of round ${i+1} ==`)
        }
        i++
    }

    printElfs(elfs)
    out(i)

 
    // out(inp)
}


function move(elfs){
    let some = false
    for (const e of elfs) {
        const alone = e.round1(elfs)
        some||= alone
    }

    if(!some){
        return false
    }

    for (const e of elfs) {
        e.round2(elfs)
    }

    for (const e of elfs) {
        e.move()
    }

    return true
}

class Elf{
    constructor(x,y,id){
        this.x = x
        this.y = y
        this.id = id

        this.round2Move = true
        this.nextX
        this.nextY

        this.nextPosInd = 0

        this.nextPos = [
            [
                //NORTH
                {x:-1,y:-1},
                {x:0,y:-1},
                {x:1,y:-1},
            ],[
                //SOUTH
                {x:-1,y:1},
                {x:0,y:1},
                {x:1,y:1},
            ],[
                //WEST
                {x:-1,y:-1},
                {x:-1,y:0},
                {x:-1,y:1},
            ],[
                //EST
                {x:1,y:-1},
                {x:1,y:0},
                {x:1,y:1},
            ]
        ]
    }


    
    round1(elfs){

        const n = this.findNei(elfs)

        if(n.length>0){

            const txt = ["N","S","W","E"]
            let cont = true 
            let i = 0
            for(i=0;i<4 && cont;i++){
                cont = !this.checkSide(this.nextPosInd+i,n)
            }
            i--
            // console.log(txt[(this.nextPosInd+i)%4],cont)
    
            const dir = this.nextPos[(this.nextPosInd+i)%4][1]
            // console.log(i,"DIR",txt[i],this.x,this.y,this.x+dir.x,this.y+dir.y)
            this.nextX = this.x+dir.x
            this.nextY = this.y+dir.y

            if(!cont){
                this.round2Move = true
            }else{
                this.round2Move = false
            }
            
            return true
        }else{
            this.round2Move = false
        }

        return false

    }

    findNei(elfs){
        const nei = []
        for(let i=-1;i<=1;i++){
            for(let j=-1;j<=1;j++){
                if(!(i==0 && j==0)){
                    let e = elfs.find(f=>f.x == this.x+j && f.y == this.y+i)
                    if(e!=undefined){
                        nei.push(e)
                    }
                }
            }
        }
        return nei
    }

    checkSide(n,elfs){
        n = n%4
        const [a,b,c] = this.nextPos[n]

        for (const e of elfs) {
            if(e.id != this.id){
                if((e.x==this.x+a.x && e.y==this.y+a.y) 
                || (e.x==this.x+b.x && e.y==this.y+b.y) 
                || (e.x==this.x+c.x && e.y==this.y+c.y)){
                    return false
                }
            }
        }

        return true
    }

    round2(elfs){

        if(this.round2Move){
            for (const e of elfs) {
                if(e.id != this.id){
                    if(e.nextX == this.nextX && e.nextY == this.nextY){
                        // console.log("CANCELING")
                        this.round2Move = false
                        e.round2Move = false
                    }
                }
            }
        }

    }

    move(){
        if(this.round2Move){
            this.x = this.nextX
            this.y = this.nextY
        }
        this.nextPosInd++
    }
    
}



function printElfs(elfs){
    let minx = elfs[0].x
    let miny = elfs[0].y
    let maxx = elfs[0].x
    let maxy = elfs[0].y

    for(let i=0;i<elfs.length;i++){
        const e = elfs[i]
        if(e.x<minx){
            minx=e.x
        }else if(e.x>maxx){
            maxx=e.x
        }

        if(e.y<miny){
            miny=e.y
        }else if(e.y>maxy){
            maxy=e.y
        }
    }


    let board = []

    for(let i=miny;i<=maxy;i++){
        board.push([])
        for(let j=minx;j<=maxx;j++){
            board[board.length-1].push('.')
        }
    }


    

    for(let i=0;i<elfs.length;i++){
        const e = elfs[i]
        board[e.y-miny][e.x-minx] = "#"
    }

    const result = board.map(line=>line.join("")).join("\n")
    
    out("\n"+result+"\n")
    return result


}


function readInput(inp){
    const elfs = []

    for(let i=0;i<inp.length;i++){
        for(let j=0;j<inp[0].length;j++){
            let c = inp[i][j]
            if(c=="#"){
                elfs.push(new Elf(j,i,elfs.length))
            }
            
        }
    }

    return elfs
}