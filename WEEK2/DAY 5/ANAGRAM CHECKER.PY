class AnagramChecker:
    def __init__(self, file_path='sowpods.txt'):
        """Loads the word list and stores it as a set for O(1) lookup."""
        try:
            with open(file_path, 'r') as f:
                # Store as a set of uppercase words for consistency
                self.word_list = set(word.strip().upper() for word in f)
        except FileNotFoundError:
            print(f"Error: The file {file_path} was not found.")
            self.word_list = set()

    def is_valid_word(self, word):
        """Checks if the word exists in the dictionary."""
        return word.upper() in self.word_list

    def is_anagram(self, word1, word2):
        """Checks if two words are anagrams by comparing sorted characters."""
        word1, word2 = word1.upper(), word2.upper()
        # A word is not an anagram of itself
        if word1 == word2:
            return False
        return sorted(word1) == sorted(word2)

    def get_anagrams(self, word):
        """Returns a list of all anagrams found in the word list."""
        word = word.upper()
        # We iterate through the list to find matches
        return [w for w in self.word_list if self.is_anagram(word, w)]