console.log("day 3 part 2")

let tests=[
`vJrwpWtwJgWrhcsFMMfFFhFp
jqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL
PmmdzqPrVvPwwTWBwg
wMqvLMZHhHMvwLHjbvcjnnSBnvTQFn
ttgJtRGJQctTZtZT
CrZsJsPPZsGzwwsLwLmpwMDw`
]

function coa(inp){
    inp = inp.split("\n").map(x=>x.split(""))

    let total=0
    let ao=0
    
    
   
    while(ao<inp.length){
        let a = inp[ao++]
        let b = inp[ao++]
        let c = inp[ao++]
        
        let r = findRep(a,b,c)[0]
        total += charCode(r)
        // out(co,r,a,b,c)
    }
    out(total,ao,inp.length)
  
 

}

function charCode(c){
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
                for(cc of c){
                    if(cc==ca){
                        coincidences.push(ca)
                    }
                }
            }
        }
    }

   
    //out(coincidences)
    return coincidences
}