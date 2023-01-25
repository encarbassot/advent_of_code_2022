
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
[1,[2,[3,[4,[5,6,0]]]],8,9]`
]

function coa(inp){
    inp+="\n\n[[2]]\n[[6]]"
    inp=inp.split("\n").filter(n=>n!="").map(x=>JSON.parse(x))
    inp.sort((a,b)=>compare(a,b)?-1:1)

    //find total
    let posa = 0
    let posb = 0

    for (const [i,val] of inp.entries()) {
        if(JSON.stringify(val)=="[[2]]"){
            posa=i+1
        }
        if(JSON.stringify(val)=="[[6]]"){
            posb=i+1
        }
    }

    out("TOTAL",posa*posb)

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