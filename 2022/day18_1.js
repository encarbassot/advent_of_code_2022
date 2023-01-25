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
    for(let i=0;i<=max[0];i++){
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


    //calculate
    let total = 0
    for(let i=0;i<grid.length;i++){
        let plane = grid[i]
        // out2D(plane)
        for(let j=0;j<plane.length;j++){
            const column = plane[j]
            for(let k=0;k<column.length;k++){
                const v = column[k]
                if(v==1){
                    if(i==0 || grid[i-1][j][k]==0){//bottom
                        total++
                    }
                    if(i==grid.length-1 || grid[i+1][j][k]==0){//top
                        total++
                    }
    
                    if(j==0 || plane[j-1][k]==0){
                        total++
                    }
                    if(j==plane.length-1 || plane[j+1][k]==0){
                        total++
                    }
    
    
                    if(k==0 || column[k-1]==0){
                        total++
                    }
                    if(k==column.length-1 || column[k+1]==0){
                        total++
                    }
                }
            }
        }
    }


    
    
    // console.log(grid)
    
    // out(inp)
    out("TOTAL",total)
}
