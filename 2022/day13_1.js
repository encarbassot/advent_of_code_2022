let tests = [
`[1,1,3,1,1]
[1,1,5,1,1]

[[1],[2,3,4]]
[[1],4]

[9]
[[8,7,6]]

[[4,4],4,4]
[[4,4],4,4,4]

[7,7,7,7]
[7,7,7]

[]
[3]

[[[]]]
[[]]

[1,[2,[3,[4,[5,6,7]]]],8,9]
[1,[2,[3,[4,[5,6,0]]]],8,9]`]


function coa(inp){
    inp = inp.split("\n\n").map(pair=>pair.split("\n").map(x=>JSON.parse(x)))

    let total = 0

    for (const [i,[a,b]] of inp.entries()) {
        if (compare(a,b)){
            total += i+1
        }
    }

    out("TOTAL",total)

}


function compare(a,b){
    // console.log("COMPARE",a,b)

    for(let i=0;i<Math.max(a.length,b.length);i++){

        if(a.length-i==0||b.length-i==0){ // alguna se queda sin elementos
            return a.length<b.length
        }
        let left = a[i]
        let right = b[i]

        if(Array.isArray(left) || Array.isArray(right)){

            if(!Array.isArray(left)){
                left = [left]
            }else if(!Array.isArray(right)){
                right=[right]
            }

            let result = compare(left,right)
            if(result!=undefined){
                return result
            }

        }else if(right!=left){
            return right>left

        }

    }

    return undefined

}