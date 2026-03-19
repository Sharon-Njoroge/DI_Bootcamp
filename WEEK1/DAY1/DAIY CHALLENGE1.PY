import random

# 1. Ask for User Input
user_string = input("Please enter a string that is exactly 10 characters long: ")

# 2. Check the Length of the String
string_length = len(user_string)

if string_length < 10:
    print("String not long enough.")
elif string_length > 10:
    print("String too long.")
else:
    print("Perfect string")
    
    # 3. Print the First and Last Characters
    # Index 0 is the first, index -1 is the last
    print(f"First character: {user_string[0]}")
    print(f"Last character: {user_string[-1]}")
    
    # 4. Build the String Character by Character
    print("\nConstructing string progressively:")
    constructed_string = ""
    for char in user_string:
        constructed_string += char
        print(constructed_string)
        
    # 5. Bonus: Jumble the String
    print("\nBonus: Jumbled String")
    # We convert the string to a list because strings are immutable (unchangeable)
    char_list = list(user_string)
    random.shuffle(char_list)
    
    # Join the list back into a string to print it
    jumbled_string = "".join(char_list)
    print(f"Jumbled version: {jumbled_string}")