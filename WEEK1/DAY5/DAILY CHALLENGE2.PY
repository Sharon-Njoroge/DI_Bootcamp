import random

# Generate the list
list_of_numbers = [random.randint(0, 10000) for _ in range(20000)]
target_number = 3728

# Set to store seen numbers
seen = set()

# Set to store unique pairs
pairs = set()

for number in list_of_numbers:
    complement = target_number - number
    
    if complement in seen:
        # Sort the pair to avoid duplicates like (1000,2728) and (2728,1000)
        pair = tuple(sorted((number, complement)))
        pairs.add(pair)
    
    seen.add(number)

# Print results
for pair in pairs:
    print(pair)