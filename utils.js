/**
 * given a 2D array returns a NxM matrix from the position x,y top left corner
 * result is given in a 1D array
 */

function getNine(grid,x,y,n=3,m=undefined){
    let result = []

    if(m==undefined){
        m=n
    }

    if(n==1&&m==1){
        return [grid[y][x]]
    }

    for(let i=y;i<y+m;i++){
        for(let j=x;j<x+n;j++){
            result.push(grid[i][j])
        }
    }

    return result
}

function getNineSum(grid,x,y,n=3){
    let result = 0//[]
    if(m==undefined){
        m=n
    }

    if(n==1&&m==1){
        return grid[y][x]
    }

    for(let i=y;i<y+m;i++){
        for(let j=x;j<x+n;j++){
            result+=grid[i][j]
        }
    }

    return result//.reduce((acc,x)=>acc+x,0)
}




//https://www.geeksforgeeks.org/lcm-of-given-array-elements/
function gcd(a, b){
    if (b == 0)
        return a;
    return gcd(b, a % b);
}

// Returns LCM of array elements
function findlcm(arr, n){
    // Initialize result
    let ans = arr[0];

    // ans contains LCM of arr[0], ..arr[i]
    // after i'th iteration,
    for (let i = 1; i < n; i++)
        ans = (((arr[i] * ans)) /
            (gcd(arr[i], ans)));

    return ans;
}






function intLength(num){
    if(num==0)
        return 1
    return Math.floor(Math.log10(num))+1 
}

function lerp(a,b,v){
    //A value
    //B value
    //V value between 0 and 1
    //result value betwen A and B
    return a + v*(b - a)
}

function minMax(a,b){
    //[x,y] = minMax(x,y)
    //ensures X is the small and Y the large
    return (a>b) ? [b,a] : [a,b]
}

function map(a,b,x,y,v){
    //A & B output range
    //X & Y input range
    //V input value
    return lerp(a,b,inverseLerp(x,y,v))
    
}

function inverseLerp(x,y,v){
    [x,y] = minMax(x,y)
    return (v-x)/(y-x)
}

function bound(a,b,v){
    let min = Math.min(a,b)
    let max = Math.max(a,b)
    return Math.max(min,Math.min(max,v))
}

function hsl(hue,saturation=100,lightness=50){
    return `hsl(${hue%255}, ${bound(0,100,saturation)}%, ${bound(0,100,lightness)}%)`
}


async function readFile(filename){
    const response = await fetch(filename)
    const text = await response.text()
    return text
}


// function zip(){
//     let result = []
//     if(arguments.some(list=>!Array.isArray(list))){
//         console.error(`Element is not a list`)
//         return
//     }

//     arguments.reduce((acc,v)=>,true)
// }


class Timer{
    constructor(){
        this.start()
    }
    
    start(){
        const d = new Date()
        this.timestamp = d.getTime()
        return this.timestamp
    }

    end(){
        const d = new Date()
        return d.getTime() - this.timestamp
    }
}