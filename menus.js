let done = {
    "2018":{
        "1":[1]
    },
    "2022":{
        "1":[1,2],
        "2":[1,2],
        "3":[1,2],
        "4":[1,2],
        "4":[1,2],
        "5":[1,2],
        "6":[1,2],
        "7":[1,2],
        "8":[1,2],
        "9":[1,2],
        "10":[1,2],
        "11":[2],
        "12":[1,2],
        "13":[1,2],
        "14":[1,2],
        "15":[1,2],
        "16":[1],
        "17":[1,2],
        "18":[1,2],
        "19":[1],
        "20":[1],
        "21":[1],
        "22":[1],
        "23":[1,2],
        "25":[1],

    }
}


/*TODO
when goin back keep the value of autoRun
button go to bottom
coa() return passed by out("Result:",coa())

*/

const globalCOA={
    lastRun:"inp"
}

window.onload=async ()=>{
    const container = document.getElementById("container")

    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    globalCOA.urlParams=urlParams
    
    const autoRun = urlParams.has("autoRun")
    const autoRunVal = urlParams.get("autoRun")

    //YEARS MENU
    if(!urlParams.has("year")){
        for (const year in done) {
            addButton(container,year,`clearSearch({year:${year}})`)
        }
        return
    }


    const year = Number(urlParams.get("year"))
    document.getElementById("subtitle").innerText=year

    //CODE of DAY and PART
    if(urlParams.has("day") && urlParams.has("part")){
        let day = Number(urlParams.get("day"))
        let part = Number(urlParams.get("part"))
        if( !isNaN(day) && !isNaN(year) && !isNaN(part) && day >0 && day<=25 && (part==1||part==2) && Object.keys(done).map(x=>Number(x)) .includes(year)){

            document.getElementsByTagName("title")[0].innerHTML=year+"_day"+day+"_"+part

            try{
                await addScript(`${year}/day${day}_${part}.js`)
            }catch(e){
                clearSearch()
            }

            let pMenu = createP(container)
            addButton(pMenu,`Back to ${year}`,`clearSearch({year:${year}})`)
            addButton(pMenu,`Part 2`,``)

            addButton(createP(container),"Bottom","window.scrollTo(0,document.body.scrollHeight);")
            
            let pRun = createP(container)
            addButton(pRun,`Run Input`,`runInput(${year},${day},${part})`)
            addButton(pRun,`Run Test`,`runTest()`)
            addSelect(pRun,tests,autoRunVal)
            addChbx(pRun,urlParams,autoRun)
            
            let pView = createP(container)
            addButton(pView,`View Input`,``)
            addButton(pView,`View Input`,`goToInput(${year},${day})`)
            addButton(pView,`View Source`,`goToSource(${year},${day})`)
            document.getElementById("subtitle").innerText=`${year}_day${day}_${part}`

            
            if(autoRun){
                if(autoRunVal=="inp"){
                    runInput(year,day,part)
                }else{
                    runTest()
                }
            }

            return
        }
    }

    //DAYS OF YEAR MENU
    document.getElementsByTagName("title")[0].innerHTML+=" "+year
    addButton(container,`Back to begining`,`clearSearch()`)
    for (const day in done[year]) {
        console.log(day)
        const p = document.createElement("P")
        if(done[year][day].includes(1)){
            addButton(p,`DAY ${day} PART 1`,`openScript(${day},1,${year})`)
        }
        if(done[year][day].includes(2)){
            addButton(p,`DAY ${day} PART 2`,`openScript(${day},2,${year})`)
        }
        container.appendChild(p)
    }


}

function createP(container){
    let p = document.createElement("P")
    container.appendChild(p)
    return p
}

function clearSearch(params=undefined){
    params = params==undefined?"":"?"+Object.entries(params).map(ent=>ent[0]+"="+ent[1]).join("&")
    window.location.href = window.location.origin + window.location.pathname + params
}

function addScript(src) {
    return new Promise((resolve, reject) => {
        const s = document.createElement('script');

        s.setAttribute('src', src);
        s.addEventListener('load', resolve);
        s.addEventListener('error', reject);

        document.body.appendChild(s);
    });
}

async function openScript(day,part,year){
    window.location.href =  window.location.origin + window.location.pathname + `?day=${day}&part=${part}&year=${year}`
    // try {
    //     await addScript(src);
    //     // do something after it was loaded
    // } catch (e) {
    //     alert("este script no existe")
    // }

}

function addButton(container,name,onclick){
    let button = document.createElement("BUTTON")
    button.innerText= name
    container.appendChild(button)
    button.setAttribute("onclick", onclick)
    return button
}

function addSelect(container,options,value){
    let select = document.createElement("SELECT")
    select.id="select"
    
    for (const [i,opt] of options.entries()) {
        let option = document.createElement("OPTION")
        option.innerHTML = `${i+1}: ${opt.split("\n").length} lines`
        option.value = i
        select.appendChild(option)
    }

    // select.innerText= name
    container.appendChild(select)
    select.setAttribute("onclick", onclick)

    if(!isNaN(value) && value!=null && value>=0 && value<options.length){
        console.log(value)
        select.value=value
    }

    if(options.length==1){
        select.style.display="none"
    }

    return select
}

function addChbx(container,urlParams,autoRun){
    let chbx = document.createElement("INPUT")
    chbx.type="checkbox"
    chbx.id="autoRun"
    chbx.name="autoRun"
    chbx.checked=autoRun
    let label = document.createElement("LABEL")
    label.innerText="AutoRun"
    label.setAttribute("for","autoRun")
    container.appendChild(chbx)
    container.appendChild(label)
    chbx.onchange=({target:{checked}})=>{
        if(checked){
            updateAutoRun()
        }else{
            urlParams.delete("autoRun")
            updateSearch(urlParams)
        }
    }
}



function goToSource(year,day){
    window.location.href = "https://adventofcode.com/"+year+"/day/"+day
}

function goToInput(year,day){
    window.location.href =window.location.origin+window.location.pathname+"/"+year+"/input_day"+day+".txt"
}

async function runInput(year,day,part){
    document.getElementById("result").innerHTML=""
    console.clear()
    updateAutoRun("inp")
    coa(await readFile(`${year}/input_day${day}.txt`))
}

function runTest(){
    console.clear()
    document.getElementById("result").innerHTML=""
    let testN = document.getElementById("select").value
    updateAutoRun(""+testN)
    coa(tests[testN])

}


function updateAutoRun(val=undefined){
    
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);

    if(val!=undefined) globalCOA.lastRun=val

    if(urlParams.has("autoRun") && urlParams.get("autoRun")!=val || val==undefined){
        urlParams.set("autoRun",globalCOA.lastRun)
        updateSearch(urlParams)
    }
}
function updateSearch(urlParams){
    window.location=window.location.origin+window.location.pathname+"?"+urlParams.toString()
}