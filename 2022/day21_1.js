console.log("day 21 part 1")

const tests=[
`root: pppw + sjmn
dbpl: 5
cczh: sllz + lgvd
zczc: 2
ptdq: humn - dvpt
dvpt: 3
lfqf: 4
humn: 5
ljgn: 2
sjmn: drzm * dbpl
sllz: 4
pppw: cczh / lfqf
lgvd: ljgn * ptdq
drzm: hmdt - zczc
hmdt: 32`
]

function coa(inp){
    inp = inp.split("\n").map(line=>line.split(": ")).reduce((result,[name,oop])=>{

        const obj = {}
        if(isNaN(oop)){//not a number
            obj.isNaN = true


            const op = oop.split(" ")
            obj.a = op[0]
            obj.oop = op[1]
            obj.b = op[2]

        }else{ // is number
            obj.isNaN = false
            obj.n = parseInt(oop)
        }
        return {...result,[name]:obj}
        
    },{})

    
    let r = find(inp,"root")
    console.log(r)
    out(r)
    out(inp)
}

function find(inp,name){
    const e = inp[name]

    if(!e.isNaN){
        return e.n
    }

    const a = find(inp,e.a)
    const b = find(inp,e.b)

    switch(e.oop){
        case '+': return a+b
        case '-': return a-b
        case '*': return a*b
        case '/': return a/b
    }

    console.log("ERRROR")
    return undefined
}