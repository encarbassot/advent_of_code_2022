/**
 GUESSES 
    1
    4
 */



let tests = [
`498,4 -> 498,6 -> 496,6
503,4 -> 502,4 -> 502,9 -> 494,9`
]

/*
[
    [
        {"x": 498,"y": 4},
        {"x": 498,"y": 6},
        {"x": 496,"y": 6}
    ],
    [
        {"x": 503,"y": 4},
        {"x": 502,"y": 4},
        {"x": 502,"y": 9},
        {"x": 494,"y": 9}
    ]
]
*/


function coa(inp){
    let sand = {x:500,y:0}
    inp = inp.split("\n").map(line=>line.split(" -> ").map(coord=>coord.split(",").map(val=>Number(val))).map(line=>({x:line[0],y:line[1]})))

    let maxX = inp[0][0].x
    let minX = inp[0][0].x
    let maxY = inp[0][0].y
    let minY = inp[0][0].y


    //get maximums and minimums    
    for(const line of inp){
        for (const coord of line) {
            let x = coord.x
            let y = coord.y
            if(x>maxX){
                maxX=x
            }else if(x<minX){
                minX=x
            }
            
            if(y>maxY){
                maxY=y
            }else if(y<minY){
                minY=y
            }
        }
    }

    let topY= 0
    let topX= minX- 150
    maxX+=150

    let grid = []
    for(let i=topY;i<=maxY+1;i++){
        grid.push([])
        for(let j=topX;j<=maxX+1;j++){
            grid[i].push('.')
        }
    }

    let count = 0
    
    for (const line of inp) {
        
        for(let i=0;i<line.length-1;i++){
            let a = line[i]
            let b =line[i+1]
            makeLine(grid,a.x-topX,b.x-topX,a.y,b.y)
        }
        // out(line.map(coord=>[coord.x-=topX,coord.y]))
        // out2D(grid) 
    }

    out("LINES",count)
    grid[sand.y][sand.x-topX]="+"
    out2D(grid)
    

    let total = 0
    let ended = false
    while(!ended){
        ended = dropSand(grid,sand.x-topX,sand.y)
        total++

    }



    out2D(grid)
    out("TOTAL",total)

}

function makeLine(grid,x1,x2,y1,y2){

    if(x1==x2){//line vertical
        let my = Math.min(y1,y2)
        let mmy = Math.max(y1,y2)
        for(let i=my;i<=mmy;i++){
            
            grid[i][x1]="#"
        }

    }else if(y1==y2){//line horizontal
        let mx = Math.min(x1,x2)
        let mmx = Math.max(x1,x2)
        for(let i=mx;i<=mmx;i++){
            
            grid[y1][i]="#"
        }
    }
    

}


function dropSand(grid,x,y){

    let isStatic = false
    while(!isStatic){
        if(y>=grid.length-1){
            isStatic=true
        }else if(grid[y+1][x]=="."){
            y++
        }else if(grid[y+1][x-1]=="."){
            y++
            x--
        }else if(grid[y+1][x+1]=="."){
            y++
            x++
        }else{
            isStatic=true
        }
    }

    grid[y][x]="o"

    return (y==0)
}