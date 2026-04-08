const users = [
    { firstName: 'Bradley', lastName: 'Bouley', role: 'Full Stack Resident' },
    { firstName: 'Chloe', lastName: 'Alnaji', role: 'Full Stack Resident' },
    { firstName: 'Jonathan', lastName: 'Baughn', role: 'Enterprise Instructor' },
    { firstName: 'Michael', lastName: 'Herman', role: 'Lead Instructor' },
    { firstName: 'Robert', lastName: 'Hajek', role: 'Full Stack Resident' },
    { firstName: 'Wes', lastName: 'Reid', role: 'Instructor'},
    { firstName: 'Zach', lastName: 'Klabunde', role: 'Instructor'}
];

// 1. Welcome Message
const welcomeStudents = users.map(user => `Hello ${user.firstName}`);

// 2. Filter Full Stack Residents
const fullStackResidents = users.filter(user => user.role === 'Full Stack Resident');

// 3. Bonus: Chaining filter and map
const lastNamesFS = users
    .filter(user => user.role === 'Full Stack Resident')
    .map(user => user.lastName);