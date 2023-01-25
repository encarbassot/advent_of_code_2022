console.log("day 25 part 1")

/*




  Decimal   Quintal           SNAFU
        0         0               0
        1         1               1
        2         2               2
        3         3              1=
        4         4              1-
        5        10              10
        6        11              11
        7        12              12
        8        13              2=
        9        14              2-
       10        20              20
       15        30             1=0
       20        40             1-0

  2022
 31042
1=11-2

  12345
 343340
1-0---0

    314159265
1120411044030
1121-1110-1=0



 
 */


const tests=[
`1=-0-2
12111
2=0=
21
2=01
111
20012
112
1=-1=
1-12
12
1=
122`,
`1
2
3
4
5
6
7
8
9
10
15
20
2022
12345
314159265`
]

function coa(inp){
    inp = inp.split("\n")

    let total = 0
    for (const n of inp) {
        total += snafuToDex(n)
    }

    out(total,decToSnafu(total))
}


function snafuToDex(snafu){
    snafu = ""+snafu

    let total =0

    for(let i=snafu.length-1;i>=0;i--){
        const j = snafu.length-i-1
        const c = snafu[i]
        const p = Math.pow(5,j)


        let q

        if(c=='0'){
            q = 0
        }else if(c=='1'){
            q = 1
        }else if(c=='2'){
            q = 2
        }else if(c=='-'){
            q = -1
        }else if(c=='='){
            q = -2
        }

        // console.log(c,j,p,q)

        total += p*q


    }

    console.log("TOTAL", snafu, total)

    return total
}



function decToSnafu(dec){
    dec = parseInt(dec)

    let quint = ""+dec.toString(5)


    const quintArr = quint.split("")
    let result = ""


    //343340

    if(quintArr.some(x=>x=="3" || x=="4")){

        let carry = 0

        let len = quint.length

        for(let i=0;i<len;i++){
            const j = len-i-1
            let c = Number(quint[j])

            c+= carry

            carry = 0
            if(c>=5){
                c=c-5
                carry=1
            }

            if(c==3){
                result=  ""+"=" + result
                carry+= 1
            }else if(c==4){
                result=  ""+"-" + result
                carry+= 1
            }else{
                result=  ""+c + result
            }

        }

        if(carry >0){
            result = ""+carry+result
        }

        console.log("RESULT",result,quint,dec)
        return result
    }



    
}
