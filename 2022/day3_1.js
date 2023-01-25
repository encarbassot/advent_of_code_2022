console.log("day 3 part 1")

let tests=[
`vJrwpWtwJgWrhcsFMMfFFhFp
jqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL
PmmdzqPrVvPwwTWBwg
wMqvLMZHhHMvwLHjbvcjnnSBnvTQFn
ttgJtRGJQctTZtZT
CrZsJsPPZsGzwwsLwLmpwMDw`
]

function coa(inp){
    const total = inp.split("\n").map(x=>{
        //divide strings by half
        let middle = Math.floor(x.length/2)
        return [x.slice(0,middle),x.slice(middle,x.length)]
    }).map(sack=>sack.map(x=>x.split("")))//separate chars
        .map(line=>findRep(...line)[0])//gets the character that repeats
        .reduce((acc,v)=>acc+priority(v),0)

    out("Total:",total)

}

function priority(c){
    // a 1   ->  97
    // z 26  ->  122
    // A 27  ->  65
    // Z 52  ->  90
    let r = c.charCodeAt(0)-96
    if(r<0){
        r+=31+26+1
    }
   
   return r
}

function findRep(a,b,c){
    const coincidences = []
    for(ca of a){
        for(cb of b){
            if(cb==ca){
                coincidences.push(ca)
            }
        }
    }

    return coincidences
}