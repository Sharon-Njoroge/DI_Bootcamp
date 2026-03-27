import random
import sys

def get_words_from_file(file_path):
    """Reads a file and returns a list of words."""
    try:
        with open(file_path, "r") as file:
            content = file.read()
            # split() handles spaces, tabs, and newlines automatically
            words = content.split()
            return words
    except FileNotFoundError:
        print(f"Error: The file '{file_path}' was not found.")
        return []

def get_random_sentence(length):
    """Generates a random sentence from the word list."""
    words_list = get_words_from_file("wordlist.txt")
    
    if not words_list:
        return "No words available to generate a sentence."

    # Select 'length' number of random words
    selected_words = [random.choice(words_list) for _ in range(length)]
    
    # Join words into a string and convert to lowercase
    sentence = " ".join(selected_words).lower()
    return f"{sentence}."

def main():
    print("--- Welcome to the Random Sentence Generator ---")
    print("This program creates a sentence from a list of words.\n")
    
    user_input = input("How many words should the sentence be? (2-20): ")

    # Input Validation
    try:
        length = int(user_input)
        if 2 <= length <= 20:
            sentence = get_random_sentence(length)
            print(f"\nGenerated Sentence: {sentence}")
        else:
            print("Error: Please enter a number between 2 and 20.")
    except ValueError:
        print("Error: Invalid input. Please enter a whole number.")

if __name__ == "__main__":
    main()
    import json

sampleJson = """{ 
   "company":{ 
      "employee":{ 
         "name":"emma",
         "payable":{ 
            "salary":7000,
            "bonus":800
         }
      }
   }
}"""

# Step 1: Load the JSON string
data = json.loads(sampleJson)

# Step 2: Access the nested "salary" key
salary_value = data["company"]["employee"]["payable"]["salary"]
print(f"Employee Salary: {salary_value}")

# Step 3: Add the "birth_date" key to the employee dictionary
data["company"]["employee"]["birth_date"] = "1995-05-12"

# Step 4: Save the modified JSON to a file
file_name = "modified_employee.json"
try:
    with open(file_name, "w") as json_file:
        # indent=4 makes the file human-readable
        json.dump(data, json_file, indent=4)
    print(f"\nSuccessfully saved modified JSON to '{file_name}'")
except Exception as e:
    print(f"An error occurred while saving: {e}")