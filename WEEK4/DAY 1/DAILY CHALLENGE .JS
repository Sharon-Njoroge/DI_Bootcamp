const usernames = [];

gameInfo.forEach((user) => {
  usernames.push(`${user.username}!`);
});

console.log(usernames); 
// Output: ["john!", "becky!", "susy!", "tyson!"]
