//D loose C +0
//D draw  C +3
//D win   C +6

//0-> rock
//1-> paper
//2-> sisors


/*
    D   C
    0   1   LOOSE +0
    1   2   LOOSE +0
    2   0   LOOSE +0
    (d-c+4)%3 == 0

    1   1   DRAW  +3
    (d-c+4)%3 == 1

    1   0   WIN   +6
    2   1   WIN
    0   2   WIN
    (d-c+4)%3 == 2

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
    let total = inps.split("\n").map(line=>line.split(" ")) // get list of pairs [["A","X"],["B","Z"]...]
            .map(pair=>pair.map(x=>(x.charCodeAt(0)-65)%23))// char to int       [[0,0],[1,2]...]
            .reduce((acc,[a,b])=>acc+(b-a+4)%3*3+b +1,0)    // add them all with the formula

    out(total)
}