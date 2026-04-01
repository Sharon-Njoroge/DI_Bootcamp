// 1. Retrieve the form
const form = document.forms[0];
console.log(form);

// 2. Retrieve inputs by ID
const fnameInput = document.getElementById('fname');
const lnameInput = document.getElementById('lname');
console.log(fnameInput, lnameInput);

// 3. Retrieve inputs by name attribute
const fnameByName = document.getElementsByName('firstname')[0];
const lnameByName = document.getElementsByName('lastname')[0];
console.log(fnameByName, lnameByName);

// 4. Form Submission
form.addEventListener('submit', (e) => {
    // Why preventDefault? To stop the page from refreshing 
    // and losing our data/script state on submit.
    e.preventDefault();

    const fValue = fnameInput.value.trim();
    const lValue = lnameInput.value.trim();

    if (fValue !== "" && lValue !== "") {
        const ul = document.querySelector('.usersAnswer');
        
        const liFirst = document.createElement('li');
        liFirst.textContent = fValue;
        
        const liLast = document.createElement('li');
        liLast.textContent = lValue;

        ul.appendChild(liFirst);
        ul.appendChild(liLast);
    }
});