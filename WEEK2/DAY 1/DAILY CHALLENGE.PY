class Farm:
    def __init__(self, farm_name):
        # Initialize farm name and animals dictionary
        self.name = farm_name
        self.animals = {}

    def add_animal(self, animal_type=None, count=1, **kwargs):
        # Handle single animal input
        if animal_type:
            if animal_type in self.animals:
                self.animals[animal_type] += count
            else:
                self.animals[animal_type] = count

        # Handle multiple animals using kwargs
        for animal, qty in kwargs.items():
            if animal in self.animals:
                self.animals[animal] += qty
            else:
                self.animals[animal] = qty

    def get_info(self):
        # Header
        output = f"{self.name}'s farm\n\n"

        # Animals list
        for animal, count in self.animals.items():
            output += f"{animal:<10} : {count}\n"

        # Footer
        output += "\n\tE-I-E-I-0!"
        return output

    def get_animal_types(self):
        # Return sorted list of animal names
        return sorted(self.animals.keys())

    def get_short_info(self):
        animal_list = self.get_animal_types()
        formatted_animals = []

        for animal in animal_list:
            # Add 's' if more than 1
            if self.animals[animal] > 1:
                formatted_animals.append(animal + "s")
            else:
                formatted_animals.append(animal)

        # Join with commas and 'and'
        if len(formatted_animals) > 1:
            animals_str = ", ".join(formatted_animals[:-1]) + " and " + formatted_animals[-1]
        else:
            animals_str = formatted_animals[0]

        return f"{self.name}'s farm has {animals_str}."


# ---------------- TEST ----------------
macdonald = Farm("McDonald")

# Using normal method
macdonald.add_animal('cow', 5)
macdonald.add_animal('sheep')
macdonald.add_animal('sheep')

# Using kwargs method (bonus upgrade)
macdonald.add_animal(goat=12)

print(macdonald.get_info())
print()
print(macdonald.get_short_info())