let client = "John";

const groceries = {
    fruits : ["pear", "apple", "banana"],
    vegetables: ["tomatoes", "cucumber", "salad"],
    totalPrice : "20$",
    other : {
        paid : true,
        meansOfPayment : ["cash", "creditCard"]
    }
}

// 1. Display Groceries
const displayGroceries = () => {
    groceries.fruits.forEach(fruit => console.log(fruit));
};

// 2. Clone Groceries
const cloneGroceries = () => {
    // Handling Strings (Pass by Value)
    let user = client; 
    client = "Betty"; 
    // Question: Will we see "Betty" in user? 
    // Answer: No. Strings are primitive types, so 'user' stored a copy of the value "John".
    
    // Handling Objects (Pass by Reference)
    let shopping = groceries;
    
    // Change totalPrice
    groceries.totalPrice = "35$";
    // Question: Will we see this in shopping?
    // Answer: Yes. Objects are reference types. 'shopping' points to the same memory address as 'groceries'.

    // Change paid status
    groceries.other.paid = false;
    // Question: Will we see this in shopping?
    // Answer: Yes. For the same reason as above; they both point to the same object in memory.

    console.log("User variable:", user);
    console.log("Client variable:", client);
    console.log("Shopping totalPrice:", shopping.totalPrice);
    console.log("Shopping paid status:", shopping.other.paid);
};

// Invoke the function
cloneGroceries();