<<<<<<< HEAD
const details = {
  my: 'name',
  is: 'Rudolf',
  the: 'reindeer'
}

let sentence = "";
for (let key in details) {
    sentence += `${key} ${details[key]} `;
}
=======
const details = {
  my: 'name',
  is: 'Rudolf',
  the: 'reindeer'
}

let sentence = "";
for (let key in details) {
    sentence += `${key} ${details[key]} `;
}
>>>>>>> 82d3e1755fe372e9b124fe1d640fa3296d675904
console.log(sentence.trim());