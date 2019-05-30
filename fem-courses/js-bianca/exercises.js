// Create an object using bracket and dot notation that represents the characters and related data you may find in a game of Clue;

let game = {};

game["murderer"] = "???";
game.characters = ["Mr. White", "Mrs. Yellow", "Mr. Orange", "Mrs. Blue", "Mrs. Green"];

// or

 
game.characters[0] = "Miss Scarlet";
game.characters.push("Mr. Green");
// pushes to the back of the array (to the end) 


game.weapons = ["candlestick", "knife", "lead pipe", "hammer", "letter opener"];
game.rooms = ["Ballroom", "Parlour", "Library", "Diner Hall"];

// 2. Create an object that looks like this:
// {"name": "Rusty", "room":"kitchen", "weapon":"candlestick"}
// Extract out the weapon and location using destructuring

let combination = {'name': "Rusty", 'room': "Kitchen", 'weapon': "candlestick"};

let {room, weapon} = combination;

room; // "Kitchen"
weapon; // "candlestick"

/////////////////////////////////////////////////////////////////////////////////////////
// Loop exercises
/////////////////////////////////////////////////////////////////////////////////////////

// 3. given

const game = {
    'suspects': [
        {
            name: "Rusty",
            color: "orange"
        },
        {
            name: "Miss Scarlet",
            color: "red"
        }
    ]
};

// loop through "suspects"

let sus = game['suspects'];

for (let i = 0; i < sus.length; i++) {
    console.log(sus[i]);
}

// this would algo work
for (let key in sus) {
    console.log(sus[key])};


// 4. Now loop through all the properties of the suspect objects in the suspects array, mark them if you think they are guilty.

for (let key in sus) {
    for (let prop in sus[key]) {
        console.log("Element ", key, "| Property:", prop, "| Value:", sus[key][prop]); //.prop aqui retornaria "undefined"... pq?
    }
}

// marcando os culpados

for (let key in sus) {
    for (let prop in sus[key]) {
        if (prop == "color") {
            if (sus[key][prop] == "red") {
                sus[key]["guilty"] = "yes";
                console.log("Ha! Guilty!");
            } else {
                sus[key]["guilty"] = "no";
            }
        }
        console.log("Element ", key, "| Property:", prop, "| Value:", sus[key][prop]); //.prop aqui retornaria "undefined"... pq?
    }
}

// 5. Now destructure this nested data structure into two variables with the strings 'red' and 'orange'.

let [{color: color1}, {color: color2}] = sus; // game.suspects; 

///////////////////////////////////////////////////////////////////////////////////////
// List transformations

function CreateSuspectObjects(name) {
    return {
      name: name,
      color: name.split(' ')[1],
      speak() { 
        console.log("my name is", name); 
      }
    };
  };
  
let suspects_names = ['Miss Scarlet', 'Colonel Mustard', 'Mr. White'];
  
let suspectsList = [];

// let's "hydrate" this list

for (let i = 0; i < suspects_names.length; i++) {
    let suspect = CreateSuspectObjects(suspects_names[i]);
    suspectsList.push(suspect);
}

// outra versão

for (let i = 0; i < suspects_names.length; i++) {
    suspectsList.push(CreateSuspectObjects(suspects_names[i]));
}

// looping with _.each

_.each(suspects, function(name){
    let suspect = CreateSuspectObjects(name);
    suspectsList.push(suspect);
});

// or

_.each(suspects, function(name){
    suspectsList.push(CreateSuspectObjects(name));
});

// precisa de um pacote ("underscore"). "functional utility"

////////////////////// EXERCÍCIO: implementar _.each(list, callback)

// minha solução inicial, que implementa na verdade um MAP! :0
let _ = {
    each(list, callback) {
        output = [];
        let size = list.length;
        for (let i = 0; i < size; i++) {
            let el = list[i]
            output.push(callback(el))
        }
        return(output)
    }
}

// alternativamente (outro tipo de loop, mais educadado para objects)

let _ = {
    each(list, callback) {
        output = [];
        let size = list.length;
        for (let key in list) {
            let el = list[key]
            callback(el)
        }
        return(output)
    }
}

// solução corrigida
let _ = {
    each(list, callback) {
        output = [];
        let size = list.length;
        for (let i = 0; i < size; i++) {
            let el = list[i]
            callback(el, i, list) // eu não sabia q ele retornava o "i" e o "list", acrescentei isso depois. minha
        } // a função do pacote undescore retorna a própria lista
    }
}




// teste

function CreateSuspectObjects(name) {
    return {
        name: name,
        color: name.split(" ")[1],
        speak() {console.log(`my name is ${name}`)}
    }
}

let suspects = ['Miss Scarlet', 'Colonel Mustard', 'Mr. White'];

_.each(suspects, CreateSuspectObjects)

_.each(suspects, CreateSuspectObjects)[1].speak()


/////////////// MAP


function CreateSuspectObjects(name) {
    return {
      name: name,
      color: name.split(' ')[1],
      speak() { 
        console.log(`my name is ${this.name}`); 
      }
    };
  };
  
let suspects_names = ['Miss Scarlet', 'Colonel Mustard', 'Mr. White'];

let suspects_list = _.map(suspects, function(name){
    return CreateSuspectObjects(name);
});

////// implement MAP

let _t = {
    map(list, callback) {
        output = [];
        let size = list.length;
        for (let i = 0; i < size; i++) {
            let el = list[i]
            output.push(callback(el))
        }
        return(output)
    }
}

// alternativamente (outro tipo de loop, mais educadado para objects)

let _t = {
    map(list, callback) {
        output = [];
        let size = list.length;
        for (let key in list) {
            let el = list[key]
            output.push(callback(el))
        }
        return(output)
    }
}

