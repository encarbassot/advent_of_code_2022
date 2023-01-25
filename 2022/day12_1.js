let tests = 
[
`Sabqponm
abcryxxl
accszExk
acctuvwj
abdefghi`
,
`abaaaaacaaaaccccaaaaaaaaaacccccccccccccccccccccccccccccccccccaaaaaa
abaaacccaaaaccccaaaaaaaaaaacccaacccccccccccaacccccccccccccccccaaaaa
abaaaacccaacccccaaaaaaaaaaaaaaaaacccccccccccaccccccccaaaccccccccaaa
abacaacccccccccccaaaaaaaaaaaaaaaaccccccccccaacccccccaaccccccccccaaa
abcccacccccccccccaaaaaaaccaaaaaaaccccccccccclllcccccaaccccccccccaac
abccccccccccccccccaaaaaccccccccccccccccccclllllllcccccccccccccccccc
abaaacccccccccccccaaaaaccccccccccccccccaammlllllllcccccccccaacccccc
abaaacccccccccccacccaaaccccccccccccccccammmlwwwllllccddaaacaacccccc
abaaacccaaacccccaacaaacccccccccccccccccmmmmwwwwwllllcddddaaaacccccc
abaacccaaaacccccaaaaacccccccccccccccccmmmmwwwwwwwllllddddddaaaacccc
abaaaccaaaaccccccaaaaaacaaaccccccccccmmmmwwwwwwwwwlkkkkdddddaaacccc
abaaacccaaaccccaaaaaaaacaaaacccccccnnnnnowwwwwwwwwwkkkkjjdddddacccc
abcccccccccccccaaaaaaaacaaaaccccccnnnnnoowwwwwwwwjjjjjjjjjjddddcccc
abccccccccccccccccaaccccaaacccccccccoooooowwwxxxxiiiiiiiijjjddecccc
abacaacccccccccccccacccccccccccccccoooooowwwxxxxxxiiiiiiiiiieeecccc
abaaaacccccccaccccccccccccccccccccooossswwwxxxxyyyyyyhhhhhhheeecccc
abaaaaacccccaaacaaaccccccccccccccoooorrttvvxxxyyyyyyyyyhhhggeeecccc
abaaaaaccaaaaaaaaaaccccccccacccccooorrrttvvxxxyyyyyyyyygggggeeecccc
abaaaccccaaaaaaaaaacccccccaacccccpppqqqttuuxxxyyyyyyyyffffffffecccc
SbcaaccccaaaaaaaaaaccccaaaaacacccpppqqqttuuEzzzyyyyyyyffffffffccccc`

]




const solutions = []
let counter = 0
let animate = undefined



function coa(inp){
    inp = inp.split("\n").map(x=>x.split(``))

    let start={}
    let end={}
    

    //busca start y end, y convierte caracteres a numeros
    const heightMap = inp.map((y,i)=>y.map((element,j)=>{
        if(element=="S"){
            element="a"
            start={x:j,y:i}
        }
        if(element=="E"){
            element="z"
            end={x:j,y:i}
        }
        return element.charCodeAt(0)-97
    }))

    console.log(start)
    
    
    //crear un mapa de ruta de la misma dimension que el heightMap
    const grid = heightMap.map(y=>y.map(x=>'.'))
    
    printGrid(heightMap,grid,start,end)
    // animate = out2D(grid)


    //buscamos el camino de arriva acia abajo
    let nei = getNei(heightMap,grid,end)
    nextPath(heightMap,grid,nei,end,start)



}

function nextPath(heightMap,grid,nei,pos,end,count=0){
    console.log(pos,end)

    counter++

    printGrid(heightMap,grid,end,pos)
    
    if(nei.some(e=>e.x==end.x&&e.y==end.y)) { //solution 1
    // if(nei.some(e=>heightMap[e.y][e.x]==0)){    //solution 2
    
        out(counter)
        
        return
    }


    let nextNei = []
    for (const n of nei) {
            
        grid[n.y][n.x]="x"
        nextNei=joinNoduplicate(nextNei,getNei(heightMap,grid,n))
        
    }

    setTimeout(() => {

        nextPath(heightMap,grid,nextNei,pos,end,count+1)
    }, 1);

}



function printGrid(heightMap,grid,start,end){

    let colorResult = []
    for(let i=0;i<grid.length;i++){
        colorResult.push([])
        for(let j=0;j<grid[i].length;j++){
            let c = colorResult[i]

            if(i==start.y&&j==start.x){
                c.push(19)
            }else if(i==end.y&&j==end.x){
                c.push(15)
            }else{
                let g = grid[i][j]
                let h = heightMap[i][j]
                if(g=="."){
                    c.push(h)
                }else{
                    c.push((h+15)%26)
                }
            }


            
        }
    }

    animate = out2DheatMap(colorResult,0,26,animate)

}


function getNei(heightMap,grid,pos){
    let nei = []

    let currentHeight = heightMap[pos.y][pos.x]

    if(pos.y>0 && grid[pos.y-1][pos.x]=="." && heightMap[pos.y-1][pos.x]>=currentHeight-1){//up
        nei.push({x:pos.x,y:pos.y-1})
    }

    if(pos.y<grid.length-1 && grid[pos.y+1][pos.x]=="." && heightMap[pos.y+1][pos.x]>=currentHeight-1){//down
        nei.push({x:pos.x,y:pos.y+1})
    }

    if(pos.x>0 && grid[pos.y][pos.x-1]=="." && heightMap[pos.y][pos.x-1]>=currentHeight-1){//left
        nei.push({x:pos.x-1,y:pos.y})
    }

    if(pos.x<grid[pos.y].length-1 && grid[pos.y][pos.x+1]=="." && heightMap[pos.y][pos.x+1]>=currentHeight-1){//right
        nei.push({x:pos.x+1,y:pos.y})
    }

    return nei
}




function joinNoduplicate(a,b){
    for(e of b){
        if(!a.some(f=>f.x==e.x && f.y==e.y)){//no hay repetido
            a.push(e)
        }
    }
    return a
}