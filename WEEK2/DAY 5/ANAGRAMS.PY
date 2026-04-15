from anagram_checker import AnagramChecker

def get_user_input():
    """Handles input and basic validation rules."""
    user_input = input("\nEnter a word (or type 'exit' to quit): ").strip()
    
    if user_input.lower() == 'exit':
        return 'exit'

    # Validation: Only one word
    if len(user_input.split()) > 1:
        print("Error: Please enter only a single word.")
        return None

    # Validation: Only alphabetic characters
    if not user_input.isalpha():
        print("Error: Only alphabetic characters are allowed (no numbers/symbols).")
        return None

    return user_input

def main():
    # Initialize the checker (ensure sowpods.txt is in the same folder)
    checker = AnagramChecker('sowpods.txt')
    
    print("--- Welcome to the Anagram Checker ---")

    while True:
        word = get_user_input()

        if word == 'exit':
            print("Goodbye!")
            break
        
        if word is None:
            continue

        # Logic Execution
        is_valid = checker.is_valid_word(word)
        anagrams = checker.get_anagrams(word)

        # Result Display
        print(f'\nYOUR WORD: "{word.upper()}"')
        
        if is_valid:
            print("This is a valid English word.")
        else:
            print("Note: This word was not found in our dictionary.")

        if anagrams:
            print(f"Anagrams for your word: {', '.join(anagrams).lower()}.")
        else:
            print("No anagrams were found for your word.")

if __name__ == "__main__":
    main()