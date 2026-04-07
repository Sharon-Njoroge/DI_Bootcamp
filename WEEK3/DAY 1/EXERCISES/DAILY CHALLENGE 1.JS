// 1. Create the sentence variable
let sentence = "The movie is not that bad, I like it";

// 2. Find the position of "not"
let wordNot = sentence.indexOf("not");

// 3. Find the position of "bad"
let wordBad = sentence.indexOf("bad");

// 4. Check if "bad" comes after "not"
// Note: indexOf returns -1 if the word is not found
if (wordNot !== -1 && wordBad !== -1 && wordBad > wordNot) {
    
    // Extract the part before "not" and the part after "bad"
    // We add 3 to wordBad to skip over the word "bad" itself
    let firstPart = sentence.slice(0, wordNot);
    let secondPart = sentence.slice(wordBad + 3);
    
    console.log(firstPart + "good" + secondPart);
    
} else {
    // If the conditions aren't met, log the original sentence
    console.log(sentence);
}