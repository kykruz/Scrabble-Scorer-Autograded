// This assignment is inspired by a problem on Exercism (https://exercism.org/tracks/javascript/exercises/etl) that demonstrates Extract-Transform-Load using Scrabble's scoring system. 

const input = require("readline-sync");

const oldPointStructure = {
  1: ['A', 'E', 'I', 'O', 'U', 'L', 'N', 'R', 'S', 'T'],
  2: ['D', 'G'],
  3: ['B', 'C', 'M', 'P'],
  4: ['F', 'H', 'V', 'W', 'Y'],
  5: ['K'],
  8: ['J', 'X'],
  10: ['Q', 'Z']
};

function oldScrabbleScorer(word) {
   word = word.toUpperCase();
	let letterPoints = "";
 
	for (let i = 0; i < word.length; i++) {
 
	  for (const pointValue in oldPointStructure) {
 
		 if (oldPointStructure[pointValue].includes(word[i])) {
			letterPoints += `Points for '${word[i]}': ${pointValue}\n`
		 }
     }
	}
	return (`\n${letterPoints}`);
 }

// your job is to finish writing these functions and variables that we've named //
// don't change the names or your program won't work as expected. //

function initialPrompt() {
    word = input.question("Let's play some scrabble!\n\nEnter a word: ");
   return word;
};

let simpleScorer = function(word) {
   word = word.toLowerCase();
   return Number(word.length);
}

let vowelBonusScorer = function(word) {
   word = word.toLowerCase()
   let countVowels = 0;
   let countConsonants = 0
    for (i = 0; i <= word.length; i++) {
  
      if (word[i] == "a" || word[i] == "e" || word[i] == "i" ||
        word[i] == "o" || word[i] == "u") {
         countVowels += 3;
      }
      else if  (word[i] == "b" || word[i] == "c" || word[i] == "d" ||
      word[i] == "f" || word[i] == "g" || word[i] == "h" || word[i] == "j" || word[i] == "k" || word[i] == "l" ||
      word[i] == "m" || word[i] == "n" || word[i] == "p" || word[i] == "q" || word[i] == "r" || word[i] == "s" ||
      word[i] == "t" || word[i] == "v" || word[i] == "w" || word[i] == "x" || word[i] == "y" || word[i] == "z")
       {
         countConsonants += 1;
    }
    
 } return Number(countVowels + countConsonants);
}

let scrabbleScorer = function(word) {
   word = word.toLowerCase();
   let numberScore = 0;
      for (let i = 0; i < word.length; ++i) {
       numberScore += newPointStructure[word[i]];
        
    } return Number(numberScore)
}
 

const scoringAlgorithms = [simpleScore = {
   name: "Simple Score",
   description: "Each letter is worth 1 point.",
   scorerFunction: simpleScorer,
}, vowelBonusScore = {
   name: "Bonus Vowels",
   description: "Vowels are 3 pts, consonants are 1 pt.",
   scorerFunction: vowelBonusScorer,
}, oldScrabbleScore = {
   name: "Scrabble",
   description: "The traditional scoring algorithm.",
   scorerFunction: scrabbleScorer,
}];

function scorerPrompt(word) {
   let scoringMethodNumber = input.question("Which scoring method would you like to see?\n\n0 - Simple: One point per character\n1 - Vowel Bonus: Vowels are worth 3 points\n2 - Scrabble: Uses scrabble point system\nEnter 0, 1, or 2: ")
   scoringMethodNumber = Number(scoringMethodNumber);
   if (scoringMethodNumber === 0) {
      return console.log(`Points for '${word}': ${simpleScorer(word)}`);
   } else if (scoringMethodNumber === 1) {
      return console.log(`Points for '${word}': ${vowelBonusScorer(word)}`);
   } else if (scoringMethodNumber === 2) {
      return console.log (`Points for '${word}': ${scrabbleScorer(word)}`);
   }
      
   
}

function transform(oldPointStructure) {
   let newScorer = {};
     for (let [letterScore, oldLetterArr] of Object.entries(oldPointStructure)) {
     for (let letter of oldLetterArr) {
       newScorer[letter.toLowerCase()] = Number(letterScore);
     }
   }
   return newScorer;
}


let newPointStructure  = transform(oldPointStructure);

function runProgram() {
   let userWord = initialPrompt();
   scorerPrompt(userWord);
}

// Don't write any code below this line //
// And don't change these or your program will not run as expected //
module.exports = {
   initialPrompt: initialPrompt,
   transform: transform,
   oldPointStructure: oldPointStructure,
   simpleScorer: simpleScorer,
   vowelBonusScorer: vowelBonusScorer,
   scrabbleScorer: scrabbleScorer,
   scoringAlgorithms: scoringAlgorithms,
   newPointStructure: newPointStructure,
	runProgram: runProgram,
	scorerPrompt: scorerPrompt
};
