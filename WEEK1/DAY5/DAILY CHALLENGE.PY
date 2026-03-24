# Step 1: Get input
user_input = input("Enter words separated by commas: ")

# Step 2: Split the string into a list
words = user_input.split(",")

# Step 3: Sort the list
words.sort()

# Step 4: Join the sorted list into a string
sorted_words = ",".join(words)

# Step 5: Print the result
print(sorted_words)
def longest_word(sentence):
    # Step 2: Split sentence into words
    words = sentence.split()
    
    # Step 3: Initialize variable
    longest = words[0]
    
    # Step 4 & 5: Loop and compare lengths
    for word in words:
        if len(word) > len(longest):
            longest = word
    
    # Step 6: Return result
    return longest


# Example usage
print(longest_word("Margaret's toy is a pretty doll."))
print(longest_word("A thing of beauty is a joy forever."))
print(longest_word("Forgetfulness is by all means powerless!"))