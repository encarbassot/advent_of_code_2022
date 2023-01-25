
// fetch('input')
//   .then((response) => response.text())
//   .then((data) => codeOfAdvent(data.split("\n"),data));

(async()=>{
  let a = await readFile("input")
  codeOfAdvent(a)
})()

async function readFile(filename){
  const response = await fetch(filename)
  return await response.text()
}


function showResultDOM(value){
    const resultDOM = document.getElementById("result")
    const resultPre = document.createElement("PRE")
    resultPre.innerHTML=value
    resultDOM.appendChild(resultPre)
    


}

function codeOfAdvent(input){
    console.log(input)
    input=input.split("\n\n").map(group=>group.split("\n").map(n=>Number(n)))

    console.log(input)
    showResultDOM(input[0])
    showResultDOM(input[1])
    showResultDOM(input[2])
}
