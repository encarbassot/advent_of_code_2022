console.log("day 1 part 1");

const tests=[
`1000
2000
3000

4000

5000
6000

7000
8000
9000

10000`,
`1000
2000
3000

4000

5000
6000

7000
8000
9000

10000
1000
2000
3000

4000

5000
6000

7000
8000
9000

10000`
]





function coa(inp){
    inp = inp.split("\n\n").map(elf=>elf.split("\n").map(x=>Number(x)))

    const result = inp.map(elf=>elf.reduce((acc,v)=>acc+v,0)).sort((a,b)=>b-a)

    out("Solution 1",result[0]) //solution 1
    // out("Solution 2",result[0]+result[1]+result[2])//solution 2
}
  