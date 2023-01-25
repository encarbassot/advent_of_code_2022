let tests =[
`30373
25512
65332
33549
35390`
]



function coa(inp){
    const inps = inp.split('\n')
    const grid = []
    const trees=[]
    const scenic=[]

    let total = 0

    for (const line of inps) {
        trees.push("x".repeat(line.length).split(''))
        let newLine = line.split('')
        grid.push(newLine.map(x=>Number(x)))

        scenic.push([])
        for(e of newLine){
            scenic[scenic.length-1].push(0)
        }
    }

    console.log(grid)

    //outerline
    total+=(grid.length-1)*2 + (grid[0].length-1)*2

    for(let i=0;i<trees[0].length;i++){
        trees[0][i]="-"
        trees[trees.length-1][i]="-"
    }

    for(let i=0;i<trees.length;i++){
        trees[i][0]="-"
        trees[i][trees.length-1]="-"
    }
    


    //rows LEFT
    for(let i=1;i<grid.length-1;i++){
        //From the left
        let line = grid[i]

        let prev = line[0]

        for(let j=1;j<line.length-1;j++){
            let val = line[j]
            
            if(val>prev){
                trees[i][j]="-"
            }

            prev = Math.max(prev,val)
        }

    }


    //rows RIGHT
    for(let i=1;i<grid.length-1;i++){
        //From the right
        let line = grid[i]

        let prev = line[line.length-1]

        for(let j=line.length-2;j>0;j--){
            let val = line[j]
            if(val>prev){
                trees[i][j]="-"
            }

            prev = Math.max(val,prev)
        }

    }
    

    //columns TOP
    for(let i=1;i<grid[0].length-1;i++){//left to right

        let prev = grid[0][i]
        
        for(let j=1;j<grid.length-1;j++){//up to down
            let val = grid[j][i]

            if(val>prev){
                trees[j][i]="-"
            }

            prev = Math.max(val,prev)
        }


    }


    //columns BOTTOM
    for(let i=1;i<grid[0].length-1;i++){//left to right

        let prev = grid[grid.length-1][i]
        
        for(let j=grid.length-2;j>0;j--){//down to up
            let val = grid[j][i]

            if(val>prev){
                trees[j][i]="-"
            }

            prev = Math.max(val,prev)
        }


    }


    let plain = trees.map(x=>x.join('')).join('')
        .split('').filter(x=>x=="-").length

    out(plain)



}


function checkTree(grid,x,y){
    let tree = grid[y][x]

    // console.log("TREE",tree)


    //watch up
    let up=0
    for(let i=y-1;i>=0;i--){
        let val = grid[i][x]
        up++
        if(val>=tree){
            break
        }

    
    }

    let down=0
    for(let i=y+1;i<grid.length;i++){
        let val = grid[i][x]
        down++
        if(val>=tree){
            break
        }
    }


    let left=0
    for(let i=x-1;i>=0;i--){
        let val = grid[y][i]
        left++
        if(val>=tree){
            break
        }
    }
    
    let right = 0
    for(let i=x+1;i<grid[0].length;i++){
        let val = grid[y][i]
        right++
        if(val>=tree){
            break
        }
    }

    // console.log("UP",up,"DOWN",down,"LEFT",left,"RIGHT",right)
    console.log("------------- ")

    //return ""+tree+">"+up+","+down+","+left+","+right
    return up*down*left*right
    //return{u:up,d:down,l:left,r:right}
}
