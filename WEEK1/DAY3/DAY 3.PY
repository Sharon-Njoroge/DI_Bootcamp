# ===============================
# Exercise 1: Convert Lists into Dictionary
# ===============================

keys = ['Ten', 'Twenty', 'Thirty']
values = [10, 20, 30]

result = dict(zip(keys, values))

print("Exercise 1 Output:")
print(result)


# ===============================
# Exercise 2: Cinemax #2
# ===============================

family = {"rick": 43, "beth": 13, "morty": 5, "summer": 8}

total_cost = 0

print("\nExercise 2 Output:")

for name, age in family.items():

    if age < 3:
        price = 0
    elif age <= 12:
        price = 10
    else:
        price = 15

    print(name, "pays $", price)
    total_cost += price

print("Total cost:", total_cost)


# ===============================
# Exercise 3: Zara Dictionary
# ===============================

brand = {
    "name": "Zara",
    "creation_date": 1975,
    "creator_name": "Amancio Ortega Gaona",
    "type_of_clothes": ["men", "women", "children", "home"],
    "international_competitors": ["Gap", "H&M", "Benetton"],
    "number_stores": 7000,
    "major_color": {
        "France": ["blue"],
        "Spain": ["red"],
        "US": ["pink", "green"]
    }
}

# Modify number of stores
brand["number_stores"] = 2

# Print Zara clients
print("\nExercise 3 Output:")
print("Zara's clients are:", brand["type_of_clothes"])

# Add new key
brand["country_creation"] = "Spain"

# Add competitor
if "international_competitors" in brand:
    brand["international_competitors"].append("Desigual")

# Delete creation_date
brand.pop("creation_date")

# Print last competitor
print("Last competitor:", brand["international_competitors"][-1])

# Print US colors
print("US colors:", brand["major_color"]["US"])

# Number of keys
print("Number of keys:", len(brand))

# Print all keys
print("Dictionary keys:", brand.keys())


# Bonus: Merge dictionaries
more_on_zara = {
    "creation_date": 1975,
    "number_stores": 10000
}

brand.update(more_on_zara)

print("Merged dictionary:", brand)


# ===============================
# Exercise 4: Disney Characters
# ===============================

users = ["Mickey", "Minnie", "Donald", "Ariel", "Pluto"]

print("\nExercise 4 Output:")

# Characters -> Index
char_index = {user: i for i, user in enumerate(users)}
print("Characters to Index:", char_index)

# Index -> Characters
index_char = {i: user for i, user in enumerate(users)}
print("Index to Characters:", index_char)

# Alphabetical dictionary
sorted_users = sorted(users)
sorted_dict = {user: i for i, user in enumerate(sorted_users)}
print("Sorted Characters:", sorted_dict)