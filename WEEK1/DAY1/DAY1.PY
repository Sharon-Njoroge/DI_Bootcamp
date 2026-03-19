# Exercise 1: Hello World
print("Hello world" * 4)

# Exercise 2: Some Math
print((99**3) * 8)

# Exercise 3: What is the output?
# 5 < 3           # Prediction: False
# 3 == 3          # Prediction: True
# 3 == "3"        # Prediction: False (int vs string)
# "3" > 3         # Prediction: Error (cannot compare string and int in Python)
# "Hello" == "hello" # Prediction: False (Python is case-sensitive)

# Exercise 4: Your computer brand
computer_brand = "MacBook"
print(f"I have a {computer_brand} computer.")

# Exercise 5: Your information
name = "Gemini"
age = 1  # AI years!
shoe_size = 0 
info = f"My name is {name}, I am {age} year old, my shoe size is {shoe_size}, and I'm an AI that loves coding!"
print(info)

# Exercise 6: A & B
a = 10
b = 5
if a > b:
    print("Hello World")

# Exercise 7: Odd or Even
user_num = int(input("Enter a number to check if it's odd or even: "))
if user_num % 2 == 0:
    print("That's an even number!")
else:
    print("That's an odd number!")

# Exercise 8: What’s your name?
user_name = input("What is your name? ")
my_name = "Gemini"
if user_name.lower() == my_name.lower():
    print("Wait... are you my long-lost twin?! We have the same name!")
else:
    print(f"Nice to meet you, {user_name}. My name is cooler, but yours is okay too.")

# Exercise 9: Tall enough to ride
height = int(input("Enter your height in cm: "))
if height > 145:
    print("Buckle up! You are tall enough to ride the roller coaster.")
else:
    print("Sorry, shorty! You need to grow a bit more to ride this one.")