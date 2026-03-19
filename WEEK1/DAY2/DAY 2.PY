import random

# 🌟 Exercise 1: Favorite Numbers
my_fav_numbers = {7, 13, 22, 42}
my_fav_numbers.add(100)
my_fav_numbers.add(55)
# Removing "the last one added" is tricky because sets are unordered. 
# We'll remove 55 specifically.
my_fav_numbers.remove(55)

friend_fav_numbers = {3, 8, 13, 21}
# Concatenate using union (|)
our_fav_numbers = my_fav_numbers.union(friend_fav_numbers)
print(f"Exercise 1 - Combined Set: {our_fav_numbers}")


# 🌟 Exercise 2: Tuple
# Answer: You cannot add more integers to a tuple because they are "immutable."
# To "change" it, you'd actually have to create a brand new tuple.
original_tuple = (1, 2, 3)
# new_tuple = original_tuple + (4,)  <-- This creates a NEW tuple, doesn't change the old one.


# 🌟 Exercise 3: List Manipulation
basket = ["Banana", "Apples", "Oranges", "Blueberries"]
basket.remove("Banana")
basket.remove("Blueberries")
basket.append("Kiwi")
basket.insert(0, "Apples")
apple_count = basket.count("Apples")
basket.clear()
print(f"Exercise 3 - Final Basket: {basket} (Apples appeared {apple_count} times)")


# 🌟 Exercise 4: Floats
# Recap: An integer is a whole number (5). A float has a decimal point (5.0).
# Generating sequence: 1.5, 2, 2.5... 5
float_list = []
current = 1.5
while current <= 5:
    # If it ends in .0, we can store it as an int, otherwise float
    float_list.append(int(current) if current % 1 == 0 else current)
    current += 0.5
print(f"Exercise 4 - Generated List: {float_list}")


# 🌟 Exercise 5: For Loop
print("Exercise 5 - Numbers 1-20:")
for i in range(1, 21):
    print(i, end=" ")

print("\nExercise 5 - Even numbers:")
for i in range(1, 21):
    if i % 2 == 0:
        print(i, end=" ")
print()


# 🌟 Exercise 6: While Loop
while True:
    user_name = input("\nEnter your name (at least 3 letters, no digits): ")
    if not user_name.isdigit() and len(user_name) >= 3:
        print("thank you")
        break
    else:
        print("Incorrect input. Please try again.")


# 🌟 Exercise 7: Favorite Fruits
fav_fruits_input = input("\nEnter your favorite fruits (separated by spaces): ")
fav_fruits_list = fav_fruits_input.split()

any_fruit = input("Enter the name of any fruit: ")
if any_fruit in fav_fruits_list:
    print("You chose one of your favorite fruits! Enjoy!")
else:
    print("You chose a new fruit. I hope you enjoy it!")


# 🌟 Exercise 8: Pizza Toppings
pizza_toppings = []
while True:
    topping = input("\nEnter a pizza topping (type 'quit' to finish): ").lower()
    if topping == 'quit':
        break
    else:
        print(f"Adding {topping} to your pizza.")
        pizza_toppings.append(topping)

total_cost = 10 + (len(pizza_toppings) * 2.5)
print(f"Your toppings: {', '.join(pizza_toppings)}")
print(f"Total price: ${total_cost:.2f}")


# 🌟 Exercise 9: Cinemax Tickets
family_ages = input("\nEnter the ages of the family members (separated by space): ").split()
total_ticket_cost = 0

for age_str in family_ages:
    age = int(age_str)
    if age < 3:
        total_ticket_cost += 0
    elif 3 <= age <= 12:
        total_ticket_cost += 10
    else:
        total_ticket_cost += 15

print(f"Total family ticket cost: ${total_ticket_cost}")

# Bonus: Restricted Movie
teens = ["Alice", "Bob", "Charlie", "Dave"]
allowed_attendees = []

for name in teens:
    age = int(input(f"How old is {name}? "))
    if 16 <= age <= 21:
        allowed_attendees.append(name)
    else:
        print(f"Sorry {name}, you aren't within the 16-21 age range.")

print(f"Final list of attendees: {allowed_attendees}")