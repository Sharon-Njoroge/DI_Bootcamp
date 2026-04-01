class AnagramChecker:
    def __init__(self, file_path="sowpods.txt"):
        """Loads the word list from a text file into a set for fast lookup."""
        try:
            with open(file_path, 'r') as f:
                # We use a set for O(1) lookup speed
                self.word_list = {line.strip().lower() for line in f}
        except FileNotFoundError:
            print(f"Error: The file {file_path} was not found.")
            self.word_list = set()

    def is_valid_word(self, word):
        """Checks if the word exists in our dictionary."""
        return word.lower() in self.word_list

    def is_anagram(self, word1, word2):
        """Checks if two words are anagrams by comparing sorted characters."""
        w1 = word1.lower()
        w2 = word2.lower()
        # Anagrams must have the same letters but cannot be the exact same word
        return sorted(w1) == sorted(w2) and w1 != w2

    def get_anagrams(self, word):
        """Returns a list of all anagrams found in the word list."""
        word = word.lower()
        # We iterate through the list and use our helper method
        return [w for w in self.word_list if self.is_anagram(word, w)]
    
    from anagram_checker import AnagramChecker

def main():
    # Initialize the checker (ensure sowpods.txt is in the same folder)
    checker = AnagramChecker("sowpods.txt")

    while True:
        print("\n" + "="*20)
        print(" ANAGRAM CHECKER ")
        print("="*20)
        print("1. Input a word")
        print("2. Exit")
        
        choice = input("\nChoose an option: ").strip()

        if choice == '2':
            print("Goodbye!")
            break
        
        if choice == '1':
            user_input = input("Enter a single word: ").strip()

            # --- Validation Steps ---
            # 1. Check if empty
            if not user_input:
                print("Error: You didn't enter anything.")
                continue

            # 2. Check if more than one word (split creates a list of strings)
            if len(user_input.split()) > 1:
                print("Error: Only a single word is allowed.")
                continue

            # 3. Check if purely alphabetic
            if not user_input.isalpha():
                print("Error: Only alphabetic characters allowed (no numbers/symbols).")
                continue

            # --- Processing ---
            word = user_input.upper()
            
            if checker.is_valid_word(word):
                anagrams = checker.get_anagrams(word)
                
                print(f'\nYOUR WORD: "{word}"')
                print("This is a valid English word.")
                
                if anagrams:
                    print(f"Anagrams for your word: {', '.join(anagrams)}.")
                else:
                    print("No anagrams found for this word.")
            else:
                print(f'\nYOUR WORD: "{word}"')
                print("Note: This word was not found in the dictionary.")

if __name__ == "__main__":
    main()