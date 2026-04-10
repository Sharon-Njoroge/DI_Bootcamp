const users = { user1: 18273, user2: 92833, user3: 90315 };

// Part 1: Convert to Array
const usersArray = Object.entries(users);
console.log(usersArray); 
// Output: [ [ 'user1', 18273 ], [ 'user2', 92833 ], [ 'user3', 90315 ] ]

// Part 2: Multiply ID by 2
const updatedUsers = usersArray.map(([user, id]) => [user, id * 2]);
console.log(updatedUsers);
// Output: [ [ 'user1', 36546 ], [ 'user2', 185666 ], [ 'user3', 180630 ] ]