// let json = require('./titanic-passengers')
// import * as json from

let totalPassengers = (json) => {
    return json.map(({ fields }) => fields)
};

let firstPassenger = (json) => {
    return json[0].fields
};

let totalLivingOrDead = (json, string) => {
    let res = 0;
    for(let passenger of json){
        if(passenger.fields.survived === string){
            res += 1
        }
    }
    return res
};

let classes = (json) => {
    let unique = new Set;
    for(let passenger of json){
        unique.add(passenger.fields.pclass)
    }
    return unique.size
};

let classTotal = (json) => {
    let res = {};
    for(let passenger of json){
        res[passenger.fields.pclass] = res[passenger.fields.pclass] + 1 || 1
    }
    return res
};

let classDeaths = (json) => {
    let res = {};
    for(let passenger of json){
        if(passenger.fields.survived == "No"){
            res[passenger.fields.pclass] = res[passenger.fields.pclass] + 1 || 1
        }
    }
    return res
};

let ages = (json) => {
    let res = new Set
    for(let passenger of json){
        if(passenger.fields.age){
            res.add(passenger.fields.age)
        }
    }
    return [...res]
};

let totalAges = (json) => {
    let res = {};
    for(let passenger of json){
        if(passenger.fields.age){
            res[passenger.fields.age] = passenger.fields.age + 1 || 1
        }
    }
    return res
}

let queenstown = (json) => {
    let res = 0;
    for(let passenger of json){
        if(passenger.fields.embarked == "Q"){
            res += 1
        }
    }
    return res
};

let nannies = (json) => {
    let res = 0;
    for(let passenger of json){
        if(passenger.fields.parch == 0 && passenger.fields.age < 14){
            res += 1
        }
    }
    return res
}

let minAge = (arr) => {
    return arr.sort((a,b) => a - b)[0]
};

let maxAge = (arr) => {
    return arr.sort((a,b) => b - a)[0]
};

let minMaxFare = (json, string) => {
    let res = []
    for(let passenger of json){
        if(passenger.fields.fare){
            res.push(passenger.fields.fare)
        }
    }
    if(string == "min") {
        return Math.min(...res);
    }
    if(string == 'max'){
        return Math.max(...res)
    }
}

let el = document.getElementById("container")

let render = async() => {
    let json = await (await fetch('titanic-passengers.json')).json()
    let passengers = totalPassengers(json)
    let maxFare = minMaxFare(json,"max")
    let maleClassObj = {
        "3": "LightBlue",
        "2": "CornFlowerBlue",
        "1": "steelblue"
    };
    let femaleClassObj = {
        "1": "#DD98B7",
        "2": "#C26790",
        "3": "palevioletred"
    }

    passengers.forEach((passenger) => {
        console.log(passengers.length)
        let child = document.createElement('div');
        child.classList.add("icon")
        el.appendChild(child)
        let rank = document.createElement("div")
        child.appendChild(rank)
        if(passenger.pclass == 3){
            child.classList.add("3")
            rank.innerHTML = "$"
        } else if (passenger.pclass == 2){
            child.classList.add("2")
            rank.innerHTML = "$$"
        } else {
            child.classList.add("1")
            rank.innerHTML = "$$$"
        }
        rank.style.fontSize = "15px"
        rank.style.marginTop = "10px"
        if(passenger.sex == "male"){
            child.classList.add("fa")
            child.classList.add("fa-male")
        } else {
            child.classList.add("fa")
            child.classList.add("fa-female")
        }
        
        // child.style.margin = "5px"
        // child.style.backgroundColor = passenger.sex === 'male' ? maleClassObj[passenger.pclass] : femaleClassObj[passenger.pclass]
        // child.style.borderRadius = passenger.survived === 'No' ? '50px' : '0px'
        child.style.display = "flex"
        child.style.flexDirection = "column"
        child.style.height = "30px"
        child.style.width = "30px"
        child.style.color = passenger.sex === "male" ? "#AACCFF" : "#e9b2ff"
        child.style.fontSize = "3em"
        child.style.padding = "10px"
        child.style.margin = "20px"
        child.style.display = "flex"
        child.style.alignItems = 'center'
        child.style.justifyContent = 'center'
    });
    
}

let sortGender = async() =>{
    let json = await (await fetch('titanic-passengers.json')).json()
    console.loga
    json.sort((a,b) => {
        return a.fields.sex === 'male' ? -1 : 1
        // if(a.fields.sex == "male") return 1
        // if(b.fields.sex == "female") return -1
    })
    return json
}

let sortSurvived = async() =>{
    let json = await (await fetch('titanic-passengers.json')).json()
    json.sort((a,b) => {
        return a.fields.survived === "No" ? -1 : 1 
    })
    return json
}

let sortEmbarked = async() => {
    let json = await (await fetch('titanic-passengers.json')).json()
    json.sort((a,b) => {
        if (a.fields.embarked === undefined || a.fields.embarked < b.fields.embarked) {
            return -1;
          }
          if (b.fields.embarked === undefined || b.fields.embarked < a.fields.embarked) {
            return 1;
          }
        
          return 0;
    })
    return json
}

let sortGenderSurvived = async() => {
    let json = await (await fetch('titanic-passengers.json')).json()
    json.sort((a,b) => {
        return a.fields.survived == "No" && a.fields.sex == "male" ? -1 : 1
    })
    return json
}

let sortSex = async(gender) => {
    let json = await (await fetch('titanic-passengers.json')).json()
    return json.filter(pass => pass.fields.sex === gender)
}

let sortClass = async(pclass) => {
    let json = await (await fetch('titanic-passengers.json')).json()
    return json.filter(pass => pass.fields.pclass === pclass)
}

let undefinedEmbark = async() => {
    let json = await (await fetch('titanic-passengers.json')).json()
    return json.filter(pass => pass.fields.embarked == undefined)
}

let filterMale = () => {
    let total = document.getElementsByClassName("total")[0]
    let men = [...document.getElementsByClassName("fa-male")]
    let women = [...document.getElementsByClassName("fa-female")]
    total.innerHTML = women.length
    women.forEach((elem) => {
        elem.style.opacity = 1
    })
    men.forEach((elem) => {
        elem.style.opacity = 0.2
    })
}

let filterFemale = () => {
    let total = document.getElementsByClassName("total")[0]
    let men = [...document.getElementsByClassName("fa-male")]
    let women = [...document.getElementsByClassName("fa-female")]
    total.innerHTML = men.length
    men.forEach((elem) => {
        elem.style.opacity = 1
    })
    women.forEach((elem) => {
        elem.style.opacity = 0.2
    })
}

let filterFirstClass = () => {
    let icon = [...document.getElementsByClassName("icon")]
    icon.forEach(elem => elem.style.opacity = 1)
    let rank = [...document.getElementsByClassName("1")]
    let total = document.getElementsByClassName("total")[0]
    total.innerHTML = rank.length
    let others = [...document.getElementsByClassName("2"), ...document.getElementsByClassName("3")]
    others.forEach(elem => elem.style.opacity = .2)
}

let filterSecondClass = () => {
    let icon = [...document.getElementsByClassName("icon")]
    icon.forEach(elem => elem.style.opacity = 1)
    let rank = [...document.getElementsByClassName("2")]
    let total = document.getElementsByClassName("total")[0]
    total.innerHTML = rank.length
    let others = [...document.getElementsByClassName("1"), ...document.getElementsByClassName("3")]
    others.forEach(elem => elem.style.opacity = .2)
}

let filterThirdClass = () => {
    let icon = [...document.getElementsByClassName("icon")]
    icon.forEach(elem => elem.style.opacity = 1)
    let rank = [...document.getElementsByClassName("3")]
    let total = document.getElementsByClassName("total")[0]
    total.innerHTML = rank.length
    let others = [...document.getElementsByClassName("1"), ...document.getElementsByClassName("2")]
    others.forEach(elem => elem.style.opacity = .2)
}

render()