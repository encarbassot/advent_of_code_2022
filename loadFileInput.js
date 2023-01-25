
// fetch('input')
//   .then((response) => response.text())
//   .then((data) => codeOfAdvent(data.split("\n"),data));

async function readFile(filename){
  const response = await fetch(filename)
  return await response.text()
}

