console.log("day 3 part 1")

//try
// 4510 low


const tests=[
`1,1,1
2,1,1`,
`2,2,2
1,2,2
3,2,2
2,1,2
2,3,2
2,2,1
2,2,3
2,2,4
2,2,6
1,2,5
3,2,5
2,1,5
2,3,5`,
`0,0,1
0,1,1
0,2,1
1,0,1
1,1,0
1,1,2
1,2,1
2,0,1
2,1,1
2,2,1`
]


/*

X,Y,Z
grid[y][x][z]
---------X
|\
| \
|  \
Y   Z

0->air
1->laba
2->water
*/

function coa(inp){
    inp = inp.split("\n").map(line=>line.split(",").map(x=>Number(x)))


    let min = [...inp[0]]
    let max = [...inp[0]]

    //calculate grid
    for (const line of inp) {
        for(let i=0;i<3;i++){
            let v = line[i]
            if(v<min[i]){
                min[i]=v
            }else if(v>max[i]){
                max[i]=v
            }
        }
    }

    // out("max",max)
    // out("min",min)

    //create grid
    const grid = []
    for(let i=0;i<=max[0]+1;i++){
        grid.push([])
        for(let j=0;j<=max[1];j++){
            const slice = grid[grid.length-1]
            slice.push([])
            for(let k=0;k<=max[2];k++){
                const column = slice[slice.length-1]
                column.push(0)
            }
        }
    }

    //fill the grid
    for (const [x,y,z] of inp) {
        // console.log(y,x,z)
        grid[x][y][z]=1
    }


    //MAKE WATER FLOW
    waterFlow(grid,grid.length-1,0,0)

    
    

    //calculate
    const search = 2
    let total = 0
    for(let i=0;i<grid.length;i++){
        let plane = grid[i]
        // out2D(plane)
        for(let j=0;j<plane.length;j++){
            const column = plane[j]
            for(let k=0;k<column.length;k++){
                const v = column[k]
                if(v==1){
                    if(i==0 || grid[i-1][j][k]==search){//bottom
                        total++
                    }
                    if(i==grid.length-1 || grid[i+1][j][k]==search){//top
                        total++
                    }
    
                    if(j==0 || plane[j-1][k]==search){
                        total++
                    }
                    if(j==plane.length-1 || plane[j+1][k]==search){
                        total++
                    }
    
    
                    if(k==0 || column[k-1]==search){
                        total++
                    }
                    if(k==column.length-1 || column[k+1]==search){
                        total++
                    }
                }
            }
        }
    }

  
    out("TOTAL",total)
}




function waterFlow(grid,x,y,z){
    let me = grid[x][y][z]
    if(me != 0) return
    grid[x][y][z]=2

    if(x>0){//bottom
        waterFlow(grid,x-1,y,z)
    }
    if(x<grid.length-1){//top
        waterFlow(grid,x+1,y,z)
    }

    if(y>0){//bottom
        waterFlow(grid,x,y-1,z)
    }
    if(y<grid[0].length-1){//top
        waterFlow(grid,x,y+1,z)
    }

    if(z>0){//bottom
        waterFlow(grid,x,y,z-1)
    }
    if(z<grid[0][0].length-1){//top
        waterFlow(grid,x,y,z+1)
    }


}