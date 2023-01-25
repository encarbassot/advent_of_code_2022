  /*
 
 fetch('http://10.96.255.255:12345/Download/input.txt')
 .then((response) => response.text())
 .then((data) => coa(data.split("\n"),data));
//*/


//*
const tests = [
`    [D]    
[N] [C]    
[Z] [M] [P]
 1   2   3 

move 1 from 2 to 1
move 3 from 1 to 3
move 2 from 2 to 1
move 1 from 1 to 2`,
`[A] [B] [C] 
[F] [E] [D]
[Z] [M] [P]
 1   2   3 

move 1 from 2 to 1
move 3 from 1 to 3
move 2 from 2 to 1
move 1 from 1 to 2`,

]



function coa(inp){
	const [schema_raw,inps] = inp.split("\n\n")
   
	// const commands = inps.split("\n").map(x=>x.split(" ").filter(y=>!isNaN(y)).map(z=>parseInt(z)))
	const commands = inps.split("\n")
					.map(x=>x.split(" "))
					.map(([_m,quant,_f,from,_t,to])=>({quant,from:from-1,to:to-1}))
  
    const schema = readSchema(schema_raw)
	// out(schema)


	for (const {quant,from,to} of commands) {
		for(let i=0;i<quant;i++){
			const move = schema[from].pop()
			schema[to].push(move)
		}

		// out(schema)
	}

	out(schema)

	out(schema.map(x=>x.pop()).join(""))
}	


function readSchema(raw){
	const result = []
	const lines = raw.split("\n").reverse()
	lines.shift()
	
	for (const [i,line] of lines.entries()) {
		let nChar = 0
		let prevChar = ""
		for (const char of line) {
			console.log(char,i,nChar)

			if(prevChar=="["){
				const column = (nChar-1)/4
				if(result.length<=column){
					result.push([])
				}

				result[column].push(char)
			}

			nChar++
			prevChar=char
		}
	}

	return result
}
   

 


