class Pets():
    def __init__(self, animals):
        self.animals = animals

    def walk(self):
        for animal in self.animals:
            print(animal.walk())

class Cat():
    is_lazy = True

    def __init__(self, name, age):
        self.name = name
        self.age = age

    def walk(self):
        return f'{self.name} is just walking around'

class Bengal(Cat):
    def sing(self, sounds):
        return f'{sounds}'

class Chartreux(Cat):
    def sing(self, sounds):
        return f'{sounds}'

# Step 1: Create the Siamese Class
class Siamese(Cat):
    pass

# Step 2: Create a List of Cat Instances
all_cats = [
    Bengal("Luna", 3),
    Chartreux("Milo", 5),
    Siamese("Coco", 2)
]

# Step 3: Create a Pets Instance
sara_pets = Pets(all_cats)

# Step 4: Take Cats for a Walk
sara_pets.walk()
class Dog:
    def __init__(self, name, age, weight):
        self.name = name
        self.age = age
        self.weight = weight

    def bark(self):
        return f"{self.name} is barking"

    def run_speed(self):
        # Formula: weight / age * 10
        return self.weight / self.age * 10

    def fight(self, other_dog):
        my_power = self.run_speed() * self.weight
        other_power = other_dog.run_speed() * other_dog.weight
        
        if my_power > other_power:
            return f"{self.name} won the fight!"
        elif other_power > my_power:
            return f"{other_dog.name} won the fight!"
        else:
            return "It's a draw!"

# Step 2 & 3: Create instances and test
dog1 = Dog("Rex", 5, 20)
dog2 = Dog("Bolt", 3, 15)
dog3 = Dog("Tank", 8, 40)

print(dog1.bark())
print(f"{dog2.name} speed: {dog2.run_speed()}")
print(dog1.fight(dog3))
import random

# Assuming Dog class is in the same scope or imported
class PetDog(Dog):
    def __init__(self, name, age, weight):
        super().__init__(name, age, weight)
        self.trained = False

    def train(self):
        print(self.bark())
        self.trained = True

    def play(self, *args):
        # args will be a tuple of other dog instances
        names = [dog.name for dog in args]
        names.insert(0, self.name) # Add this dog to the list
        print(f"{', '.join(names)} all play together")

    def do_a_trick(self):
        if self.trained:
            tricks = [
                "does a barrel roll", 
                "stands on his back legs", 
                "shakes your hand", 
                "plays dead"
            ]
            print(f"{self.name} {random.choice(tricks)}")
        else:
            print(f"{self.name} is not trained yet.")

# Testing PetDog
my_pet = PetDog("Buddy", 4, 12)
friend_dog = Dog("Max", 2, 10)

my_pet.train()
my_pet.play(friend_dog)
my_pet.do_a_trick()