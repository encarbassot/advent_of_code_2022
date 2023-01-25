console.log("day 2 part 2")


/*
    LOOSE b=0
    0   +2  ->  (a+2)%3   ->    (a+(b+2)%3)%3
    1   +0  ->  (a+2)%3   ->    (a+(b+2)%3)%3    
    2   +1  ->  (a+2)%3   ->    (a+(b+2)%3)%3    

    DRAW b=1
    0   +0  ->  (a+0)%3   ->    (a+(b+2)%3)%3    
    1   +1  ->  (a+0)%3   ->    (a+(b+2)%3)%3    
    2   +2  ->  (a+0)%3   ->    (a+(b+2)%3)%3    

    WIN b=2
    0   +1  ->  (a+1)%3   ->    (a+(b+2)%3)%3    
    1   +2  ->  (a+1)%3   ->    (a+(b+2)%3)%3    
    2   +0  ->  (a+1)%3   ->    (a+(b+2)%3)%3    

*/

const tests=[
`A Y
B X
C Z`,
`A X
A Y
A Z
B X
B Y
B Z
C X
C Y
C Z`
]


function coa(inps){
    inps = inps.split("\n").map(line=>line.split(" "))
            .map(pair=>pair.map(x=>(x.charCodeAt(0)-65)%23))// char to int       [[0,0],[1,2]...]

    let total=0
 	for([a,b] of inps){
        total += b*3 + (a+(b+2)%3)%3+1
 	}
 out(total)

}
    