# Initialize an empty list to store our data
data_list = []

print("Please enter the details for 5 users (Name, Age, Score):")

# Collect input 5 times
for i in range(5):
    user_input = input(f"{i+1}. Enter Name, Age, Score (comma separated): ")
    # Split the string and create a tuple (Name, Age, Score)
    # We keep them as strings to match your expected output format
    user_tuple = tuple(item.strip() for item in user_input.split(','))
    data_list.append(user_tuple)

# Sort the list using a lambda function
# The lambda tells Python to sort by index 0, then 1, then 2
data_list.sort(key=lambda x: (x[0], int(x[1]), int(x[2])))

# Display the result
print("\nSorted List:")
print(data_list)