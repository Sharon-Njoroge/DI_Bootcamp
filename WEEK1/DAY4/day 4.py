# 🌟 Exercise 1
def display_message():
    print("I am learning about functions in Python.")

display_message()


# 🌟 Exercise 2
def favorite_book(title):
    print(f"One of my favorite books is {title}")

favorite_book("Alice in Wonderland")


# 🌟 Exercise 3
def describe_city(city, country="Unknown"):
    print(f"{city} is in {country}.")

describe_city("Reykjavik", "Iceland")
describe_city("Paris")


# 🌟 Exercise 4
import random

def compare_number(user_number):
    random_number = random.randint(1, 100)
    
    if user_number == random_number:
        print("Success!")
    else:
        print(f"Fail! Your number: {user_number}, Random number: {random_number}")

compare_number(50)


# 🌟 Exercise 5
def make_shirt(size="large", text="I love Python"):
    print(f"The size of the shirt is {size} and the text is {text}.")

make_shirt()  # default
make_shirt(size="medium")  # medium, default text
make_shirt(size="small", text="Custom message")  # custom
make_shirt(text="Hello!", size="small")  # keyword arguments


# 🌟 Exercise 6
magician_names = ['Harry Houdini', 'David Blaine', 'Criss Angel']

def show_magicians(names):
    for name in names:
        print(name)

def make_great(names):
    for i in range(len(names)):
        names[i] = names[i] + " the Great"

make_great(magician_names)
show_magicians(magician_names)


# 🌟 Exercise 7
def get_random_temp():
    return random.randint(-10, 40)

def main():
    temp = get_random_temp()
    print(f"The temperature right now is {temp} degrees Celsius.")
    
    if temp < 0:
        print("Brrr, that’s freezing! Wear some extra layers today.")
    elif 0 <= temp <= 16:
        print("Quite chilly! Don’t forget your coat.")
    elif 17 <= temp <= 23:
        print("Nice weather.")
    elif 24 <= temp <= 32:
        print("A bit warm, stay hydrated.")
    else:
        print("It's really hot! Stay cool.")

main()