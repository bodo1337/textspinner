let fs = require('fs');

//write to file
let writeToCSV = (data) => {
    if (!fs.existsSync("results/")){
        fs.mkdirSync("results/");
    }
    var file = fs.createWriteStream("results/" + Date.now().toString() + ".csv");
    data.forEach((element) => {
        file.write(element + '\n')
    });
    file.end();
}

let convertStringToList = (input) => {
    let temp = [];
    let counter = 0;
    let deepY = -1;
    let deepX = -1;
    let hasCaractersLeft = true;

    while(hasCaractersLeft){
        let currentCharacter = input[counter];
        if(currentCharacter){
            counter++;
            if(currentCharacter == "{") {
                deepY++;
                deepX = 0;
                temp[deepY] = [];
                temp[deepY][deepX] = "";
            }
            if(currentCharacter == "|") {
                deepX++;
                temp[deepY][deepX] = "";
            }
            if(currentCharacter == "{" | currentCharacter == "}" | currentCharacter == "|") continue;
            temp[deepY][deepX] = temp[deepY][deepX] + currentCharacter;
        }else{
            hasCaractersLeft = false;
        }
    }
    return temp;
}

function allPossibleCases(arr) {
    if (arr.length == 1) {
        return arr[0];
    } else {
        var result = [];
        var allCasesOfRest = allPossibleCases(arr.slice(1));  // recur with the rest of array
        for (var i = 0; i < allCasesOfRest.length; i++) {
            for (var j = 0; j < arr[0].length; j++) {
                result.push(arr[0][j] + allCasesOfRest[i]);
            }
        }
        return result;
    }
}

let randomized = (array) => {
    var m = array.length, t, i;

    // While there remain elements to shuffle…
    while (m) {
  
      // Pick a remaining element…
      i = Math.floor(Math.random() * m--);
  
      // And swap it with the current element.
      t = array[m];
      array[m] = array[i];
      array[i] = t;
    }
  
    return array;
}

let input = "{Top Video. |Gutes Video! |Top Inhalt! |Großartiger Content! |sehr cooler Beitrag! }{ Gefällt mir sehr gut! |finde ich wirklich fantastisch! |Hat mir wirklich sehr gut gefallen! |Vor Allem auch sehr hochwertig! |Da hat sich jemand wirklich Mühe gegeben! }{ Empfehle ich sehr gerne weiter 🙂! |werde ich sicherlich teilen 😀! |Scharing ist caring 😀! |Werde ich auf jeden Fall mal weiterleiten das Video! |Hat es verdient geteilt zu werden! }";

writeToCSV(randomized(allPossibleCases(convertStringToList(input))));
