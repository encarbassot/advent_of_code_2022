console.log("day 4 part 2")

let tests=[
`2-4,6-8
2-3,4-5
5-7,7-9
2-8,3-7
6-6,4-6
2-6,4-8`,
`2-4,6-8
2-3,4-5
5-7,7-9
2-8,3-7
6-6,4-6
2-6,4-8
12-37,37-37
1-2,3-4
1-3,2-4
1-3,1-2
1-3,1-3
2-3,1-3`,
`1-2,3-4
4-3,2-1
9-5,8-3
2-7,5-9`
]

function coa(inp){
    inp = inp.split("\n")


    let total=0
  
    for(line of inp){
        const[[a,b],[c,d]] = line.split(",").map(x=>x.split("-").map(y=>Number(y)).sort((a,b)=>a-b))

        if(ch(a,b,c,d)){
            total++
        }
        
        
    }
    

    out("TOTAL:",total)

 

}



  
function ch(a,b,c,d){
    //C AB D
    if(c<=a&&b<=d){
        return true
        
    //A CD B
    }else if(a<=c && d<= b){
        return true
        
    //A C B D
    }else if(a<=c&& c<=b && b<=d){
    
        return true
    
    //C A D B
    }else if(c<=a && a<=d && d<=b){
        return true
    }
    return false
}
  
 


