const epic = ['a', 'long', 'time', 'ago', 'in a', 'galaxy', 'far far', 'away'];

const sentence = epic.reduce((accumulator, currentValue) => {
    return `${accumulator} ${currentValue}`;
});

console.log(sentence); // "a long time ago in a galaxy far far away"