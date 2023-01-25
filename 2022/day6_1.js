

const tests = [
`mjqjpqmgbljsphdztnvjfqwrcgsmlb`,//7
`bvwbjplbgvbhsrlpgdmjqwftvncz`,//5
`nppdvjthqldpwncqszvftbrmjlhg`,//6
`nznrnfrfntjfmvfwmzdfjlvtqnbhcprsg`,//10
`zcfzfwzzqfrljwzlrfnpqdbhtmscgvjw`,//11
]

 
 


function coa(inps,raw){
 	
 	let inp=inps.split("")
 	
 	let buff=[]
 	//buff.push('a')
  	//buff.push('b')
  	//buff.push('c')
  	//let c=buff.splice(0,1)
  	//out('buff',c,buff)
  	
  	//out('diff',diff('abcde'.split('')))
  	
  	for(let i=0;i<inp.length;i++){
		buff.push(inp[i])
		
		if(buff.length>4){
			buff.splice(0,1)
		}
		
  		if(buff.length==4){
  			if(diff(buff)){
  				out("RESULT",i+1,buff.join(""))
  				return
  			}
  		}

  	}
 
}

function diff(arr){
	for(let j=0;j<arr.length;j++){
		for(let i=j;i<arr.length;i++){
			if(j!=i){
				let a = arr[j]
				let b = arr[i]
				//out('compare',a,b)
				if(a==b){
					return false
				}
			}
		}
	}
	return true
}



   

 

