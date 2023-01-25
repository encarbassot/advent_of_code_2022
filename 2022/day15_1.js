
//5508230 no
//5508234

let tests = [`Sensor at x=2, y=18: closest beacon is at x=-2, y=15
Sensor at x=9, y=16: closest beacon is at x=10, y=16
Sensor at x=13, y=2: closest beacon is at x=15, y=3
Sensor at x=12, y=14: closest beacon is at x=10, y=16
Sensor at x=10, y=20: closest beacon is at x=10, y=16
Sensor at x=14, y=17: closest beacon is at x=10, y=16
Sensor at x=8, y=7: closest beacon is at x=2, y=10
Sensor at x=2, y=0: closest beacon is at x=2, y=10
Sensor at x=0, y=11: closest beacon is at x=2, y=10
Sensor at x=20, y=14: closest beacon is at x=25, y=17
Sensor at x=17, y=20: closest beacon is at x=21, y=22
Sensor at x=16, y=7: closest beacon is at x=15, y=3
Sensor at x=14, y=3: closest beacon is at x=15, y=3
Sensor at x=20, y=1: closest beacon is at x=15, y=3`]

/**
..........#..........................
.........###.........................
........#####........................
.......#######.......................
......#########.............#........
.....###########...........###.......
....#############.........#####......
...###############.......#######.....
..#################.....#########....
.###################.#.###########...
########0#S########################..
.###########################S#######.
..###################S#############..
...###################SB##########...
....#############################....
.....###########################.....
......#########################......
.......#########S#######S#####.......
........#######################......
.......#########################.....
......####B######################....
.....###S#############.###########...
......#############################..
.......#############################.
.......#############S#######S########
......B#############################.
.....############SB################..
....##################S##########B...
...#######S######################....
....############################.....
.....#############S######S##0###.....
......#########################......
.......#######..#############B.......
........#####....###..#######........
.........###......#....#####.........
..........#.............###..........
.........................#...........
 */



//coa(test,10)
// coa(inp,2000000)

function coa(inp,lineN=10){
    lineN=2000000

    inp = inp.split("\n")   .map(line=>line.split(": closest beacon is at x=")) // separa por la mitad
                            .map(line2=>[line2[0].split("Sensor at x=")[1],line2[1]])   //tenemos los dos valores   //[["2, y=18","-2, y=15"],[...
                            .map(line3=>line3.map(line4=>{let [x,y]=line4.split(", y=");return {x:Number(x),y:Number(y)}})) //crea objeto //[[{"x": 2,"y": 18},{"x": -2,"y": 15}],[{...
                            .map(x=>({sensor:x[0],beacon:x[1]})) //de array de objetos a objeto de objetos
                            .map(e=>{ // calcula el radio
                                let xoff = Math.abs(e.sensor.x-e.beacon.x)
                                let yoff = Math.abs(e.sensor.y-e.beacon.y)
                                return {...e,radius:xoff+yoff}
                            })

    //


    // printInp(inp,lineN)

    
        const ranges = searchBeacons(inp,lineN)
        console.log(JSON.stringify(ranges))
        
        let total = 0
        for (const r of ranges) {
            let [a,b] = r
            total += b-a
        }
        out("Total",total)



    // for (const signal of inp) {
    //     if(signal.beacon.y==lineN){
    //         for (const r of ranges) {
    //             console.log(signal.beacon)
    //             if(signal.beacon.x>r[0] && signal.beacon.x<r[1]){
    //                 total--
    //                 console.log("--")
    //             }
    //         }

    //     }
    // }

}

function searchBeacons(inp,lineN){
    let ranges = []

    for (const signal of inp) {
        let y = signal.sensor.y
        let x = signal.sensor.x
        let r = signal.radius
        
        let topRadius    = y-r
        
        let bottomRadius = y+r
        
        if(lineN >=topRadius && lineN<=bottomRadius){
            
            if(lineN>y){ // sensor encima de linea
                let sub = r - (lineN-y)
                ranges.push([x-sub,x+sub])
                
            }else if(lineN<y){ // sensor debajo de linea
                let sub = r - (y-lineN)
                ranges.push([x-sub,x+sub])


            }else{// equal
                //no hay
            }

        }
    }

    // console.log(ranges)
    return mergeIntervals(ranges)
}



function mergeIntervals(intervals){
    intervals.sort((a,b)=>a[0]-b[0])
    let result = [[intervals[0][0],intervals[0][1]]]

    for(let i=0;i<intervals.length;i++){

        if(intervals[i][0]-1 <= result[result.length-1][1]){
            result[result.length-1][1] = Math.max(result[result.length-1][1],intervals[i][1])
        }else{
            result.push(intervals[i])
        }
    
    }

    return result
}

function printInp(inp,n){

    let minx = inp[0].sensor.x
    let maxx = inp[0].sensor.x
    let miny = inp[0].sensor.y
    let maxy = inp[0].sensor.y

    for({sensor,radius} of inp){
        let {x,y}=sensor

        if(x-radius<minx){
            minx=x-radius
        }else if(x+radius>maxx){
            maxx=x+radius
        }

        if(y-radius<miny){
            miny=y-radius
        }else if(y+radius>maxy){
            maxy=y+radius
        }
    }


    console.log(`x(${minx},${maxx}) (y${miny},${maxy})`)

    let result = []
    for(let j=0;j<=maxy-miny;j++){
        result.push([])
        for(let i=0;i<=maxx-minx;i++){
            result[j].push(".")
        }
    }


    for(let l=0;l<inp.length;l++){
        const {sensor:s,beacon:b,radius:r}=inp[l]
        result[s.y-miny][s.x-minx] ="S"
        result[b.y-miny][b.x-minx] ="B"
        
        for(let j=-r;j<=r;j++){
            let y = s.y+j
            let k = Math.abs(j)
            
            for(let i=-r+k;i<=r-k;i++){
                let x = s.x-i

                let c = result[y-miny][x-minx]
                if(c=="."){
                    result[y-miny][x-minx]="#"
                }
            }
        }

    }

    result[-miny][-minx]="0"
    result[-miny+2*n][-minx+2*n]="0"


    out2D(result)

}



