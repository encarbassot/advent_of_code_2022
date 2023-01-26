let tests =[`Monkey 0:
Starting items: 79, 98
Operation: new = old * 19n
Test: divisible by 23
  If true: throw to monkey 2
  If false: throw to monkey 3

Monkey 1:
Starting items: 54, 65, 75, 74
Operation: new = old + 6n
Test: divisible by 19
  If true: throw to monkey 2
  If false: throw to monkey 0

Monkey 2:
Starting items: 79, 60, 97
Operation: new = old * old
Test: divisible by 13
  If true: throw to monkey 1
  If false: throw to monkey 3

Monkey 3:
Starting items: 74
Operation: new = old + 3n
Test: divisible by 17
  If true: throw to monkey 0
  If false: throw to monkey 1`
]

let testObj=[
    {
        name:"Monkey 0",
        items:[79n,98n],
        divBy:23n,
        operation: (x)=>(x*19n),
        test:(x)=>x%23n==0?2:3,
        inspected:0
    },{
        name:"Monkey 1",
        items:[54n, 65n, 75n, 74n],
        divBy:19n,
        operation:(x)=>(x + 6n),
        test:(x)=>x%19n==0?2:0,
        inspected:0
    },{
        name:"Monkey 2",
        items:[79n, 60n, 97n],
        divBy:13n,
        operation:(x)=>(x * x),
        test:(x)=>x%13n==0?1:3,
        inspected:0
    },{
        name:"Monkey 3",
        items:[74n],
        divBy:17n,
        operation:(x)=>(x + 3n),
        test:(x)=>x%17n==0?0:1,
        inspected:0
    },

]


function processInp(inp){
    return inp.split("\n\n").map(x=>{
        let xin = x.split("\n")
        let oop=xin[2].split("Operation: new =")[1]
        let divBy = Number(xin[3].split("Test: divisible by ")[1])
        let a = Number(xin[4].split("If true: throw to monkey ")[1])
        let b = Number(xin[5].split("If false: throw to monkey ")[1])

        return {
            name:xin[0]
            ,divBy
            ,inspected:0
            ,items:xin[1].split("Starting items: ")[1].split(", ").map(y=>BigInt(y))
            ,operation:(inOop)=>eval("BigInt("+oop.replaceAll("old",inOop+"n")+")")
            ,test:(inTest)=>inTest%BigInt(divBy)==0?a:b
        }
    })
}

function printMsonkeys(monkeys,round){
    // let result = "Round "+round+"\n"
    // for (const m of monkeys) {
    //     result+=m.name+" ("+m.inspected+") "//+m.items.join(",")
    //     +"\n"
    // }
    // out(result)
    console.log("Round"+round+"\n"+monkeys.map(m=>m.name+" ("+m.inspected+") ").join("\n"))
}


function round(monkeys){
    for (const m of monkeys) {

        while(m.items.length>0){
            m.inspected++
            let item = m.items.splice(0,1)[0]
            let worry = m.operation(item)%monkeysMCD
            //worry=worry/3n


            // if(worry%monkeysMCD==0){
            //     worry=worry/monkeysMCD
            // }



            let newMonkey = m.test(worry)
            monkeys[newMonkey].items.push(worry)
            // console.log(item,worry,m.test(worry))
        }
    }
}

function coa(inp){

  // const monkeys = processInp(inp)
  // const monkeys = testObj
  const monkeys = processInp(inp)
  // out(monkeys)
  
  let monkeysMCD = BigInt(findlcm(monkeys.map(x=>x.divBy),monkeys.length))
  
  
  // out(monkeysMCD)
  
  console.log(monkeys)
  
  printMsonkeys(monkeys)
  
  let prints = [1,20,1000,2000,3000,4000,5000,6000,7000,8000,9000,10000]
  
  for(let i=1;i<=10000;i++){
    round(monkeys)
    if(prints.includes(i)){
      printMsonkeys(monkeys,i)
    }
  }
  
  monkeys.sort((a,b)=>b.inspected-a.inspected)
  
  printMsonkeys(monkeys,"SORtED¡")
  
  let total = monkeys[0].inspected * monkeys[1].inspected

  out("Total:",total)
  console.log("total:",total)

}




